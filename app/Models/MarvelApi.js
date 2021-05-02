'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const api = require('../../config/marvelApi')

class MarvelApi extends Model {
  static async getInitialSet(offset, limit) {
    const apiCharactersResponse = await api.get(
      `/v1/public/characters?offset=${offset}&limit=${limit}&orderBy=-modified`
    )

    const apiComicsResponse = await api.get(
      `/v1/public/comics?offset=${offset}&limit=${limit}&orderBy=-modified`
    )

    const characters = apiCharactersResponse.data.data.results
    const comics = apiComicsResponse.data.data.results

    return { characters, comics }
  }

  static async getCharacters(query, limit) {
    const apiResponse = await api.get(
      `/v1/public/characters?nameStartsWith=${query}&limit=${limit}`
    )

    return apiResponse.data.data.results
  }

  static async getComics(query, limit) {
    const apiResponse = await api.get(
      `/v1/public/comics?titleStartsWith=${query}&limit=${limit}`
    )

    return apiResponse.data.data.results
  }
}

module.exports = MarvelApi
