<template>
    <h1 class="custom_h1">TEST ENVIRONMENT</h1>

  <h2>This is a test page. The information inside it is irrelevant. Just ignore it!!</h2>


  <button @click="loadData()">Open Modal</button>
  <button type="button" data-toggle="modal" data-target="#myModal" @click="loadData()">Open Modal</button>


  <div class="checkbox">
    <label>
      <input data-toggle="toggle" type="checkbox">
      Option one is enabled
    </label>
  </div>

  <div class="checkbox disabled">
    <label>
      <input disabled data-toggle="toggle" type="checkbox">
      Option two is disabled
    </label>


  </div>
  <div v-if="loaded">
    <popup></popup>
  </div>

</template>

<script>
import countries from './JSON/countries.json'
import jsonText from './JSON/cityAdverts.json'
import services from '../services/Countries.js'

export default {
  data () {
    return {
      loaded: true,
      countries: countries,
      jsonText: jsonText,
      jsonObject: '[ Empty Object ]',
      category: 'EMPTY :(',
      sections: []
    }
  },
  computed: {
    advert () {
      this.sections.push(services.getSection('1', '1'))
      this.sections.push(services.getSection('1', '2'))
      return this.sections
    }
  },
  methods: {
    loadData () {
      this.loaded = true
    }
  }
}
</script>

<style>
    .list-group-item{
        width: 100px;
        margin-top:10px;
    }
    .custom_h1{
        background: #F2FF00;
        color: #000000;
        border: solid;
        text-align: center;
    }
</style>
