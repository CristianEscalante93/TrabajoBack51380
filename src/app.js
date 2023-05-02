
const express= require("express");
const ProductManager= require("./ProductManager.js");
const productManager = new ProductManager();

const app= express();
const PORT= 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, ()=>{
  console.log(`listening on port: http://localhost:${PORT}`);
})

app.get('/products', async (req,res)=>{
  try {
    const limit= req.query.limit;
  const products= await productManager.getProducts();
  if(limit){
    res.status(200).json(products.slice(0,limit))
  }else{
    res.status(200).json(products);
  }
  } catch (error) {
    res.status(500).json({message:"Error"});
  }
});

app.get('/products/:id',async (req,res)=>{
  try {

    const {id}= req.params;
    console.log(id)
  const product = await productManager.getProductById(parseInt(id));
  

  if(product){
    res.status(200).json(product);
  }else{
    res.status(404).json({error: 'Product not found'});
  }
  } catch (error) {
    res.status(500).json({message:"Error"});
  }
})