fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => genererProducts(data))

function genererProducts(data) {
// Rattachement des éléments

for (let i = 0; i < data.length; i++) {
    const product = data[i]
    // Récupération des ID de chaque produits
    const idProduct = product._id
    // Récupération de l'élément du DOM qui accueillera les produits
    const sectionArticles = document.querySelector('.items')
    // Création d'une balise link dédié à un produit
    const linkElement = document.createElement('a')
    linkElement.href = `./product.html?id=${idProduct}`
    // Création d'une balise dédiée à un produit
    const articleElement = document.createElement('article')
    // On crée élément img
    const imageElement = document.createElement('img')
    // On crée le nom
    const nomElement = document.createElement('h3')
    nomElement.innerText = product.name
    // On crée la description
    const descriptionElement = document.createElement('p')
    descriptionElement.innerText = product.description
    // On accède à l'index de la liste pour configurer la source de l'image
    imageElement.src = data[i].imageUrl
    imageElement.alt = data[i].altTxt


    sectionArticles.appendChild(linkElement)
    linkElement.appendChild(articleElement)
    articleElement.appendChild(imageElement)
    articleElement.appendChild(nomElement)
    articleElement.appendChild(descriptionElement)
    }
}
