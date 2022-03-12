let cart_sec = document.querySelector('.cart');
let total_price = document.querySelector('.cart .total p');
total_price.innerText = 0;

let add_item = document.querySelectorAll('.add');
let remove_item = document.querySelectorAll('.remove');
let jprice = document.querySelectorAll('.mrp');
let flag = [];
for (let i = 0; i < add_item.length; i++)
    flag[i] = 0;

for (let i = 0; i < add_item.length; i++) {
    add_item[i].addEventListener('click', function () {
        flag[i]++;
        let img = document.createElement("img");
        img.setAttribute("src", `images/j${i + 1}.png`);
        let label = document.createElement("label");
        label.setAttribute("for", "qty");
        label.innerHTML = 'Qty :';
        let input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("id", "qty");
        input.setAttribute("value", "1");
        input.classList.add(`j${i}_qty`);

        input.addEventListener("change", (e) => {
            let price = document.querySelector(`.j${i}_price`);
            price.innerHTML = `Rs. ${parseInt(jprice[`${i}`].innerText.substring(3)) * e.target.value}`;
            cost();
        });
        input.setAttribute("max", "4");
        input.setAttribute("min", "1");

        let price = document.createElement("p");
        price.classList.add(`j${i}_price`);
        let qty = input.value;
        price.innerHTML = `Rs. ${parseInt(jprice[`${i}`].innerText.substring(3)) * qty}`;
        if (flag[i] == 1) {
            let div = document.createElement("div");
            div.classList.add(`j${i}_cartdiv`);
            let section = document.createElement("section");
            section.append(label, input, price);
            div.append(img, section);
            cart_sec.appendChild(div);
        }
        else {
            let incre_qty = document.querySelector(`.j${i}_qty`);
            if (incre_qty.value < 4) {
                incre_qty.value++;
                let incre_price = document.querySelector(`.j${i}_price`);
                incre_price.innerHTML = `Rs. ${parseInt(jprice[`${i}`].innerText.substring(3)) * incre_qty.value}`;
            }
            else
                alert('You can only add 4 similar items at a time in the cart');
        }
        cost();
    });
}

for (let i = 0; i < remove_item.length; i++) {
    remove_item[i].addEventListener('click', function () {
        let qty = document.querySelector(`.j${i}_qty`);
        let divToRem = document.querySelector(`.j${i}_cartdiv`);
        if (qty.value == 1) {
            divToRem.remove();
        }
        else {
            qty.value--;
            let decre_price = document.querySelector(`.j${i}_price`);
            decre_price.innerHTML = `Rs. ${parseInt(jprice[`${i}`].innerText.substring(3)) * qty.value}`;
        }
        cost();
    });
}

let cart_img = document.querySelector('.cartimg');
let facart = document.querySelector('.fas');
facart.onmouseover = function () {
    if (cart_sec.innerText == 'TOTAL COST: Rs.\n\n0') {
        cart_img.setAttribute('style', 'opacity:1');
        cart_img.innerText = 'Add items to view cart';
    }
    else {
        cart_img.setAttribute('style', 'opacity:1');
        cart_img.innerText = 'Click to open CART';
    }
};
facart.onmouseout = function () {
    cart_img.setAttribute('style', 'opacity:0');
    cart_img.innerText = '';
};
let count = 0;
facart.addEventListener('click', function () {
    if (count % 2 == 0) {
        cart_img.setAttribute('style', 'opacity:0');
        cart_sec.setAttribute('style', 'transform:translate(0%,0)');
        count++;
    }
    else {
        cart_img.setAttribute('style', 'opacity:0');
        cart_sec.setAttribute('style', 'transform:translate(150%,0)');
        count++;
    }
});

function cost() {
    console.log('hi');
    let sum = 0;
    for (let i = 0; i < add_item.length; i++) {
        let sub_total = document.querySelector(`.j${i}_price`);
        if (sub_total)
            sum += parseInt(sub_total.innerText.substring(3));
    }
    total_price.innerText = sum;
}

