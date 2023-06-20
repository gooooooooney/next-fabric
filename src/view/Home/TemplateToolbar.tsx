'use client'
import { ComponentType } from '@/src/constants/enum';
import { blockInfoList } from '@/src/element/metadata';
import { useAttrState } from '@/src/store/attrState';
import { useCanvasState } from '@/src/store/canvas';
import { useCanvasContext } from '@/src/use/useCanvasStore';
import React, { Fragment, use, useMemo } from 'react';
import { Toolbar, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem } from '../../../components/ui/toolbar';


const TemplateToolbar = () => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target;
    if (!(target instanceof HTMLDivElement)) return
    if (!target.dataset.type) return

    e.dataTransfer?.setData("type", target.dataset.type ?? ComponentType.TextBox)
  }
  const attrState = useAttrState()
  const state = useCanvasContext()

  const fill = useMemo(() => {
    const f = state.activeElements?.length ? (state.currentBlock[0]?.fill as string)?.split(',') : state.canvasStyleData.backgroundColor?.split(",")
    
    return f || ["#fff"]
}, [state.activeElements?.length, state.canvasStyleData.backgroundColor, state.currentBlock])

  return <div className='w-1/3' onDragStart={(e) => handleDragStart(e)}>
    <Toolbar
      aria-label="Formatting options"

    >
      <ToolbarToggleGroup
        className='flex items-center justify-center' type="single" >

        <ToolbarToggleItem
          value={"color"}
        >
          <div>
            <span
              onClick={() => attrState.updateAttrStateByKey("shouldShowColor", true)}
              className=" border-shape flex h-[25px] w-[25px] cursor-pointer items-center  justify-center rounded hover:opacity-80 "
              style={{ background: fill.length > 1 ? 'linear-gradient(to right,' + fill.join(",") + ')' : fill[0] }}
            >
            </span>
          </div>
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      {
        blockInfoList.map((ele) => (
          <Fragment key={ele.name}>
            <ToolbarToggleGroup
              draggable={true}
              data-id={ele.id}
              data-type={ele.type}
              className='flex items-center justify-center' type="single" aria-label={ele.type}>

              <ToolbarToggleItem
                value={ele.type}
              >
                <ele.icon />
              </ToolbarToggleItem>
            </ToolbarToggleGroup>
            <ToolbarSeparator />
          </Fragment>
        ))
      }
      {/* <ToolbarToggleGroup type="single" aria-label="Text formatting">

        <ToolbarToggleItem
          value="bold"
          aria-label="Bold"
        >
          <Icons.image  />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />

      <ToolbarToggleGroup type="single" aria-label="Text formatting">
        <ToolbarToggleItem
          value="bold"
          aria-label="Bold"
        >
          <Icons.square  />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />

      <ToolbarToggleGroup type="single" aria-label="Text formatting">

        <ToolbarToggleItem
          value="bold"
          aria-label="Bold"
        >
          <Icons.circle  />
        </ToolbarToggleItem>
      </ToolbarToggleGroup> */}
    </Toolbar>
  </div>
};

export default TemplateToolbar;