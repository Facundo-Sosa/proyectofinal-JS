class Producto {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

let pizzas =[];
let empanadas = [];

function ingresoProducto(num, nom, pre, imagen) {
    if (num == 1) {
        pizzas.push(new Producto(nom, pre, imagen));
    }else if (num == 2) {
        empanadas.push(new Producto(nom, pre, imagen));
    }
}

ingresoProducto(1, "MUZZARELLA", 1100, "img/pizza.jpg"  );
ingresoProducto(1, "MUZZARELLA CON JAMON", 1100, "img/pizza.jpg");
ingresoProducto(1, "NAPOLITANA", 1100, "img/pizza.jpg");
ingresoProducto(1, "PROVOLONE", 1100, "img/pizza.jpg");
ingresoProducto(1, "AMERICANA CON JAMON", 1100, "img/pizza.jpg");
ingresoProducto(1, "PRIMAVERA", 1100, "img/pizza.jpg");
ingresoProducto(2, "CARNE", 200, "img/empanada.jpg");
ingresoProducto(2, "JAMON Y QUESO", 200, "img/empanada.jpg");
ingresoProducto(2, "POLLO", 200, "img/empanada.jpg");
ingresoProducto(2, "CARNE CRIOLLA", 250, "img/empanada.jpg");
ingresoProducto(2, "CAPRESSE", 200, "img/empanada.jpg");
ingresoProducto(2, "HUMITA", 200, "img/empanada.jpg");



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
listaPizzas();



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
listaEmpanadas();

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
