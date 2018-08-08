<template>
  <AbstractGlyph :top="top" :left="left">
    <path
      :class="`vx-glyph-square ${className}`"
      :d="path()"
      v-bind="restProps"
    />
    <slot />
  </AbstractGlyph>
</template>
<script>
import { symbol, symbolSquare } from 'd3-shape'
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
    this.path.type(symbolSquare)
    if (this.size) {
      this.path.size(this.size)
    }
  },
  components: {
    AbstractGlyph
  }
}
</script>
