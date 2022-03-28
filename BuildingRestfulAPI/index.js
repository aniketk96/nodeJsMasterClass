/*
*Project: Create user auth with to do list
* Author:Aniket Kanurkar
*
*
*/

//Dependencies
const config=require('./config')
const http=require('http')
const url=require('url')
const stringDecoder=require('string_decoder').StringDecoder
const {lib}=require('./lib/data')


//testing
lib.crear('test','newFile',{'name':'Aniket'},(err)=>{
  console.log(err)
})


//creating a server
const server=http.createServer((req,res)=>{
 unifiedServer(req,res)

})

//server listen on
server.listen(config.port,()=>{
   console.log("Listening on port "+config.port+"!")
})

var unifiedServer=(req,res)=>{
     //parse the url query
  const parseUrl=url.parse(req.url,true)

  //get the path
  const path=parseUrl.pathname
  const trimmedPath=path.replace(/^\/+|\/+$/g,'')

  //get the method
  const method=req.method.toLowerCase()

  //get the parameters from query
  const params=parseUrl.query

  //get payload if exist
  const decoder=new stringDecoder('utf-8')
  var buffer=''
  req.on('data',(data)=>{
     buffer += decoder.write(data)
  })

  req.on('end',()=>{
     buffer+=decoder.end()
 
   //chose the handler
   var chosenHandler=typeof(routers[trimmedPath])!== 'undefined' ? routers[trimmedPath] : handler.notFound

   //construct the data to send to the router

   var data={
      'trimmedPath':trimmedPath,
      'method': method,
      'payload':buffer
   }

   chosenHandler(data,(statusCode,payload)=>{
          
      statusCode=typeof(statusCode)=='number' ? statusCode : 200;

      payload=typeof(payload)=='object' ? payload : {}

      var payloadToString=JSON.stringify(payload)
      
      res.setHeader('Content-type','application/json')
      res.writeHead(statusCode)
      res.end(payloadToString)
    
   console.log("sending payload :",payloadToString)
   })

  })
}

//define the handler for every request
var handler={}

handler.ping=function(data,callback){
//set a callback with payload, and should be an object
callback(200)
}

handler.notFound=function(data,callback){
callback(404)
}

//define a router for requests.
var routers={
   'ping':handler.sample,
   '*':handler.notFound
}