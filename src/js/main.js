function getSizes(button) {
    var size = button.getAttribute("data-tip");
    var chosenSize = document.getElementById('chosen-size');
    chosenSize.innerHTML = size;
    console.log(size);
}

document.getElementById("clickCart").onclick = function () {
    addToCartFunction()
};

function addToCartFunction() {

    document.getElementById("myCart").classList.toggle("show");
    document.getElementById("cart-menu").classList.toggle("active");

    document.getElementById("clickCart").classList.toggle("active");
}

var cartTotalqty = document.getElementById("cart-qty");
var qty = document.getElementsByClassName("qty");
var j = 0;
//    document.getElementById("cartDropDown").classList.toggle("show");
for (i = 0; i < qty.length; i++) {
    j = qty[i].innerHTML;
    j++;

}
cartTotalqty.innerHTML = j;
