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
          text: '所有资产总量信息',
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
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: data.coinname,
            axisTick: {
              alignWithLabel: true
            },
            'axisLabel': {
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '总数量',
            type: 'bar',
            barWidth: '60%',
            data: data.total
          }
        ]
      })
    }
  }
}
</script>
