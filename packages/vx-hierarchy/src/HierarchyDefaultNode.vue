<template>
  <circle :cx="node.x" :cy="node.y" :r="15" fill="#21D4FD" />
</template>
<script>
export default {
  props: {
    node: Object
  }
}
</script>