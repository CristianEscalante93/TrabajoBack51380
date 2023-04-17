
class ProductManager{
  id= 1;
  

  constructor(){
    this.products = [];
  }

  addProduct(product){
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
    return console.log('Product Added');
  }

  getProducts(){
    return console.log(this.products);
  }

  getProductById(id){
    let found = this.products.find(p => p.id === id)
    if(!found){
      return console.log('Not found');
    }
    return console.log('Product: ' + found);
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

const productManager= new ProductManager();
productManager.getProducts();
productManager.addProduct(product1);
productManager.getProducts();
productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.getProducts();
productManager.getProductById(1);
productManager.getProductById(2);
productManager.getProductById(10);




