<template>
  <g
    :class="`vx-group ${className}`"
    :transform="transform || `translate(${left}, ${top})`"
    v-bind="restProps"
  >
    <slot />
  </g>
</template>
<script>
export default {
  props: {
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    transform: String,
    className: {
      type: String,
      default: ''
    },
    restProps: Object
  }
}
</script>