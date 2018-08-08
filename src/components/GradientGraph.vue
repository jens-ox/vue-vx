<template>
  <svg :width="width" :height="height">
    <GradientDarkgreenGreen useID="DarkgreenGreen" />
    <GradientLightgreenGreen useID="LightgreenGreen" />
    <GradientOrangeRed useID="OrangeRed" />
    <GradientPinkBlue useID="PinkBlue" />
    <GradientPinkRed useID="PinkRed" :vertical="false" />
    <GradientPurpleOrange useID="PurpleOrange" :vertical="false" />
    <GradientPurpleRed useID="PurpleRed" :vertical="false" />
    <RadialGradient from="#55bdd5" to="#4f3681" useID="Radial" r="80%" />
    <GradientSteelPurple useID="SteelPurple" :vertical="false" />
    <GradientTealBlue useID="TealBlue" :vertical="false" />
    <Bar
      :x="0"
      :y="0"
      :width="w"
      :height="h"
      fill="url(#LightgreenGreen)"
      stroke="#ffffff"
      :stroke-width="8"
      :rx="14"
    />
    <Bar
      :x="w"
      :y="0"
      :width="w"
      :height="h"
      fill="url(#OrangeRed)"
      :rx="14"
      stroke="#ffffff"
      :stroke-width="8"
    />
    <Bar
      :x="w * 2"
      :y="0"
      :width="w"
      :height="h"
      fill="url(#PinkBlue)"
      :rx="14"
      stroke="#ffffff"
      :stroke-width="8"
    />
    <Bar
      :x="w * 3"
      :y="0"
      :width="w"
      :height="h"
      fill="url(#DarkgreenGreen)"
      :rx="14"
      stroke="#ffffff"
      :stroke-width="8"
    />
    <Bar
      :x="0"
      :y="h"
      :width="w"
      :height="h"
      fill="url(#PinkRed)"
      :rx="14"
      stroke="#ffffff"
      :stroke-width="8"
    />
    <Bar
      :x="w"
      :y="h"
      :width="w"
      :height="h"
      fill="url(#TealBlue)"
      :rx="14"
      stroke="#ffffff"
      :stroke-width="8"
    />
    <Bar
      :x="w * 2"
      :y="h"
      :width="w"
      :height="h"
      fill="url(#PurpleOrange)"
      :rx="14"
      stroke="#ffffff"
      :stroke-width="8"
    />
    <Bar
      :x="w * 3"
      :y="h"
      :width="w"
      :height="h"
      fill="url(#Radial)"
      :rx="14"
      stroke="#ffffff"
      :stroke-width="8"
    />
  </svg>
</template>
<script>
import { Bar } from '../../packages/vx-shape'
import {
  GradientDarkgreenGreen,
  GradientLightgreenGreen,
  GradientOrangeRed,
  GradientPinkBlue,
  GradientPinkRed,
  GradientPurpleOrange,
  GradientPurpleRed,
  GradientPurpleTeal,
  GradientSteelPurple,
  GradientTealBlue,
  RadialGradient,
} from '../../packages/vx-gradient'

export default {
  props: {
    width: Number,
    height: Number,
    margin: {
      type: Object,
      default: () => { return { top: 10, bottom: 10, left: 10, right: 10 } }
    }
  },
  computed: {
    w () { return this.width / 4 },
    h () { return (this.height - this.margin.bottom) / 2 }
  },
  components: {
    Bar, GradientDarkgreenGreen, GradientLightgreenGreen, GradientOrangeRed, GradientPinkBlue, GradientPurpleOrange, GradientPinkRed, GradientPurpleRed, GradientPurpleTeal, GradientSteelPurple, GradientTealBlue, RadialGradient
  }
}
</script>
