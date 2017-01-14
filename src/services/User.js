/* eslint-disable */

import axios from 'axios';

/**
 * The user class handles authentication
 */
class User {
  /**
   * Class constructor requires config
   *
   * @param {Object} config
   * @param {Function} loggedInCallback
   */
  constructor(config, loggedInCallback) {
    this.isLoggedIn = false;
    this.config = config;
    this.loggedInCallback = loggedInCallback;
    if (!config || !config.apiUrl) {
      throw new Error(`User class not sent correct config`);
    }
    this.userHttp = axios.create({
      baseURL: this.config.apiUrl.concat(`/users`),
      timeout: 10000
    });
  }

  /**
   * Logs the user in if correct auth data is passed, returns a promise
   *
   * @param {String} email
   * @param {String} password
   * @returns {Promise}
   */
  login(email, password) {
    return new Promise((resolve, reject) => {
      this.userHttp.post(`/login`, {
        email: email,
        password: password
      })
        .then((response) => {
          console.log(`Logged in response: ${response}`);
          const data = response.data;
          if (data.id && data.userId && data.ttl) {
            this.isLoggedIn = true;
            this.accessToken = data;
            this.userId = data.userId;
            this.userHttp.defaults.headers.common.Authorization = data.id;
            this.loggedInCallback(data.id);
            resolve(email)
          }
          else {
            console.log('Incorrect login data: ${data}');
            reject(new Error('Incorrect login data: ${data}'));
          }
        })
        .catch((error) => {
          console.log(error)
          console.log(`Error logging in: ${error.message} Status code ${error.response.status}`);
          reject(error.response);
        });

    });
  };

  /**
   * Logs the user out and removes auth data from user class
   *
   * @returns {Promise}
   */
  logout() {
    return new Promise((resolve, reject) => {
      this.userHttp.post(`/logout`)
        .then((response) => {
          console.log(`Logged out response: ${response}`);
          this.isLoggedIn = false;
          this.accessToken = null;
          this.userId = null;
          delete this.userHttp.defaults.headers.common.Authorization;
          resolve();
        })
        .catch((error) => {
          console.log(`Error logging out: ${error}`);
          reject(error);
        });

    });
  };
}

module.exports = User;
