<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  width:100px;
}

p {
  margin:5px 0;
}

.btn {
		background:#2472CC;
		color:rgba(255,255,255,1);
		border:0;
		outline: none;
		cursor: pointer;
        height:40px;
        padding: 0 30px;
        font-size: 18px;
	}
	.btn:hover {
		background:#4688D5;
	}
</style>
