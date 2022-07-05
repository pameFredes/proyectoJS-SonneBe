// Logica de la pagina Cart.html
// Get info del localStorage
const containerCart = document.getElementById('containerCart');
const carrito = (localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : []

function showCart() {
    containerCart.innerHTML = '';
    let sinDescuento = 0;
    let total = 0;

    carrito.forEach(producAdded => {
        let div = document.createElement('div')
        div.classList.add('box');
        div.innerHTML = `
            <i class="fas fa-times" onclick="deleteCart(${producAdded.id})" ></i>
            <img src="${ producAdded.image }" alt="Imagen del producto">
            <div class="content">
                <h3>${ producAdded.name }</h3>
                <form action="">
                    <span id= "cantidad${producAdded.id}" >Cantidad: ${producAdded.cantidad} </span>
                    <input type="number" name="" value="1" id="amount">
                </form>
                <div class="price"> $${ producAdded.price }  <span> $${ producAdded.oldPrice } </span> </div>
            </div>`

        containerCart.appendChild(div);

        sinDescuento += +producAdded.oldPrice // Agregar logica para llevar subTotal
        total += +producAdded.price // Agregar logica para llevar subTotal
    });

    // Actualizar info de la tarjeta con totales.
    const subtotalCart = document.getElementById('subtotalCart')
    subtotalCart.innerText = `$${sinDescuento}`;
}

showCart();

function deleteCart(idCart) {
    console.log(idCart);

    toastr.error('No puede ser menos de 1')

    // carrito // Coomo elimino un elemento del arreglo por ID
    // Luego de eliminarlo, actualizar el localStorage
    // localStorage.setItem('carrito', JSON.stringify(carrito))
    // Agregar logica para eliminar el articulo del carrito del localStorage
    // Eliminar de la vista
    // Resto de logica..
    // showCart()
}

// Se llama para descontar elementos del carrito
function reduceItem(idElement) {
    // Del arreglo "carrito", buscar el elemento en la posicion idElement.
    // Comprobar que la cantidad sea mayor a 1
        // Si es afirmativo, se resta uno
        // Si es negativo, no hacer nada (Podes mostrar un toastr con un mensaje de error)
}

function addItem(idElement) {}