<template>
  <svg :width="width" :height="height">
    <LinearGradient useID="lg" from="#fd9b93" to="#fe6e9e" />
    <rect
      :width="width"
      :height="height"
      :rx="14"
      fill="#272b4d"
    />
    <Tree
      :top="margin.top"
      :left="margin.left"
      :root="data"
      :size="[
        height - margin.top - margin.bottom,
        width - margin.left - margin.right
      ]"
    >

      <!-- node -->
      <Group slot="node" slot-scope="{ scope }" :top="scope.node.x" :left="scope.node.y">
        <circle v-if="scope.node.depth === 0" :r="12" fill="url('#lg')" />

        <rect v-else
          :height="nodeHeight"
          :width="nodeWidth"
          :y="-nodeHeight / 2"
          :x="-nodeWidth / 2"
          fill="#272b4d"
          :stroke="scope.node.children ? '#03c0dc' : '#26deb0'"
          :stroke-width="1"
          :stroke-dasharray="!scope.node.children ? '2,2' : '0'"
          :stroke-opacity="!scope.node.children ? .6 : 1"
          :rx="!scope.node.children ? 10 : 0"
          @click="nodeClickHandler(scope.node)"
        />
        <text
          dy=".33em"
          font-size="9"
          font-family="Arial"
          text-anchor="middle"
          :style="{ pointerEvents: 'none' }"
          :fill="scope.node.depth === 0 ? '#71248e' : scope.node.children ? 'white' : '#26deb0'"
        >
          {{ scope.node.data.name }}
        </text>
      </Group>

      <!-- link -->
      <Group slot="link" slot-scope="{ scope }">
        <LinkHorizontal
          :data="scope.link"
          stroke="#374469"
          stroke-width="1"
          fill="none"
        />
      </Group>
    </Tree>
  </svg>
</template>
<script>
import { Group } from './vx-group'
import { Tree } from './vx-hierarchy'
import { LinkHorizontal } from './vx-shape'
import { hierarchy } from 'd3-hierarchy'
import { LinearGradient } from './vx-gradient'

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
            { "name": "A3" },
            { "name": "C",
              "children": [{
                "name": "C1",
              }, {
                "name": "D",
                "children": [{
                  "name": "D1"
                },{
                  "name": "D2"
                },{
                  "name": "D3"
                }]
              }]
            },
          ]},
          { "name": "Z" },
          {
          "name": "B",
          "children": [
            { "name": "B1"},
            { "name": "B2"},
            { "name": "B3"},
          ]},
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
    Group, Tree, LinkHorizontal, LinearGradient
  }
}
</script>