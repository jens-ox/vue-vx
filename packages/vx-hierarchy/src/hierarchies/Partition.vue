<template>
  <Group v-if="$slots.default"
    :top="top"
    :left="left"
    :className="`vx-partition ${className}`"
  >
    <slot slot-scope="data" />
  </Group>

  <Group v-else
    :top="top"
    :left="left"
    :className="`vx-partition ${className}`"
  >

    <!-- nodes -->
    <Group
      v-if="$slots.node"
      v-for="(node, i) in data.descendants()"
      :key="`partition-node-${i}`"
    >
      <slot name="node" slot-scope="node"></slot>
    </Group>
    <Group v-else
      v-for="(node, i) in data.descendants()"
      :key="`partition-node-${i}`"
    >
      <default-node :node="node"></default-node>
    </Group>
  </Group>
</template>
<script>
import { Group } from '@vue-vx/group'
import { partition as d3partition } from 'd3-hierarchy'
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
    round: Number
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    partition () {
      const partition = d3partition()
      if (this.size) partition.size(this.size)
      if (this.round) partition.round(this.round)
      if (this.padding) partition.padding(this.padding)
      return partition
    }
  },
  beforeMount () {
    this.data = this.partition(this.root)
  },
  components: {
    Group, DefaultNode
  }
}
</script>