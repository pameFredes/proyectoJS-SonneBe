
//const cartCounter= document.getElementById('cartCounter');


let carrito = [];

//CONTENEDOR DE PRODUCTOS GENERAL:

const container = document.getElementById('productContainer');

function addListProducts() {

    products.forEach(product => {
        
        const div = document.createElement('div')
        div.className = 'box';
        div.innerHTML = `
        <div class="image">
            <div class="icons">
            <a href="javascript:void(0); showModal(${ product.id })" id= "viewProduct" class="fas fa-eye"></a>
            <a href="javascript:void(0); addToCart(${ product.id })" id= "addCart${product.id} " class="fas fa-shopping-cart"></a>
            </div>                
            <img src="${ product.image }" alt="Imagen del producto">
        </div>
        <div class="content">
            <h3>${ product.name }</h3>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i> 
                <i class="fas fa-star-half-alt"></i>
            </div>
            <div class="price">$${ product.price } <span>$${ product.oldPrice }</span></div>
        </div>
        `;

        container.appendChild(div);
    })

}
addListProducts()
// Agregar producto al Carrito

function addToCart(id) {
        console.log(`Agregar producto al carrito ${id}`);
        let inToCart = carrito.find(element => element.id === id)
        if(inToCart){
            inToCart.cantidad = inToCart.cantidad + 1
            document.getElementById(`cantidad${inToCart.id}`).innerHTML = `<span id= "cantidad${inToCart.id}" >Cantidad: ${inToCart.cantidad} </span>`
            updateCart()
        }else{
            const producAdded= products[id]
            producAdded.cantidad = 1
            carrito.push(producAdded)
            updateCart()
            showCart(producAdded)
        }
       
    localStorage.setItem('carrito', JSON.stringify(carriyo))
}
addToCart()
//Contenedor carrito:

const containerCart = document.getElementById('containerCart');

function showCart(producAdded){
    const div = document.createElement('div')
    div.className = 'box';
        div.innerHTML = `
            <i class="fas fa-times" id= "eliminar${producAdded.id}" ></i>
            <img src="${ producAdded.image }" alt="Imagen del producto">
            <div class="content">
                <h3>${ producAdded.name }</h3>
                <form action="">
                    <span id= "cantidad${producAdded.id}" >Cantidad: ${producAdded.cantidad} </span>
                    <input type="number" name="" value="1" id="amount">
                </form>
                <div class="price"> $${ producAdded.price }  <span> $${ producAdded.oldPrice } </span> </div>
                <h1 class="title">Revisa el total de tu compra:</h1>
                <div id= "cartContainer" class="cart-total">
                    <h3>Subtotal : <span>$100.00</span></h3>
                    <h3>Total : <span id= "totalPrice" >$100.00</span></h3>
                    <a href="#" class="btn">Proceder al pago</a>
                </div>
            </div>`

        containerCart.appendChild(div);  
        let btnEliminar= document.getElementById(`eliminar${producAdded.id}`)
        btnEliminar.addEventListener('click', ()=> {
            if(producAdded.cantidad == 1){
                btnEliminar.parentElement.remove()
                carrito= carrito.filter(item = item.id !== producAdded.id)
                updateCart()
            }else{
                producAdded.cantidad = producAdded.cantidad - 1
                document.getElementById(`cantidad${inToCart.id}`).innerHTML = `<span id= "cantidad${inToCart.id}" >Cantidad: ${inToCart.cantidad} </span>`
                updateCart()  
            }
           

        })
}

function updateCart(){
    cartCounter.innerText = carrito.reduce( (acc, el) => acc + el.cantidad, 0)
    totalPrice.innerText = carrito.reduce ( (acc, el) => acc + (el.price * el.cantidad), 0)
}



// Mostrar info del Producto

function showModal(id) {
    console.log(`Mostrar info del producto ${id}`);
    
    const product= products[id]
  
    Swal.fire({
        html:`
        <div class="image">
        <img src="${ product.image }" alt="Imagen del producto" class= "imageModal">
        </div>

        <div class="content">
            <h3>${ product.name }</h3>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i> 
                <i class="fas fa-star-half-alt"></i>
            </div>
            <div class="price">$${ product.price } <span>$${ product.oldPrice }</span></div>
        </div>
        `
      })
}