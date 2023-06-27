import Label from "@/components/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCanvasContext } from "@/src/use/useCanvasStore"
import { Label as OriginLabel } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ColorPicker } from "@/components/ui/client"
import { Select } from '@/components/select/select'

import { useState } from "react"
import { cn } from "@/lib/utils"
import { KEY_CODE } from "@/src/constants/enum"

export const StrokeWidth = () => {
  const state = useCanvasContext()
  const elements = state.canvas?.getActiveObjects()
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })
  const strokeWidthRange = Array.from({ length: 10 }, (_, i) => i + 1)
  const [displayStrokeColorPicker, setDisplayStrokeColorPicker] = useState(false)
  const handleChangeStrokeColor = (color: string | null) => {
    state.setCurrentBlock(state.currentBlock.map(block => ({
      ...block,
      stroke: color
    })))
    elements?.forEach((element) => {
      element.set('stroke', color)
    })
    state.canvas?.renderAll()
  }
  return <div className="shadow-radix relative  mt-5 rounded-md bg-white p-3">
    <Label className="mt-4" label="Stroke width">
      <div className="relative flex flex-wrap items-center gap-2">
        <RadioGroup
          value={state.currentBlock[0]?.fontSize}
          onValueChange={(value) => {
            const valueNumber = Number(value)
            state.setCurrentBlock(state.currentBlock.map(block => ({
              ...block,
              strokeWidth: valueNumber
            })))
            elements?.forEach((element) => {
              element?.set('strokeWidth', valueNumber)
            })
            state.canvas?.renderAll()
          }}
          className="flex items-center justify-center"
        >
          {
            strokeWidthRange.slice(0, 5).map(size => {
              return <div
                className={cn('border-shape mr-1 flex h-[20px] w-[20px] cursor-pointer items-center justify-center p-5  hover:bg-violet-100', {
                  "bg-violet-500 text-white hover:!bg-violet-400": size === state.currentBlock[0]?.strokeWidth,
                })}
                key={size}>
                <RadioGroupItem
                  className="absolute p-2 opacity-0"
                  value={size + ""}
                  id={`stroke-width-${size}`}
                />
                <OriginLabel
                  htmlFor={`stroke-width-${size}`} className={cn("cursor-pointer p-4")}>{size}
                </OriginLabel>
              </div>
            })
          }
        </RadioGroup>
      </div>
      <div className='w-24'>
        <Select
          label="Font size"
          value={state.blocks[0]?.strokeWidth?.toString()}
          onValueChange={size => {
            state.setCurrentBlock(state.currentBlock.map((block) => ({ ...block, strokeWidth: Number(size) })))
            elements?.forEach((element) => {
              element?.set('strokeWidth', Number(size))
            })
            state.canvas?.renderAll()
          }}
          items={strokeWidthRange} />
      </div>
    </Label>
    <Label className="relative mt-4" label="Stroke">
      <div className="flex items-center justify-between">
        <div className="h-[45px] w-[45px] cursor-pointer rounded-xl shadow-sm hover:opacity-80" onClick={(e) => {
          const target = e.target as HTMLDivElement
          const { top, left, width, height } = target.getBoundingClientRect()
          setPosition({
            x: left + width / 2,
            y: top - 300
          })
          setDisplayStrokeColorPicker(true)
        }} style={{ 'backgroundColor': state.currentBlock[0]?.stroke as string ?? 'black' }}></div>
        {/* <div className=" flex h-[45px] w-[50px] cursor-pointer items-center justify-center rounded-xl shadow-sm hover:opacity-80" onClick={() => handleChangeStrokeColor(null)}>reset</div> */}
        <Button variant="outline" onClick={() => handleChangeStrokeColor(null)} >
          Reset
        </Button>
        <div className="border-gray-3 flex h-[45px] w-2/5 items-center rounded-xl border border-solid  text-xl shadow-sm">
          <div className="pl-2">#</div>
          <input
            className="m-0 w-full rounded-xl border-0 p-2 pr-1 text-xl outline-0 "
            type="text"
            defaultValue={state.currentBlock[0]?.stroke ? (state.currentBlock[0]?.stroke as string).slice(1) : ""}
            onKeyUp={(e) => {
              if (e.key == KEY_CODE.ENTER) {
                handleChangeStrokeColor("#" + (e.target as HTMLInputElement).value)
              }
            }} />
        </div>
      </div>

    </Label>
    {displayStrokeColorPicker ?
      <div >
        <div className="fixed inset-0" onClick={() => setDisplayStrokeColorPicker(false)} />
        <div className="z-2 fixed left-0 top-0 "
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
        >
          <ColorPicker.SketchPicker
            onChangeComplete={({ hex }) => handleChangeStrokeColor(hex)}
            color={state.currentBlock[0]?.stroke as string ?? 'none'} />
        </div>

      </div> : null
    }
  </div>
}