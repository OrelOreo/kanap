const storage = localStorage

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => generateProducts(data))

async function generateProducts(products) {
    for (let i = 0; i < products.length; i++) {
        const prod = products[i]
        const prodId = prod._id
        const name = prod.name
        const price = await getProductById(products[i]._id)
        const imageUrl = prod.imageUrl
        const altTxt = prod.altTxt
        // console.log(name)
        // console.log(price)
        // console.log(imageUrl, altTxt)
        async function getProductById(artId) {
            for (let i = 0; i < products.length; i++) {
                if (prodId[i] == artId) {
                    generatePrice(price)
                    return prodId[i]
                }
            }
        }
    }
}
let panier = []

const sectionCartItems = document.querySelector('#cart__items')
// ⚠️⚠️⚠️ Besoin d'un refactor ⬇️

for (let i = 0; i <= storage.length - 1; i++) {
    const product = JSON.parse(localStorage.getItem(localStorage.key(i)))
    const article = product
    const cartItemImage = product
    const imageElement = product
    const cartItemContent = product
    const contentDescription = product
    const description = product
    const cartContentSettings = product
    const cartContentSettingsQuantity = product
    const cartContentSettingsDelete = product
    createArticle(article)
    createCartItemImage(cartItemImage)
    createImageElement(imageElement)
    createCartItemContent(cartItemContent)
    createContentDescription(contentDescription)
    createDescription(description)
    createCartContentSettings(cartContentSettings)
    createCartContentSettingsQuantity(cartContentSettingsQuantity)
    createCartContentSettingsDelete(cartContentSettingsDelete)
    panier.push(product)
   
}


function createArticle(article) {
    const articleElement = document.createElement('article')
    articleElement.classList = "cart__item"
    articleElement.setAttribute("data-id", `${article.id}`)
    articleElement.setAttribute("data-color", `${article.selectColor}`)
    sectionCartItems.appendChild(articleElement)
}

function createCartItemImage(cartItemImage) {
    const recupArticle = document.querySelector('.cart__item')
    const cartImage = document.createElement('div')
    cartImage.classList = "cart__item__img"
    recupArticle.appendChild(cartImage)
}



function createImageElement(imageElement) {
    const recupCartImage = document.querySelector('.cart__item__img')
    const image = document.createElement('img')
    image.src = "../../back/images/kanap01.jpeg"
    image.alt = "toto"
    recupCartImage.appendChild(image)
}

function createCartItemContent(cartItemContent) {
    const recupArticle = document.querySelector('.cart__item')
    const cartContent = document.createElement('div')
    cartContent.classList = "cart__item__content"
    recupArticle.appendChild(cartContent)
}

function createContentDescription(contentDescription) {
    const recupCartContent = document.querySelector('.cart__item__content')
    const blocDescription = document.createElement('div')
    blocDescription.classList = "cart__item__content__description"
    recupCartContent.appendChild(blocDescription)
}

function generatePrice(price) {
    let priceElement = document.createElement('p')
    priceElement.innerText = price
    console.log(priceElement)
}

function createDescription(description, price) {
    const productName = document.createElement('h2')
    productName.innerText = "toto"
    const color = document.createElement('p')
    color.innerText = `${description.selectColor}`
    // const price = document.createElement('p')
    // price.innerHTML = "40e"
    generatePrice(price)
    const recupBlocDescription = document.querySelector('.cart__item__content__description')
    recupBlocDescription.append(productName, color, price)
}

function createCartContentSettings(cartContentSettings) {
    const recupArticle = document.querySelector('.cart__item')
    const cartItemSettings = document.createElement('div')
    cartItemSettings.classList = "cart__item__content__settings"
    recupArticle.appendChild(cartItemSettings)
}

function createCartContentSettingsQuantity(cartContentSettingsQuantity) {
    const recupCartContentSettings = document.querySelector('.cart__item__content__settings')
    const contentSettingsQuantity = document.createElement('div')
    contentSettingsQuantity.classList = "cart__item__content_settings__quantity"
    const quantity = document.createElement('p')
    quantity.innerText = "Qté : "
    const input = document.createElement('input')
    input.setAttribute("type", "number")
    input.setAttribute("name", "itemQuantity")
    input.setAttribute("min", "1")
    input.setAttribute("max", "100")
    input.setAttribute("value", `${cartContentSettingsQuantity.inputQuantity}`)
    input.classList = "itemQuantity"
    contentSettingsQuantity.append(quantity, input)
    recupCartContentSettings.appendChild(contentSettingsQuantity)
}

function createCartContentSettingsDelete(cartContentSettingsDelete) {
    const recupcartItemSettings = document.querySelector('.cart__item__content__settings')
    const contentSettingsDelete = document.createElement('div')
    contentSettingsDelete.classList = "cart__item__content__settings__delete"
    const deleteElement = document.createElement('p')
    deleteElement.classList = "deleteItem"
    deleteElement.innerText = "Supprimer"
    contentSettingsDelete.appendChild(deleteElement)
    recupcartItemSettings.appendChild(contentSettingsDelete)    
}


