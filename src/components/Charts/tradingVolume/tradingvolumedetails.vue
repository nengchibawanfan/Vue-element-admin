<template>
  <!--   <div class="app-container">
        <el-input v-model="filename" :placeholder="$t('zip.placeholder')" style="width:300px;" prefix-icon="el-icon-document" />
  </div> -->
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import { getSomedayTradingVolume } from '@/api/tradingVolume.js'

export default {
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
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.getdata()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getdata() {
      const self = this
      const params = {
        'date': this.$route.params.date || ''
      }
      getSomedayTradingVolume(params).then(res => {
        self.handleRequest(res, self.drawChart)
      })
    },
    handleRequest(res, func) {
      typeof res === 'object' ? res : JSON.parse(res)
      func(res)
    },
    drawChart(data) {
      this.chart = echarts.init(document.getElementById(this.id))
      console.log(data)
      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: data.date + '     真实用户交易量分布情况',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          },
          formatter: '{a} <br/>{b} : {c} ({d}%)<br/>'
          // formatter: function(params) {
          //   var name = params.name
          //   var percent = params.percent
          //   var value = params.value
          //   var res

          //   res = '折算为ETH <br/>' + name + ':' + value + '(' + percent + '%)<br/> 总数量 : ' + data.data_amount[name]

          //   return res
          // }
        },

        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          orient: 'vertical',
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: data.market_name
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'left',
                  max: 1548
                }
              }
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: '折合为ETH',
            type: 'pie',
            // radius: '55%',
            // center: ['25%', '60%'],
            // data: [data.data1, data.data2],
            data: data.source
          }

        ]
      })
    }
  }
}
</script>
