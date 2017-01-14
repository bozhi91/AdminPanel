<template>
  <div>
    <button v-link="'/subcatInfo?catId=0&subcatId=0'">Add Subcategory</button><br/><br/>
    <h3>Filter by parent category</h3>
    <!-- Select the sMain category -->
    <select @change="loadSubcat($event.target.value)">
      <option name="category" value={{category.id}} v-for="category in categories" ">
        {{category.pageType}}
      </option>
    </select><br/>
    <ul>
      <li v-for="subcat in subcats">
        <a  href="http://localhost:8080/#!/subcatInfo?city=ch-lausanne&cat={{catId}}&subcat={{subcat.id}}">{{subcat.title}}</a>
      </li>
    </ul>
    </div>
</template>

<script>
  import countryJS from '../services/Countries.js'
  import Store from '../services/Store'

  export default {
    data () {
      return {
        city: null,
        countryJS: countryJS,
        categories: 0,
        subcats: null,
        catId: null,
        advert: null
      }
    },
    methods: {
      loadMainCat () {
        this.categories = countryJS.getCategories('ch', 'ch-lausanne')
      },
      loadSubcat (catId) {
        this.catId = catId
        let getCatPromise = Store.citiesService.getCityById('ch-lausanne')
        getCatPromise.then(categ => {
          let subcat = categ.getSubCategories(catId)
          if (!subcat) {
          // show error
          } else {
            this.subcats = subcat
          }
        }).catch(err => {
          this.error = err.status
          this.logged = false
        })
      }
    },
    ready () {
      this.loadMainCat()
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
