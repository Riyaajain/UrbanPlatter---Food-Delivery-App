// Load cart from storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// FOOD DATA
let foodItems = [
    { name: "Burger", price: 120, img: "images/burger.jpg", category: "food" },
    { name: "Onion Pizza", price: 150, img: "images/pizza.jpg", category: "food" },
    { name: "Pasta", price: 180, img: "images/pasta.jpg", category: "food" },
    { name: "Sandwich", price: 100, img: "images/sandwich.jpg", category: "food" },
    { name: "Fries", price: 90, img: "images/fries.jpg", category: "food" },
    { name: "Noodles", price: 150, img: "images/noodles.jpg", category: "food" },
    { name: "Dosa", price: 80, img: "images/dosa.jpg", category: "food" },
    { name: "Pav Bhaji", price: 100, img: "images/pav bhaji.jpg", category: "food" },
    { name: "Corn Pizza", price: 250, img: "images/corn pizza.jpg", category: "food" },
    { name: "Paneer Tikka Pizza", price: 350, img: "images/paneer tikka pizza.jpg", category: "food" },
    { name: "Cheese Chutni Sandwich", price: 100, img: "images/cheese chutni sandwich.jpg", category: "food" },

    { name: "Coke", price: 50, img: "images/coke.jpg", category: "drink" },
    { name: "Juice", price: 80, img: "images/juice.jpg", category: "drink" },
    { name: "Coffee", price: 120, img: "images/coffee.jpg", category: "drink" },
    { name: "Milkshake", price: 140, img: "images/milk shake.jpg", category: "drink" },
    { name: "ButterMilk", price: 80, img: "images/Buttermilk.jpg", category: "drink" },
    { name: "Chai", price: 50, img: "images/chai.jpg", category: "drink" },
    { name: "Chocolate Shake", price: 180, img: "images/chocolate shake.jpg", category: "drink" },
    { name: "Sprite", price: 50, img: "images/sprite.jpg", category: "drink" },
    { name: "Hot Chocolate", price: 150, img: "images/hot chocolate.jpg", category: "drink" },
    { name: "Laate", price: 250, img: "images/laate.jpg", category: "drink" },
    { name: "Macha", price: 275, img: "images/macha.jpg", category: "drink" },

    { name: "Ice Cream", price: 90, img: "images/ice cream.jpg", category: "dessert" },
    { name: "Cake", price: 150, img: "images/cake.jpg", category: "dessert" },
    { name: "Brownie", price: 120, img: "images/brownie.jpg", category: "dessert" },
    { name: "Waffles", price: 150, img: "images/waffles.jpg", category: "dessert" },
    { name: "PanCakes", price: 130, img: "images/pan cakes.jpg", category: "dessert" },
    { name: "Cheese Cake", price: 150, img: "images/cheese cake.jpg", category: "dessert" },
    { name: "Kulfi", price: 70, img: "images/kulfi.jpg", category: "dessert" },
    { name: "Rasgulla", price: 200, img: "images/rasgulla.jpg", category: "dessert" },
    { name: "Milk Cake", price: 400, img: "images/milk cake.jpg", category: "dessert" },
    { name: "Kaju Katli", price: 550, img: "images/kaju katli.jpg", category: "dessert" },
];

// Display items
function displayFood(items) {
    let menu = document.getElementById("menu");
    menu.innerHTML = "";

    items.forEach(food => {
        let div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${food.img}">
            <h3>${food.name}</h3>
            <p>₹${food.price}</p>
            <button onclick="addToCart('${food.name}', ${food.price})">Add</button>
        `;

        menu.appendChild(div);
    });
}

// Search
function searchFood() {
    let value = document.getElementById("search").value.toLowerCase();

    let filtered = foodItems.filter(f =>
        f.name.toLowerCase().includes(value)
    );

    displayFood(filtered);
}

// Filter
function filterFood(category) {
    let filteredItems;

    switch(category) {
        case "food":
        case "drink":
        case "dessert":
            filteredItems = foodItems.filter(item => item.category === category);
            break;

        default:
            filteredItems = foodItems;
    }

    displayFood(filteredItems);
}

// Cart functions
function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let total = document.getElementById("total");

    cartItems.innerHTML = "";
    let sum = 0;

    cart.forEach((p, i) => {
        sum += p.price;

        let li = document.createElement("li");
        li.innerHTML = `${p.item} - ₹${p.price} 
        <button onclick="removeItem(${i})">❌</button>`;
        cartItems.appendChild(li);
    });

    total.innerText = sum;

    localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(i) {
    cart.splice(i, 1);
    updateCart();
}

// Cart UI
document.getElementById("cart-btn").onclick = () => {
    document.getElementById("cart").classList.add("active");
};

function closeCart() {
    document.getElementById("cart").classList.remove("active");
}

// ✅ ORDER (NO PAYMENT)
function placeOrder() {
    let location = document.getElementById("location").value;

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    if (!location) {
        alert("Enter delivery location!");
        return;
    }

    // Save order
    saveOrder(location, "Cash on Delivery");

    alert("🎉 Order placed successfully!");

    cart = [];
    updateCart();
    closeCart();
}

// Save Order
function saveOrder(location, payment) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let newOrder = {
        items: cart,
        location: location,
        payment: payment,
        date: new Date().toLocaleString()
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
}

//mobile view
function toggleMobile() {
    document.body.classList.toggle("mobile");
}

// Initial load
displayFood(foodItems);
updateCart();

// Logout
function logout(){
    localStorage.removeItem("user");
    window.location.href = "auth.html";
}

// Location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation not supported");
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            document.getElementById("location").value = data.display_name;
        })
        .catch(() => {
            alert("Unable to fetch address");
        });
}

function showError() {
    alert("Unable to fetch location");
}

// Open in Google Maps
function openMap() {
    let location = document.getElementById("location").value;

    if (!location) {
        alert("Enter location first");
        return;
    }

    let url = `https://www.google.com/maps?q=${location}`;
    window.open(url, "_blank");
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Save mode
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Load saved mode on page load
window.onload = function () {
    let theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    }

    displayFood(foodItems);
    updateCart();
};