<template>
  <!-- <div><canvas id="canvas" style="height: 100%"></canvas></div> -->
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      digit: [
        [
          [0, 0, 1, 1, 1, 0, 0],
          [0, 1, 1, 0, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 0, 1, 1, 0],
          [0, 0, 1, 1, 1, 0, 0],
        ], //0
        [
          [0, 0, 0, 1, 1, 0, 0],
          [0, 1, 1, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [1, 1, 1, 1, 1, 1, 1],
        ], //1
        [
          [0, 1, 1, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 1, 1, 0, 0, 0, 0],
          [1, 1, 0, 0, 0, 0, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 1, 1, 1, 1, 1],
        ], //2
        [
          [1, 1, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0],
        ], //3
        [
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 1, 0],
          [0, 0, 1, 1, 1, 1, 0],
          [0, 1, 1, 0, 1, 1, 0],
          [1, 1, 0, 0, 1, 1, 0],
          [1, 1, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 1, 1],
        ], //4
        [
          [1, 1, 1, 1, 1, 1, 1],
          [1, 1, 0, 0, 0, 0, 0],
          [1, 1, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0],
        ], //5
        [
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 1, 1, 0, 0, 0, 0],
          [1, 1, 0, 0, 0, 0, 0],
          [1, 1, 0, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0],
        ], //6
        [
          [1, 1, 1, 1, 1, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 0, 0, 0],
        ], //7
        [
          [0, 1, 1, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0],
        ], //8
        [
          [0, 1, 1, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 1, 1, 0, 0, 0, 0],
        ], //9
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ], //:
      ],
      WINDOW_WIDTH: "",
      WINDOW_HEIGHT: "",
      RADIUS: "",
      context: "",
      MARGIN_TOP: "",
      MARGIN_LEFT: "",
      showtime: new Date(),
      balls: [],
      colors: [
        "#51F511",
        "#66FAD5",
        "#EF1C3E",
        "#FFFA5F",
        "#DE48CD",
        "#310CF2",
      ],
    };
  },
  methods: {
    render(cxt) {
      cxt.clearRect(0, 0, this.WINDOW_WIDTH, this.WINDOW_HEIGHT);
      var hours = parseInt(this.showtime.getHours());
      var minutes = parseInt(this.showtime.getMinutes());
      var seconds = parseInt(this.showtime.getSeconds());
      this.renderDigit(
        this.MARGIN_LEFT,
        this.MARGIN_TOP,
        parseInt(hours / 10),
        cxt
      );
      this.renderDigit(
        this.MARGIN_LEFT + 15 * (this.RADIUS + 1),
        this.MARGIN_TOP,
        parseInt(hours % 10),
        cxt
      );
      this.renderDigit(
        this.MARGIN_LEFT + 30 * (this.RADIUS + 1),
        this.MARGIN_TOP,
        10,
        cxt
      );
      this.renderDigit(
        this.MARGIN_LEFT + 39 * (this.RADIUS + 1),
        this.MARGIN_TOP,
        parseInt(minutes / 10),
        cxt
      );
      this.renderDigit(
        this.MARGIN_LEFT + 54 * (this.RADIUS + 1),
        this.MARGIN_TOP,
        parseInt(minutes % 10),
        cxt
      );
      this.renderDigit(
        this.MARGIN_LEFT + 69 * (this.RADIUS + 1),
        this.MARGIN_TOP,
        10,
        cxt
      );
      this.renderDigit(
        this.MARGIN_LEFT + 78 * (this.RADIUS + 1),
        this.MARGIN_TOP,
        parseInt(seconds / 10),
        cxt
      );
      this.renderDigit(
        this.MARGIN_LEFT + 93 * (this.RADIUS + 1),
        this.MARGIN_TOP,
        parseInt(seconds % 10),
        cxt
      );
      for (var i = 0; i < this.balls.length; i++) {
        cxt.fillStyle = this.balls[i].color;
        cxt.beginPath();
        cxt.arc(
          this.balls[i].x,
          this.balls[i].y,
          this.RADIUS,
          0,
          2 * Math.PI,
          true
        );
        cxt.closePath();
        cxt.fill();
      }
    },

    renderDigit(x, y, num, cxt) {
      cxt.fillStyle = "rgb(0,102,153)";
      for (var i = 0; i < this.digit[num].length; i++)
        for (var j = 0; j < this.digit[num][i].length; j++)
          if (this.digit[num][i][j] == 1) {
            cxt.beginPath();
            cxt.arc(
              x + (this.RADIUS + 1) + j * 2 * (this.RADIUS + 1),
              y + (this.RADIUS + 1) + i * 2 * (this.RADIUS + 1),
              this.RADIUS,
              0,
              2 * Math.PI
            );
            cxt.closePath();
            cxt.fill();
          }
    },

    update() {
      var nextTime = new Date();
      var nexttimehours = parseInt(nextTime.getHours());
      var nexttimeminutes = parseInt(nextTime.getMinutes());
      var nexttimeseconds = parseInt(nextTime.getSeconds());
      var showtimehours = parseInt(this.showtime.getHours());
      var showtimeminutes = parseInt(this.showtime.getMinutes());
      var showtimeseconds = parseInt(this.showtime.getSeconds());
      if (nextTime != this.showtime) {
        if (parseInt(nexttimehours / 10) != parseInt(showtimehours / 10)) {
          this.addballs(
            this.MARGIN_LEFT,
            this.MARGIN_TOP,
            parseInt(nexttimehours / 10)
          );
        }
        if (parseInt(nexttimehours % 10) != parseInt(showtimehours % 10)) {
          this.addballs(
            this.MARGIN_LEFT + 15 * (this.RADIUS + 1),
            this.MARGIN_TOP,
            parseInt(nexttimehours % 10)
          );
        }
        if (parseInt(nexttimeminutes / 10) != parseInt(showtimeminutes / 10)) {
          this.addballs(
            this.MARGIN_LEFT + 39 * (this.RADIUS + 1),
            this.MARGIN_TOP,
            parseInt(nexttimeminutes / 10)
          );
        }
        if (parseInt(nexttimeminutes % 10) != parseInt(showtimeminutes % 10)) {
          this.addballs(
            this.MARGIN_LEFT + 54 * (this.RADIUS + 1),
            this.MARGIN_TOP,
            parseInt(nexttimeminutes % 10)
          );
        }
        if (parseInt(nexttimeseconds / 10) != parseInt(showtimeseconds / 10)) {
          this.addballs(
            this.MARGIN_LEFT + 78 * (this.RADIUS + 1),
            this.MARGIN_TOP,
            parseInt(nexttimeseconds / 10)
          );
        }
        if (parseInt(nexttimeseconds % 10) != parseInt(showtimeseconds % 10)) {
          this.addballs(
            this.MARGIN_LEFT + 93 * (this.RADIUS + 1),
            this.MARGIN_TOP,
            parseInt(nexttimeseconds % 10)
          );
        }
      }
      this.showtime = nextTime;
      this.updateBalls();
    },

    updateBalls() {
      for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].x += this.balls[i].vx;
        this.balls[i].y += this.balls[i].vy;
        this.balls[i].vy += this.balls[i].g;
        if (this.balls[i].y > this.WINDOW_HEIGHT - this.RADIUS) {
          this.balls[i].y = this.WINDOW_HEIGHT - this.RADIUS;
          this.balls[i].vy = -this.balls[i].vy * 0.6;
        }
      }
      var ballscontol = 0;
      for (i = 0; i < this.balls.length; i++)
        if (
          this.balls[i].x + this.RADIUS > 0 &&
          this.balls[i].x - this.RADIUS < this.WINDOW_WIDTH
        ) {
          this.balls[ballscontol++] = this.balls[i];
        }
      while (this.balls.length > Math.min(ballscontol, 300)) {
        this.balls.pop();
      }
    },

    addballs(x, y, num) {
      for (var i = 0; i < this.digit[num].length; i++)
        for (var j = 0; j < this.digit[num][i].length; j++)
          if (this.digit[num][i][j] == 1) {
            var newball = {
              x: x + (this.RADIUS + 1) + j * 2 * (this.RADIUS + 1),
              y: y + (this.RADIUS + 1) + i * 2 * (this.RADIUS + 1),
              g: 1.5 + Math.random(),
              vx: Math.pow(-1, Math.floor(Math.random() * 100)) * 5,
              vy: -Math.ceil(Math.random() * 10),
              color: this.colors[
                Math.floor(Math.random() * this.colors.length)
              ],
            };
            this.balls.push(newball);
          }
    },
  },
  mounted() {
    // // this.WINDOW_WIDTH = document.documentElement.clientWidth - 300;
    // // this.WINDOW_HEIGHT = document.documentElement.clientHeight;
    // this.WINDOW_WIDTH = 800;
    // this.WINDOW_HEIGHT = 200;
    // this.MARGIN_LEFT = Math.round(this.WINDOW_WIDTH / 10);
    // this.MARGIN_TOP = Math.round(this.WINDOW_HEIGHT / 5);
    // this.RADIUS = Math.round((this.WINDOW_WIDTH * 4) / 5 / 108) - 1;
    // const canvas = document.getElementById("canvas");
    // this.context = canvas.getContext("2d");
    // this.showtime = new Date();
    // canvas.width = this.WINDOW_WIDTH;
    // canvas.height = this.WINDOW_HEIGHT;
    // let self = this;
    // setInterval(function () {
    //   self.render(self.context);
    //   self.update();
    // }, 50);
  },
};
</script>

<style lang="sass" scoped>
  div 
    background-color: #eeeeee;
  #canvas 
</style>