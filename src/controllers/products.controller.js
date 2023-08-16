const ProductService = require("../DAO/mongo/services/products.service.js");
const { UserModel } = require("../DAO/mongo/models/users.model.js");
const productService = new ProductService;

class ProductsController {

  async getAll(req,res){
    try {
      const email=req.user.email
      const cartId= req.user.cartID
      const userFound = await UserModel.findOne({ email: email });
      const firstName = userFound.firstName
      const userSessionisAdmin = req.user.isAdmin;
      const products = await productService.getAll(req.query);
  
      const { docs, ...rest } = products;
      const {limit, page, category, sort }= req.query

      let prod = docs.map((doc) => {
        return {
          title: doc.title,
          description: doc.description,
          price: doc.price,
          thumbnail: doc.thumbnail,
          code: doc.code,
          stock: doc.stock,
          category: doc.category,
          _id: doc._id
        };
      });
      
      let links = [];
    for (let i = 1; i < rest.totalPages + 1; i++) {
  
      links.push({ label: i, href: `http://localhost:8080/?category=${category}&limit=${limit}&page=` + i });
    }
      // const products = await productManager.getProducts();
      return res.render( "home", {products:prod, pagination: rest,links,firstName,userSessionisAdmin,cartId} );
    } catch (error) {
      res.status(500).json({ msg: "Error"});
      req.logger.error({
        message: error.message,
        stack: JSON.stringify(error.stack, null, 2),
      });
    } 
  }
  async getDetail(req,res){
    try {

      const pid = req.params.pid;
      const productQuery = await productService.getOneById(pid);
      let product = {
        thumbnail: productQuery.thumbnail,
        title: productQuery.title,
        description: productQuery.description,
        price: productQuery.price,
        code: productQuery.code,
        stock: productQuery.stock,
        category: productQuery.category,
        _id: productQuery._id
        
      };
      return res.status(200).render('productDetail', { product:product });
    } catch (error) {
      req.logger.error({
        message: error.message,
        stack: JSON.stringify(error.stack, null, 2),
      });
    }
  }

    async getAllApi(req,res){
      try {
        //const limit= req.query.limit;
      // const products= await productManager.getProducts();
      const products = await productService.getAll(req.query);
      // if(limit){
      //   res.status(200).json({
      //     status: "success",
      //     msg: "Lista de productos limitada",
      //     payload: products,
      //   })
      // }else{
        res.status(200).json({
          status: "success",
          msg: "Lista de productos",
          payload: products,
        });
      //}
      } catch (error) {
        res.status(500).json({message:"Error"});
        req.logger.error({
          message: error.message,
          stack: JSON.stringify(error.stack, null, 2),
        });
      }
    }

    async getIdApi(req,res){
      try {
        const {id}= req.params;
        console.log(id)
      // const product = await productManager.getProductById(parseInt(id));
      const product = await productService.getOneById(id);
      
      if(product){
        res.status(200).json(product);
      }else{
        res.status(404).json({error: 'Product not found'});
      }
      } catch (error) {
        res.status(500).json({message:"Error"});
        req.logger.error({
          message: error.message,
          stack: JSON.stringify(error.stack, null, 2),
        });
      }
    }

    async postApi(req,res){
      try {
        //const addProduct = await productManager.addProduct(newProduct);
        const { title, description, price, thumbnail, code, stock, category, status } = req.body;
      const addProduct = await productService.createOne( title, description, price, thumbnail, code, stock, category, status );
        res.status(201).json({
        status: "success",
        msg: "Producto creado",
        data: addProduct,
      }); 
      } catch (error) {
        res.status(500).json({message:"Error"});
        req.logger.error({
          message: error.message,
          stack: JSON.stringify(error.stack, null, 2),
        });
      }
    }

    async updateApi(req,res){
      try {
        //const newProduct = req.body;
        //const modifiedProduct = await productManager.updateproduct(id,newProduct);
        const {id}= req.params;
        const { title, description, price, thumbnail, code, stock, category, status } = req.body;
        const modifiedProduct = await productService.updateOne(id,title, description, price, thumbnail, code, stock, category, status );
        return res.status(201).json({
        status: "success",
        msg: "Producto modificado",
        payload: modifiedProduct,
      }); 
      } catch (error) {
        res.status(500).json({message:"Error"});
        req.logger.error({
          message: error.message,
          stack: JSON.stringify(error.stack, null, 2),
        });
      }
    }

    async deleteApi(req,res){
      try {
        const {id}= req.params;
        //const deleteProduct = await productManager.deleteProduct(id);
        const deleteProduct = await productService.deleteOne(id);
        return res.status(201).json({
        status: "success",
        msg: "Producto borrado",
        payload: deleteProduct,
      }); 
      } catch (error) {
        res.status(500).json({message:"Error"});
        req.logger.error({
          message: error.message,
          stack: JSON.stringify(error.stack, null, 2),
        });
      }
    }

    async getRealTimeProducts(req,res){
      try {
        const products = await productService.getAll(req.query);
        const { docs, ...rest } = products;
    
        let prod = docs.map((doc) => {
          return {
            title: doc.title,
            description: doc.description,
            price: doc.price,
            thumbnail: doc.thumbnail,
            code: doc.code,
            stock: doc.stock,
            category: doc.category,
            _id: doc.id
          };
        });
        //const products = await productManager.getProducts();
        return res.render( "realTimeProducts", {products:prod,pagination: rest} );
      } catch (error) {
        res.status(500).json({ msg: "Error"});
        req.logger.error({
          message: error.message,
          stack: JSON.stringify(error.stack, null, 2),
        });
      }
    }
}


module.exports = ProductsController;