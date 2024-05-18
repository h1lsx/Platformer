let tS = 50;
function mousePressed() {
  tS = 50;
  if(keyIsDown(83)) {
    level.addspike(
      Math.floor((mouseX + c1.x) / tS) * tS,
      Math.floor((mouseY + c1.y) / tS) * tS,
      Math.floor((mouseX + c1.x) / tS) * tS + tS,
      Math.floor((mouseY + c1.y) / tS) * tS + tS
    )
  } else {
    level.add(
      Math.floor((mouseX + c1.x) / tS) * tS,
      Math.floor((mouseY + c1.y) / tS) * tS,
      Math.floor((mouseX + c1.x) / tS) * tS + tS,
      Math.floor((mouseY + c1.y) / tS) * tS + tS
    )
  }
  /*sessionStorage.setItem("level", JSON.stringify(level.lvl));
  sessionStorage.setItem("spike", JSON.stringify(level.spike));*/
}
function edit_tick() {
  /*if(keyIsDown(69)) {
    window.location.href = JSON.stringify(level);
  }*/
  if(keyIsDown(49)) {
   mode = "cube";
  }
  if(keyIsDown(50)) {
    mode = "jetpack";
  }
  if(keyIsDown(51)) {
    mode = "ball";
  }
  if(keyIsDown(52)) {
    mode = "wave";
  }
  /*if(keyIsDown(76)) {
    const data = JSON.parse(prompt("Level: "));
    level.lvl = data.lvl;
    level.spike = data.spike;
    level.spikeHb = data.spikeHb;
  }*/
  if(keyIsDown(82)) {
    location.reload();
  }
}