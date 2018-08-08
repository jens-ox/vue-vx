<template>
  <svg :width="width" :height="height" v-if="width >= 10">
    <GradientPinkBlue useID="gradients" />
    <rect
      :x="0"
      :y="0"
      :rx="14"
      :width="width"
      :height="height"
      fill="url('#gradients')"
    />
    <Group :top="height / 2 - margin.top" :left="width / 2">
      <Pie
        :data="browsers"
        :pieValue="d => d.usage"
        :outerRadius="radius - 80"
        :innerRadius="radius - 120"
        fill="white"
        :fillOpacity="d => 1 / (d.index + 2) "
        :cornerRadius="3"
        :padAngle="0"
        :centroid="(centroid, arc) => {
          const [x, y] = centroid
          const { startAngle, endAngle } = arc
          if (endAngle - startAngle < .1) return null
          return { x, y, text: arc.data.label }
        }"
      />
      <Pie
        :data="letters"
        :pieValue="d => d.frequency"
        :outerRadius="radius - 135"
        fill="black"
        :fillOpacity="d => 1 / (d.index + 2)"
        :centroid="(centroid, arc) => {
          const [x, y] = centroid
          return { x, y, text: arc.data.letter }
        }"
      />
    </Group>
  </svg>
</template>
<script>
import { Pie } from '../../packages/vx-shape'
import { Group } from '../../packages/vx-group'
import { GradientPinkBlue } from '../../packages/vx-gradient'
import { letterFrequency, browserUsage } from '../../packages/vx-mock-data'

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
      letters: [],
      browsers: []
    }
  },
  computed: {
    radius () { return Math.min(this.width, this.height) / 2 }
  },
  beforeMount () {
    this.letters = letterFrequency.slice(0, 4)
    this.browsers = Object.keys(browserUsage[0])
      .filter(k => k !== "date")
      .map(k => ({ label: k, usage: browserUsage[0][k] }))
  },
  components: {
    Pie, Group, GradientPinkBlue
  }
}
</script>