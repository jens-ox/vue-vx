<template>
  <svg :width="width" :height="height">
    <LinearGradient useID="top" from="#79d259" to="#37ac8c" />
    <rect
      :width="width"
      :height="height"
      :rx="14"
      fill="#306c90"
    />
    <Cluster
      :top="margin.top"
      :left="margin.left"
      :root="data"
      :size="[
        width - margin.left - margin.right,
        height - margin.top - margin.bottom
      ]"
    >

      <!-- node -->
      <Group slot="node" slot-scope="{ scope }" :top="scope.node.y" :left="scope.node.x">

        <rect v-if="scope.node.depth === 0"
          :width="nodeWidth"
          :height="nodeHeight"
          :y="-nodeHeight / 2"
          :x="-nodeWidth / 2"
          fill="url('#top')"
        />
        <circle v-else
          :r="12"
          fill="#306c90"
          :stroke="scope.node.children ? 'white' : '#ddf163'"
          @click="nodeClickHandler(scope.node)"
        />

        <text
          dy=".33em"
          :font-size="9"
          font-family="Arial"
          text-anchor="middle"
          style="{ pointerEvents: 'none' }"
          :fill="scope.node.depth === 0 ? '#286875' : scope.node.children ? 'white' : '#ddf163'"
        >
          {{ scope.node.data.name }}
        </text>
      </Group>

      <!-- link -->
      <Group slot="link" slot-scope="{ scope }">
        <LinkVertical
          :data="scope.link"
          stroke="#f7f7f3"
          :stroke-width="1"
          :stroke-opacity="0.2"
          fill="none"
        />
      </Group>
    </Cluster>
  </svg>
</template>
<script>
import { Group } from '../../packages/vx-group'
import { Cluster } from '../../packages/vx-hierarchy'
import { LinkVertical } from '../../packages/vx-shape'
import { hierarchy } from 'd3-hierarchy'
import { LinearGradient } from '../../packages/vx-gradient'

export default {
  props: {
    width: Number,
    height: Number,
    margin: {
      type: Object,
      default: () => { return { top: 10, bottom: 10, left: 10, right: 10 } }
    }
  },
  data () {
    return {
      nodeWidth: 40,
      nodeHeight: 20,
      data: [],
      raw: {
        "name": "T",
        "children": [{ 
          "name": "A",
          "children": [
            { "name": "A1" },
            { "name": "A2" },
            { "name": "C",
              "children": [{
                "name": "C1"
              }]},
          ]}, {
          "name": "B",
          "children": [
            { "name": "B1"},
            { "name": "B2"},
            { "name": "B3"},
          ]},{
            "name": "X",
            "children": [{
            "name": "Z"
          }]}
        ],
      }
    }
  },
  methods: {
    nodeClickHandler (node) {
      console.log(JSON.stringify(node.data.name))
    },
  },
  beforeMount () {
    this.data = hierarchy(this.raw)
  },
  components: {
    Group, Cluster, LinkVertical, LinearGradient
  }
}
</script>