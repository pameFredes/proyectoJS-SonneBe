// Logica de la pagina Cart.html
// Get info del localStorage
const containerCart = document.getElementById('containerCart');
let carrito = (localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : []
updateCart()

function showCart() {
    containerCart.innerHTML = '';

    carrito.forEach(producAdded => {
        let div = document.createElement('div')
        div.classList.add('box');
        div.id = `delete-${producAdded.id}`
        div.innerHTML = `
            <i id="remove-${producAdded.id}" class="fas fa-times"></i>
            <img src="${ producAdded.image }" alt="Imagen del producto">
            <div class="content">
                <h3>${ producAdded.name }</h3>
                <form action="">
                    <span id= "cantidad">Cantidad: </span>
                    <input type="number" name="" value=${producAdded.cantidad} id="quantity-${producAdded.id}">
                </form>
                <div class="price"> $${producAdded.price * producAdded.cantidad}  <span> $${producAdded.oldPrice * producAdded.cantidad} </span> </div>
            </div>`

        containerCart.appendChild(div);

        const quantity= document.getElementById(`quantity-${producAdded.id}`)
        quantity.addEventListener('change', (event) => changeQuantity(event))

        let buttonDelete= document.getElementById(`remove-${producAdded.id}`)
        buttonDelete.addEventListener('click', deleteCart)
    });

    updateCart();
}

showCart();

function changeQuantity(event){
    const input = event.target;
    input.value <= 0 ? (input.value = 1 && toastr.error('Para eliminar el producto del carrito, presione "X"')): null;
    

    updateCart();
    updateProductCart();
    //1. Verificar si la cantidad es menor a 1.
        //1.1 Si es menor a 1, no permitirlo y volver a colocarle el valor en 1.
        //1.2 Mostrar toastr con alerta de error.
    //2. Si es mayor a 1, actualizar el arreglo "carrito", asignandole la nueva cantidad al producto.
        //2.1 Obtener el ID del elemento seleccionado "quantity-3" (usar funcion split)
        //2.2 Obtener el numero del ID (Ej. 3) 
        //2.3 Ejemplo: carrito[ID].cantidad = quantity
        //2.4 llamar a la funcion actualizarCarrito
    //3. llamamos updateCart()
    console.log(event);
}
function updateCart(){
    //1. Total a pagar
    const totalDesc = carrito.reduce( (acc, el) => acc + (el.cantidad * el.oldPrice), 0);
    const total = carrito.reduce( (acc, el) => acc + (el.cantidad * el.price), 0);
    
    //2. Obtener los elementos del DOM a los cuales asignar los totales.
    const subtotalCart = document.getElementById('subtotalCart')
    subtotalCart.innerText = `$${totalDesc.toFixed(2)}`;
    
    const totalPrice= document.getElementById('totalPrice') 
    totalPrice.innerText= `$${total.toFixed(2)}`;

    document.getElementById(`cartCounter`).innerHTML = carrito.reduce( (acc, el) => acc + el.cantidad, 0);
    


    //Llamar a la funcion.
}


function deleteCart(event) {
    const id = event.target.id.split('-')[1]
    const el = document.getElementById(`delete-${id}`)
    containerCart.removeChild(el)
    
    //1. Actualizar el arreglo carrito, eliminando el producto que fue eliminado.
    updateProductCart();
    //2. llamar update.
    updateCart();
    


    toastr.error('Producto removido del carrito de compras')

    // carrito // Coomo elimino un elemento del arreglo por ID
    // Luego de eliminarlo, actualizar el localStorage
    // localStorage.setItem('carrito', JSON.stringify(carrito))
    // Agregar logica para eliminar el articulo del carrito del localStorage
    // Eliminar de la vista
    // Resto de logica..
    // showCart()
}


function addItem(idElement) {}

function updateProductCart() {
    //1. guardar carrito en el localStorage.
    let carrito = (localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : []
    updateCart()
    //toastr.success('Carrito actualizado correctamente')
}