// ==========================================
// XENORA - JavaScript
// ==========================================

// Page Loader
// ==========================================
// XENORA - PAGE LOADER FIX
// ==========================================

function hidePageLoader() {
    const loader = document.getElementById("pageLoader");

    if (!loader) return;

    loader.classList.add("loaded");

    setTimeout(() => {
        loader.style.display = "none";
        loader.remove();
    }, 700);
}

// Don't wait for images/fonts to finish loading
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hidePageLoader, { once: true });
} else {
    hidePageLoader();
}

// Safety fallback
setTimeout(hidePageLoader, 5000);

// Mobile Menuy

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close menu after clicking a nav link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});

// Dark / Light Mode

const themeBtn = document.querySelector(".theme-btn");
const themeIcon = themeBtn.querySelector("i");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    }else{

        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");

    }

});


/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

    revealElements.forEach((element) => {

        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ==========================================
   XENORA FOOD DETAILS MODAL
========================================== */

const foodModal = document.getElementById("foodModal");
const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalIngredients = document.getElementById("modalIngredients");
const modalPrice = document.getElementById("modalPrice");
const modalOrder = document.getElementById("modalOrder");
const foodCards = document.querySelectorAll(".menu-grid .food-card");


const foodDetails = {

    "Italian Pizza": {
        description:
            "A classic Italian-style pizza prepared with rich tomato sauce, premium cheese and fresh ingredients.",
        ingredients:
            "Premium cheese, tomato sauce, fresh vegetables & Italian herbs",
        price: "₹499"
    },

    "Classic Burger": {
        description:
            "A juicy classic burger with a perfectly toasted bun, premium patty, fresh vegetables and signature sauce.",
        ingredients:
            "Premium patty, cheese, lettuce, tomato & signature sauce",
        price: "₹349"
    },

    "Creamy Pasta": {
        description:
            "Smooth and creamy pasta prepared with rich sauce, herbs and fresh ingredients for a luxurious dining experience.",
        ingredients:
            "Pasta, creamy sauce, cheese, herbs & fresh vegetables",
        price: "₹399"
    },

    "Grilled Chicken": {
        description:
            "Tender grilled chicken grilled to perfection with aromatic herbs and premium seasoning.",
        ingredients:
            "Chicken, herbs, garlic, spices & premium seasoning",
        price: "₹549"
    },

    "Chocolate Cake": {
        description:
            "A rich and delicious chocolate cake with a soft texture and premium chocolate flavour.",
        ingredients:
            "Premium chocolate, cocoa, flour, cream & sugar",
        price: "₹299"
    },

    "Classic Cheesecake": {
        description:
            "A smooth and creamy classic cheesecake with a delicious biscuit base and rich flavour.",
        ingredients:
            "Cream cheese, biscuit base, cream, vanilla & sugar",
        price: "₹329"
    },

    "Fresh Fruit Juice": {
        description:
            "A refreshing fruit juice prepared from fresh fruits for a naturally delicious taste.",
        ingredients:
            "Fresh seasonal fruits & natural fruit juice",
        price: "₹199"
    },

    "Cold Coffee": {
        description:
            "A chilled and creamy coffee prepared with rich coffee, smooth milk and a refreshing flavour.",
        ingredients:
            "Premium coffee, chilled milk, cream & sugar",
        price: "₹229"
    },

    "Chicken Steak": {
        description:
            "A premium tender chicken steak grilled with herbs and delicious seasoning.",
        ingredients:
            "Chicken steak, herbs, garlic, spices & premium seasoning",
        price: "₹649"
    }

};


/* OPEN MODAL */

foodCards.forEach(card => {

    card.addEventListener("click", function (event) {

        /* Don't open modal when clicking the Order button */
        if (event.target.closest("button")) {
            return;
        }

        const titleElement = card.querySelector("h3");
        const imageElement = card.querySelector("img");
        const priceElement = card.querySelector(".food-price");

        if (!titleElement || !imageElement) return;

        const title = titleElement.textContent.trim();
        const details = foodDetails[title];

        if (!details) return;

        modalTitle.textContent = title;
        modalImage.src = imageElement.src;
        modalImage.alt = title;

        modalDescription.textContent = details.description;
        modalIngredients.textContent = details.ingredients;
        modalPrice.textContent =
            priceElement ? priceElement.textContent.trim() : details.price;

        foodModal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});


/* CLOSE MODAL */

function closeFoodModal() {

    foodModal.classList.remove("show");

    document.body.style.overflow = "";

}


modalClose.addEventListener("click", closeFoodModal);


/* CLOSE WHEN CLICKING OUTSIDE */

foodModal.addEventListener("click", function (event) {

    if (event.target === foodModal) {
        closeFoodModal();
    }

});


/* CLOSE WITH ESCAPE KEY */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeFoodModal();
    }

});




/* ==========================================
   XENORA - QUICK ORDER SYSTEM
========================================== */

const orderModal = document.getElementById("orderModal");

if (orderModal) {

    const orderClose = document.getElementById("orderClose");
    const orderFoodName = document.getElementById("orderFoodName");
    const orderFoodPrice = document.getElementById("orderFoodPrice");

    const orderQuantity = document.getElementById("orderQuantity");
    const customerName = document.getElementById("customerName");
    const customerPhone = document.getElementById("customerPhone");

    const confirmOrder = document.getElementById("confirmOrder");
    const orderSuccess = document.getElementById("orderSuccess");

  /* ORDER NOW BUTTONS */

document.querySelectorAll(".order-now-btn").forEach(button => {

    button.addEventListener("click", function(event) {

        event.stopPropagation();

        const card = button.closest(".food-card");

        if (!card) return;

        const name =
            card.querySelector("h3").textContent.trim();

        const priceText =
            card.querySelector(".food-price").textContent.trim();

        orderFoodName.textContent = name;
        orderFoodPrice.textContent = priceText;

        orderQuantity.value = "1";
        customerName.value = "";
        customerPhone.value = "";

        orderSuccess.style.display = "none";
        confirmOrder.style.display = "block";

        orderModal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});

    /* ORDER FROM FOOD DETAILS MODAL */

if (modalOrder) {

    modalOrder.addEventListener("click", function () {

        const title = modalTitle.textContent.trim();
        const price = modalPrice.textContent.trim();

        orderFoodName.textContent = title;
        orderFoodPrice.textContent = price;

        orderQuantity.value = "1";
        customerName.value = "";
        customerPhone.value = "";

        orderSuccess.style.display = "none";
        confirmOrder.style.display = "block";

        foodModal.classList.remove("show");

        orderModal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

}



    /* CLOSE */

    function closeOrderModal() {

        orderModal.classList.remove("show");

        document.body.style.overflow = "";

    }


    if (orderClose) {
        orderClose.addEventListener(
            "click",
            closeOrderModal
        );
    }


    /* CLICK OUTSIDE */

    orderModal.addEventListener("click", function(event) {

        if (event.target === orderModal) {
            closeOrderModal();
        }

    });


    /* ESC */

    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {
            closeOrderModal();
        }

    });


    /* CONFIRM ORDER */

    if (confirmOrder) {

        confirmOrder.addEventListener("click", function() {

            const name =
                customerName.value.trim();

            const phone =
                customerPhone.value.trim();

            if (!name || !phone) {

                alert(
                    "Please enter your name and phone number."
                );

                return;
            }

            orderSuccess.style.display = "block";

            confirmOrder.style.display = "none";

        });

    }

}


/* ==========================================
   XENORA MENU FILTER + SEARCH
========================================== */

const categoryButtons = document.querySelectorAll(".category-btn");
const menuCards = document.querySelectorAll(".menu-grid .food-card");
const menuSearch = document.getElementById("menuSearch");

let selectedCategory = "all";


function filterMenu() {

    const searchText = menuSearch.value
        .toLowerCase()
        .trim();

    menuCards.forEach(card => {

        const category = card.dataset.category;
        const foodName = card.querySelector("h3")
            ?.textContent
            .toLowerCase() || "";

        const categoryMatch =
            selectedCategory === "all" ||
            category === selectedCategory;

        const searchMatch =
            foodName.includes(searchText);

        if (categoryMatch && searchMatch) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* CATEGORY BUTTONS */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory =
            button.dataset.category;

        filterMenu();

    });

});


/* SEARCH */

menuSearch.addEventListener("input", filterMenu);


/* ==========================================
   XENORA - SHOPPING CART
========================================== */

const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(localStorage.getItem("xenoraCart")) || [];


/* UPDATE CART COUNT */

function updateCartCount() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;

    /* Bounce animation on update */
    cartCount.classList.remove("bump");
    void cartCount.offsetWidth; /* restart animation */
    cartCount.classList.add("bump");

}


/* ADD ITEM TO CART */

function addToCart(name, price) {

    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    localStorage.setItem(
        "xenoraCart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


/* ORDER BUTTONS */

   document.querySelectorAll(".add-cart-btn").forEach(button => {

    button.addEventListener("click", function(event) {

        event.stopPropagation();

        const card = button.closest(".food-card");

        if (!card) return;

        const name = card.querySelector("h3").textContent.trim();

        const priceText = card
            .querySelector(".food-price")
            .textContent
            .trim();

        const price = Number(
            priceText.replace(/[₹,]/g, "")
        );

        addToCart(name, price);

    });

});


/* INITIAL COUNT */

updateCartCount();

/* ==========================================
   XENORA - CART MODAL SYSTEM
========================================== */

const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartTotal = document.getElementById("cartTotal");
const cartClose = document.getElementById("cartClose");
const checkoutBtn = document.getElementById("checkoutBtn");


/* OPEN CART */

if (cartBtn) {

    cartBtn.addEventListener("click", function () {

        renderCart();

        cartModal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

}


/* RENDER CART */

function renderCart() {

    if (!cartItems || !cartEmpty || !cartTotal) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartEmpty.style.display = "block";
        cartItems.style.display = "none";
        cartTotal.textContent = "₹0";

        if (checkoutBtn) {
            checkoutBtn.style.display = "none";
        }

        return;

    }

    cartEmpty.style.display = "none";
    cartItems.style.display = "flex";

    if (checkoutBtn) {
        checkoutBtn.style.display = "block";
    }


    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>₹${item.price} × ${item.quantity}</p>

            </div>


            <div class="cart-quantity">

                <button
                    class="quantity-minus"
                    data-index="${index}">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    class="quantity-plus"
                    data-index="${index}">
                    +
                </button>

            </div>


            <button
                class="cart-remove"
                data-index="${index}">
                Remove
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent = `₹${total}`;


    /* MINUS */

    document.querySelectorAll(".quantity-minus")
        .forEach(button => {

            button.addEventListener("click", function () {

                const index =
                    Number(this.dataset.index);

                if (cart[index].quantity > 1) {

                    cart[index].quantity--;

                } else {

                    cart.splice(index, 1);

                }

                saveCart();

                renderCart();

            });

        });


    /* PLUS */

    document.querySelectorAll(".quantity-plus")
        .forEach(button => {

            button.addEventListener("click", function () {

                const index =
                    Number(this.dataset.index);

                cart[index].quantity++;

                saveCart();

                renderCart();

            });

        });


    /* REMOVE */

    document.querySelectorAll(".cart-remove")
        .forEach(button => {

            button.addEventListener("click", function () {

                const index =
                    Number(this.dataset.index);

                cart.splice(index, 1);

                saveCart();

                renderCart();

            });

        });

}


/* SAVE CART */

function saveCart() {

    localStorage.setItem(
        "xenoraCart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


/* CLOSE CART */

function closeCartModal() {

    if (!cartModal) return;

    cartModal.classList.remove("show");

    document.body.style.overflow = "";

}


if (cartClose) {

    cartClose.addEventListener(
        "click",
        closeCartModal
    );

}


/* CLICK OUTSIDE */

if (cartModal) {

    cartModal.addEventListener(
        "click",
        function (event) {

            if (event.target === cartModal) {

                closeCartModal();

            }

        }
    );

}


/* ESCAPE */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeCartModal();

        }

    }
);


/* CHECKOUT */



/* ==========================================
   XENORA - RESERVATION SYSTEM
========================================== */

const reservationForm =
    document.getElementById("reservationForm");

if (reservationForm) {

    
    reservationForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name =
            reservationForm.querySelector('input[type="text"]').value.trim();

        const email =
            reservationForm.querySelector('input[type="email"]').value.trim();

        const phone =
            reservationForm.querySelector('input[type="tel"]').value.trim();

        const date =
            reservationForm.querySelector('input[type="date"]').value;

        const time =
            reservationForm.querySelector('input[type="time"]').value;

        const guests =
            reservationForm.querySelector("select").value;

        const request =
            reservationForm.querySelector("textarea").value.trim();


        if (!name || !email || !phone || !date || !time || !guests) {

            alert("Please fill in all required reservation details.");

            return;

        }


        /* Reservation data */

        const reservation = {

            id: "RES-" + Date.now().toString().slice(-6),
            name: name,
            email: email,
            phone: phone,
            date: date,
            time: time,
            guests: guests,
            request: request,
            createdAt: new Date().toISOString()

        };

      // Send reservation notification to owner
const notificationMessage = `
New XENORA Reservation

Name: ${name}
Email: ${email}
Phone: ${phone}

Date: ${date}
Time: ${time}
Guests: ${guests}

Special Request: ${request || "None"}
`;

try {
    const token = localStorage.getItem("xenoraToken");

    const response = await fetch(`${API_BASE}/notifications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token
                ? { Authorization: `Bearer ${token}` }
                : {})
        },
        credentials: "include",
        body: JSON.stringify({
            message: notificationMessage
        })
    });

    const notificationData = await response.json();

    if (!response.ok || !notificationData.success) {
        alert(
            notificationData.message ||
            "Could not send reservation notification."
        );
        return;
    }

} catch (error) {
    console.error("Notification error:", error);
    alert("Could not reach the notification server.");
    return;
}


        /* Save reservation to history list */

        let allReservations =
            JSON.parse(localStorage.getItem("xenoraReservations")) || [];

        allReservations.unshift(reservation);

        localStorage.setItem(
            "xenoraReservations",
            JSON.stringify(allReservations)
        );

        renderMyReservations();


        /* Success message */

        alert(
            `✨ Reservation Confirmed!\n\n` +
            `Name: ${name}\n` +
            `Date: ${date}\n` +
            `Time: ${time}\n` +
            `Guests: ${guests}\n\n` +
            `Thank you for choosing XENORA.`
        );


        /* Reset form */

        reservationForm.reset();

    });

}


/* ==========================================
   XENORA - MY RESERVATIONS RENDER
========================================== */

const reservationsContainer =
    document.getElementById("reservationsContainer");

const noReservations =
    document.getElementById("noReservations");


function renderMyReservations() {

    if (!reservationsContainer || !noReservations) return;

    reservationsContainer.innerHTML = "";

    const reservations =
        JSON.parse(localStorage.getItem("xenoraReservations")) || [];

    if (reservations.length === 0) {

        noReservations.style.display = "block";
        return;

    }

    noReservations.style.display = "none";

    reservations.forEach(res => {

        const card = document.createElement("div");
        card.className = "my-order-card";

        const formattedDate = new Date(res.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        card.innerHTML = `

            <div class="my-order-header">
                <div>
                    <span class="order-status">✓ Confirmed</span>
                    <h3>Reservation #${res.id}</h3>
                </div>
                <div class="order-date">
                    <span>${formattedDate}</span>
                    <span>${res.time}</span>
                </div>
            </div>

            <div class="my-order-customer">
                <p><strong>Name:</strong> ${res.name}</p>
                <p><strong>Guests:</strong> ${res.guests}</p>
                <p><strong>Phone:</strong> ${res.phone}</p>
                ${res.request ? `<p><strong>Request:</strong> ${res.request}</p>` : ""}
            </div>

        `;

        reservationsContainer.appendChild(card);

    });

}

renderMyReservations();

/* ==========================================
   XENORA - CHECKOUT SYSTEM
========================================== */

const checkoutModal =
    document.getElementById("checkoutModal");

const checkoutClose =
    document.getElementById("checkoutClose");

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutSubtotal =
    document.getElementById("checkoutSubtotal");

const checkoutDelivery =
    document.getElementById("checkoutDelivery");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const checkoutName =
    document.getElementById("checkoutName");

const checkoutPhone =
    document.getElementById("checkoutPhone");

const checkoutAddress =
    document.getElementById("checkoutAddress");

const placeOrderBtn =
    document.getElementById("placeOrderBtn");

const checkoutSuccess =
    document.getElementById("checkoutSuccess");

const orderIdElement =
    document.getElementById("orderId");


/* OPEN CHECKOUT */

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;

        }

        // Close Cart
        closeCartModal();

        // Open Xenora Checkout
        renderCheckout();

        checkoutModal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

}


/* RENDER CHECKOUT */

closeCartModal();

function renderCheckout() {

    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;

        const itemElement =
            document.createElement("div");

        itemElement.className =
            "checkout-item";

        itemElement.innerHTML = `

            <div>
                <strong>${item.name}</strong>
                <span>
                    ₹${item.price} × ${item.quantity}
                </span>
            </div>

            <strong>
                ₹${itemTotal}
            </strong>

        `;

        checkoutItems.appendChild(itemElement);

    });


    const delivery = 49;

    const total = subtotal + delivery;

    checkoutSubtotal.textContent =
        `₹${subtotal}`;

    checkoutDelivery.textContent =
        `₹${delivery}`;

    checkoutTotal.textContent =
        `₹${total}`;

}


/* CLOSE CHECKOUT */

function closeCheckout() {

    if (!checkoutModal) return;

    checkoutModal.classList.remove("show");

    document.body.style.overflow = "";

}


if (checkoutClose) {

    checkoutClose.addEventListener(
        "click",
        closeCheckout
    );

}


/* CLICK OUTSIDE */

if (checkoutModal) {

    checkoutModal.addEventListener(
        "click",
        function (event) {

            if (event.target === checkoutModal) {

                closeCheckout();

            }

        }
    );

}


/* PLACE ORDER */

if (placeOrderBtn) {

    placeOrderBtn.addEventListener(
        "click",
        function () {

            const name =
                checkoutName.value.trim();

            const phone =
                checkoutPhone.value.trim();

            const address =
                checkoutAddress.value.trim();


            if (!name || !phone || !address) {

                alert(
                    "Please fill in your name, phone number and address."
                );

                return;

            }


            if (cart.length === 0) {

                alert("Your cart is empty.");

                return;

            }


            /* Generate Order ID */

            const orderId =
                "XEN-" +
                Date.now()
                    .toString()
                    .slice(-6);


            orderIdElement.textContent =
                orderId;


            /* Save order */

            const order = {

    orderId: orderId,

    status: "confirmed",

    customer: {
        name: name,
        phone: phone,
        address: address
    },

    items: cart,

    total:
        cart.reduce(
            (sum, item) =>
                sum +
                item.price * item.quantity,
            0
        ) + 49,

    date:
        new Date().toISOString()

};


            /* SAVE ORDER TO ALL ORDERS */

let allOrders =
    JSON.parse(localStorage.getItem("xenoraOrders")) || [];

allOrders.unshift(order);

localStorage.setItem(
    "xenoraOrders",
    JSON.stringify(allOrders)
);


            /* Show success */

            placeOrderBtn.style.display =
                "none";

            checkoutSuccess.style.display =
                "block";


            /* Clear cart */

            cart = [];

            saveCart();

        }
    );

}

/* ==========================================
   XENORA - MY ORDERS SYSTEM
========================================== */

/* ==========================================
   XENORA - MY ORDERS SYSTEM
========================================== */

/* ==========================================
   XENORA - MY ORDERS SYSTEM
========================================== */

const ordersContainer =
    document.getElementById("ordersContainer");

const noOrders =
    document.getElementById("noOrders");


/* GET ALL ORDERS */

function getAllOrders() {

    return JSON.parse(
        localStorage.getItem("xenoraOrders")
    ) || [];

}


/* SAVE ALL ORDERS */

function saveAllOrders(orders) {

    localStorage.setItem(
        "xenoraOrders",
        JSON.stringify(orders)
    );

}


/* RENDER MY ORDERS */

function renderMyOrders() {

    if (!ordersContainer || !noOrders) return;

    ordersContainer.innerHTML = "";

    const orders = getAllOrders();


    /* NO ORDERS */

    if (orders.length === 0) {

        noOrders.style.display = "block";

        return;

    }


    noOrders.style.display = "none";


    /* Orders are already stored newest-first (unshift on save) */

    orders.forEach(savedOrder => {

        const orderCard =
            document.createElement("div");

        orderCard.className =
            "my-order-card";


        const orderDate =
            new Date(savedOrder.date);


        const formattedDate =
            orderDate.toLocaleDateString("en-IN", {

                day: "2-digit",
                month: "short",
                year: "numeric"

            });


        const formattedTime =
            orderDate.toLocaleTimeString("en-IN", {

                hour: "2-digit",
                minute: "2-digit"

            });


        let itemsHTML = "";


        savedOrder.items.forEach(item => {

            itemsHTML += `

                <div class="my-order-item">

                    <div>

                        <strong>
                            ${item.name}
                        </strong>

                        <span>
                            ₹${item.price} ×
                            ${item.quantity}
                        </span>

                    </div>

                    <strong>
                        ₹${item.price * item.quantity}
                    </strong>

                </div>

            `;

        });


        orderCard.innerHTML = `

            <div class="my-order-header">

                <div>

                    <span class="order-status">
                        ✓ Confirmed
                    </span>

                    <h3>
                        Order #${savedOrder.orderId}
                    </h3>

                </div>


                <div class="order-date">

                    <span>
                        ${formattedDate}
                    </span>

                    <span>
                        ${formattedTime}
                    </span>

                </div>

            </div>


            <div class="my-order-items">

                ${itemsHTML}

            </div>


            <div class="my-order-customer">

                <p>
                    <strong>
                        Customer:
                    </strong>

                    ${savedOrder.customer.name}
                </p>


                <p>
                    <strong>
                        Phone:
                    </strong>

                    ${savedOrder.customer.phone}
                </p>


                <p>
                    <strong>
                        Address:
                    </strong>

                    ${savedOrder.customer.address}
                </p>

            </div>


            <div class="my-order-footer">

                <span>
                    Total
                </span>

                <strong>
                    ₹${savedOrder.total}
                </strong>

            </div>

        `;


        ordersContainer.appendChild(orderCard);

    });

}


/* LOAD ORDERS */

renderMyOrders();





/* ==========================================
   XENORA - AUTHENTICATION (Login / Signup)
   Connects to the Node.js/Express backend.
   Change API_BASE to your deployed backend URL.
========================================== */

const API_BASE = "https://xenora-backend.onrender.com/api";

const authModal = document.getElementById("authModal");
const authClose = document.getElementById("authClose");
const accountBtn = document.getElementById("accountBtn");
const accountLabel = document.getElementById("accountLabel");

const tabLogin = document.getElementById("tabLogin");
const tabSignup = document.getElementById("tabSignup");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginError = document.getElementById("loginError");
const signupError = document.getElementById("signupError");

let currentUser = JSON.parse(localStorage.getItem("xenoraUser")) || null;


/* Reflect logged-in state on the account button */
function updateAccountUI() {

    if (!accountBtn || !accountLabel) return;

    if (currentUser) {
        accountLabel.textContent = currentUser.name.split(" ")[0];
        accountBtn.classList.add("logged-in");
    } else {
        accountLabel.textContent = "Login";
        accountBtn.classList.remove("logged-in");
    }

}

updateAccountUI();


/* Open / close auth modal */
function openAuthModal() {
    if (authModal) authModal.classList.add("show");
}

function closeAuthModal() {
    if (authModal) authModal.classList.remove("show");
}

if (accountBtn) {

    accountBtn.addEventListener("click", () => {

        if (currentUser) {

            /* Already logged in -> offer logout */
            const confirmLogout = confirm(`Logged in as ${currentUser.name}.\n\nLog out?`);

            if (confirmLogout) {
                logoutUser();
            }

        } else {
            openAuthModal();
        }

    });

}

if (authClose) {
    authClose.addEventListener("click", closeAuthModal);
}

if (authModal) {

    authModal.addEventListener("click", (e) => {
        if (e.target === authModal) closeAuthModal();
    });

}


/* Tab switching */
if (tabLogin && tabSignup) {

    tabLogin.addEventListener("click", () => {
        tabLogin.classList.add("active");
        tabSignup.classList.remove("active");
        loginForm.style.display = "flex";
        signupForm.style.display = "none";
    });

    tabSignup.addEventListener("click", () => {
        tabSignup.classList.add("active");
        tabLogin.classList.remove("active");
        signupForm.style.display = "flex";
        loginForm.style.display = "none";
    });

}


/* Helper to show inline form errors */
function showAuthError(el, message) {
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
}

function clearAuthError(el) {
    if (!el) return;
    el.textContent = "";
    el.classList.remove("show");
}


/* LOGIN SUBMIT */
if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();
        clearAuthError(loginError);

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        try {

            const res = await fetch(`${API_BASE}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // send/receive httpOnly cookie
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                showAuthError(loginError, data.message || "Login failed");
                return;
            }

            currentUser = data.user;
            localStorage.setItem("xenoraUser", JSON.stringify(currentUser));

            /* Also keep the raw token for API clients where cookies aren't used */
            if (data.token) {
                localStorage.setItem("xenoraToken", data.token);
            }

            updateAccountUI();
            closeAuthModal();
            loginForm.reset();

        } catch (err) {
            showAuthError(
                loginError,
                "Could not reach the server. Is the backend running?"
            );
        }

    });

}


/* SIGNUP SUBMIT */
if (signupForm) {

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();
        clearAuthError(signupError);

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const phone = document.getElementById("signupPhone").value.trim();
        const password = document.getElementById("signupPassword").value;

        try {

            const res = await fetch(`${API_BASE}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name, email, phone, password })
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                showAuthError(signupError, data.message || "Signup failed");
                return;
            }

            currentUser = data.user;
            localStorage.setItem("xenoraUser", JSON.stringify(currentUser));

            if (data.token) {
                localStorage.setItem("xenoraToken", data.token);
            }

            updateAccountUI();
            closeAuthModal();
            signupForm.reset();

        } catch (err) {
            showAuthError(
                signupError,
                "Could not reach the server. Is the backend running?"
            );
        }

    });

}


/* LOGOUT */
async function logoutUser() {

    try {

        await fetch(`${API_BASE}/auth/logout`, {
            method: "POST",
            credentials: "include"
        });

    } catch (err) {
        /* even if the network call fails, clear local state below */
    }

    currentUser = null;
    localStorage.removeItem("xenoraUser");
    localStorage.removeItem("xenoraToken");
    updateAccountUI();

}

/* ==========================================
   XENORA - LOGIN REQUIRED GATE
========================================== */

function updateAuthGate() {
    if (currentUser) {
        document.body.classList.remove("auth-locked");
    } else {
        document.body.classList.add("auth-locked");
        openAuthModal();
    }
}

/* Check authentication when page starts */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateAuthGate, { once: true });
} else {
    updateAuthGate();
}

/* Re-check after login/signup */
const xenoraOriginalUpdateAccountUI = updateAccountUI;

updateAccountUI = function () {
    xenoraOriginalUpdateAccountUI();
    updateAuthGate();
};

