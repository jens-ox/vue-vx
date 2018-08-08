<template>
  <Group v-if="$slots.default"
    :top="top"
    :left="left"
    :className="`vx-treemap ${className}`"
  >
    <slot slot-scope="data" />
  </Group>
  <Group v-else
    :top="top" 
    :left="left"
    :className="`vx-treemap ${className}`"
  >
    <!-- nodes -->
    <Group v-if="$slots.node"
      v-for="(node, i) in data.descendants()"
      :key="`treemap-node-${i}`"
    >
      <slot name="node" slot-scope="node" />
    </Group>
    <Group v-else
      v-for="(node, i) in data.descendants()"
      :key="`treemap-node-${i}`"
    >
      <default-node :node="node"></default-node>
    </Group>
  </Group>
</template>
<script>
import { Group } from '@vue-vx/group'
import { treemap as d3treemap } from 'd3-hierarchy'
import DefaultNode from '../HierarchyDefaultNode'

export default {
  props: {
    root: {
      type: Object,
      required: true
    },
    top: Number,
    left: Number,
    className: {
      type: String,
      default: ''
    },
    tile: Object,
    size: Number,
    round: Number,
    padding: Number,
    paddingInner: Number,
    paddingOuter: Number,
    paddingTop: Number,
    paddingRight: Number,
    paddingBottom: Number,
    paddingLeft: Number
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    treemap () {
      const treemap = d3treemap()
      if (this.tile) treemap.tile(this.tile)
      if (this.size) treemap.size(this.size)
      if (this.round) treemap.round(this.round)
      if (this.padding) treemap.padding(this.padding)
      if (this.paddingInner) treemap.paddingInner(this.paddingInner)
      if (this.paddingOuter) treemap.paddingOuter(this.paddingOuter)
      if (this.paddingTop) treemap.paddingTop(this.paddingTop)
      if (this.paddingRight) treemap.paddingRight(this.paddingRight)
      if (this.paddingBottom) treemap.paddingBottom(this.paddingBottom)
      if (this.paddingLeft) treemap.paddingLeft(this.paddingLeft)
      return treemap
    }
  },
  beforeMount () {
    this.data = this.treemap(this.root)
  },
  components: {
    Group, DefaultNode
  }
}
</script>