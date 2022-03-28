
// Library for storing and editing data

//dependencies
const fs=require('fs')
const path=require('path')


//conteiner for the module
var lib={}

lib.baseDire=path.join(__dirname,'/../.data/')

lib.crear=function(dir,file,data,callback){
    fs.open(lib.baseDire+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
      if(!err == fileDescriptor){
          var stringyfyData=JSON.stringify(data)
          fs.writeFile(fileDescriptor,stringyfyData,(err)=>{
           if(!err){
                fs.close(fileDescriptor,(err)=>{
                    if(!err){
                         callback(false)
                    }else{
                        callback('Error closing the file!')
                    }
                })
           }else{
               callback('Error wiriting the data on file!')
           }
          })
      }else{
          callback('Could not open the file becaouse its already exists!!')
      }
    })
  }

//export the module
exports.module=lib