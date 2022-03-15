const http=require('http')
const { json } = require('stream/consumers')
const url=require('url')
const strinDecoder=require('string_decoder').StringDecoder

const server=http.createServer((req,res)=>{

   var parseUrl=url.parse(req.url,true)
   var path=parseUrl.pathname
   
    var decorder=new strinDecoder('utf-8')
    var buffer={}
    res.on('data',(data)=>{
        buffer+=decorder.write(data)
    })
    res.end('end',()=>{
        buffer+=decorder.end()
      
        //chose handler to response depanding on path
        var choseHandler=typeof(routers[path])!=='undefined' ? routers[path] : handler.notFound


        var data={
            'method':req.method,
            'payload':buffer
        }

        choseHandler(data,(statuscode,payload)=>{
            var statuscode=typeof(statuscode)=='number' ? statuscode : 200
            var payload=typeof(payload)=='object' ? payload : {}
            var payloadJson=JSON.stringify(payload)
           // res.setHeader('Content-type','application/json')
            res.writeHead(statuscode)
            res.end(payloadJson)

            console.log(payloadJson)
        })

    })

})

server.listen(3000,()=>{
    console.log('listening on port 3000')
})

var handler={}
handler.home=function(data,callback){
  callback(406,{'name':'Welcome to home page'})
}

handler.about=function(data,callback){
    callback(406,{'name':'Welcome to about page'})
}

handler.notFound=function(data,callback){
    callback(404)
}

var routers={
    '/home':handler.home,
    '/about':handler.about
}