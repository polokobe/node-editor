import Vue from 'vue'

export default function NodeRegistrar(store: any) {
  registerNodes([
    {type: 'input', name: 'Value', node: require('./input/node-value').default},
    {type: 'input', name: 'Image', node: require('./input/gl-image').default},

    {type: 'data', name: 'Text', node: require('./data/node-data').default},

    {type: 'color', name: 'RGB Color', node: require('./color/node-rgb').default},
    {type: 'color', name: 'HSL Color', node: require('./color/node-hsl').default},
    {type: 'color', name: 'Blend', node: require('./color/node-blend').default},
    {type: 'color', name: 'Polyad', node: require('./color/node-color-polyad').default},
    {type: 'color', name: 'Preview', node: require('./color/node-out').default},

    {type: 'logic', name: 'AND', node: require('./logic/node-logical-and.vue').default},
    {type: 'logic', name: 'NAND', node: require('./logic/node-logical-nand.vue').default},
    {type: 'logic', name: 'OR', node: require('./logic/node-logical-or.vue').default},
    {type: 'logic', name: 'XOR', node: require('./logic/node-logical-xor.vue').default},
    {type: 'logic', name: 'Output', node: require('./logic/node-logical-out.vue').default},

    {type: 'image', name: 'Preview', node: require('./image/img-preview').default},
    {type: 'image', name: 'Filter', node: require('./image/img-filter').default},

    {type: 'vector', name: 'Channel Slice', node: require('./vector/node-vec3-slice').default},
    {type: 'vector', name: 'Channel Combine', node: require('./vector/node-vec3-combine').default},
  ])

  function registerNodes(nodes) {
    nodes.forEach(({type, name, node}) => {
      store.commit('node:register', {type, name: name || node.name, is: node.name})
      Vue.component(node.name, node)
    })
  }
}
