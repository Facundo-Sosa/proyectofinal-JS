const pedidoTotal = localStorage.getItem("precioTotal");
let asideDireccion = document.querySelector(".asideDireccion");
let total = document.createElement("h1");
total.innerHTML = `$ ${pedidoTotal}`;
asideDireccion.append(total);

let btnConfirmar = document.querySelector(".btnConfirmar");
btnConfirmar.addEventListener("click", enviarDatos)


const datos = document.querySelectorAll(".datos");

function enviarDatos() {
    if ((datos[0].value!='') && (datos[1].value!='') && (datos[2].value!='') && (datos[3].value!='') && (datos[4].value!='')) {
        let datosDelPedido = {
            Fecha: new Date().toLocaleString(),
            Direccion: datos[0].value,
            Piso: datos[1].value,
            Departamento: datos[2].value,
            Nombre: datos[3].value,
            Telefono: datos[4].value,
            Pedido: localStorage.getItem("listaPedido"),
            Aclaracion: datos[5].value,
            Total: `$ ${pedidoTotal}` 
        }
        let enJSON = JSON.stringify(datosDelPedido);
        localStorage.setItem("Pedido", enJSON);
        abrirMensaje();
    }else {
        Swal.fire({
            title: 'Error!',
            text: 'Complete sus datos correctamente',
            icon: 'error',
            showConfirmButton: false,
            timer: 3000,
        })
    }
}


function abrirMensaje() {
    Swal.fire({
        title: 'Enviado!',
        text: 'Su pedido sera enviado a la sucursal mas cercana y posteriormente sera enviado a su domicilio.',
        icon: 'success',
        timer: 3000,
        confirmButtonText: 'Aceptar'
    })
}



