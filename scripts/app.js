import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
/* Authentication UI */

const userName =
    document.getElementById("user-name");

const loginBtn =
    document.getElementById("login-btn");

const logoutBtn =
    document.getElementById("logout-btn");

/* Session Persistence */

onAuthStateChanged(auth, (user) => {

    if (user) {

        if (userName) {

            userName.textContent =
                `Hi, ${user.displayName}`;

        }

        if (loginBtn) {

            loginBtn.style.display =
                "none";

        }

        if (logoutBtn) {

            logoutBtn.classList.remove(
                "hidden"
            );

        }

    }

    else {

        if (userName) {

            userName.textContent = "";

        }

        if (loginBtn) {

            loginBtn.style.display =
                "inline-block";

        }

        if (logoutBtn) {

            logoutBtn.classList.add(
                "hidden"
            );

        }

    }

});

/* Logout */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async () => {

            try {

                await signOut(auth);

                alert(
                    "Logged out successfully!"
                );

                window.location.href =
                    "index.html";

            }

            catch (error) {

                console.log(error);

            }

        }
    );

}

/* Mobile Menu */

const menuToggle =
    document.querySelector(".menu-toggle");

const navbar =
    document.querySelector(".navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

}

/* Cart Storage */

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

const cartCount =
    document.querySelector(".cart-count");

/* Update Cart Count */

function updateCartCount() {

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity || 1;

    });

    if (cartCount) {

        cartCount.textContent = totalItems;

    }

}

updateCartCount();

/* Product Grid */

const productGrid =
    document.getElementById("product-grid");

if (productGrid) {

    productGrid.innerHTML =
        "<h2>Loading products...</h2>";

    fetch('https://fakestoreapi.com/products')

        .then(response => response.json())

        .then(products => {

            productGrid.innerHTML = "";

            products.forEach(product => {

                const productCard =
                    document.createElement("div");

                productCard.classList.add("product-card");

                productCard.innerHTML = `

                    <a href="product.html?id=${product.id}" class="product-link">

                       <img
    src="${product.image}"
    srcset="
        ${product.image} 480w,
        ${product.image} 800w
    "
    sizes="
        (max-width: 768px) 100vw,
        220px
    "
    alt="${product.title}"
    loading="lazy"
    decoding="async"
>

                        <h3>${product.title}</h3>

                        <p>$${product.price}</p>

                        <small>${product.description.substring(0, 100)}...</small>

                    </a>

                    <button class="add-cart-btn">
                        Add to Cart
                    </button>

                `;

                const addCartBtn =
                    productCard.querySelector(".add-cart-btn");

                addCartBtn.addEventListener("click", () => {

    if (!auth.currentUser) {

        alert(
            "Please login first to add items to your cart!"
        );

        sessionStorage.setItem(
            "redirectAfterLogin",
            window.location.href
        );

        window.location.href =
            "login.html";

        return;

    }

   const existingProduct = cart.find(
    item =>
        item.id === product.id &&
        item.size === "Default" &&
        item.color === "Default"
);

    if (existingProduct) {

        existingProduct.quantity += 1;

    }

    else {

       cart.push({
    ...product,
    quantity: 1,
    size: "Default",
    color: "Default"
});

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    addCartBtn.textContent =
        "Added ✓";

    addCartBtn.style.backgroundColor =
        "green";

    setTimeout(() => {

        addCartBtn.textContent =
            "Add to Cart";

        addCartBtn.style.backgroundColor =
            "#222";

    }, 1000);

});


                productGrid.appendChild(productCard);

            });

        })

        .catch(error => {

            productGrid.innerHTML =
                "<h2>Failed to load products.</h2>";

            console.log(error);

        });

}

/* Shop Now Button */

const shopNowBtn =
    document.getElementById("shop-now-btn");

const productsSection =
    document.getElementById("products-section");

if (shopNowBtn && productsSection) {

    shopNowBtn.addEventListener("click", () => {

        productsSection.classList.remove("hidden");

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    });

}