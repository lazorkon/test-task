/**
 * Wrapper for jsonplaceholder.typicode.com service
 */

'use strict';

import request from 'request';
import Promise from 'bluebird';
import {HTTPError} from '../exception';

const requestPromise = Promise.promisify(request);
const BASE_API_URL = 'https://jsonplaceholder.typicode.com/';
const KNOWN_RESOURCES = ['posts', 'comments', 'albums', 'photos', 'todos', 'users'];

function prepareResponse(response) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return JSON.parse(response.body);
  }
  return Promise.reject(new HTTPError(response.statusCode, `API Request Failed with code ${response.statusCode}`));
}

class Wrapper {
  constructor() {
    /**
     * @see KNOWN_RESOURCES
     * @type {String}
     */
    this.resource = null;
  }

  /**
   * @param {Object?} qs Query String Data
   * @returns {*}
   */
  list(qs) {
    qs = qs || {};
    return this.apiUrlPromise()
      .then(url => requestPromise({url, qs}))
      .then(prepareResponse);
  }

  read(id) {
    return this.apiUrlPromise(id)
      .then(url => requestPromise({url}))
      .then(prepareResponse);
  }

  create(formData) {
    return this.apiUrlPromise()
      .then(url => requestPromise({url, formData}))
      .then(prepareResponse);
  }

  /**
   *
   * @param {Number|String?} id
   * @returns {*}
   */
  apiUrlPromise(id) {
    if (KNOWN_RESOURCES.indexOf(this.resource) === -1) {
      return Promise.reject(new Error(`Unknown resource type "${this.resource}"`));
    }
    return Promise.resolve(BASE_API_URL + this.resource + (id ? '/' + id : ''));
  }

}

export default Wrapper;
