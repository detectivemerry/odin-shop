///** @type {import('next').NextConfig} */
//const nextConfig = {
    //images : {
        //domains : ['fakestoreapi.com']
    //},
//}

//module.exports = nextConfig

module.exports = (phase, { defaultConfig }) => {
    return {
      ...defaultConfig,
  
      //webpack: (config) => {
        //config.resolve = {
          //...config.resolve,
          //fallback: {
            //"fs": false,
            //"path": false,
            //"os": false,
            //"net" : false,
            //"tls" : false,
          //}
        //}
        //return config
      //},
      images : {
        domains : ['fakestoreapi.com']
      }
    }
  }