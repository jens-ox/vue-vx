<template>
    <div v-if="width >= 10" :style="{ position: 'relative', width: width + 'px', height: height + 'px', margin: '0 auto' }">
      <svg :width="width" :height="height">
        <GradientPinkRed useID="pink" />
        <rect
          :x="0"
          :y="0"
          :width="width"
          :height="height"
          :rx="14"
          :fill="`url(#pink)`"
        />
        <Group
          v-on:touchStart.native="groupTouch"
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
            v-on:mouseleave.native="circleLeave"
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
      points: [],
      tooltipTimeout: null
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
    groupTouch () {
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout)
      this.tooltipOpen = false
    },
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
    },
    circleLeave () {
      this.tooltipTimeout = setTimeout(() => {
        this.hideTooltip()
      }, 300)
    }
  },
  components: {
    Group, GlyphCircle, GradientPinkRed, Tooltip
  }
}
</script>
