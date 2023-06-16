import { GradientColors } from "@/components/colors/gradientColors"
import { SolidColors } from "@/components/colors/solidColors"
import { Icons } from "@/components/icons"
import { Tooltip } from "@/components/Tooltip"
import { useCanvasState } from "@/src/store/canvas"
import { Fragment, useMemo } from "react"

export const Color = () => {
  const state = useCanvasState()

  const fill = useMemo(() => {
    const f = state.activeElements?.length ? (state.currentBlock[0]?.fill as string)?.split(',') : state.canvasStyleData.backgroundColor?.split(",")
    return f
  }, [state.activeElements, state.canvasStyleData.backgroundColor, state.currentBlock])
  const currentColor = useSignal(fill.value[0])
  const currentColorIndex = useSignal(0)
  const colors = useSignal(fill.value)

  const displayColorPicker = useSignal(false)
  // const displayShadowColorPicker = useSignal(false)
  // const setDisplayShadowColorPicker = $((bol: boolean) => {
  //     displayShadowColorPicker.value = bol
  // })
  const setDisplayColorPicker = $((bol: boolean) => {
    displayColorPicker.value = bol
  })
  const setCurrentColor = $((color: string) => {
    currentColor.value = color
  })

  useVisibleTask$(({ track }) => {
    const _fill = track(() => fill.value)
    currentColor.value = _fill[0]
    colors.value = _fill
  })
  const setCurrentColorIndex = $((index: number) => {
    currentColorIndex.value = index
  })


  const setCanvasBackgroundColor = $((colors: string[]) => {
    if (colors.length === 1) {
      state.canvasStyleData.backgroundColor = colors[0]
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
      state.canvasStyleData.backgroundColor = colors.join(',')
      state.canvas?.set('backgroundColor', gradient)
    }
    state.canvas?.renderAll()

  })
  const setElementColor = $((colors: string[]) => {
    if (colors.length === 1) {
      state.currentBlock!.forEach(block => {
        block.fill = colors[0]
      })
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

      state.currentBlock.forEach(block => {
        block.fill = colors.join(',')
      })
    }
    state.canvas?.renderAll()
  })


  const setColors = $((color: string[]) => {
    colors.value = color

    // 没有活跃的block 不存在时，代表选中的是画布
    if (!state.activeElements?.length) {
      setCanvasBackgroundColor(colors.value)
    } else {
      setElementColor(colors.value)
    }
    // state.canvas?.renderAll()

  })
  return <div className="left-2% min-w-xs w-xs shadow-radix h-2xl absolute top-0 overflow-y-auto rounded bg-white">
    <div className="m-5">
      <div className="mb-3">Image</div>

      <div onClick={(e) => {
        const color = (e.target as HTMLDivElement).getAttribute('data-color')
        if (color) {
          console.log(color)
          setColors(color.split(","))
        }
      }}>
        <div>


        </div>
        <div className=' relative'>
          <div className='flex items-center pb-2 '>
            Current color
          </div>

          <div className="flex items-center gap-x-2 py-2">
            <Tooltip tip='add a new color'>
              <div
                onClick$={() => {
                  setCurrentColor(fill.value[0])
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
              colors.value.map((color, index) => <Fragment key={color + index}>
                <Tooltip tip={color}>
                  <div
                    preventdefault:click
                    onClick$={(e) => {
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
            displayColorPicker.value ?
              <div >
                <div className="fixed inset-0" onClick$={() => setDisplayColorPicker(false)} />
                <div className="z-2 absolute left-1/2 top-full -translate-x-[50%]">
                  <ColorChromePicker
                    onChangeComplete$={(color) => {
                      const hexColor = color.hex
                      setCurrentColor(hexColor)
                      if (currentColorIndex.value == -1) {
                        setColors([...colors.value, hexColor])
                        setCurrentColorIndex(colors.value.length)
                      } else {
                        colors.value[currentColorIndex.value] = hexColor
                        setColors([...colors.value])
                      }

                    }}
                    color={currentColor.value} />
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