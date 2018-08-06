<template>
  <div class="graph-grid">
    <div class="graph-container">
      <graph :width="width" :height="height"></graph>
    </div>
    <div class="graph-container">
      <bar-graph :width="width" :height="height"></bar-graph>
    </div>
    <div class="graph-container">
      <point-graph :width="width" :height="height"></point-graph>
    </div>
    <div class="graph-container">
      <pattern-graph :width="width" :height="height"></pattern-graph>
    </div>
    <div class="graph-container">
      <area-graph :width="width" :height="height" :margin="{ top: 10, bottom: 10, left: 0, right: 0 }"></area-graph>
    </div>
    <div class="graph-container">
      <stacked-area-graph :width="width" :height="height" :margin="{ top: 10, bottom: 10, left: 0, right: 0 }"></stacked-area-graph>
    </div>
    <div class="graph-container">
      <gradient-graph :width="width" :height="height" :margin="{ top: 0, bottom: 0, left: 0, right: 0 }"></gradient-graph>
    </div>
    <div class="graph-container">
      <glyph-graph :width="width" :height="height"></glyph-graph>
    </div>
    <div class="graph-container">
      <axis-graph :width="width" :height="height" :margin="{ top: 20, bottom: 80, left: 80, right: 80 }"></axis-graph>
    </div>
    <div class="graph-container">
      <bar-group-graph :width="width" :height="height"></bar-group-graph>
    </div>
    <div class="graph-container">
      <heatmap-graph :width="width" :height="height"></heatmap-graph>
    </div>
    <div class="graph-container">
      <bar-stack-graph :width="width" :height="height" :margin="{ top: 50, bottom: 100, left: 0, right: 0 }"></bar-stack-graph>
    </div>
    <div class="graph-container">
      <radial-graph :width="width" :height="height"></radial-graph>
    </div>
    <div class="graph-container">
      <pie-graph :width="width" :height="height"></pie-graph>
    </div>
    <div class="graph-container">
      <tree-graph :width="width" :height="height" :margin="{ top: 50, bottom: 50, left: 50, right: 50 }"></tree-graph>
    </div>
    <div class="graph-container">
      <dendrogram-graph :width="width" :height="height" :margin="{ top: 50, bottom: 50, left: 50, right: 50 }"></dendrogram-graph>
    </div>
    <div class="graph-container">
      <voronoi-graph :width="width" :height="height"></voronoi-graph>
    </div>
    <div class="graph-container">
      <chord-graph :width="width" :height="height" :margin="{ top: 50, bottom: 50, left: 50, right: 50 }"></chord-graph>
    </div>
    <div class="graph-container">
      <bar-group-horizontal-graph :width="width" :height="height"></bar-group-horizontal-graph>
    </div>
  </div>
</template>

<script>
import Graph from './Graph'
import BarGraph from './BarGraph'
import PointGraph from './PointGraph'
import PatternGraph from './PatternGraph'
import AreaGraph from './AreaGraph'
import StackedAreaGraph from './StackedAreaGraph'
import GradientGraph from './GradientGraph'
import GlyphGraph from './GlyphGraph'
import AxisGraph from './AxisGraph'
import BarGroupGraph from './BarGroupGraph'
import HeatmapGraph from './HeatmapGraph'
import BarStackGraph from './BarStackGraph'
import RadialGraph from './RadialGraph'
import PieGraph from './PieGraph'
import TreeGraph from './TreeGraph'
import DendrogramGraph from './DendrogramGraph'
import VoronoiGraph from './VoronoiGraph'
import ChordGraph from './ChordGraph'
import BarGroupHorizontalGraph from './BarGroupHorizontalGraph'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      windowWidth: 0
    }
  },
  beforeMount () {
    this.windowWidth = window.innerWidth
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      });
    })
  },
  computed: {
    width: function () {
      return this.windowWidth > 800 ? 800 : this.windowWidth - 16
    },
    height: function () {
      return 0.618 * this.width
    }
  },
  components: {
    Graph, BarGraph, PointGraph, PatternGraph, AreaGraph, StackedAreaGraph, GradientGraph, GlyphGraph, BarGroupGraph, AxisGraph, HeatmapGraph, BarStackGraph, RadialGraph, PieGraph, TreeGraph, DendrogramGraph, VoronoiGraph, ChordGraph, BarGroupHorizontalGraph
  }
}
</script>
<style scoped>
.graph-container {
  display: inline-block;
}
.graph-grid {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fill, minmax(800px, 1fr));
}
</style>

