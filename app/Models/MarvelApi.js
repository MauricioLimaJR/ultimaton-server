'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const api = require('../../config/marvelApi')

class MarvelApi extends Model {
  static async getCharacters(query, limit) {
    const apiResponse = await api.get(
      `/v1/public/characters?nameStartsWith=${query}&limit=${limit}/`
    )

    return apiResponse
  }

  static async getComics(query, limit) {
    const response = await api.get(
      `/v1/public/comics?titleStartsWith=${query}&limit=${limit}`
    )

    return response
  }
}

module.exports = MarvelApi
