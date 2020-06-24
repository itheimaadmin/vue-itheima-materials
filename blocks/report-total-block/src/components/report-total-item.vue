<template>
  <el-row>
    <el-col
      class="dimension"
    >
      {{ collect.dimension }}
      <span class="unit">（{{ collect.unit }}）</span>
    </el-col>

    <el-col
      class="count"
    >
      {{ Math.round(collect.count / 10000) | numFormat }}
    </el-col>

    <el-col>
      <el-row
        type="flex"
        align="middle"
      >
        <el-col
          :span="6"
          class="compare"
        >
          同比
        </el-col>
        <el-col :span="3">
          <div :class="collect.increase ? 'up' : 'down'">
            <svg-icon
              name="triangle"
              :class="collect.increase ? 'svg-down' : ''"
            />
          </div>
        </el-col>
        <el-col
          :span="15"
          class="increase"
        >
          {{ collect.percentage }}%
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IOrderCollectEntity } from '../entity'
@Component({
  name: 'report-total-item'
})
export default class extends Vue {
  @Prop({ default: {} }) readonly collect!: IOrderCollectEntity
}
</script>

<style lang="scss" scoped>
  .dimension {
    margin-top: 34px;
    font-size: 16px;
    color: #999999;

    .unit {
      font-size: 14px;
    }
  }

  .count {
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 41px;
    color: #1a1a1a;
  }

  .compare {
    line-height: 25px;
    font-size: 16px;
    color: #999999;
  }

  .up {
    color: #32c27c;
  }

  .down {
    color: #f95454;
  }

  .increase {
    line-height: 25px;
    font-size: 20px;
    color: #32c27c;
  }

  .decrease {
    line-height: 25px;
    font-size: 20px;
    color: #f95454;
  }
</style>
