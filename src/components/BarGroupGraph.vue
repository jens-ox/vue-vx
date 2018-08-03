<template>
  <svg :width="width" :height="height" v-if="width >= 10">
    <rect
      :x="0"
      :y="0"
      :width="width"
      :height="height"
      fill='#612efb'
      :rx="14"
    />
    <BarGroup
      :top="margin.top"
      :left="margin.left"
      :data="data"
      :keys="keys"
      :height="yMax"
      :x0="x0"
      :x0Scale="x0Scale"
      :x1Scale="x1Scale"
      :yScale="yScale"
      :zScale="zScale"
      :rx="4"
      @click="notify(data)"
    />
    <AxisBottom
      :scale="x0Scale"
      :top="yMax + margin.top"
      :left="margin.left"
      stroke='#e5fd3d'
      tickStroke='#e5fd3d'
      hideAxisLine
      :tickLabelProps="{
        'fill': '#e5fd3d',
        'font-size': 11,
        'text-anchor': 'middle'
      }"
    />
  </svg>
</template>
<script>
import { BarGroup } from './vx-shape'
import { Group } from './vx-group'
import { AxisBottom } from './vx-axis'
import { cityTemperature } from './vx-mock-data'
import { scaleBand, scaleLinear, scaleOrdinal } from './vx-scale'
import { timeParse, timeFormat } from 'd3-time-format'
import { max } from 'd3-array'

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
      parseDate: timeParse("%Y%m%d"),
      format: timeFormat("%b %d")
    }
  },
  computed: {
    keys () { return Object.keys(this.data[0]).filter(d => d !== 'date') },

    // bounds
    xMax () { return this.width - this.margin.left - this.margin.right },
    yMax () { return this.height - this.margin.top - this.margin.bottom - 50 },

    // scales
    x0Scale () {
      return scaleBand({
        rangeRound: [0, this.xMax],
        domain: this.data.map(this.x0),
        padding: 0.2,
        tickFormat: () => (val) => this.formatDate(val)
      })
    },
    x1Scale () {
      return scaleBand({
        rangeRound: [0, this.x0Scale.bandwidth()],
        domain: this.keys,
        padding: .1
      })
    },
    yScale () {
      return scaleLinear({
        rangeRound: [this.yMax, 0],
        domain: [0, max(this.data, (d) => {
          return max(this.keys, (key) => d[key])
        })],
      })
    },
    zScale () {
      return scaleOrdinal({
        domain: this.keys,
        range: ['#aeeef8', '#e5fd3d', '#9caff6']
      })
    }
  },
  methods: {
    notify (data) {
      alert(`clicked: ${JSON.stringify(data)}`)
    },
    formatDate (date) { return this.format(this.parseDate(date)) },

    // accessors
    x0 (d) { return d.date }
  },
  beforeMount () {
    this.data = cityTemperature.slice(0, 4)
  },
  components: {
    BarGroup, Group, AxisBottom
  }
}
</script>
