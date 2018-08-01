<template>
  <div>
    <graph :width="width" :height="height"></graph>
    <br>
    <br>
    <bar-graph :width="width" :height="height"></bar-graph>
    <br>
    <br>
    <point-graph :width="width" :height="height"></point-graph>
    <br><br>
    <pattern-graph :width="width" :height="height"></pattern-graph>
  </div>
</template>

<script>
import Graph from './Graph'
import BarGraph from './BarGraph'
import PointGraph from './PointGraph'
import PatternGraph from './PatternGraph'

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
    Graph, BarGraph, PointGraph, PatternGraph
  }
}
</script>
