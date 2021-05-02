'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const MarvelApi = use('App/Models/MarvelApi')

const { COMMON } = require('../../constants/errors')

const charactersListParser = (list) =>
  list.map((character) => {
    const { id, name, description, thumbnail } = character
    return { id, name, description, thumbnail }
  })

const comicsListParser = (list) =>
  list.map((comic) => {
    const { id, title, description, thumbnail } = comic
    return { id, title, description, thumbnail }
  })

class MarvelController {
  /**
   * Search characters and comics
   * GET marvel
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async initialSet({ request, response }) {
    try {
      const { offset = 0, limit = 20 } = request.get()

      const charactersAndComics = await MarvelApi.getInitialSet(offset, limit)
      console.log(charactersAndComics)
      const initialSet = {
        characters: charactersListParser(charactersAndComics.characters),
        comics: comicsListParser(charactersAndComics.comics),
      }

      return response.status(200).send(initialSet)
    } catch (err) {
      console.error(err)
      return response.status(500).send({ error: COMMON })
    }
  }

  /**
   * Search characters and comics
   * GET marvel
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async search({ request, response }) {
    try {
      const { query, characters, comics, limit = 4 } = request.get()

      let charactersList = []
      let comicsList = []

      if (characters) {
        const charactersQueried = await MarvelApi.getCharacters(query, limit)
        charactersList = charactersListParser(charactersQueried)
      }

      if (comics) {
        const comicsQueried = await MarvelApi.getComics(query, limit)
        comicsList = comicsListParser(comicsQueried)
      }

      return response.status(200).send({ charactersList, comicsList })
    } catch (err) {
      console.error(err)
      return response.status(500).send({ error: COMMON })
    }
  }
}

module.exports = MarvelController
