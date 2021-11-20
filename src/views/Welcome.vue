<template>
    <main>
      <div class="starting">
        <div class="welcome" v-if="myName">
          <h1>Привет, {{myName}}</h1>
          <button class="start" @click="start">Игра</button>
        </div>
        <div class="welcome" v-else>
          <h1>Давай познакомимся</h1>
          <input
            type="text"
            placeholder="Введи своё имя"
            v-model="new_name"
          >
          <button class="start" @click="rememberMe()">Запомнить меня</button>
        </div>
      </div>

    </main>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default ({
    data: function () {
        return {
            new_name: ''
        }
    },
    computed: mapGetters(['myName']),
    methods: {
        rememberMe: function () {
            if (this.new_name.trim()) {
                this.setName(this.new_name);
            }
        },
        start: function () {
            this.$router.push('/game')
        },
        ...mapActions(['setName']),
    }
})
</script>
