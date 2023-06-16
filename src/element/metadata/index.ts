import { textBlock, TextCanvasStyle } from "./text";
import { imageBlock, ImageCanvasStyle } from "./image";
import { circleBlock, CircleCanvasStyle } from './circle';
import { rectBlock, RectCanvasStyle } from './rect';
export type BlockInfo = typeof blockInfoList[number];

// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
}

export const blockInfoList = [
  textBlock,
  imageBlock,
  circleBlock,
  rectBlock,
]

export type TextBlock = typeof textBlock;
export type ImageBlock = typeof imageBlock;
export type CircleBlock = typeof circleBlock;
export type RectBlock = typeof rectBlock;