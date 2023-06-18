'use client'
import { CodeMain } from '@/src/core/main';
import { PropsWithChildren, useEffect } from 'react';
import 'reflect-metadata';
export const MainApp = ({ children }: PropsWithChildren) => {
    useEffect(() => {
        new CodeMain().main()
    })
    return <>
        {children}
    </>
}