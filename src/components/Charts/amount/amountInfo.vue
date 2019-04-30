<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />

</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import amountInfo from '@/api/amountInfo.js'

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
      coin_name: ''
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
        'coin_name': this.$route.params.coinname || 'ETH'
      }
      amountInfo.getAmountInfo(params).then(res => {
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
          data: ['内部外部总数量', '内部外部总数量变化', '与dice互转导致数量变化', 'ByteTrade内部交易所数量变化', '外部交易所交易数量变化']

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
            axisTick: { show: false },
            data: data.end_time
          }
        ],
        series: [
          {
            name: '内部外部总数量',

            type: 'line',
            label: {
              normal: {
                position: 'inside'
              }
            },
            data: data.end_amount
          },
          {
            name: '内部外部总数量变化',
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
            name: '与dice互转导致数量变化',
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
            name: 'ByteTrade内部交易所数量变化',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                // show: true
              }
            },
            data: data.bytetrade_change_amount
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
