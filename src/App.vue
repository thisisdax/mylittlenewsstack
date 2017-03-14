<template>
  <div id="app">
    <template v-if="status">
      <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
      <router-link to='/news' class="col-md-4 col-xs-4"><strong style="color:skyblue;"><i class="fa fa-newspaper-o" aria-hidden="true"></i>News</strong></router-link>
      <router-link to='/pocket' class="col-md-4 col-xs-4"><strong style="color:limegreen;"><i class="fa fa-stack-overflow" aria-hidden="true"></i>Pocket</strong></router-link>
      <router-link to='/' class="col-md-4 col-xs-4"><strong><a v-on:click="logoutUser()"><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</a></strong></router-link>
      </div>
      </nav>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
import {bus} from './main'
export default {
  name: 'app',
  data () {
    return {
      someData: '',
      msg: '',
      loginDet: {
      },
      currentUser: {},
      status: false,
      token: window.localStorage.token || ''
    }
  },
  http: {
    emulateJSON: true,
    emulateHTTP: true
  },
  methods: {
    createUser: function (loginDet) {
      this.$http.post('http://daxnewsstack.herokuapp.com/api/users', loginDet).then(response => {
        this.currentUser = response.body
        bus.$emit('registerFn', response)
      }, err => {
        console.log(err)
      })
    },
    loginUser: function () {
      let vm = this
      if (vm.loginDet.email !== '') {
        this.$http.post('http://daxnewsstack.herokuapp.com/api/auth', vm.loginDet, data => {
        })
        .then(successCallback => {
          if (successCallback.body === null) {
            this.msg = 'Unable to login due to incorrect information'
          } else {
            window.localStorage.token = 'Bearer ' + successCallback.body.token
            this.token = window.localStorage.token
            this.msg = 'Good day, '
            this.currentUser = successCallback.body.user
            this.status = true
            bus.$emit('statusFn')
          }
        }, errorCallback => {
          console.log(errorCallback)
        })
      }
    },
    logoutUser: function () {
      let vm = this
      window.localStorage.token = ''
      this.token = ''
      this.currentUser = {}
      this.checkStatus()
      this.msg = 'Logged out!'
      vm.$route.push('/')
      bus.$emit('statusFn')
    },
    getStack: function () {
      this.$http.get('http://daxnewsstack.herokuapp.com/api/stacks/tech', (data, status, request) => {
      }).then(response => {
        this.someData = response.body
      }, err => {
        console.log(err)
      })
    },
    checkStatus: function () {
      if (window.localStorage.token !== '') {
        this.status = true
      } else {
        this.status = false
      }
    }
  },
  created: function () {
    bus.$on('login', loginDet => {
      this.loginDet = loginDet
      this.loginUser()
    })
    bus.$on('logout', loginDet => {
      this.logoutUser()
    })
    bus.$on('create', loginDet => {
      this.createUser(loginDet)
    })
    this.$http.get('http://daxnewsstack.herokuapp.com/api/stacks/tech', (data, status, request) => {
    }).then(response => {
      this.someData = response.body
    }, err => {
      console.log(err)
    })
    this.$http.get('http://daxnewsstack.herokuapp.com/api/users', (data, status, request) => {
    }).then(response => {
      this.currentUser = response.body
      this.msg = 'Happy reading, '
    }, err => {
      console.log(err)
    })
  },
  mounted: function () {
    this.checkStatus()
  }
}
</script>

<style>
@import url("//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

strong {
  font-size: 2rem;
  color: lightgrey;
}

a {
  text-decoration: none;
}

.navbar {
  background-color: black;
  filter: opacity(0.85);
}

@media (max-width: 570px) {
  strong {
    font-size: 1.5rem;
  }
  .fa {
    display: none;
  }
}
</style>
