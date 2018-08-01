<template>
    <AbstractGlyph :top="top" :left="left">
      <circle
        :class="`vx-glyph-dot ${className}`"
        :cx="cx"
        :cy="cy"
        :r="r"
        :fill="fill"
        :stroke="stroke"
        :strokeWidth="strokeWidth"
        :strokeDasharray="strokeDasharray"
        v-bind="restProps"
      />
      <slot />
    </AbstractGlyph>
</template>
<script>
import AbstractGlyph from './AbstractGlyph'

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
    className: String,
    cx: Number,
    cy: Number,
    r: Number,
    fill: String,
    stroke: String,
    strokeWidth: String,
    strokeDasharray: String,
    restProps: Object
  },
  components: {
    AbstractGlyph
  }
}
</script>
