<template>
  <div>
    <div class="inputDiv">
      <form>
        <el-input v-model="symbolName" placeholder="请输入CoinId：2" class="symbol-input" />

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
        />
        <el-date-picker
          v-model="end_time"
          type="datetime"
          format="yyyy-MM-ddThh:mm:ssZ"
          value-format="yyyy-MM-ddThh:mm:ssZ"
          placeholder="结束时间"
          class="date-input"
        />
        <!--
        <el-input v-model="startDate" placeholder="开始时间" class="date-input" />
        <el-input v-model="endDate" placeholder="结束时间" class="date-input" />
 -->

        <input type="button" value="提交" @click="getdata">
      </form>
    </div>
    <div :id="id" :class="className" :style="{height:hh,width:width}" />
  </div>

</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import balance from '@/api/balance.js'

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
      end_time: ''
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
        'exchange': self.exchangeName || 'bytetrade',
        'coinid': self.symbolName || 2,
        'start_time': self.start_time || '',
        'end_time': self.end_time || ''
      }
      balance.getBalanceData(params).then(res => {
        self.handleRequest(res, self.drawChart)
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
        backgroundColor: '#344b58',
        title: {
          text: '单个资产详情',
          subtext: data.coinname,
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
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
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
          // x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          // data: ['free', 'male', 'average']
          data: ['free', 'used', 'total', 'asETH']

        },
        calculable: true,
        xAxis: [{
          type: 'category',
          name: 'Time', // 坐标轴名称。
          nameLocation: 'end', // 坐标轴名称显示位置。
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }

          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 30
            // rotate: 45

          },
          data: data.time
        }],
        yAxis: [{
          type: 'value',
          scale: true,
          boundaryGap: [0.2, 0.2],
          name: 'Balance',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 10,
          end: 80,
          // ???
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: 'free',
          type: 'bar',
          stack: 'total',
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: false,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: data.free
        },

        {
          name: 'used',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
              barBorderRadius: 0,
              label: {
                show: false,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: data.used
        },
        {
          name: 'total',
          type: 'line',
          stack: 'total',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: false,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
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
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: false,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: data.value
        }
        ]
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
