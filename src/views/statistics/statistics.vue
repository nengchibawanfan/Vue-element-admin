<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('CoinName')" prop="coin_name" align="center" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.coin_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('数量')" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.end_num }}</span>
        </template>      </el-table-column>
      <el-table-column :label="$t('数量变化')" width="140px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.price_status">
            <router-link :to="{ path: '/amount_info/coinname/' + row.coin_name }">
              <span class="link-type">{{ row.diff_amount_ratio }}</span>
            </router-link>
          </el-tag>

        </template>
      </el-table-column>

      <el-table-column :label="$t('价格')" width="140px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.end_price }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('价格变化')" class-name="status-col" width="140px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.price_status">
            {{ row.price_change_ratio }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="$t('净值（ETH）')" width="140px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.end_value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('净值（USDT）')" width="140px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.end_value }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('盈亏')" class-name="status-col" width="140px">
        <template slot-scope="{row}">
          <el-tag :type="row.value_status">
            {{ row.value_change_ratio }}
          </el-tag>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
import statistics from '@/api/statistics.js'

import waves from '@/directive/waves' // Waves directive

export default {
  name: 'ComplexTable',
  directives: { waves },
  data() {
    return {
      tableData: null,
      total: 0,
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true

      statistics.getStatistics().then(response => {
        // console.log(response)

        this.tableData = response.data.items

        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5)
      })
    }

  }
}
</script>
