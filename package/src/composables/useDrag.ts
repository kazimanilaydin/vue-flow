import { Ref } from 'vue'
import { MaybeRef } from '@vueuse/core'
import useVueFlow from './useVueFlow'
import { pointToRendererPoint } from '~/utils'
import { GraphNode, XYPosition } from '~/types'

export type UseDragData = { dx: number; dy: number }

type UseDragParams = {
  onStart: (event: PointerEvent) => void
  onDrag: (event: PointerEvent, data: UseDragData) => void
  onStop: (event: PointerEvent) => void
  el: Ref<Element>
  disabled?: MaybeRef<boolean>
  noDragClassName?: MaybeRef<string>
  handleSelector?: string
  id?: string
}

function getOffset(event: PointerEvent, el: Element): XYPosition {
  const bounds = el.getBoundingClientRect() || { x: 0, y: 0 }
  const parent = (el as HTMLDivElement).offsetParent
  const parentBounds = parent?.getBoundingClientRect() || { x: 0, y: 0 }

  return {
    x: event.x - (bounds.x - parentBounds.x - (parent?.scrollLeft || 0)),
    y: event.y - (bounds.y - parentBounds.y - (parent?.scrollTop || 0)),
  }
}

function getParentNodePosition(parent?: GraphNode): XYPosition {
  return {
    x: parent?.computedPosition?.x || 0,
    y: parent?.computedPosition?.y || 0,
  }
}

function useDrag(params: UseDragParams) {
  const { viewport, snapToGrid, snapGrid, getNode } = useVueFlow()
  const { onStart, onDrag, onStop, el, disabled = false, noDragClassName, id } = $(params)

  let startPos = $ref<XYPosition>({ x: 0, y: 0 })
  let lastPos = $ref<Partial<XYPosition>>({ x: undefined, y: undefined })
  let parentPos = $ref<XYPosition>({ x: 0, y: 0 })

  return watch(
    [() => disabled, () => noDragClassName, () => id, () => el],
    () => {
      if (el) {
        const node = id ? getNode.value(id) : undefined

        useDraggable(el as HTMLDivElement, {
          preventDefault: true,
          stopPropagation: true,
          onStart(position, event) {
            if ((event.target as Element).className.includes(noDragClassName as any)) return
            if (disabled) return

            const offset = getOffset(event, el)
            parentPos = getParentNodePosition(node && node.parentNode ? getNode.value(node!.parentNode!) : undefined)

            startPos = {
              x: offset.x - viewport.value.x,
              y: offset.y - viewport.value.y,
            }

            onStart(event)
          },
          onMove(position, event) {
            if ((event.target as Element).className.includes(noDragClassName as any)) return
            if (disabled) return

            const pos = pointToRendererPoint(
              {
                x: event.x - startPos.x,
                y: event.y - startPos.y,
              },
              viewport.value,
              snapToGrid.value,
              snapGrid.value,
            )

            pos.x -= parentPos.x
            pos.y -= parentPos.y

            // skip events without movement
            if (lastPos.x !== pos.x || lastPos.y !== pos.y) {
              if (lastPos.x && lastPos.y) {
                onDrag(event, {
                  dx: pos.x - lastPos.x,
                  dy: pos.y - lastPos.y,
                })
              }

              lastPos = pos
            }
          },
          onEnd(position, event) {
            if ((event.target as Element).className.includes(noDragClassName as any)) return
            if (disabled) return

            onStop(event)
          },
        })
      }
    },
    { flush: 'post' },
  )
}

export default useDrag
