<template>
  <Group>
    <Group v-for="(d, i) in data"
      v-bind:key="`heatmap-${i}`"
      className="vx-heatmap-column"
      :left="xScale(bin(d, i))"
    >
      <component v-for="(b, j) in bins(d, i)"
        :is="symbolType"
        :key="`heatmap-tile-${symbolType}-${j}`"
        :class="`vx-heatmap-${symbolType} ${className}`"
        :fill="colorScale(count(b))"
        :fillOpacity="opacityScale(count(b))"
        :bin="b"
        :index="j"
        :datum="d"
        :datumIndex="i"
        @click="clickHandler(d)"
        @mouseover="mouseoverHandler($event)"
        @mouseout="mouseoutHandler($event)"
        v-bind="customProps(symbolType, b, j)"
      />
    </Group>
  </Group>
</template>
<script>
import { Group } from '../vx-group'

export default {
  props: {
    symbolType: {
      type: String,
      required: true
    },
    data: Array,
    gap: {
      type: Number,
      default: 1
    },
    xScale: Function,
    yScale: Function,
    colorScale: Function,
    opacityScale: {
      type: Function,
      default: () => 1
    },
    yBin: Function,
    bin: {
      type: Function,
      default: d => d.bin
    },
    bins: {
      type: Function,
      default: d => d.bins
    },
    count: {
      type: Function,
      default: d => d.count
    },
    restProps: Object,
    clickHandler: {
      type: Function,
      default: () => {}
    },
    mouseoverHandler: {
      type: Function,
      default: () => {}
    },
    mouseoutHandler: {
      type: Function,
      default: () => {}
    },
    className: {
      type: String,
      default: ''
    },
    symbolProps: Object
  },
  computed: {
    yBinComputed () { return this.yBin || function (d) { return d } }
  },
  methods: {
    customProps (symbolType, b = 0, j = 0) {
      switch (symbolType) {
        case 'circle':
          return {
            ...this.symbolProps,
            r: this.symbolProps.radius - this.gap,
            cx: this.symbolProps.radius,
            cy: this.yScale(this.yBinComputed(j + 1)) + this.symbolProps.radius + this.gap
          }
        case 'rect':
          return  {
            ...this.symbolProps,
            width: this.symbolProps.binWidth - this.gap,
            height: this.symbolProps.binHeight - this.gap,
            y: this.yScale(this.yBinComputed(j + 1)) + this.gap
          }
        default:
          return this.symbolProps
      }
    }
  },
  components: {
    Group
  }
}
</script>