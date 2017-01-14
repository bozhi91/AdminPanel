/* eslint-disable */
import _ from 'lodash';
import diff from 'deep-diff';
import Base from './Base'

/**
 * City class
 */
class City extends Base{
  constructor(data) {
    super(data)

    this.getCities = () => {
      return this.data;
    }

    this.getCategories = () => {
      return this.data._pages;
    }

    this.getCatById = (catId) => {
      return this.getCategories().find((c) => {
        return c.id == catId;
      })
    }

    this.getSubCategories = (catId) => {
      return this.getCatById(catId)._sections;
    }

    this.getSubCategoriesById = (catId, subCatId) => {
      let category = this.getCatById(catId);
      return category._sections.find((c) => {
        return c.id == subCatId;
      })
    }

    this.getAdverts = (catId, subCatId) => {
      return this.getSubCategoriesById(catId,subCatId)._adverts;
    }

    this.getAdvertById = (catId, subCatId, advertId) => {
      let subCat = this.getSubCategoriesById(catId, subCatId);
      if (!subCat) {
        return null
      }
      return subCat._adverts.find((a) => {
        return a.id == advertId;
      })
    }
  }
}

module.exports = City;
