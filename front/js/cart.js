const sectionCartItems = document.querySelector('#cart__items')
const totalPriceElement = document.querySelector('#totalPrice')
const totalQuantity = document.querySelector('#totalQuantity')
let totalArticlesPrice = 0
let totalArticlesQuantity = 0

// On récupère chaque produit depuis l'API selon leurs ID si le produit est dans le localStorage
// (pour récupérer ses informations)
async function getProductById(artId) {
    return fetch("http://localhost:3000/api/products")
        .then(function (res) {
            return res.json()
        })
        .then((response) => {
            for (let i = 0; i < response.length; i++) {
                if(response[i]._id == artId) {
                    return fetch(`http://localhost:3000/api/products/${artId}`)
                    .then((response => response.json()))
                }
            }
        })
        .catch((err) => {
            console.log("err", err)
        })
}

const products = JSON.parse(localStorage.getItem('products'))

// Pour chaque produit dans le localStorage, on affiche les informations de chaque produit
async function showCart() {
    for (let i = 0; i < products.length; i++) {
        let {price, name, imageUrl, altTxt} = await getProductById(products[i].id)
        totalArticlesQuantity += parseInt(products[i].inputQuantity)
        totalArticlesPrice += parseInt(products[i].inputQuantity * price)

        let article = `
                        <article class="cart__item" data-id="${products[i].id}" data-color="${products[i].selectColor}">
                            <div class="cart__item__img">
                                <img src="${imageUrl}" alt="${altTxt}">
                            </div>
                            <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                    <h2>${name}</h2>
                                    <p>${products[i].selectColor}</p>
                                    <p>${price} €</p>
                                </div>
                                <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                        <p>Qté: ${products[i].inputQuantity}</p>
                                        <input data-id="${products[i].id}" data-color="${products[i].selectColor}" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${products[i].inputQuantity}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                        <p data-id="${products[i].id}" data-color="${products[i].selectColor}" class="deleteItem">Supprimer</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                      `
        sectionCartItems.innerHTML += article
        totalQuantity.innerText = totalArticlesQuantity
        totalPriceElement.innerText = totalArticlesPrice
    }

    // Suppression des articles dans le DOM et également du localStorage
    const deleteButtons = document.querySelectorAll('.deleteItem')
    deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', (event) => {
        const articleToDelete = event.target.closest('.cart__item')
        articleToDelete.remove()

        const products = JSON.parse(localStorage.getItem('products'))
        // Trouver l'index de l'article dans la liste de produits dans le localStorage
        const articleIndex = products.findIndex(product => product.id === articleToDelete.dataset.id && product.selectColor === articleToDelete.dataset.selectColor)
        // Supprimer de cette liste avec .splice, 1er arguement l'index du produit, 2nd argument combien d'élément je supprime
        products.splice(articleIndex, 1)
        // Mettre a jour le localStorage avec la nouvelle liste
        localStorage.setItem('products', JSON.stringify(products))
    })
})
// Ajouter un écouteur d'événement input sur tous les éléments .itemQuantity
    const itemQuantityInputs = document.querySelectorAll('.itemQuantity')
    itemQuantityInputs.forEach(input => {
    input.addEventListener('input', (event) => {
        const productId = event.target.dataset.id
        const productColor = event.target.dataset.color
        const newQuantity = parseInt(event.target.value)

        // Mettre à jour la quantité et le prix total du produit dans le panier
        const products = JSON.parse(localStorage.getItem('products'))
        const product = products.find(p => p.id === productId && p.selectColor === productColor)
        const oldQuantity = product.inputQuantity
        const productPrice = product.price
        product.inputQuantity = newQuantity
        const quantityDifference = newQuantity - oldQuantity
        totalArticlesQuantity += quantityDifference
        totalArticlesPrice += quantityDifference * productPrice
        console.log(price)
        console.log(quantityDifference)
        console.log(totalArticlesPrice)
        // Enregistrer les modifications dans localStorage
        localStorage.setItem('products', JSON.stringify(products))

        // Mettre à jour le texte des éléments totalQuantity et totalPriceElement
        totalQuantity.innerText = totalArticlesQuantity
        totalPriceElement.innerText = totalArticlesPrice
    })
 })
}


showCart()


// FORM REGEX

const validationForm = {
    firstName: {
      inputElementForm: document.getElementById("firstName"),
      errorElement : document.getElementById('firstNameErrorMsg'),
      // cette expression régulière permet de vérifier que la chaîne de caractères ne contient que des lettres, sans espaces ni autres caractères, et que la chaîne commence et se termine par une lettre.
      regex: /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/,
      errorMsg: "Prénom invalide",
    },
    lastName: {
      inputElementForm: document.getElementById("lastName"),
      errorElement : document.getElementById('lastNameErrorMsg'),
      // cette expression régulière permet de vérifier que la chaîne de caractères ne contient que des lettres, sans espaces ni autres caractères, et que la chaîne commence et se termine par une lettre.
      regex: /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/,
      errorMsg: "Nom invalide",
    },
    address: {
      inputElementForm: document.getElementById("address"),
      errorElement : document.getElementById('addressErrorMsg'),
      // cette expression régulière permet de vérifier que la chaîne de caractères commence par un nombre entier compris entre 1 et 99999, suivi d'une séquence de caractères qui peut inclure des lettres, des chiffres, des espaces, des virgules, des apostrophes et des tirets. La chaîne peut également inclure jusqu'à trois séquences supplémentaires de ce type, mais ces séquences sont optionnelles.
      regex: /^\d{1,5} [A-Za-z0-9\s,'-]{1,30}(?: [A-Za-z\s,'-]+){0,3}$/,
      errorMsg: "Adresse invalide",
    },
    city: {
      inputElementForm: document.getElementById("city"),
      errorElement : document.getElementById('cityErrorMsg'),
      // cette expression régulière permet de vérifier que la chaîne de caractères ne contient que des lettres, sans espaces ni autres caractères, et que la chaîne commence et se termine par une lettre.
      regex: /^[a-zA-ZÀ-ÖØ-öø-ÿ]/,
      errorMsg: "Ville invalide",
    },
    email: {
      inputElementForm: document.getElementById("email"),
      errorElement : document.getElementById('emailErrorMsg'),
      // cette expression régulière permet de vérifier que la chaîne de caractères est une adresse e-mail valide, qui commence par un nom d'utilisateur qui peut inclure des lettres, des chiffres, des points, des soulignés, des plus et des moins, suivi du caractère @ et du nom de domaine qui peut inclure des lettres, des chiffres et des points.
      regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      errorMsg: "Email invalide",
    },
  };

  // Submit Form

  const inputFirstName = document.querySelector('#firstName')
  inputFirstName.addEventListener('change', () => checkValidInput(validationForm.firstName))

  const inputLastName = document.querySelector('#lastName')
  inputLastName.addEventListener('change', () => checkValidInput(validationForm.lastName))

  const inputAdress = document.querySelector('#address')
  inputAdress.addEventListener('change', () => checkValidInput(validationForm.address))

  const inputCity = document.querySelector('#city')
  inputCity.addEventListener('change', () =>  checkValidInput(validationForm.city))

  const inputEmail = document.querySelector('#email')
  inputEmail.addEventListener('change', () => checkValidInput(validationForm.email))


  // Vérification des valeurs des inputs
  // Si les valeurs des inputs ne correspondent pas au regex alors retourne un message d'erreur
  function checkValidInput(input) {
    const element = input.inputElementForm
    const regex = input.regex
    const errorElement = input.errorElement
    const errorMsg = input.errorMsg
    const isValid = regex.test(element.value)
    if (!isValid) {
        errorElement.innerText = errorMsg
    } else {
        errorElement.innerText = ""
    }
    return isValid
  }

  // Formulaire de confirmation qui enverra les données au serveur avec la route "POST"

  const sendForm = async (contact, products) => {
    const response = await fetch ("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact, products)
    })
    const dataResponse = await response.json()
    return dataResponse
    
  }

  document.querySelector('.cart__order__form').addEventListener('submit', (event) => {
    event.preventDefault()

    let contact = {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputEmail.value
    }
    checkValidInput(validationForm.firstName)
    checkValidInput(validationForm.lastName)
    checkValidInput(validationForm.address)
    checkValidInput(validationForm.city)
    checkValidInput(validationForm.email)

    // si le panier est vide alors une alerte prévient l'utilisateur que c'est impossible de passer la commande
    if (products === null || products.length == 0) {
        alert('Votre panier est vide, impossible de passer la commande')
    } else if (
        checkValidInput(validationForm.firstName) === false ||
        checkValidInput(validationForm.lastName) === false ||
        checkValidInput(validationForm.address) === false ||
        checkValidInput(validationForm.city) === false ||
        checkValidInput(validationForm.email) === false
    ) {
        return
    }

    console.log("products",products)

    sendForm({ contact, products: products.map((product) => product.id)})
        .then((data) => {
            localStorage.removeItem('products')
            window.location.href = "confirmation.html?id=" + data.orderId
        })
   

  })