/* ELEMENTS */
const navbar = document.querySelector('.navbar');
const searchForm = document.querySelector(".search-form");
const cartContainer = document.querySelector(".cart-items-container");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const buyBtn = document.querySelector(".btn-buy");
const searchInput = document.getElementById("search-box");
const menuCards = document.querySelectorAll(".card");
const searchBtn = document.getElementById("search-btn");
const contactForm = document.getElementById("contact-form");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navLinks a");
const menuBtn = document.getElementById("menu-btn");
const navMenu = document.querySelector(".navLinks");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.toggle("active");
});

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

document.querySelector('.navLinks a[href="#home"]').classList.add("active");

document.addEventListener("DOMContentLoaded", () => {

  /* STATE */
  let cart = [];

  /* NAVBAR SCROLL */
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 80);
  });

  /* SEARCH RESET FUNCTION */
  function resetSearch() {
    searchInput.value = "";

    menuCards.forEach(card => {
      card.style.display = "";
    });
  }

  /* SEARCH BUTTON (OPEN/CLOSE) */
  searchBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (searchForm.classList.contains("active")) {
      searchForm.classList.remove("active");
      resetSearch();
      return;
    }

    document.getElementById("menu").scrollIntoView({
      behavior: "smooth"
    });

    searchForm.classList.add("active");

    setTimeout(() => {
      searchInput.focus();
    }, 500);
  });

  searchForm.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  /* CLOSE BY CLICKING OUTSIDE THE PAGE */
  document.addEventListener("click", () => {
    if (searchForm.classList.contains("active")) {
      searchForm.classList.remove("active");
      resetSearch();
    }
  });

  /* ENTER */
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const value = searchInput.value.toLowerCase().trim();

      menuCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(value) ? "" : "none";
      });
    }
  });

  /* SEARCH FILTER */
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();

    menuCards.forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = name.includes(value) ? "" : "none";
    });
  });

  /* CART DRAWER TOGGLE */
  document.querySelector(".fa-cart-shopping").addEventListener("click", () => {
    cartContainer.classList.toggle("active");
  });

  /* ADD TO CART */
  window.addToCart = function (name, price) {
    const item = cart.find(i => i.name === name);

    if (item) {
      item.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    updateCart();
    cartContainer.classList.add("active");
  };

  /* UPDATE CART */
  function updateCart() {
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      const li = document.createElement("li");
      li.innerHTML = `
                <span>${item.name}</span>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="decreaseQty(${index})">−</button>
                    <span class="qty">${item.qty}</span>
                    <button class="qty-btn" onclick="increaseQty(${index})">+</button>
                    <span class="remove-btn" onclick="removeItem(${index})">✖</span>
                </div>
            `;
      cartItemsList.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
  }

  window.increaseQty = function (index) {
    cart[index].qty++;
    updateCart();
  };

  window.decreaseQty = function (index) {
    cart[index].qty--;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    updateCart();
  };

  window.removeItem = function (index) {
    cart.splice(index, 1);
    updateCart();
  };

  /* BUY NOW */
  buyBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("🛒 Your cart is empty.");
      return;
    }

    alert("✅ Your order has been successfully received. Thank you!");
    cart = [];
    updateCart();
    cartContainer.classList.remove("active");
  });

});

/* CONTACT FORM ALERTS */

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("⚠️ Please fill in all fields before sending your message.");
    return;
  }

  alert("✅ Your message has been successfully sent. We will get back to you shortly!");

  contactForm.reset();
});


function resetSearch() {
  searchInput.value = "";

  menuCards.forEach(card => {
    card.style.display = "";
  });
}

const items = document.querySelectorAll('.scroll-animate');

window.addEventListener('scroll', () => {
  items.forEach(item => {
    const position = item.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      item.classList.add('active');
    }
  });
});


/* Scroll */
  function enableScroll() {
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
    window.removeEventListener("wheel", enableScroll);
    window.removeEventListener("touchstart", enableScroll);
    window.removeEventListener("keydown", enableScroll);
  }

  window.addEventListener("wheel", enableScroll, { passive: true });
  window.addEventListener("touchstart", enableScroll, { passive: true });
  window.addEventListener("keydown", enableScroll);

  const sliders = document.querySelectorAll(
  '.slide-left, .slide-right, .slide-up'
);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.6 }
  );

  sliders.forEach(el => observer.observe(el));

  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.classList.remove("no-scroll");
    }, 2500); 
  });