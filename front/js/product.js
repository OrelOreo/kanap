// La propriété search de l'interface "location" est un query string
// C'est une string contenant "?" suivi par les params de l'URL
const paramsString = window.location.search
// L'intérface URLSearchParams définit des méthodes utilitaires pour travailler avec la chaine de requete (get)
const urlParams = new URLSearchParams(paramsString)
// La méthode get() de URLSearchParams retourne la première valeur associé au param donné
const idProduct = urlParams.get('id')

fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then(response => response.json())
    .then((data) => genererProduct(data))

function genererProduct(product) {
    const colors = product
    const description = document.querySelector('#description')
    description.innerText = product.description
    const {name,price} = product
    const {imageUrl, altTxt} = product
    genererImageProduct(imageUrl, altTxt)
    genererNameAndPriceProduct(name, price)
    genererColorsProduct(colors)
}

function genererImageProduct(imageUrl, altTxt) {
    const imageElement = document.querySelector('.item__img')
    const imageProduct = document.createElement('img')
    imageProduct.src = imageUrl
    imageProduct.alt = altTxt
    imageElement.appendChild(imageProduct)
}

function genererNameAndPriceProduct(name, price) {
    const titleElement = document.querySelector('#title')
    titleElement.innerHTML = name
    const priceElement = document.querySelector('#price')
    priceElement.innerHTML = price
}

function genererColorsProduct(colors) {
    const selectElements = document.querySelector('#colors')
    // Pour chaque élém du tableau colors creer balise option en attribuant les élém venant du tableau
    // colors.colors parce que le 1er corréspond au produit et le 2nd correspond au nom du tableau
    colors.colors.forEach(color => {
        const option = document.createElement('option')
        option.value = color
        option.textContent = color
        selectElements.appendChild(option)
    })
}

// Add-To-Cart Event

const addToCart = document.querySelector('#addToCart')

addToCart.addEventListener('click', (event) => {
    const selectColor = document.querySelector('#colors').value
    const inputQuantity = document.querySelector('#quantity').value

    // Récupération de l'ID du produit, la value de la couleur & la value de quantity. On les stock dans un objet
    const storage = {
        id: idProduct,
        selectColor: selectColor,
        inputQuantity: inputQuantity
    }
    // localStorage ne peut pas stocker les objets, donc nous le transformons en string
    localStorage.setItem(idProduct, JSON.stringify(storage))
    window.location.replace("cart.html")
})