var express = require('express');
const { response } = require('../app');
// const { render } = require('../app');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers');


/* GET users listing. */
router.get('/', function(req, res, next) {
  
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/view-products',{admin:true,products})
    })

  
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
  console.log(req.body);
  console.log(req.files.image);
  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.image
    console.log(id);
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-product")

      }else{
        console.log(err);
      }
    })
    
  })
})
// router.get('/delete-product/:id',(req,res)=>{
//    let proId=req.query.id
//    console.log(proId)
//    console.log(req.query.name)
// })
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
})
//remove 


router.get('/edit-product/:id',async (req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  res.render('admin/edit-product',{product})
})

router.post('/edit-product/:id',(req,res)=>{
  let id=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.image){
      let image=req.files.image
      image.mv('./public/product-images/'+id+'.jpg')
    }
  })
})

//try
