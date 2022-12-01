var db=require('../config/connection')
var collection=require('../config/collections');
const { response } = require('../app');
var objectId=require('mongodb').ObjectId

module.exports={
    addProduct:(product,callback)=>{
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            
            // callback(data[0]._id)
            callback(data.insertedId)
            //callback(data.ops[0]._id)
            //callback(data.md5[0]._id)
        })
    },


    

    

    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PORDUCT_COLLECTION).find().toArray()
            resolve(products)
        })

    },
    deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            // console.log(prodId);
            // console.log(ObjectID(prodId));
            db.get().collection(collection.PORDUCT_COLLECTION).deleteOne({_id:objectId(prodId)}).then((response)=>{
                // console.log(response);
                resolve(response)
            })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PORDUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PORDUCT_COLLECTION).updateOne({_id:objectId(proId)},{
                $set:{
                    Name:proDetails.Name,
                    Description:proDetails.Description,
                    Price:proDetails.Price,
                    Category:proDetails.Category
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}