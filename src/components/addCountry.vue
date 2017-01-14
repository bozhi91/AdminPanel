<template>
  <div>

      Select Country<br/>
			<select name="countries">
        <option disabled selected>Select a country</option>
        <option value="bcn" v-for="country in countries">{{country.data.name}}</option>
      </select><br/><br/>

        <input placeholder="Countryname" v-model="countryName"/><br/><br/>
			  <input type="checkbox" v-model="langs.en && current.en"> English<br/>
			  <input type="checkbox" v-model="langs.fr"> French<br/>
			  <input type="checkbox" v-model="langs.de"> German<br/>
			  <input type="checkbox" v-model="langs.es"> Spanish<br/>

			  Intro <br/>
			  <div class="container">
				<ul class="tabs">
					<li v-if="langs.en && current.en" id="tab1-link-en" class="tab-link tab1-link current" @click="switchTab('tab1', 'en')">en</li>
					<li v-if="langs.fr" id="tab1-link-fr" class="tab-link tab1-link" @click="switchTab('tab1', 'fr')">fr</li>
					<li v-if="langs.de" id="tab1-link-de" class="tab-link tab1-link" @click="switchTab('tab1', 'de')">de</li>
					<li v-if="langs.es" id="tab1-link-es" class="tab-link tab1-link" @click="switchTab('tab1', 'es')">es</li>
				</ul>


          <div class="btn-toolbar" data-role="editor-toolbar" data-target="#editor">
          </div>

          <div v-if="langs.en" id="tab1-en" class="tab-content tab1 current">
					<textarea rows="4" cols="50" resize=false v-model="text">
						Textarea #
					</textarea> <br/><br/>
				</div>
				<div v-if="langs.fr" id="tab1-fr" class="tab-content tab1">
					<textarea rows="4" cols="50">
						Textarea #2
					</textarea> <br/><br/>
				</div>

				<div v-if="langs.de" id="tab1-de" class="tab-content tab1">
					<textarea rows="4" cols="50">
						Textarea #
					</textarea> <br/><br/>
				</div>

				<div v-if="langs.es" id="tab1-es" class="tab-content tab1">
					<textarea rows="4" cols="50">
						Textarea #4
					</textarea> <br/><br/>
				</div>
			</div>
			  Photo <br/>
			   <button>Upload</button>
			  <button @click="storeCountry(countryName)">Save</button><br/>
  	</div>


  <button type="button" @click="popup.setMessage('Hello World')" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Add Country</button>
  <popup msg="Error", title="Error" icon="error"></popup>

  <h2>TEXTAREA BELOW</h2>
  <div id="editor" class="well col-md-9">
    {{text}}
  </div>

  <div v-if="result"  style="color:#ff0000">
    Error! The country already exists!
  </div>
</template>

<script>
import $ from 'jquery'
import countriesJS from '../services/Countries.js'
import store from '../services/Store.js'
import popup from './Templates/popup'

export default {
  components: {
    popup,
    'vue-html-editor': require('vue-html-editor')
  },
  data () {
    return {
      text: '<h2>Hello World!</h2>',
      countries: store.countriesService.countries,
      countriesJS: countriesJS,
      countryName: '',
      result: false,
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
      console.log('Current: ' + this.current.lang + 'id: ' + lang)
    },
    storeCountry (countryName) {
      this.result = countriesJS.addCountry(countryName)
    },
    loadCountries () {
//      this.error = null
//      let getCountryPromise = store.countriesService.getCountryById('ch')
//      getCountryPromise.then(country => {
//      }).catch(err => {
//        console.log(err)
//        this.error = err.toString()
//      })
    }
  },
  ready () {
    this.loadCountries()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

body{
            margin-top: 0px !important;
            font-family: 'Trebuchet MS', serif;
            line-height: 1.6
        }
        .container{
            width: 800px;
            margin: 0 auto;
        }

        ul.tabs{
            margin: 0px;
            padding: 0px;
            list-style: none;
        }
        ul.tabs li{
            background: none;
            color: #222;
            display: inline-block;
            padding: 5px 5px;
            cursor: pointer;
        }

        ul.tabs li.current{
            background: #ededed;
            color: #222;
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
