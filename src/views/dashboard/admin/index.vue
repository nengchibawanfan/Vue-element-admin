<template>
  <div class="dashboard-editor-container">
    <ByteTrade-corner class="ByteTrade-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />

    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ByteTradeCorner from '@/components/ByteTradeCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import indexInfo from '@/api/indexInfo.js'

// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import UserOrder from './components/UserOrder'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

var lineChartData = {
  newVisitis: {
    expectedData: [],
    actualData: [],
    date: [],
    type: 'newVisitis'
  },
  messages: {
    expectedData: [],
    actualData: [],
    date: [],
    type: 'messages'

  },
  purchases: {
    expectedData: [],
    actualData: [],
    date: [],
    type: 'purchases'

  },
  shoppings: {
    expectedData: [],
    actualData: [],
    date: [],
    type: 'shoppings'

  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    ByteTradeCorner,
    PanelGroup,
    LineChart
    // RaddarChart,
    // PieChart,
    // BarChart,
    // TransactionTable,
    // UserOrder
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    getdata() {
      const self = this
      const params = {}
      indexInfo.getDetailIndexInfo(params).then(res => {
        self.handleRequest(res, self.setData)
      })
    },
    handleRequest(res, func) {
      typeof res === 'object' ? res : JSON.parse(res)
      if (res.status === 200) {
        func(res.data)
      }
    },
    setData(data) {
      lineChartData['newVisitis']['actualData'] = data.user_num
      lineChartData['messages']['actualData'] = data.deal_base_eth
      lineChartData['purchases']['actualData'] = data.value
      lineChartData['shoppings']['actualData'] = data.indicator_value_base_trade

      lineChartData['newVisitis']['expectedData'] = data.user_num
      lineChartData['messages']['expectedData'] = data.deal_base_eth
      lineChartData['purchases']['expectedData'] = data.value
      lineChartData['shoppings']['expectedData'] = data.indicator_value_base_value

      lineChartData['newVisitis']['date'] = data.time
      lineChartData['messages']['date'] = data.time
      lineChartData['purchases']['date'] = data.time
      lineChartData['shoppings']['date'] = data.time
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .ByteTrade-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
