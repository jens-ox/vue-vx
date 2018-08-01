<template>
  <svg :width="width" :height="height" v-if="height >= 10">
    <GradientTealBlue :useID="`teal`" />
    <rect
      :x="0"
      :y="0"
      :width="width"
      :height="height"
      :fill="`url(#teal)`"
      :rx="14"
    />
    <Group :top="40">
      <Group v-for="d in data" v-bind:key="`bar-${x(d)}`">
        <Bar
          :width="xScale.bandwidth()"
          :height="barHeight(d)"
          :x="xScale(x(d))"
          :y="yMax - barHeight(d)"
          fill="rgba(23, 233, 217, .5)"
          :data="{ x: x(d), y: y(d) }"
          @click="alert(`clicked: ${JSON.stringify(d)}`)"
        />
      </Group>
    </Group>
  </svg>
</template>
<script>
import { Bar } from './vx-shape'
import { Group } from './vx-group'
import { GradientTealBlue } from './vx-gradient'
import { letterFrequency } from '@vx/mock-data'
import { max } from 'd3-array'
import { scaleBand, scaleLinear } from './vx-scale';

export default {
  props: {
    width: Number,
    height: Number
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    xMax: function () { return this.width },
    yMax: function () { return this.height - 120 },

    // scales
    xScale: function () {
      return scaleBand({
        rangeRound: [0, this.xMax],
        domain: this.data.map(this.x),
        padding: 0.4,
      })
    },
    yScale: function () {
      return scaleLinear({
        rangeRound: [this.yMax, 0],
        domain: [0, max(this.data, this.y)],
      })
    }
  },
  beforeMount () {
    this.data = letterFrequency.slice(5)
  },
  methods: {
    barHeight (d) {
      return this.yMax - this.yScale(this.y(d))
    },
    round (value, precision) {
      var multiplier = Math.pow(10, precision || 0)
      return Math.round(value * multiplier) / multiplier
    },
    x (d) { return d.letter },
    y (d) { return +d.frequency * 100 }
  },
  components: {
    Bar, Group, GradientTealBlue
  }
}
</script>
