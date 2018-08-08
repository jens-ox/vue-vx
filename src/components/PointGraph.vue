<template>
    <div :style="{ position: 'relative' }">
      <svg :width="width" :height="height">
        <GradientPinkRed useID="pink" />
        <rect
          :x="0"
          :y="0"
          :width="width"
          :height="height"
          :rx="14"
          fill="url(#pink)"
        />
        <Group
          v-on:touchStart.native="hideTooltip"
        >
          <GlyphCircle
            v-for="(point, i) in points"
            v-bind:key="`point-${point.x}-${i}`"
            className="dot"
            fill="#f6c431"
            :left="xScale(x(point))"
            :top="yScale(y(point))"
            style="cursor: pointer"
            :size="i % 3 === 0 ? 12 : 24"
            v-on:mouseover.native="circleEnter(point)"
            v-on:touchstart.native="circleTouch(point)"
            v-on:mouseleave.native="hideTooltip(300)"
          ></GlyphCircle>
        </Group>
      </svg>
      <Tooltip v-if="tooltipOpen" :left="tooltipLeft" :top="tooltipTop">
        <div>
          <strong>x:</strong> {{ tooltipData[0] }}
        </div>
        <div>
          <strong>y:</strong> {{ tooltipData[1] }}
        </div>
      </Tooltip>
    </div>
</template>
<script>
import { Group } from '../../packages/vx-group'
import { GlyphCircle } from '../../packages/vx-glyph'
import { GradientPinkRed } from '../../packages/vx-gradient'
import { scaleLinear } from '../../packages/vx-scale'
import { genRandomNormalPoints } from '../../packages/vx-mock-data'
import { withTooltip, Tooltip } from '../../packages/vx-tooltip'

export default {
  props: {
    width: Number,
    height: Number
  },
  data () {
    return {
      points: []
    }
  },
  computed: {
    xMax: function () { return this.width },
    yMax: function () { return this.height - 80 },

    // scales
    xScale: function () {
      return scaleLinear({
        domain: [1.3, 2.2],
        range: [0, this.xMax],
        clamp: true
      })
    },
    yScale: function () {
      return scaleLinear({
        domain: [0.75, 1.6],
        range: [this.yMax, 0],
        clamp: true
      })
    }
  },
  mixins: [withTooltip],
  beforeMount () {
    this.points = genRandomNormalPoints(600).filter((d, i) => {
      return i < 600
    })
  },
  methods: {
    // accessors
    x (d) { return d[0] },
    y (d) { return d[1] },
    z (d) { return d[2] },

    // event handlers
    circleEnter (point) {
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout)
      this.showTooltip({
        tooltipLeft: this.xScale(this.x(point)),
        tooltipTop: this.yScale(this.y(point)) + 20,
        tooltipData: point
      })
    },
    circleTouch (point) {
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout)
      this.showTooltip({
        tooltipLeft: this.xScale(this.x(point)),
        tooltipTop: this.yScale(this.y(point)) - 30,
        tooltipData: point
      })
    }
  },
  components: {
    Group, GlyphCircle, GradientPinkRed, Tooltip
  }
}
</script>
