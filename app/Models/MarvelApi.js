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

  static async getCharacterById(id) {
    const apiResponse = await api.get(`/v1/public/characters/${id}`)

    return apiResponse.data.data.results
  }

  static async getCharacterComics(id) {
    const apiResponse = await api.get(`/v1/public/characters/${id}/comics`)

    return apiResponse.data.data.results
  }

  static async getCharacters(query, limit) {
    const apiResponse = await api.get(
      `/v1/public/characters?nameStartsWith=${query}&limit=${limit}`
    )

    return apiResponse.data.data.results
  }

  static async getComicById(id) {
    const apiResponse = await api.get(`/v1/public/comics/${id}`)

    return apiResponse.data.data.results
  }

  static async getComicCharacters(id) {
    const apiResponse = await api.get(`/v1/public/comics/${id}/characters`)

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
