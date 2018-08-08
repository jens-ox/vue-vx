<template>
  <svg :width="width" :height="height">
    <rect :x="0" :y="0" :width="width" :height="height" fill="#f3f3f3" :rx="14" />
    <Group :left="margin.left" :top="margin.top">
      <GridRows :scale="yScale" :width="xMax" :height="yMax" stroke="#e0e0e0" />
      <GridColumns :scale="xScale" :width="xMax" :height="yMax" stroke="#e0e0e0" />
      <line :x1="xMax" :x2="xMax" :y1="0" :y2="yMax" stroke="#e0e0e0" />
      <AxisBottom :top="yMax" :scale="xScale" :numTicks="width > 520 ? 10 : 5" />
      <AxisLeft :scale="yScale" />
      <text :x="-70" :y="15" transform="rotate(-90)" :font-size="10">
        Temperature (°F)
      </text>
      <Threshold
        :data="data"
        :x="date"
        :y0="ny"
        :y1="sf"
        :xScale="xScale"
        :yScale="yScale"
        :clipAboveTo="0"
        :clipBelowTo="yMax"
        :curve="curveBasis"
        :belowAreaStyle="{
          strokeWidth: 0,
          fill: 'red',
          fillOpacity: 0.4
        }"
        :aboveAreaStyle="{
          strokeWidth: 0,
          fill: 'green',
          fillOpacity: 0.4
        }"
      />
      <LinePath
        :data="data"
        :curve="curveBasis"
        :x="date"
        :y="sf"
        :xScale="xScale"
        :yScale="yScale"
        stroke="#000"
        :strokeWidth="1.5"
        :strokeOpacity="0.8"
        strokeDasharray="1,2"
      />
      <LinePath
        :data="data"
        :curve="curveBasis"
        :x="date"
        :y="ny"
        :xScale="xScale"
        :yScale="yScale"
        stroke="#000"
        :strokeWidth="1.5"
      />
    </Group>
  </svg>
</template>
<script>
import { Group } from '../../packages/vx-group'
import { curveBasis } from '../../packages/vx-curve'
import { LinePath } from '../../packages/vx-shape'
import { Threshold } from '../../packages/vx-threshold'
import { scaleTime, scaleLinear } from '../../packages/vx-scale'
import { AxisLeft, AxisBottom } from '../../packages/vx-axis'
import { GridRows, GridColumns } from '../../packages/vx-grid'
import { cityTemperature } from '../../packages/vx-mock-data'
import { timeParse } from 'd3-time-format'

export default {
  props: {
    width: Number,
    height: Number,
    margin: {
      type: Object,
      default: () => { return { top: 30, bottom: 30, left: 30, right: 30 } }
    }
  },
  data () {
    return {
      curveBasis,
      data: cityTemperature
    }
  },
  computed: {
    parseDate () { return timeParse('%Y%m%d') },

    // bounds
    xMax () { return this.width - this.margin.left - this.margin.right },
    yMax () { return this.height - this.margin.top - this.margin.bottom },

    // scales
    xScale () {
      return scaleTime({
        range: [0, this.xMax],
        domain: [Math.min(...this.data.map(this.date)), Math.max(...this.data.map(this.date))]
      })
    },
    yScale () {
      return scaleLinear({
        range: [this.yMax, 0],
        domain: [
          Math.min(...this.data.map(d => Math.min(this.ny(d), this.sf(d)))),
          Math.max(...this.data.map(d => Math.max(this.ny(d), this.sf(d))))
        ],
        nice: true
      })
    }
  },
  methods: {
    // accessors
    date (d) { return this.parseDate(d.date) },
    ny (d) { return d['New York'] },
    sf (d) { return d['San Francisco'] }

  },
  components: {
    Group, LinePath, Threshold, AxisLeft, AxisBottom, GridRows, GridColumns
  }
}
</script>
