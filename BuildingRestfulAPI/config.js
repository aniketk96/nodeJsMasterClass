

var entorno={}

entorno.desarrollo={
    'port':3000,
    'envName':'desarrollo'
}

entorno.production={
    'port':5000,
    'envName':'production'
}
// tomar el valor de entoreno actual
var Entorno=typeof(process.env.NODE_ENV)=='string' ? process.env.NODE_ENV.toLowerCase() : ''
//revisar si ese entorno esta definido
var exportEntorno=typeof(entorno[Entorno])=='object' ? entorno[entorno] : entorno.desarrollo

module.exports=exportEntorno