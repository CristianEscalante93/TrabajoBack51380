// const CartService = require("../../services/carts.service.js");

// const cartservice= new CartService
const socket = io();
const formProducts = document.getElementById("formProducts");
const inputTitle = document.getElementById("formTitle");
const inputDescript = document.getElementById("formDescription");
const inputPrice = document.getElementById("formPrice");
const inputCode = document.getElementById("formCode");
const inputStock = document.getElementById("formStock");
const inputCategory = document.getElementById("formCategory");
const inputThumbnail = document.getElementById("formThumbnail");


function deleteProduct(productId) {
  
  socket.emit("deleteProduct", productId);
};

const cartInfoElement = document.getElementsByClassName('cartInfo')[0];

  function addCart(id){
  const cartId= cartInfoElement?.getAttribute('id');
  console.log(id)
  console.log(cartId)
  const response= fetch(`/api/carts/${cartId}/products/${id}`,{
    method: 'POST'
  });
  
    alert('Producto agregado')

}

formProducts.onsubmit = (e) => {
  const newProduct = {
    title: inputTitle.value,
    description: inputDescript.value,
    price: +inputPrice.value,
    thumbnail: inputThumbnail.value,
    code: inputCode.value,
    stock: +inputStock.value,
    category: inputCategory.value,
  };
  socket.emit("newProduct", newProduct);
  formProducts.reset();
};


socket.on("products", (list)=>{
  const productList = document.querySelector(".productList");
  


  productList.innerHTML = `${list.map((product) => `
      <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${product.thumbnail}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">Categoria: ${product.category}</p>
            <p class="card-text"><small class="text-body-secondary">${product.description}</small></p>
            <p class="card-text">$${product.price}</p>
            <p class="card-text"><small class="text-body-secondary">stock: ${product.stock}</small></p>
            <p class="card-text">codigo: ${product.code}</p>
            <p class="card-text"><small class="text-body-secondary">id: ${product.id}</small></p>
            <button type="button" class="btn btn-danger" onclick="deleteProduct('${product.id}')">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join("")}
`;
});


