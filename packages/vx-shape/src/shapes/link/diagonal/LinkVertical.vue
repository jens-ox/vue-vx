<template>
  <path
    :ref="innerRef"
    :class="`vx-link-vertical ${className}`"
    :d="computedPath"
    v-bind="data"
  />
</template>
<script>
import { linkVertical } from 'd3-shape'

export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    innerRef: Function,
    data: Object,
    x: {
      type: Function,
      default (d) { return d.x }
    },
    y: {
      type: Function,
      default (d) { return d.y }
    },
    source: {
      type: Function,
      default (d) { return d.source }
    },
    target: {
      type: Function,
      default (d) { return d.target }
    },
    path: Function
  },
  computed: {
    pathVerticalDiagonal () {
      let link = linkVertical()
      link.x(this.x)
      link.y(this.y)
      link.source(this.source)
      link.target(this.target)
      return link(this.data)
    },
    computedPath () {
      return this.path ? this.path(this.data) : this.pathVerticalDiagonal
    }
  }
}
</script>