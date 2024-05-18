let build = "square";
let select = 1;
const scrX = innerWidth;
const scrY = innerHeight;
let mode = "cube";
let pImgIdle;
let pImgJetpackr;
let pImgJetpackl;
let pImgBall;
let pImgWave;
let cubeportal;
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
  cubeportal = loadImage("gdicons/cubeportal.png");
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
function portal(v) {
  if(v == 1) {
    return cubeportal;
  }
}
function setup() {
  createCanvas(scrX, scrY);
  fill(0, 0, 0);
  noStroke();
}
let level;
//if(sessionStorage.getItem("level") == null) {
  level = new Level([], []);
  const data = {"lvl":[{"x1":0,"y1":500,"x2":500,"y2":700},{"x1":0,"y1":400,"x2":50,"y2":450},{"x1":0,"y1":300,"x2":50,"y2":350},{"x1":0,"y1":200,"x2":50,"y2":250},{"x1":0,"y1":100,"x2":50,"y2":150},{"x1":0,"y1":50,"x2":50,"y2":100},{"x1":-50,"y1":0,"x2":0,"y2":50},{"x1":-50,"y1":50,"x2":0,"y2":100},{"x1":-50,"y1":-50,"x2":0,"y2":0}],"spike":[{"x1":75,"y1":50,"x2":50,"y2":100,"x3":100,"y3":100},{"x1":125,"y1":50,"x2":100,"y2":100,"x3":150,"y3":100},{"x1":175,"y1":50,"x2":150,"y2":100,"x3":200,"y3":100},{"x1":225,"y1":50,"x2":200,"y2":100,"x3":250,"y3":100},{"x1":275,"y1":50,"x2":250,"y2":100,"x3":300,"y3":100},{"x1":325,"y1":50,"x2":300,"y2":100,"x3":350,"y3":100},{"x1":375,"y1":50,"x2":350,"y2":100,"x3":400,"y3":100},{"x1":425,"y1":50,"x2":400,"y2":100,"x3":450,"y3":100},{"x1":475,"y1":50,"x2":450,"y2":100,"x3":500,"y3":100},{"x1":525,"y1":50,"x2":500,"y2":100,"x3":550,"y3":100},{"x1":575,"y1":50,"x2":550,"y2":100,"x3":600,"y3":100},{"x1":625,"y1":50,"x2":600,"y2":100,"x3":650,"y3":100},{"x1":625,"y1":-50,"x2":600,"y2":0,"x3":650,"y3":0},{"x1":575,"y1":-50,"x2":550,"y2":0,"x3":600,"y3":0},{"x1":525,"y1":-50,"x2":500,"y2":0,"x3":550,"y3":0},{"x1":475,"y1":-50,"x2":450,"y2":0,"x3":500,"y3":0},{"x1":425,"y1":-50,"x2":400,"y2":0,"x3":450,"y3":0},{"x1":375,"y1":-50,"x2":350,"y2":0,"x3":400,"y3":0},{"x1":325,"y1":-50,"x2":300,"y2":0,"x3":350,"y3":0},{"x1":275,"y1":-50,"x2":250,"y2":0,"x3":300,"y3":0},{"x1":225,"y1":-50,"x2":200,"y2":0,"x3":250,"y3":0},{"x1":175,"y1":-50,"x2":150,"y2":0,"x3":200,"y3":0},{"x1":125,"y1":-50,"x2":100,"y2":0,"x3":150,"y3":0},{"x1":75,"y1":-50,"x2":50,"y2":0,"x3":100,"y3":0},{"x1":25,"y1":-50,"x2":0,"y2":0,"x3":50,"y3":0},{"x1":75,"y1":450,"x2":50,"y2":500,"x3":100,"y3":500}],"spikeHb":[{"x1":57.333333333333336,"x2":92.66666666666667,"y1":63.333333333333336,"y2":86.66666666666667},{"x1":107.33333333333333,"x2":142.66666666666666,"y1":63.333333333333336,"y2":86.66666666666667},{"x1":157.33333333333334,"x2":192.66666666666666,"y1":63.333333333333336,"y2":86.66666666666667},{"x1":207.33333333333334,"x2":242.66666666666666,"y1":63.333333333333336,"y2":86.66666666666667},{"x1":257.3333333333333,"x2":292.6666666666667,"y1":63.333333333333336,"y2":86.66666666666667},{"x1":307.3333333333333,"x2":342.6666666666667,"y1":63.333333333333336,"y2":86.66666666666667},{"x1":357.3333333333333,"x2":392.6666666666667,"y1":63.333333333333336,"y2":86.66666666666667},{"x1":407.3333333333333,"x2":442.6666666666667,"y1":63.333333333333336,"y2":86.66666666666667},{"x1":457.3333333333333,"x2":492.6666666666667,"y1":63.333333333333336,"y2":86.66666666666667},{"x1":507.3333333333333,"x2":542.6666666666666,"y1":63.333333333333336,"y2":86.66666666666667},{"x1":557.3333333333334,"x2":592.6666666666666,"y1":63.333333333333336,"y2":86.66666666666667},{"x1":607.3333333333334,"x2":642.6666666666666,"y1":63.333333333333336,"y2":86.66666666666667},{"x1":607.3333333333334,"x2":642.6666666666666,"y1":-36.666666666666664,"y2":-13.333333333333334},{"x1":557.3333333333334,"x2":592.6666666666666,"y1":-36.666666666666664,"y2":-13.333333333333334},{"x1":507.3333333333333,"x2":542.6666666666666,"y1":-36.666666666666664,"y2":-13.333333333333334},{"x1":457.3333333333333,"x2":492.6666666666667,"y1":-36.666666666666664,"y2":-13.333333333333334},{"x1":407.3333333333333,"x2":442.6666666666667,"y1":-36.666666666666664,"y2":-13.333333333333334},{"x1":357.3333333333333,"x2":392.6666666666667,"y1":-36.666666666666664,"y2":-13.333333333333334},{"x1":307.3333333333333,"x2":342.6666666666667,"y1":-36.666666666666664,"y2":-13.333333333333334},{"x1":257.3333333333333,"x2":292.6666666666667,"y1":-36.666666666666664,"y2":-13.333333333333334},{"x1":207.33333333333334,"x2":242.66666666666666,"y1":-36.666666666666664,"y2":-13.333333333333334},{"x1":157.33333333333334,"x2":192.66666666666666,"y1":-36.666666666666664,"y2":-13.333333333333334},{"x1":107.33333333333333,"x2":142.66666666666666,"y1":-36.666666666666664,"y2":-13.333333333333334},{"x1":57.333333333333336,"x2":92.66666666666667,"y1":-36.666666666666664,"y2":-13.333333333333334},{"x1":7.333333333333333,"x2":42.666666666666664,"y1":-36.666666666666664,"y2":-13.333333333333334},{"x1":57.333333333333336,"x2":92.66666666666667,"y1":463.3333333333333,"y2":486.6666666666667}]};
  level.lvl = data.lvl;
  level.spike = data.spike;
  level.spikeHb = data.spikeHb;
  //level.add(0, 500, 500, 700);
/*} else {
  level = new Level(
    JSON.parse(
      sessionStorage.getItem("level")
    ),
    JSON.parse(
      sessionStorage.getItem("spike")
    )
  )
}*/
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