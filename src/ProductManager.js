const fs = require("fs");

class ProductManager{
  

  constructor(){
    this.path = "./src/products.json";
    this.id=1;
  }
  
  getProducts= async()=>{
    try {
      if(fs.existsSync(this.path)){
        let productsString = await fs.promises.readFile(this.path, "utf-8");
        let products= JSON.parse(productsString);
        
        return  products;
      }else{
        await fs.promises.writeFile(this.path, "[]");
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  addProduct = async(product)=>{
    try {
      let products= await this.getProducts();
      let checkCode = products.find(p => p.code === product.code)
    if(checkCode){
      return console.log('this code already exists');
    }
    if(!product.title && !product.description && !product.price && !product.thumbnail && product.code && product.stock){
      return console.log('Fields missing');
    }
    let newProduct= {...product, id: this.id};
    products.push(newProduct);
    this.id++;
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    
    return console.log('Product Added');
    } catch (error) {
      return error ;
    }
  }



  getProductById= async (id)=>{
    try {
      let products= await this.getProducts();
      let found = await products.find(p => p.id === id)
      if(!found){
        return console.log('Not found');
        }
      return found;
    } catch (error) {
      return error;
    }
    
  }

  updateproduct= async(id,modifiedProduct)=>{
    try {
      let products= await this.getProducts();
      let indexProduct = products.findIndex((index) => index.id === id);
      if (indexProduct !== -1) {
      products[indexProduct]={...products[indexProduct], ...modifiedProduct}

      let productString = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.path, productString);
      return console.log('Modified Product');
    } else {
      return console.log('Product Not Found');
    }
    } catch (error) {
      return error;
    }
    
  }

  deleteProduct = async(id) => {
    try {
      if (!fs.existsSync(this.path)) {
        console.log("File not found");
      } else {
          let products= await this.getProducts();
          let position = await products.findIndex((element) => element.id === id);
  
        if (position === -1) {
          console.log("No product found with that ID");
        } else {
          products.splice(position, 1);
          console.log("Removed product");
        }
        if (!products.length == 0) {
          await fs.promises.writeFile(this.path, JSON.stringify(products,null,2));
        } else {
          await fs.promises.unlink(this.path);
        }
          
      }
    } catch (error) {
      return error;
    }
    
}


}



const product1 = {
  title:"Lámpara moderna",
  description:"Lampara moderna con mampara blanca traslucida, con tensor y cable de 2m",
  price:"$2500",
  thumbnail:"img",
  code:"11",
  stock:"100"
}
const product2 = {
  tile:"Lámpara vintage",
  description:"Lampara vintage negro brillante con tonalidad cobre, cúpula y cable de 2m",
  price:"$1000",
  thumbnail:"img",
  code:"22",
  stock:"100"
}

const product3 = {
  title:"Lámpara moderna nueva",
  description:"Lampara moderna con mampara blanca traslucida, con tensor y cable de 2m",
  price:"$4000",
  thumbnail:"img",
  code:"12",
  stock:"1000"
}

const product4 = {
  title:"Lámpara",
  description:"Lampara moderna con mampara blanca traslucida, con tensor y cable de 2m",
  price:"$4000",
  thumbnail:"img",
  code:"1333333",
  stock:"10000000"
}

const productManager= new ProductManager();

//const asyncFn= async ()=>{
//await productManager.getProducts();

//await productManager.addProduct(product1);
//await productManager.addProduct(product2);
//await productManager.addProduct(product3);
  
  // await productManager.getProducts();
  
//await productManager.getProductById(1);
  // await productManager.getProductById(2);
  // await productManager.getProductById(10);
  
//await productManager.updateproduct(3, product4)
  // await productManager.getProductById(1);
  
  //await productManager.deleteProduct(2);
  //await productManager.getProducts();
//}
//asyncFn();

module.exports = ProductManager;




