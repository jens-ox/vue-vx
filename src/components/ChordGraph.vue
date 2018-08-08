<template>
  <svg :width="width" :height="height">
    <LinearGradient useID="gpinkorange" from="#ff2fab" to="#ffc62e" :vertical="false" />
    <LinearGradient useID="gpurplered" from="#dc04ff" to="#d04376" :vertical="false" />
    <LinearGradient useID="gpurplegreen" from="#7324ff" to="#52f091" :vertical="false" />
    <LinearGradient useID="gbluelime" from="#04a6ff" to="#00ddc6" :vertical="false" />
    <rect :x="0" :y="0" :width="width" :height="height" fill="#e4e3d8" :rx="14" />

    <Group :top="height / 2" :left="width / 2">
      <Chord :matrix="matrix" :padAngle="0.05" :sortSubgroups="descending">

        <Group slot="arc" slot-scope="{scope:groups}">
          <Arc v-for="(group, i) in groups"
            :key="`key-${i}`"
            :data="group"
            :innerRadius="innerRadius"
            :outerRadius="outerRadius"
            :pathStyle="{
              fill: zScale(i)
            }"
          />
        </Group>

        <Group slot="ribbon" slot-scope="{scope:chords}">
          <Ribbon v-for="(chord, i) in chords"
            :key="`ribbon-${i}`"
            :chord="chord"
            :radius="innerRadius"
            :pathProps="{
              fill: zScale(i),
              'fill-opacity': 0.75
            }"
          />
        </Group>
      </Chord>
    </Group>
  </svg>
</template>
<script>
import { Group } from '../../packages/vx-group'
import { LinearGradient } from '../../packages/vx-gradient'
import { Chord, Ribbon } from '../../packages/vx-chord'
import { Arc } from '../../packages/vx-shape'
import { scaleOrdinal } from '../../packages/vx-scale'

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
      arcWidth: 20,
      matrix: [
        [11975, 5871, 8916, 2868],
        [1951, 10048, 2060, 6171],
        [8010, 16145, 8090, 8045],
        [1013, 990, 940, 6907]
      ]
    }
  },
  computed: {
    // radii
    outerRadius () { return Math.min(this.width - this.margin.left - this.margin.right, this.height - this.margin.top - this.margin.bottom) * 0.5 },
    innerRadius () { return this.outerRadius - this.arcWidth },

    // scales
    zScale () {
      return scaleOrdinal({
        domain: [1, 2, 3, 4],
        range: [
          'url(#gpinkorange)',
          'url(#gpurplered)',
          'url(#gpurplegreen)',
          'url(#gbluelime)'
        ]
      })
    }
  },
  methods: {
    descending (a, b) {
      return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN
    }
  },
  components: {
    Group, LinearGradient, Chord, Ribbon, Arc
  }
}
</script>