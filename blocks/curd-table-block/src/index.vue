<template>
  <div class="app-container">
    <!-- 检索条件 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="listQuery"
      size="medium"
      class="forms"
    >
      <el-form-item
        label="设备编号:"
        prop="innerCode"
      >
        <el-input
          v-model="listQuery.innerCode"
          placeholder="请输入设备编号"
        />
      </el-form-item>
      <el-form-item
        label="工单状态:"
        prop="tempStatus"
      >
        <el-select
          v-model="listQuery.tempStatus"
          placeholder="请选择"
          :filterable="true"
        >
          <el-option
            v-for="(item, index) in taskStatusList"
            :key="index"
            :label="item.statusName"
            :value="item.statusId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          class="searchBtn"
          type="primary"
          @click="getAllTask"
        >
          查询
        </el-button>
        <el-button
          class="reset"
          @click="reset"
        >
          重置
        </el-button>
        <el-button
          class="addBtn"
          type="primary"
          size="medium"
          @click="openCreateTaskDialog"
        >
          新增
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 分页列表 -->
    <el-table
      v-loading="listLoading"
      :data="taskList"
      fit
      highlight-current-row
      class="tableBox"
    >
      <el-table-column
        width="80"
        align="center"
        label="序号"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="工单名称"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="工单类型"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.taskType.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="设备编号"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.innerCode }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="工单状态"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.taskStatusTypeEntity.statusName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建日期"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.utime | dateTimeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="期望日期"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.expect | dateTimeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="备注"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleClick(scope.row)"
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageIndex"
      :limit.sync="listQuery.pageSize"
      @pagination="getAllTask"
    />

    <!-- 工单新增 -->
    <create-task
      :dialog-visible.sync="dialogVisible"
      @refreshList="getAllTask"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'
import { ElForm } from 'element-ui/types/form'
import CreateTask from './components/create-task.vue'
import { ITaskStatusTypeEntity, ITaskTypeEntity, ITaskEntity } from './entity'

const taskStatusJsonData = require('./json/task_status.json')
const taskListJsonData = require('./json/task_list.json')

@Component({
  name: 'curd-table-block',
  components: {
    Pagination,
    CreateTask
  }
})
export default class extends Vue {
  // 工单状态列表
  private taskStatusList: ITaskStatusTypeEntity[] = []
  // 工单列表
  private taskList: ITaskEntity[] = []
  private listLoading: boolean = false

  private total: number = 0
  private listQuery: any = {
    innerCode: '',
    taskStatus: -1,
    pageIndex: 1,
    pageSize: 10,
    tempStatus: ''
  }
  private dialogVisible: boolean = false

  created() {
    // 工单状态列表
    this.getAllTaskStatus()
    // 工单列表
    this.getAllTask()
  }

  /**
   * 工单状态列表
   */
  private async getAllTaskStatus() {
    const { data } = await new Promise(resolve => {
      setTimeout(() => {
        resolve(taskStatusJsonData)
      }, 500)
    })
    this.taskStatusList = data
  }

  /**
   * 工单新增
   */
  private openCreateTaskDialog() {
    this.dialogVisible = true
  }

  /**
   * 工单列表
   */
  private async getAllTask() {
    let tempStatus: number = this.listQuery.tempStatus
    if (!tempStatus) {
      this.listQuery.taskStatus = -1
    } else {
      this.listQuery.taskStatus = tempStatus
    }
    this.listLoading = true

    const { data } = await new Promise(resolve => {
      setTimeout(() => {
        resolve(taskListJsonData)
      }, 500)
    })
    this.taskList = data.currentPageRecords
    this.total = data.totalCount

    this.listLoading = false
  }

  /**
   * 工单重置
   */
  private reset() {
    let form: ElForm = this.$refs['searchForm'] as ElForm
    form.resetFields()

    this.getAllTask()
  }
}
</script>

<style lang="scss" scoped>
.addBtn,
.searchBtn {
  background: #5373e0;
  border-color: #5373e0;
}

.reset {
  background: #ff9540;
  border-color: #ff9540;
  color: white;
}

.tableBox {
  width: 100%;
  border: solid 2px #f3f4f7;
  border-radius: 2px;
}
</style>
