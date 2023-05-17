
const express= require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const { Server } = require("socket.io");

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/cart.router.js");
const fixedProductRouter = require("./routes/fixed.product.router.js");
const realTimeProductRouter = require("./routes/real.time.product.router.js");

const ProductManager= require("../src/ProductManager.js");
const productManager = new ProductManager();

const app= express();
const PORT= 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", fixedProductRouter);
app.use("/realTimeProducts", realTimeProductRouter);


const httpServer=  app.listen(PORT, ()=>{
  console.log(`listening on port: http://localhost:${PORT}`);
})

const socketServer = new Server(httpServer);

socketServer.on("connection", socket=>{
  
  socket.on("newProduct", async (product)=>{
    try {
      await productManager.addProduct(product);
      const list = await productManager.getProducts();
  
      socketServer.emit("products", list)
    } catch (error) {
      return error;
    }
  })
  
  socket.on("deleteProduct", async (id)=>{
    try {
      console.log(id);
      await productManager.deleteProduct(id);
      const list = await productManager.getProducts();
      socketServer.emit("products", list)
    } catch (error) {
      
    }
  })
})






