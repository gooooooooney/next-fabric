'use client'
import { ComponentType } from '@/src/constants/enum';
import { blockInfoList } from '@/src/element/metadata';
import React, { Fragment } from 'react';
import { Toolbar, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem } from '../../../components/ui/toolbar';


const TemplateToolbar = () => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target;
    if (!(target instanceof HTMLDivElement)) return
    if (!target.dataset.type) return

    e.dataTransfer?.setData("type", target.dataset.type ?? ComponentType.TextBox)
  }
  return <div className='w-1/3' onDragStart={(e) => handleDragStart(e)}>
    <Toolbar
      aria-label="Formatting options"

    >
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