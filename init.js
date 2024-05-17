const scrX = innerWidth;
const scrY = innerHeight;
let mode = "cube";
let pImgIdle;
let pImgJetpackr;
let pImgJetpackl;
let pImgBall;
let pImgWave;
let gravity = 1;
/*let pImgl1;
let pImgl2;
let pImgl3;
let pImgl4;
let pImgl5;
let pImgl6;
let pImgl7;
let pImgl8;
let pImgr1;
let pImgr2;
let pImgr3;
let pImgr4;
let pImgr5;
let pImgr6;
let pImgr7;
let pImgr8;*/
let jumpX = 0;
function preload() {
  pImgIdle = loadImage("gdicons/icon.png");
  pImgJetpackr = loadImage("gdicons/jetpackr.png");
  pImgJetpackl = loadImage("gdicons/jetpackl.png");
  pImgBall = loadImage("gdicons/ball.png");
  pImgWave = loadImage("gdicons/wave.png");
/*pImgl1 = loadImage("gdicons/left1.png");
  pImgl2 = loadImage("gdicons/left2.png");
  pImgl3 = loadImage("gdicons/left3.png");
  pImgl4 = loadImage("gdicons/left4.png");
  pImgl5 = loadImage("gdicons/left5.png");
  pImgl6 = loadImage("gdicons/left6.png");
  pImgl7 = loadImage("gdicons/left7.png");
  pImgl8 = loadImage("gdicons/left7.png");
  pImgr1 = loadImage("gdicons/right1.png");
  pImgr2 = loadImage("gdicons/right2.png");
  pImgr3 = loadImage("gdicons/right3.png");
  pImgr4 = loadImage("gdicons/right4.png");
  pImgr5 = loadImage("gdicons/right5.png");
  pImgr6 = loadImage("gdicons/right6.png");
  pImgr7 = loadImage("gdicons/right7.png");
  pImgr8 = loadImage("gdicons/right7.png");*/
}
let frame = 0;
const totalframes = 3;
let warp = 0;
function pimage(v) {
  //if(v == 0) {
    warp = 0;
    return pImgIdle;
  /*} else if(v > 0) {
    warp = 
      v == 1 ? 21 :
      v == 2 ? 50 :
      v == 3 ? 60 :
      v == 4 ? 80 :
      v == 5 ? 106 :
      v == 6 ? 142 : 165;
    return eval("pImgr" + v);
  } else {
    warp = 
      -v == 1 ? 21 :
      -v == 2 ? 50 :
      -v == 3 ? 60 :
      -v == 4 ? 80 :
      -v == 5 ? 106 :
      -v == 6 ? 142 : 165;
    return eval("pImgl" + -v);
  }*/
}
console.log("hi")
function setup() {
  createCanvas(scrX, scrY);
  fill(0, 0, 0);
  noStroke();
}
let level;
if(sessionStorage.getItem("level") == null) {
  level = new Level([]);
  level.add(0, 500, 500, 700);
} else {
  level = new Level(
    JSON.parse(
      sessionStorage.getItem("level")
    ))
}
let p1 = new Player(0, 0, 0, 0, 49, 49, 0);
let c1 = new Camera(0, 0);
let coy = 6;
const offX = (scrX - p1.width) / 2;
const offY = (scrY - p1.height) / 2;

const modcam = (cam, val) => {
  cam.x += val[0];
  cam.y += val[1];
}

const scroll = (p1, cam, cng) => {
  modcam(cam, [-offX / (cng - 1), -offY / (cng - 1)]);
  modcam(p1, [offX / (cng - 1), offY / (cng - 1)]);
  modcam(cam, [p1.x / cng, p1.y / cng]);
  modcam(p1, [-p1.x / cng, -p1.y / cng]);
}

function ClipRect(r1, r2) {
    return !(r1.x1 > r2.x2 || r1.x2 < r2.x1 || r1.y1 > r2.y2 || r1.y2 < r2.y1);
}