<template>
  <svg :width="width" :height="height" v-if="width >= 10">
    <GradientOrangeRed useID="linear" :vertical="false" :fromOpacity="0.8" :toOpacity="0.3" />
    <rect :x="0" :y="0" :width="width" :height="height" fill="#f4419f" :rx="14" />
    <Grid
      :top="margin.top"
      :left="margin.left"
      :xScale="xScale"
      :yScale="yScale"
      stroke="rgba(142, 32, 95, 0.9)"
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
        stroke="url('#linear')"
        :strokeWidth="2"
        :curve="curveBasis"
      />
    </Group>
    <Group :left="margin.left">
      <AxisLeft
        :top="margin.top"
        :left="0"
        :scale="yScale"
        hideZero
        :numTicks="numTicksForHeight(height)"
        label="Axis Left Label"
        :labelProps="{
          'fill': '#8e205f',
          'text-anchor': 'middle',
          'font-size': 12,
          'font-family': 'Arial'
        }"
        stroke="#1b1a1e"
        tickStroke="#8e205f"
        :tickLabelProps="(value, index) => ({
          'fill': '#8e205f',
          'text-anchor': 'end',
          'font-size': 10,
          'font-family': 'Arial',
          'dx': '-0.25em',
          'dy': '0.25em'
        })"
        tickComponent="text"
      />
      <AxisRight
        :top="margin.top"
        :left="xMax"
        :scale="yScale"
        hideZero
        :numTicks="numTicksForHeight(height)"
        label="Axis Right Label"
        :labelProps="{
          'fill': '#8e205f',
          'text-anchor': 'middle',
          'font-size': 12,
          'font-family': 'Arial'
        }"
        stroke="#1b1a1e"
        tickStroke="#8e205f"
        :tickLabelProps="(value, index) => ({
          fill: '#8e205f',
          'text-anchor': 'start',
          'font-size': 10,
          'font-family': 'Arial',
          'dx': '0.25em',
          'dy': '0.25em'
        })"
      />
      <AxisBottom
        :top="height - margin.bottom"
        :left="0"
        :scale="xScale"
        :numTicks="numTicksForWidth(width)"
        label="Time"
      >
        <g className="my-custom-bottom-axis">
          <Group v-for="(tick, i) in ticks"
            v-bind:key="`vx-tick-${tick.value}-${i}`"
            className="vx-axis-tick'"
          >
            <Line :from="tick.from" :to="tick.to" :stroke="tickColor" />
            <text
              :transform="`translate(${tick.to.x}, ${tick.to.y + tickLabelSize + props.tickLength}) rotate(${tickRotate})`"
              :fontSize="tickLabelSize"
              text-anchor="middle"
              :fill="tickColor"
            >
              {{ tick.formattedValue }}
            </text>
          </Group>
          <text text-anchor="middle" :transform="`translate(${axisCenter}, 50)`" fontSize="8">
            {{ props.label }}
          </text>
        </g>
      </AxisBottom>
    </Group>
  </svg>
</template>
<script>
import { Grid } from './vx-grid'
import { Group } from './vx-group'
import { curveBasis } from './vx-curve'
import { GradientOrangeRed } from './vx-gradient'
import { genDateValue } from './vx-mock-data'
import { AxisLeft, AxisRight, AxisBottom } from './vx-axis'
import { AreaClosed, LinePath, LineShape } from './vx-shape'
import { scaleTime, scaleLinear } from './vx-scale'
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
      tickLabelSize: 10,
      tickRotate: 45,
      tickColor: '#8e205f',
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

    // scale tick formats
    xFormat () {
      return this.xScale.tickFormat ? this.xScale.tickFormat() : d => d
    },
    yFormat () {
      return this.yScale.tickFormat ? this.yScale.tickFormat() : d => d
    }
  },
  methods: {
    axisCenter (props) {
      return (props.axisToPoint.x - props.axisFromPoint.x) / 2
    },

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
