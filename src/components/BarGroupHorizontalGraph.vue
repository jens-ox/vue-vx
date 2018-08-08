<template>
  <svg :width="width" :height="height">
    <rect :x="0" :y="0" :width="width" :height="height" fill='#612efb' :rx="14" />
    <Group :top="margin.top" :left="margin.left">
      <BarGroupHorizontal
        :data="data"
        :keys="keys"
        :width="xMax"
        :y0="y0"
        :y0Scale="y0Scale"
        :y1Scale="y1Scale"
        :xScale="xScale"
        :zScale="zScale"
        :rx="4"
      />
      <AxisLeft
        :scale="y0Scale"
        stroke="#e5fd3d"
        tickStroke="#e5fd3d"
        hideAxisLine
        :tickLabelProps="{
          fill: '#e5fd3d',
          fontSize: 11,
          textAnchor: 'end',
          dy: '0.33em'
        }"
      />
    </Group>
  </svg>
</template>
<script>
import { BarGroupHorizontal } from '../../packages/vx-shape'
import { Group } from '../../packages/vx-group'
import { AxisLeft } from '../../packages/vx-axis'
import { cityTemperature } from '../../packages/vx-mock-data'
import { scaleBand, scaleLinear, scaleOrdinal } from '../../packages/vx-scale'
import { timeParse, timeFormat } from 'd3-time-format'
import { max } from 'd3-array'

export default {
  props: {
    width: Number,
    height: Number,
    margin: {
      type: Object,
      default: () => { return { top: 10, bottom: 10, left: 50, right: 30 } }
    }
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    // bounds
    xMax () { return this.width - this.margin.left - this.margin.right },
    yMax () { return this.height - this.margin.top - this.margin.bottom },
    
    keys () { return Object.keys(this.data[0]).filter(d => d !== 'date') },
    parseDate () { return timeParse('%Y%m%d') },
    format () { return timeFormat('%b %d') },
    formatDate () { return date => this.format(this.parseDate(date)) },

    // scales
    y0Scale () {
      return scaleBand({
        rangeRound: [0, this.yMax],
        domain: this.data.map(this.y0),
        padding: 0.2,
        tickFormat: () => val => this.formatDate(val)
      })
    },
    y1Scale () {
      return scaleBand({
        rangeRound: [0, this.y0Scale.bandwidth()],
        domain: this.keys,
        padding: 0.1
      })
    },
    xScale () {
      return scaleLinear({
        rangeRound: [this.xMax, 0],
        domain: [
          0,
          max(this.data, d => {
            return max(this.keys, key => d[key])
          })
        ]
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
    y0 (d) { return d.date },
    x (d) { return d.value }
  },
  beforeMount () {
    this.data = cityTemperature.slice(0, 4)
  },
  components: {
    BarGroupHorizontal, Group, AxisLeft
  }
}
</script>