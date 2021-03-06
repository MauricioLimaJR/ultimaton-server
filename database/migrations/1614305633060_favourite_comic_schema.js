'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FavouriteComicSchema extends Schema {
  up () {
    this.create('favourite_comics', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('comic_id')
        .unsigned()
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('favourite_comics')
  }
}

module.exports = FavouriteComicSchema
