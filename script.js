// ------------------- USER AUTHENTICATION -------------------

// Redirect to login if not logged in
const loggedInEmail = localStorage.getItem("loggedInUser");
if (!loggedInEmail) {
  window.location.href = "login.html";
}

// Show greeting
const users = JSON.parse(localStorage.getItem("users")) || {};
const user = users[loggedInEmail];
if (user) {
  const greetDiv = document.getElementById("userGreeting");
  if (greetDiv) greetDiv.textContent = `Hello, ${user.name}!`;
}

// Logout button
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
}


// Task 0: Setup & jQuery Ready Check
$(document).ready(function () {
  console.log("✅ jQuery is ready!");
});

// ----------- Theme Toggle with Local Storage -----------
const toggle = document.createElement("button");
toggle.textContent = "🌙 Night Mode";
toggle.id = "theme-toggle";
Object.assign(toggle.style, {
  position: "absolute", // ← not fixed anymore
  top: "10px",
  right: "10px",
  padding: "8px 12px",
  border: "none",
  borderRadius: "6px",
  background: "#6f4e37",
  color: "white",
  cursor: "pointer",
});
document.querySelector("header").appendChild(toggle);

// Apply saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
  toggle.textContent = "☀️ Day Mode";
}

// Toggle + save preference
toggle.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark-theme");
  toggle.textContent = dark ? "☀️ Day Mode" : "🌙 Night Mode";
  localStorage.setItem("theme", dark ? "dark" : "light");
});

// ----------- Carousel -----------
const images = [
  "images/240_F_194828624_llDpKzFNYmi6cfHVF8GOOoAe5KTJlc9N.jpg",
  "images/brew-coffee.jpg",
  "images/5.jpg",
  "images/7.jpg",
  "images/8.jpg"
];
let i = 0;
const carouselImg = document.getElementById("carouselImg");
if (carouselImg) {
  setInterval(() => {
    carouselImg.style.opacity = "0";
    setTimeout(() => {
      i = (i + 1) % images.length;
      carouselImg.src = images[i];
      carouselImg.style.opacity = "1";
    }, 500);
  }, 3000);
}

// ----------- Read More Toggle -----------
const readBtn = document.getElementById("readMoreBtn");
if (readBtn) {
  const extraText = document.getElementById("extraText");
  readBtn.addEventListener("click", () => {
    const isHidden = extraText.style.display === "none";
    extraText.style.display = isHidden ? "block" : "none";
    readBtn.textContent = isHidden ? "Read Less" : "Read More";
  });
}

// ----------- Contact Form Validation + Toast Notification -----------
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const msg = document.getElementById("successMessage");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name || !email || !message) {
      msg.textContent = "⚠️ Please fill in all fields.";
      msg.style.color = "red";
      showNotification("⚠️ Please fill in all fields.");
      return;
    }

    if (!emailRegex.test(email)) {
      msg.textContent = "❌ Please enter a valid email address (e.g. user@example.com).";
      msg.style.color = "red";
      showNotification("❌ Invalid email address!");
      return;
    }

    msg.textContent = `✅ Thanks, ${name}! We'll get back to you at ${email} soon.`;
    msg.style.color = "green";
    showNotification("✅ Message sent successfully!", "#28a745");
    form.reset();
  });
}


// ----------- Menu Cards -----------
const menuGrid = document.getElementById("menu-grid");
if (menuGrid) {
  const menuItems = [
    { name: "Espresso", price: "$2.50", img: "images/espresso.jpeg" },
    { name: "Cappuccino", price: "$3.50", img: "images/capucino.jpeg" },
    { name: "Latte", price: "$3.00", img: "images/lattes.jpeg" },
    { name: "Iced Coffee", price: "$2.00", img: "images/iced.jpeg" },
    { name: "Cold Brew", price: "$2.00", img: "images/cold brew.jpeg" },
    { name: "Mocha", price: "$2.50", img: "images/mocha.jpeg" },
    { name: "Americano", price: "$2.30", img: "images/4.jpg" },
    { name: "Macchiato", price: "$3.20", img: "images/5.jpg" },
    { name: "Flat White", price: "$3.00", img: "images/6.jpg" }
  ];

  menuItems.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("menu-card");
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <div class="rating"></div>
      <button class="order-btn">Order Now</button>
    `;
    menuGrid.appendChild(card);
  });

  // ----------- ⭐ Rating Stars -----------
  document.querySelectorAll(".rating").forEach(ratingDiv => {
    for (let s = 1; s <= 5; s++) {
      const star = document.createElement("span");
      star.textContent = "★";
      star.style.fontSize = "20px";
      star.style.cursor = "pointer";
      star.style.color = "gray";
      star.addEventListener("click", () => {
        ratingDiv.querySelectorAll("span").forEach((st, idx) => {
          st.style.color = idx < s ? "gold" : "gray";
        });
      });
      ratingDiv.appendChild(star);
    }
  });

  // ----------- Button Animation + Sound -----------
  const buttons = document.querySelectorAll(".order-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.style.transform = "scale(1.1)";
      setTimeout(() => (btn.style.transform = "scale(1)"), 200);
      const clickSound = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");
      clickSound.play().catch(() => {});
      showNotification("☕ Item added to cart!");
    });
  });
}

// ----------- Keyboard Navigation -----------
document.addEventListener("keydown", (e) => {
  const links = document.querySelectorAll("nav a");
  let current = [...links].findIndex(l => l.classList.contains("active"));
  if (e.key === "ArrowRight") current = (current + 1) % links.length;
  else if (e.key === "ArrowLeft") current = (current - 1 + links.length) % links.length;
  else return;
  links.forEach(l => l.classList.remove("active"));
  links[current].classList.add("active");
});

// ----------- Time-Based Greeting -----------
(function timeGreeting() {
  const hour = new Date().getHours();
  let greet;
  switch (true) {
    case (hour < 12): greet = "Good Morning! ☀️"; break;
    case (hour < 18): greet = "Good Afternoon! ☕"; break;
    default: greet = "Good Evening! 🌙";
  }

  const greetDiv = document.createElement("div");
  greetDiv.id = "greeting";  // add this
  greetDiv.textContent = greet;
  Object.assign(greetDiv.style, {
  textAlign: "center",
  fontSize: "1.5em",
  fontWeight: "bold",
  margin: "20px 0",
  // remove color here to allow CSS to handle it
});
document.body.prepend(greetDiv);

})();

// ----------- Image Gallery Preview (Bootstrap-safe version) -----------
document.addEventListener("DOMContentLoaded", () => {
  const previewImg = document.getElementById("preview");
  const menuGrid = document.getElementById("menu-grid");

  // Make sure both exist
  if (!previewImg || !menuGrid) return;

  // Use event delegation for safety (handles dynamically loaded or lazy images)
  menuGrid.addEventListener("click", (event) => {
    const clicked = event.target;

    if (clicked.tagName === "IMG") {
      // Get correct source (handles lazy-loaded data-src too)
      const src = clicked.getAttribute("src") || clicked.getAttribute("data-src");
      if (src) {
        previewImg.setAttribute("src", src);

        // Simple zoom animation
        previewImg.style.transition = "transform 0.2s ease";
        previewImg.style.transform = "scale(1.05)";
        setTimeout(() => (previewImg.style.transform = "scale(1)"), 200);
      }
    }
  });
});


// ------------------- jQuery FEATURES -------------------

// ----------- Task 1: Search + Autocomplete + Highlight -----------
$(function () {
  if ($("#menu-grid").length) {
    const searchBox = $('<input type="text" id="searchBox" placeholder="🔍 Search coffee..." style="margin:20px auto;display:block;padding:10px;width:60%;border-radius:5px;">');
    $("#menu-grid").before(searchBox);
    const suggestionBox = $('<ul id="suggestions" style="list-style:none;padding:0;margin:10px auto;width:60%;"></ul>');
    $("#menu-grid").before(suggestionBox);

    searchBox.on("keyup", function () {
      const value = $(this).val().toLowerCase();
      $("#suggestions").empty();

      $(".menu-card").each(function () {
        const title = $(this).find("h3").text().toLowerCase();
        const match = title.includes(value);
        $(this).toggle(match);

        const h3 = $(this).find("h3");
        const originalText = h3.text();
        if (value && match) {
          const regex = new RegExp(`(${value})`, "gi");
          h3.html(originalText.replace(regex, "<span style='background:yellow;'>$1</span>"));
        } else {
          h3.html(originalText);
        }

        if (value && match) {
          $("#suggestions").append(`<li style='background:#fff;padding:5px;border:1px solid #ccc;'>${originalText}</li>`);
        }
      });

      $("#suggestions li").on("click", function () {
        searchBox.val($(this).text());
        $("#suggestions").empty();
        searchBox.trigger("keyup");
      });
    });
  }
});

// ----------- Task 4: Scroll Progress Bar -----------
$(() => {
  const progress = $('<div id="scrollProgress"></div>').css({
    position: "fixed",
    top: 0,
    left: 0,
    height: "5px",
    background: "linear-gradient(90deg, #ff9800, #6f4e37)",
    width: "0%",
    zIndex: 9999
  });
  $("body").prepend(progress);

  $(window).on("scroll", () => {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrollPercent = (scrollTop / docHeight) * 100;
    $("#scrollProgress").css("width", scrollPercent + "%");
  });
});

// ----------- Task 5: Animated Counter -----------
$(function () {
  if ($("body").find(".cards").length) {
    const stats = $(`
      <div class="stats" style="text-align:center;margin:30px 0;">
        <h3>Our Achievements</h3>
        <p><span class="count" data-target="1000">0</span>+ Happy Customers ☕</p>
        <p><span class="count" data-target="250">0</span> Daily Brews 🍩</p>
      </div>
    `);
    $(".cards").after(stats);

    $(window).on("scroll", function () {
      $(".count").each(function () {
        const $this = $(this);
        const target = +$this.attr("data-target");
        if ($this.text() == "0" && $(window).scrollTop() + $(window).height() > $this.offset().top) {
          $({ countNum: 0 }).animate(
            { countNum: target },
            {
              duration: 2000,
              easing: "swing",
              step: function () {
                $this.text(Math.floor(this.countNum));
              },
              complete: function () {
                $this.text(this.countNum);
              }
            }
          );
        }
      });
    });
  }
});

// ----------- Task 6: Loading Spinner on Submit -----------
$(function () {
  if ($("#contactForm").length) {
    $("#contactForm").on("submit", function (e) {
      e.preventDefault();
      const btn = $(this).find("button[type='submit']");
      btn.prop("disabled", true).html('<span class="spinner">⏳</span> Please wait...');
      setTimeout(() => {
        btn.prop("disabled", false).text("Send");
        showNotification("✅ Form submitted successfully!");
      }, 2000);
    });
  }
});

// ----------- Task 7: Notification Toast System -----------
function showNotification(msg) {
  const toast = $(`<div class='toast'>${msg}</div>`).css({
    position: "fixed",
    bottom: "30px",
    right: "30px",
    background: "#6f4e37",
    color: "white",
    padding: "12px 18px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    zIndex: 10000,
    opacity: 0
  });
  $("body").append(toast);
  toast.animate({ opacity: 1, bottom: "50px" }, 400, function () {
    setTimeout(() => toast.fadeOut(500, () => toast.remove()), 2000);
  });
}

// ----------- Task 8: Copy to Clipboard Button -----------
$(function () {
  const copyBtn = $('<button id="copyTeam" style="margin-left:10px;background:#ff9800;border:none;padding:6px 10px;border-radius:4px;color:white;cursor:pointer;">Copy Info</button>');
  $("footer").append(copyBtn);
  $("#copyTeam").on("click", function () {
    const text = $("footer").text();
    navigator.clipboard.writeText(text);
    $(this).text("✅ Copied!");
    setTimeout(() => $(this).text("Copy Info"), 2000);
  });
});

// ----------- Task 9: Lazy Loading Images (ONLY for Home Cards) -----------
$(function () {
  // Run only if .cards section exists (home page)
  const $cardsSection = $(".cards");
  if (!$cardsSection.length) return;

  function loadVisibleImages() {
    $cardsSection.find("img.lazy").each(function () {
      const $img = $(this);
      const windowBottom = $(window).scrollTop() + $(window).height();

      if ($img.offset().top < windowBottom + 200) {
        const realSrc = $img.data("src");
        if (realSrc && $img.attr("src") !== realSrc) {
          setTimeout(() => {
            $img.hide().attr("src", realSrc).fadeIn(800);
            $img.removeAttr("data-src").removeClass("lazy");
          }, 1200); // Delay before real image loads
        }
      }
    });
  }

  $(window).on("scroll", loadVisibleImages);
  loadVisibleImages();
});


// ========== USER AUTHENTICATION USING LOCAL STORAGE ==========

// --- SIGN UP ---
$(function () {
  if ($("#signupForm").length) {
    $("#signupForm").on("submit", function (e) {
      e.preventDefault();

      const name = $("#signupName").val().trim();
      const email = $("#signupEmail").val().trim();
      const password = $("#signupPassword").val().trim();
      const message = $("#signupMessage");

      if (!name || !email || !password) {
        message.text("⚠️ Please fill in all fields.").css("color", "red");
        return;
      }

      if (localStorage.getItem(email)) {
        message.text("❌ Account already exists! Try logging in.").css("color", "red");
        return;
      }

      const user = { name, email, password };
      localStorage.setItem(email, JSON.stringify(user));
      message.text("✅ Account created successfully! Redirecting...").css("color", "green");
      setTimeout(() => window.location.href = "login.html", 1500);
    });
  }
});

// --- LOGIN ---
$(function () {
  if ($("#loginForm").length) {
    $("#loginForm").on("submit", function (e) {
      e.preventDefault();

      const email = $("#loginEmail").val().trim();
      const password = $("#loginPassword").val().trim();
      const message = $("#loginMessage");

      const storedUser = localStorage.getItem(email);
      if (!storedUser) {
        message.text("❌ No account found! Please sign up first.").css("color", "red");
        return;
      }

      const user = JSON.parse(storedUser);
      if (user.password !== password) {
        message.text("❌ Incorrect password.").css("color", "red");
        return;
      }

      localStorage.setItem("loggedInUser", email);
      message.text("✅ Login successful! Redirecting...").css("color", "green");
      setTimeout(() => window.location.href = "profile.html", 1200);
    });
  }
});

// --- PROFILE PAGE ---
$(function () {
  if ($("#profileInfo").length) {
    const email = localStorage.getItem("loggedInUser");
    if (!email) {
      window.location.href = "login.html";
      return;
    }

    const user = JSON.parse(localStorage.getItem(email));
    $("#profileInfo").html(`
      <h4>👤 Name: ${user.name}</h4>
      <p>📧 Email: ${user.email}</p>
    `);

    $("#logoutBtn").on("click", function () {
      localStorage.removeItem("loggedInUser");
      showNotification("👋 Logged out successfully!");
      setTimeout(() => window.location.href = "index.html", 1000);
    });
  }
});

// ========== SAVE RATINGS IN LOCAL STORAGE ==========
function saveRating(itemName, stars) {
  let ratings = JSON.parse(localStorage.getItem("ratings")) || {};
  ratings[itemName] = stars;
  localStorage.setItem("ratings", JSON.stringify(ratings));
}

function loadRatings() {
  const ratings = JSON.parse(localStorage.getItem("ratings")) || {};
  $(".menu-card").each(function () {
    const itemName = $(this).find("h3").text();
    const saved = ratings[itemName];
    if (saved) {
      $(this).find(".rating span").each(function (i) {
        $(this).css("color", i < saved ? "gold" : "gray");
      });
    }
  });
}

// Attach to rating system
$(function () {
  $(".rating span").on("click", function () {
    const stars = $(this).index() + 1;
    const itemName = $(this).closest(".menu-card").find("h3").text();
    saveRating(itemName, stars);
  });
  loadRatings();
});



// ----------- Task 10: Currency Converter -----------
const currencySelect = document.getElementById("currencySelect");
const menuCards = document.querySelectorAll(".menu-card");
let rates = { USD: 1 }; // default rate

// 1️⃣ Fetch live rates from the API
fetch("https://v6.exchangerate-api.com/v6/63d55614f0c7bee1415f23ea/latest/USD")
  .then(res => res.json())
  .then(data => {
    rates = data.conversion_rates; // store all rates
    updatePrices(); // update prices immediately
  })
  .catch(err => console.error("Failed to fetch rates:", err));

// 2️⃣ Store original USD price in each card
menuCards.forEach(card => {
  const priceElem = card.querySelector("p");
  const usdPrice = parseFloat(priceElem.textContent.replace("$", ""));
  priceElem.setAttribute("data-usd", usdPrice);
});

// 3️⃣ Function to update prices
function updatePrices() {
  const currency = currencySelect.value;
  menuCards.forEach(card => {
    const priceElem = card.querySelector("p");
    const usdPrice = parseFloat(priceElem.getAttribute("data-usd"));
    const newPrice = (usdPrice * rates[currency]).toFixed(2);
    let symbol = currency === "USD" ? "$" : currency === "KZT" ? "₸" : "TJS ";
    priceElem.textContent = `${symbol}${newPrice}`;
  });
}

// 4️⃣ Event listener for dropdown
currencySelect.addEventListener("change", updatePrices);





// ======================== 🛒 CART SYSTEM =========================
$(function () {
  // Only run on menu page
  if (!$("#menu-grid").length) return;

  // --- Create floating circular cart button ---
  const $cartBtn = $(`
    <button id="cartBtn" title="View Cart">
      🛒
    </button>
  `).css({
    position: "fixed",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#6f4e37",
    color: "#fff",
    border: "none",
    fontSize: "26px",
    cursor: "pointer",
    zIndex: 9999,
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
  });

  $("body").append($cartBtn);

  // --- Create hidden cart panel ---
  const $cartPanel = $(`
    <div id="cartPanel">
      <h3>Your Cart 🧺</h3>
      <ul id="cartItems"></ul>
      <p id="cartTotal"><strong>Total: $0.00</strong></p>
      <button id="clearCart" class="btn btn-danger btn-sm">Clear Cart</button>
      <button id="closeCart" class="btn btn-secondary btn-sm">Close</button>
    </div>
  `).css({
    position: "fixed",
    top: "0",
    right: "-350px",
    width: "300px",
    height: "100%",
    background: "#fff",
    boxShadow: "0 0 15px rgba(0,0,0,0.4)",
    padding: "20px",
    overflowY: "auto",
    zIndex: 9998,
    transition: "right 0.3s ease"
  });

  $("body").append($cartPanel);

  // --- Cart Data ---
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  // --- Update Cart Display ---
  function updateCart() {
    const $list = $("#cartItems");
    $list.empty();

    let total = 0;
    for (const [name, item] of Object.entries(cart)) {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      $list.append(`
        <li style="margin-bottom:10px; border-bottom:1px solid #ddd; padding-bottom:6px;">
          <strong>${name}</strong><br>
          $${item.price.toFixed(2)} × 
          <button class="decrease btn btn-sm btn-outline-dark">−</button>
          <span class="qty">${item.quantity}</span>
          <button class="increase btn btn-sm btn-outline-dark">+</button>
          = <strong>$${itemTotal.toFixed(2)}</strong>
          <button class="remove btn btn-sm btn-outline-danger" style="float:right;">🗑️</button>
        </li>
      `);
    }

    $("#cartTotal strong").text(`Total: $${total.toFixed(2)}`);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // --- Add to Cart from Menu ---
  $(".order-btn").off("click.cart").on("click.cart", function () {
    const card = $(this).closest(".menu-card");
    const name = card.find("h3").text();
    const priceText = card.find("p").attr("data-usd") || card.find("p").text().replace(/[^\d.]/g, "");
    const price = parseFloat(priceText);

    if (!cart[name]) {
      cart[name] = { price: price, quantity: 1 };
    } else {
      cart[name].quantity++;
    }

    updateCart();
    showNotification(`☕ ${name} added to cart!`);
  });

  // --- Open/Close Cart ---
  $("#cartBtn").on("click", function () {
    const isOpen = $cartPanel.css("right") === "0px";
    $cartPanel.css("right", isOpen ? "-350px" : "0");
  });

  $("#closeCart").on("click", function () {
    $cartPanel.css("right", "-350px");
  });

  // --- Quantity Change / Remove / Clear ---
  $("#cartItems").on("click", ".increase", function () {
    const name = $(this).closest("li").find("strong:first").text();
    cart[name].quantity++;
    updateCart();
  });

  $("#cartItems").on("click", ".decrease", function () {
    const name = $(this).closest("li").find("strong:first").text();
    cart[name].quantity--;
    if (cart[name].quantity <= 0) delete cart[name];
    updateCart();
  });

  $("#cartItems").on("click", ".remove", function () {
    const name = $(this).closest("li").find("strong:first").text();
    delete cart[name];
    updateCart();
  });

  $("#clearCart").on("click", function () {
    cart = {};
    updateCart();
  });

  // --- Auto hide on navigation ---
  $("nav a").on("click", function () {
    $cartPanel.css("right", "-350px");
  });

  // --- Initialize on load ---
  updateCart();
});


// === Adjust cart text colors for dark mode ===
function updateCartColors() {
  const isDarkMode = $("body").hasClass("dark-mode"); // or your actual dark mode class
  if (isDarkMode) {
    $("#cartPanel").css({
      background: "#1e1e1e",
      color: "#f8f9fa"
    });
    $("#cartPanel li, #cartPanel strong, #cartPanel span, #cartPanel p, #cartPanel button").css("color", "#f8f9fa");
    $("#cartPanel #cartTotal strong").css("color", "#ffc107"); // gold highlight for total
  } else {
    $("#cartPanel").css({
      background: "#fff",
      color: "#212529"
    });
    $("#cartPanel li, #cartPanel strong, #cartPanel span, #cartPanel p, #cartPanel button").css("color", "#212529");
    $("#cartPanel #cartTotal strong").css("color", "#212529");
  }
}

// Call on load and whenever theme toggles
updateCartColors();

$("#theme-toggle").on("click", function () {
  setTimeout(updateCartColors, 200); // small delay to sync with theme switch
});
