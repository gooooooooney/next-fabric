'use client'
import Label from '@/components/label'
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
    const textSizes = [
        { label: 'S', value: 12, size: 'text-[12px]' },
        { label: 'M', value: 16, size: 'text-[16px]' },
        { label: 'L', value: 20, size: 'text-[20px]' },
        { label: 'XL', value: 24, size: 'text-[24px]' },
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

                                                htmlFor={size.value.toString()} className={cn("p-2", size.size)}>{size.label}
                                            </SLabel>
                                        </div>
                                    })
                                }
                            </RadioGroup>

                        </div>
                        {/* <NumberSelte
                            range={fontSizeRange}
                            value={blocks[0]?.fontSize?.toString()}
                            onValueChange$={size => {
                                blocks.forEach((block) => {
                                    block.fontSize = Number(size)
                                })
                                elements?.forEach((element) => {
                                    element?.set('fontSize', Number(size))
                                })
                                state.canvas?.renderAll()
                            }} /> */}
                    </Label>

                    {/* <Label className="mt-4" label="Font family">
                        <FontFamilySelect
                            value={blocks[0]?.fontFamily}
                            onValueChange$={fontFamily => {
                                blocks.forEach((block) => {
                                    block.fontFamily = fontFamily
                                })
                                elements?.forEach((element) => {
                                    element?.set('fontFamily', fontFamily)
                                })
                                state.canvas?.renderAll()
                            }}
                        />
                    </Label> */}
                </div>
            </div>
        </div>
    )
}
