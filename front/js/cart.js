const sectionCartItems = document.querySelector('#cart__items')

async function getProductById(artId) {
    return fetch("http://localhost:3000/api/products")
        .then(function (res) {
            return res.json()
        })
        .catch((err) => {
            console.log("err", err)
        })
        .then((response) => {
            for (let i = 0; i < response.length; i++) {
                if(response[i]._id == artId) {
                    return fetch(`http://localhost:3000/api/products/${artId}`)
                    .then((response => response.json()))
                }
            }
        })
}

const products = JSON.parse(localStorage.getItem('products'))

async function showCart() {
    for (let i = 0; i < products.length; i++) {
        let {price, name, imageUrl, altTxt} = await getProductById(products[i].id)
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
    }
}
showCart()
