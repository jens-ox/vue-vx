<template>
  <rect
    :class="`vx-bar ${className}`"
    :x="x"
    :y="y"
    :width="width"
    :height="height"
    :rx="rx"
    :ry="ry"
    :fill="fill"
    :fillOpacity="fillOpacity"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    :stroke-dasharray="strokeDasharray"
    :strokeLinecap="strokeLinecap"
    :strokeLinejoin="strokeLinejoin"
    :strokeMiterlimit="strokeMiterlimit"
    :strokeOpacity="strokeOpacity"
    v-bind="restProps"
  />
</template>
<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    width: Number,
    height: Number,
    rx: Number,
    ry: Number,
    fill: {
      type: String,
      default: 'steelblue'
    },
    fillOpacity: Number,
    stroke: String,
    strokeWidth: Number,
    strokeDasharray: String,
    strokeLinecap: String,
    strokeLinejoin: String,
    strokeMiterlimit: Number,
    strokeOpacity: Number,
    restProps: Object
  }
}
</script>