const id = new URL(window.location.href).searchParams.get('id')
const orderId = document.querySelector('#orderId')

orderId.innerText = id