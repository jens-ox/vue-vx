<template>
  <g>
    <path
      :class="`vx-linepath ${className}`"
      :d="path(data)"
      :stroke="stroke"
      :strokeWidth="strokeWidth"
      :strokeDasharray="strokeDasharray"
      :strokeDashoffset="strokeDashoffset"
      :fill="fill"
      v-bind="restProps"
    />
    <g v-if="glyph" class="vx-linepath-glyphs">
      {{ data.map(glyph) }}
    </g>
  </g>
</template>
<script>
import { line } from 'd3-shape'
import { curveLinear } from '../../vx-curve'

export default {
  props: {
    className: String,
    xScale: Function,
    yScale: Function,
    data: Array,
    x: Function,
    y: Function,
    defined: {
      type: Function,
      default: () => true
    },
    stroke: {
      type: String,
      default: 'steelblue'
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    strokeDasharray: {
      type: String,
      default: ''
    },
    strokeDashoffset: {
      type: Number,
      default: 0
    },
    fill: {
      type: String,
      default: 'none'
    },
    glyph: Function,
    curve: {
      type: Function,
      default: curveLinear
    },
    restProps: Object
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
