
const express= require("express");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/cart.router.js");

const app= express();
const PORT= 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PORT, ()=>{
  console.log(`listening on port: http://localhost:${PORT}`);
})



