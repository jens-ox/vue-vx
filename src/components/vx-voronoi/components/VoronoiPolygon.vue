<template>
  <path v-if="polygon"
    :class="`vx-voronoi-polygon ${className}`"
    :d="`M${polygon.join('L')}Z`"
    :style="pathStyle"
    v-bind="data"
  />
</template>
<script>
export default {
  props: {
    polygon: Array,
    className: {
      type: String,
      default: ''
    },
    pathStyle: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    data () { return this.polygon.data }
  }
}
</script>
