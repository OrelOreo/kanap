const items = document.querySelector('#items')
let link = document.querySelector('#items a')
let article = document.querySelector('article')
let productName = document.querySelector('.productName')
let productDescription = document.querySelector('.productDescription')
let image = document.querySelector('#items img')



fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => console.log(data))

