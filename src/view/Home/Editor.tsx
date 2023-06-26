'use client'
import { elementBorder, fabric } from "@/lib/fabric"
import { CANVAS_EVENT_SELECTED, ComponentType } from "@/src/constants/enum"
import { canvasConfig } from "@/src/constants/fabric"
import { CanvasCore } from "@/src/core"
import { blockInfoList } from "@/src/element/metadata"
import { useCanvasState } from "@/src/store/canvas"
import { memo, useEffect, useRef, useState } from "react"
import { cloneDeep, uid } from "@/lib/utils"
import { CanvasElement } from "@/src/element"
import { emitter } from "@/src/core/event"
import { useCanvasSelectedInitEvent } from "@/src/use/useInitEvent"
import { useContextMenu } from "@/src/use/useContextMenu"
import { useCanvasContext } from "@/src/use/useCanvasStore"
import { useMount } from "@/src/use/useMount"
const Editor = memo(() => {
  // const state = useCanvasState()
  const state = useCanvasContext()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasRenderer, setCanvasRenderer] = useState<CanvasElement | null>(null)
  useMount(() => {
    if (!canvasRef.current) return
    const canvas = new fabric.Canvas(canvasRef.current, Object.assign(canvasConfig))
    const c = new CanvasCore(canvas, {
      backgroundColor: state.canvasStyleData.backgroundColor,
    })

    setCanvasRenderer(c.canvasRenderer)
    state.setCanvas(canvas)
    
    return () => {
      canvas.dispose()
    }
  })
  useCanvasSelectedInitEvent()
  const {shouldShowContextMenu, contextPosition} = useContextMenu()


  const render = ({ type, rect, clientX, clientY }: { type: ComponentType, rect: DOMRect, clientX: number, clientY: number }) => {
    if (type) {
      const item = blockInfoList.find(block => block.canvasStyle.type == type);
      if (item) {
        item.id = uid();
        const { top, left } = rect;
        item.canvasStyle.top = clientY - top;
        item.canvasStyle.left = clientX - left;
        item.canvasStyle.id = item.id;
        state.setBlocks((prev) => [...prev, cloneDeep(item.canvasStyle)]);
        const element = canvasRenderer?.render(item);
        if (element) {
          element.set({
            id: item.id,
            ...elementBorder
          });
          state.canvas?.setActiveObject(element);
          state.setCurrentBlock([cloneDeep(item.canvasStyle)])
        }
      }
    }
  }


  return <div className="absolute left-1/2 top-0 -translate-x-1/2">
    <div className="flex  flex-col items-center justify-center px-2">
      <div
        onDrop={(e) => {
          e.preventDefault()
          e.stopPropagation()
          const type = e.dataTransfer?.getData("type") as ComponentType;
          if (!type) return
          render({
            type,
            rect: (e.target as HTMLDivElement).getBoundingClientRect(),
            clientX: e.clientX,
            clientY: e.clientY
          });
        }}
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
          e.dataTransfer!.dropEffect = 'copy'
        }}
        className=" h-full bg-[#f5f5f5] ">
        <div className=" h-full w-full">
          <div className="relative">
            <div>
              <canvas ref={canvasRef} id="canvas" width={state.canvasStyleData.width} height={state.canvasStyleData.height} />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

})
Editor.displayName = 'Editor'

export { Editor }