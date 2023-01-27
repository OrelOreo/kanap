const storage = localStorage
const articleElement = document.createElement('article')
const cartImage = document.createElement('div')
const cartContent = document.createElement('div')
const blocDescription = document.createElement('div')
const cartItemSettings = document.createElement('div')
const priceElement = document.createElement('p')
const productName = document.createElement('h2')
const productImage = document.createElement('img')


async function generateProducts(products) {
    for (let i = 0; i < products.length; i++) {
        const product = await getProductById(products[i].id)
        const priceProduct = product.price
        const nameProduct = product.name
        const imageProduct = product.imageUrl
        const imageProductAltTxt = product.altTxt
        createPriceProduct(priceProduct)
        createNameProduct(nameProduct)
        createImageProduct(imageProduct, imageProductAltTxt)
        console.log(product)
        async function getProductById(artId) {
            return fetch(`http://localhost:3000/api/products/${artId}`)
            .then((response) => response.json())
        }
    }
}
generateProducts([JSON.parse(storage.Products)])
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
    articleElement.classList = "cart__item"
    articleElement.setAttribute("data-id", `${article.id}`)
    articleElement.setAttribute("data-color", `${article.selectColor}`)
    sectionCartItems.appendChild(articleElement)
}

function createCartItemImage() {
    cartImage.classList = "cart__item__img"
    articleElement.appendChild(cartImage)
}

function createImageProduct(imageProduct, imageProductAltTxt) {
    productImage.src = imageProduct
    productImage.alt = imageProductAltTxt
}

function createImageElement() {
    productImage
    cartImage.appendChild(productImage)
}

function createCartItemContent() {
    articleElement
    
    cartContent.classList = "cart__item__content"
    articleElement.appendChild(cartContent)
}

function createContentDescription() {
    cartContent
    blocDescription.classList = "cart__item__content__description"
    cartContent.appendChild(blocDescription)
}

function createPriceProduct(priceProduct) {
    priceElement.innerText = `${priceProduct} €`
}

function createNameProduct(nameProduct) {
    productName.innerText = nameProduct
}

function createDescription(description) {
    productName
    const color = document.createElement('p')
    color.innerText = `${description.selectColor}`
    priceElement
    blocDescription.append(productName, color, priceElement)
}

function createCartContentSettings() {
    cartItemSettings.classList = "cart__item__content__settings"
    articleElement.appendChild(cartItemSettings)
}
// Création d'une fonction qui ajoute plusieurs éléments HTML dans un bloc lié "settings"
function createCartContentSettingsQuantity(cartContentSettingsQuantity) {
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
    cartItemSettings.appendChild(contentSettingsQuantity)
}
// Création d'une fonction qui ajoute plusieurs éléments HTML dans un bloc lié "settings"
function createCartContentSettingsDelete() {
    const contentSettingsDelete = document.createElement('div')
    contentSettingsDelete.classList = "cart__item__content__settings__delete"
    const deleteElement = document.createElement('p')
    deleteElement.classList = "deleteItem"
    deleteElement.innerText = "Supprimer"
    contentSettingsDelete.appendChild(deleteElement)
    cartItemSettings.appendChild(contentSettingsDelete)    
}


