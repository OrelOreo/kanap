// Récupération du localStorage
const storage = localStorage.length
// Création du tableau qui va contenir les produits ajoutés
const panier = []
// Pour chaque produit (objet) dans localStorage on récupère sa key (id)
// storage - 1 parce que dans un tableau l'index commence à 0
for (let i = 0; i <= storage - 1; i++) {
    // Transformation de la String en Objet
    const product = JSON.parse(localStorage.getItem(localStorage.key(i)))
    // Ajout du produit au tableau "panier"
    panier.push(product)
    const {article, blocImage, image} = product
    createArticle(article)
    createBlocImage(blocImage)
    createImage(image)
}


// ⚠️⚠️⚠️ Trouver un meilleur moyen pour récupérer des élements parents qui ont été créer dans une fonction précédente ⚠️⚠️⚠️

// Créer un élement article pour chaque objet poussé dans le panier
function createArticle(article) {
    const sectionDesArticles = document.querySelector('#cart__items')
    const articleElement = document.createElement('article')
    articleElement.classList = "cart__item"
    // Ajouter data-id et data-color par la suite ..
    sectionDesArticles.appendChild(articleElement)
}

// Créer un élément div pour ajouter l'image correspondante au produit
function createBlocImage(articleElement) {
    // ⚠️⚠️⚠️ recupArticle
    const recupArticle = document.querySelector('.cart__item')
    const blocImageElement = document.createElement('div')
    blocImageElement.classList = "cart__item__img"
    recupArticle.appendChild(blocImageElement)
}

function createImage(image) {
    // ⚠️⚠️⚠️ recupBlocImage
    const recupBlocImage = document.querySelector('.cart__item__img')
    const imageElement = document.createElement('img')
    // Ajouter src & alt à l'image par la suite..
    recupBlocImage.appendChild(imageElement)
}