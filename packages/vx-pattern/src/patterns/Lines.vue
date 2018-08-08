<template>
  <AbstractPattern :useID="useID" :width="width" :height="height">
      <rect
        v-if="!!background"
        class="vx-pattern-line-background"
        :width="width"
        :height="height"
        :fill="background"
      />
      <path
        v-for="(o, i) in orientation"
        v-bind:key="`vx-${useID}-line-${o}-${i}`"
        :class="`vx-pattern-line ${className}`"
        :d="pathForOrientation({ orientation: o, height })"
        :stroke="stroke"
        :stroke-width="strokeWidth"
        :stroke-dasharray="strokeDasharray"
        :strokeLinecap="strokeLinecap"
        :shapeRendering="shapeRendering"
      />
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
    background: String,
    stroke: {
      type: String,
      required: true
    },
    strokeWidth: {
      type: Number,
      required: true
    },
    strokeDasharray: String,
    className: {
      type: String,
      default: ''
    },
    strokeLinecap: {
      type: String,
      default: 'square'
    },
    shapeRendering: {
      type: String,
      default: 'auto'
    },
    orientation: {
      type: Array,
      default: () => ['vertical']
    }
  },
  data () {
    return {
      orientations: {
        horizontal: 'horizontal',
        vertical: 'vertical',
        diagonal: 'diagonal'
      }
    }
  },
  methods: {
    pathForOrientation ({ height, orientation }) {
      let path

      switch (orientation) {
        case this.orientations.vertical:
          path = `M ${height / 2}, 0 l 0, ${height}`
          break
        case this.orientations.horizontal:
          path = `M 0,${height / 2} l ${height},0`
          break
        case this.orientations.diagonal:
          path = `M 0,${height} l ${height},${-height} M ${-height / 4},${height / 4} l ${height /
            2},${-height / 2}
                M ${3 / 4 * height},${5 / 4 * height} l ${height / 2},${-height / 2}`
          break
        default:
          path = `M ${height / 2}, 0 l 0, ${height}`
      }

      return path
    }
  },
  components: {
    AbstractPattern
  }
}
</script>
