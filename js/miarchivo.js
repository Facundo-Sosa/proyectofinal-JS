
let pizzas =[];
let empanadas = [];
let loading = document.querySelector(".cargando")

const cargarProductos = async () => {
    let mainProductos = document.querySelector(".mainProductos")
    await fetch("../JSON/pizzas.JSON")
            .then((response) => response.json())
            .then((data) => {
                pizzas = data;
                listaPizzas();
            })
            .catch((error) => {
                mainProductos.innerHTML = ` <div class="mensajeError">
                                                <img src="../img/error.png" height="200px" alt="">
                                                <h1>Lo sentimos pero ha ocurrido un error</h1>
                                            </div>`
            })
            .finally (() => {
                loading.className = "desaparecer"
            })
    await fetch("../JSON/empanadas.JSON")
            .then((response) => response.json())
            .then((data) => {
                empanadas = data;
                listaEmpanadas();
            }) 
            .catch((error) => {
                mainProductos.innerHTML = ` <div class="mensajeError">
                                                <img src="../img/error.png" height="200px" alt="">
                                                <h1>Lo sentimos pero ha ocurrido un error</h1>
                                            </div>`
            })
            .finally (() => {
                loading.className = "desaparecer"
            })
}
cargarProductos();

function listaPizzas() {
    const lista = document.querySelector(".pizzas");
    pizzas.forEach(pizza => {
        let elemento = document.createElement("div");
        elemento.className = "elemento"
        elemento.innerHTML = `  <div>
                                    <h5>${pizza.nombre}</h5>
                                    <h5>$ ${pizza.precio}</h5>
                                    <input type="button" class="agregarPizza" value="Agregar">
                                </div>
                                <img src="${pizza.imagen}" alt="" height="100px">`;
        lista.append(elemento);
    })     
    let btnAgregar = document.querySelectorAll(".agregarPizza");
    for (let i=0; i<btnAgregar.length; i++) {
        btnAgregar[i].addEventListener("click", () => {
            agregar(1, pizzas[i].nombre);
            mostrarCarrito();
        })
    }
}

function listaEmpanadas() {
    const lista = document.querySelector(".empanadas");
    empanadas.forEach(empanada => {
        let elemento = document.createElement("div");
        elemento.className = "elemento"
        elemento.innerHTML = `  <div>
                                    <h5>${empanada.nombre}</h5>
                                    <h5>$ ${empanada.precio}</h5>
                                    <input type="button" class="agregarEmpanada" value="Agregar">
                                </div>
                                <img src="${empanada.imagen}" alt="" height="100px">`;
        lista.append(elemento);
    })      
    let btnAgregar = document.querySelectorAll(".agregarEmpanada");
    for (let i=0; i<btnAgregar.length; i++) {
        btnAgregar[i].addEventListener("click", () => {
            agregar(2, empanadas[i].nombre);
            mostrarCarrito();
        })
    }
}


let carrito = []
function agregar(num, gusto) { //
    if (num == 1) {
        let busqueda = pizzas.find(pizza => pizza.nombre === gusto);
        carrito.push(busqueda);
    }else if (num == 2) {
        let busqueda = empanadas.find(empanada => empanada.nombre === gusto);
        carrito.push(busqueda);
    }
}



function mostrarCarrito() {
    let pedido = document.querySelector(".asideIndex");
    if (carrito.length == 0) {
        pedido.innerHTML = "<h2>Tu pedido esta vacio</h2>"
        
    }else if (carrito.length != 0){
        pedido.innerHTML = `<h2>Tu pedido es: </h2>`
        carrito.forEach(producto => {
            let elemento = document.createElement("div");
            elemento.className = "productoLista";
            elemento.innerHTML = `      <div>
                                            <h5>${producto.nombre}</h5>
                                            <div>
                                                <h5>$ ${producto.precio}</h5>
                                                <input type="button" value="Borrar" class="btnBorrar">
                                            </div>
                                        </div>
                                        <img src="${producto.imagen}" alt="">
                                  `;
            pedido.append(elemento);    
        })
        let btnBorrar = document.querySelectorAll(".btnBorrar");
        for (let i=0; i<btnBorrar.length; i++) {
            btnBorrar[i].addEventListener("click", () => borrar(i))
        }
        let btnPagar = document.createElement("div")
        btnPagar.innerHTML = `<a href="./secciones/direccion.html">IR A PAGAR</a>`
        btnPagar.className = "btnPagar";
        btnPagar.addEventListener("click", () => {
            total();
            mandarStorage();
        })
        pedido.append(btnPagar);
    }
}mostrarCarrito()


function borrar(i) {
    carrito.splice(i,1);
    mostrarCarrito();
}

function mandarStorage() {
    let productosEnStorage = [];
    for (let i=0; i<carrito.length; i++) {
        productosEnStorage.push(carrito[i].nombre);
    }
    localStorage.setItem("listaPedido", productosEnStorage);
}

function total() {
    const resultado = carrito.reduce((acc, pizza) => acc + pizza.precio, 0);
    localStorage.setItem("precioTotal", resultado);
}
