<template>
  <AbstractGlyph :top="top" :left="left">
    <path
      :class="`vx-glyph-circle ${className}`"
      :d="path()"
      v-bind="restProps"
    />
    <slot />
  </AbstractGlyph>
</template>
<script>
import { symbol, symbolCircle } from 'd3-shape'
import AbstractGlyph from './AbstractGlyph'

export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    top: Number,
    left: Number,
    size: Number,
    restProps: Object
  },
  data () {
    return {
      path: () => {}
    }
  },
  beforeMount () {
    this.path = symbol()
    this.path.type(symbolCircle)
    if (this.size) {
      this.path.size(this.size)
    }
  },
  components: {
    AbstractGlyph
  }
}
</script>
