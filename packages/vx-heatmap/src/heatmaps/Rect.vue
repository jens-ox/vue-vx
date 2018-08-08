<template>
  <Group>
    <Group v-for="(d, i) in data"
      v-bind:key="`heatmap-${i}`"
      className="vx-heatmap-column"
      :left="xScale(bin(d, i))"
    >
      <rect v-for="(b, j) in bins(d, i)"
        v-bind:key="`heatmap-tile-rect-${j}`"
        :class="`vx-heatmap-rect ${className}`"
        :fill="colorScale(count(b))"
        :width="width"
        :height="height"
        :x="x"
        :y="yScale(yBinComputed(b, j) + step) + gap"
        :fillOpacity="opacityScale(count(b))"
        :bin="b"
        :index="j"
        :datum="d"
        :datumIndex="i"
        v-bind="restProps"
      />
    </Group>
  </Group>
</template>
<script>
import { Group } from '@vue-vx/group'

export default {
  props: {
    data: Array,
    x: {
      type: Number,
      default: 0
    },
    binWidth: Number,
    binHeight: Number,
    gap: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: 0
    },
    radius: {
      type: Number,
      default: 6
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
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    width () { return this.binWidth - this.gap },
    height () { return this.binHeight - this.gap },
    yBinComputed () { return this.yBin || this.bin }
  },
  components: {
    Group
  }  
}
</script>