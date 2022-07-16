let carrito = (localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : []
updateCart()


const container = document.getElementById('productContainer');
const url= "../js/products.json"

const addListProducts= async ()=>{
    const response = await fetch(url)
    const productos= await response.json()
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
addListProducts();

function addToCart(id) {

        let inToCart = carrito.find(element => element.id == id)
        
        if(inToCart){
            inToCart.cantidad += 1
        }else{
            let productAdded= products.find(element => element.id === id)
            productAdded.cantidad = 1
            carrito.push(productAdded)
        }

        updateCart()

    localStorage.setItem('carrito', JSON.stringify(carrito))
    toastr.success('Articulo agregado')
}

function updateCart(){
    document.getElementById(`cartCounter`).innerHTML = carrito.reduce( (acc, el) => acc + el.cantidad, 0);
}


function showModal(id) {    
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