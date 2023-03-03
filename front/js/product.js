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

// Génération du produit avec ses informations
function genererProduct(product) {
    const colors = product
    const description = document.querySelector('#description')
    description.innerText = product.description
    const {name, price} = product
    const {imageUrl, altTxt} = product
    genererImageProduct(imageUrl, altTxt)
    genererNameAndPriceProduct(name, price)
    genererColorsProduct(colors)
}
// Génération de l'image et de son text alternatif
function genererImageProduct(imageUrl, altTxt) {
    const imageElement = document.querySelector('.item__img')
    const imageProduct = document.createElement('img')
    imageProduct.src = imageUrl
    imageProduct.alt = altTxt
    imageElement.appendChild(imageProduct)
}
// Génération du nom et du prix du produit
function genererNameAndPriceProduct(name, price) {
    const titleElement = document.querySelector('#title')
    titleElement.innerHTML = name
    const priceElement = document.querySelector('#price')
    priceElement.innerHTML = price
}
// Génération des différentes couleurs dispo du produit
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

const addToCartButton = document.querySelector('#addToCart')

// Bouton qui permet de récupérer les valeurs des couleurs et de la quantité et également d'ajouter au panier(localStorage)
addToCartButton.addEventListener('click',  function (event) {
    const selectColor = document.querySelector('#colors').value
    const inputQuantity = document.querySelector('#quantity').value
    saveStorage(selectColor,inputQuantity)
})

function saveStorage(selectColor, inputQuantity) {
    var storage = {
        id: idProduct,
        selectColor: selectColor,
        inputQuantity: Number (inputQuantity),
    }
    conditionnalStorage(selectColor, inputQuantity, storage)
}


function conditionnalStorage(selectColor, inputQuantity, storage) {
    let products = localStorage.getItem('products') || '[]'
    products = JSON.parse(products)
    let productIndex = products.findIndex((p) => p.id === storage.id && p.selectColor === storage.selectColor)

    if (productIndex !== -1) {
        products[productIndex].inputQuantity += storage.inputQuantity
    } else if (selectColor === "" || inputQuantity === 0) {
        alert("Veuillez choisir une couleur eet séléctionner le nombre d'articles")
    } else {
        products.push(storage)
    }
    localStorage.setItem('products', JSON.stringify(products))

}
