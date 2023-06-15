'use client'
import React from 'react';
import { Icons } from '../../../components/icons';
import { Toolbar, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem } from '../../../components/ui/toolbar';


const TemplateToolbar = () => {
  return <div className='w-1/3'>
    <Toolbar
      aria-label="Formatting options"
    >
      <ToolbarToggleGroup type="single" aria-label="Text formatting">
        <ToolbarToggleItem
          value="bold"
          aria-label="Bold"
        >
          <Icons.type  />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarToggleGroup type="single" aria-label="Text formatting">

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
      </ToolbarToggleGroup>
    </Toolbar>
  </div>
};

export default TemplateToolbar;