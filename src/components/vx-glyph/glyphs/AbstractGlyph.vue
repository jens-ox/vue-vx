<template>
  <Group :class="`vx-glyph ${className}`" :top="top" :left="left">
    <slot />
  </Group>
</template>
<script>
import { Group } from '../../vx-group'

export default {
  props: {
    top: {
      type: Number,
      value: 0
    },
    left: {
      type: Number,
      value: 0
    },
    className: {
      type: String,
      default: ''
    }
  },
  components: {
    Group
  }
}
</script>

