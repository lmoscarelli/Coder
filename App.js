let arregloProducto = [];
let id = 0;
const mostrarTotal = document.getElementById("mostrar-total");
const mostrarTotal2 = document.querySelector(".total");

// crear producto
//-----------------------------------------------
class Product {
  constructor(id, name, price, year) {
      this.id = id,
      this.name = name,
      this.price = price,
      this.year = year
  }
}

class UI {
  // ingresar un nuevo producto
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product</strong>: ${product.name} -
                    <strong>Price</strong>: ${product.price} - 
                    <strong>Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete" data-id="${product.id}">Delete</a>
                </div>
            </div>
        `;
    productList.appendChild(element);

    total();
  }

//resetear los rellenos
  resetForm() {
    document.getElementById("product-form").reset();
  }

//eliminar producto
  deleteProduct(element) {
    if (element.name === "delete") {
      
      const productoId = parseInt(element.getAttribute('data-id'));
      // console.log(productoId);
    
      // Elimina del arreglo de arregloProducto por el data-id
      arregloProducto = arregloProducto.filter(producto => producto.id !== productoId);
      console.log(arregloProducto);

      element.parentElement.parentElement.remove();
      this.showMessage("Producto eliminado correctamente", "éxito");

      total();
    }
  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));

    // Show en el DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");

    // Insertar Mjs en el UI
    container.insertBefore(div, app);

    // Remover el mjs por 3 segundos
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

//---------------------------------------------------------------------------------------------------------------------
// DOM Events
document.getElementById("product-form").addEventListener("submit", function (e) { // captura el elemento de submit//
    // Anular el comportamiento predeterminado del formulario
    e.preventDefault();

    // captura el valor de cada cosa
    id = ++id;
    let name = document.getElementById("name").value;
    let price = Number(document.getElementById("price").value);
    let year = document.getElementById("year").value;
    // console.log(id, name, price, year);

    // Crear un nuevo producto
    const product = new Product (id, name, price, year);
    arregloProducto.push(product);
    console.log(arregloProducto);

    // Crear una nueva instancia de interfaz de usuario
    const ui = new UI();

    // Input VALIDACION
    if (name === "" || price === "" || year === "") {
      ui.showMessage("Por Favor completar todos los datos", "danger");
    }

    // Save (guardar) - Product
    ui.addProduct(product);
    ui.showMessage("producto adherido", "Ok");
    ui.resetForm();
  });

document.getElementById("product-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.deleteProduct(e.target);
  e.preventDefault();
});

//----------------- Sumar el total -----------------------------------------

function total(){
  // console.clear();
  let productTotal = arregloProducto.reduce((total, producto) => total + producto.price, 0);
  // console.log(productTotal);
  //mostrarTotal.innerText = `Total : $${productTotal}`; se anula este objeto asi figura mejor en el proximo
  mostrarTotal2.innerText = `TOTAL : $${productTotal}`;
}