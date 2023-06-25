import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { useCanvasContext } from '@/src/use/useCanvasStore';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { useState } from 'react';


interface ShadowProps {
  color: string,
  blur: number,
  offsetX: number,
  offsetY: number,
}
const defaultShadow: ShadowProps = {
  color: 'rgba(0,0,0)',
  blur: 10,
  offsetX: 20,
  offsetY: 20,
};

export const ShadowAttr = () => {

  const state = useCanvasContext()
  const shadow = state.currentBlock[0]?.shadow as ShadowProps

  const [shadowState, _setShadowState] = useState<ShadowProps | null>(null)
  const [transparency, _setTransparency] = useState(100)

  const setShadowState = (shadow: ShadowProps | null) => {
    _setShadowState(shadow)
    onShadowValueChange(shadow)
  }

  const setTransparency = (tr: number) => {
    _setTransparency(tr)
    if (shadowState) {
      shadowState.color = shadowState.color.replace(/rgba\((\d+),(\d+),(\d+),(\d+)\)/, `rgba($1,$2,$3,${tr / 100})`)
      _setShadowState(() => {
        
        onShadowValueChange(shadowState)

        return shadowState
      })
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
          {/* <div className='flex pb-2 items-center '>
          Style
        </div> */}
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
                  <div className="mt-4 flex justify-between">
                    <div>OffsetX</div>
                    <input type="number" onChange={e => {
                      setShadowState({ ...shadowState, offsetX: e.target.valueAsNumber })
                    }} value={shadowState.offsetX} max={50} min={-50} />
                  </div>
                  <div>
                    <input
                      style={{
                        backgroundSize: `${shadowState.offsetX + 50}% 100%`
                      }}
                      type="range"
                      step={1}
                      value={shadowState.offsetX}
                      onChange={(e) => {
                        setShadowState({ ...shadowState, offsetX: e.target.valueAsNumber })
                      }} max={50} min={-50} name="" id="" />
                  </div>

                </div>
                <div>
                  <div className="mt-4 flex justify-between">
                    <div>OffsetY</div>
                    <input type="number"
                      onChange={e => {
                        setShadowState({ ...shadowState, offsetY: e.target.valueAsNumber })
                      }} value={shadowState.offsetY} max={50} min={-50} />
                  </div>

                  <input
                    style={{
                      backgroundSize: `${shadowState.offsetY + 50}% 100%`
                    }}
                    type="range"
                    step={1}
                    value={shadowState.offsetY}
                    onChange={(e) => {
                      setShadowState({ ...shadowState, offsetY: e.target.valueAsNumber })
                    }} max={50} min={-50} name="" id="" />

                </div>
                <div>
                  <div className="mt-4 flex justify-between">
                    <div>Blur</div>
                    <input type="number"
                      onChange={e => {
                        setShadowState({ ...shadowState, blur: e.target.valueAsNumber })
                      }} value={shadowState.blur} max={50} min={-50} />
                  </div>

                  <input
                    style={{
                      backgroundSize: `${shadowState.blur}% 100%`
                    }}
                    type="range"
                    step={1}
                    value={shadowState.blur}
                    onChange={(e) => {
                      setShadowState({ ...shadowState, blur: e.target.valueAsNumber })
                    }} max={100} min={0} name="" id="" />

                </div>
                <div>
                  <div className="mt-4 flex justify-between">
                    <div>Transparency</div>
                    <input type="number"
                      onChange={e => {
                        setTransparency(e.target.valueAsNumber)
                      }} value={transparency} max={50} min={-50} />
                  </div>

                  <input
                    style={{
                      backgroundSize: `${transparency}% 100%`
                    }}
                    type="range"
                    step={1}
                    value={transparency}
                    onChange={(e) => {
                      setTransparency(e.target.valueAsNumber)
                    }} max={100} min={0} name="" id="" />

                </div>
                <div className="my-2 flex items-center justify-between">
                  <div className='flex items-center '>
                    Shadow Color
                  </div>
                  {/* <ShadowPopover
                    transparency={transparency.value}
                    isElement={isElement}
                    shadow={shadowState.value}
                    onShadowValueChange$={(c) => {
                      setShadowState(c)
                    }}
                  /> */}

                </div>
              </div>
              : null
          }

        </div>
      </div>
    </div>
  </div>
}