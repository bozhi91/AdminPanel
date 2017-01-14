/* eslint-disable */

import _ from 'lodash';
import diff from 'deep-diff';

/**
 * Base class
 */
class Base {
  constructor(data) {
    /**
     * Initialise object with data
     *
     * @param data
     */
    this.init = (data) => {
      if (data) {
        this.data = _.cloneDeep(data);
        this.savedData = _.cloneDeep(data);
      }
    }

    /**
     * Checks if the current data has changed since last save
     *
     * @returns {*}
     */
    this.needsToSave = () => {
      return !_.isEqual(this.data, this.savedData);
    }

    /**
     * Get any changes between the current data and last savedData
     *
     * @returns {*}
     */
    this.getUpdates = () => {
      if (!this.needsToSave()){
        return null;
      }
      else {
        const differences = diff( this.savedData, this.data);
        const updateObject = {};
        _.forEach(differences, (change) => {
          diff.applyChange(updateObject, this.data, change);
        });

        return updateObject;
      }
    }

    /**
     * Set savedData to data after saving
     */
    this.afterSave = () => {
      this.savedData = _.cloneDeep(this.data);
    }

    this.getCategories = (baseId, cityId) => {
      return this.getCityById(countryId, cityId)._pages;
    }

    this.getCatById = (countryId, cityId, catId) => {
      let category = this.getCityById(countryId, cityId);
      return category._pages.find((c) => {
        return c.id === catId;
      })
    }

    this.data = {};
    this.savedData = {};
    this.init(data);
  }


}

module.exports = Base;
