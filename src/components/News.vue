<!-- view particular news article, display img description title and author
be able to like, favourite, stack -->
<!-- display buttons to view user's news stack
display available news source to choose to view (tech, business, general, or custom) -->
<template>
  <div>
  <md-progress v-show="source.length === 0" md-indeterminate></md-progress>
  <md-progress v-show="source.length === 0" md-indeterminate></md-progress>
  <md-progress v-show="source.length === 0" md-indeterminate></md-progress>
  <md-progress v-show="source.length === 0" md-indeterminate></md-progress>
  <div v-show="source.length === 0">Taking a minute to conQuery the world!</div>
  <div v-show="source.length > 0">
  <div v-for="item in source">
  <div v-for="(article, index) in item.articles">
  <div v-if="!pocketed.includes(article)">
  <div class="source col-lg-offset-2 col-lg-8 col-md-offset-2 col-md-8">
    <md-whiteframe md-elevation="6">
    <md-card style="background-color: #e1e5ed; opacity: 0.9">
      <md-card-media v-if="article.urlToImage">
        <img v-bind:src="article.urlToImage" id="standard">
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{ article.title }}</div>
      </md-card-header>

      <md-card-content>
        {{ article.description }}</br>
        <strong>Source: {{item.source}}, Author: {{ article.author }}</strong>
      </md-card-content>

      <md-layout md-align="center" md-gutter="16">
        <md-card-actions>
          <md-button target="_blank" v-bind:href="article.url">Read</md-button>
          <md-button @click.native="pocketNews(article)">Pocket</md-button>
          <md-button @click.native="copyText(article.url)">Share</md-button>
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
    getStack: function () {
      let vm = this
      this.$http.get('http://daxnewsstack.herokuapp.com/api/stacks/tech', (data, status, request) => {
      }).then(response => {
        console.log('getStack fired', response)
        response.body.map(function (sourcestack, index) {
          vm.source.push(JSON.parse(sourcestack))
        })
        console.log(vm.source)
      }, err => {
        console.log(err)
      })
    },
    pocketNews: function (articleData, index) {
      this.$http.post('http://daxnewsstack.herokuapp.com/api/stacks/pocket', articleData).then(response => {
        console.log('success created', response)
      }, err => {
        console.log(err)
      })
      this.pocketed.push(articleData)
      console.log(this.pocketed)
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
    },
    concatDes: function (description) {
      return description.match(/(.{1,3000}\w)\s/)[1] + '...'
    }
  },
  computed: {

  },
  mounted: function () {
    this.getStack()
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
