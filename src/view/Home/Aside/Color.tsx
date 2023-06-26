"use client"
import { GradientColors } from "@/components/colors/gradientColors"
import { SolidColors } from "@/components/colors/solidColors"
import { Icons } from "@/components/icons"
import { Tooltip } from "@/components/Tooltip"
import { ColorPicker } from "@/components/ui/client"
import { fabric, setGradient } from "@/lib/fabric"
import { useCanvasState } from "@/src/store/canvas"
import { useCanvasContext } from "@/src/use/useCanvasStore"
import { Fragment, useEffect, useMemo, useState } from "react"

export const Color = () => {
  const state = useCanvasContext()

  const fill = useMemo(() => {
    const f = state.activeElements?.length ? (state.currentBlock[0]?.fill as string)?.split(',') : state.canvasStyleData.backgroundColor?.split(",")
    return f || ["#fff"]
  }, [state.activeElements, state.currentBlock])
  const [currentColor, setCurrentColor] = useState(fill[0])
  const [currentColorIndex, setCurrentColorIndex] = useState(0)
  const [colors, _setColors] = useState(fill)

  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  useEffect(() => {
    setCurrentColor(fill[0])
    _setColors((preC) => fill)
  }, [fill])


  const setCanvasBackgroundColor = (colors: string[]) => {
    if (colors.length === 1) {
      state.setCanvasStyleData({
        'backgroundColor': colors[0]
      })
      state.canvas?.set('backgroundColor', colors[0])
    } else {
      const gradient = new fabric.Gradient({
        coords: {
          x1: 0,
          y1: 0,
          x2: state.canvas?.width,
          y2: 0,
        },
        colorStops: colors.map((color, index) => ({
          offset: index / (colors.length - 1),
          color,
        }))
      })
      state.setCanvasStyleData({
        'backgroundColor': colors.join(',')
      })
      state.canvas?.set('backgroundColor', gradient)
    }

  }
  const setElementColor = (colors: string[]) => {
    if (colors.length === 1) {
      state.setCurrentBlock(state.currentBlock!.map(block => ({
        ...block,
        fill: colors[0]
      })))
      state.activeElements?.forEach((element) => {
        element.set('fill', colors[0])
      })
    } else {
      let lineWidths = state.activeElements && (state.activeElements![0] as any).__lineWidths
      if (Array.isArray(lineWidths)) {
        lineWidths = Math.max(...lineWidths)
      }
      if (!lineWidths) {
        lineWidths = state.activeElements?.[0]?.width || 0
      }
      state.activeElements?.forEach((element) => {
        setGradient(element, {
          coords: {
            x1: 0,
            y1: 0,
            x2: lineWidths,
            y2: 0,
          },
          colorStops: colors.map((color, index) => ({
            offset: index / (colors.length - 1),
            color,
          }))
        })
      })

      state.setCurrentBlock(state.currentBlock!.map(block => ({
        ...block,
        fill: colors.join(',')
      })))
    }
  }


  const setColors = (color: string[]) => {
    _setColors((preC) => color)

    // 没有活跃的block 不存在时，代表选中的是画布
    if (!state.activeElements?.length) {
      setCanvasBackgroundColor(color)
    } else {
      setElementColor(color)
    }
    state.canvas?.renderAll()

  }
  return <div className="absolute left-0 top-8 z-50 min-h-[35rem] w-80 min-w-min overflow-y-auto rounded bg-white shadow-md animate-in slide-in-from-right-2">
    <div className="m-5">
      <div className="mb-3">Color</div>

      <div onClick={(e) => {
        const color = (e.target as HTMLDivElement).getAttribute('data-color')
        if (color) {
          setColors(color.split(","))
        }
      }}>
        <div>


        </div>
        <div className=' relative'>
          <div className='flex items-center pb-2 '>
            Current color
          </div>

          <div className="flex w-60 items-center gap-x-2 overflow-x-auto py-2">
            <Tooltip tip='add a new color'>
              <div
                onClick={() => {
                  setCurrentColor(fill[0])
                  // -1表示当前是新增一个颜色
                  setCurrentColorIndex(-1)
                  setDisplayColorPicker(true)
                }}
                className="shadow-radix flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded hover:opacity-80 "
              >
                <Icons.plus className='text-black' />
              </div>
            </Tooltip>
            {
              colors.map((color, index) => <Fragment key={color + index}>
                <Tooltip tip={color}>
                  <div
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      // 设置当前颜色的索引
                      setCurrentColorIndex(index)
                      // 更改当前颜色
                      setCurrentColor(color)
                      setDisplayColorPicker(true)
                    }}
                    data-color={color}
                    style={{ background: color }}
                    className="mt-0!  shadow-radix flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded hover:opacity-80 "
                  >
                  </div>
                </Tooltip>
              </Fragment>
              )
            }
          </div>
          {
            displayColorPicker ?
              <div >
                <div className="fixed inset-0" onClick={() => setDisplayColorPicker(false)} />
                <div className="z-2 absolute left-1/2 top-full -translate-x-[50%]">
                  <ColorPicker.ChromePicker
                    onChangeComplete={(color) => {
                      const hexColor = color.hex
                      setCurrentColor(hexColor)
                      if (currentColorIndex == -1) {
                        setColors([...colors, hexColor])
                        setCurrentColorIndex(colors.length)
                      } else {
                        colors[currentColorIndex] = hexColor
                        setColors([...colors])
                      }

                    }}
                    color={currentColor} />
                  {/* <input type="color" name="" id="" /> */}
                </div>

              </div>
              :
              null
          }

        </div>
        <div >
          <div className=' flex items-center '>
            <Icons.palette className='mr-2' />
            Default color</div>
          <SolidColors />
          <GradientColors />

        </div>
      </div>
    </div>
  </div >
}