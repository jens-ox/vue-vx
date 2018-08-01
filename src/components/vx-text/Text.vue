<template>
  <svg :x="dx" :y="dy" :fontSize="textProps.fontSize" :style="{ overflow: 'visible' }">
    <text v-bind="textProps" :text-anchor="textAnchor">
      <tspan v-for="(line, index) in wordsByLines"
        v-bind:key="index"
        :x="textProps.x"
        :dy="index === 0 ? startDy : lineHeight"
      >
        {{ line.words.join(' ') }}
      </tspan>
    </text>
  </svg>
</template>
<script>
export default {
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    dx: {
      type: Number,
      default: 0
    },
    dy: {
      type: Number,
      default: 0
    },
    lineHeight: {
      type: String,
      default: '1em'
    },
    capHeight: {
      type: String,
      default: '0.71em'
    },
    scaleToFit: {
      type: Boolean,
      default: false
    },
    textAnchor: {
      type: String,
      default: 'start'
    },
    verticalAnchor: {
      type: String,
      default: 'end'
    },
    angle: Number,
    style: Object
  },
  data () {
    return {
      wordsByLines: []
    }
  },
  computed: {
    startDy () {
      let startDy
      switch (this.verticalAnchor) {
        case 'start':
          startDy = this.reduceCSSCalc(`calc(${this.capHeight})`)
          break
        case 'middle':
          startDy = this.reduceCSSCalc(
            `calc(${(this.wordsByLines.length - 1) / 2} * -${this.lineHeight} + (${this.capHeight} / 2))`
          )
          break
        default:
          startDy = this.reduceCSSCalc(`calc(${this.wordsByLines.length - 1} * -${this.lineHeight})`)
          break
      }
      return startDy
    },
    transforms () {
      let transforms = []
      if (this.scaleToFit && this.wordsByLines.length) {
        const lineWidth = this.wordsByLines[0].width
        const sx = this.props.width / lineWidth
        const sy = sx
        const originX = this.x - sx * this.x
        const originY = this.y - sy * this.y
        transforms.push(`matrix(${sx}, 0, 0, ${sy}, ${originX}, ${originY})`)
      }
      if (this.angle) {
        transforms.push(`rotate(${this.angle}, ${this.x}, ${this.y})`)
      }

      return transforms
    }

  },
  methods: {
    updateWordsByLines (props, needCalculate) {
      // Only perform calculations if using features that require them (multiline, scaleToFit)
      if (props.width || props.scaleToFit) {
        if (needCalculate) {
          const words = props.children ? props.children.toString().split(/\s+/) : []

          this.wordsWithComputedWidth = words.map(word => ({
            word,
            width: this.getStringWidth(word, props.style)
          }))
          this.spaceWidth = this.getStringWidth('\u00A0', props.style)
        }

        const wordsByLines = this.calculateWordsByLines(
          this.wordsWithComputedWidth,
          this.spaceWidth,
          props.width
        )
        this.setState({ wordsByLines })
      } else {
        this.updateWordsWithoutCalculate(props)
      }
    },
    updateWordsWithoutCalculate (props) {
      const words = props.children ? props.children.toString().split(/\s+/) : []
      this.setState({ wordsByLines: [{ words }] })
    },
    calculateWordsByLines (wordsWithComputedWidth, spaceWidth, lineWidth) {
      const { scaleToFit } = this.props
      return wordsWithComputedWidth.reduce((result, { word, width }) => {
        const currentLine = result[result.length - 1]

        if (
          currentLine &&
          (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < lineWidth)
        ) {
          // Word can be added to an existing line
          currentLine.words.push(word)
          currentLine.width += width + spaceWidth
        } else {
          // Add first word to line or word is too long to scaleToFit on existing line
          const newLine = { words: [word], width }
          result.push(newLine)
        }

        return result
      }, [])
    }
  },
  beforeMount () {
    this.updateWordsByLines(this.props, true)
  }
}
</script>
