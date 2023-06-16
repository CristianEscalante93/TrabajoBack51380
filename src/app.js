
const express= require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const { Server } = require("socket.io");

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/cart.router.js");
const cartRouter = require("./routes/cartvistarouter.js")
const fixedProductRouter = require("./routes/fixed.product.router.js");
const realTimeProductRouter = require("./routes/real.time.product.router.js");

const ProductManager= require("./DAO/ProductManager.js");
const {connectMongo, connectSocket} = require("./utils.js");
const chatRouter = require("./routes/chats.router.js");
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

//API REST CON JSON
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//HTML RENDER
app.use("/", fixedProductRouter);
app.use("/realTimeProducts", realTimeProductRouter);
app.use('/chat', chatRouter);
app.use("/carts", cartRouter);


const httpServer=  app.listen(PORT, ()=>{
  console.log(`listening on port: http://localhost:${PORT}`);
})

connectMongo();
connectSocket(httpServer);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "no encontrado",
    data: {},
  });
});






