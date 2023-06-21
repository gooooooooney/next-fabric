"use client"
import { ComponentType } from '@/src/constants/enum'
import { useCanvasContext } from '@/src/use/useCanvasStore'
import React, { useMemo } from 'react'
import TextAttribute from './TexAttribute/TextAttribute'

export function Attr() {

    const state = useCanvasContext()

    const currentBlockIsNotEmpty = useMemo(() => {
        return state.currentBlock?.length > 0
    }, [state.currentBlock])

    const renderTextAttr = () => {
        if (currentBlockIsNotEmpty) {
            const isTextElement = state.currentBlock.every(block => block.type === ComponentType.TextBox)
            if (isTextElement) {
                return <TextAttribute />
            }
        }
        return null
    }
    return (
        <div className="min-h-[35rem] overflow-auto ">
            {renderTextAttr()}
        </div>
    )
}
