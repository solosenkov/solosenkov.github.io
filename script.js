// ===================================
// MODERN PORTFOLIO - INTERACTIVE FEATURES
// ===================================

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const nav = document.querySelector('.nav');
const jokeContainer = document.getElementById('joke-container');
const newJokeBtn = document.getElementById('new-joke-btn');

// ===================================
// THEME TOGGLE (Dark/Light Mode)
// ===================================
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  
  themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
mobileMenuToggle?.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  nav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuToggle?.classList.remove('active');
    nav?.classList.remove('active');
  });
});

// ===================================
// SMOOTH SCROLL
// ===================================
document.querySelectorAll('.smooth-scroll').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ===================================
// SCROLL ANIMATIONS (AOS-like)
// ===================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
  });
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.background = 'rgba(15, 15, 35, 0.95)';
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.background = 'rgba(15, 15, 35, 0.8)';
    header.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ===================================
// CHUCK NORRIS API
// ===================================
function fetchJoke() {
  jokeContainer.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
  
  fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(data => {
      jokeContainer.innerText = data.value;
    })
    .catch(error => {
      jokeContainer.innerText = 'Failed to get joke. Please try again.';
      console.error('Error fetching joke:', error);
    });
}

// Load initial joke
fetchJoke();

// New joke button
newJokeBtn?.addEventListener('click', fetchJoke);

// ===================================
// LAZY LOADING IMAGES
// ===================================
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    images.forEach(img => {
      img.src = img.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

// ===================================
// SCROLL INDICATOR
// ===================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollIndicator.style.opacity = '0';
    } else {
      scrollIndicator.style.opacity = '1';
    }
  });
}

// ===================================
// PARALLAX EFFECT FOR HERO BACKGROUND
// ===================================
const heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  });
}

// ===================================
// TYPING EFFECT FOR HERO SUBTITLE (Optional)
// ===================================
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ===================================
// INITIALIZE ALL FEATURES
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollAnimations();
  initLazyLoading();
  
  // Optional: Add typing effect to hero subtitle
  // const heroSubtitle = document.querySelector('.hero-subtitle');
  // if (heroSubtitle) {
  //   const originalText = heroSubtitle.textContent;
  //   typeWriter(heroSubtitle, originalText, 80);
  // }
});

// ===================================
// PAGE LOAD ANIMATION
// ===================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});
