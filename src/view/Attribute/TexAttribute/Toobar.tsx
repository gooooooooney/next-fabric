import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem } from '@/components/ui/toolbar';
import { Icons } from '@/components/icons';

const TextToolbar = () => (
  <Toolbar
    aria-label="Formatting options"
  >
    <ToolbarToggleGroup className='flex items-center justify-center' type="multiple" aria-label="Text formatting">
      <ToolbarToggleItem
        value="bold"
        className='ml-0.5 inline-flex h-[25px] shrink-0 grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 hover:text-violet-600 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet-500 data-[state=on]:bg-violet-400 data-[state=on]:text-violet-100'
        aria-label="Bold"
      >
        <Icons.bold className="h-[15px] w-[15px]" />
      </ToolbarToggleItem>
      <ToolbarToggleItem
        value="italic"
        className='ml-0.5 inline-flex h-[25px] shrink-0 grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 hover:text-violet-600 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet-500 data-[state=on]:bg-violet-400 data-[state=on]:text-violet-100'
        aria-label="Italic"
      >
        <Icons.italic className="h-[15px] w-[15px]" />
      </ToolbarToggleItem>
      <ToolbarToggleItem
        value="strikethrough"
        className='ml-0.5 inline-flex h-[25px] shrink-0 grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 hover:text-violet-600 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet-500 data-[state=on]:bg-violet-400 data-[state=on]:text-violet-100'
        aria-label="Strike through"
      >
        <Icons.strikethrough className="h-[15px] w-[15px]" />
      </ToolbarToggleItem>
    </ToolbarToggleGroup>
    <ToolbarSeparator  />
    <ToolbarToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
      <ToolbarToggleItem
        value="left"
        className='ml-0.5 inline-flex h-[25px] shrink-0 grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 hover:text-violet-600 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet-500 data-[state=on]:bg-violet-400 data-[state=on]:text-violet-100'
        aria-label="Left aligned"
      >
        <Icons.alignLeft className="h-[15px] w-[15px]" />
      </ToolbarToggleItem>
      <ToolbarToggleItem
      className='ml-0.5 inline-flex h-[25px] shrink-0 grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 hover:text-violet-600 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet-500 data-[state=on]:bg-violet-400 data-[state=on]:text-violet-100'
        value="center"
        aria-label="Center aligned"
      >
        <Icons.alignCenter className="h-[15px] w-[15px]" />
      </ToolbarToggleItem>
      <ToolbarToggleItem
      className='ml-0.5 inline-flex h-[25px] shrink-0 grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 hover:text-violet-600 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet-500 data-[state=on]:bg-violet-400 data-[state=on]:text-violet-100'
        value="right"
        aria-label="Right aligned"
      >
        <Icons.alignRight className="h-[15px] w-[15px]" />
      </ToolbarToggleItem>
    </ToolbarToggleGroup>
  </Toolbar>
);

export default TextToolbar;