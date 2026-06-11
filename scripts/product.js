/* Get Product ID */

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

/* Quantity */

let quantity = 1;

const quantityText = document.getElementById("quantity");

const totalPriceText =
    document.getElementById("total-price");

/* Fetch Product */

fetch(`https://fakestoreapi.com/products/${productId}`)

.then(response => response.json())

.then(product => {

   const detailImage =
    document.getElementById("detail-image");

detailImage.src = product.image;

detailImage.loading = "lazy";

detailImage.decoding = "async";

    document.getElementById("detail-title").textContent =
        product.title;

    document.getElementById("detail-description").textContent =
        product.description;

    let basePrice = product.price;

    totalPriceText.textContent = basePrice.toFixed(2);

    /* Quantity Increase */

    document.getElementById("increase")
        .addEventListener("click", () => {

            quantity++;

            quantityText.textContent = quantity;

            totalPriceText.textContent =
                (basePrice * quantity).toFixed(2);

        });

    /* Quantity Decrease */

    document.getElementById("decrease")
        .addEventListener("click", () => {

            if (quantity > 1) {

                quantity--;

                quantityText.textContent = quantity;

                totalPriceText.textContent =
                    (basePrice * quantity).toFixed(2);

            }

        });

    /* Add To Cart */

    /* Add To Cart */

document.getElementById("add-cart-btn")
    .addEventListener("click", () => {

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct =
    cart.find(item =>
        item.id === product.id
    );

        if (existingProduct) {

            existingProduct.quantity += quantity;

            existingProduct.totalPrice =
                existingProduct.price *
                existingProduct.quantity;

        } else {

          cart.push({
    ...product,
    quantity: quantity,
    totalPrice: basePrice * quantity
});

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert("Product added to cart!");

    });

})

.catch(error => {

    console.log("Error loading product:", error);

});