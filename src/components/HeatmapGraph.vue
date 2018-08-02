<template>
  <svg :width="width" :height="height">
    <rect
      :x="0"
      :y="0"
      :width="width"
      :height="height"
      :rx="14"
      fill="#28272c"
    />
    <Group :top="margin.top" :left="margin.left">
      <Heatmap
        symbolType="circle"
        :data="data"
        :xScale="xScale"
        :yScale="yScale"
        :colorScale="colorScale"
        :opacityScale="opacityScale"
        :gap="4"
        :clickHandler="clickHandler"
        :symbolProps="{
          radius: min([bWidth, bHeight]) / 2
        }"
        :mouseoverHandler="mouseoverHandler"
        :mouseoutHandler="mouseoutHandler"
      />
    </Group>
    <Group :top="margin.top" :left="xMax + margin.left">
      <Heatmap
        symbolType="rect"
        :data="data"
        :xScale="xScale"
        :yScale="yScale"
        :colorScale="colorScale2"
        :opacityScale="opacityScale"
        :gap="2"
        :clickHandler="clickHandler"
        :symbolProps="{
          binWidth: bWidth,
          binHeight: bHeight
        }"
        :mouseoverHandler="mouseoverHandler"
        :mouseoutHandler="mouseoutHandler"
      />
    </Group>
  </svg>
</template>
<script>
import { Group } from './vx-group'
import { genBins } from './vx-mock-data'
import { scaleLinear } from './vx-scale'
import { Heatmap } from './vx-heatmap'
import { min, max } from 'd3-array'

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
      min,
      data: []
    }
  },
  computed: {
    // bounds
    xMax () { return (this.width - this.margin.left - this.margin.right) / 2 },
    yMax () { return this.height - this.margin.bottom - this.margin.top },
    maxBucketSize () { return max(this.data, d => this.y(d).length) },
    bWidth () { return this.xMax / this.data.length },
    bHeight () { return this.yMax / this.maxBucketSize },
    colorMax () { return max(this.data, d => max(this.y(d), this.z)) },
      
    // scales
    xScale () {
      return scaleLinear({
        range: [0, this.xMax],
        domain: [0, this.data.length]
      }) 
    },
    yScale () {
      return scaleLinear({
        range: [this.yMax, 0],
        domain: [0, this.maxBucketSize]
      })
    },
    colorScale () {
      return scaleLinear({
        range: ['#77312f', '#f33d15'],
        domain: [0, this.colorMax]
      })
    },
    colorScale2 () {
      return scaleLinear({
        range: ['#122549', '#b4fbde'],
        domain: [0, this.colorMax]
      })
    },
    opacityScale () {
      return scaleLinear({
        range: [.1, 1],
        domain: [0, this.colorMax]
      })
    }
  },
  methods: {
    // accessors
    x (d) { return d.bin },
    y (d) { return d.bins },
    z (d) { return d.count },

    clickHandler (data) {
      alert(`clicked: ${JSON.stringify(data)}`)
    },
    mouseoverHandler ($event) {
      $event.target.style.stroke = 'white'
      $event.target.style['stroke-width'] = '1px'
    },
    mouseoutHandler ($event) {
      $event.target.style.stroke = 'transparent'
    }
  },
  beforeMount () {
    this.data = genBins(16, 16)
  },
  components: {
    Group, Heatmap
  }
}
</script>