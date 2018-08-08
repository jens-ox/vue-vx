<template>
  <svg :width="width" :height="height" v-if="width >= 10">
    <GradientOrangeRed useID="linear" :vertical="false" :fromOpacity="0.8" :toOpacity="0.3" />
    <rect :x="0" :y="0" :width="width" :height="height" fill="transparent" stroke="black" stroke-width="2" :rx="14" />
    <Grid
      :top="margin.top"
      :left="margin.left"
      :xScale="xScale"
      :yScale="yScale"
      :width="xMax" 
      :height="yMax"
      :numTicksRows="numTicksForHeight(height)"
      :numTicksColumns="numTicksForWidth(width)"
    />
    <Group :top="margin.top" :left="margin.left">
      <AreaClosed
        :data="data"
        :xScale="xScale"
        :yScale="yScale"
        :x="x"
        :y="y"
        :strokeWidth="2"
        stroke="transparent"
        fill="url(#linear)"
        :curve="curveBasis"
      />
      <LinePath
        :data="data"
        :xScale="xScale"
        :yScale="yScale"
        :x="x"
        :y="y"
        :pathStyle="{
          stroke: 'url(\'#linear\')',
          strokeWidth: 2
        }"
        :curve="curveBasis"
      />
    </Group>
    <Group :left="margin.left">
      <AxisLeft
        :top="margin.top"
        :scale="yScale"
        hideZero
        :numTicks="numTicksForHeight(height)"
        :labelOffset="40"
        label="Axis Left Label"
      />
      <AxisRight
        :top="margin.top"
        :left="xMax"
        :scale="yScale"
        hideZero
        :numTicks="numTicksForHeight(height)"
        :labelOffset="40"
        label="Axis Right Label"
      />
      <AxisBottom
        :top="height - margin.bottom"
        :scale="xScale"
        :numTicks="numTicksForWidth(width)"
        :tickRotate="45"
        :tickLabelProps="{
          'dx': '0.75em',
          'dy': '0.25em'
        }"
        :labelOffset="25"
        label="Time"
      >
      </AxisBottom>
    </Group>
  </svg>
</template>
<script>
import { Grid } from '../../packages/vx-grid'
import { Group } from '../../packages/vx-group'
import { curveBasis } from '../../packages/vx-curve'
import { GradientOrangeRed } from '../../packages/vx-gradient'
import { genDateValue } from '../../packages/vx-mock-data'
import { AxisLeft, AxisRight, AxisBottom } from '../../packages/vx-axis'
import { AreaClosed, LinePath, LineShape } from '../../packages/vx-shape'
import { scaleTime, scaleLinear } from '../../packages/vx-scale'
import { extent, max } from 'd3-array'

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
      curveBasis,
      data: []
    }
  },
  computed: {
    // maxes
    xMax () { return this.width - this.margin.left - this.margin.right },
    yMax () { return this.height - this.margin.top - this.margin.bottom },

    // scales
    xScale () {
      return scaleTime({
        range: [0, this.xMax],
        domain: extent(this.data, this.x)
      })
    },
    yScale () {
      return scaleLinear({
        range: [this.yMax, 0],
        domain: [0, max(this.data, this.y)],
        nice: true
      })
    },
  },
  methods: {
    // accessors
    x (d) { return d.date },
    y (d) { return d.value },

    // dynamic ticks
    numTicksForHeight (height) {
      if (height <= 300) return 3
      if (300 < height && height <= 600) return 5
      return 10
    },
    numTicksForWidth (width) {
      if (width <= 300) return 2
      if (300 < width && width <= 400) return 5
      return 10
    }
  },
  beforeMount () {
    this.data = genDateValue(20)
  },
  components: {
    Grid, Group, GradientOrangeRed, AxisLeft, AxisRight, AxisBottom, AreaClosed, LinePath, LineShape
  }
}
</script>
