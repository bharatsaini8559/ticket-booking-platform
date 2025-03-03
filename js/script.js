// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const body = document.body;
  const themeToggle = document.createElement("div");
  themeToggle.className = "theme-toggle";
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  body.appendChild(themeToggle);

  // Check for saved theme preference or respect OS preference
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    body.classList.add("dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Theme toggle functionality
  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });

  // Location Popup
  const locationPopup = document.getElementById("locationPopup");
  const locationBtn = document.getElementById("locationBtn");

  if (locationBtn && locationPopup) {
    locationBtn.addEventListener("click", (e) => {
      e.preventDefault();
      locationPopup.classList.add("active");
    });

    // Close location popup when clicking outside
    locationPopup.addEventListener("click", (e) => {
      if (e.target === locationPopup) {
        locationPopup.classList.remove("active");
      }
    });
  }

  // Function to select location
  window.selectLocation = (city) => {
    if (locationPopup) {
      // Set the selected city (you can store this in localStorage)
      localStorage.setItem("selectedCity", city);

      // Update the location button text
      if (locationBtn) {
        locationBtn.innerHTML = `${city} <i class="fas fa-map-marker-alt"></i>`;
      }

      // Close the popup
      locationPopup.classList.remove("active");

      // Optionally refresh the page or update content based on location
      // window.location.reload();
    }
  };

  // Function to search for a location
  window.searchLocation = () => {
    const searchInput = document.getElementById("citySearch");
    if (searchInput && searchInput.value.trim() !== "") {
      selectLocation(searchInput.value.trim());
    }
  };

  // Check if there's a saved location
  const savedCity = localStorage.getItem("selectedCity");
  if (savedCity && locationBtn) {
    locationBtn.innerHTML = `${savedCity} <i class="fas fa-map-marker-alt"></i>`;
  }

  // Hero Banner Slider
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dots .dot");
  const prevBtn = document.querySelector(".slider-controls .prev-btn");
  const nextBtn = document.querySelector(".slider-controls .next-btn");

  if (slides.length > 0) {
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    let slideTimer;

    // Function to show a specific slide
    function showSlide(index) {
      // Hide all slides
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });

      // Remove active class from all dots
      dots.forEach((dot) => {
        dot.classList.remove("active");
      });

      // Show the selected slide and activate the corresponding dot
      slides[index].classList.add("active");
      dots[index].classList.add("active");

      // Update current slide index
      currentSlide = index;
    }

    // Function to show the next slide
    function nextSlide() {
      let next = currentSlide + 1;
      if (next >= slides.length) {
        next = 0;
      }
      showSlide(next);
    }

    // Function to show the previous slide
    function prevSlide() {
      let prev = currentSlide - 1;
      if (prev < 0) {
        prev = slides.length - 1;
      }
      showSlide(prev);
    }

    // Set up event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        resetSlideTimer();
      });
    });

    // Set up event listeners for prev/next buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetSlideTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetSlideTimer();
      });
    }

    // Function to start the automatic slideshow
    function startSlideTimer() {
      slideTimer = setInterval(nextSlide, slideInterval);
    }

    // Function to reset the automatic slideshow
    function resetSlideTimer() {
      clearInterval(slideTimer);
      startSlideTimer();
    }

    // Start the automatic slideshow
    startSlideTimer();
  }

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const testimonialDots = document.querySelectorAll(".testimonial-dots .dot");
  const testimonialPrevBtn = document.querySelector(
    ".testimonial-controls .prev-btn"
  );
  const testimonialNextBtn = document.querySelector(
    ".testimonial-controls .next-btn"
  );

  if (testimonialSlides.length > 0) {
    let currentTestimonial = 0;
    const testimonialInterval = 6000; // 6 seconds
    let testimonialTimer;

    // Function to show a specific testimonial
    function showTestimonial(index) {
      // Hide all testimonials
      testimonialSlides.forEach((slide) => {
        slide.classList.remove("active");
      });

      // Remove active class from all dots
      testimonialDots.forEach((dot) => {
        dot.classList.remove("active");
      });

      // Show the selected testimonial and activate the corresponding dot
      testimonialSlides[index].classList.add("active");
      testimonialDots[index].classList.add("active");

      // Update current testimonial index
      currentTestimonial = index;
    }

    // Function to show the next testimonial
    function nextTestimonial() {
      let next = currentTestimonial + 1;
      if (next >= testimonialSlides.length) {
        next = 0;
      }
      showTestimonial(next);
    }

    // Function to show the previous testimonial
    function prevTestimonial() {
      let prev = currentTestimonial - 1;
      if (prev < 0) {
        prev = testimonialSlides.length - 1;
      }
      showTestimonial(prev);
    }

    // Set up event listeners for dots
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showTestimonial(index);
        resetTestimonialTimer();
      });
    });

    // Set up event listeners for prev/next buttons
    if (testimonialPrevBtn) {
      testimonialPrevBtn.addEventListener("click", () => {
        prevTestimonial();
        resetTestimonialTimer();
      });
    }

    if (testimonialNextBtn) {
      testimonialNextBtn.addEventListener("click", () => {
        nextTestimonial();
        resetTestimonialTimer();
      });
    }

    // Function to start the automatic testimonial rotation
    function startTestimonialTimer() {
      testimonialTimer = setInterval(nextTestimonial, testimonialInterval);
    }

    // Function to reset the automatic testimonial rotation
    function resetTestimonialTimer() {
      clearInterval(testimonialTimer);
      startTestimonialTimer();
    }

    // Start the automatic testimonial rotation
    startTestimonialTimer();
  }

  // Chatbot Functionality
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotContainer = document.getElementById("chatbotContainer");
  const closeChatbot = document.getElementById("closeChatbot");
  const chatbotMessages = document.getElementById("chatbotMessages");
  const chatbotInput = document.getElementById("chatbotInput");
  const sendMessage = document.getElementById("sendMessage");

  if (chatbotToggle && chatbotContainer) {
    chatbotToggle.addEventListener("click", () => {
      chatbotContainer.classList.toggle("active");
    });

    if (closeChatbot) {
      closeChatbot.addEventListener("click", () => {
        chatbotContainer.classList.remove("active");
      });
    }

    // Function to add a message to the chatbot
    function addMessage(message, isUser = false) {
      const messageDiv = document.createElement("div");
      messageDiv.className = isUser ? "message user" : "message bot";
      messageDiv.innerHTML = `<p>${message}</p>`;

      if (chatbotMessages) {
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }
    }

    // Function to handle user message
    function handleUserMessage() {
      if (chatbotInput && chatbotInput.value.trim() !== "") {
        const userMessage = chatbotInput.value.trim();
        addMessage(userMessage, true);
        chatbotInput.value = "";

        // Simulate bot response (replace with actual chatbot logic)
        setTimeout(() => {
          const botResponses = [
            "Thanks for your message! How can I help you with event bookings today?",
            "I can help you find events in your area. What type of events are you interested in?",
            "Would you like me to recommend some popular events happening this weekend?",
            "I can assist with ticket booking issues. Could you provide more details about your question?",
          ];
          const randomResponse =
            botResponses[Math.floor(Math.random() * botResponses.length)];
          addMessage(randomResponse);
        }, 1000);
      }
    }

    // Set up event listeners for sending messages
    if (sendMessage) {
      sendMessage.addEventListener("click", handleUserMessage);
    }

    if (chatbotInput) {
      chatbotInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          handleUserMessage();
        }
      });
    }
  }

  // Event Details Page - Ticket Quantity Selectors
  const qtyBtns = document.querySelectorAll(".qty-btn");

  if (qtyBtns.length > 0) {
    qtyBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const ticketType = this.dataset.ticket;
        const input = document.getElementById(`${ticketType}-qty`);

        if (input) {
          let currentValue = Number.parseInt(input.value);

          if (this.classList.contains("minus")) {
            // Decrease quantity (minimum 0)
            currentValue = Math.max(0, currentValue - 1);
          } else if (this.classList.contains("plus")) {
            // Increase quantity (maximum defined by input max attribute)
            const maxValue = Number.parseInt(input.getAttribute("max") || 10);
            currentValue = Math.min(maxValue, currentValue + 1);
          }

          input.value = currentValue;

          // Update order summary
          updateOrderSummary();
        }
      });
    });

    // Function to update the order summary
    function updateOrderSummary() {
      const summaryItems = document.getElementById("summary-items");
      const totalAmount = document.getElementById("total-amount");
      const checkoutBtn = document.getElementById("checkout-btn");

      if (summaryItems && totalAmount) {
        // Get ticket quantities and prices
        const generalQty = Number.parseInt(
          document.getElementById("general-qty")?.value || 0
        );
        const vipQty = Number.parseInt(
          document.getElementById("vip-qty")?.value || 0
        );
        const backstageQty = Number.parseInt(
          document.getElementById("backstage-qty")?.value || 0
        );

        const generalPrice = 49;
        const vipPrice = 149;
        const backstagePrice = 299;

        // Calculate totals
        const generalTotal = generalQty * generalPrice;
        const vipTotal = vipQty * vipPrice;
        const backstageTotal = backstageQty * backstagePrice;
        const total = generalTotal + vipTotal + backstageTotal;

        // Update summary items
        let summaryHTML = "";

        if (generalQty > 0) {
          summaryHTML += `
            <div class="summary-item">
              <div class="item-name">General Admission x ${generalQty}</div>
              <div class="item-price">$${generalTotal.toFixed(2)}</div>
            </div>
          `;
        }

        if (vipQty > 0) {
          summaryHTML += `
            <div class="summary-item">
              <div class="item-name">VIP Experience x ${vipQty}</div>
              <div class="item-price">$${vipTotal.toFixed(2)}</div>
            </div>
          `;
        }

        if (backstageQty > 0) {
          summaryHTML += `
            <div class="summary-item">
              <div class="item-name">Backstage Pass x ${backstageQty}</div>
              <div class="item-price">$${backstageTotal.toFixed(2)}</div>
            </div>
          `;
        }

        if (summaryHTML === "") {
          summaryHTML = '<p class="empty-cart">No tickets selected</p>';
        }

        summaryItems.innerHTML = summaryHTML;
        totalAmount.textContent = `$${total.toFixed(2)}`;

        // Enable/disable checkout button
        if (checkoutBtn) {
          if (total > 0) {
            checkoutBtn.disabled = false;
          } else {
            checkoutBtn.disabled = true;
          }
        }
      }
    }

    // Initialize order summary
    updateOrderSummary();

    // Add event listeners to quantity inputs for direct changes
    const qtyInputs = document.querySelectorAll(".quantity-selector input");
    qtyInputs.forEach((input) => {
      input.addEventListener("change", updateOrderSummary);
    });

    // Checkout button functionality
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        // Check if age confirmation is required and checked
        const ageConfirm = document.getElementById("age-confirm");
        const termsConfirm = document.getElementById("terms-confirm");

        if (ageConfirm && !ageConfirm.checked) {
          alert("Please confirm that all attendees meet the age requirements.");
          return;
        }

        if (termsConfirm && !termsConfirm.checked) {
          alert("Please agree to the terms and conditions.");
          return;
        }

        // Redirect to checkout page
        window.location.href = "checkout.html";
      });
    }
  }

  // Authentication Page - Tab Switching
  const authTabs = document.querySelectorAll(".auth-tab");
  const authForms = document.querySelectorAll(".auth-form");

  if (authTabs.length > 0 && authForms.length > 0) {
    authTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const tabId = this.dataset.tab;

        // Remove active class from all tabs and forms
        authTabs.forEach((t) => t.classList.remove("active"));
        authForms.forEach((f) => f.classList.remove("active"));

        // Add active class to the clicked tab and corresponding form
        this.classList.add("active");
        document.getElementById(`${tabId}-form`).classList.add("active");
      });
    });

    // Password visibility toggle
    const togglePasswordBtns = document.querySelectorAll(".toggle-password");
    togglePasswordBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const passwordInput = this.previousElementSibling;

        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          this.innerHTML = '<i class="far fa-eye-slash"></i>';
        } else {
          passwordInput.type = "password";
          this.innerHTML = '<i class="far fa-eye"></i>';
        }
      });
    });

    // Password strength meter
    const passwordInput = document.getElementById("signup-password");
    const strengthSegments = document.querySelectorAll(".strength-segment");
    const strengthText = document.querySelector(".strength-text");

    if (passwordInput && strengthSegments.length > 0 && strengthText) {
      passwordInput.addEventListener("input", function () {
        const password = this.value;
        let strength = 0;

        // Check password length
        if (password.length >= 8) {
          strength += 1;
        }

        // Check for uppercase letters
        if (/[A-Z]/.test(password)) {
          strength += 1;
        }

        // Check for numbers
        if (/[0-9]/.test(password)) {
          strength += 1;
        }

        // Check for special characters
        if (/[^A-Za-z0-9]/.test(password)) {
          strength += 1;
        }

        // Update strength meter
        strengthSegments.forEach((segment, index) => {
          segment.className = "strength-segment";

          if (index < strength) {
            if (strength === 1) {
              segment.classList.add("weak");
            } else if (strength === 2 || strength === 3) {
              segment.classList.add("medium");
            } else if (strength === 4) {
              segment.classList.add("strong");
            }
          }
        });

        // Update strength text
        if (password === "") {
          strengthText.textContent = "Password strength";
        } else if (strength === 1) {
          strengthText.textContent = "Weak";
        } else if (strength === 2) {
          strengthText.textContent = "Fair";
        } else if (strength === 3) {
          strengthText.textContent = "Good";
        } else if (strength === 4) {
          strengthText.textContent = "Strong";
        }
      });
    }
  }

  // User Profile Page - Tab Switching
  const profileNavLinks = document.querySelectorAll(".profile-nav ul li a");
  const profileSections = document.querySelectorAll(".profile-section-content");

  if (profileNavLinks.length > 0 && profileSections.length > 0) {
    profileNavLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const sectionId = this.getAttribute("href").substring(1);

        // Remove active class from all nav items and sections
        document.querySelectorAll(".profile-nav ul li").forEach((item) => {
          item.classList.remove("active");
        });
        profileSections.forEach((section) => {
          section.classList.remove("active");
        });

        // Add active class to the clicked nav item and corresponding section
        this.parentElement.classList.add("active");
        document.getElementById(sectionId).classList.add("active");
      });
    });
  }

  // Checkout Page - Payment Method Selection
  const paymentMethods = document.querySelectorAll(".payment-method input");
  const paymentDetails = document.querySelectorAll(".payment-details");

  if (paymentMethods.length > 0 && paymentDetails.length > 0) {
    paymentMethods.forEach((method) => {
      method.addEventListener("change", function () {
        const methodId = this.id;

        // Hide all payment details
        paymentDetails.forEach((details) => {
          details.classList.remove("active");
        });

        // Show the selected payment details
        document.getElementById(`${methodId}-details`).classList.add("active");
      });
    });
  }

  // Scroll Animations
  function handleScrollAnimations() {
    const elements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right, .scale-in"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight * 0.9) {
        element.classList.add("visible");
      }
    });
  }

  // Add animation classes to elements
  function setupScrollAnimations() {
    // Add animation classes to section headings
    document.querySelectorAll("section h2").forEach((heading, index) => {
      heading.classList.add("fade-in");
      heading.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add animation classes to event cards
    document.querySelectorAll(".event-card").forEach((card, index) => {
      card.classList.add("fade-in");
      card.style.transitionDelay = `${0.1 + index * 0.1}s`;
    });

    // Add animation classes to category cards
    document.querySelectorAll(".category-card").forEach((card, index) => {
      card.classList.add("scale-in");
      card.style.transitionDelay = `${0.1 + index * 0.05}s`;
    });

    // Add animation classes to testimonials
    document.querySelector(".testimonial-slider")?.classList.add("fade-in");

    // Add animation classes to client logos
    document.querySelectorAll(".client").forEach((client, index) => {
      client.classList.add("fade-in");
      client.style.transitionDelay = `${0.1 + index * 0.1}s`;
    });

    // Add animation classes to ticket types
    document.querySelectorAll(".ticket-type").forEach((ticket, index) => {
      ticket.classList.add("slide-in-right");
      ticket.style.transitionDelay = `${0.1 + index * 0.1}s`;
    });

    // Add animation classes to profile sections
    document.querySelectorAll(".profile-section-content").forEach((section) => {
      section.querySelectorAll(".details-group").forEach((group, index) => {
        group.classList.add("fade-in");
        group.style.transitionDelay = `${0.1 + index * 0.1}s`;
      });
    });
  }

  // Set up scroll animations
  setupScrollAnimations();

  // Initial check for animations
  handleScrollAnimations();

  // Listen for scroll events
  window.addEventListener("scroll", handleScrollAnimations);
});
