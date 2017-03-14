<!-- display buttons to view user's news stack
display available news source to choose to view (tech, business, general, or custom) -->
<template>
  <div>
  <button @click="getStack">Get Stack</button>
  <div v-for="item in source">
  <div class="source col-md-4">
    <md-whiteframe md-elevation="6">
    <md-card style="background-color: #e1e5ed; opacity: 0.9">
      <!-- <md-card-media v-if="proj.previewImage">
        <img v-bind:src="proj.previewImage" id="standard">
      </md-card-media> -->

      <md-card-header>
        <div class="md-title">{{ item.source }}</div>
      </md-card-header>

      <md-layout md-align="center" md-gutter="16">
        <md-card-actions>
          <md-button target="_blank" to='/news'>View</md-button>
        </md-card-actions>
      </md-layout>

      <md-card-content>
        {{ item.source }}
      </md-card-content>
    </md-card>
  </md-whiteframe>
</br>
</br>
  </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      source: {}
    }
  },
  methods: {
    getStack: function () {
    //   this.$http.get('http://localhost:3000/api/stacks/tech', (data, status, request) => {
    //   }).then(response => {
    //     console.log('getStack fired')
    //     this.source = response.body
    //     console.log('getStack', this.source)
    //   }, err => {
    //     console.log(err)
    //   })
    // }
  },
  created: function () {
    // this.$http.get('http://localhost:3000/api/stacks/tech', (data, status, request) => {
    // }).then(response => {
    //   console.log('am i fired?')
    //   this.source = response.body
    //   console.log('getStacked', response.body)
    // }, err => {
    //   console.log(err)
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
