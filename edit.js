let tS = 50;
function mouseReleased() {
  edit = true;
}
function mousePressed() {
  if(edit == true) {
    edit = false;
    let tile = (a, b) => Math.floor((a + b) / tS) * tS;
    if(keyIsDown(68)) {
      level.delete(
        tile(mouseX, c1.x),
        tile(mouseY, c1.y),
        tile(mouseX, c1.x) + tS,
        tile(mouseY, c1.y) + tS
      )
    } else if (select == "spike") {
      level.addspike(
        tile(mouseX, c1.x),
        tile(mouseY, c1.y),
        tile(mouseX, c1.x) + tS,
        tile(mouseY, c1.y) + tS,
        keyIsDown(85)
      )
    } else if(select == "coin") {
      level.addcoin(
        tile(mouseX, c1.x),
        tile(mouseY, c1.y)
      )
    } else if(select != "square") {
      level.addspecial(
        tile(mouseX, c1.x),
        tile(mouseY, c1.y),
        select
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
    sessionStorage.setItem("coin", JSON.stringify(level.coin));
  }
}
function keyPressed() {
  edit_tick();
}
function edit_tick() {
  if(keyIsDown(69)) {
    document.getElementById("copybutton").style.display = "block";
    edit = false;
  }
  if(keyIsDown(49)) {
    select = select != "square" ? "cubeportal" : "square";
    //mode = "cube";
  }
  if(keyIsDown(50)) {
    select = select != "square" ? "shipportal" : "spike";
    //mode = "jetpack";
  }
  if(keyIsDown(51)) {
    select = select != "square" ? "ballportal" : "coin";
    //mode = "ball";
  }
  if(keyIsDown(52)) {
    select = select != "square" ? "waveportal" : "square";
    //mode = "wave";
  }
  if(keyIsDown(53)) {
    select = select != "square" ? "autoportal" : "square";
    //mode = "wave";
  }
  if(keyIsDown(54)) {
    select = select != "square" ? "platformerportal" : "square";
    //mode = "wave";
  }
  if(keyIsDown(55)) {
    select = select != "square" ? "downportal" : "square";
    //mode = "wave";
  }
  if(keyIsDown(56)) {
    select = select != "square" ? "upportal" : "square";
    //mode = "wave";
  }
  if(keyIsDown(76)) {
    const data = JSON.parse(prompt("Level: "));
    level.lvl = data.lvl;
    level.spike = data.spike;
    level.spikeHb = data.spikeHb;
    level.special = data.special;
    level.coin = data.coin;
  }
  if(keyIsDown(82)) {
    resetp1();
    if(keyIsDown(81)) {
      if(prompt("Do you want to reset the level? y/n") == "y") {
          sessionStorage.setItem("level", "reset");
        location.reload();
      }
    }
  }
  if(keyIsDown(66)) {
    if(select == "square") {
      select = "cubeportal";
    } else {
      select = "square";
    }
  }
  if(keyIsDown(80)) {
    window.location.href = "https://h1lsx.github.io/Chat/";
  }
}