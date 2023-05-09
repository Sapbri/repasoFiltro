const menu = document.getElementById('menu');
const cart = document.getElementById('cart');
const cartProductsContainer = document.getElementById('cart-products-container');
const closeMenu = document.getElementById('close');
const userContainer = document.getElementById('users-container')
const productContainer = document.getElementById('product-container')


menu.addEventListener('click', render)
closeMenu.addEventListener('click', hide)

function render() {
    cart.classList.toggle('d-none')
    console.log('Escuchando, click')
}
function hide() {
    cart.classList.add('d-none')
}

// CRUD => Created Remove Update Delete

fetch('http://localhost:3000/usuarios')
    .then(response => response.json())
    .then(data => {
        console.log('Toda la Data', data)

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            console.log('cada elemento', data[i])
            
            userContainer.innerHTML += `
                <div class="user">
                    <img src="${data[i].img}" alt="foto">
                    <p>${data[i].nombre}</p>
                    <p>${data[i].apellido}</p>
                    <p>${data[i].email}</p>
                </div>
            `
        }
    })

let products = [];

let cartProducts = [];

function anyadir(props) {
    console.log('mi id es: ', props);
    const productFinal = products.find((e) => e.id == props )

    cartProducts.push(
        {
            nombre: productFinal.nombre,
            precio: productFinal.precio
        },
    )

    renderCart()
}

fetch('http://localhost:3000/productos')
    .then(response => response.json())
    .then(data => {
        console.log('Toda la Data', data)
        products = data
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            console.log('cada elemento', data[i])
            
            productContainer.innerHTML += `
                <div class="product">
                    <p>${data[i].nombre}</p>
                    <p>${data[i].precio}</p>
                    <button class="add" onclick='anyadir(${data[i].id})' >+</button>
                </div>
            `
            
        }


          
    })
   
function renderCart() {
    for(let i = 0; i < cartProducts.length; i++) {
        cartProductsContainer.innerHTML += `
            <div class="product">
                <p>${cartProducts[i].nombre}</p>
                <div>${cartProducts[i].precio}</div>
                <button class="add">X</button>
            </div> 
        `
    }
}