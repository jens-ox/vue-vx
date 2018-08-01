<template>
  <PathPattern
    :class="`vx-pattern-wave ${className}`"
    :path="`M 0 ${height / 2} c ${height / 8} ${-height / 4} , ${height * 3 / 8} ${-height /
      4} , ${height / 2} 0
            c ${height / 8} ${height / 4} , ${height * 3 / 8} ${height / 4} , ${height /
      2} 0 M ${-height / 2} ${height / 2}
            c ${height / 8} ${height / 4} , ${height * 3 / 8} ${height / 4} , ${height /
      2} 0 M ${height} ${height / 2}
            c ${height / 8} ${-height / 4} , ${height * 3 / 8} ${-height / 4} , ${height / 2} 0`"
    :useID="useID"
    :width="width"
    :height="height"
    :fill="fill"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    :stroke-dasharray="strokeDasharray"
    :strokeLinecap="strokeLinecap"
    :shapeRendering="shapeRendering"
    :background="background"
  />
</template>
<script>
import PathPattern from './Path'

export default {
  props: {
    useID: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    fill: String,
    className: {
      type: String,
      default: ''
    },
    backgroud: String,
    stroke: String,
    strokeWidth: Number,
    strokeDasharray: String,
    strokeLinecap: String,
    shapeRendering: {
      type: String,
      default: 'auto'
    },
    background: String
  },
  components: {
    PathPattern
  }
}
</script>
