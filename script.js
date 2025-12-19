// Navbar Scroll Effect
const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navMenu = document.getElementById("navMenu")

mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  mobileMenuBtn.classList.toggle("active")
})

// Close mobile menu when clicking nav links
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    mobileMenuBtn.classList.remove("active")
  })
})

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Active Nav Link on Scroll
const sections = document.querySelectorAll("section[id]")

function activateNavLink() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 150
    const sectionId = section.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

window.addEventListener("scroll", activateNavLink)

// Counter Animation
const counters = document.querySelectorAll(".stat-number")
let animated = false

function animateCounters() {
  const triggerBottom = window.innerHeight * 0.8

  counters.forEach((counter) => {
    const top = counter.getBoundingClientRect().top

    if (top < triggerBottom && !animated) {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const increment = target / 100
      let count = 0

      const updateCounter = () => {
        if (count < target) {
          count += increment
          counter.textContent = Math.ceil(count)
          setTimeout(updateCounter, 20)
        } else {
          counter.textContent = target
        }
      }

      updateCounter()
    }
  })

  if (counters[0]?.getBoundingClientRect().top < triggerBottom) {
    animated = true
  }
}

window.addEventListener("scroll", animateCounters)

// Testimonial Slider
const testimonialTrack = document.getElementById("testimonialTrack")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")

let currentIndex = 0
const testimonialCards = document.querySelectorAll(".testimonial-card")
const totalCards = testimonialCards.length

function updateSlider() {
  const cardWidth = testimonialCards[0].offsetWidth
  const gap = 30
  const offset = -(currentIndex * (cardWidth + gap))
  testimonialTrack.style.transform = `translateX(${offset}px)`
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < totalCards - 3) {
    currentIndex++
    updateSlider()
  }
})

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--
    updateSlider()
  }
})

// Auto slide testimonials
setInterval(() => {
  if (currentIndex < totalCards - 3) {
    currentIndex++
  } else {
    currentIndex = 0
  }
  updateSlider()
}, 5000)

// Responsive testimonial slider
window.addEventListener("resize", () => {
  updateSlider()
})

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all service cards
document.querySelectorAll(".service-card").forEach((card, index) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(30px)"
  card.style.transition = `all 0.5s ease ${index * 0.1}s`
  observer.observe(card)
})

// Observe why cards
document.querySelectorAll(".why-card").forEach((card, index) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(30px)"
  card.style.transition = `all 0.5s ease ${index * 0.1}s`
  observer.observe(card)
})

// Contact Form Submission
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form values
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    service: document.getElementById("service").value,
    message: document.getElementById("message").value,
  }

  // Show success message
  alert("Terima kasih! Pesan Anda telah dikirim. Tim kami akan segera menghubungi Anda.")

  // Reset form
  contactForm.reset()

  // In production, you would send this data to a server
  console.log("Form Data:", formData)
})

// Newsletter Form
const newsletterForm = document.querySelector(".newsletter-form")

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const email = e.target.querySelector("input").value
  alert(`Terima kasih! Email ${email} telah didaftarkan untuk newsletter kami.`)
  e.target.reset()
})

// Add hover effect to images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)"
    this.style.transition = "transform 0.3s ease"
  })

  img.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)"
  })
})

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroBackground = document.querySelector(".hero-background")
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})
