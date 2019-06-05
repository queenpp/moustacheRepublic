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
    var qty = document.getElementById("qty");
    var totalinCart = document.getElementById("totalinCart");
    document.getElementById("clickCart").classList.toggle("active");
    //    document.getElementById("cartDropDown").classList.toggle("show");

    console.log("clicking");
}
