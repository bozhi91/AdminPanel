/* eslint-disable */

import User from './User'
import Countries from './Countries_new'
import Cities from './Cities'
import config from '../config.json'

/**
 * Stores all data and handles requests
 */
class Store {
  /**
   * Class constructor creates all required instances
   *
   */
  constructor() {
    this.citiesService = new Cities(config);
    this.countriesService = new Countries(config, this.citiesService.getAddCity());
    this.userService = new User(config, (accessToken) => {
      this.data.loggedIn = true;
      this.countriesService.setAccessToken(accessToken);
      this.citiesService.setAccessToken(accessToken)
      let getAllCountries = this.countriesService.getAllCountries()
      getAllCountries.then(result => {
        console.log('data loaded', result[0]);
        this.data.dataLoaded = true
      })
    });
    this.data = {
      dataLoaded: false,
      loggedIn: false
    }
  }
}
module.exports = new Store();
