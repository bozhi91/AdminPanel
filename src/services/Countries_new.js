/* eslint-disable */
import axios from 'axios';
import Country from './Country';

/**
 * The Countries class
 */
class Countries {

  /**
   * Class constructor requires config, access token is optional
   *
   * @param {Object} config
   * @param {String} accessToken
   */
  constructor(config, addCity, accessToken) {
    this.classValidator = (country) => {
      return country ? true : false;
    };

    if (!config || !config.apiUrl) {
      throw new Error(`Countries class not sent correct config`);
    }
    this.config = config;
    this.countries = [];
    this.addCity = addCity;
    this.data = {};
    this.authenticated = false;
    this.http = axios.create({
      baseURL: this.config.apiUrl.concat(`/exploreCountries`),
      timeout: 5000
    });
    if (accessToken) {
      this.setAccessToken(accessToken);
    }
  }
  Countries(){}
  /**
   * Sets the access token, and sets authenticated to true
   *
   * @param accessToken
   */
  setAccessToken(accessToken) {
    this.http.defaults.headers.common.Authorization = accessToken;
    this.authenticated = true;
  }

  /**
   * If authenticated is not true then cant send requests
   *
   * @returns {Error}
   */
  isAuthenticated() {
    if (!this.authenticated) {
      return new Error(`Access token not set`);
    }
  }


  /**
   * Adds a country
   *
   * @param {Object} data
   * @returns {Country}
   */
  addCountry(data) {
    const country = new Country(data);
    this.countries.push(country);
    return country;
  }

  /**
   * Create a country
   *
   * @param data
   * @returns {Promise}
   */
  createCountry(data) {
    const isAuthenticatedError = this.isAuthenticated();
    if (isAuthenticatedError) {
      return Promise.reject(isAuthenticatedError);
    }
    if (!this.classValidator(data)) {
      return Promise.reject(new Error(`Data not valid`));
    }
    else {
      return new Promise((resolve, reject) => {
        this.http.post(`/`, data)
          .then((response) => {
            const country = this.addCountry(response.data);
            resolve(country);
          })
          .catch((error) => {
            console.log(`Error creating Country: ${error}`);
            reject(error);
          });
      });
    }
  }
  /**
   * Gets a country by id, doesn't need to be authenticated for this
   *
   * @param {String} id
   * @param {Boolean} includeCities
   * @returns {Promise}
   */
  getCountryById(id, includeCities = true) {
    let country = _.find(this.countries, (country) => {
      return country.data.id === id;
    });
    if (country) {
      return Promise.resolve(country);
    }
    else {
      return new Promise((resolve, reject) => {
        let url = `/${id}`;
        if (includeCities) {
          url = `${url}?filter[include]=cities`
        }
        this.http.get(url)
          .then((response) => {
            console.log('coutnrues',this,this.addCity)
            const country = new Country(response.data, this.addCity);
            this.countries.push(country);
            resolve(country);
          })
          .catch((error) => {
            console.log(`Error getting Country: ${error}`);
            reject(error);
          });

      });
    }
  }

  getAllCountries(includeCities = true){
    console.log(this)
    let country = this.countries.data;
    if (country) {
      return Promise.resolve(country);
    }
    else {
      return new Promise((resolve, reject) => {
        let url = '/';
        if (includeCities) {
          url = `${url}?filter[include]=cities`
        }
        this.http.get(url)
          .then((response) => {
            response.data.forEach(country => {
              this.countries.push(new Country(country, this.addCity));
            })
            resolve(this.countries);
          })
          .catch((error) => {
            console.log(`Error getting Country: ${error}`);
            reject(error);
          });

      });
    }
  }

  /**
   * Updates a country by id
   *
   * @param {String} id
   * @returns {Promise}
   */
  updateCountryById(id) {
    const isAuthenticatedError = this.isAuthenticated();
    if (isAuthenticatedError) {
      return Promise.reject(isAuthenticatedError);
    }
    let country = _.find(this.countries, (country) => {
      return country.data.id === id;
    });
    if (!country) {
      return Promise.reject(new Error(`Country not loaded`));
    }
    else {
      const updates = country.getUpdates();
      if (!updates) {
        return Promise.reject(new Error(`Nothing to update`));
      }
      else {
        return new Promise((resolve, reject) => {
          this.http.put(`/${country.data.id}`, updates)
            .then((response) => {
              country.afterSave();
              resolve();
            })
            .catch((error) => {
              console.log(`Error saving Country: ${error}`);
              reject(error);
            });
        });
      }
    }
  }

  /**
   * Deletes a country by id
   *
   * @param {String} id
   * @returns {Promise}
   */
  deleteCountryById(id) {
    const isAuthenticatedError = this.isAuthenticated();
    if (isAuthenticatedError) {
      return Promise.reject(isAuthenticatedError);
    }
    let country = _.find(this.countries, (country) => {
      return country.data.id === id;
    });
    if (!country) {
      return Promise.reject(new Error(`Country not loaded`));
    }
    else {
      return new Promise((resolve, reject) => {
        this.http.delete(`/${country.data.id}`)
          .then((response) => {
            this.countries.splice(this.countries.indexOf(country), 1);
            resolve();
          })
          .catch((error) => {
            console.log(`Error deleting Country: ${error}`);
            reject(error);
          });
      });
    }
  };
}

module.exports = Countries;
