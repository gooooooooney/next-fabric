'use client'
import { fabric } from "@/lib/fabric"
import { canvasConfig } from "@/src/constants/fabric"
import { useCanvasState } from "@/src/store/canvas"
import { useEffect, useRef } from "react"

export const Editor = () => {

  const { canvasStyleData } = useCanvasState()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, canvasConfig)
      
    }
  })

  return <div className="absolute left-1/2 top-0 -translate-x-1/2">
    <div className="flex  flex-col items-center justify-center px-2">
      <div
        ref={canvasContainerRef}
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

}