<template>
  <div>
    <div>
       Country
       <select>
         <option selected disabled>Select Country</option>
         <option v-for="country in countries" @click="loadCities(country.data.id)">{{country.name}}</option>
      </select>

      Cities of country with id:  {{countryName}}
      <select>
        <option selected disabled>Select City</option>
        <option value={{country.name}} v-for="city in country.data.cities">{{country.name}}</option>
      </select>


      <br/>    <br/>
      Country Info:
      <div v-for="c in country">
          {{c.name}} - {{c.id}}
      </div>

      <br/><br/>
      Languages<br/>
        <input type="checkbox" value ="en"> English<br/>
        <input type="checkbox" value ="fr"> French<br/>
        <input type="checkbox" value ="de"> German<br/>
        <input type="checkbox" value ="sp"> Spanish<br/><br/><br/>

    Photo <br/>
    <button>Upload</button><br/>
    <button  @click="storeCity(cityName, countryName)">Save</button><br/>
  </div>
  </div>

  <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Add City</button>
  <popup msg="City created successfully", title="Success" icon="ok">
  </popup>


  //////////////////////////////

    {{countries.name}}

  //////////////////////////////

    <div v-if="insertResult"  style="color:#ff0000">
      Error! The city already exists!
    </div>
</template>

<script>
import popup from './Templates/popup'
import Store from '../services/Store'

export default {
  components: {
    popup
  },
  data () {
    return {
      countries: 'Empty :(',
      cities: '',
      popup: popup
//      selected: '',
//      insertResult: false,
//      countriesJS: countriesJS,
//      countries: store.countriesService.countries,
//      countryName: '',
//      cityName: '',
//      cities: '',
//      country: ''
    }
  },
  methods: {
    storeCity (cityName, countryName) {
    },
    loadCities (countryId) {
      let countries = Store.countriesService.getCountryById('ch')
      countries.then(country => {
        this.countries = countries._v.data
      }).catch(err => {
        this.error = err.toString()
      })
    }
  },
  ready () {
    this.loadCities()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #ffffff;
  background: #8C8C8C;
}
</style>
