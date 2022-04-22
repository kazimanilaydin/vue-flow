<script lang="ts" setup>
import { useVueFlow, useDrag } from '../../composables'
import { getRectOfNodes } from '../../utils'

const { hooks, setState, viewport, getSelectedNodes, snapToGrid, snapGrid, updateNodePosition, noPanClassName } = $(useVueFlow())

const el = templateRef<HTMLDivElement>('el', null)

useDrag({
  el,
  onStart(event) {
    hooks.selectionDragStart.trigger({ event: event.sourceEvent, nodes: getSelectedNodes })
  },
  onDrag(event, { dx, dy }) {
    hooks.selectionDrag.trigger({ event: event.sourceEvent, nodes: getSelectedNodes })
    updateNodePosition({ diff: { x: dx, y: dy }, dragging: true })
  },
  onStop(event) {
    hooks.selectionDragStop.trigger({ event: event.sourceEvent, nodes: getSelectedNodes })
    getSelectedNodes.forEach((node) => (node.dragging = false))
  },
})
const selectedNodesBBox = $computed(() => getRectOfNodes(getSelectedNodes))

const innerStyle = computed(() => ({
  width: `${selectedNodesBBox.width}px`,
  height: `${selectedNodesBBox.height}px`,
  top: `${selectedNodesBBox.y}px`,
  left: `${selectedNodesBBox.x}px`,
}))

const transform = computed(() => `translate(${viewport.x}px,${viewport.y}px) scale(${viewport.zoom})`)

watch($$(selectedNodesBBox), (v) => {
  setState({
    selectedNodesBbox: v,
  })
})

const onContextMenu = (event: MouseEvent) => hooks.selectionContextMenu.trigger({ event, nodes: getSelectedNodes })
</script>
<script lang="ts">
export default {
  name: 'NodesSelection',
}
</script>
<template>
  <div class="vue-flow__nodesselection vue-flow__container" :class="noPanClassName" :style="{ transform }">
    <div ref="el" class="vue-flow__nodesselection-rect" :style="innerStyle" @contextmenu="onContextMenu" />
  </div>
</template>
