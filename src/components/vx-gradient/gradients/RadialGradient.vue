<template>
  <defs>
    <radialGradient
      :id="id"
      :gradientTransform="rotate ? `rotate(${rotate})` : transform"
      v-bind="restProps"
    >
      <slot />
      <stop :offset="fromOffset" :stopColor="from" :stopOpacity="fromOpacity" v-if="!$slots.default" />
      <stop :offset="toOffset" :stopColor="to" :stopOpacity="toOpacity" v-if="!$slots.default" />
    </radialGradient>
  </defs>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    from: String,
    to: String,
    fromOffset: {
      type: String,
      default: '0%'
    },
    fromOpacity: {
      type: Number,
      default: 1
    },
    toOffset: {
      type: String,
      default: '100%'
    },
    toOpacity: {
      type: Number,
      default: 1
    },
    rotate: Object,
    transform: String,
    restProps: Object
  }
}
</script>
