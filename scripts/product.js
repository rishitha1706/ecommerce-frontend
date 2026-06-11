/* Get Product ID */

const params = new URLSearchParams(
    window.location.search
);

const productId = params.get("id");

/* Quantity */

let quantity = 1;

const quantityText =
    document.getElementById("quantity");

const totalPriceText =
    document.getElementById("total-price");

/* Fetch Product */

fetch(
    `https://fakestoreapi.com/products/${productId}`
)

.then(response => response.json())

.then(product => {

    const detailImage =
        document.getElementById(
            "detail-image"
        );

    detailImage.src = product.image;

    document.getElementById(
        "detail-title"
    ).textContent = product.title;

    document.getElementById(
        "detail-price"
    ).textContent = `$${product.price}`;

    document.getElementById(
        "detail-description"
    ).textContent = product.description;

    let basePrice = product.price;

    totalPriceText.textContent =
        basePrice.toFixed(2);

    /* Increase Quantity */

    document.getElementById("increase")
        .addEventListener("click", () => {

            quantity++;

            quantityText.textContent =
                quantity;

            totalPriceText.textContent =
                (basePrice * quantity)
                .toFixed(2);

        });

    /* Decrease Quantity */

    document.getElementById("decrease")
        .addEventListener("click", () => {

            if (quantity > 1) {

                quantity--;

                quantityText.textContent =
                    quantity;

                totalPriceText.textContent =
                    (basePrice * quantity)
                    .toFixed(2);

            }

        });

    /* Add To Cart */

    document.getElementById(
        "add-cart-btn"
    ).addEventListener("click", () => {

        let cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        const existingProduct =
            cart.find(item =>
                item.id === product.id
            );

        if (existingProduct) {

            existingProduct.quantity +=
                quantity;

        } else {

            cart.push({
                ...product,
                quantity: quantity
            });

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        /* Show Popup */

        const popup =
            document.getElementById(
                "cart-popup"
            );

        if (popup) {

            popup.style.display =
                "block";

        }

    });

})

.catch(error => {

    console.log(
        "Error loading product:",
        error
    );

});

/* Popup Buttons */

document.addEventListener(
    "click",
    (e) => {

        if (
            e.target.id ===
            "continue-shopping"
        ) {

            document.getElementById(
                "cart-popup"
            ).style.display = "none";

        }

        if (
            e.target.id ===
            "view-cart"
        ) {

            window.location.href =
                "cart.html";

        }

    }
);