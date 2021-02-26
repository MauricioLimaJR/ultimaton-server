'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FavouriteCharacterSchema extends Schema {
  up () {
    this.create('favourite_characters', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('character_id')
        .unsigned()
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('favourite_characters')
  }
}

module.exports = FavouriteCharacterSchema
