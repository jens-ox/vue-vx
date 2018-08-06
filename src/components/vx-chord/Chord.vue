<template>
  <Group>
    <slot name="arc" :scope="groups" />
    <slot name="ribbon" :scope="chords" />
  </Group>
</template>
<script>
import { chord as d3chord } from 'd3-chord'
import { Group } from '../vx-group'

export default {
  props: {
    matrix: {
      type: Array,
      required: true
    },
    padAngle: Number,
    sortGroups: Function,
    sortSubgroups: Function,
    sortChords: Function
  },
  computed: {
    chord () {
      const chord = d3chord()
      if (this.padAngle) chord.padAngle(this.padAngle)
      if (this.sortGroups) chord.sortGroups(this.sortGroups)
      if (this.sortSubgroups) chord.sortSubgroups(this.sortSubgroups)
      if (this.sortChords) chord.sortChords(this.sortChords)
      return chord
    },
    chords () {
      return this.chord(this.matrix)
    },
    groups () {
      return this.chords.groups
    }
  },
  components: {
    Group
  }
}
</script>