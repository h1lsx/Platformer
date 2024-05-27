function draw() {
      //edit_tick();
      scroll(p1, c1, 10);
      //Player Size
      /*if(keyIsDown(DOWN_ARROW)) {
        if(p1.height == 49) {
          p1.y += 25;
        }
        p1.height = 24;
      } else {
        if(p1.height == 24) {
          p1.y -= 25;
        }
        p1.height = 49;
        if(level.coll(c1, p1).length > 0) {
          p1.height = 24;
          p1.y += 25;
        }
      }*/
      jumpX = sin(Math.PI / 30 * frame) * 6;
      if(frame == 0 || frame == 30) {
        frame = 0;
      } else {
        frame++;
      }
      //Move Player X
      p1.xV += auto ? 1 : (keyIsDown(RIGHT_ARROW) - keyIsDown(LEFT_ARROW));
      p1.x += p1.xV;
      if(level.coll(c1, p1).length > 0) {
        if(mode == "wave") {
          resetp1();
        }
        if(auto) {
          p1.x -= 30;
          if(level.coll(c1, p1).length > 0) {
            resetp1();
          }
          p1.x += 30;
        } else {
          for(let i = 0; i < 10 && level.coll(c1, p1).length > 0; i++) {
            p1.x -= p1.xV / 10;
          }
          p1.xV = 0;
        }
      }
      p1.xV *= speeds[p1speed][0];
      if(mode == "cube" || mode == "ball") {
        p1.rot += gravity * p1.xV * 10 / 17 * 4 / 3 / speeds[p1speed][1];
      } else {
        p1.rot = 0;
      }
      //Move Player Y
      /*if(keyIsDown(DOWN_ARROW)) {
        p1.yV += 0.2;
      }*/
      if(mode == "wave") {
        p1.width = 0.75 * 49;
        p1.height = 0.75 * 0.76291079812 * 49;
      } else {
        p1.width = 49;
        p1.height = 49;
      }
      if(mode == "cube") {
        if(gravity > 0) {
          if(p1.yV < 14.3882403805) {
            p1.yV += gravity * 0.876 * 10 / 17;
            //32 / 60;
          }
        } else {
          if(p1.yV > -14.3882403805) {
            p1.yV += gravity * 0.876 * 10 / 17;
            //32 / 60;
          }
        }
      } else if(mode == "jetpack") {
        if(gravity > 0) {
          p1.rot = 0;
          if(p1.yV < 14.3882403805 / 2) {
            p1.yV += gravity * 0.876 * 5 / 17;
          }
        } else {
          p1.rot = 180;
          if(p1.yV > -14.3882403805 / 2) {
            p1.yV += gravity * 0.876 * 5 / 17;
          }
        }
      } else if(mode == "ball") {
        if(gravity > 0) {
          if(p1.yV < 14.3882403805) {
            p1.yV += gravity * 0.876 * 5 / 17;
          }
        } else {
          if(p1.yV > -14.3882403805) {
            p1.yV += gravity * 0.876 * 5 / 17;
          }
        }
      }
      p1.y += p1.yV;
      if(mode == "wave") {
        if(keyIsDown(UP_ARROW) != (gravity == -1)) {
          p1.rot = p1.xV > 0 ? -45 : -135;
          p1.yV = -Math.abs(p1.xV);
        } else {
          p1.rot = p1.xV > 0 ? 45 : 135;
          p1.yV = Math.abs(p1.xV);
        }
      }
      if(level.dead(c1, p1).length > 0) {
        resetp1();
      }
      if(level.coll(c1, p1).length > 0) {
        if(mode == "wave") {
          resetp1();
        }
        if(true) {
          for(let i = 0; i < 10 && level.coll(c1, p1).length > 0; i++) {
            p1.y -= p1.yV / 10;
          }
        }
        if((p1.yV > 0 && gravity > 0) || (p1.yV < 0 && gravity < 0)) {
          coy = 0;
          if(mode == "cube") {
            p1.rot = Math.round(p1.rot / 90) * 90
          }
        }
        p1.yV = 0;
        if(mode == "ball") {
          if(keyIsDown(UP_ARROW)) {
            gravity *= -1;
            p1.yV += gravity * 1.5;
          }
        }
      }
      if(mode == "cube") {
        if(keyIsDown(UP_ARROW) && coy < 6) {
          frame = 1;
          p1.yV = gravity * -1.94 * 10.3761348898 * 32 / 60;
          coy = 6;
        }
      }
      if(mode == "jetpack") {
        if(keyIsDown(UP_ARROW)) {
          p1.yV -= gravity * 1.94 * 32 / 60 * 2 / 3
        }
        if((p1.yV < -14.3882403805 / 2 && gravity > 0) || (p1.yV > 14.3882403805 / 2 && gravity < 0)) {
          p1.yV = gravity * -14.3882403805 / 2;
        }
      }
      let sp_colls = level.specialcoll(c1, p1);
      if(sp_colls.includes("coin")) {
        level.delete(p1.x + c1.x, p1.y + c1.y, p1.x + c1.x + 50, p1.y + c1.y + 50)
      }
      if(sp_colls.includes("downportal")) {
        gravity = 1;
      } else if(sp_colls.includes("upportal")) {
        gravity = -1;
      }
      if(sp_colls.includes("autoportal")) {
        auto = true;
      } else if(sp_colls.includes("platformerportal")) {
        auto = false;
      } else if(sp_colls.includes("shipportal")) {
        mode = "jetpack";
      } else if(sp_colls.includes("cubeportal")) {
        mode = "cube";
      } else if(sp_colls.includes("ballportal")) {
        mode = "ball";
      } else if(sp_colls.includes("waveportal")) {
        mode = "wave";
      }
      coy++;
      //Render Stuff
      clear();
      level.coincoll(c1, p1);
      if(select == "square") {
        rect(15, 15, tS, tS);
      } else if(select == "spike") {
        triangle(15 + tS / 2, 15, 15, tS + 15, tS + 15, tS + 15);
      } else if(select == "coin") {
        image(coin, 15, 15, tS + 8, tS + 8);
      } else {
        image(portal(select), 15, 15, 75, 137.5)
      }
      level.render(c1, p1);
}