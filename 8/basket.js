'use strict';

const basketIcon = document.querySelector('.cartIcon');
const basket = document.querySelector('.basket');
let basketItems = {};
const productAll = document.querySelectorAll('.addToCart');
const addBefore = document.querySelector('.basketTotal');
const totalEl = document.querySelector('.basketTotalValue');
const basketSpan = document.querySelector('.cartIconWrap > span');
basketIcon.addEventListener('click', () => {
    basket.classList.toggle('hidden');
})

function addToBasket(event) {
    const parent = event.target.parentNode.parentNode.parentNode;
    const id = parent.dataset.id;
    const price = parent.dataset.price;
    const name = parent.dataset.name;
    let basketQuantity = 0;
    let count;
    let sum;

    if (id in basketItems) {
        count = ++basketItems[id]['count'];
        sum = count * price;
        let realId = '__' + id + '__';
        const classID = document.querySelector('.' + realId);
        const countEl = classID.querySelector('.count');
        const sumEl = classID.querySelector('.sum');
        let total = 0;
        basketItems[id]['sum'] = sum;

        countEl.textContent = count;
        sumEl.textContent = sum;

        for (const item in basketItems) {
            total = total + basketItems[item]['sum'];
            basketQuantity = basketQuantity + basketItems[item]['count'];
        }
        totalEl.textContent = total;
        basketSpan.textContent = basketQuantity;


    } else {
        count = 1
        basketItems[id] = {};
        basketItems[id]['id'] = id;
        basketItems[id]['name'] = name;
        basketItems[id]['price'] = price;
        basketItems[id]['count'] = count;
        sum = count * price;
        basketItems[id]['sum'] = sum;
        let total = 0;
        let basketQuantity = 0;

        let divElem = document.createElement('div');

        divElem.innerHTML = `
            <div class="basketRow __${id}__">
            <div class="name">${name}</div>
            <div class="count"">${count}</div>
            <div class="price">${price}</div>
            <div class="sum">${sum}</div>
        </div >
        `;

        addBefore.before(divElem);

        for (const item in basketItems) {
            total = total + basketItems[item]['sum'];
            basketQuantity = basketQuantity + basketItems[item]['count'];
        }
        totalEl.textContent = total;
        basketSpan.textContent = basketQuantity;
    }
}

productAll.forEach(productItem => {
    productItem.addEventListener('click', addToBasket);
})