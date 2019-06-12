<template>
  <!--   <div class="app-container">
        <el-input v-model="filename" :placeholder="$t('zip.placeholder')" style="width:300px;" prefix-icon="el-icon-document" />
  </div> -->
  <div :id="id" :class="className" :style="{height:height,width:width}" />
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
        'exchange': 'bytetrade'
      }
      balance.getAllSymbolBalance(params).then(res => {
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
          text: '所有资产总量分布',
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
          // formatter: '{a0} <br/>{b} : {c} ({d}%)<br/> 总数量 : '
          formatter: function(params) {
            var name = params.name
            var percent = params.percent
            var value = params.value
            var res

            res = name + ' <br/>' + '折合为ETH:' + value + '(' + percent + '%)<br/> 总数量 : ' + data.data_amount[name]

            return res
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
          orient: 'vertical',
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: data.coinname
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
            data: data.data_asETH
          }
          // {
          //   name: '实际个数',
          //   type: 'pie',
          //   radius: '55%',
          //   center: ['75%', '60%'],
          //   // data: [data.data1, data.data2],
          //   data: data.data2,
          // },

        ]
      })
    }
  }
}
</script>
