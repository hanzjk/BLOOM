 // select canvas element
 const c = document.createElement("canvas");
 const ctx = c.getContext("2d");

 //canvas parameters 
 c.width = 720;
 c.height = 480;

 document.body.appendChild(c);

 //theme music component 
 const WIN = new Audio();
 WIN.src = "Blazer Rail.wav";

 //to loop the track 
 WIN.loop = true;
 WIN.play();

 //generate the noise wave
 var perm = [];
 while (perm.length < 255) {
     while (perm.includes(val = Math.floor(Math.random() * 255)));
     perm.push(val);
 }

 //change its propertise 
 var lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;
 var noise = x => {
     x = x * 0.01 % 254;
     return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
 }

 //function to draw, control biker 
 var Player = new function() {
     this.x = c.width / 2;
     this.y = 0;
     this.ySpeed = 0;
     this.rot = 0;
     this.rSpeed = 0;

     //biker image component 
     this.img = new Image();
     this.img.src = "biker.png";

     this.draw = function() {
         var p1 = c.height - noise(t + this.x) * 0.25;
         var p2 = c.height - noise(t + 5 + this.x) * 0.25;

         //adjust the biker on the path vertically 
         var grounded = 0;
         if (p1 - 12 > this.y) {
             this.ySpeed += 0.1;
         } else {
             this.ySpeed -= this.y - (p1 - 12);
             this.y = p1 - 12;
             grounded = 1;
         }

         //oscillation 
         var angle = Math.atan2((p2 - 12) - this.y, (this.x + 5) - this.x);
         this.y += this.ySpeed;

         //control the vertical and rotational speed
         if (!playing || grounded && Math.abs(this.rot) > Math.PI * 0.5) {
             playing = false;
             this.rSpeed = 5;
             k.ArrowUp = 1;
             this.x -= speed * 5;
         }

         if (grounded && playing) {
             this.rot -= (this.rot - angle) * 0.65;
             this.rSpeed = this.rSpeed - (angle - this.rot);
         }

         this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05;
         this.rot -= this.rSpeed * 0.1;

         if (this.rot > Math.PI) this.rot = -Math.PI;
         if (this.rot < -Math.PI) this.rot = Math.PI;

         ctx.save();
         ctx.translate(this.x, this.y - 3);
         ctx.rotate(this.rot);
         ctx.drawImage(this.img, -15, -15, 40, 40);
         ctx.restore();
     }
 }

 //stats 
 var t = 0;
 var speed = 0;
 var playing = true;
 var k = { ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0 };

 ////game loop 
 function loop() {
     speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.01;
     t += 10 * speed;
     //blue background
     ctx.fillStyle = "#19f";
     ctx.fillRect(0, 0, c.width, c.height);

     //bumps or path (draw bumps using a noise wave)
     ctx.fillStyle = "#444";
     ctx.beginPath();
     ctx.moveTo(0, c.height);
     for (let i = 0; i < c.width; i++)
         ctx.lineTo(i, c.height - noise(t + i) * 0.25);
     ctx.lineTo(c.width, c.height);
     ctx.fill();

     Player.draw();
     if (Player.x < 0) {
         ctx.fillStyle = "black";
         ctx.font = "30px Piedra cursive";
         ctx.fillText("GAME OVER", c.width / 2, c.height / 2);
         restart();

     }
     requestAnimationFrame(loop);
 }

 onkeydown = d => k[d.key] = 1;
 onkeyup = d => k[d.key] = 0;

 //restart game function
 function restart() {
     c.style.display = "none";
     gameover.style.display = "block";
     Player = new Player();
     t = 0;
     speed = 0;
     playing = true;
     k = { ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0 };


 }

 loop();

 //select sound element
 const soundElement = document.getElementById("sound");

 soundElement.addEventListener("click", audioManager);

 function audioManager() {
     // CHANGE IMAGE SOUND_ON/OFF
     let imgSrc = soundElement.getAttribute("src");
     let SOUND_IMG = imgSrc == "SOUND_ON.png" ? "SOUND_OFF.png" : "SOUND_ON.png";

     soundElement.setAttribute("src", SOUND_IMG);

     //mute and unmute sounds
     WIN.muted = WIN.muted ? false : true;
 }