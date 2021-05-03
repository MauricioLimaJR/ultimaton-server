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

  /**
   * Search marvel's character
   * GET marvel
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async searchCharacter({ params, response }) {
    try {
      const { id } = params

      const characterResponse = await MarvelApi.getCharacterById(id)
      const characterComicsResponse = await MarvelApi.getCharacterComics(id)

      const character = charactersListParser(characterResponse)[0]
      character.relatedItems = comicsListParser(characterComicsResponse)

      return response.status(200).send(character)
    } catch (err) {
      console.error(err)
      return response.status(500).send({ error: COMMON })
    }
  }

  /**
   * Search marvel's comic
   * GET marvel
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async searchComic({ params, response }) {
    try {
      const { id } = params

      const comicResponse = await MarvelApi.getComicById(id)
      const comicCharactersResponse = await MarvelApi.getComicCharacters(id)

      const comic = comicsListParser(comicResponse)[0]
      comic.relatedItems = charactersListParser(comicCharactersResponse)

      return response.status(200).send(comic)
    } catch (err) {
      console.error(err)
      return response.status(500).send({ error: COMMON })
    }
  }
}

module.exports = MarvelController
