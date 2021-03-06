<template>
  <div class="node-rgb" :id="id" :ref="id" v-preserve="form">
    <color-preview :hex="rgb_hex(rgb)"/>
    <div class="input" :style="{opacity: connectedInputs.R ? 0 : 1}">
      R <input type="number" min="0" max="255" v-model.number="form.R"/>
    </div>
    <div class="input" :style="{opacity: connectedInputs.G ? 0 : 1}">
      G <input type="number" min="0" max="255" v-model.number="form.G"/>
    </div>
    <div class="input" :style="{opacity: connectedInputs.B ? 0 : 1}">
      B <input type="number" min="0" max="255" v-model.number="form.B"/>
    </div>
  </div>
</template>

<script>
import ColorPreview from './color-preview.vue'

import PortBinding from '../PortBinding'
import usePorts from '../usePorts.ts'
import Preserve from '../../directives/v-preserve.ts'
import useLocalStorage from '../../storage/useLocalStorage.ts'
import useColorProperties from './useColorProperties.ts'

export default {
  name: 'node-rgb',
  components: {ColorPreview},
  directives: {Preserve},
  mixins: [PortBinding({
    inputs: {
      R: {type: 'rgbchannel', default: 0},
      G: {type: 'rgbchannel', default: 0},
      B: {type: 'rgbchannel', default: 0},
    },
    outputs: {color: {type: 'rgb', binding: 'rgb'}},
  })],
  props: {
    id: String,
  },
  data: () => ({
    form: {R: 0, G: 0, B: 0},
  }),
  computed: {
    rgb() {
      return [
        this.connectedInputs.R ? this.R : this.form.R,
        this.connectedInputs.G ? this.G : this.form.G,
        this.connectedInputs.B ? this.B : this.form.B,
      ]
    },
  },
  setup(props, ctx) {
    const {connectedInputs} = usePorts(ctx, props.node.id)
    const {nodeState} = useLocalStorage.getInstance(ctx)
    const {rgb_hex} = useColorProperties()

    return {
      connectedInputs,
      nodeState,
      rgb_hex,
    }
  },
  created() {
    const saveState = this.nodeState(this.node.id)
    if (saveState.value.form) {
      this.form = saveState.value.form
    }
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.node-rgb{
  padding: 2px
  flexXY(center, center)
  flex-direction: column
  color: $color-med
  font-family 'Consolas', monospace
  .input {
    flexXY(start, center)
    margin: 2px 0
    input {
      width: 3.3em
    }
  }
}
</style>