<template>
  <div>
    <div class="inputDiv">
      <form>
        <el-input v-model="symbolName" placeholder="请输入CoinName：MT" class="symbol-input" />

        <select v-model="exchangeName" class="exchange-select">
          <option disabled value="">请选择交易所</option>
          <option>bytetrade</option>
          <option>bytetrade_witness</option>
          <option>huobipro_xiaocong</option>
          <option>binance</option>
          <option>okex</option>
        </select>
        <el-date-picker
          v-model="start_time"
          type="datetime"
          format="yyyy-MM-ddThh:mm:ssZ"
          value-format="yyyy-MM-ddThh:mm:ssZ"
          placeholder="开始时间"
          class="date-input"
        /> -
        <el-date-picker
          v-model="end_time"
          type="datetime"
          format="yyyy-MM-ddThh:mm:ssZ"
          value-format="yyyy-MM-ddThh:mm:ssZ"
          placeholder="结束时间"
          class="date-input"
        />
        <select v-model="interval" class="exchange-select">
          <option disabled value="">时间间隔</option>
          <option>1min</option>
          <option>5min</option>
          <option>30min</option>
          <option>1h</option>
          <option>1d</option>
          <option>1w</option>
        </select>
        <input type="button" value="提交" @click="getdata">
      </form>
    </div>
    <vue-element-loading :active="isActive" spinner="bar-fade-scale" color="#FF6700" />

    <div :id="id" :class="className" :style="{height:hh,width:width}" />
  </div>

</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import balance from '@/api/balance.js'
import VueElementLoading from 'vue-element-loading'

export default {
  components: {
    VueElementLoading
  },
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
      default: '800px'
    },
    height: {
      type: String,
      default: '800px'
    }
  },
  data() {
    return {
      chart: null,
      hh: '650px',
      symbolName: '',
      exchangeName: '',
      start_time: '',
      end_time: '',
      interval: '',
      isActive: true

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
      this.isActive = true

      const params = {
        // 直接访问页面
        'exchange': self.exchangeName || 'bytetrade',
        'coin_name': self.symbolName || 'MT',
        'interval': self.interval || '1h'

        // 'exchange': this.$route.query.exchange || 'bytetrade',
        // 'coinid': this.$route.query.coinid || 2,

        // 'exchange': this.$route.params.exchange || 'bytetrade',
        // 'coinid': this.$route.params.coinid || 2,

        // 'start_time': self.start_time || '',
        // 'end_time': self.end_time || ''
      }
      balance.getBalanceData(params).then(res => {
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
      console.log(data)

      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        backgroundColor: '#394056',
        title: {
          text: '单个资产详情',
          subtext: data.coinname,
          x: '20',
          top: 20,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 18,
            color: '#F1F1F3'
          }
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
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['total', 'asETH', 'asUSDT'],
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
          name: 'Time', // 坐标轴名称。
          nameLocation: 'end', // 坐标轴名称显示位置。

          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: data.time
        }],
        yAxis: [{
          type: 'value',
          name: 'Balance',
          scale: true,
          boundaryGap: [0.2, 0.2],
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
          }
        }],

        series: [
          {
            smooth: true,
            name: 'total',
            type: 'line',
            stack: 'total',
            symbolSize: 10,
            symbol: 'circle',
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(137, 189, 27, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(137, 189, 27, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(137,189,27)',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12

              }
            },
            data: data.total
          },
          {
            name: 'asETH',
            type: 'line',
            stack: 'total',
            symbolSize: 10,
            symbol: 'circle',
            smooth: true, // 这句就是让曲线变平滑的

            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(219, 50, 51, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(219, 50, 51, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(219,50,51)',
                borderColor: 'rgba(219,50,51,0.2)',
                borderWidth: 12
              }
            },
            data: data.value
          },
          {
            name: 'asUSDT',
            type: 'line',
            stack: 'total',
            symbolSize: 10,
            smooth: true, // 这句就是让曲线变平滑的

            symbol: 'circle',
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0, 136, 212, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(0,136,212)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12

              }
            },
            data: data.asusdt
          }]
      })
    }
  }
}
</script>

<style type="text/css">
  .symbol-input {
    padding: 10px;
    width: 300px;
  }
  .date-input {
    padding: 10px;
    width: 300px;
  }

</style>
