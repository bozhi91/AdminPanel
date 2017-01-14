/**
 * Created by bozhi on 7/10/16.
 */

module.exports = () => {
  return {
    name: null,
    id: null,
    isPremium: null,
    text: null,
    phone: null,
    url: null,
    imageUrl: null,
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
      addrLine1: 'test',
      addrLine2: null,
      city: null,
      state: null,
      postcode: null,
      country: null,
      numAdverts: null,
      advertId: null,
      advert: null
    }
  }
}
