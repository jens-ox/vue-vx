<template>
  <Axis
    :axisClassName="`vx-axis-top ${axisClassName}`"
    :orientation="ORIENT.top"

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
    :tickLabelProps="topTickLabelProps"
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
    ...Axis.props
  },
  computed: {
    topTickLabelProps () {
      return (value, index) => {
        return {
          ...this.tickLabelProps(value, index),
          'dx': '0',
          'dy': '-0.25em'
        }
      }
    }
  },
  components: {
    Axis
  }
}
</script>
