<template>
  <div>
    <div>
     <!-- <h1 v-model="">[ {{store.city}} ] {{categName.pageType}}</h1><br/>-->
        <h3>Title</h3>
        <textarea>{{category.pageTitle}}</textarea><br/><br/>

        <h3>Intro</h3>
        <textarea rows="5" cols="50">{{category.pageIntro}}</textarea><br/>
        <h3>Subcategories Order</h3>
        <ul v-sortable>
          <li v-for="subcat in subcategories" class="subcategory">
            {{subcat.title}}
          </li>
        </ul>
      </div>
    </div>

  <div v-if="error">
    <h2>Error while loading data</h2>
  </div>
</template>

<script>
import Store from '../services/Store'

export default {
  data () {
    return {
      error: '',
      category: '',
      subcategories: ''
    }
  },
  methods: {
    fetchData () {
      let getCityPromise = Store.citiesService.getCityById('ch-lausanne')
      getCityPromise.then(city => {
        let subcat = city.getSubCategories(this.$route.query.cat)
        if (!subcat) {
          // show error
        } else {
          this.subcategories = subcat
        }
        let categ = city.getCatById(this.$route.query.cat)
        if (!categ) {
          // show error
        } else {
          this.category = categ
        }
      }).catch(err => {
        this.error = err.status
      })
    }
  },
  ready () {
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #ffffff;
  background: #8C8C8C;
}
.subcategory{
  background: #aabbcc;
  width: 200px;
  margin-bottom: 10px;
}
.subcategory:hover{
  background: #ffffff;
}

ul {
  list-style-type: none;
}
</style>
