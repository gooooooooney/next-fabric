"use client"
import { ComponentType } from '@/src/constants/enum'
import { useCanvasContext } from '@/src/use/useCanvasStore'
import React, { useMemo } from 'react'
import { ShadowAttr } from './shadowAttribute/shadow-attribute'
import { StrokeWidth } from './shrokeWidth/stroke-width'
import TextAttribute from './textAttribute/TextAttribute'

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
    const renderShadowAttr = () => {
        if (state.activeElements.length > 0) return <ShadowAttr />
        return null
    }

    const renderStrokeAttr = () => {
        if (state.activeElements.length > 0) return <StrokeWidth />
        return null
    }
    return (
        <div className="h-[40rem] overflow-auto ">
            {renderTextAttr()}
            {renderShadowAttr()}
            {renderStrokeAttr()}
        </div>
    )
}
