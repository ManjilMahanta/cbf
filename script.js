// 🌄 Photo Viewer Logic
let currentIndex = 1;

function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex < 1) currentIndex = 10;
  if (currentIndex > 10) currentIndex = 1;
  document.getElementById("main-photo").src = `assets/photos/${currentIndex}.JPG`;
}

// 🔁 On DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  // ✅ Fade-in effect on page load
  document.body.classList.add("fade-in");

  // ✅ Hide loader after DOM ready
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => loader.style.display = "none", 300);
  }

  // ✅ Burger menu toggle
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // 🎬 Modal video preview open
  document.querySelectorAll(".preview-video").forEach((video) => {
    video.addEventListener("click", () => {
      const modal = document.getElementById("videoModal");
      const modalVideo = document.getElementById("modalVideo");
      modalVideo.src = video.getAttribute("src");
      modalVideo.muted = false;
      modalVideo.play();
      modal.style.display = "flex";
    });
  });

  // ❌ Close modal
  const closeModal = document.getElementById("closeModal");
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      const modal = document.getElementById("videoModal");
      const modalVideo = document.getElementById("modalVideo");
      modalVideo.pause();
      modalVideo.src = "";
      modal.style.display = "none";
    });
  }

  // 🔇 Mute toggle
  const muteToggle = document.getElementById("muteToggle");
  if (muteToggle) {
    muteToggle.addEventListener("click", () => {
      const modalVideo = document.getElementById("modalVideo");
      modalVideo.muted = !modalVideo.muted;
      muteToggle.textContent = modalVideo.muted ? "🔇" : "🔊";
    });
  }

  // ⌨️ Arrow keys for photo viewer
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      changeImage(1);
    } else if (e.key === "ArrowLeft") {
      changeImage(-1);
    }
  });

  // 🧠 Scroll-triggered slide-in effect
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".scroll-fade").forEach((el) => observer.observe(el));
});

// 🔁 Fade-out on internal page link navigation
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('http') &&
      !this.hasAttribute('target')
    ) {
      e.preventDefault();
      document.body.classList.remove('fade-in');
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    }
  });
});

// 🔘 Toggle service options (for service form dropdowns)
function toggleServiceList() {
  const options = document.getElementById("service-options");
  if (options) {
    options.style.display = options.style.display === "block" ? "none" : "block";
  }
}

// 💬 Send message to WhatsApp (from contact form)
function sendWhatsAppMessage(event) {
  event.preventDefault();

  const name = document.getElementById("name")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const selectedServices = Array.from(document.querySelectorAll('input[name="services"]:checked'))
    .map(cb => cb.value)
    .join(", ");

  if (!name || !phone || selectedServices.length === 0) {
    alert("Please fill all fields and select at least one service.");
    return;
  }

  const message = `Hello! I'm ${name}, my phone number is ${phone}. I'm interested in the following services: ${selectedServices}`;
  const url = `https://wa.me/123456789?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
