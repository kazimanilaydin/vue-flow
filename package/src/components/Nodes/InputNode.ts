import { FunctionalComponent } from 'vue'
import Handle from '../Handle/Handle.vue'
import { NodeProps, Position } from '~/types'

const InputNode: FunctionalComponent<NodeProps> = function ({
  sourcePosition = Position.Bottom,
  label,
  connectable = false,
  isValidSourcePos,
}) {
  return [
    typeof label !== 'string' && label ? h(label) : h('div', { innerHTML: label }),
    h(Handle, { type: 'source', position: sourcePosition, isConnectable: connectable, isValidConnection: isValidSourcePos }),
  ]
}

InputNode.props = ['sourcePosition', 'label', 'isValidSourcePos', 'connectable']
InputNode.inheritAttrs = false

export default InputNode
