<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 190px;"
    >
      <el-table-column :label="$t('市场')" prop="market_name" align="center" width="190px">
        <template slot-scope="scope">
          <span class="link-type" @click="getEfficiencyInfo(scope.row.market_name)">{{ scope.row.market_name }}</span>
        </template>
      </el-table-column>

    </el-table>

    <vue-element-loading :active="isActive" spinner="bar-fade-scale" color="#FF6700" />

    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>

import echarts from 'echarts'
import realuserChipDistribution from '@/api/realuserChipDistribution.js'
import resize from '@/components/Charts/mixins/resize'
import VueElementLoading from 'vue-element-loading'

import waves from '@/directive/waves' // Waves directive

export default {
  name: 'ComplexTable',
  components: {
    VueElementLoading
  },
  directives: { waves },
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '1200px'
    },
    height: {
      type: String,
      default: '600px'
    }
  },
  data() {
    return {
      chart: null,
      tableData: null,
      total: 0,
      listLoading: true,
      isActive: true
    }
  },
  created() {
    this.getList()
    this.getEfficiencyInfo()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getList() {
      realuserChipDistribution.getRealuserChipDistribution().then(response => {
        // console.log(response)

        this.tableData = response.data.items

        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5)
      })
    },
    getEfficiencyInfo(marketName) {
      const self = this
      this.isActive = true
      // 打开loading
      var params = {
        'market_name': marketName || 'MT/ETH'
      }
      realuserChipDistribution.getRealuserChipDistributionInfo(params).then(res => {
        console.log(res)
        self.handleRequest(res, self.drawChart)
        this.isActive = false
      })
    },
    handleRequest(res, func) {
      typeof res === 'object' ? res : JSON.parse(res)
      if (res.status === 200) {
        func(res.data)
      }
    },
    randomRgbColor() { // 随机生成RGB颜色
      var r = Math.floor(Math.random() * 256) // 随机生成256以内r值
      var g = Math.floor(Math.random() * 256) // 随机生成256以内g值
      var b = Math.floor(Math.random() * 256) // 随机生成256以内b值
      return `rgb(${r},${g},${b})` // 返回rgb(r,g,b)格式颜色
    },
    randomRgbaColor() { // 随机生成RGBA颜色
      var r = Math.floor(Math.random() * 256) // 随机生成256以内r值
      var g = Math.floor(Math.random() * 256) // 随机生成256以内g值
      var b = Math.floor(Math.random() * 256) // 随机生成256以内b值
      var alpha = Math.random() // 随机生成1以内a值
      return `rgba(${r},${g},${b},${alpha})` // 返回rgba(r,g,b,a)格式颜色
    },
    drawChart(data) {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        title: {
          text: data.market_name,
          left: 10
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false
            },
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          bottom: 90
        },
        dataZoom: [{
          type: 'inside'
        }, {
          type: 'slider'
        }],
        yAxis: {
          data: data.avg_price,
          silent: false,
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        xAxis: {
          splitArea: {
            show: false
          }
        },
        series: [{
          type: 'bar',
          data: data.amount,
          // Set `large` for large data amount
          large: true
        }]

      })
    }

  }
}
</script>
