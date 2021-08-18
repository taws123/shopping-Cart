const pluses = document.getElementsByClassName('fa-plus');
const minuses = document.getElementsByClassName('fa-minus');
const qty = document.getElementsByClassName('qty');
const prices = document.getElementsByClassName('price');
const shoping = document.getElementById('shoping');
const tax = document.getElementById('tax');
const total = document.getElementById('total');
const taxRate = .1;
tax.innerText = Math.round(toNumber(shoping.innerText) * taxRate);
total.innerText = parseInt(tax.innerText) + toNumber(shoping.innerText);
const basePrice = [];
for (const price of prices) {
    basePrice.push(price.innerText)
}
// change of price, tax on basis of the change of qty
function totalCalc(i) {
    var prevTotal = toNumber(shoping.innerText) - parseInt(prices[i].innerText);
    const totalCost = parseInt(parseInt(qty[i].value) * parseInt(basePrice[i]));
    prices[i].innerText = totalCost;
    console.log(prevTotal, totalCost);
    const totalShoping = prevTotal + totalCost;
    const taxTotal = Math.round((prevTotal + totalCost) * taxRate);
    shoping.innerText = totalShoping;
    tax.innerText = taxTotal;
    total.innerText = totalShoping + taxTotal;
}
// change the qty when plus or minus is changed 
function qtyChange(i, a) {
    if (qty[i].value == '1' && a == -1)
        return;
    qty[i].value = parseInt(qty[i].value) + a;
    totalCalc(i);
}
// qty change when number is changed
function priceChange() {
    for (let i = 0; i < qty.length; i++) {
        qty[i].addEventListener('input', function () {
            totalCalc(i);
        })
    }
}
// string to number 
function toNumber(a) {
    var number = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] >= '0' && a[i] <= '9') {
            number = number * 10 + (a[i] - '0');
        }
    }
    return number;
}
for (let i = 0; i < pluses.length; i++) {
    pluses[i].addEventListener('click', function () {
        qtyChange(i, 1);
    })
}
for (let i = 0; i < minuses.length; i++) {
    minuses[i].addEventListener('click', function () {
        qtyChange(i, -1);
    })
}
priceChange();

// change of number is finished here 
// now play hide and sick 
const removeItems = document.getElementsByClassName('remove-item');
for (let item = 0; item < removeItems.length; item++) {
    removeItems[item].addEventListener('click', function (e) {
        const toRemove = parseInt(prices[item].innerText);
        removeItems[item].parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode);
        tax.innerText = Math.round(toNumber(tax.innerText) - taxRate * toRemove);
        shoping.innerText = toNumber(shoping.innerText) - toRemove;
        total.innerText = Math.round(toNumber(total.innerText) - toRemove * (1 + taxRate));
    })
}