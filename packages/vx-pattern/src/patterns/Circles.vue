<template>
  <AbstractPattern :useID="useID" :width="width" :height="height">
    <rect v-if="!!background" :width="width" :height="height" :fill="background" />
    <circle
      :class="`vx-pattern-circle ${className}`"
      :cx="width / 2"
      :cy="height / 2"
      :r="radius"
      :fill="fill"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :stroke-dasharray="strokeDasharray"
    />
    <circle v-if="complement" v-for="[cornerX, cornerY] in corners"
      v-bind:key="`${id}-complement-${cornerX}-${cornerY}`"
      :class="`vx-pattern-circle vx-pattern-circle-complement ${className}`"
      :cx="cornerX"
      :cy="cornerY"
      :r="radius"
      :fill="fill"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :stroke-dasharray="strokeDasharray"
    ></circle>
  </AbstractPattern>
</template>
<script>
import AbstractPattern from './Pattern'

export default {
  props: {
    useID: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    radius: {
      type: Number,
      default: 2
    },
    fill: String,
    className: {
      type: String,
      default: ''
    },
    stroke: String,
    strokeWidth: Number,
    strokeDasharray: String,
    complement: Boolean,
    corners: Array,
    background: String
  },
  components: {
    AbstractPattern
  }
}
</script>
