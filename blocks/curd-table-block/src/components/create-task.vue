<template>
  <el-dialog
    title="新增工单"
    :visible.sync="syncDialogVisible"
    width="928px"
    @open="open"
  >
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      :rules="rules"
      label-width="140px"
    >
      <el-form-item
        label="工单名称："
        prop="taskName"
      >
        <el-input
          v-model="form.taskName"
          placeholder="请填写工单名称"
        />
      </el-form-item>
      <el-form-item
        label="机器编号："
        prop="innerCode"
      >
        <el-input
          v-model="form.innerCode"
          placeholder="请填写机器编号"
        />
      </el-form-item>
      <el-form-item
        label="工单类型："
        prop="productType"
      >
        <el-select
          v-model="form.productType"
          placeholder="请选择工单类型"
        >
          <el-option
            v-for="(item, index) in taskTypeList"
            :key="index"
            :label="item.typeName"
            :value="item.typeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="期望日期："
        prop="expect"
      >
        <el-date-picker
          v-model="form.expect"
          align="right"
          type="date"
          placeholder="请选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item
        label="备注："
        prop="desc"
      >
        <el-input
          v-model="form.desc"
          type="textarea"
          placeholder="请填写备注"
          maxlength="30"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="syncDialogVisible = false">
        取 消
      </el-button>
      <el-button
        type="primary"
        @click="ensureDialog"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Emit, Prop } from 'vue-property-decorator'
import { defaultTaskViewModel, ITaskTypeEntity } from '../entity'
import { Form as ElForm, Message } from 'element-ui'

const taskTypeJsonData = require('../json/task_type.json')
const createTaskJsonData = require('../json/create_task.json')

@Component({
  name: 'create-task'
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  syncDialogVisible!: boolean
  // 验证规则
  rules: Object = {
    taskName: [{ required: true, message: '请填写', trigger: 'change' }],
    innerCode: [{ required: true, message: '请填写', trigger: 'change' }],
    productType: [{ required: true, message: '请填写', trigger: 'change' }],
    expect: [{ required: true, message: '请填写', trigger: 'change' }],
    desc: [{ required: true, message: '请填写', trigger: 'change' }]
  }
  // 工单新增表单
  form = Object.assign({}, defaultTaskViewModel)

  private channelVisible: boolean = false
  private pickerOptions: any = {
    disabledDate(time: any) {
      return time.getTime() < Date.now() - 8.64e7
    }
  }
  // 工单类型列表
  private taskTypeList: ITaskTypeEntity[] = []

  async open() {
    // 工单类型列表
    this.getTaskTypeList()
  }

  /**
   * 工单类型列表
   */
  private async getTaskTypeList() {
    const { data } = await new Promise(resolve => {
      setTimeout(() => {
        resolve(taskTypeJsonData)
      }, 500)
    })
    this.taskTypeList = data
  }

  /**
   * 工单新增
   */
  async ensureDialog() {
    // 表单验证
    let form: ElForm = this.$refs['form'] as ElForm
    form.validate(async(valid: boolean) => {
      if (valid) {
        // 提交表单
        const { code, message } = await new Promise(resolve => {
          setTimeout(() => {
            resolve(createTaskJsonData)
          }, 500)
        })
        if (code !== 200) {
          Message({
            message: message,
            type: 'error',
            duration: 5 * 1000
          })
        } else {
          Message({
            message: '操作成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.syncDialogVisible = false
          // TODO: @Emit装饰
          this.$emit('refreshList')
        }
      }
    })
  }
}
</script>

<style lang="scss">
/* 全局对话框样式 */
.el-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #eeeeee;
  }

  .el-form {
    /*label {
      height: 46px;
      line-height: 46px;
    }*/

    input {
      width: 276px;
      height: 46px;
      border-radius: 10px;
    }

    textarea {
      width: 276px;
      height: 100px;
      border-radius: 10px;
    }
  }

  .dialog-footer {
    text-align: center;

    .el-button {
      width: 100px;
      height: 36px;
      background: #C5C5C5;
      border: none;
      border-radius: 3px;
      color: #ffffff;
    }

    .el-button+.el-button {
      margin-left: 27px;
      background: #FF9540;
    }
  }
}
</style>
