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
import charge from '@/api/charge.js'
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
        // 'coinid': self.symbolName || ''
      }
      charge.getETHCharge(params).then(res => {
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
        backgroundColor: '#344b58',
        title: {
          text: '手续费换算为ETH总消耗'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['ETH']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.time
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'ETH',
            type: 'line',
            stack: '总消耗',
            data: data.amount
          }
        ]
      })
    }
  }
}

</script>

<!-- <style type="text/css">
  .date-input {
    padding: 10px;
    width: 300px;
  }

</style> -->
