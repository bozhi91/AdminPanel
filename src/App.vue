<template>

  <div class="mainDiv">
  <div v-if="!storeData.loggedIn && !storeData.dataLoaded">
    <login></login>
  </div>

  <div id="wrapper" v-if="storeData.loggedIn && storeData.dataLoaded">
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
      <ul class="sidebar-nav">
        <li class="sidebar-li">
         <p> Current city to edit</p>
            <select id="cities" @change="setCityName($event.target.value)">
              <option value={{city.data.id}} v-for="city in cities">{{city.data.name}}</option>
            </select>

          <br/>
        </li>
        <li><a v-link="'/addCountry'" @click="title='Add Country'">Add Country</a></li>
        <li><a v-link="'/addCity'" @click="title='Add City'">Add City</a></li>
        <!--<li><span class="glyphicon glyphicon-plus"> <a v-link="'/addCity'">Add City</a> </span></li>-->
        <p>{{cityName}} Categories<p>

        <div>
          <ul>
            <li v-for="category in categories">
              <a href="http://localhost:8080/#!/info?cat={{category.id}}" @click="title=Category">
                {{category.pageType}}
              </a>
            </li>
          </ul>
        </div>

        <br/>
        <li><a v-link="'/subcat'" @click="title='Subcategories'">{{cityName}} Subcategories</a></li>
        <li><a v-link="'/adverts'" @click="title='Adverts'">{{cityName}} Adverts</a></li>
        <li><a @click="logout()">Logout</a></li>
      </ul>
    </div>

    <!-- Page Content -->
    <div id="page-content-wrapper">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <h2 class="page_title">{{cityName}} - {{title}}</h2>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <!-- /#sidebar-wrapper -->
  </div>
    </div>
</template>

<script>
  import store from './store.js'
  import services from './services/Countries.js'
  import stored from './services/Store.js'
  import login from './components/Login'
  import Store from './services/Store'
  require('./components/css/simple-sidebar.css')

  export default {
    components: {
      login
    },
    data () {
      return {
        cityName: '',
        title: '',
        cities: '',
        store: store,
        categories: null,
        logged: false,
        storeData: stored.data,
        services: services,
        city: null,
        cityId: null
      }
    },
    methods: {
      logout () {
        this.storeData.loggedIn = false
        this.storeData.dataLoaded = false
        this.logged = false
       // window.location = 'http://localhost:8080/#!/addCountry'
      },
      setCityName (cityId) {
        this.cityId = cityId
        this.cityName = document.getElementById('cities').value
        this.loadCategories()
        this.cityName = cityId
      },
      loadCategories () {
        let getCatPromise = Store.citiesService.getCityById(this.cityId)
        getCatPromise.then(categ => {
          let categories = categ.getCategories()
          if (!categories) {
            // show error
          } else {
            this.categories = categories
          }
        }).catch(err => {
          this.error = err.status
          this.logged = false
        })
      }
    },
    ready () {
      this.cities = Store.citiesService.getCities()
     // this.setCityName()
     // this.cityName = document.getElementById('cities').value
      // this.loadCategories()
    }
  }
</script>

<style>
    .mainDiv{
      background: #ffffff !important;
    }
</style>
