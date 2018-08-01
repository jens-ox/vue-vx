<template>
  <AbstractPattern :useID="useID" :width="width" :height="height">
    <rect v-if="!!background" width="width" :height="height" fill="background" />
    <path
      :class="`vx-pattern-path ${className}`"
      :d="path"
      :fill="fill"
      :stroke="stroke"
      :strokeWidth="strokeWidth"
      :strokeDasharray="strokeDasharray"
      :strokeLinecap="strokeLinecap"
      :shapeRendering="shapeRendering"
    />
  </AbstractPattern>
</template>
<script>
import AbstractPattern from './Pattern'

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
    fill: {
      type: String,
      default: 'transparent'
    },
    stroke: String,
    strokeWidth: Number,
    strokeDasharray: String,
    strokeLinecap: {
      type: String,
      default: 'square'
    },
    shapeRendering: {
      type: String,
      default: 'auto'
    },
    background: String,
    className: {
      type: String,
      default: ''
    },
    path: String
  },
  components: {
    AbstractPattern
  }
}
</script>
