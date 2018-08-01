<template>
  <Axis
    :axisClassName="`vx-axis-left ${axisClassName}`"
    :axisLineClassName="axisLineClassName"
    :hideAxisLine="hideAxisLine"
    :hideTicks="hideTicks"
    :hideZero="hideZero"
    :label="label"
    :labelClassName="labelClassName"
    :labelOffset="labelOffset"
    :labelProps="labelProps"
    :left="left"
    :numTicks="numTicks"
    :orientation="ORIENT.left"
    :rangePadding="rangePadding"
    :scale="scale"
    :stroke="stroke"
    :strokeWidth="strokeWidth"
    :strokeDasharray="strokeDasharray"
    :tickClassName="tickClassName"
    :tickFormat="tickFormat"
    :tickLabelProps="tickLabelProps"
    :tickLength="tickLength"
    :tickStroke="tickStroke"
    :tickTransform="tickTransform"
    :tickValues="tickValues"
    :tickComponent="tickComponent"
    :top="top"
  />
</template>
<script>
import Axis from './Axis'
import ORIENT from '../constants/orientation'

export default {
  data () {
    return {
      ORIENT
    }
  },
  props: {
    ...Axis.props
  },
  components: {
    Axis
  }
}
</script>
