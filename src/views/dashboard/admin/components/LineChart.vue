<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions({ expectedData, actualData, date, type } = {}) {
      // var dict = {
      //   newVisitis: 'http://18.179.204.45:9527/#/tradingVol/realuser_num',
      //   // realuserNum,
      //   messages: 'http://18.179.204.45:9527/#/tradingVol/allmarket',
      //   // realuserTradingVolume,
      //   purchases: 'http://18.179.204.45:9527/#/balance/totalETH',
      //   // allBalance
      //   shoppings: 'http://18.179.204.45:9527/#/marketmakeIndicator'
      //   // marketmakeIndicator
      // }
      var dict = {
        newVisitis: 'http://127.0.0.1:9527/#/tradingVol/realuser_num',
        // realuserNum,
        messages: 'http://127.0.0.1:9527/#/tradingVol/allmarket',
        // realuserTradingVolume,
        purchases: 'http://127.0.0.1:9527/#/balance/totalETH',
        // allBalance
        shoppings: 'http://127.0.0.1:9527/#/marketmakeIndicator'
        // marketmakeIndicator
      }
      console.log(dict[type])
      this.chart.clear()

      if (type === 'shoppings') {
        this.chart.setOption({
          xAxis: {
            data: date,
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['做市综合指数', '仓位变动的做市综合指数']
          },
          toolbox: {
            feature: {
              myTool1: {
                show: true,
                title: '详情',
                icon: 'image://http://echarts.baidu.com/images/favicon.png',
                onclick: function() {
                  window.location.href = dict[type]
                }
              }
            }
          },
          series: [{
            name: '做市综合指数',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },

            data: expectedData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: '仓位变动的做市综合指数',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                }
              }
            },
            data: actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }]
        })
      } else {
        this.chart.setOption({
          xAxis: {
            data: date,
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          toolbox: {
            feature: {
              myTool1: {
                show: true,
                title: '详情',
                icon: 'image://http://echarts.baidu.com/images/favicon.png',
                onclick: function() {
                  window.location.href = dict[type]
                }
              }
            }
          },
          series: [
            {
              name: 'amount',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#3888fa',
                  lineStyle: {
                    color: '#3888fa',
                    width: 2
                  }
                }
              },
              data: actualData,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            }]
        })
      }
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
