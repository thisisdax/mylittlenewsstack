<template>
  <div>
    <template v-if="!status">
      <input type="text" v-model="loginDet.email" placeholder="email"/>
      <input type="password" v-model="loginDet.password" placeholder="password"/>
    </template>
    <template v-if="loginDet.email !== ''">
      <button v-if="!status" v-on:click="login">Login</button>
    </template>
    <template v-if="!status">
      <router-link to='/register'>Register Now</router-link></br>
    </template>
  </div>
</template>

<script>
import {bus} from '../main'
export default {
  name: 'login',
  data () {
    return {
      loginDet: {},
      token: window.localStorage.token,
      status: ''
    }
  },
  methods: {
    login: function () {
      bus.$emit('login', this.loginDet)
    },
    logout: function () {
      this.loginDet = {}
      bus.$emit('logout', this.loginDet)
      console.log('logout emit')
    },
    statusFn: function () {
      this.status = !this.status
      if (this.status) {
        this.$router.push('/news')
      } else {
        this.$router.push('/')
      }
    }
  },
  components: {
  },
  created: function () {
    bus.$on('statusFn', this.statusFn)
    if (this.token === '') {
      this.status = false
    } else {
      this.status = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
