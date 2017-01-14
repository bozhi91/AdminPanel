/* eslint-disable */
class City {

 constructor() {
  this.city = {
    name: "Barcelona"
  }
 }

  getCity(){
    return this.city;
  } 
  setCity(cityName){
    this.city = cityName;
  }
 
}module.exports = new City();