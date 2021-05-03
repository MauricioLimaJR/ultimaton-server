'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Ultimaton Server, welcome!' }
})

// User routes
Route.post('/users', 'UserController.store')
Route.get('/users', 'UserController.show').middleware('auth')
Route.put('/users', 'UserController.update').middleware('auth')

// Session routes
Route.post('/sessions', 'SessionController.create')

// Search routes
Route.get('/marvel/initial-set', 'MarvelController.initialSet')
Route.get('/marvel', 'MarvelController.search')
Route.get('/marvel/character/:id', 'MarvelController.searchCharacter')
Route.get('/marvel/comic/:id', 'MarvelController.searchComic')

// Favourite Characters routes
Route.resource('favourites/characters', 'FavouriteCharacterController')
  .apiOnly()
  .middleware('auth')

// Favourite Comics routes
Route.resource('favourites/comics', 'FavouriteComicController')
  .apiOnly()
  .middleware('auth')
