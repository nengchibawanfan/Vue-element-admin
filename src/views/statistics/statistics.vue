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
      <el-table-column :label="$t('CoinName')" prop="coin_id" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.coin_id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('数量')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.coin_id }}</span>
        </template>      </el-table-column>
      <el-table-column :label="$t('数量变化')" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('价格')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('价格变化')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('净值（ETH）')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('净值（USDT）')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('盈亏')" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableData: null,
      total: 0,
      listLoading: true,
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // this.listLoading = true

      // fetchList(this.listQuery).then(response => {
      statistics.getStatistics().then(response => {
        console.log(response)

        this.tableData = response.data.items

        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5)
      })
    },

    handleUpdate(row) {
      // 点击标题然后触发动作
      console.log('click')
    }

  }
}
</script>
