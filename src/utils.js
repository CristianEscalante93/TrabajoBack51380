//MULTER
const multer= require("multer") ;
const {connect} = require("mongoose");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploader = multer({ storage });


//DIRNAME
const dirname= require("path");
const path= require("path");
const fileURLToPath = require("url");
require.main.filename
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(require.main.filename).replace(/\\[^\\]*$/, '\\');;




//MONGO
const connectMongo =async function(){
  try {
    await connect(
      "mongodb+srv://CristianEscalante:PmafqBcyCLDtFjEa@coderbackend.npm2s8y.mongodb.net/Ecommerce?retryWrites=true&w=majority"
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
};

//SOCKET
const { Server } = require("socket.io");
const { ChatModel } = require("./DAO/mongo/models/messages.model.js");
const ProductService = require("./DAO/mongo/services/products.service.js");

const productService = new ProductService;

function connectSocket(httpServer) {

  const socketServer = new Server(httpServer);

  socketServer.on("connection", socket=>{
    socket.on("newProduct", async (newProduct)=>{
      try {
        //await productManager.addProduct(product);
        //const list = await productManager.getProducts();
        
        const { title, description, price, thumbnail, code, stock, category, status=true } = newProduct;
        const addProduct = await productService.createOne( title, description, price, thumbnail, code, stock, category, status );
        
        const list = await productService.getAll(req);
        console.log(list)

        socketServer.emit("products", list)
      } catch (error) {
        return error;
      }
    })
    socket.on("deleteProduct", async (id)=>{
      try {
        console.log(id);
        //await productManager.deleteProduct(id);
        //const list = await productManager.getProducts();

      
        await productService.deleteOne(id);
        const list = await productService.getAll();
        console.log(list)
        socketServer.emit("products", list)
      } catch (error) {
      }
    })
    socket.on('msg_front_to_back', async (msg) => {
      const msgCreated = await ChatModel.create(msg);
      const msgs = await ChatModel.find({});
      socketServer.emit('msg_back_to_front', msgs);
    });
  })
}


//----------------bcrypt------------------------------
const bcrypt= require('bcrypt');
const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);

module.exports = {uploader,path,__dirname,connectMongo,connectSocket,isValidPassword, createHash};


