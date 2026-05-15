const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

/* Cart */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.querySelector(".cart-count");

cartCount.textContent = cart.length;

/* Product Grid */

const productGrid = document.getElementById("product-grid");

productGrid.innerHTML = "<h2>Loading products...</h2>";

/* Fetch Products */

fetch('https://fakestoreapi.com/products')

.then(response => response.json())

.then(products => {

    productGrid.innerHTML = "";

    products.forEach(product => {

        const productCard = document.createElement("div");

        productCard.classList.add("product-card");

        productCard.innerHTML = `

            <a href="product.html?id=${product.id}" class="product-link">

                <img src="${product.image}" alt="${product.title}">

                <h3>${product.title}</h3>

                <p>$${product.price}</p>

                <small>${product.description.substring(0, 100)}...</small>

            </a>

            <button class="add-cart-btn">
                Add to Cart
            </button>

        `;

        /* Add To Cart */

        const addCartBtn =
            productCard.querySelector(".add-cart-btn");

        addCartBtn.addEventListener("click", () => {

            cart.push(product);

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            cartCount.textContent = cart.length;

            alert("Product added to cart!");

        });

        productGrid.appendChild(productCard);

    });

})

.catch(error => {

    productGrid.innerHTML =
        "<h2>Failed to load products.</h2>";

    console.log(error);

});

/* Shop Now Button */

const shopNowBtn = document.getElementById("shop-now-btn");

const productsSection =
    document.getElementById("products-section");

shopNowBtn.addEventListener("click", () => {

    productsSection.classList.remove("hidden");

    productsSection.scrollIntoView({
        behavior: "smooth"
    });

});