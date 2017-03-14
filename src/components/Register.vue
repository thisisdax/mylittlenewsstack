<template>
  <div>
    <input type="text" v-model="loginDet.name" placeholder="name"/>
    <input type="text" v-model="loginDet.email" placeholder="email"/>
    <input type="password" v-model="loginDet.password" placeholder="password"/>
    <button v-on:click="register">Create</button>
  </div>
</template>

<script>
import {bus} from '../main'
export default {
  name: 'register',
  data () {
    return {
      loginDet: {},
      token: window.localStorage.token,
      status: ''
    }
  },
  methods: {
    register: function () {
      bus.$emit('create', this.loginDet)
    },
    registerFn: function () {
      this.$router.push('/')
    }
  },
  components: {
  },
  computed: {
  },
  created: function () {
    bus.$on('registerFn', ($event) => {
      this.registerFn()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
