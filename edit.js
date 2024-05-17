let tS = 50;
function mousePressed() {
  tS = 50;
  if(keyIsDown(83)) {
    
  } else {
    level.add(
      Math.floor((mouseX + c1.x) / tS) * tS,
      Math.floor((mouseY + c1.y) / tS) * tS,
      Math.floor((mouseX + c1.x) / tS) * tS + tS,
      Math.floor((mouseY + c1.y) / tS) * tS + tS
    )
  }
  sessionStorage.setItem("level", JSON.stringify(level.lvl));
}
function edit_tick() {
  if(keyIsDown(69)) {
    //alert(JSON.stringify(level.lvl));
  }
  if(keyIsDown(49)) {
   mode = "cube"; //alert(JSON.stringify(level.lvl));
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
  if(keyIsDown(76)) {
    //level.lvl = JSON.parse(prompt("Level: "));
  }
  if(keyIsDown(82)) {
    location.reload();
  }
}