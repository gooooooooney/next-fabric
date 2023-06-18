'use client'
import { fabric } from "@/lib/fabric";
import { Disposable } from "@/lib/lifeclcye";
import { canvasConfig } from "@/src/constants/fabric";
import { Service } from "typedi";


@Service()
export class FabricCanvas extends  Disposable  {

    constructor() {
        // const createCanvas = () => {
        //     if (typeof document === 'undefined') {
        //         return null
        //     }
        //     return document.createElement('canvas')
        // }
        super()
    }
    test() {
        console.log("test")
    }
 
}