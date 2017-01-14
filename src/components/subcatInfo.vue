
//This is our template. It is included in the file 'main.js'
<template>
    <div class="mainContainer">
			<h1>{{currentCity.city}}- {{categ.pageType}} - {{subcategory.title}}</h1><br/>

      <h3>Title</h3>
      <textarea v-model="subcat.title" placeholder="Insert subcategory title">
        {{subcategory.title}}
      </textarea><br/><br/>

      <h3>Parent Category</h3>
      <select>
        <option>Choose main category</option>
        <option v-for="cat in categories" @click="parentCatId=cat.id">
         {{cat.pageType}}
        </option>
      </select><br/>

      <h3>Icon</h3>
      <select>
        <option v-for="icon in adverts._images">
          {{icon.url}}
        </option>
      </select><br/><br/>

      <h3>Text</h3>
       <textarea placeholder="Subcategory description" rows="7" cols="100">
         {{subcategory.text}}
       </textarea><br/><br/>

        <h3>Premium Adverts</h3>
      {{adverts | json}}
        <ul v-sortable>
          <li v-for="advert in adverts" class="list-group-item" track-by = "$index">
            {{advert.name}} {{$index}}
          </li>
        </ul>
    <!--
     <select>
       <option v-for="advetr in adverts">
        <div v-for="icon in advert._images">
          {{icon.url}}
        </div>
       </option>
      </select>-->

    </div>
    <button @click="saveSubcat"> SAVE</button>
    </div>

  <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Add Country</button>
  <loading :show.sync="showLoading" msg="Loading data, please wait...."></loading>


</template>

<script>
import $ from 'jquery'
import services from '../services/Countries.js'
import Store from '../services/Store'
import loading from './Templates/loading'

export default {
  components: {
    loading
  },
  data () {
    return {
      showLoading: false,
      subcategory: null,
      categories: null,
      adverts: 0,
      services: services,
      parentCatId: 0,
      pages: 0,
      langs: {
        en: true,
        fr: false,
        es: false,
        de: false
      },
      current: {
        en: true,
        fr: false,
        es: false,
        de: false
      }
    }
  },

  methods: {
    switchTab (tabGroup, lang) {
      const tabToShow = '#' + tabGroup + '-' + lang
      const tabLinkToShow = '#' + tabGroup + '-link-' + lang

      $('.' + tabGroup).removeClass('current')
      $(tabToShow).addClass('current')

      $('.' + tabGroup + '-link').removeClass('current')
      $(tabLinkToShow).addClass('current')
      this.current[lang] = !this.current[lang]
    },
    saveSubcat () {
      this.services.createSubcat(this.parentCatId.id, this.subcat)
    },
    fetchData () {
      // Get the advert info
      let getCityPromise = Store.citiesService.getCityById(this.$route.query.city)
      getCityPromise.then(city => {
        this.showLoading = true
        let advert = city.getAdverts(this.$route.query.cat, this.$route.query.subcat)

        if (!advert) {
          // show error dialog
        } else {
          this.showLoading = false
          this.adverts = advert
          //
        }
        // Get the subcat info
        let subcat = city.getSubCategoriesById(this.$route.query.cat, this.$route.query.subcat)
        if (!subcat) {
          // show error dialog
        } else {
          this.showLoading = false
          this.subcategory = subcat
        }
        // Get the CATEGORY info
        let categ = city.getCategories()
        if (!categ) {
          // show error dialog
        } else {
          this.showLoading = false
          this.categories = categ
        }
      }).catch(err => {
        this.error = err.status
        this.logged = false
      })
    }
  },
  ready () {
    this.fetchData()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.custom{
  margin-bottom:100px;
}
    .list-group-item{
        width: 400px !important;
        height: 50px !important;
        margin-top:10px;
    }

.mainContainer{
  padding-bottom: 50px;
}

body{
      font-family: 'Trebuchet MS', serif;
       line-height: 1.6
        }
        .container{
            width: 800px;
            margin: 0 auto;
        }

        .tab-content{
            background: #ededed;
            height: 84px;
            width: 375px;
            display: none;
        }

        .tab-content.current{
            display: block;
        }
</style>
