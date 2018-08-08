<template>
  <Group v-if="!!$slots.default">
    <slot :slot-scope="path" />
  </Group>
  <Group v-else>
    <path :class="`vx-ribbon ${className}`" :d="path" v-bind="pathProps" />
  </Group>
</template>
<script>
import { Group } from '@vue-vx/group'
import { ribbon as d3ribbon } from 'd3-chord'

export default {
  props: {
    chord: {
      type: Object,
      required: true
    },
    source: Function,
    target: Function,
    radius: [Function, Number],
    startAngle: [Function, Number],
    endAngle: [Function, Number],
    className: {
      type: String,
      default: ''
    },
    pathProps: Object
  },
  computed: {
    ribbon () {
      const ribbon = d3ribbon()
      if (this.source) ribbon.source(this.source)
      if (this.target) ribbon.target(this.target)
      if (this.radius) ribbon.radius(this.radius)
      if (this.startAngle) ribbon.startAngle(this.startAngle)
      if (this.endAngle) ribbon.endAngle(this.endAngle)
      return ribbon
    },
    path () { return this.ribbon(this.chord) }
  },
  components: {
    Group
  }
}
</script>