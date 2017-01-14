
//This is our template. It is include in the file ''
<template>
       Title<br/>
      <textarea v-model="advert.name" rows="3" cols="100"></textarea><br/><br/>
       Text<br/>
      <textarea v-model="advert.text"  rows="3" cols="100"></textarea><br/><br/>

  <!--================= BOOTSTRAP TABLE =================-->
  <div class="container">
    <table  v-for="day in adverts.weekdays" class="table table-hover">
      <thead>
        <tr>
          <th colspan=2><input type="checkbox" v-model="day.open">Open on  {{day.day}}s?</input></th>
        </tr>
      </thead>
      <tbody>
      <!-- ================  Open on.. group ================= -->
        <tr v-if="day.open">
          <td>{{day.day}}s opening time<input placeholder="hh:mm" v-model="day.openingTime"></td>
          <td>{{day.day}}s closing time<input placeholder="hh:mm" v-model="day.closingTime"></td>
        </tr>
      <!-- ================  End of Open of... group ================= -->

      <!-- ================  Close for.. group ================= -->
        <tr>
          <th colspan=2 v-if="day.open">
            <input  v-model="day.closedAtLunch" type="checkbox">Closed for lunch on  {{day.day}}s?</input>
          </th>
        </tr>
        <tr v-if="day.closedAtLunch && day.open">
          <td>{{day.day}} lunch start time<input placeholder="hh:mm" v-model="day.lunchOpeningTime"></td>
          <td>{{day.day}} lunch finish time<input placeholder="hh:mm" v-model="day.lunchClosingTime"></td>
        </tr>
      <!-- ================  End of: "Close for... group ================= -->
      </tbody>
    </table>
  </div><br/><br/>
  <!--------------- END OF TABLE  --------------------->
  <validator name="validation">
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th colspan=2>Advert Information</th>
        </tr>
      </thead>
      <tbody>

      <tr>
        <td>Address line 1<br/><input v-model=advert._address.addressLine1></td>
        <td>Address line 2<br/><input v-model=advert._address.addressLine2></td>
      </tr>
      <tr>
        <td>City<br/><input v-model=advert._address.city></td>
        <td>PostCode<br/><input v-model=advert._address.postcode></td>
      </tr>

      <tr>
        <td>Local phone number<br/><input v-model=advert.phone></td>
        <td>Website URL<br/><input v-model=advert.url></td>
      </tr>

        <tr> <td colspan=2><button>Upload Photo</button></td></tr>
        <tr> <td colspan=2><button>Add Shop branch</button></td></tr>
        <tr> <td colspan=2>

          <button type="button" data-toggle="modal" data-target="#myModal" @click="storeAdvert()">Save Advert</button>

          <button @click="createAdvert()"> Create Advert</button>

        </td></tr>
      </tbody>
    </table>
  </div>
      <!-- Here we place all the error messages -->
      <div class="errors">
       <!-- <p v-if="$validation.name.required">{{errorMsg[0]}}</p>-->

      </div>
     <!-- <div v-if="stored">
        <popup></popup>
      </div>
-->
    <div v-if="stored">
      <h2>Advert stored successfuly</h2>
    </div>
    <div v-if="error">
      <h2>Advert storing error</h2>
    </div>

      <div v-for="day in adverts.weekdays">
          {{day.openingTime}}
      </div>
    <div>

    </div>

    /////////// var-:{{var | json}}  ////////////


      <button @click="check()">12345</button>

  </validator>
</template>
<!--  ========================= END OF THE TEMPLATE ====================-->

<script type="text/babel">
import subcategories from './JSON/subcategories.json'
import createAdv from './JSON/cityAdverts.json'
import countriesJS from '../services/Countries.js'
import Store from '../services/Store'

export default {
  data () {
    return {
      var: null,
      loading: false,
      stored: false,
      storeError: false,
      subcategories: subcategories,
      adverts: null,
      createAdv: createAdv,
      countriesJS: countriesJS,
      section: null,
      errorMsg: ['Error! The field <Address line 1> is required'],
      advert: {
        name: '',
        isPremium: false,
        text: '',
        phone: '',
        url: '',
        imageUrl: '',
        weekdays: {
          'monday': {
            day: 'Monday',
            open: true,
            openingTime: '09:00',
            closingTime: '18:00',
            closedAtLunch: false,
            lunchOpeningTime: '12:00',
            lunchClosingTime: '14:00'
          }
        },
        _address: {
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          postcode: '',
          country: ''
        }
      },
      advertJSON: {
        name: '',
        isPremium: false,
        text: '',
        phone: '',
        url: '',
        imageUrl: '',
        weekdays: {
          'monday': {
            day: 'Monday',
            open: true,
            openingTime: '09:00',
            closingTime: '18:00',
            closedAtLunch: false,
            lunchOpeningTime: '12:00',
            lunchClosingTime: '14:00'
          }
        },
        address: {
          addrLine1: '',
          addrLine2: '',
          city: '',
          state: '',
          postcode: '',
          country: '',
          numAdverts: '0',
          advertId: null,
          advert: null
        }
      }
    }
  },
  methods: {
    check () {
      this.var = Store.citiesService.getPageById('ch-lausanne', 'd518d982144b68c82f6574b2')
      console.log('tadasdasd0' + this.var)
    },
    createAdvert () {
      let saveSectionPromise = Store.citiesService.addAdvert(this.$route.query.city,
        this.$route.query.cat, this.$route.query.subcat, this.advert)
      saveSectionPromise.then(result => {
        this.stored = true
      }).catch(error => {
        console.log(error)
        this.storeError = true
      })
    },
    storeAdvert () {
      let saveSectionPromise = Store.citiesService.updateAdvertById(this.$route.query.city,
        this.$route.query.cat, this.$route.query.subcat, this.$route.query.advert)
      saveSectionPromise.then(result => {
        this.stored = true
      }).catch(error => {
        console.log(error)
        this.storeError = true
      })
    },
    loadAdvert () {
      let getCityPromise = Store.citiesService.getCityById(this.$route.query.city)
      getCityPromise.then(city => {
        this.loading = true
        let advert = city.getAdvertById(this.$route.query.cat, this.$route.query.subcat, this.$route.query.advert)
        if (!advert) {
         // show error
        } else {
          this.loading = false
          this.advert = advert
        }
      }).catch(err => {
        this.error = err.status
        this.logged = false
      })
    }
  },
  validators: {
    numeric: function (val) {
      return /[0-9]$/.test(val)
    }
  },
  ready () {
    this.loadAdvert()
  }
//  computed: {
//    advert () {
//      let query = this.$route.query
//      if (query.pid && query.sid && query.aid) {
//        let pid = this.$route.query.pid
//        let sid = this.$route.query.sid
//        let aid = this.$route.query.aid
//        this.adverts = countriesJS.getAdvert(pid, sid, aid)
//        this.loadAdvert()
//        return this.adverts
//      } else {
//        return null
//      }
//    }
//  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1 {
  color: #ffffff;
  background: #8C8C8C;
}
 .list-group-item{
        background: #bfbfbf;
        width: 300px;
        height: 50px;
        margin-top:10px;
    }

.customTable{
  padding-bottom: 20px;
}

tr{
  background: #efefef;
}

.errors {
  color: #f00;
}
</style>
