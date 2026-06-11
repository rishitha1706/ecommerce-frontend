import { auth } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const cartContainer =
    document.getElementById("cart-container");

const cartTotal =
    document.getElementById("cart-total");

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

onAuthStateChanged(auth, (user) => {

    if (!user) {

        alert("Please login first!");

        sessionStorage.setItem(
            "redirectAfterLogin",
            "cart.html"
        );

        window.location.href =
            "login.html";

        return;
    }

    renderCart();

});

/* Render Cart */

function renderCart() {

    cartContainer.innerHTML = "";

    let totalPrice = 0;

    if (cart.length === 0) {

        cartContainer.innerHTML =
            "<h2>Your cart is empty.</h2>";

        cartTotal.textContent = "0";

        return;
    }

    cart.forEach((product, index) => {

        const quantity = product.quantity || 1;

        totalPrice += product.price * quantity;

        const cartItem =
            document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `

            <img src="${product.image}" alt="${product.title}">

            <div class="cart-info">

                <h3>${product.title}</h3>

                <p>Price: $${product.price}</p>

                <p>
                    Quantity:

                    <button class="qty-btn decrease">
                        -
                    </button>

                    <span>${quantity}</span>

                    <button class="qty-btn increase">
                        +
                    </button>
                </p>

                <p>
                    Subtotal:
                    $${(product.price * quantity).toFixed(2)}
                </p>

                <button class="remove-btn">
                    Remove
                </button>

            </div>

        `;

        cartItem.querySelector(".increase")
            .addEventListener("click", () => {

                product.quantity = quantity + 1;

                updateCart();

            });

       cartItem.querySelector(".decrease")
    .addEventListener("click", () => {

        if (quantity > 1) {

            product.quantity = quantity - 1;

        } else {

            cart.splice(index, 1);

        }

        updateCart();

    });
        cartItem.querySelector(".remove-btn")
            .addEventListener("click", () => {

                cart.splice(index, 1);

                updateCart();

            });

        cartContainer.appendChild(cartItem);

    });

    cartTotal.textContent =
        totalPrice.toFixed(2);

}

/* Update Cart */

function updateCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

}