<template>
  <!-- <div :id="id" :class="className" :style="{height:height,width:width}" /> -->
  <div>
    <div class="inputDiv">
      <form>
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
          <!-- <option>1min</option> -->
          <option>5min</option>
          <!-- <option>30min</option> -->
          <option>1h</option>
          <option>1d</option>
          <!-- <option>1w</option> -->
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
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      hh: '650px',
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
        'interval': self.interval || '1d',
        'start_time': self.start_time || '',
        'end_time': self.end_time || ''
      }
      balance.getTotalETH(params).then(res => {
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
          top: 20,
          text: '总净值（包含外部交易所和见证节点）',
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
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['ETH', 'USDT'],
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
          data: data.time
        }],
        yAxis: [{
          type: 'value',
          name: '总净值',
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
        series: [{
          name: 'ETH',
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
          data: data.amount
        },
        {
          name: 'USDT',
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
        }]
      })
    }
  }
}
</script>

<style type="text/css">
  .date-input {
    padding: 10px;
    width: 300px;
  }

</style>
