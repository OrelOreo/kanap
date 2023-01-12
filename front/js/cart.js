const stockage = Object.values(localStorage)
console.log(stockage)








const sectionItems = document.querySelector('#cart__items')
const article = document.createElement('article')
const cartItemImage = document.createElement('div')
const image = document.createElement('img')
const cartItemContent = document.createElement('div')
const cartItemContentDescription = document.createElement('div')

cartItemContentDescription.classList = "cart__item__content__description"

cartItemContent.classList = "cart__item__content"
image.src = "../../back/images/kanap01.jpeg"
image.alt = "testoto"
cartItemImage.classList = 'cart__item__img'
article.classList = 'cart__item'
article.setAttribute('data-id', "ontest")
article.setAttribute('data-color', "ontesttt")




cartItemContent.appendChild(cartItemContentDescription)
cartItemImage.appendChild(image)
sectionItems.appendChild(article)
article.appendChild(cartItemImage)
article.appendChild(cartItemContent)