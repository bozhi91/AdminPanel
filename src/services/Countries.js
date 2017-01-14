/* eslint-disable */
import store from './Store.js';
import _ from 'lodash'

class CountriesLocal {
  constructor(){
    this.countries = store.countriesService.countries;

    this.getCountries = () => {
      return store.countriesService.countries;
    }

    // cid -> country ID
    this.getCountryById = (cid) => {
      return this.countries.find((c) => {
        return c.data.id === cid;
      }).data;
    }

    // ============================ CITIES ============================
      this.getCities = (country) => {
        return this.getCountryById(country).data.cities;
      }

      this.getCityById = (cid,cityId) => {
        let country = this.getCountryById(cid);
        return country.cities.find((c) => {
          return c.id === cityId;
        })
      }
    // ============================ CITIES ============================

    // ============================ CATEGORIES ============================
      this.getCategories = (countryId, cityId) => {
        return this.getCityById(countryId, cityId)._pages;
      }

      this.getCatById = (countryId, cityId, catId) => {
        let category = this.getCityById(countryId, cityId);
        return category._pages.find((c) => {
          return c.id === catId;
        })
      }
    // ============================ CATEGORIES ============================


// ============================ SUBCATEGORIES ============================
    this.getSubCategories = (countryId, cityId, catId) => {
      return this.getCatById(countryId, cityId,catId)._sections;
    }

    this.getSubCategoriesById = (countryId, cityId, catId, subCatId) => {
      let category = this.getCatById(countryId, cityId, catId);
      return category._sections.find((c) => {
        return c.id === subCatId;
      })
    }
// ============================ SUBCATEGORIES ============================

// ============================ ADVERTS ===================================
    this.getAdverts = (countryId, cityId, catId, subCatId) => {
      return this.getSubCategoriesById(countryId, cityId,catId,subCatId)._adverts;
    }

    this.getAdvertById = (countryId, cityId, catId, subCatId, advertId) => {
      let advert = this.getSubCategoriesById(countryId, cityId, catId, subCatId);
      return advert._adverts.find((a) => {
        return a.id === advertId;
      })
    }
// ============================ ADVERTS ====================================

  }
  // ============================ END OF CONSTRUCTOR ============================

//Check if an array has a element
  hasElement(array,newItem){
    return array.includes(newItem);
  }

  //Returns all the countries in our JSON array

/*

  //Main Category by id

  //pid = Page id
  getPageById(countryId,pid){
    let pages = cityAdverts;
    return pages.find((p) => {
      return p.id === pid;
    });
  }

  addCountry(countryName){
    let names = _.map(countries, 'name')
    if(!this.hasElement(names,countryName)){
      this.countries.push({name : countryName, city:[]});
    }
    else{return true}
  }

  addCity(cityName,countryName){
    let country = this.getCountry(countryName)
    let names = _.map(country.city,'name')

   if(!this.hasElement(names,cityName)){
      country.city.push({name: cityName})
    }
    else{return true}
  }

 //Subcat
 getSection(pid, sid){
   let page = this.getPage(pid);
    return page._sections.find((s) => {
      return s.id === sid;
   })
 }

 getAdvert(pid, sid, aid){
   let section = this.getSection(pid, sid);
   return section._largeAdverts.find((a) => {
     return a.id === aid;
   })
 }*/

  createAdvert(sid, pid, advert){
    let sect = this.getSection(pid, sid);
    sect._largeAdverts.push(advert)
  }
  createSubcat(catId, subcat){
    let page = this.getPage(catId);
    page._sections.push(subcat);
  }
/*
  getCountries(fakeError){
   return new Promise((resolve, reject) => {
    if (!fakeError) {
      resolve(countries);
             } else {
                reject(new Error('Test error!!!'));
            }
          });
      }*/

}module.exports = new CountriesLocal();
