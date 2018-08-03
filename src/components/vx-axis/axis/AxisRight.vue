<template>
  <Axis
    :axisClassName="`vx-axis-right ${axisClassName}`"
    :orientation="ORIENT.right"

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
    :rangePadding="rangePadding"
    :scale="scale"
    :stroke="stroke"
    :strokeWidth="strokeWidth"
    :strokeDasharray="strokeDasharray"
    :tickClassName="tickClassName"
    :tickFormat="tickFormat"
    :tickLabelProps="rightTickLabelProps"
    :tickLength="tickLength"
    :tickStroke="tickStroke"
    :tickTransform="tickTransform"
    :tickValues="tickValues"
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
    ...Axis.props,
    labelOffset: {
      type: Number,
      default: 36
    }
  },
  computed: {
    rightTickLabelProps () {
      return (value, index) => {
        return {
          ...this.tickLabelProps(value, index),
          'text-anchor': 'start',
          'dx': '0.25em',
          'dy': '0.25em'
        }
      }
    }
  },
  components: {
    Axis
  }
}
</script>
