<template>
  <line
    :x1="link.source.x"
    :y1="link.source.y"
    :x2="link.target.x"
    :y2="link.target.y"
    :stroke-width="2"
    stroke="#999"
    :stroke-opacity="0.6"
  />
</template>
<script>
export default {
  props: {
    link: Object
  }
}
</script>