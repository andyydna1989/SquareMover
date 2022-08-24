import { Component, ViewChild, ElementRef, HostListener, OnInit,} from '@angular/core';
import { HttpClient } from '@angular/common/http';



import { Square } from './square';

@Component({
   selector: 'game-component',
   // notice the variable name myCanvas
   template: `
   <div #d>
      <canvas #canvas width=600 height=600></canvas>

  </div>
    `,
    styles: ['canvas { border-style: solid; margin: 50px; display: inline }', 'div {width: 100%; text-align: center;}']

  })

  export class gameComponent implements OnInit{
    @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;
    requestId;
    counter = 0;
    interval;
    square;
    framecounter = 0;
    otherSquare;
    playerNumber = 0;
    output = 0;
    data = 0;




    constructor(private http: HttpClient) {}

    ngOnInit() {
      console.log(this.data);
      this.ctx = this.canvas.nativeElement.getContext('2d');
     this.ctx.fillStyle = 'red';
     this.square = new Square(this.ctx);
     this.otherSquare = new Square(this.ctx);
     this.otherSquare.color= 'blue';

     //server request
     this.http.get<{output: number}> (
      "http://localhost:3000/output"
    )
    .subscribe(outputData => {
      this.output = outputData.output;
      console.log("my player instance is: " + this.output);
      this.playerNumber = this.output;
    })

     setInterval(() => {
      this.iterate();
    }, 100);

    // basic controls for moving the square
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;

      if (keyName === 'ArrowRight') {

       console.log("right");
       this.square.x +=3;
      }
      else if (keyName === 'ArrowLeft') {

       console.log("left");
       this.square.x -=3;
      }
      if (keyName === 'ArrowUp') {

       console.log("up")
       this.square.y -=3;
      }
      if (keyName === 'ArrowDown') {

       console.log("down")
       this.square.y +=3;
      }
    })


    }

    // updates the screen
iterate(){
this.framecounter++;
this.ctx.clearRect(0,0,600,600);
this.square.draw();
this.otherSquare.draw();

// conducts the pull process for retrieving the other square's location
if (this.playerNumber === 1){

this.http.get<{P2X: number, P2Y: number}> (
  "http://localhost:3000/P2X"
)
.subscribe(outputData => {
  let output = outputData.P2X;
  let output2 = outputData.P2Y;
  console.log("P2X is returned as: " + output);
  this.otherSquare.x = output;
  this.otherSquare.y = output2;
})
}
else {
  this.http.get<{P1X: number, P1Y: number}> (
    "http://localhost:3000/P1X"
  )
  .subscribe(outputData => {
    let output = outputData.P1X;
    let output2 = outputData.P1Y;
    console.log("P1X is returned as: " + output);
    this.otherSquare.x = output;
    this.otherSquare.y = output2;
  })
  }



// sends the player's own data.

      console.log(this.square.x);

      let data = {
        packetX: this.square.x,
        packetY: this.square.y,
        player: this.playerNumber
      }

      console.log("we are sending: " + data);


      this.http.post<{message: string}>("http://localhost:3000/receive", data,)
      .subscribe(responseData => {console.log(responseData.message)})


  }
}



