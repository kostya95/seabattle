<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default  {
  name: 'App',

  mounted: function ()  {
    this.getName();
    this.getScore();
  },
  methods: {
    ...mapActions(['getName','getScore']),
  }

}
</script>

<style>
header {
  padding: 0 12px;
  height: 90px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #76BA92;
}
main {
  min-height: calc(100vh - 90px);
}
h1 {
  color: #49C1FF;
  margin-bottom: 30px;
  font-size: 45px;
}
input {
  padding: 16px;
  border: 2px solid #76BA92;
  font-size: 22px;
  border-radius: 10px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 400px;
}
.starting, .welcome {
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
button {
  font-size: 22px;
  background: #49C1FF;
  color: #FFFFFF;
  font-weight: bold;
  border: none;
  padding: 16px 32px;
  border-radius: 10px;
  cursor: pointer;
  transition: background .3s;
}
button:hover {
  background: #387FE8;
}
.username {
  font-size: 22px;
  font-weight: bold;
  color:#49C1FF;
  margin-right: 20px;
}
.score {
  font-size: 18px;
  font-weight: bold;
  margin-right: 20px;
}
.refresh {
  padding: 0;
  background: none;
}
.refresh:hover {
  background: none;
}
.refresh img {
  display: block;
}

</style>

