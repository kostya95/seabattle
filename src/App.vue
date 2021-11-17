<template>
  <div id="app">
    <header  v-if="is_starting">

        <p class="username">{{username}}</p>
        <p class="score">{{username}} 0:0 Компьютер</p>
        <button class="refresh"><img src="./assets/refresh.svg" alt=""></button>

    </header>
    <main>
      <div class="starting" v-if="!is_starting">
        <div class="welcome" v-if="username">
          <h1>Привет, {{username}}</h1>
          <button class="start" @click="start">Игра</button>
        </div>
        <div class="welcome" v-else>
          <h1>Давай познакомимся</h1>
          <input type="text" v-model="inname" placeholder="Введи своё имя">
          <button class="start" @click="rememberMe" v-bind:disabled="inname.trim().length == 0">Запомнить меня</button>
        </div>
      </div>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>

export default  {
  name: 'App',
  data: function () {
    return {
      inname: '',
      username: '',
      is_starting: false
    }

  },
  mounted: function ()  {
    this.username = localStorage.getItem('username')? localStorage.getItem('username'):'';
  },
  methods: {
    rememberMe: function() {
      localStorage.setItem('username', this.inname);
      this.username = this.inname
    },
    start: function () {
      this.is_starting =true;
      this.$router.push('/game')
    }
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

