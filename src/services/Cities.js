/* eslint-disable */
import axios from 'axios';
import City from './City';

/**
 * The Cities class
 */
class Cities {
  /**
   * Class constructor requires config, access token is optional
   *
   * @param {Object} config
   * @param {String} accessToken
   */
  constructor(config, accessToken) {
    this.classValidator = (city) => {
      return city ? true : false;
    };

    if (!config || !config.apiUrl) {
      throw new Error(`Cities class not sent correct config`);
    }
    this.config = config;
    this.data = {};
    this.cities = []
    this.self = this
    this.authenticated = false;
    this.http = axios.create({
      baseURL: this.config.apiUrl.concat(`/exploreCities`),
      timeout: 5000
    });
    if (accessToken) {
      this.setAccessToken(accessToken);
    }
  }

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

  getAddCity() {
    return (data) => {
      return this.addCity(data)
    }
  }

  /**
   * Adds a city
   *
   * @param {Object} data
   * @returns {City}
   */
  addCity(data) {
    const city = new City(data);
    this.cities.push(city);
    return city;
  }

  /**
   * Gets all cities
   *
   * @returns {Promise}
   */
  getCities(){
   return this.cities;
  }

  /**
   * Updates a page by id
   *
   * @param {String} cityId
   * @param {String} pageId
   * @returns {Promise}
   */
  updatePageById(cityId, pageId) {
    const isAuthenticatedError = this.isAuthenticated();
    if (isAuthenticatedError) {
      return Promise.reject(isAuthenticatedError);
    }
   /* let city = this.cities.find(city => {
      return city.data.id === cityId;
    });
    if (!city) {
      return Promise.reject(new Error(`City not loaded`));
    }
    let page = city.data._pages.find(page => {
      return page.id === pageId;
    });*/
   let page = getPageById(cityId, pageId);
    if (!page) {
      return Promise.reject(new Error(`Page not loaded`));
    }
    else {
      // Don't send sections as too big a payload, use update section function
      delete page._sections;
      return new Promise((resolve, reject) => {
        this.http.put(`/${cityId}/pages/${pageId}`, page)
          .then((response) => {
            console.log('done',response);
            //city.afterSave();
            resolve();
          })
          .catch((error) => {
            console.log(`Error saving Page: ${error}`);
            reject(error);
          });
      });
    }
  }

  /**
   * Updates a section by id
   *
   * @param {String} cityId
   * @param {String} pageId
   * @param {String} sectionId
   * @returns {Promise}
   */
  updateSectionById(cityId, pageId, sectionId) {
    const isAuthenticatedError = this.isAuthenticated();
    if (isAuthenticatedError) {
      return Promise.reject(isAuthenticatedError);
    }
    // let city = this.cities.find(city => {
    //   return city.data.id === cityId;
    // });
    // if (!city) {
    //   return Promise.reject(new Error(`City not loaded`));
    // }
    // let page = city.data._pages.find(page => {
    //   return page.id === pageId;
    // });
    // if (!page) {
    //   return Promise.reject(new Error(`Page not loaded`));
    // }
    let section = getSectionById(cityId, pageId, sectionId);
    if (!section) {
      return Promise.reject(new Error(`Section not loaded`));
    }
      else {
        return new Promise((resolve, reject) => {
          this.http.put(`/${cityId}/pages/${pageId}/sections/${sectionId}`, section)
            .then((response) => {
              console.log('done',response);
             // city.afterSave();
              resolve();
            })
            .catch((error) => {
              console.log(`Error saving Section: ${error}`);
              reject(error);
            });
        });
      }
  }

  /**
   * createPage
   *
   * @param {String} cityId
   * @param {Object} page
   * @returns {Promise}
   */
  addPage(cityId, page) {
    const isAuthenticatedError = this.isAuthenticated();
    if (isAuthenticatedError) {
      return Promise.reject(isAuthenticatedError);
    }
    return new Promise((resolve, reject) => {
      this.http.post(`/${cityId}/pages`, page)
        .then((response) => {
          console.log('done',response);
          resolve();
        })
        .catch((error) => {
          console.log(`Error creating page: ${error}`);
          reject(error);
        });
    });
  }

  /**
   * createSection
   *
   * @param {String} cityId
   * @param {String} pageId
   * @param {Object} section
   * @returns {Promise}
   */
  addSection (cityId, pageId, section) {
    const isAuthenticatedError = this.isAuthenticated();
    if (isAuthenticatedError) {
      return Promise.reject(isAuthenticatedError);
    }
    return new Promise((resolve, reject) => {
      this.http.post(`/${cityId}/pages/${pageId}/sections`, section)
        .then((response) => {
          console.log('done',response);
          resolve();
        })
        .catch((error) => {
          console.log(`Error creating section: ${error}`);
          reject(error);
        });
    });
  }


  /************************************* ADVERTS *************************************************************/
  /**
   * createAdvert
   *
   * @param {String} cityId
   * @param {String} pageId
   * @param {String} sectionId
   * @param {Object} advert: The advert itself
   * @returns {Promise}
   */
  addAdvert(cityId, pageId, sectionId, advert) {
    const isAuthenticatedError = this.isAuthenticated();
    if (isAuthenticatedError) {
      return Promise.reject(isAuthenticatedError);
    }
    return new Promise((resolve, reject) => {
      this.http.post(`/${cityId}/pages/${pageId}/sections/${sectionId}/adverts`, advert)
        .then((response) => {
          console.log('done',response);
          // get section
          resolve();
        })
        .catch((error) => {
          console.log(`Error creating advert: ${error}`);
          reject(error);
        });
    });
  }

  /**
   * Updates a advert by id
   *
   * @param {String} cityId
   * @param {String} pageId
   * @param {String} sectionId
   * @param {String} advertId
   * @returns {Promise}
   */
  updateAdvertById(cityId, pageId, sectionId, advertId) {
    const isAuthenticatedError = this.isAuthenticated();
    if (isAuthenticatedError) {
      return Promise.reject(isAuthenticatedError);
    }
    let advert = this.getAdvertById(cityId, pageId, sectionId, advertId);
    if (!advert) {
      return Promise.reject(new Error(`Advert not loaded`));
    }
    else {
      return new Promise((resolve, reject) => {
        console.log('advert update', advert);
        this.http.put(`/${cityId}/pages/${pageId}/sections/${sectionId}/adverts/${advertId}`, advert)
          .then((response) => {
            console.log('done',response);
            resolve();
          })
          .catch((error) => {
            console.log(`Error saving Advert: ${error}`);
            reject(error);
          });
      });
    }
  }

/************************************* ADVERTS *************************************************************/

getAdvertById(cityId, pageId, sectionId, advertId){
  let section = this.getSectionById(cityId,pageId,sectionId)
  if (section instanceof Error) {
    return section;
  }
  console.log('section found', section)
  let advert = section._adverts.find(advert => {
    return advert.id === advertId;
  });
  if (advert) {
    return advert;
  } else {
    return new Error('Advert not loaded')
  }
}

//subcategory
getSectionById(cityId, pageId, sectionId){
  let page = this.getPageById(cityId,pageId)
  if (page instanceof Error) {
    return page;
  }
  let section = page._sections.find(section => {
    return section.id === sectionId;
  });
  if (section) {
    return section;
  } else {
    return new Error('Section not loaded')
  }
}

//Category
getPageById(cityId, pageId){
      let city = this.getCityByIdLocal(cityId)
      if (city instanceof Error) {
        return city;
      }
      let page = city.data._pages.find(city => {
        return city.id === pageId;
      });
  if (page) {
    return page;
  } else {
    return new Error('Page not loaded')
  }
}

  getCityByIdLocal(id) {
    let city = this.cities.find(city => {
      return city.data.id === id;
    });
    if (city) {
      return city;
    } else {
      return new Error('City not loaded')
    }
  }

/************************************* CITIES *************************************************************/

  /**
   * Gets a city by id, doesn't need to be authenticated for this
   *
   * @param {String} id
   * @returns {Promise}
   */
  getCityById(id) {
    let city = this.cities.find(city => {
      return city.data.id === id;
    });
    if (city) {
      return Promise.resolve(city);
    }
    else {
      return new Promise((resolve, reject) => {
        this.http.get(`/${id}`)
          .then((response) => {
            const city = new City(response.data);
            this.cities.push(city);
            resolve(city);
          })
          .catch((error) => {
            console.log(`Error getting City: ${error}`);
            reject(error);
          });

      });
    }
  }
  /**
   * Updates a city by id
   *
   * @param {String} id
   * @returns {Promise}
   */
  updateCityById(id) {
    const isAuthenticatedError = this.isAuthenticated();
    if (isAuthenticatedError) {
      return Promise.reject(isAuthenticatedError);
    }
    let city = this.cities.find(city => {
      return city.data.id === id;
    });
    if (!city) {
      return Promise.reject(new Error(`City not loaded`));
    }
    else {
      const updates = city.getUpdates();
      if (!updates) {
        return Promise.reject(new Error(`Nothing to update`));
      }
      else {
        console.log('city update',updates);
        return new Promise((resolve, reject) => {
          this.http.put(`/${city.data.id}`, updates)
            .then((response) => {
              city.afterSave();
              resolve();
            })
            .catch((error) => {
              console.log(`Error saving City: ${error}`);
              reject(error);
            });
        });
      }
    }
  }

  /**
   * Create a city
   *
   * @param data
   * @returns {Promise}
   */
  createCity(data) {
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
            const city = this.addCity(response.data);
            resolve(city);
          })
          .catch((error) => {
            console.log(`Error creating City: ${error}`);
            reject(error);
          });
      });
    }
  }
  /**
   * Deletes a city by id
   *
   * @param {String} id
   * @returns {Promise}
   */
  deleteCityById(id) {
    const isAuthenticatedError = this.isAuthenticated();
    if (isAuthenticatedError) {
      return Promise.reject(isAuthenticatedError);
    }
    let city = this.cities.find(city => {
      return city.data.id === id;
    });
    if (!city) {
      return Promise.reject(new Error(`City not loaded`));
    }
    else {
      return new Promise((resolve, reject) => {
        this.http.delete(`/${city.data.id}`)
          .then((response) => {
            this.cities.splice(this.cities.indexOf(city), 1);
            resolve();
          })
          .catch((error) => {
            console.log(`Error deleting City: ${error}`);
            reject(error);
          });
      });
    }
  };
  /************************************* CITIES *************************************************************/
}

module.exports = Cities;
