/* eslint-disable */

import _ from 'lodash';
import diff from 'deep-diff';
import Base from './Base'

/**
 * Country climportass
 */
class Country extends Base {
  constructor(data, addCity) {
    super(data);

    console.log('add city country ', addCity)
    this.addCity = addCity
    /**
     * Initialise country with data
     *
     * @param data
     */
    this.init = (data) => {
      if (data) {
        console.log(this.addCity)
        this.data = _.cloneDeep(data);
        this.savedData = _.cloneDeep(data);
        if (this.data.cities && this.data.cities.length){
          this.data.cities.forEach(city => {
            console.log('country', this)
            this.addCity(city);
          })
        }
      }
    }

    this.init(data)
  }


}

module.exports = Country;
