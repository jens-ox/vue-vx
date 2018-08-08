<template>
  <svg :width="width" :height="height" v-if="width >= 10">
    <LinearGradient from="#e5fd3d" to="#aeeef8" useID="line-gradient" />
    <rect
      :x="0"
      :y="0"
      :width="width"
      :height="height"
      fill="#744cca"
      :rx="14"
    />
    <Group :top="height / 2 " :left="width / 2">
      <g v-for="(tick, i) in yScale.ticks()" 
        :key="`radial-grid-${i}`">
        <circle
          :r="yScale(tick)"
          stroke="#aeeef8"
          :stroke-width="1"
          fill="#aeeef8"
          :fill-opacity="(1 / (i + 1)) - ((1 / i) * .2)"
          :stroke-opacity="0.2"
        />
        <text
          :y="-yScale(tick)"
          text-anchor="middle"
          dy="-.33em"
          :font-size="8"
          fill="#aeeef8"
          :fill-opacity="0.6"
        >
          {{ tick }}
        </text>
      </g>
      <LineRadial
        :data="appleStock"
        :angle="d => xScale(x(d))"
        :radius="d => yScale(y(d))"
        fill="none"
        stroke="url('#line-gradient')"
        :stroke-width="2"
        :stroke-opacity=".7"
        :curve="curveBasisOpen"
        stroke-linecap="round"
      />
      <circle v-for="(d, i) in capPoints"
        :key="`line-cap-${i}`"
        :cy="-yScale(y(d))"
        :cx="xScale(x(d)) * Math.PI / 180"
        :r="3"
        fill="#dff84d"
      />
    </Group>
  </svg>
</template>
<script>
import { Group } from '../../packages/vx-group'
import { LineRadial } from '../../packages/vx-shape'
import { scaleTime, scaleLog } from '../../packages/vx-scale'
import { curveBasisOpen } from '../../packages/vx-curve'
import { appleStock } from '../../packages/vx-mock-data'
import { extent } from 'd3-array'
import { LinearGradient } from '../../packages/vx-gradient'

export default {
  data () {
    return {
      curveBasisOpen,
      appleStock
    }
  },
  props: {
    width: Number,
    height: Number,
    margin: {
      type: Object,
      default: () => { return { top: 10, bottom: 10, left: 10, right: 10 } }
    }
  },
  computed: {
    capPoints () { return [appleStock[0]].concat([appleStock[appleStock.length - 1]]) },
    radius () { return Math.min(this.width, this.height) / 2 },

    // scales
    xScale () {
      return scaleTime({
        range: [0, Math.PI * 2],
        domain: extent(appleStock, this.x),
      })
    },
    yScale () {
      return scaleLog({
        range: [0, this.height / 2 - 20],
        domain: extent(appleStock, this.y),
      })
    }
  },
  methods: {
    // accessors
    x (d) { return new Date(d.date) },
    y (d) { return d.close }
  },
  components: {
    Group, LineRadial, LinearGradient
  }
}
</script>