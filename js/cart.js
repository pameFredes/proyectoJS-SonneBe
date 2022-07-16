const containerCart = document.getElementById('containerCart');
const subtotalCart = document.getElementById('subtotalCart')
const totalPrice = document.getElementById('totalPrice') 

let carrito = (localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : []

function start(){
    containerCart.innerHTML = '';

    carrito.forEach(producAdded => {
    let div = document.createElement('div')
    div.classList.add('box');
    div.id = `product-${producAdded.id}`
    div.innerHTML = `
        <i id="remove-${producAdded.id}" class="fas fa-times"></i>
        <img src="${ producAdded.image }" alt="Imagen del producto">
        <div class="content">
            <h3>${ producAdded.name }</h3>
            <form action="">
                <span id= "cantidad">Cantidad: </span>
                <input type="number" min="1" name="cantidad" value="${producAdded.cantidad}" id="quantity-${producAdded.id}">
            </form>
            <div class="price"> $${producAdded.price * producAdded.cantidad}  <span> $${producAdded.oldPrice * producAdded.cantidad} </span> </div>
            <div class="price" id="${producAdded.id}"> </div>
        </div>`
    containerCart.appendChild(div);
    const quantity= document.getElementById(`quantity-${producAdded.id}`)
    quantity.addEventListener('change', () => changeQuantity(producAdded.id))
    let buttonDelete= document.getElementById(`remove-${producAdded.id}`)
    buttonDelete.addEventListener('click', deleteCart)
});}
    
    start()
    updateCart();

function changeQuantity(idInput){
    const element = document.getElementById(`quantity-${idInput}`);
    let productid = element.id.split('-')[1]
    let cantidad = parseInt(element.value)
    
    let result = carrito.find(x => x.id == productid)    
    result.cantidad = cantidad
    start()
    updateCart()
    updateProductCart();
}
function updateCart(){
    subtotalCart.innerHTML = ""
    totalPrice.innerHTML = ""
    const totalDesc = carrito.reduce( (acc, el) => acc + (el.cantidad * el.oldPrice), 0);
    const total = carrito.reduce( (acc, el) => acc + (el.cantidad * el.price), 0);
    subtotalCart.innerText = `$${totalDesc.toFixed(2)}`;
    totalPrice.innerText= `$${total.toFixed(2)}`;

    document.getElementById(`cartCounter`).innerHTML = carrito.reduce( (acc, el) => acc + el.cantidad, 0);
    if ( carrito.length === 0 ) {
        document.getElementById('cartContainer').classList.add("hidden")
        document.getElementById('notProducts').classList.remove("hidden")
    } else {
        document.getElementById('cartContainer').classList.remove("hidden")
        document.getElementById('notProducts').classList.add("hidden")
    }
}

function deleteCart(event) {
    const id = event.target.id.split('-')[1]
    const el = document.getElementById(`product-${id}`)
    containerCart.removeChild(el)
    carrito.splice(id, 1);
    updateProductCart();
    updateCart();

    toastr.error('Producto removido del carrito de compras')
}

function updateProductCart() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
    updateCart()
    toastr.success('Carrito actualizado correctamente')
}

function goToPay() {
    let msg = ``
    msg += 'Hola! Quiero comprar estos productos que vi en la web de SonneBe:'
    msg += '%0D%0A'
    carrito.forEach(product => {
       
        msg += `${product.cantidad} - ${product.name}%0D%0A`
    })
    msg += '%0D%0A'
    msg += `*Total a pagar:* ${ totalPrice.innerText }`
    var win = window.open(`https://wa.me/+542616179981?text=${msg}`, '_blank');
    win.focus();
    clearCarrito()
}

function clearCarrito(){
   localStorage.clear();
   location. reload()
   
}
