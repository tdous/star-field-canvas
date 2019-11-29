// type ExplosionOpts = {
//   ctx: any;
//   x: number;
//   y: number;
// };

// export class Burst
//  {
//   ctx: any;
//   x: number = 0;
//   y: number = 0;

//   constructor(opts: ExplosionOpts) {
//     const { ctx, x, y } = opts;

//     this.ctx = ctx;
//     this.x = x;
//     this.y = y;

//     console.log('EX CREATED AT', x, y);

//     this.ctx.fillStyle = '#F00';
//   }

//   draw() {
//     if (this.ctx) {
//       this.ctx.beginPath();
//       this.ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
//       this.ctx.fill();
//     }
//   }

//   update() {
//     // this.z -= this.v;
//     // if (this.z <= 100) {
//     //   this.ctx.fillStyle = 'F00;';
//     //   this.ctx.beginPath();
//     //   this.ctx.arc(this.x, this.y, 100, 0, Math.PI * 2);
//     //   this.ctx.fill();
//     //   this.reset();
//     // }
//   }
// }
