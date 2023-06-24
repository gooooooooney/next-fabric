import React, { useMemo } from 'react';
import { Toolbar, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem } from '@/components/ui/toolbar';
import { Icons } from '@/components/icons';
import { useCanvasContext } from '~/use/useCanvasStore';
import { FontStyle, FontWeight, TextDecoration } from '@/src/constants/enum/style';
import { fabric } from '@/lib/fabric';

const TextToolbar = () => {
  const state = useCanvasContext();
  const elements = state.canvas?.getActiveObjects() as fabric.Textbox[]

  const textStyleDefaultValue = useMemo(() => {
    if (!state.blocks.length) return []
    const block = state.blocks[0]
    return [
      block?.fontWeight ?? 'normal',
      block.underline ? 'underline' : 'none',
      block.linethrough ? 'line-through' : 'none',
      block.fontStyle ?? 'normal',
    ]
  }, [state.blocks])

  const onChangeTextStyle = (value: string[]) => {
    state.blocks.forEach((block) => {
      block.fontWeight = (value.find((item) => item == 'bold') ? 'bold' : 'normal') as FontWeight
      block.underline = !!value.find(item => item == 'underline')
      block.linethrough = !!value.find(item => item == 'line-through')
      block.fontStyle = value.find(item => item == 'italic') ? 'italic' : 'normal'
    })
    elements?.forEach((element) => {
      const block = state.blocks[0]

      // element.setSelectionStyles({ 
      //   'fontWeight': block.fontWeight,
      //   'underline': block.underline,
      //   'linethrough': block.linethrough,
      //   'fontStyle': block.fontStyle,
      //  })

      element?.set('fontWeight', block.fontWeight)
      element?.set('underline', block.underline)
      element?.set('linethrough', block.linethrough)
      element?.set('fontStyle', block.fontStyle)
    })
    state.canvas?.renderAll()
  }
  return (
    <Toolbar
      aria-label="Formatting options"
    >
      <ToolbarToggleGroup defaultValue={textStyleDefaultValue} onValueChange={onChangeTextStyle} className='flex items-center justify-center' type="multiple" aria-label="Text formatting">
        <ToolbarToggleItem
          value={FontWeight.Bold}
          className='ml-0.5 inline-flex h-[25px] shrink-0 grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 hover:text-violet-600 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet-500 data-[state=on]:bg-violet-400 data-[state=on]:text-violet-100'
          aria-label="Bold"
        >
          <Icons.bold className="h-[15px] w-[15px]" />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          value={FontStyle.Italic}
          className='ml-0.5 inline-flex h-[25px] shrink-0 grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 hover:text-violet-600 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet-500 data-[state=on]:bg-violet-400 data-[state=on]:text-violet-100'
          aria-label="Italic"
        >
          <Icons.italic className="h-[15px] w-[15px]" />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          value={TextDecoration.LineThrough}
          className='ml-0.5 inline-flex h-[25px] shrink-0 grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 hover:text-violet-600 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet-500 data-[state=on]:bg-violet-400 data-[state=on]:text-violet-100'
          aria-label="Strike through"
        >
          <Icons.strikethrough className="h-[15px] w-[15px]" />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          value={TextDecoration.Underline}
          className='ml-0.5 inline-flex h-[25px] shrink-0 grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 hover:text-violet-600 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet-500 data-[state=on]:bg-violet-400 data-[state=on]:text-violet-100'
          aria-label="Strike through"
        >
          <Icons.underline className="h-[15px] w-[15px]" />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
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
  )
}

export default TextToolbar;