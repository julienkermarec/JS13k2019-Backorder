
hand = null;
boxs = [];
in_hand = null;
function createText(type, text, position = null, rotation = null, scale = null) {
  object = document.createElement(type);
  object.setAttribute('text', text);
  object.setAttribute('position', position);
  object.setAttribute('rotation', rotation);
  object.setAttribute('scale', scale);
  return object;
}
function createObject(type, width = 1, height = 1, depth = null, position = null, rotation = null, scale = null, color = null, opacity = null) {
  object = document.createElement(type);
  object.setAttribute('width', width);
  object.setAttribute('height', height);
  object.setAttribute('depth', depth);
  object.setAttribute('position', position);
  object.setAttribute('rotation', rotation);
  object.setAttribute('scale', scale);
  object.setAttribute('color', color);
  object.setAttribute('opacity', opacity != null ? opacity : 1);
  return object;
}

function createAnimation(attribute, to, easing, delay, direction, dur, repeat) {
  animation = document.createElement('a-animation');
  animation.setAttribute('attribute', attribute);
  animation.setAttribute('to', to);
  animation.setAttribute('easing', easing);
  animation.setAttribute('delay', delay);
  animation.setAttribute('direction', direction);
  animation.setAttribute('dur', dur);
  animation.setAttribute('repeat', repeat);
  return animation;
}

function initCartons() {
  AFRAME.registerComponent('cartons', {
    init: function () {
      console.log("initCartons")
      size_x = 20;
      size_y = 40;
      offset = 30;
      centered = size_y / 2;
      for (i = 0; i < size_x; i++) {
        for (j = 0; j < size_y; j++) {
          if (((j % 4) || ((i + j) % 4)))
            continue;
          box = document.createElement('a-box');
          x = (offset / 2 + i - centered + 0.5) - 5;
          y = (offset / 2 + j - centered + 0.5) - 15;
          position = x + " 0 " + y;
          box.setAttribute('color', ((i + j) % 2 ? 'darkgray' : 'gray'));
          box.setAttribute('position', position);
          box.setAttribute('height', '0.1');
          console.log(box);
          this.el.appendChild(box);
        }
      }
    }
  });
}

AFRAME.registerComponent('etageres', {
  init: function () {
    console.log("initEtageres")
    etageres = [['0 0 0', '0 0 0'], ['0 0 0', '0 -180 0'], ['0 0 0', '0 90 0'], ['0 0 2.5', '0 0 0'], ['0 0 -2.5', '0 -180 0'], ['2.5 0 0', '0 90 0']]
    for (let etagere of etageres) {
      //ETAGERE
      e = document.createElement('a-entity');
      e.setAttribute('position', etagere[0]);
      e.setAttribute('rotation', etagere[1]);
      //PIEDS
      ppos = ["-2.6 1.5 -2.4", "-2.6 1.5 -0.1", "-3.9 1.5 -0.1", "-3.9 1.5 -2.4"];
      for (let p of ppos) {
        f = createObject("a-box", 1, 3, 1, p, null, "0.1 1 0.1", "blue");
        e.appendChild(f);
      }
      //PLAQUE
      hpos = ["0.1", "1.3", "02.5"];
      for (let p of hpos) {
        h = createObject("a-box", 1.5, 0.1, 2.5, "-3.25 " + p + " -1.250", null, "1 1 1", "black");
        e.appendChild(h);
      }
      //CARTONS
      hpos = ["0.1", "1.3", "02.5"];
      for (let p of hpos) {
        h = createObject("a-box", 1.5, 0.1, 2.5, "-3.25 " + p + " -1.250", null, "1 1 1", "black");
        for (let bbox of [0, 1]) {
          eb = document.createElement('a-entity');
          m = -0.5;
          if (bbox == 1)
            m = 0.5;
          text = randLetter();
          numb = Math.random().toString().slice(2, 5);
          key = text + numb;
          eb.id = key;
          rh = (2 + Math.floor(Math.random() * 6.5) + 1) * 0.1;
          rw = (2.9 + Math.floor(Math.random() * 6.5) + 1) * 0.1;
          let color = randArray(["#EDD19F", "brown", "orange"])
          eb.setAttribute('data-text', text);
          eb.setAttribute('data-numb', numb);
          eb.setAttribute('data-height', rh);
          eb.setAttribute('data-width', 0.8);
          eb.setAttribute('data-depth', rw);
          eb.setAttribute('data-color', color);
          boxs.push(key);
          eb.setAttribute('position', '0 ' + ((rh / 2) + 0.05) + ' ' + m);
          eb.addEventListener('click', function (evt) {
            if (in_hand != null) {
              if (this.id == in_hand) {
                this.childNodes[0].setAttribute('opacity', '1')
                this.childNodes[0].childNodes[0].setAttribute('visible', 'true')
                hb.setAttribute("visible", "false");
                in_hand = null;
              }
              else {
                playError();
              }
            }
            else {
              in_hand = this.id;
              console.log("this", this);
              this.childNodes[0].setAttribute('opacity', '0.3')
              this.childNodes[0].childNodes[0].setAttribute('visible', 'false')
              // this.setAttribute('material', 'color', 'blue');
              hl = document.getElementById('hl');
              hr = document.getElementById('hr');
              hb = document.getElementById('hb');
              hbc = document.getElementById('hbc');
              hbt1 = document.getElementById('hbt1');
              hbt2 = document.getElementById('hbt2');
              hb.setAttribute("visible", "true");
              hbc.setAttribute("depth", 0.790);
              //depth = largeur
              //width = depth
              //height = height
              console.log("this.getAttribute('data-depth')", this.getAttribute('data-depth'));
              hrl = '-20 0 0';
              hrr = '-20 0 0';
              if (this.getAttribute('data-depth') < 0.5) {
                hrl = '-20 -15 0';
                hrr = '-20 15 0';
              }
              else if (this.getAttribute('data-depth') < 0.7) {
                hrl = '-20 -8 0';
                hrr = '-20 8 0';
              }
              else if (this.getAttribute('data-depth') > 0.95) {
                hrl = '-20 3 0';
                hrr = '-20 -3 0';
              }
              hl.setAttribute('rotation', hrl);
              hr.setAttribute('rotation', hrr);
              hbc.setAttribute("height", this.getAttribute('data-depth')); // LARGEUR
              hbc.setAttribute("width", this.getAttribute('data-width')); // DEPTH
              hbc.setAttribute("depth", this.getAttribute('data-height')); // HAUTEUR
              hbc.setAttribute("color", this.getAttribute('data-color'));
              hbt1.setAttribute("text", "anchor:align;width:3.3;color:white;value:" + this.getAttribute('data-text') + ";align:center;shader:sdf");
              hbt2.setAttribute("text", "anchor:align;width:3.3;color:white;value:" + this.getAttribute('data-numb') + ";align:center;shader:sdf");
              console.log('I was clicked at: ', evt.detail.intersection.point);


            }
          });
          b = createObject("a-box", 0.8, rh, rw, "0 0 0", "0 0 0", null, color);
          b2 = createObject("a-box", 0.03, 0.3, 0.4, "0.4 0 0", "0 0 0", null, "black");
          t2 = createText("a-text", "anchor:align;width:3.3;color:white;value:" + text + ";align:center;shader:sdf", "0.02 0.06 0", "0 90 0", "1 1 1");
          t3 = createText("a-text", "anchor:align;width:3.3;color:white;value:" + numb + ";align:center;shader:sdf", "0.02 -0.06 0", "0 90 0", "1 1 1");
          b.appendChild(b2);
          b2.appendChild(t2);
          b2.appendChild(t3);
          eb.appendChild(b);
          h.appendChild(eb);
        }
        e.appendChild(h);
      }


      this.el.appendChild(e);
    }

    function playError() {

    }
    //   <a-box position="-3 1 -3" material="color:#EDD19F" geometry="width:0.7" rotation="">
    // <a-text text="anchor:align;width:5;color:#393939;value:RGB;align:center;shader:sdf" rotation="0 0 0" position="0 0 0">C32</a-text>
    // </a-box>
    //           <a-entity id="etagere" etagere="0" position="0 0 0" rotation="0 -90 0">
    //   <a-box material="color:blue" geometry="primitive:box;depth:1;height:3" position="-2.6 1.5 -2.4" scale="0.1 1 0.1"></a-box>
    //   <a-box material="color:blue" geometry="primitive:box;depth:1;height:3" position="-2.6 1.5 -0.1" scale="0.1 1 0.1"></a-box>
    //   <a-box material="color:blue" geometry="primitive:box;depth:1;height:3" position="-3.9 1.5 -0.1" scale="0.1 1 0.1"></a-box>
    //   <a-box material="color:blue" geometry="primitive:box;depth:1;height:3" position="-3.9 1.5 -2.4" scale="0.1 1 0.1"></a-box>
    //   <a-box material="color:black" geometry="primitive:box;depth:25;height:0.1;width:1.5" position="-3.25 0.1 -1.250" scale="1 1 0.1"></a-box>
    //   <a-box material="color:black" geometry="primitive:box;depth:25;height:0.1;width:1.5" position="-3.25 1.30 -1.250" scale="1 1 0.1"></a-box>
    //   <a-box material="color:black" geometry="primitive:box;depth:25;height:0.1;width:1.5" position="-3.25 2.50 -1.250" scale="1 1 0.1"></a-box>
    // </a-entity>
    // for(i = 1; i < 5; i++){
    //   for(j = 1; j < 5; j++){
    //     offset =20;
    // centered = 4/2;
    //     box = document.createElement('a-box');
    //     x = i * 4 - offset/2;
    //     y = j * 4 - offset/2 ;
    //     position= x + " 1 " + y;
    //     box.setAttribute('color','blue');
    //     box.setAttribute('position',position);
    //     box.setAttribute('height','2');
    //     box.setAttribute('depth','4');
    //     console.log(box);
    //     this.el.appendChild(box);
    //   }
    // }
  }
});

function randArray(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}
function randLetter() {
  return Math.random().toString(36).replace(/[0-9]/g, '').slice(1, 4).toUpperCase()
}
function initEtagere() {
  AFRAME.registerComponent('etagere', {
    init: function () {
      console.log("iniEtagere")
      for (i = 1; i < 5; i++) {
        for (j = 1; j < 5; j++) {
          offset = 20;
          centered = 4 / 2;
          box = document.createElement('a-box');
          x = i * 4 - offset / 2;
          y = j * 4 - offset / 2;
          position = x + " 1 " + y;
          box.setAttribute('color', 'blue');
          box.setAttribute('position', position);
          box.setAttribute('height', '2');
          box.setAttribute('depth', '4');
          console.log(box);
          this.el.appendChild(box);
        }
      }
    }
  });
}



AFRAME.registerComponent('dock-listener', {
  init: function () {
    this.el.addEventListener('click', function (evt) {
      console.log("dock-lsitener this", this.id);
      console.log('I was clicked at: ', evt.detail.intersection.point);
      country = this.id;
      if (in_hand != null) {
        box_id = in_hand;
        box_e = document.getElementById(box_id);
        hb = document.getElementById('hb');
        hbct = document.getElementById('hb_' + country);
        posy = 1.255 + (box_e.getAttribute('data-height') / 2)
        hbct.setAttribute('position', '0 ' + posy + ' -0.5');
        hbct.setAttribute('visible', 'true');
        hbct.setAttribute('animation', 'property: position; to: 0 ' + posy + ' -1.5; dur: 2000');
        setTimeout(() => {
          hbct.setAttribute('visible', 'false');
        }, 2000)

        // animation = createAnimation('position','0 ' + posy + ' -0.5','ease',0,'normal',2000,0);

        // hbct.appendChild(animation);
        // box_e.childNodes[0].setAttribute('opacity','1')
        box_e.childNodes[0].setAttribute('visible', 'false')
        hb.setAttribute("visible", "false");

        hbc = document.getElementById('hbc_' + country);
        hbt1 = document.getElementById('hbt1_' + country);
        hbt2 = document.getElementById('hbt2_' + country);
        hbc.setAttribute("height", box_e.getAttribute('data-depth')); // LARGEUR
        hbc.setAttribute("width", box_e.getAttribute('data-width')); // DEPTH
        hbc.setAttribute("depth", box_e.getAttribute('data-height')); // HAUTEUR
        hbc.setAttribute("color", box_e.getAttribute('data-color'));
        hbt1.setAttribute("text", "anchor:align;width:3.3;color:white;value:" + box_e.getAttribute('data-text') + ";align:center;shader:sdf");
        hbt2.setAttribute("text", "anchor:align;width:3.3;color:white;value:" + box_e.getAttribute('data-numb') + ";align:center;shader:sdf");

        in_hand = null;
      }
    });
  }
});
AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var COLORS = ['red', 'green', 'blue', 'purple', 'pink', 'gray', 'brown'];
    this.el.addEventListener('click', function (evt) {
      var randomIndex = Math.floor(Math.random() * COLORS.length);
      this.setAttribute('material', 'color', COLORS[randomIndex]);
      console.log('I was clicked at: ', evt.detail.intersection.point);
    });
  }
});

AFRAME.registerComponent('logo1', {
  init: function () {
    var x = 0, y = 0;
    let points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(3, 0));
    points.push(new THREE.Vector2(5, 2));
    points.push(new THREE.Vector2(5, 5));
    points.push(new THREE.Vector2(5, 5));

    points.push(new THREE.Vector2(2, 7));


    for (var i = 0; i < points.length; i++) {
      points[i].multiplyScalar(0.25);
    }
    var heartShape = new THREE.Shape(points);



    var geometry = new THREE.ShapeGeometry(heartShape);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var mesh = new THREE.Mesh(geometry, material);
    this.el.object3D.add(mesh);
  }
});
//# sourceURL=userscript.js


// setTimeout(() => {
console.log("start init");
AFRAME.registerComponent('instructions-listener', {
  init: function () {
    this.el.addEventListener('click', (evt) => {
      document.getElementById('menu_home').setAttribute('visible', 'false');
      document.getElementById('menu_instructions').setAttribute('visible', 'true');
    });
  }
});
AFRAME.registerComponent('back-listener', {
  init: function () {
    this.el.addEventListener('click', (evt) => {
      document.getElementById('menu_home').setAttribute('visible', 'true');
      document.getElementById('menu_instructions').setAttribute('visible', 'false');
    });
  }
});
AFRAME.registerComponent('play-listener', {
  init: function () {
    timer = null;
    this.el.addEventListener('click', (evt) => {
      if (timer != null)
        return;
      timer = 5;
      document.getElementById('camera').childNodes[1].setAttribute('wasd-controls-enabled', 'true');
      document.getElementById('menu').setAttribute('visible', 'false');
      document.getElementById('view_countdown_text').setAttribute('text', 'anchor:align;width:7;color:black;value:' + timer + ';align:center;shader:sdf');
      document.getElementById('view_countdown').setAttribute('visible', 'true');
      timer--;
      interval_timer = setInterval(() => {
        if (timer == 0) {
          console.log("clear interval");
          clearInterval(interval_timer);
          document.getElementById('view_countdown').setAttribute('visible', 'false');
          timer = null;
        }
        console.log("timer", timer);
        document.getElementById('view_countdown_text').setAttribute('text', 'anchor:align;width:7;color:black;value:' + timer + ';align:center;shader:sdf');
        timer--;
      }, 1000);
    });
  }
});
  // TODO-LIST
  // -- START SCREEN -
  // -- ORDER INTERFACE 
  // -- INSTRUCTIONS - 
  // -- COUNTDOWN
  // -- GENERATE ORDER
  // -- TIMER
  // -- SOUNDS
  // -- SCORE RECORD