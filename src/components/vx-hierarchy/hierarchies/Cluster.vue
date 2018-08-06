<template>
  <Group v-if="$slots.default"
    :top="top"
    :left="left"
    :className="`vx-cluster ${className}`"
  >
    <slot slot-scope="data" />
  </Group>

  <Group v-else
    :top="top"
    :left="left"
    :className="`vx-cluster ${className}`"
  >
    <!-- links -->
    <Group
      v-if="$slots.link"
      v-for="(link, i) in data.links()"
      :key="`cluster-link-${i}`"
    >
      <slot name="link" slot-scope="link" />
    </Group>
    <Group v-else
      v-for="(link, i) in data.links()"
      :key="`cluster-link-${i}`"
    >
      <default-link :link="link"></default-link>
    </Group>

    <!-- nodes -->
    <Group
      v-if="$slots.node"
      v-for="(node, i) in data.descendants()"
      :key="`cluster-node-${i}`"
    >
      <slot name="node" slot-scope="node"></slot>
    </Group>
    <Group v-else
      v-for="(node, i) in data.descendants()"
      :key="`cluster-node-${i}`"
    >
      <default-node :node="node"></default-node>
    </Group>
  </Group>
</template>
<script>
import { Group } from '../../vx-group'
import { cluster as d3cluster } from 'd3-hierarchy'
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
    size: Number,
    nodeSize: Number,
    separation: Number
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    cluster () {
      const cluster = d3cluster()
      if (this.size) cluster.size(this.size)
      if (this.nodeSize) cluster.nodeSize(this.nodeSize)
      if (this.separation) cluster.separation(this.separation)
      return cluster
    }
  },
  beforeMount () {
    this.data = this.cluster(this.root)
  },
  components: {
    Group, DefaultLink, DefaultNode
  }
}
</script>