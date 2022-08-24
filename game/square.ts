export class Square {
  private color = 'red';
   x = 1;
   y = 100;




  constructor(private ctx: CanvasRenderingContext2D) {}

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x,this.y,10,10);
    //this.ctx.fillRect(this.x, this.y, 20, 20);

  }
}
