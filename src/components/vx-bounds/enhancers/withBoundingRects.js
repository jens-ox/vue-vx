export default {
  props: {
    top: {
      type: Number,
      required: true
    },
    right: {
      type: Number,
      required: true
    },
    bottom: {
      type: Number,
      required: true
    },
    left: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    rect: Object,
    parentRect: Object
  },
  mounted () {
    // TODO get bounding rect
    // this.node = ReactDOM.findDOMNode(this);
    // this.setState(() => this.getRects());
  },
  methods: {
    getRects () {
        // if (!this.node) return this.state;

        // const node = this.node;
        // const parentNode = this.node.parentNode;

        // const rect = node.getBoundingClientRect ? node.getBoundingClientRect() : emptyRect;

        // const parentRect =
        //   parentNode && parentNode.getBoundingClientRect
        //     ? parentNode.getBoundingClientRect()
        //     : emptyRect;

      return {
        rect: this.rect,
        parentRect: this.parentRect
      }
    }
  }
}
