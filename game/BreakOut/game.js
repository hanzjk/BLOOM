  // select canvas element
  const cvs = document.getElementById("BreakOut");
  const ctx = cvs.getContext("2d");

  ctx.lineWidth = 3;

  //game variables and constants 
  const paddle_width = 100;
  const paddle_margin_bottom = 50;
  const paddle_height = 20;
  const ball_radius = 8;
  let LIFE = 3;
  let SCORE = 0;
  const score_unit = 10;
  let LEVEL = 1;
  const max_level = 3;
  let leftArrow = false;
  let rightArrow = false;
  let game_over = false;

  const THEME = new Audio();
  THEME.src = "Loop.wav";
  THEME.loop = true;
  THEME.play();
  let touch = false;
  //create the paddle
  const paddle = {
      x: cvs.width / 2 - paddle_width / 2,
      y: cvs.height - paddle_margin_bottom - paddle_height,
      width: paddle_width,
      height: paddle_height,
      dx: 5
  }

  //draw paddle
  function drawPaddle() {
      ctx.fillStyle = "#2e3548";
      ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

      ctx.strokeStyle = "#ffcd05";
      ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
  }



  //control the paddle
  document.addEventListener("keydown", function(event) {
      if (event.keyCode == 37) {
          leftArrow = true;
          document.getElementById("left").onclick = leftArrow;
      } else if (event.keyCode == 39) {
          rightArrow = true;
          document.getElementById("right").onclick = rightArrow;
      }
  });

  document.addEventListener("keyup", function(event) {
      if (event.keyCode == 37) {
          leftArrow = false;
          document.getElementById("left").onclick = leftArrow;
      } else if (event.keyCode == 39) {
          rightArrow = false;
          document.getElementById("right").onclick = rightArrow;
      }
  });

  document.addEventListener("touchmove", function(event) {
      dx = event.touches[0].screenX;
      touch = true;
  });

  //move paddle
  function movePaddle() {
      if (rightArrow && paddle.x + paddle.width < cvs.width) {
          paddle.x += paddle.dx;
      } else if (leftArrow && paddle.x > 0) {
          paddle.x -= paddle.dx;
      }
      if (touch && paddle.dx > 0 && paddle.x + paddle.width < cvs.width) {
          paddle.x += paddle.dx;
      } else if (touch && paddle.dx < 0 && paddle.x > 0) {
          paddle.x -= paddle.dx;
      }

  }

  //create the ball
  const ball = {
      x: cvs.width / 2,
      y: paddle.y - ball_radius,
      radius: ball_radius,
      speed: 4,
      dx: 3 * (Math.random() * 2 - 1),
      dy: -3
  }

  //draw the ball
  function drawBall() {
      ctx.beginPath();

      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffcd05";
      ctx.fill();

      ctx.strokeStyle = "#2e3548";
      ctx.stroke();

      ctx.closePath();
  }

  //move the ball
  function moveBall() {
      ball.x += ball.dx;
      ball.y += ball.dy;
  }

  //ball and wall collision detection
  function ballWallCollision() {
      if (ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0) {
          ball.dx = -ball.dx;
          WALL_HIT.play();
      }
      if (ball.y - ball.radius < 0) {
          ball.dy = -ball.dy;
          WALL_HIT.play();
      }
      if (ball.y + ball.radius > cvs.height) {
          LIFE--;
          LIFE_LOST.play();
          resetBall();
      }
  }

  //reset ball
  function resetBall() {
      ball.x = cvs.width / 2;
      ball.y = paddle.y - ball_radius;
      ball.dx = 3 * (Math.random() * 2 - 1);
      ball.dy = -3
  }

  //ball and paddle collision 
  function ballPaddleCollision() {
      if (ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y) {

          //play sound
          PADDLE_HIT.play();
          //check where the ball hit the paddle
          let collidePoint = ball.x - (paddle.x + paddle.width / 2);

          //normalize the values
          collidePoint = collidePoint / (paddle.width / 2);

          //calculate the angle of the ball
          let angle = collidePoint * Math.PI / 3;

          ball.dx = ball.speed * Math.sin(angle);
          ball.dy = -ball.speed * Math.cos(angle);
      }
  }

  //create the bricks
  const brick = {
      row: 3,
      column: 5,
      width: 55,
      height: 20,
      offSetLeft: 20,
      offSetTop: 20,
      marginTop: 40,
      fillColor: "#2e3548",
      strokeColor: "#FFF"
  }

  let bricks = [];

  function createBricks() {
      for (let r = 0; r < brick.row; r++) {
          bricks[r] = [];
          for (let c = 0; c < brick.column; c++) {
              bricks[r][c] = {
                  x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                  y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                  status: true
              }
          }
      }
  }
  createBricks();

  // draw the bricks
  function drawBricks() {
      for (let r = 0; r < brick.row; r++) {
          for (let c = 0; c < brick.column; c++) {
              let b = bricks[r][c];
              // if the brick isn't broken
              if (b.status) {
                  ctx.fillStyle = brick.fillColor;
                  ctx.fillRect(b.x, b.y, brick.width, brick.height);

                  ctx.strokeStyle = brick.strokeColor;
                  ctx.strokeRect(b.x, b.y, brick.width, brick.height);
              }
          }
      }
  }

  //ball brick collision
  function ballBrickCollision() {
      for (let r = 0; r < brick.row; r++) {
          for (let c = 0; c < brick.column; c++) {
              let b = bricks[r][c];
              // if the brick isn't broken
              if (b.status) {
                  if (ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height) {
                      BRICK_HIT.play();
                      ball.dy = -ball.dy;
                      b.status = false; //the brick is broken
                      SCORE += score_unit;
                  }
              }
          }
      }
  }

  //show game stats
  function showGameStats(text, textX, textY, img, imgX, imgY) {
      //draw text
      ctx.fillStyle = "#FFF";
      ctx.font = "25px Germania One";
      ctx.fillText(text, textX, textY);

      //draw image
      ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
  }

  //draw function
  function draw() {
      drawPaddle();
      drawBall();
      drawBricks();

      //show score
      showGameStats(SCORE, 35, 25, SCORE_IMG, 5, 5);
      //show lives
      showGameStats(LIFE, cvs.width - 25, 25, LIFE_IMG, cvs.width - 55, 5);
      //shoe level
      showGameStats(LEVEL, cvs.width / 2, 25, LEVEL_IMG, cvs.width / 2 - 30, 5);
  }

  //game over
  function gameOver() {
      if (LIFE <= 0) {
          showYouLose();
          game_over = true;
      }
  }

  //level up
  function levelUp() {
      let isLevelDone = true;

      //check if all the bricks are broken
      for (let r = 0; r < brick.row; r++) {
          for (let c = 0; c < brick.column; c++) {
              isLevelDone = isLevelDone && !bricks[r][c].status;
          }
      }

      if (isLevelDone) {
          WIN.play();
          if (LEVEL >= max_level) {
              showYouWin();
              game_over = true;
              return;
          }
          brick.row++;
          createBricks();
          ball.speed += 0.5;
          resetBall();
          LEVEL++;
      }
  }
  //update game function
  function update() {
      movePaddle();
      moveBall();
      ballWallCollision();
      ballPaddleCollision();
      ballBrickCollision();
      gameOver();
      levelUp();
  }

  //game loop
  function loop() {
      ctx.drawImage(BG_IMG, 0, 0);
      draw();
      update();

      if (!game_over) {
          requestAnimationFrame(loop);
      }

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
      WALL_HIT.muted = WALL_HIT.muted ? false : true;
      PADDLE_HIT.muted = PADDLE_HIT.muted ? false : true;
      BRICK_HIT.muted = BRICK_HIT.muted ? false : true;
      WIN.muted = WIN.muted ? false : true;
      THEME.muted = THEME.muted ? false : true;
      LIFE_LOST.muted = LIFE_LOST.muted ? false : true;
  }

  //show game over message 
  const gameover = document.getElementById("gameover");
  const youwin = document.getElementById("youwin");
  const youlose = document.getElementById("youlose");
  const restart = document.getElementById("restart");

  //click on PLAY AGAIN button
  restart.addEventListener("click", function() {
      location.reload(); // reload the page
  })

  //show YOU WON
  function showYouWin() {
      gameover.style.display = "block";
      youwon.style.display = "block";
  }

  //show YOU LOST
  function showYouLose() {
      gameover.style.display = "block";
      youlose.style.display = "block";
  }