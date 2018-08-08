<template>
  <svg :width="width" :height="height" v-if="width >= 10">
    <rect :x="0" :y="0" :width="width" :height="height" fill="#f5f2e3" :rx="14"></rect>
    <Group :left="10" :top="10">
      <PatternLines
        useID="vLines"
        :height="6"
        :width="6"
        stroke="black"
        :stroke-width="1"
      />
      <PatternLines
        useID="hLines"
        :height="6"
        :width="6"
        stroke='black'
        :stroke-width="1"
        :orientation="['horizontal']"
      />
      <PatternLines
        useID="dLines"
        :height="6"
        :width="6"
        stroke='black'
        :stroke-width="1"
        :orientation="['diagonal']"
      />
      <PatternLines
        useID="dhLines"
        :height="6"
        :width="6"
        stroke='black'
        :stroke-width="1"
        :orientation="['vertical', 'horizontal']"
      />
      <PatternCircles
        useID="Circles"
        :height="6"
        :width="6"
        fill="black"
      />
      <PatternCircles
        useID="cCircles"
        :height="10"
        :width="10"
        fill="black"
        complement
      />
      <PatternWaves
        useID="Waves"
        :height="6"
        :width="6"
        fill="transparent"
        stroke="black"
        :stroke-width="1"
        complement
      />
      <PatternWaves
        useID="bWaves"
        :height="12"
        :width="12"
        fill="transparent"
        stroke="black"
        :stroke-width="1"
        complement
      />
      <Bar
        fill="url(#vLines)"
        :height="pHeight"
        :width="pWidth"
        :x="0"
        :y="0"
        :rx="14"
      />
      <Bar
        fill="url(#hLines)"
        :height="pHeight"
        :width="pWidth"
        :x="pWidth"
        :y="0"
        :rx="14"
      />
      <Bar
        fill="url(#dLines)"
        :height="pHeight"
        :width="pWidth"
        :x="pWidth * 2"
        :y="0"
        :rx="14"
      />
      <Bar
        fill="url(#dhLines)"
        :height="pHeight"
        :width="pWidth"
        :x="pWidth * 3"
        :y="0"
        :rx="14"
      />
      <Bar
        fill="url(#Circles)"
        :height="pHeight"
        :width="pWidth"
        :x="0"
        :y="pHeight"
        :rx="14"
      />
      <Bar
        fill="url(#cCircles)"
        :height="pHeight"
        :width="pWidth"
        :x="pWidth"
        :y="pHeight"
        :rx="14"
      />
      <Bar
        fill="url(#Waves)"
        :height="pHeight"
        :width="pWidth"
        :x="pWidth * 2"
        :y="pHeight"
        :rx="14"
      />
      <Bar
        fill="url(#bWaves)"
        :height="pHeight"
        :width="pWidth"
        :x="pWidth * 3"
        :y="pHeight"
        :rx="14"
      />
    </Group>
  </svg>
</template>
<script>
import { Bar } from '../../packages/vx-shape'
import { Group } from '../../packages/vx-group'
import {
  PatternLines,
  PatternCircles,
  PatternWaves
} from '../../packages/vx-pattern'

export default {
  props: {
    width: Number,
    height: Number
  },
  computed: {
    xMax: function () { return this.width - 20 },
    yMax: function () { return this.height - 20 },
    pWidth: function () { return this.xMax / 4 },
    pHeight: function () { return this.yMax / 2 }
  },
  components: {
    Bar, PatternLines, PatternCircles, PatternWaves, Group
  }
}
</script>
