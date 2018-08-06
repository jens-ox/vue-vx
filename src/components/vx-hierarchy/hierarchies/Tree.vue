<template>
  <Group v-if="$slots.default"
    :top="top"
    :left="left"
    :className="`vx-tree ${className}`"
  >
    <slot slot-scope="data" />
  </Group>
  <Group v-else
    :top="top"
    :left="left"
    :className="`vx-tree ${className}`"
  >
    <!-- links -->
    <Group
      v-if="!!$scopedSlots.link"
      v-for="(link, i) in data.links()"
      :key="`tree-link-${i}`"
    >
      <slot name="link" :scope="{ link }" />
    </Group>

    <!-- nodes -->
    <Group
      v-if="!!$scopedSlots.node"
      v-for="(node, i) in data.descendants()"
      :key="`tree-node-${i}`"
    >
      <slot name="node" :scope="{ node }"></slot>
    </Group>
  </Group>
</template>
<script>
import { Group } from '../../vx-group'
import { tree as d3tree } from 'd3-hierarchy'
import DefaultLink from '../HierarchyDefaultLink'
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
    size: Array,
    nodeSize: Number,
    separation: Number
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    tree () {
      const tree = d3tree()
      if (this.size) tree.size(this.size)
      if (this.nodeSize) tree.nodeSize(this.nodeSize)
      if (this.separation) tree.separation(this.separation)
      return tree
    }
  },
  beforeMount () {
    this.data = this.tree(this.root)
  },
  components: {
    Group, DefaultLink, DefaultNode
  }
}
</script>