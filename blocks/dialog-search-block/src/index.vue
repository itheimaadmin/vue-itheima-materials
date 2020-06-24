<template>
  <div class="app-container">
    <el-button
      type="text"
      @click="dialogVisible = true"
    >
      点击弹出
    </el-button>
    <div>当前选中的数据：{{ currentRow }}</div>
    <setting-sku
      :dialog-visible.sync="dialogVisible"
      :inner-code="innerCode"
      :channel-code="channelCode"
      @currentRow="handleCurrentRow"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SettingSku from './components/setting-sku.vue'
import { defaultSkuData, ISkuEntity } from './entity'

@Component({
  name: 'dialog-search-block',
  components: {
    SettingSku
  }
})
export default class extends Vue {
  private dialogVisible: boolean = false
  private innerCode: string = ''
  private channelCode: string = ''
  private currentRow: ISkuEntity = defaultSkuData

  private async handleCurrentRow(currentRow: ISkuEntity) {
    this.currentRow = currentRow
  }
}
</script>

<style lang="scss" scoped>
</style>
