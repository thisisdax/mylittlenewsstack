<!-- able to view old stack, favourite stack-->
<!-- able to remove stacks -->
<template>
  <div>
  <md-progress v-show="source.length === 0" md-indeterminate></md-progress>
  <md-progress v-show="source.length === 0" md-indeterminate></md-progress>
  <md-progress v-show="source.length === 0" md-indeterminate></md-progress>
  <md-progress v-show="source.length === 0" md-indeterminate></md-progress>
  <div v-show="source.length === 0">Nothing in your pocket yet!</div>
  <div v-show="source.length > 0">
  <div v-for="item in source">
  <div v-if="!pocketed.includes(item)">
  <div class="source col-md-4">
    <md-whiteframe md-elevation="6">
    <md-card style="background-color: #e1e5ed; opacity: 0.9">
      <md-card-media v-if="item.urlToImage">
        <img v-bind:src="item.urlToImage" id="standard">
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{ item.title }}</div>
      </md-card-header>

      <md-card-content>
        <strong>Author: {{ item.author }}</br></strong>
        {{ item.description }}
      </md-card-content>

      <md-layout md-align="center" md-gutter="16">
        <md-card-actions>
          <md-button target="_blank" v-bind:href="item.url">Read</md-button>
          <md-button @click.native="deleteNews(item)">Remove</md-button>
          <md-button @click.native="copyText(item.url)">Share</md-button>
        </md-card-actions>
      </md-layout>
    </md-card>
  </md-whiteframe>
  </br>
  </br>
  </div>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      source: [],
      pocketed: []
    }
  },
  methods: {
    getPocket: function () {
      let vm = this
      vm.source = []
      this.$http.get('http://daxnewsstack.herokuapp.com/api/stacks/pocket', (data, status, request) => {
      }).then(response => {
        response.body.map(function (sourcestack, index) {
          sourcestack.pocketStack.map(function (pocketNewsStack) {
            vm.source.push(pocketNewsStack)
          })
        })
      }, err => {
        console.log(err)
      })
    },
    deleteNews: function (articleData) {
      console.log(articleData)
      this.$http.delete('http://daxnewsstack.herokuapp.com/api/stacks/pocket', {body: articleData}).then(function (response) {
        if (response.body === 'Popped!') {
          // this.getPocket()
          this.pocketed.push(articleData)
        }
      })
    },
    copyText: function (value) {
      // Create a "hidden" input
      var aux = document.createElement('input')
      // Assign it the value of the specified element
      aux.setAttribute('value', value)
      // Append it to the body
      document.body.appendChild(aux)
      // Highlight its content
      aux.select()
      // Copy the highlighted text
      document.execCommand('copy')
      // Remove it from the body
      document.body.removeChild(aux)
    }
  },
  mounted: function () {
    this.getPocket()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
strong {
  font-size: 1rem;
  color: darkgrey;
}
</style>
