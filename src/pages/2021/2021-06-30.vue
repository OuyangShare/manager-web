<template>
  <div>
    <h1></h1>
    <canvas id="myCanvas"></canvas>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    var c = document.getElementById("myCanvas");
    var cxt = c.getContext("2d");
    cxt.fillStyle = "#FF0000";
    cxt.beginPath();
    cxt.arc(80, 18, 15, 0, Math.PI * 2, true);
    cxt.closePath();
    cxt.fill();
  },
};
</script>

<style lang="sass" scoped>
canvas
  width: 90%
  background-color: yellow
</style>