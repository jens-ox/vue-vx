<template>
  <svg
    :width="width"
    :height="height"
    ref="svg"
  >
    <GradientOrangeRed useID="voronoi_orange_red" />
    <GradientPinkRed useID="voronoi_pink_red" />
    <RectClipPath
      useID="voronoi_clip"
      :width="innerWidth"
      :height="innerHeight"
      :restProps="{
        rx: 14
      }"
    />
    <Group
      :top="margin.top"
      :left="margin.left"
      :restProps="{
        'clip-path': 'url(#voronoi_clip)'
      }"
      v-on:mousemove.native="handleMouseMove"
      v-on:mouseleave.native="selected = null; neighbors = null"
    >
      <VoronoiPolygon v-for="polygon in polygons"
        :key="polygon.join('|')"
        :polygon="polygon"
        :pathStyle="{
          fill: selected && (polygon.data.id === selected.data.id || neighbors[polygon.data.id]) ?
            'url(#voronoi_orange_red)' : 'url(#voronoi_pink_red)',
          'fill-opacity': neighbors && neighbors[polygon.data.id] ? 0.4 : 1,
          stroke: '#fff',
          'stroke-width': 1
        }"
      />
      <circle v-for="d in data"
        :key="JSON.stringify(d)"
        :r="2"
        :cx="xScale(d.x)"
        :cy="yScale(d.y)"
        fill="#ffffff"
        :fill-opactiy="0.5"
      />
    </Group>
  </svg>
</template>
<script>
import { extent } from 'd3-array'
import { Group } from '../../packages/vx-group'
import { GradientOrangeRed, GradientPinkRed } from '../../packages/vx-gradient'
import { RectClipPath } from '../../packages/vx-clip-path'
import { scaleLinear } from '../../packages/vx-scale'
import { voronoi, VoronoiPolygon } from '../../packages/vx-voronoi'

export default {
  props: {
    width: Number,
    height: Number,
    margin: {
      type: Object,
      default: () => { return { top: 0, bottom: 0, left: 0, right: 0 } }
    }
  },
  data () {
    return {
      polygons: [],
      neighborRadius: 50,
      selected: null,
      neighbors: null
    }
  },
  computed: {
    data () {
      return Array(150).fill(null).map(() => ({
        x: Math.random(),
        y: Math.random(),
        id: Math.random().toString(36).slice(2),
      }))
    },
    innerWidth () { return this.width - this.margin.left - this.margin.right },
    innerHeight () { return this.height - this.margin.top - this.margin.bottom },

    // scales
    xScale () {
      return scaleLinear({
        domain: extent(this.data, d => d.x),
        range: [0, this.innerWidth],
      })
    },
    yScale () {
      return scaleLinear({
        domain: extent(this.data, d => d.y),
        range: [this.innerHeight, 0],
      })
    },

    voronoiDiagram () {
      return voronoi({
        x: d => this.xScale(d.x),
        y: d => this.yScale(d.y),
        width: this.innerWidth,
        height: this.innerHeight,
      })(this.data)
    }
  },
  methods: {
    handleMouseMove ($event) {
      const x = $event.offsetX
      const y = $event.offsetY
      const closest = this.voronoiDiagram.find(x, y, this.neighborRadius)
      if (closest) {
        this.neighbors = {}
        const cell = this.voronoiDiagram.cells[closest.index]
        cell.halfedges.forEach((index) => {
          const edge = this.voronoiDiagram.edges[index]
          const { left, right } = edge
          if (left && left !== closest) this.neighbors[left.data.id] = true
          else if (right && right !== closest) this.neighbors[right.data.id] = true
        })
        this.selected = closest
      }
    }
  },
  beforeMount () {
    this.polygons = this.voronoiDiagram.polygons()
  },
  components: {
    Group, GradientOrangeRed, GradientPinkRed, RectClipPath, VoronoiPolygon
  }
}
</script>