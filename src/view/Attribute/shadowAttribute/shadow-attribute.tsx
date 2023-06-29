import { SolidColors } from '@/components/colors/solidColors';
import { Tooltip } from '@/components/Tooltip';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { hexToRgb } from '@/lib/style';
import { cn } from '@/lib/utils';
import { ColorPicker } from "@/components/ui/client"
import { useCanvasContext } from '@/src/use/useCanvasStore';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { useState } from 'react';
import { Icons } from '@/components/icons';


interface ShadowProps {
  color: string,
  blur: number,
  offsetX: number,
  offsetY: number,
}
const defaultShadow: ShadowProps = {
  color: 'rgba(0,0,0,1)',
  blur: 10,
  offsetX: 20,
  offsetY: 20,
};

export const ShadowAttr = () => {

  const state = useCanvasContext()
  const shadow = state.currentBlock[0]?.shadow as ShadowProps
  const rgx = /^rgba\(((,?\s*\d+){3}).+$/

  const [shadowState, _setShadowState] = useState<ShadowProps | null>(null)
  const [transparency, _setTransparency] = useState(100)
  const [displayShadowColorPicker, setDisplayShadowColorPicker] = useState(false)
  const [currentColor, setCurrentColor] = useState(shadowState?.color)

  const setShadowState = (shadow: ShadowProps | null) => {
    _setShadowState(shadow)
    // console.log(shadow)
    onShadowValueChange(shadow)
  }

  const setTransparency = (tr: number) => {
    _setTransparency(tr)
    if (shadowState) {
      const color = shadowState.color.replace(/[^,]+(?=\))/, `${tr / 100}`)
      setShadowState({ ...shadowState, color })
    }
  }
  const onShadowValueChange = (shadow: ShadowProps | null) => {
    state.setCurrentBlock(state.currentBlock.map((block) => ({ ...block, shadow: shadow as any })))
    state.activeElements?.forEach((element) => {
      element?.set('shadow', shadow)
    })
    state.canvas?.renderAll()
  }
  return <div className=" shadow-radix mt-5 rounded bg-white  p-3">
    <div className="m-5">
      <div className="mb-3">Effects</div>

      <div>
        <div className='relative'>

          <div data-orientation="vertical" aria-orientation="vertical" role="separator" className="h-1px bg-#e4e2e4 my-[10px] w-full"></div>
          <div>
            <ToggleGroup
              className=""
              type="single"
              defaultValue="none"
              aria-label="Text alignment"
            >
              <ToggleGroupItem
                variant="outline"
                className='mr-1'
                onClick={() => {
                  setShadowState(null)

                }}
                value="none">
                <p  >None</p>
              </ToggleGroupItem>
              <ToggleGroupItem
                variant="outline"
                onClick={() => {
                  setShadowState(defaultShadow)

                }}
                value="shadow">
                <p style={{ textShadow: 'rgb(0, 0, 0) 9px 8px 3px' }} >Shadow</p>
              </ToggleGroupItem>
            </ToggleGroup>

          </div>
          {
            shadowState ?
              <div>
                <div>
                  <div className="my-4 flex justify-between">
                    <div>OffsetX</div>
                    <Input
                      type="number"
                      className='h-full w-16'
                      onChange={e => {
                        setShadowState({ ...shadowState, offsetX: e.target.valueAsNumber })
                      }}
                      value={shadowState.offsetX}
                      max={50}
                      min={-50} />
                  </div>
                  <div>
                    <Slider step={1} value={[shadowState.offsetX]} max={50} min={-50} onValueChange={e => {
                      e[0] && setShadowState({ ...shadowState, offsetX: e[0] })
                    }} />
                  </div>

                </div>
                <div>
                  <div className="my-4 flex justify-between">
                    <div>OffsetY</div>
                    <Input
                      type="number"
                      className='h-full w-16'
                      onChange={e => {
                        setShadowState({ ...shadowState, offsetY: e.target.valueAsNumber })
                      }}
                      value={shadowState.offsetY}
                      max={50}
                      min={-50} />
                  </div>
                  <Slider step={1} value={[shadowState.offsetY]} max={50} min={-50} onValueChange={e => {
                    e[0] && setShadowState({ ...shadowState, offsetY: e[0] })
                  }}
                  />
                </div>
                <div>
                  <div className="my-4 flex justify-between">
                    <div>Blur</div>
                    <Input
                      type="number"
                      className='h-full w-16'
                      onChange={e => {
                        setShadowState({ ...shadowState, blur: e.target.valueAsNumber })
                      }}
                      value={shadowState.blur}
                      max={100}
                      min={0} />
                  </div>
                  <Slider step={1} value={[shadowState.blur]} max={100} min={0} onValueChange={e => {
                    e[0] && setShadowState({ ...shadowState, blur: e[0] })
                  }}
                  />

                </div>
                <div>
                  <div className="my-4 flex justify-between">
                    <div>Transparency</div>
                    <Input
                      type="number"
                      className='h-full w-16'
                      onChange={e => {
                        setTransparency(e.target.valueAsNumber)
                      }}
                      value={transparency}
                      max={100}
                      min={0} />
                  </div>
                  <Slider step={1} value={[transparency]} max={100} min={0} onValueChange={e => {
                    e[0] && setTransparency(e[0])
                  }}
                  />

                </div>
                <div className="my-2 flex items-center justify-between">
                  <div className='flex items-center '>
                    Shadow Color
                  </div>

                  <Popover>
                    <PopoverTrigger className="ml-2">
                      <span
                        className=" shadow-radix flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded hover:opacity-80 "
                        style={{ background: shadowState.color.replace(rgx, `rgb($1)`) }}
                      >
                      </span>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div onClick={e => {
                        const color = (e.target as HTMLDivElement).getAttribute('data-color')

                        if (color) {
                          if (color.startsWith('#')) {
                            const rgb = hexToRgb(color)
                            if (rgb) {
                              setShadowState({ ...shadowState, color: `rgba(${rgb.r},${rgb.g},${rgb.b},${transparency / 100})` })
                            }
                          }
                        }
                      }}>
                        <div className=' relative py-2'>
                          <div className='flex items-center pb-2 '>
                            Current color
                          </div>

                          <div className="flex items-center gap-x-2">
                            <Tooltip tip="Change shadow color">
                              <div
                                onClick={(e) => {
                                  e.stopPropagation()
                                  e.preventDefault()
                                  setDisplayShadowColorPicker(true)
                                }}
                                data-color={shadowState!.color}
                                style={{ background: shadowState!.color }}
                                className="  shadow-radix flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded hover:opacity-80 "
                              >
                              </div>
                            </Tooltip>
                          </div>
                          {
                            displayShadowColorPicker ?
                              <div className='animate-in slide-in-from-right-2'>
                                <div className="fixed inset-0" onClick={() => setDisplayShadowColorPicker(false)} />
                                <div className="z-2 absolute left-1/2 top-full translate-x-[-50%]">
                                  <ColorPicker.ChromePicker
                                    onChangeComplete={(color) => {
                                      const rgb = color.rgb
                                      const c = `rgba(${rgb.r},${rgb.g},${rgb.b},${transparency / 100})`
                                      setShadowState({ ...shadowState, color:c  })
                                      setCurrentColor(c)

                                    }}
                                    color={currentColor} />
                                </div>

                              </div>
                              :
                              null
                          }

                        </div>
                        <div >
                          <div className=' flex items-center  px-4 py-2 '>
                            <Icons.palette className='mr-2' />
                            Default color</div>
                          <div
                            className="flex flex-col flex-wrap gap-x-4 gap-y-1"
                          >
                            <label className='text-xs text-[#0d1216b3]'>
                              Solid colors
                            </label>
                            <div className="flex flex-wrap ">


                              <SolidColors />

                            </div>
                          </div>

                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                </div>
              </div>
              : null
          }

        </div>
      </div>
    </div>
  </div>
}