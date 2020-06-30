<template>
  <el-dialog
    title="选择商品"
    :visible.sync="syncDialogVisible"
    append-to-body
    width="928px"
    @open="open"
  >
    <el-form :inline="true">
      <el-form-item label="输入搜索：">
        <el-input
          v-model="listQuery.skuName"
          placeholder="请输入商品名称"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="searchBtn"
          type="primary"
          @click="searchSku"
        >
          查询
        </el-button>
        <el-button
          class="reset"
          @click="reset"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      height="300"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :header-cell-style="{background: '#F3F6FB', color: '#5373E0'}"
      @current-change="handleCurrentChange"
    >
      <el-table-column
        width="55"
        align="center"
        label="选择"
      >
        <template slot-scope="scope">
          <el-radio
            v-model="currentRow"
            :label="scope.row"
          >
            <i />
          </el-radio>
        </template>
      </el-table-column>

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
        label="商品名称"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.skuName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="商品图片"
      >
        <template slot-scope="scope">
          <img
            v-if="scope.row.skuImage"
            width="56"
            :src="`${scope.row.skuImage}`"
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageIndex"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
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
import {
  Component,
  Vue,
  PropSync,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator'
import { defaultSkuData, ISkuEntity } from '../entity'
import { Message } from 'element-ui'
import Pagination from '@/components/Pagination/index.vue'

const skuListJsonData = require('../json/sku_list.json')
const setSkuJsonData = require('../json/set_sku.json')

@Component({
  name: 'SettingSku',
  components: {
    Pagination
  }
})
export default class SettingSku extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  syncDialogVisible!: boolean

  private total: number = 0
  private list: ISkuEntity[] = []
  private listLoading: boolean = false
  private listQuery = {
    pageIndex: 1,
    pageSize: 10,
    skuName: ''
  }
  private currentRow: ISkuEntity = defaultSkuData
  private skuForm = {
    skuId: 0
  }

  async open() {
    this.searchSku()
  }

  private async searchSku() {
    if (this.listQuery.skuName) {
      this.listLoading = true

      const { data } = await new Promise(resolve => {
        setTimeout(() => {
          resolve(skuListJsonData)
        }, 500)
      })
      this.list = data.currentPageRecords
      this.total = data.totalCount

      this.listLoading = false
    } else {
      this.getList()
    }
  }

  /**
   * 商品列表
   */
  private async getList() {
    this.listLoading = true

    const { data } = await new Promise(resolve => {
      setTimeout(() => {
        resolve(skuListJsonData)
      }, 500)
    })
    this.list = data.currentPageRecords
    this.total = data.totalCount

    this.listLoading = false
  }

  /**
   * 商品重置
   */
  private reset() {
    this.listQuery.skuName = ''
    this.getList()
  }

  handleCurrentChange(val: ISkuEntity) {
    this.currentRow = val
  }

  async ensureDialog() {
    this.skuForm = {
      skuId: this.currentRow.skuId
    }
    const { code, message } = setSkuJsonData

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
      this.$emit('currentRow', this.currentRow)
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 30px;
  height: 35px;
}

.searchBtn {
  background-color: #5373e0;
  border-color: #5373e0;
}

.reset {
  background: #ff9540;
  border-color: #ff9540;
  color: white;
}
</style>
