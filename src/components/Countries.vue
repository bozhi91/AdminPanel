//This is our template. It is include in the file ''
<template>

    <div v-if="!dataload">
      <h2>Error loading countries</h2>
      <!-- Use templates(Modal dialog) instead  -->
    </div>

    <div v-for="country in store.countriesService.countries">
      <div v-for="city in country.data.cities">
        {{city.name}}
      </div>
    </div>

    <div v-if="dataload">
        <h3>Countries</h3><br/>
        <button v-link="'./addCountry'">+Add Country</button><br/><br/>
        <ul>
            <li v-for="country in countries">
             {{country.data.name}}
            </li>
        </ul>
    </div>
</template>

<script type="text/babel">
    import store from '../services/Store.js'

    export default {
      data () {
        return {
          loaded: false,
          error: false,
          store: store,
          countries: store.countriesService.countries,
          dataload: store.dataLoaded
        }
      },
      methods: {
        fetchData () {
        }
      },
      ready () {
        window.setInterval(() => {
          this.now = Math.trunc((new Date()).getTime() / 1000)
        }, 1000)
      }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

