<template>
  <div class="app-container">
    <el-row
      type="flex"
      class="wrapper"
    >
      <el-col :span="2" />
      <el-col
        v-for="(item, index) in collectList"
        :key="index"
        :span="11"
      >
        <report-total-item :collect="item" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ReportTotalItem from './components/report-total-item.vue'
import { IOrderCollectEntity } from './entity'

const jsonData = require('./data.json')

@Component({
  name: 'report-total-block',
  components: {
    ReportTotalItem
  }
})
export default class extends Vue {
  private collectList: IOrderCollectEntity[] = []

  created() {
    this.getCollect()
  }

  /**
   * 报表统计
   */
  private async getCollect() {
    this.collectList = await new Promise(resolve => {
      setTimeout(() => {
        resolve(jsonData.data)
      }, 500)
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 564px;
  height: 204px;
  background: #ffffff;
  border-radius: 4px;
}
</style>
