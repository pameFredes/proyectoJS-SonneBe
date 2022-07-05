
const carrito = (localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : []
updateCart()
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
            <a href="javascript:void(0); addToCart(${ product.id })" id= "addBotton${product.id} " class="fas fa-shopping-cart"></a>
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

        let inToCart = carrito.find(element => element.id == id)
        
        if(inToCart){
            inToCart.cantidad += 1
            // updateCart()
        }else{
            let productAdded= products.find(element => element.id === id)
            productAdded.cantidad = 1
            carrito.push(productAdded)
            // updateCart()
            // showCart(productAdded)
        }

        updateCart()

       
    localStorage.setItem('carrito', JSON.stringify(carrito))
    toastr.success('Articulo agregado')
}

// addToCart()
//Contenedor carrito:

// const containerCart = document.getElementById('containerCart');

// JSON.parse(localStorage.getItem('carrito'))


function showCart(producAdded){
    let div = document.createElement('div')
    div.classList.add('box');
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
                    <h3>Subtotal : <span>$${ product.price }</span></h3>
                    <h3>Total : <span id= "totalPrice" >$${producAdded.id}</span></h3>
                    <a href="#" class="btn">Proceder al pago</a>
                </div>
            </div>`

        containerCart.appendChild(div);  
        
        let btnEliminar= document.getElementById(`eliminar${producAdded.id}`)
        btnEliminar.addEventListener('click', ()=> {
            if(producAdded.cantidad == 1){
                btnEliminar.parentElement.remove()
                carrito= carrito.filter(item => item.id !== producAdded.id)
                updateCart()
            }else{
                producAdded.cantidad = producAdded.cantidad - 1
                document.getElementById(`cantidad${producAdded.id}`).innerHTML = `<span id= "cantidad${producAdded.id}">Cantidad: ${producAdded.cantidad} </span>`
                updateCart()  
            }
           

        })
}

function updateCart(){
    document.getElementById(`cartCounter`).innerHTML = carrito.reduce( (acc, el) => acc + el.cantidad, 0);
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