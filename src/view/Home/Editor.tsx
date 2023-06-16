'use client'
import { elementBorder, fabric } from "@/lib/fabric"
import { ComponentType } from "@/src/constants/enum"
import { canvasConfig } from "@/src/constants/fabric"
import { CanvasCore } from "@/src/core"
import { blockInfoList } from "@/src/element/metadata"
import { useCanvasState } from "@/src/store/canvas"
import { memo, useEffect, useRef, useState } from "react"
import { cloneDeep, uid } from "@/lib/utils"
import { CanvasElement } from "@/src/element"
const Editor = memo(() => {
  const { canvas, blocks, updateBlocks, canvasStyleData, updateCanvasContext } = useCanvasState()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasRenderer, setCanvasRenderer]  = useState<CanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = new fabric.Canvas(canvasRef.current, Object.assign(canvasConfig))
    const c = new CanvasCore(canvas, {
      backgroundColor: canvasStyleData.backgroundColor,
    })
    setCanvasRenderer(c.canvasRenderer)
    updateCanvasContext(canvas)
    return () => {
      canvas.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const render = ({ type, rect, clientX, clientY }: { type: ComponentType, rect: DOMRect, clientX: number, clientY: number }) => {
    if (type) {
      const item = blockInfoList.find(block => block.canvasStyle.type == type);
      if (item) {
        item.id = uid();
        const { top, left } = rect;
        item.canvasStyle.top = clientY - top;
        item.canvasStyle.left = clientX - left;
        updateBlocks([...blocks, cloneDeep(item.canvasStyle)]);
        const element = canvasRenderer?.render(item);
        if (element) {
          element.set({
            id: item.id,
            ...elementBorder
          });
          canvas?.setActiveObject(element);
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
              <canvas ref={canvasRef} id="canvas" width={canvasStyleData.width} height={canvasStyleData.height} />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

})
Editor.displayName = 'Editor'

export { Editor }