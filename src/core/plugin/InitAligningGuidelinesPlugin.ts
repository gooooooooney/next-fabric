import { fabric } from "@/lib/fabric";
import { CanvasPlugin } from "./Plugin";



type TLocation = NonNullable<ReturnType<InitAligningGuidelinesPlugin['getLocation']>>[]
interface VerticalLine {
  from: fabric.Point;
  to: fabric.Point;
}

interface HorizontalLine {
  from: fabric.Point;
  to: fabric.Point;
}



const aligningLineWidth = 1;
const aligningLineColor = 'rgb(80,210,194)';
const aligningLineDash = [5];




export class InitAligningGuidelinesPlugin extends CanvasPlugin {
  static override plugin_name = 'AligningGuidelines'
  private aligningLineWidth = 1;
  private aligningLineColor = 'rgb(80,210,194)';
  private aligningLineDash = [5];
  private lines: fabric.Line[] = []
  private threshold = 4
  private verticalLines: VerticalLine[] = [];
  private horizontalLines: HorizontalLine[] = [];
  private viewportTransform: number[] | undefined;

  init_plugin() {

    this.handleMouse()

    this.handleObjectMoving()

    this.handleRender()




  }
  constructor(canvas: fabric.Canvas) {
    super(canvas)
  }

  private handleRender() {
    this.canvas.on('after:render', () => {
      for (let i = this.verticalLines.length; i--;) {
        this.drawVerticalLine(this.verticalLines[i]);
      }
      for (let i = this.horizontalLines.length; i--;) {
        this.drawHorizontalLine(this.horizontalLines[i]);
      }

      // noinspection NestedAssignmentJS
      this.verticalLines.length = 0;
      this.horizontalLines.length = 0;
    });

    this.canvas.on('before:render', () => {
      try {
        this.canvas.clearContext(this.canvas.contextTop);
      } catch (error) {
        console.log(error);
      }
    });
  }

  private handleObjectMoving() {
    this.canvas.on('object:moving', (e) => {
      const movingTarget = e.target;
      if (this.viewportTransform === undefined || movingTarget === undefined) return;


      const objects = this.canvas.getObjects();
      const { movingLocation, locations } = this.getLocations(objects, movingTarget)
      this.removeLines()
      locations.forEach(location => {

        this.handleVertical(movingLocation, location, movingTarget)
        this.handleHorizon(movingLocation, location, movingTarget)

      })

    })
  }
  private handleMouse() {
    this.canvas.on('mouse:down', () => {
      this.viewportTransform = this.canvas.viewportTransform;
    });
    this.canvas.on('mouse:up', () => {
      this.verticalLines = [] as any;
      this.horizontalLines = [] as any;
      this.canvas.renderAll();
    })
  }
  private getCoords(obj: fabric.BaseFabricObject) {
    const [tl, tr, br, bl] = obj.getCoords(true)
    return { tl, tr, br, bl }
  }

  private getLocation(object: fabric.BaseFabricObject) {
    if (this.viewportTransform == null) return null;
    const objectBoundingRect = object.getBoundingRect();
    const objectHeight = objectBoundingRect.height / this.viewportTransform[3];
    const objectWidth = objectBoundingRect.width / this.viewportTransform[0];
    const center = object.getCenterPoint()
    // 
    // --------------------------------------> x
    // |  (x,y)tl            (x2, y2)tr
    // |  .-----------------------.
    // |  |                       |
    // |  |           .-----------|--> center
    // |  |                       |
    // |  .-----------------------.
    // |  (x3, y3)bl       (x4, y4)br
    // |
    // |
    // v
    // y
    return {
      ...this.getCoords(object),
      width: objectWidth,
      height: objectHeight,
      center
    }

  }
  private getPoint(x: number, y: number) {
    return new fabric.Point(x, y)
  }

  private drawLine({ x: x1, y: y1 }: fabric.Point, { x: x2, y: y2 }: fabric.Point) {
    const ctx = this.canvas.getSelectionContext();
    if (this.viewportTransform == null) return;
    // https://stackoverflow.com/questions/62906060/fabric-js-snapping-guidelines-not-correctly-positioned-when-zoomed
    const originXY = fabric.util.transformPoint(new fabric.Point(x1, y1), this.canvas.viewportTransform),
      dimensions = fabric.util.transformPoint(new fabric.Point(x2, y2), this.canvas.viewportTransform);
    ctx.save()
    ctx.lineWidth = aligningLineWidth
    ctx.strokeStyle = aligningLineColor
    ctx.setLineDash(aligningLineDash);
    ctx.beginPath()

    ctx.moveTo(
      ((originXY.x)),
      ((originXY.y))
    )


    ctx.lineTo(
      ((dimensions.x)),
      ((dimensions.y))
    )
    ctx.stroke()
    ctx.restore()
  }

  private drawVerticalLine(coords: VerticalLine) {
    this.drawLine(
      coords.from,
      coords.to
    );
  }
  private drawHorizontalLine(coords: HorizontalLine) {
    this.drawLine(
      coords.from,
      coords.to
    );
  }

  private getLocations(objects: fabric.BaseFabricObject[], target: fabric.Object) {
    const movingLocation = this.getLocation(target)!;
    const locations = objects.map(object => target !== object && this.getLocation(object) || null).filter(Boolean) as TLocation;
    return {
      movingLocation,
      locations
    }
  }

  private isInRange(a: number, b: number) {
    return Math.abs(Math.round(a) - Math.round(b)) <= this.threshold
  }

  private handleVertical(movingLocation: TLocation[number], location: TLocation[number], movingTarget: fabric.Object) {

    {
      // ----------------------> x
      // | in this case, movingLocation is lower than location
      // |       |
      // |       | 
      // |   ----------
      // |   |   |----|---> center
      // |   ----- ---- 
      // |       | 
      // |       |
      // |       | 
      // |   ----------- 
      // |   |   |-----|--> center
      // |   -----------
      // |       |
      // |       |
      // |       |
      // v
      // y
      if (this.isInRange(location.center.x, movingLocation.center.x)) {
        const fromPoint = this.getPoint(location.center.x, Math.min(location.center.y, movingLocation.center.y))
        const toPoint = this.getPoint(location.center.x, Math.max(location.center.y, movingLocation.center.y))
        this.verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        movingTarget.setXY(
          new fabric.Point(location.center.x, movingLocation.center.y),
          'center',
          'center')
      }
      // ----------------------> x
      // | in this case, movingLocation is lower than location
      // |   |
      // |   | tl
      // |   .---------
      // |   |   .----|---> center
      // |   .---- ---- 
      // |   | bl
      // |   |
      // |   | tl
      // |   .---------- 
      // |   |    .----|--> center
      // |   .----------
      // |   | bl
      // |   |
      // |   
      // v
      // y
      if (this.isInRange(location.tl.x, movingLocation.center.x - movingLocation.width / 2)) {
        const fromPoint = this.getPoint(location.tl.x, Math.min(location.tl.y, movingLocation.tl.y))
        const toPoint = this.getPoint(location.tl.x, Math.max(location.bl.y, movingLocation.bl.y))
        this.verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        // location.center.x - location.width / 2 = movingLocation.center.x - movingLocation.width / 2
        // so movingLocation.center.x = location.center.x - location.width / 2 + movingLocation.width / 2
        const x = location.center.x - location.width / 2 + movingLocation.width / 2
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }

      // ------------> x
      // | in this case, movingLocation is lower than location
      // |        |
      // |  tl    | tr
      // |   .----.       
      // |   | .--|--> center
      // |   -----. br
      // |        |
      // |        |
      // |  tl    |  tr
      // |   .----.
      // |   | .--|--> center 
      // |   -----. br
      // |        | 
      // |        |
      // |   
      // v
      // y
      if (this.isInRange(location.tr.x, movingLocation.center.x + movingLocation.width / 2)) {
        const fromPoint = this.getPoint(location.tr.x, Math.min(location.tr.y, movingLocation.tr.y))
        const toPoint = this.getPoint(location.tr.x, Math.max(location.br.y, movingLocation.br.y))
        this.verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        //  location.center.x + location.width / 2 = movingLocation.center.x + movingLocation.width / 2
        // so movingLocation.center.x = location.center.x + location.width / 2 - movingLocation.width / 2
        const x = location.center.x + location.width / 2 - movingLocation.width / 2
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }

      // ------------> x
      // | in this case, movingLocation is lower than location
      // |        |
      // |      tl|   tr
      // |        .----.
      // |        | .--|--> center
      // |        -----. br
      // |        |
      // |        |
      // |  tl    |  tr
      // |   .----.
      // |   | .--|--> center 
      // |   -----. br
      // |        | 
      // |        |
      // |   
      // v
      // y
      if (this.isInRange(location.tl.x, movingLocation.center.x + movingLocation.width / 2)) {
        const fromPoint = this.getPoint(location.tl.x, Math.min(location.tl.y, movingLocation.tr.y))
        const toPoint = this.getPoint(location.tl.x, Math.max(location.br.y, movingLocation.br.y))
        this.verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        // location.center.x - location.width / 2 = movingLocation.center.x + movingLocation.width / 2
        // so movingLocation.center.x = location.center.x - location.width / 2 - movingLocation.width / 2
        const x = location.center.x - location.width / 2 - movingLocation.width / 2
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }


      // ------------> x
      // | in this case, location is lower than movingLocation
      // |        |
      // |      tl|   tr
      // |        .----.
      // |        | .--|--> center
      // |      bl.-----. br
      // |        |
      // |        |
      // |  tl    |  tr
      // |   .----.
      // |   | .--|--> center 
      // |   -----. br
      // |        | 
      // |        |
      // |   
      // v
      // y
      if (this.isInRange(location.tr.x, movingLocation.center.x - movingLocation.width / 2)) {
        const fromPoint = this.getPoint(location.tr.x, Math.min(location.tr.y, movingLocation.tl.y))
        const toPoint = this.getPoint(location.tr.x, Math.max(location.br.y, movingLocation.bl.y))
        this.verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        // location.center.x + location.width / 2 = movingLocation.center.x - movingLocation.width / 2
        // so movingLocation.center.x = location.center.x + location.width / 2 + movingLocation.width / 2
        const x = location.center.x + location.width / 2 + movingLocation.width / 2
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }

      // ------------> x
      // | in this case, movingLocation is lower than location
      // |     |
      // |   tl|   tr
      // |     .----.
      // |     | .--|--> center
      // |   bl.-----. br
      // |     |
      // |     |
      // |  tl |  tr
      // |   .----.
      // |   | |--|--> center 
      // |   -----. br
      // |     | 
      // |     |
      // |   
      // v
      // y
      if (this.isInRange(location.tl.x, movingLocation.center.x)) {
        const fromPoint = this.getPoint(location.tl.x, Math.min(location.tl.y, movingLocation.center.y))
        const toPoint = this.getPoint(location.tl.x, Math.max(location.tl.y, movingLocation.center.y))
        this.verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        // location.tl.x = movingLocation.center.x
        // so movingLocation.center.x = location.tl.x
        const x = location.tl.x
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }
      // ------------> x
      // | in this case, location is lower than movingLocation
      // |     |
      // |   tl|   tr
      // |     .----.
      // |     | .--|--> center
      // |   bl.-----. br
      // |     |
      // |     |
      // |  tl |  tr
      // |   .----.
      // |   | |--|--> center 
      // |   -----. br
      // |     | 
      // |     |
      // |   
      // v
      // y
      if (this.isInRange(location.center.x, movingLocation.center.x - movingLocation.width / 2)) {
        const fromPoint = this.getPoint(location.center.x, Math.min(location.center.y, movingLocation.center.y))
        const toPoint = this.getPoint(location.center.x, Math.max(location.center.y, movingLocation.center.y))
        this.verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        // location.tl.x = movingLocation.center.x
        // so movingLocation.center.x = location.tl.x
        const x = location.center.x
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }
      // ------------> x
      // | in this case, location is lower than movingLocation
      // |     |
      // |   tl|   tr
      // |     .----.
      // |     | .--|--> center
      // |   bl.-----. br
      // |     |
      // |     |
      // |  tl |  tr
      // |   .----.
      // |   | |--|--> center 
      // |   -----. br
      // |     | 
      // |     |
      // |   
      // v
      // y
      if (this.isInRange(location.center.x, movingLocation.center.x - movingLocation.width / 2)) {
        const fromPoint = this.getPoint(location.center.x, Math.min(location.center.y, movingLocation.center.y))
        const toPoint = this.getPoint(location.center.x, Math.max(location.center.y, movingLocation.center.y))
        this.verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        // location.center.x = movingLocation.center.x - movingLocation.width / 2
        // so movingLocation.center.x = location.center.x + movingLocation.width / 2
        const x = location.center.x + movingLocation.width / 2
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }

      // ------------> x
      // | in this case, location is lower than movingLocation
      // |      |
      // |      |tr
      // | -----.
      // | | .--|--> center
      // | -----. br
      // |      |
      // |      |
      // |      |  
      // |    ------
      // |    | |--|--> center 
      // |    ------
      // |      | 
      // |      |
      // |   
      // v
      // y
      if (this.isInRange(location.center.x, movingLocation.center.x + movingLocation.width / 2)) {
        const fromPoint = this.getPoint(location.center.x, Math.min(location.center.y, movingLocation.center.y))
        const toPoint = this.getPoint(location.center.x, Math.max(location.center.y, movingLocation.center.y))
        this.verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        // location.center.x = movingLocation.center.x + movingLocation.width / 2
        // so movingLocation.center.x = location.center.x - movingLocation.width / 2
        const x = location.center.x - movingLocation.width / 2
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }
    }
  }

  private handleHorizon(movingLocation: TLocation[number], location: TLocation[number], movingTarget: fabric.Object) {
    // ----------------------> x
    // | in this case, movingLocation is on the left of location
    // |      .-------   -------
    // |      |      |   |     |
    // |      |   .  |   |  .  |
    // |      |   |  |   |  |  |
    // |   ---.---|--.---.--|--.--------
    // |      bl  |  br bl  |  br   
    // |          V         V
    // |         center     center
    // v
    // y
    if (this.isInRange(location.bl.y, movingLocation.center.y + movingLocation.height / 2)) {
      const fromPoint = this.getPoint(Math.min(location.bl.x, location.bl.x, movingLocation.bl.x, movingLocation.bl.x), location.bl.y)
      const toPoint = this.getPoint(Math.max(location.bl.x, location.bl.x, movingLocation.bl.x, movingLocation.bl.x), location.bl.y)
      this.verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      // location.bl.y = movingLocation.center.y + movingLocation.height / 2
      const y = location.bl.y - movingLocation.height / 2
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, y),
        'center',
        'center')
    }
    // ----------------------> x
    // | in this case, movingLocation is on the left of location
    // | -----.------.---.-----.-----
    // |    tl|    tr|   |tl   | tr
    // |      |   .  |   |  .  |
    // |      |   |  |   |  |  |
    // |      ----|---   ---|---
    // |          |         |     
    // |          V         V
    // |         center     center
    // v
    // y
    if (this.isInRange(location.tl.y, movingLocation.center.y - movingLocation.height / 2)) {
      const fromPoint = this.getPoint(Math.min(location.tl.x, location.tr.x, movingLocation.tl.x, movingLocation.tr.x), location.tl.y)
      const toPoint = this.getPoint(Math.max(location.tl.x, location.tr.x, movingLocation.tl.x, movingLocation.tr.x), location.tl.y)
      this.verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      // location.tl.y = movingLocation.center.y - movingLocation.height / 2
      const y = location.tl.y + movingLocation.height / 2
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, y),
        'center',
        'center')
    }
    // ----------------------> x
    // | in this case, movingLocation is on the left of location
    // |      .-------   -------
    // |      |      |   |     |
    // | -----|---|--|------|---------
    // |      |   |  |   |  |  |
    // |      ----|---   ---|---
    // |          |          |     
    // |          V          V
    // |         center     center
    // v
    // y
    if (this.isInRange(location.center.y, movingLocation.center.y)) {
      const fromPoint = this.getPoint(Math.min(location.center.x, movingLocation.center.x), location.center.y)
      const toPoint = this.getPoint(Math.max(location.center.x, movingLocation.center.x), location.center.y)
      this.verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, location.center.y),
        'center',
        'center')
    }
    // ----------------------> x
    // | in this case, movingLocation is on the left of location
    // |      .-------   
    // |      |      |   
    // |      |   |  |
    // |      |   |  |  br   
    // |   bl .---|--.------.-------.---------  
    // |          |      tl |       | tr
    // |          |         |   .   |
    // |          |         |   |   |    
    // |          |         ----|---|  
    // |          V             |  
    // |         center         V
    // |                      center 
    // v
    // y
    if (this.isInRange(location.tl.y, movingLocation.center.y + movingLocation.height / 2)) {
      const fromPoint = this.getPoint(Math.min(location.tr.x, location.tl.x, movingLocation.br.x, movingLocation.bl.x), location.tl.y)
      const toPoint = this.getPoint(Math.max(location.tr.x, location.tl.x, movingLocation.br.x, movingLocation.bl.x), location.tl.y)
      this.verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      // location.tl.y = movingLocation.center.y + movingLocation.height / 2
      // so movingLocation.center.y = location.tl.y - movingLocation.height / 2
      const y = location.center.y - location.height / 2 - movingLocation.height / 2
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, y),
        'center',
        'center')
    }
    // ----------------------> x
    // | in this case, location is on the left of movingLocation
    // |      .-------   
    // |      |      |   
    // |      |   |  |
    // |      |   |  |  br   
    // |   bl .---|--.------.-------.---------  
    // |          |      tl |       | tr
    // |          |         |   .   |
    // |          |         |   |   |    
    // |          |         ----|---|  
    // |          V             |  
    // |         center         V
    // |                      center 
    // v
    // y
    if (this.isInRange(location.bl.y, movingLocation.center.y - movingLocation.height / 2)) {
      const fromPoint = this.getPoint(Math.min(movingLocation.tr.x, movingLocation.tl.x, location.br.x, location.bl.x), location.bl.y)
      const toPoint = this.getPoint(Math.max(movingLocation.tr.x, movingLocation.tl.x, location.br.x, location.bl.x), location.bl.y)
      this.verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      // location.br.y = movingLocation.center.y - movingLocation.height / 2
      // so movingLocation.center.y = location.br.y + movingLocation.height / 2
      const y = location.br.y + movingLocation.height / 2
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, y),
        'center',
        'center')
    }
    // ----------------------> x
    // | in this case, movingLocation is on the left of location
    // |      .-------   
    // |      |      |   
    // |      |   |  |      ---------
    // |      |   |  |  br  |       | 
    // |   bl .---|--.------|---.---|---------  
    // |          |         |   |   | 
    // |          |         |   |   |
    // |          |         .---|----
    // |          |         bl  |
    // |          V             |  
    // |         center         V
    // |                      center 
    // v
    // y
    if (this.isInRange(movingLocation.center.y + movingLocation.height / 2, location.center.y)) {
      const fromPoint = this.getPoint(Math.min(movingLocation.bl.x + movingLocation.width / 2, location.center.x), location.center.y)
      const toPoint = this.getPoint(Math.max(movingLocation.bl.x + movingLocation.width / 2, location.center.x), location.center.y)
      this.verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      // location.center.y = movingLocation.center.y + movingLocation.height / 2
      const y = location.center.y - movingLocation.height / 2
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, y),
        'center',
        'center')
    }
    // ----------------------> x
    // | in this case, location is on the left of movingLocation
    // |      .-------   
    // |      |      |   
    // |      |   |  |      ---------
    // |      |   |  |  br  |       | 
    // |   bl .---|--.------|---.---|---------  
    // |          |         |   |   | 
    // |          |         |   |   |
    // |          |         .---|----
    // |          |         bl  |
    // |          V             |  
    // |         center         V
    // |                      center 
    // v
    // y
    if (this.isInRange(location.bl.y, movingLocation.center.y)) {
      const fromPoint = this.getPoint(Math.min(location.bl.x + location.width / 2, movingLocation.center.x), location.bl.y)
      const toPoint = this.getPoint(Math.max(location.bl.x + location.width / 2, movingLocation.center.x), location.bl.y)
      this.verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, location.bl.y),
        'center',
        'center')
    }
    // -------------------------------------> x
    // | in this case, location is on the left of movingLocation
    // |      --------   
    // |      |      |      tl      tr
    // |----------.---------.-------.------------
    // |      |   |  |      |       | 
    // |   bl .---|--.br    |   .   |
    // |          |         |   |   | 
    // |          |         |   |   |
    // |          |         .---|----
    // |          |         bl  |
    // |          V             |  
    // |         center         V
    // |                      center 
    // v
    // y
    if (this.isInRange(location.center.y, movingLocation.center.y - movingLocation.height / 2)) {
      const fromPoint = this.getPoint(Math.min(location.center.x, movingLocation.tl.x + movingLocation.width / 2), location.center.y)
      const toPoint = this.getPoint(Math.max(location.center.x, movingLocation.tl.x + movingLocation.width / 2), location.center.y)
      this.verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      // location.center.y = movingLocation.center.y - movingLocation.height / 2
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, location.center.y + movingLocation.height / 2),
        'center',
        'center')
    }
    // -------------------------------------> x
    // | in this case, location is on the left of movingLocation
    // |      --------   
    // |      |      |      tl      tr
    // |----------.---------.-------.------------
    // |      |   |  |      |       | 
    // |   bl .---|--.br    |   .   |
    // |          |         |   |   | 
    // |          |         |   |   |
    // |          |         .---|----
    // |          |         bl  |
    // |          V             |  
    // |         center         V
    // |                      center 
    // v
    // y
    if (this.isInRange(location.center.y, movingLocation.center.y + movingLocation.height / 2)) {
      const fromPoint = this.getPoint(Math.min(location.center.x, movingLocation.tl.x + movingLocation.width / 2), location.center.y)
      const toPoint = this.getPoint(Math.max(location.center.x, movingLocation.tl.x + movingLocation.width / 2), location.center.y)
      this.verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      // location.center.y = movingLocation.center.y - movingLocation.height / 2
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, location.center.y - movingLocation.height / 2),
        'center',
        'center')
    }
  }
  private removeLines() {
    if (this.lines.length === 0) return
    this.lines.forEach(line => {
      this.canvas.remove(line)
    })
    this.canvas.requestRenderAll()
  }


}
