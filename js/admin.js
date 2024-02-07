const newProduct = () => {
  debugger
  const product = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    quantity: document.getElementById('quantity').value,
    price: document.getElementById('price').value,
    location: document.getElementById('location').value

  };
  fetch(`http://localhost:8080/warehouse/api/product`,{
    method: 'POST',
    body: JSON.stringify(product),
  })
  .then(response => response.json()) 
  .then(json => {
      alert(`product uploaded id:${json.id}] ok`);
  })
  .catch(err => console.log(err));
}
document.getElementById("btnSend").addEventListener('click', newProduct);





const listProducts = () => { 

  const resp = fetch(`http://localhost:8080/warehouse/api/product`)

  resp
      .then(response => response.json())
      .then(data => processList(data))//fulfilled
      .catch(error => drawError(error))//rejected
}    

function processList(data) {

  //guardo en localStorage
  saveProductsInFromLocal('products', data);

  const listProducts = data;
  let rows = '';
  for(let product of listProducts) {
      console.log(product);
      rows += `
      <tr>
          <th scope="row">${product.id}</th>
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td>${product.quantity}</td>
          <td>${product.price}</td>
          <td>${product.location}</td>
          <td>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="edit(${product.id})">
                  Edit
              </button>
              <button onclick="deleteUpdate(${product.id})" type="button" class="btn btn-danger">
                  Delete
              </button>
          </td>
      </tr>
      `
  }
  document.getElementById('usersRows').innerHTML = rows;
}

function drawError(error) {
  console.log(error);
  const alerta = `<div class="alert alert-danger" role="alert">
      ${error.toString()}
  </div>`;
  document.getElementById('msj').innerHTML = alerta;
}
document.getElementById("btnList").addEventListener('click', listProducts);



deleteUpdate = (id) => {
  if(!confirm('¿Are you sure?')) {
      return;
  }

  fetch(`http://localhost:8080/warehouse/api/product?id=${id}`, {
      method: "DELETE",
  })
  .then(response => response) 
  .then(json => {
      alert(`Deleted product id: ${id}`);
      listProducts();
  })
  .catch(err => console.log(err));
}




const getProductsFromLocal = () => {
  const products = localStorage.getItem('products')
  if(products) {
      return JSON.parse(products);
  }
  return [];
}
const getProductSelected = () => {
  const obj = localStorage.getItem('productSearched')
  if(obj) {
      return JSON.parse(obj);
  }
  return null;
}
const removeProductSelected = () => {
  localStorage.removeItem('productSearched');
}
const saveProductsInFromLocal = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));//como texto
}


const edit = (id) => {
  const products = getProductsFromLocal();//[]
  const productSearched = products.find(s => s.id === id);
  
  document.getElementById('nameUpdate').value = productSearched.name;
  document.getElementById('descriptionUpdate').value = productSearched.description;
  document.getElementById('quantityUpdate').value = productSearched.quantity;
  document.getElementById('priceUpdate').value = productSearched.price;
  document.getElementById('locationUpdate').value = productSearched.location;

  saveProductsInFromLocal('productSearched', productSearched);
}


const updateWarehouse = () => {
  const productSelected = getProductSelected();
  if(!productSelected) {
      return
  }
  const name = document.getElementById('nameUpdate').value;
  const description = document.getElementById('descriptionUpdate').value;
  const quantity = document.getElementById('quantityUpdate').value;
  const price = document.getElementById('priceUpdate').value;
  const location = document.getElementById('locationUpdate').value;

  const product = {
       name,
       description,
       quantity,
       price,
       location,
  };
  fetch(`http://localhost:8080/warehouse/api/product?id=${productSelected.id}`, {
      method: "PUT",
      body: JSON.stringify(product),
  })
  .then(response => response) //status code 200
  .then(json => {
      alert(`Edited product id:${productSelected.id}`);
      //cargar la lista 
      listProducts();
      removeProductSelected();
      closeModal();
  })
  .catch(err => console.log(err));
}
const closeModal = () => {
  document.getElementById('btnCloseModal').click();
}