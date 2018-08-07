<template>
  <g>
    <path
      :class="`vx-linepath ${className}`"
      :d="path(data)"
      :style="pathStyle"
    />
    <g class="vx-linepath-glyphs">
      <slot />
    </g>
  </g>
</template>
<script>
import { line } from 'd3-shape'
import { curveLinear } from '../../vx-curve'

export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    xScale: Function,
    yScale: Function,
    data: Array,
    x: Function,
    y: Function,
    defined: {
      type: Function,
      default: () => true
    },
    pathStyle: {
      type: Object,
      default: () => {}
    },
    curve: {
      type: Function,
      default: curveLinear
    }
  },
  methods: {
    path (data) {
      const path = line()
        .x(d => this.xScale(this.x(d)))
        .y(d => this.yScale(this.y(d)))
        .defined(this.defined)
        .curve(this.curve)      
      return path(data)
    }
  }
}
</script>
