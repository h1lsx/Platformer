let tS = 50;
function mousePressed() {
  tS = 50;
  let tile = (a, b) => Math.floor((a + b) / tS) * tS;
  if(keyIsDown(83)) {
    level.addspike(
      tile(mouseX, c1.x),
      tile(mouseY, c1.y),
      tile(mouseX, c1.x) + tS,
      tile(mouseY, c1.y) + tS
    )
  } else if(keyIsDown(68)) {
    level.delete(
      tile(mouseX, c1.x),
      tile(mouseY, c1.y),
      tile(mouseX, c1.x) + tS,
      tile(mouseY, c1.y) + tS
    )
  } else if(keyIsDown(66)) {
    level.addspecial(
      tile(mouseX, c1.x),
      tile(mouseY, c1.y),
      "autoportal"
    )
  } else {
    level.add(
      tile(mouseX, c1.x),
      tile(mouseY, c1.y),
      tile(mouseX, c1.x) + tS,
      tile(mouseY, c1.y) + tS
    )
  }
  sessionStorage.setItem("level", JSON.stringify(level.lvl));
  sessionStorage.setItem("spike", JSON.stringify(level.spike));
  sessionStorage.setItem("spikeHb", JSON.stringify(level.spikeHb));
  sessionStorage.setItem("special", JSON.stringify(level.special));
}
function edit_tick() {
  if(keyIsDown(69)) {
    document.getElementById("copybutton").style.display = "block";
  }
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
  if(keyIsDown(76)) {
    const data = JSON.parse(prompt("Level: "));
    level.lvl = data.lvl;
    level.spike = data.spike;
    level.spikeHb = data.spikeHb;
    level.special = data.special;
  }
  if(keyIsDown(82)) {
    location.reload();
  }
}