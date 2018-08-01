<template>
  <defs>
    <pattern :id="useID" :width="width" :height="height" patternUnits="userSpaceOnUse">
      <slot />
    </pattern>
  </defs>
</template>
<script>
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
    }
  }
}
</script>