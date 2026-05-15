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

    document.getElementById("detail-image").src =
        product.image;

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

    document.getElementById("add-cart-btn")
        .addEventListener("click", () => {

            let cart =
                JSON.parse(localStorage.getItem("cart")) || [];

            cart.push({
                ...product,
                quantity: quantity,
                totalPrice: basePrice * quantity,
                size:
                    document.getElementById("size-select").value,
                color:
                    document.getElementById("color-select").value
            });

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