<template>
  <dir id="materials-block">
    <el-table
      :data="tableData.data.items"
      stripe
      class="tableBox"
    >
      <el-table-column
        prop="enterpriseId"
        label="ID"
      />
      <el-table-column
        prop="enterpriseName"
        label="企业名称"
      />
      <el-table-column
        prop="shopId"
        label="商户号"
      />
      <el-table-column
        prop="phone"
        label="账号"
        width="113"
      />
      <el-table-column
        prop="applicant"
        label="申请人"
      />
      <el-table-column
        prop="phone"
        label="手机号"
        width="113"
      />
      <el-table-column
        prop="applicationTime"
        label="申请日期"
      >
        <template slot-scope="scope">
          {{ moment(scope.row.applicationTime) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="expireTime"
        label="到期日期"
      >
        <template slot-scope="scope">
          {{ moment(scope.row.applicationTime) }}
        </template>
      </el-table-column>
      <el-table-column label="账号状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '0'">试用中</span>
          <span v-if="scope.row.status === '-1'">已停用</span>
          <span v-if="scope.row.status === '1'">正式</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="addHandle(scope.row.enterpriseId)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="editHandle(scope.row)"
          >
            {{ scope.row.status === '-1' ? '启用' : '禁用' }}
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="resetPasswordHandle(scope.row.enterpriseId)"
          >
            重置密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </dir>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import moment from 'moment'
import { PagelistResponseEntity } from './entity'
const jsonData = require('./data.json')

@Component({
  name: 'basic-table-block',
  components: {}
})

export default class extends Vue {
    private tableData ?: PagelistResponseEntity

    created() {
      this.tableData = jsonData
    }

    private moment(dat: string) {
    //   return moment(dat).format('YYYY-MM-DD HH:mm:ss')
      return moment(dat).format('YYYY-MM-DD')
    }

    private addHandle(val: string) {
    }

    private editHandle(val: string) {
    }

    private resetPasswordHandle(val: string) {
    }
}
</script>

<style lang="scss" scoped>
  .tableBox{
          width: 100%;
          border: solid 2px #F3F4F7;
          border-radius: 2px;
        }
</style>
