let menuItens = document.querySelector("#menuItens") //selecionar meu elemento html #menuItens.

let searchedText = ""
let tagActivated = "Todos"

// Função cartão de produto 
let productsListExample = [{
    img: "assets/IMG PRODUCTS/Men-Jacket-Front-Black__15466 1.svg",
    tagName: "Camisetas",
    name: "Lightweight Jacket",
    description: "Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...",
    price: 100,
},
{
    img: "assets/IMG PRODUCTS/hood.svg",
    tagName: "Acessórios",
    name: "Black Hat",
    description: "O gorro Next.js chegou! Esta beldade bordada tem um ajuste confortável que garante que...",
    price: 100,
},
{
    img: "assets/IMG PRODUCTS/Surgical-Mask-Black__89554 1.svg",
    tagName: "Acessórios",
    name: "Mask",
    description: "Esta máscara facial durável é feita de duas camadas de tecido tratado e possui presilhas...",
    price: 40,
},
{
    img: "assets/IMG PRODUCTS/Men-TShirt-Black-Front__70046 1.svg",
    tagName: "Camisetas",
    name: "T-Shirt",
    description: "Esta t-shirt é imprescindível no seu guarda-roupa, combinando o caimento intemporal de...",
    price: 999,
},
{
    img: "assets/IMG PRODUCTS/mockup-a0dc2330__62146 1.svg",
    tagName: "Camisetas",
    name: "Short-Sleeve T-Shirt",
    description: "Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...",
    price: 100
},
{
    img: "assets/IMG PRODUCTS/mockup-9b9894f1__67347 1.svg",
    tagName: "Camisetas",
    name: "Champion Packable Jacket",
    description: "Proteja-se dos elementos com esta jaqueta embalável Champion. Esta jaqueta de poliést...",
    price: 100,
}]


function createProductCard(product) {

    let products_item = document.createElement("div")
    products_item.classList.add("products_item")

    let products_item_img = document.createElement("div")
    products_item_img.classList.add("products_item_img")

    let products_item_detail = document.createElement("div")
    products_item_detail.classList.add("products_item_detail")

    let tag_products = document.createElement("h2")
    tag_products.classList.add("tag_products")
    tag_products.textContent = product.tagName

    let name_product = document.createElement("h1")
    name_product.classList.add("name_product")
    name_product.textContent = product.name

    let product_description = document.createElement("p")
    product_description.classList.add("product_description")
    product_description.textContent = product.description

    let price = document.createElement("p")
    price.classList.add("price")
    price.textContent = `R$ ${product.price}`

    let action_cart = document.createElement("p")
    action_cart.classList.add("action_cart")
    action_cart.classList.add("_underlined")
    action_cart.addEventListener("click", () => addCartItem(product))


    action_cart.textContent = "Adicionar ao carrinho"
    let img = document.createElement("img")
    img.src = product.img

    products_item_img.appendChild(img)

    products_item_detail.appendChild(tag_products)
    products_item_detail.appendChild(name_product)
    products_item_detail.appendChild(product_description)
    products_item_detail.appendChild(price)
    products_item_detail.appendChild(action_cart)

    products_item.appendChild(products_item_img)
    products_item.appendChild(products_item_detail)

    return products_item
}
function renderProducts(productsList) {
    const productsElement = document.querySelector("#products")
    productsElement.textContent = ""

    for (let product of productsList) {
        productsElement.appendChild(createProductCard(product))
    }
}

renderProducts(productsListExample)

function filterProducts(productsList, searchFilter, tagFilter) {
    let filteredProductList = []
    for (let product of productsList) {
        if ((searchFilter === "" || product.name.toLowerCase().includes(searchFilter.toLowerCase())) && (tagFilter === "Todos" || product.tagName === tagFilter)) {
            filteredProductList.push(product)
        }
    }

    return filteredProductList
}

function menuItemActivation(event) { //função para ativar meus itens do html. 
    let oldActivatedItem = document.querySelector("#menuItens li._activated") //guardar minha ultima ativação do item

    if (oldActivatedItem) { //verificar se existe algum elemento que está ativo. 
        oldActivatedItem.classList.remove("_activated") //caso seja true, removerá minha classe que faz ativação. 
    }
    //adicionar minha classe de ativação
    event.target.classList.add("_activated")

    tagActivated = event.target.textContent
    let filteredByTag = filterProducts(productsListExample, searchedText, tagActivated)
    renderProducts(filteredByTag)

}
for (let elements of menuItens.children) { //meu loop que rodará todos os itens do menuItens  para adicionar o evento de ativação. 
    elements.addEventListener("click", menuItemActivation) //adição do evento de ativação.

}

function onSearchProducts() {
    let search_input = document.querySelector(".search_input")
    searchedText = search_input.value
    let filteredSearch = filterProducts(productsListExample, searchedText, tagActivated)
    renderProducts(filteredSearch)
}

document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        onSearchProducts()
    }
})

let cartItemList = []

function addCartItem(product) {
    cartItemList.push(product)
    updateCartStatus(cartItemList)
    renderCartItens(cartItemList)
}

function findCartItem(product) {
    for (let index in cartItemList) {
        if (cartItemList[index].name === product.name) {
            return { product, index }
        }
    }
}

function removeCartItem(product) {
    let productToRemove = findCartItem(product)
    cartItemList.splice(productToRemove.index, 1)
    updateCartStatus(cartItemList)
    renderCartItens(cartItemList)
}

function updateCartStatus(cartItemList) {
    let quantidadeElement = document.querySelector("#quantidade")
    let totalElement = document.querySelector("#total")
    let total = 0

    for (let product of cartItemList) {
        total += product.price
    }

    quantidadeElement.textContent = cartItemList.length
    totalElement.textContent = `R$ ${total},00`
}

function createCartItem(product) {
    let cart_item = document.createElement("div")
    cart_item.classList.add("cart_item")

    let cart_item_img = document.createElement("div")
    cart_item_img.classList.add("cart_item_img")

    let cart_item_details = document.createElement("div")
    cart_item_details.classList.add("cart_item_details")

    let name_product = document.createElement("h3")
    name_product.classList.add("name_product")
    name_product.textContent = product.name

    let price = document.createElement("p")
    price.classList.add("price")
    price.textContent = `R$ ${product.price}`

    let action_cart = document.createElement("p")
    action_cart.classList.add("action_cart")
    action_cart.textContent = "Remover produto"
    action_cart.addEventListener("click", () => removeCartItem(product))

    let img = document.createElement("img")
    img.src = product.img

    cart_item_img.appendChild(img)

    cart_item_details.appendChild(name_product)
    cart_item_details.appendChild(price)
    cart_item_details.appendChild(action_cart)

    cart_item.appendChild(cart_item_img)
    cart_item.appendChild(cart_item_details)

    return cart_item
}

function renderCartItens(productsList) {
    const cartListELement = document.querySelector(".cart_list_itens")
    cartListELement.textContent = ""
    const cartElementsList = document.querySelectorAll(".cart_active")
    const cartEnpty = document.querySelector(".empty_cart")


    if (productsList.length === 0) {
        cartEnpty.classList.remove("_hidden")
        for (let cartElement of cartElementsList) {
            cartElement.classList.add("_hidden")
        }
        return null
    }

    if (productsList.length > 0) {
        cartEnpty.classList.add("_hidden")
        for (let cartElement of cartElementsList) {
            cartElement.classList.remove("_hidden")
        }
    }

    for (let product of productsList) {
        cartListELement.appendChild(createCartItem(product))
    }
}

renderCartItens(cartItemList)