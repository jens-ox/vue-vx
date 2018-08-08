<template>
  <Group>
    <Group v-for="(d, i) in data"
      v-bind:key="`heatmap-${i}`"
      className="vx-heatmap-column"
      :left="xScale(bin(d, i))"
    >
      <circle v-for="(b, j) in bins(d, i)"
        v-bind:key="`heatmap-tile-circle-${j}`"
        :class="`vx-heatmap-circle ${className}`"
        :fill="colorScale(count(b))"
        :r="r"
        :cx="radius"
        :cy="yScale(yBinComputed(b, j) + step) + radius"
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
import heatmapMixin from './heatmapMixin'

export default {
  props: {
    radius: {
      type: Number,
      default: 6
    }
  },
  computed: {
    r () { return this.radius - this.gap }
  },
  mixins: [heatmapMixin]
}
</script>