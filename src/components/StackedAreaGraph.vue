<template>
  <svg :width="width" :height="height">
    <GradientOrangeRed useID="OrangeRed" />
    <rect
      :x="0"
      :y="0"
      :width="width"
      :height="height"
      fill="#f38181"
      :rx="14"
    />
    <AreaStack
      reverse
      :top="margin.top"
      :left="margin.left"
      :keys="keys"
      :data="data"
      :x="(d) => xScale(x(d.data))"
      :y0="(d) => yScale(d[0] / 100)"
      :y1="(d) => yScale(d[1] / 100)"
      :stroke-width="0"
      fill="url(#OrangeRed)"
      :fillOpacity="1"
    />
  </svg>
</template>
<script>
import { AreaStack } from './vx-shape'
import { GradientOrangeRed } from './vx-gradient'
import { browserUsage } from './vx-mock-data'
import { scaleTime, scaleLinear } from './vx-scale'
import { extent } from 'd3-array'
import { timeParse } from 'd3-time-format'
import { stack as d3stack } from 'd3-shape'

export default {
  props: {
    width: Number,
    height: Number,
    margin: {
      type: Object,
      default: () => { return { top: 10, bottom: 10, left: 10, right: 10 } }
    }
  },
  data () {
    return {
      data: [],
      parseDate: timeParse("%Y %b %d")
    }
  },
  computed: {
    keys () { return Object.keys(this.data[0]).filter(k => k !== 'date') },
    browserNames () { return [...this.keys].reverse() },

    // maxes
    xMax () { return this.width - this.margin.left - this.margin.right },
    yMax () { return this.height - this.margin.top - this.margin.bottom },

    // scales
    xScale () {
      return scaleTime({
        range: [0, this.xMax],
        domain: extent(this.data, this.x),
      })
    },
    yScale () {
      return scaleLinear({
        range: [this.yMax, 0],
      })
    }
  },
  methods: {
    // accessors
    x (d) { return this.parseDate(d.date) },
    stack (keys) { return d3stack().keys(keys) }
  },
  beforeMount () {
    this.data = browserUsage
  },
  components: {
    AreaStack, GradientOrangeRed
  }
}
</script>
