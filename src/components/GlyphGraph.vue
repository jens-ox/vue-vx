<template>
  <svg :width="width" :height="height">
    <rect
      :x="0"
      :y="0"
      :width="width"
      :height="height"
      fill="#00f2ff"
      :rx="14"
    />
    <Group :top="margin.top" :left="margin.left">
      <LinePath
        :data="data"
        :xScale="xScale"
        :yScale="yScale"
        :x="x"
        :y="y"
        stroke='#7e20dc'
        :stroke-width="2"
        stroke-dasharray='2,2'
        :curve="curveBasis"
      />
      <LinePath
        :data="data"
        :xScale="xScale"
        :yScale="yScale"
        :x="x"
        :y="y"
        stroke='#7e20dc'
        :stroke-width="3"
        :curve="curveMonotoneX"
      >
        <g v-for="(d, i) in data" v-bind:key="`line-point-${i}`">
          <GlyphDot
            :cx="xScale(x(d))"
            :cy="yScale(y(d))"
            :r="6"
            fill='#fff'
            stroke='#01f2ff'
            :stroke-width="10"
          />
          <GlyphDot
            :cx="xScale(x(d))"
            :cy="yScale(y(d))"
            :r="6"
            fill='#01f2ff'
            stroke='#7e20dc'
            :stroke-width="3"
          />
          <GlyphDot
            :cx="xScale(x(d))"
            :cy="yScale(y(d))"
            :r="4"
            fill='#ffffff'
          />
        </g>
      </LinePath>
    </Group>
  </svg>
</template>
<script>
import { Group } from '../../packages/vx-group';
import { GlyphDot } from '../../packages/vx-glyph';
import { LinePath } from '../../packages/vx-shape';
import { genDateValue } from '../../packages/vx-mock-data';
import { scaleTime, scaleLinear } from '../../packages/vx-scale';
import { curveBasis, curveMonotoneX } from '../../packages/vx-curve';
import { extent, max } from 'd3-array';

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
      curveMonotoneX,
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
        domain: extent(this.data, this.x),
      })
    },
    yScale () {
      return scaleLinear({
        range: [this.yMax, 0],
        domain: [0, max(this.data, this.y)],
        nice: true,
      })
    }
  },
  beforeMount () {
    this.data = genDateValue(15)
  },
  methods: {
    // accessors
    x (d) { return d.date },
    y (d) { return d.value }
  },
  components: {
    Group, GlyphDot, LinePath
  }
}
</script>