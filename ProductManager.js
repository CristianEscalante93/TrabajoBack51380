const fs = require("fs");

class ProductManager{
  id= 1;

  constructor(path){
    this.path = path;
    this.products = [];
    if(!fs.existsSync(this.path)){
      fs.writeFileSync(this.path, "[]")
      const productsString = fs.readFileSync(this.path, "utf-8");
      const products = JSON.parse(productsString);
      this.products = products;
    }else{
      const productsString = fs.readFileSync(this.path, "utf-8");
      const products = JSON.parse(productsString);
      this.products = products;
    }
  }
  

  addProduct = async(product)=>{
    try {
      console.log("funciona")
      let checkCode = this.products.find(p => p.code === product.code)

    if(checkCode){
      return console.log('this code already exists');
    }

    if(!product.title && !product.description && !product.price && !product.thumbnail && product.code && product.stock){
      return console.log('Fields missing');
    }

    let newProduct= {...product, id: this.id};
    this.products.push(newProduct);
    this.id++;
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
    return console.log('Product Added');

    } catch (error) {
      return error 
    }
  }

  getProducts= async()=>{
    return await console.log(this.products)
  }

  getProductById= async (id)=>{
    try {
      let found = await this.products.find(p => p.id === id)
      if(!found){
        return console.log('Not found');
        }
      return console.log(found);
    } catch (error) {
      return error
    }
    
  }

  updateproduct= async(id,modifiedProduct)=>{
    const { title, description, price, thumbnail, stock } = modifiedProduct;
    let indexProduct = this.products.findIndex((index) => index.id === id);
    if (indexProduct !== -1) {
      this.products[indexProduct].title = title || this.products[indexProduct].title;
      this.products[indexProduct].description = description || this.products[indexProduct].description;
      this.products[indexProduct].price = price || this.products[indexProduct].price;
      this.products[indexProduct].thumbnail = thumbnail || this.products[indexProduct].thumbnail;
      this.products[indexProduct].stock = stock || this.products[indexProduct].stock;

      let productString = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, productString);
      return console.log('Modified Product');
    } else {
      return console.log('Product Not Found');
    }
  }

  deleteProduct = async(id) => {
    if (!fs.existsSync(this.path)) {
      console.log("File not found");
    } else {
        let position = await this.products.findIndex((element) => element.id === id);

      if (position === -1) {
        console.log("No product found with that ID");
      } else {
        this.products.splice(position, 1);
        console.log("Removed product");
      }
      if (!this.products.length == 0) {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,2));
      } else {
        await fs.promises.unlink(this.path, this.products);
      }
        
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

const productManager= new ProductManager("products.json");

productManager.getProducts();

productManager.addProduct(product1);
productManager.addProduct(product2);

// productManager.getProducts();

// productManager.getProductById(1);
// productManager.getProductById(2);
// productManager.getProductById(10);

// productManager.updateproduct(1, product3)
// productManager.getProductById(1);

//productManager.deleteProduct(2);
productManager.getProducts();




