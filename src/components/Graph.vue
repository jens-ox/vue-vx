<template>  
  <svg :width="width" :height="height">
    <rect
      :x="0"
      :y="0"
      :width="width"
      :height="height"
      fill="#242424"
      :rx="14"
    />
    <Group
      v-if="xMax > 8"
      v-for="(d, i) in series"
      v-bind:key="`lines-${i}`"
      :top="offset(i)"
    >
      <line-path
        :data="d"
        :xScale="xScale"
        :yScale="yScale"
        :x="x"
        :y="y"
        :pathStyle="{
          stroke: '#ffffff',
          strokeWidth: 1
        }"
        :curve="curve(i)"
      />
    </Group>
  </svg>
</template>
<script>
import { Group } from './vx-group'
import { LinePath } from './vx-shape'
import { curveMonotoneX } from 'd3-shape'
import { genDateValue } from './vx-mock-data'
import { scaleTime, scaleLinear } from './vx-scale'
import { extent, max } from 'd3-array'

export default {
  props: {
    width: Number,
    height: Number
  },
  data () {
    return {
      series: []
    }
  },
  beforeMount () {
    this.series = this.genLines(12)
  },
  computed: {
    data: function () {
      return this.series.reduce((rec, d) => {
        return rec.concat(d)
      }, [])
    },
    xMax: function () {
      return this.width
    },
    yMax: function () {
      return this.height / 8
    },

    // scales
    xScale: function () {
      return scaleTime({
        range: [0, this.xMax],
        domain: extent(this.data, this.x)
      })
    },
    yScale: function () {
      return scaleLinear({
        range: [this.yMax, 0],
        domain: [0, max(this.data, this.y)]
      })
    },
  },
  methods: {
    genLines (num) {
      return new Array(num).fill(1).map(() => {
        return genDateValue(25)
      })
    },
    x (d) { return d.date },
    y (d) { return d.value },
    offset (i) { return i * this.yMax / 2 },
    curve (i) { return i % 2 == 0 ? curveMonotoneX : undefined }
  },
  components: {
    Group, LinePath
  }
}
</script>
