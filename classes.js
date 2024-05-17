class Player {
  constructor(x, y, xV, yV, width, height, rot) {
    this.x = x;
    this.y = y;
    this.xV = xV;
    this.yV = yV;
    this.width = width;
    this.height = height;
    this.rot = rot;
  }
  render() {
    const transX = this.x + this.width / 2
    const transY = this.y + this.height / 2
    translate(transX, transY);
    rotate(this.rot * Math.PI / 180);
    translate(-transX, -transY);
    if(mode == "jetpack") {
      image(
        pimage(Math.round(this.xV * 2)),
            this.x - 1 + jumpX + 6,
            this.y - 1 - jumpX + 2,
            this.width + 1 - jumpX + warp / 12 - 12,
            this.height + 1 + jumpX - 12)
      image(
          gravity > 0 ? (this.xV > 0 ? pImgJetpackr : pImgJetpackl) : (this.xV > 0 ? pImgJetpackl : pImgJetpackr),
          this.x - 1 + jumpX - 4,
          this.y - 1 - jumpX - 4,
          this.width + 1 - jumpX + warp / 12 + 8,
          this.height + 1 + jumpX + 8)
    } else if(mode == "ball") {
      image(
        pImgBall,
            this.x - 1,
            this.y - 1,
            this.width + 1 + warp / 12,
            this.height + 1);
    } else if(mode == "wave") {
      image(
        pImgWave,
            this.x - 1,
            this.y - 1,
            this.width + 1 + warp / 12,
            this.height + 1);
    } else {
      image(
        pimage(Math.round(this.xV * 2)),
            this.x - 1 + jumpX,
            this.y - 1 - jumpX,
            this.width + 1 - jumpX + warp / 12,
            this.height + 1 + jumpX);
    }
    translate(transX, transY);
    rotate(-this.rot * Math.PI / 180)
    translate(-transX, -transY);
  }
    
  sides(cam) {
    return {
      x1: this.x + cam.x,
      y1: this.y + cam.y,
      x2: this.x + this.width + cam.x,
      y2: this.y + this.height + cam.y
    }
  }
}
class Camera {
  constructor(camX, camY) {
    this.x = camX;
    this.y = camY;
  }
}
class Level {
  constructor(lvl) {
    this.lvl = lvl;
  }
  add(x1, y1, x2, y2) {
    let x = [x1, x2];
    let y = [y1, y2];
    x.sort((a, b) => a - b);
    y.sort((a, b) => a - b);
    this.lvl.push({x1: x[0], y1: y[0], x2: x[1], y2: y[1]});
  }
  render(cam, player) {
    player.render();
    this.lvl.forEach(a => {
      rect(a.x1 - cam.x, a.y1 - cam.y, a.x2 - a.x1, a.y2 - a.y1)
    })
  }
  coll(cam, player) {
    return this.lvl.filter(a => ClipRect(player.sides(cam), a));
  }
}