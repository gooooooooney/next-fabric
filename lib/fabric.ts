import * as fabric from 'fabric'

export { fabric }

type GradientOption = ConstructorParameters<typeof fabric.Gradient>[0]

export const elementBorder = {
  // 实心 or 空心
  transparentCorners: false,
  // 边框颜色
  borderColor: '#9c6ade',
  // 
  cornerColor: '#FFF',
  // 圆角
  cornerSize: 10,
  // 辅助边粗细
  borderScaleFactor: 1,
  padding: 2,
  cornerStyle: 'circle',
  cornerStrokeColor: '#9c6ade',
  borderOpacityWhenMoving: .3,
} as const

export function setGradient(element: fabric.Object | undefined, {
  type = 'linear',
  coords,
  gradientUnits = 'pixels',
  colorStops = [
    { offset: 0, color: 'red', opacity: 1 },
    { offset: 1, color: 'blue', opacity: 1 }
  ],
}: GradientOption) {
  if (element) {
    const gradientEle = new fabric.Gradient({
      type,
      coords: coords || { x1: 0, y1: 0, x2: element.width, y2: 0 },
      gradientUnits,
      colorStops
    })
    element.set('fill', gradientEle)

  }

}
