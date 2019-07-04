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
      <el-table-column :label="$t('account')" prop="coin_name" align="center" width="200px">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('secret')" width="600px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.secret }}</span>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
import { getMarketmakeAccount, registmakeAccount } from '@/api/marketmakerAccount.js'

// import waves from '@/directive/waves' // Waves directive

export default {
  // name: 'ComplexTable',
  // directives: { waves },
  data() {
    return {
      tableData: null,
      total: 0,
      listLoading: true
    }
  },
  created() {
    this.getTraders()
  },
  methods: {
    getTraders() {
      this.listLoading = true

      getMarketmakeAccount().then(response => {
        console.log(response)
        if (response.have_traders === 0) {
          if (window.confirm('尚未注册做市账号，是否现在注册?')) {
            registmakeAccount().then(response => {
              alert(response.cont)
            })
          } else {
            console.log('算了算了')
          }
        }

        this.tableData = response.items

        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5)
      })
    }

  }
}
</script>
