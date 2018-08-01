<template>
  <Group :class="`vx-grid ${className}`" :top="top" :left="left">
    <Rows
      :className="className"
      :scale="yScale"
      :width="width"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :stroke-dasharray="strokeDasharray"
      :numTicks="numTicksRows"
      :style="rowLineStyle"
      :offset="yOffset"
      v-bind="restProps"
    />
    <Columns
      :className="className"
      :scale="xScale"
      :height="height"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :stroke-dasharray="strokeDasharray"
      :numTicks="numTicksColumns"
      :style="columnLineStyle"
      :offset="xOffset"
      v-bind="restProps"
    />
  </Group>
</template>
<script>
import { Group } from '../../vx-group'
import Rows from './Rows'
import Columns from './Columns'

export default {
  props: {
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    xScale: Function,
    yScale: Function,
    width: Number,
    height: Number,
    className: {
      type: String,
      default: ''
    },
    stroke: String,
    strokeWidth: Number,
    strokeDasharray: String,
    numTicksRows: Number,
    numTicksColumns: Number,
    rowLineStyle: Object,
    columnLineStyle: Object,
    xOffset: Number,
    yOffset: Number,
    restProps: Object
  },
  components: {
    Group, Rows, Columns
  }
}
</script>
