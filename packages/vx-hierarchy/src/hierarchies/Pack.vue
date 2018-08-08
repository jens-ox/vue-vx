<template>
  <Group v-if="$slots.default"
    :top="top"
    :left="left"
    :className="`vx-pack ${className}`"
  >
    <slot slot-scope="data" />
  </Group>

  <Group v-else
    :top="top"
    :left="left"
    :className="`vx-pack ${className}`"
  >

    <!-- nodes -->
    <Group
      v-if="$slots.node"
      v-for="(node, i) in data.descendants()"
      :key="`pack-node-${i}`"
    >
      <slot name="node" slot-scope="node"></slot>
    </Group>
    <Group v-else
      v-for="(node, i) in data.descendants()"
      :key="`pack-node-${i}`"
    >
      <default-node :node="node"></default-node>
    </Group>
  </Group>
</template>
<script>
import { Group } from '@vue-vx/group'
import { pack as d3pack } from 'd3-hierarchy'
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
    radius: Number,
    size: Number,
    padding: Number
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    pack () {
      const pack = d3pack()
      if (this.size) pack.size(this.size)
      if (this.radius) pack.radius(this.radius)
      if (this.padding) pack.padding(this.padding)
      return pack
    }
  },
  beforeMount () {
    this.data = this.pack(this.root)
  },
  components: {
    Group, DefaultNode
  }
}
</script>