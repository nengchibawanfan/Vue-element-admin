<template>
  <div class="app-container">
    <vue-element-loading :active="isActive" spinner="bar-fade-scale" color="#FF6700" />
    <div />

    <div :id="id" :class="className" :style="{height:hh,width:width}" />
  </div>

</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import { getAmountInfo } from '@/api/amountInfo.js'
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
      coin_name: '',
      isActive: true,
      hh: '750px'
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
        'coin_name': this.$route.params.coinname || 'ETH'
      }
      getAmountInfo(params).then(res => {
        self.handleRequest(res, self.drawChart)
        this.isActive = false
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
        title: {
          text: data.coin_name + '数量变化表',
          subtext: data.coin_name,
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
          // formatter: function(params) {
          //   console.log(params)

          //   var a = params.all_amount_change
          //   var b = params.bytetrade_change_amount
          //   var c = params.bytetrade_transfer
          //   var d = params.out_ex_change_amount

          //   var res

          //   res = a + '<br/>' + b + '<br/>' + c + '<br/>' + d

          //   return res
          // },
          axisPointer: {
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          } // 坐标轴指示器，坐标轴触发有效
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
          data: ['（内部、外部）总数量', '（内部、外部）总数量变化', '与做市系统外部的转账', 'ByteTrade内部交易产生的数量变化', '外部交易所交易数量变化']

        },
        calculable: true,
        yAxis: [
          {
            type: 'value'
          }
        ],
        xAxis: [
          {
            type: 'category',
            name: 'Time', // 坐标轴名称。
            nameLocation: 'end', // 坐标轴名称显示位置。
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }

            },
            data: data.end_time
          }
        ],
        series: [
          {
            name: '（内部、外部）总数量',

            type: 'line',
            label: {
              normal: {
                position: 'inside'
              }
            },
            data: data.end_amount
          },
          {
            name: '（内部、外部）总数量变化',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                // show: true
              }
            },
            data: data.all_amount_change
          },
          {
            name: '与做市系统外部的转账',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                // show: true
              }
            },
            data: data.bytetrade_transfer
          },
          {
            name: 'ByteTrade内部交易产生的数量变化',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                // show: true
              }
            },
            data: data.sum_change
          },
          {
            name: '外部交易所交易数量变化',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                // show: true,
                position: 'left'
              }
            },
            data: data.out_ex_change_amount
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
