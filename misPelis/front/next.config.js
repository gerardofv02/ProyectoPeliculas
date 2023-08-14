/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    //Aqui es donde se han de poner todos los dominoos de las imagenes que se vayan a utilizar.
    //Para añadir nuevos, se ha de poner una coma después del último colocado, y poner el dominio que se pide entre comillas.
    domains: ["m.media-amazon.com","pics.filmaffinity.com","www.adslzone.net"]
  }
}

module.exports = nextConfig
