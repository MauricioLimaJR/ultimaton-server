const Env = use('Env')

const axios = require('axios')
const md5 = require('md5')

const apiPublicKey = Env.get('MARVEL_API_PUBLIC_KEY')
const apiPrivateKey = Env.get('MARVEL_API_PRIVATE_KEY')

const instance = axios.create({
  baseURL: 'https://gateway.marvel.com:443',
  params: { apikey: apiPublicKey },
  proxy: false,
})

instance.interceptors.request.use((config) => {
  const ts = Date.now()
  const hash = md5(`${ts}${apiPrivateKey}${apiPublicKey}`)

  config.params.ts = ts
  config.params.hash = hash

  return config
})

module.exports = instance
