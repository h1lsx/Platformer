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
  constructor(lvl, spike, spikeHb, special) {
    this.lvl = lvl;
    this.spike = spike;
    this.spikeHb = spikeHb;
    this.special = special;
  }
  add(x1, y1, x2, y2) {
    let x = [x1, x2];
    let y = [y1, y2];
    x.sort((a, b) => a - b);
    y.sort((a, b) => a - b);
    this.lvl.push({x1: x[0], y1: y[0], x2: x[1], y2: y[1]});
  }
  addspike(x1, y1, x2, y2) {
    let x = [x1, x2];
    let y = [y1, y2];
    x.sort((a, b) => a - b);
    y.sort((a, b) => a - b);
    this.spike.push({x1: (x1 + x2) / 2, y1: y[0], x2: x[0], y2: y[1], x3: x[1], y3: y[1]});
    this.spikeHb.push({x1: x[0] + 18.833, x2: x[1] - 18.833, y1: y[0] + 13.458, y2: y[1] - 13.458})
  }
  addspecial(x, y, type) {
    this.special.push({x1: x, y1: y, x2: x + specials[type][0], y2: y + specials[type][1], type: type});
  }
  delete(x1, y1, x2, y2) {
    let x = [x1, x2];
    let y = [y1, y2];
    x.sort((a, b) => a - b);
    y.sort((a, b) => a - b);
    let sB = {x1: x[0] + 1, y1: y[0] + 1, x2: x[1] - 1, y2: y[1] - 1};
    this.lvl = this.lvl.filter(a => !ClipRect(sB, a))
    const spikedelete = this.spikeHb.map(a => !ClipRect(sB, a));
    this.spike = this.spike.filter((a, i) => spikedelete[i]);
    this.spikeHb = this.spikeHb.filter((a, i) => spikedelete[i]);
    this.special = this.special.filter(a => !ClipRect(sB, a));
  }
  render(cam, player) {
    player.render();
    this.lvl.forEach(a => {
      rect(a.x1 - cam.x, a.y1 - cam.y, a.x2 - a.x1, a.y2 - a.y1)
    })
    this.special.forEach(a => {
      image(cubeportal, a.x1 - cam.x, a.y1 - cam.y, a.x2 - a.x1, a.y2 - a.y1)
    })
    this.spike.forEach(a => {
      triangle(a.x1 - cam.x, a.y1 - cam.y, a.x2 - cam.x, a.y2 - cam.y, a.x3 - cam.x, a.y3 - cam.y)
    })
    /*stroke(255, 0, 0);
    strokeWeight(4);
    this.spikeHb.forEach(a => {
      rect(a.x1 - cam.x, a.y1 - cam.y, a.x2 - a.x1, a.y2 - a.y1)
    })
    strokeWeight(0);*/
  }
  coll(cam, player) {
    return this.lvl.filter(a => ClipRect(player.sides(cam), a));
  }
  dead(cam, player) {
    return this.spikeHb.filter(a => ClipRect(player.sides(cam), a));
  }
  specialcoll(cam, player) {
    return this.special.filter(a => ClipRect(player.sides(cam), a)).map(a => a.type);
  }
}