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
  components: { VueElementLoading },
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
      // k
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
        // "k": k || 100
      }
      realuserChipDistribution.getSingleRealuserChipDistributionInfo(params).then(res => {
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
    drawChart(data) {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        title: {
          // text: data.market_name + "   " + data.side + "    " + data.start_time + " - " + data.end_time,
          text: data.market_name,
          left: 20
        },
        toolbox: {
          show: true,
          feature: {
            // 显示数据试图
            dataView: { show: true, readOnly: false },

            dataZoom: {
              yAxisIndex: false
            },
            saveAsImage: {
              pixelRatio: 2
            },
            myTool1: {
              show: true,
              title: '详情',
              icon: 'image://http://echarts.baidu.com/images/favicon.png',
              onclick: function() {
                console.log('跳转到新的筹码分布页')
                // window.location.href = "dict[type]"
              }
            }
          }
        },
        calculable: true,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['BUY', 'SELL', 'in', 'out']
        },
        grid: {
          bottom: 90
        },
        dataZoom: [{
          type: 'inside'
        }, {
          type: 'slider'
        }],
        xAxis: [
          {
            type: 'value'
          }],
        yAxis: [
          {
            type: 'category',
            data: data.price
          }
        ],
        series: [

          {
            name: 'BUY',
            type: 'bar',
            data: data.BUY
          },
          {
            name: 'SELL',
            type: 'bar',
            data: data.SELL
          },
          {
            name: 'in',
            type: 'bar',
            data: data.in
          },
          {
            name: 'out',
            type: 'bar',
            data: data.out
          }

        ]
      })
    }
  }
}
</script>
