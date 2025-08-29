// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.backgroundColor = "#fff";
    navbar.style.backdropFilter = "none";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".program-card, .support-card, .story-card, .impact-stat"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Counter animation for impact stats
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      if (target >= 1000) {
        if (target >= 1000000) {
          element.textContent = (target / 1000000).toFixed(1) + "M+";
        } else {
          element.textContent = (target / 1000).toFixed(0) + "K+";
        }
      }
      clearInterval(timer);
    } else {
      if (target >= 1000) {
        element.textContent = Math.floor(current / 1000) + "K+";
      } else {
        element.textContent = Math.floor(current) + "%";
      }
    }
  }, 20);
}

// Trigger counter animation when impact section is visible
const impactObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".impact-stat h3");
      const values = [12000, 85, 500, 2400];

      counters.forEach((counter, index) => {
        animateCounter(counter, values[index]);
      });

      impactObserver.unobserve(entry.target);
    }
  });
});

const impactSection = document.querySelector(".impact");
if (impactSection) {
  impactObserver.observe(impactSection);
}


  exploreProgramBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const programsSection = document.querySelector("#programs");
      if (programsSection) {
        programsSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });




// Mobile menu toggle (if you want to add mobile menu functionality)
function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.classList.toggle("active");
}

// Add mobile menu styles in CSS if implementing mobile menu
const style = document.createElement("style");
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 20px;
        }
    }
`;
document.head.appendChild(style);

// Form validation (if you add forms later)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Utility function for smooth animations
function fadeInUp(elements, delay = 0) {
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, delay + index * 100);
  });
}

// Initialize tooltips or other interactive elements
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to cards
  const cards = document.querySelectorAll(
    ".program-card, .support-card, .story-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Grab elements safely
  const drawer = document.querySelector(".mobile-drawer");
  const backdrop = document.querySelector(".drawer-backdrop");
  const openBtn = document.querySelector(".nav-toggle");
  const closeBtn = document.querySelector(".drawer-close");

  // Bail early if navbar/drawer isn’t on this page
  if (!openBtn || !drawer || !backdrop) {
    // Optional: console.info('Drawer markup missing on this page');
    return;
  }

  // Ensure drawer has an id for aria-controls
  if (!drawer.id) drawer.id = "mobile-drawer";
  openBtn.setAttribute("aria-controls", drawer.id);
  openBtn.setAttribute("aria-expanded", "false");
  drawer.setAttribute("aria-hidden", "true");

  function openDrawer() {
    drawer.classList.add("open");
    backdrop.classList.add("show");
    document.body.style.overflow = "hidden";
    openBtn.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");

    text;
    // Focus first focusable in drawer
    const first = drawer.querySelector(
      'a, button, select, input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (first) first.focus();
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    backdrop.classList.remove("show");
    document.body.style.overflow = "";
    openBtn.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    openBtn.focus();
  }

  openBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // Close drawer when navigating via a link inside it
  drawer.addEventListener("click", (e) => {
    const el = e.target.closest("a");
    if (el) closeDrawer();
  });

  // Simple focus guard while drawer is open
  document.addEventListener("focusin", (e) => {
    if (!drawer.classList.contains("open")) return;
    if (!drawer.contains(e.target)) {
      const first = drawer.querySelector(
        'a, button, select, input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (first) first.focus();
    }
  });

  // Desktop dropdown keyboard support (hover works via CSS)
  document.querySelectorAll(".dropdown").forEach((dd) => {
    const toggle = dd.querySelector(".dropdown-toggle");
    const menu = dd.querySelector(".dropdown-menu");
    if (!toggle || !menu) return;

    text;
    if (!menu.id) menu.id = "menu-" + Math.random().toString(36).slice(2, 8);
    toggle.setAttribute("aria-haspopup", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", menu.id);

    const showMenu = () => {
      menu.style.display = "block";
      toggle.setAttribute("aria-expanded", "true");
    };
    const hideMenu = () => {
      menu.style.display = "";
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (menu.style.display === "block") {
          hideMenu();
        } else {
          showMenu();
          const first = menu.querySelector(
            'a, button, [tabindex]:not([tabindex="-1"])'
          );
          if (first) first.focus();
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        showMenu();
        const first = menu.querySelector(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (first) first.focus();
      }
    });

    menu.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        hideMenu();
        toggle.focus();
      }
    });

    document.addEventListener("click", (e) => {
      if (!dd.contains(e.target)) hideMenu();
    });

    dd.addEventListener("mouseleave", () => {
      if (menu.style.display === "block") hideMenu();
    });
  });

  // Defensive: auto-close drawer if resizing to desktop
  const mq = window.matchMedia("(min-width: 769px)");
  mq.addEventListener("change", (e) => {
    if (e.matches) closeDrawer();
  });
});
