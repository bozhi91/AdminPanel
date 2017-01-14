
//This is our template. It is include in the file ''
<template>
  <div>
      <!-- <h1>{{currentCity.city}} - City Adverts</h1><br/>-->
       <a type="button" href="http://localhost:8080/#!/createAdvert?city=ch-lausanne&cat={{catId}}&subcat={{subcatId}}">Add Advert</a><br/><br/>

       <table>
        <tr>
          <td>
            Filter by category<br/>
          </td>
          <td>
            <select name="Select"  @change="loadSubCategories($event.target.value)">
              <option selcted disabled>Choose category</option>
              <option v-for="category in categories" value={{category.id}}>
                {{category.pageType}}
              </option>
            </select>
          </td>

          <td v-if="subcats !== null">
            Filter by subcategory<br/>
          </td>
          <td>
            <select v-if="subcats !== null"  @change="loadAdverts($event.target.value)" >
              <option selcted disabled>Choose subcategory</option>
              <option v-for="subcat in subcats" value={{subcat.id}} >
                {{subcat.title}}
              </option>
            </select>
          </td>
        </tr>
       </table><br/><br/>

      Filter by advert type:<br/>
      <input type="radio" name="advtype" value ="all" @click="premiumAdv='all'" checked> All
      <input type="radio" name="advtype" value ="standard" @click="premiumAdv=false"> Standard
      <input type="radio" name="advtype" value ="premium" @click="premiumAdv=true"> Premium

      <br/><br/><br/>
      <ul v-sortable>
        <!--  v-if="(advert.isPremium === premiumAdv) || premiumAdv==='all' "-->
        <li v-for="advert in adverts">
          <a href="http://localhost:8080/#!/createAdvert?city=ch-lausanne&cat={{catId}}&subcat={{subcatId}}&advert={{advert.id}}">
            {{advert.name}}</a>
        </li>
      </ul>

  </div>
</template>
<!--  ========================= END OF THE TEMPLATE ====================-->
<script>
import store from '../services/Store.js'
import countryJS from '../services/Countries.js'

export default {
  data () {
    return {
      premiumAdv: 'all',
      currentCity: store,
      categories: null,
      subcats: null,
      adverts: null,
      catId: null,
      subcatId: null
    }
  },
  methods: {
    loadCategories (countryId, cityId) {
      this.categories = countryJS.getCategories(countryId, cityId)
    },
    loadSubCategories (catId) {
      this.subcats = countryJS.getSubCategories('ch', 'ch-lausanne', catId)
      this.catId = catId
    },
    loadAdverts (subcatId) {
      this.adverts = countryJS.getAdverts('ch', 'ch-lausanne', this.catId, subcatId)
      this.subcatId = subcatId
    }
  },
  ready () {
    this.loadCategories('ch', 'ch-lausanne')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #ffffff;
  background: #8C8C8C;
}
 .list-group-item{
        background: #bfbfbf;
        width: 300px;
        height:80px;
        margin-top:10px;
    }
</style>
