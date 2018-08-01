<template>
  <div v-if="width >= 10" :style="{ position: 'relative', width: width + 'px', height: height + 'px', margin: '0 auto' }">
    <svg :ref="s => (this.svg = s)" :width="width" :height="height">
      <rect :x="0" :y="0" :width="width" :height="height" fill="#32deaa" :rx="14" />
      <LinearGradient
        useID="gradient"
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
      >
        <stop
          offset="0%"
          stop-color="#FFFFFF"
          stop-opacity="1"
        />
        <stop
          offset="100%"
          stop-color="#FFFFFF"
          stop-opacity="0.2"
        />
      </LinearGradient>
      <GridRows
        :lineStyle="{ pointerEvents: 'none' }"
        :scale="yScale"
        :width="xMax"
        stroke-dasharray="2,2"
        stroke="rgba(255,255,255,0.3)"
      />
      <GridColumns
        :lineStyle="{ pointerEvents: 'none' }"
        :scale="xScale"
        :height="yMax"
        stroke-dasharray="2,2"
        stroke="rgba(255,255,255,0.3)"
      />
      <AreaClosed
        :data="stock"
        :xScale="xScale"
        :yScale="yScale"
        :x="xStock"
        :y="yStock"
        :strokeWidth="1"
        stroke="url(#gradient)"
        fill="url(#gradient)"
        :curve="curveMonotoneX"
      />
      <Bar
        :x="0"
        :y="0"
        :width="width"
        :height="height"
        fill="transparent"
        :rx="14"
        :data="stock"
        v-on:touchstart.native="handleTooltip({
            data: stock,
            xStock,
            xScale,
            yScale,
          })"
        v-on:touchmove.native="handleTooltip({
            data: stock,
            xStock,
            xScale,
            yScale,
          })"
        v-on:mousemove.native="handleTooltip({
            data: stock,
            xStock,
            xScale,
            yScale,
          })"
        v-on:mouseLeave="data => hideTooltip()"
      />
      <g v-if="tooltipData">
        <LineShape
          :from="{ x: tooltipLeft, y: 0 }"
          :to="{ x: tooltipLeft, y: yMax }"
          stroke="rgba(92, 119, 235, 1.000)"
          :strokeWidth="2"
          :style="{ pointerEvents: 'none' }"
          stroke-dasharray="2,2"
        />
        <circle
          :cx="tooltipLeft"
          :cy="tooltipTop + 1"
          :r="4"
          fill="black"
          :fillOpacity="0.1"
          stroke="black"
          :strokeOpacity="0.1"
          :strokeWidth="2"
          :style="{ pointerEvents: 'none' }"
        />
        <circle
          :cx="tooltipLeft"
          :cy="tooltipTop"
          :r="4"
          fill="rgba(92, 119, 235, 1.000)"
          stroke="white"
          :strokeWidth="2"
          :style="{ pointerEvents: 'none' }"
        />
      </g>
    </svg>
    <div v-if="tooltipData">
      <Tooltip
        :top="tooltipTop - 12"
        :left="tooltipLeft + 12"
        :style="{
          backgroundColor: 'rgba(92, 119, 235, 1.000)',
          color: 'white',
        }"
      >
        {{ '$' + yStock(tooltipData) }}
      </Tooltip>
      <Tooltip
        :top="yMax - 14"
        :left="tooltipLeft"
        :style="{
          transform: 'translateX(-50%)',
        }"
      >
        {{ formatDate(xStock(tooltipData)) }}
      </Tooltip>
    </div>
  </div>
</template>
<script>
import { AreaClosed, LineShape, Bar } from './vx-shape'
import { appleStock } from './vx-mock-data'
import { curveMonotoneX } from './vx-curve'
import { LinearGradient } from './vx-gradient'
import { GridRows, GridColumns } from './vx-grid'
import { scaleTime, scaleLinear } from './vx-scale'
import { withTooltip, Tooltip } from './vx-tooltip'
import { localPoint } from './vx-event'
import { extent, max, bisector } from 'd3-array'
import { timeFormat } from 'd3-time-format'

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
      curveMonotoneX,
      stock: [],
      formatDate: () => {},
      bisectDate: bisector(d => new Date(d.date)).left
    }
  },
  computed: {
    // bounds
    xMax () { return this.width - this.margin.left - this.margin.right },
    yMax () { return this.height - this.margin.top - this.margin.bottom },

    // scales
    xScale () {
      return scaleTime({
        range: [0, this.xMax],
        domain: extent(this.stock, this.xStock),
      })
    },
    yScale () {
      return scaleLinear({
        range: [this.yMax, 0],
        domain: [0, max(this.stock, this.yStock) + this.yMax / 3],
        nice: true,
      })
    }
  },
  beforeMount () {
    this.stock = appleStock.slice(800)
    this.formatDate = timeFormat("%b %d, '%y")
  },
  mixins: [withTooltip],
  methods: {
    // accessors
    xStock (d) { return new Date(d.date) },
    yStock (d) { return d.close },

    // tooltip handler
    handleTooltip ({ data, xStock, xScale }) {
      const { x } = localPoint(event)
      const x0 = xScale.invert(x)
      const index = this.bisectDate(data, x0, 1)
      const d0 = data[index - 1]
      const d1 = data[index]
      let d = d0
      if (d1 && d1.date) {
        d = x0 - xStock(d0.date) > xStock(d1.date) - x0 ? d1 : d0
      }
      this.showTooltip({
        tooltipData: d,
        tooltipLeft: x,
        tooltipTop: this.yScale(d.close),
      })
    }
  },
  components: {
    AreaClosed, LineShape, Bar, GridRows, GridColumns, Tooltip, LinearGradient
  }
}
</script>
