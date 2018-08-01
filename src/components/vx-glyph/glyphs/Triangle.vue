<template>
  <AbstractGlyph :top="top" :left="left">
    <path
      :class="`vx-glyph-triangle ${className}`"
      :d="path()"
      v-bind="restProps"
    />
    <slot />
  </AbstractGlyph>
</template>
<script>
import { symbol, symbolTriangle } from 'd3-shape'
import AbstractGlyph from './AbstractGlyph'

export default {
  props: {
    className: String,
    top: Number,
    left: Number,
    size: Number,
    restProps: Object
  },
  data () {
    return {
      path: {}
    }
  },
  beforeMount () {
    this.path = symbol()
    this.path.type(symbolTriangle)
    if (this.size) {
      this.path.size(this.size)
    }
  },
  components: {
    AbstractGlyph
  }
}
</script>
