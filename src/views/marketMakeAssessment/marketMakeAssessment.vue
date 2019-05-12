<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('市场')" prop="market_name" align="center" width="190px">
        <template slot-scope="scope">
          <span class="link-type" @click="getEfficiencyInfo(scope.row.market_name)">{{ scope.row.market_name }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('流动性')" width="250px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fluidity }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('价差')" width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price_gap }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('效率')" width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.efficiency }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('spread')" width="250px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.spread }}</span>
        </template>
      </el-table-column>
    </el-table>

    <vue-element-loading :active="isActive" spinner="bar-fade-scale" color="#FF6700" />

    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>

import echarts from 'echarts'
import marketMakeAssessment from '@/api/marketMakeAssessment.js'
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
      marketMakeAssessment.getMarketMakeAssessment().then(response => {
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
      marketMakeAssessment.getMarketMakeAssessmentInfo(params).then(res => {
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
      var series = []
      for (var i in data.exchange) {
        var temp = {
          name: data.exchange[i],
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          itemStyle: {
            normal: {
              borderWidth: 12

            }
          },
          data: data.data[data.exchange[i]]
        }
        series.push(temp)
      }

      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        backgroundColor: '#394056',
        title: {
          top: 20,
          text: data.market_name,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          data: data.exchange,
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: data.date
        }],
        yAxis: [{
          type: 'value',
          name: '做市深度指标',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],

        series: series
      })
    }

  }
}
</script>
