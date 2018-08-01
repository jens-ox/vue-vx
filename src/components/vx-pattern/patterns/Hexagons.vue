<template>
  <PathPattern
    :class="`vx-pattern-hexagon ${className}`"
    :path="`M ${height},0 l ${height},0 l ${height / 2},${height * s / 2} l ${-height /
      2},${height * s / 2} l ${-height},0 l ${-height / 2},${-height * s / 2} Z M 0,${height *
      s /
      2} l ${height / 2},0 M ${3 * height},${height * s / 2} l ${-height / 2},0`"
    :id="useID"
    :width="size"
    :height="s"
    :fill="fill"
    :stroke="stroke"
    :strokeWidth="strokeWidth"
    :strokeDasharray="strokeDasharray"
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
    size: {
      type: Number,
      default: 3
    },
    fill: String,
    className: {
      type: String,
      default: ''
    },
    background: String,
    stroke: String,
    strokeWidth: Number,
    strokeDasharray: String,
    strokeLinecap: String,
    shapeRendering: String
  },
  computed: {
    s: function () {
      return Math.sqrt(this.size)
    }
  },
  components: {
    PathPattern
  }  
}
</script>
