'use client'
import Label from '@/components/label'
import { Select } from '@/components/select/select'
import { Label as SLabel } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Toggle } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'
import { useCanvasContext } from '@/src/use/useCanvasStore'
import { Fragment } from 'react'
import TextToolbar from './Toobar'

export default function TextAttribute() {
    const state = useCanvasContext()
    const elements = state.canvas?.getActiveObjects()
    const fontSizeRange = Array.from({ length: 28 }, (_, i) => i + 12)

    const textSizes = [
        { label: 'S', value: 12, size: 'text-[12px]' },
        { label: 'M', value: 16, size: 'text-[16px]' },
        { label: 'L', value: 20, size: 'text-[20px]' },
        { label: 'XL', value: 24, size: 'text-[24px]' },
    ]
    const textFontFamily = [
        { label: 'Times New Roman', value: 'Times New Roman', className: 'font-Times-New-Roman' },
        { label: 'Arial', value: 'Arial', className: 'font-Arial' },
        { label: 'Hoefler Text', value: 'Hoefler Text', className: 'font-Hoefler-Text' },
        { label: 'Delicious', value: 'Delicious', className: 'font-Delicious' },
        { label: 'Helvetica', value: 'Helvetica', className: 'font-Helvetica' },
        { label: 'Verdana', value: 'Verdana', className: 'font-Verdana' },
        { label: 'Georgia', value: 'Georgia', className: 'font-Georgia' },
        { label: 'Courier', value: 'Courier', className: 'font-Courier' },
        { label: 'Comic Sans MS', value: 'Comic Sans MS', className: 'font-Comic-Sans-MS' },
        { label: 'Impact', value: 'Impact', className: 'font-Impact' },
        { label: 'Monaco', value: 'Monaco', className: 'font-Monaco' },
        { label: 'Optima', value: 'Optima', className: 'font-Optima' },
        { label: 'Plaster', value: 'Plaster', className: 'font-Plaster' },
        { label: 'Engagement', value: 'Engagement', className: 'font-Engagement' },
    ]
    return (
        <div className="relative w-full animate-in slide-in-from-top-2 ">
            <TextToolbar />
            <div className="shadow-radix relative  mt-5 rounded-md bg-white p-3">
                <div className="flex flex-col ">
                    <Label label="Text" htmlFor="textMsg">
                        <Textarea id='textMsg'
                            placeholder="Type your text here."
                            onChange={(el) => {
                                const text = el.target.value
                                state.setCurrentBlock(state.currentBlock.map((block) => ({ ...block, text })))
                                elements?.forEach((element) => {
                                    element?.set('text', text)
                                })
                                state.canvas?.renderAll()
                            }}
                            value={state.currentBlock[0]?.text}
                        />
                    </Label>



                    <Label className="mt-4" label="Size">
                        <div className="relative flex items-center">
                            <RadioGroup
                                value={state.currentBlock[0]?.fontSize}
                                onValueChange={(value) => {
                                    state.setCurrentBlock(state.currentBlock.map((block) => ({ ...block, fontSize: Number(value) })))
                                    elements?.forEach((element) => {
                                        element?.set('fontSize', value)
                                    })
                                    state.canvas?.renderAll()
                                }}
                                className="flex items-center justify-center" >

                                {
                                    textSizes.map(size => {
                                        return <div
                                            className={cn('border-shape mr-2 flex h-[20px] w-[20px] cursor-pointer items-center justify-center p-5  hover:bg-violet-100', {
                                                "bg-violet-500 text-white hover:!bg-violet-400": size.value === state.currentBlock[0]?.fontSize,
                                            })}
                                            key={size.value}>
                                            <RadioGroupItem
                                                className=" absolute p-2 opacity-0"
                                                value={size.value + ""}
                                                id={size.value.toString()}
                                            />
                                            <SLabel
                                                htmlFor={size.value.toString()} className={cn("p-4, cursor-pointer", size.size)}>{size.label}
                                            </SLabel>
                                        </div>
                                    })
                                }
                            </RadioGroup>

                        </div>
                        <div className='w-24'>
                            <Select
                                label="Font size"
                                value={state.blocks[0]?.fontSize?.toString()}
                                onValueChange={size => {
                                    state.setCurrentBlock(state.currentBlock.map((block) => ({ ...block, fontSize: Number(size) })))
                                    elements?.forEach((element) => {
                                        element?.set('fontSize', Number(size))
                                    })
                                    state.canvas?.renderAll()
                                }}
                                items={fontSizeRange} />
                        </div>
                    </Label>

                    <Label
                        className='mt-4'
                        label="Font family" htmlFor="ff">
                        <div id="ff">
                            <Select
                                label="Font family"
                                value={state.blocks[0]?.fontFamily}
                                onValueChange={fontFamily => {
                                    state.setCurrentBlock(state.currentBlock.map((block) => ({ ...block, fontFamily })))
                                    elements?.forEach((element) => {
                                        element?.set('fontFamily', fontFamily)
                                    })
                                    state.canvas?.renderAll()
                                }}
                                prop="value"
                                items={textFontFamily} />
                        </div>
                    </Label>
                </div>
            </div>
        </div>
    )
}
