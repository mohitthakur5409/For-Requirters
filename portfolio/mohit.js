// Typing Animation Loop Fix
const text = [
    "Web Developer.",
    "MCA Student.",
    "Java Programmer.",
    "Open Source Enthusiast."
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;

(function type() {
    if (count === text.length) {
        count = 0;
    }
    currentText = text[count];

    if (isDeleting) {
        letter = currentText.slice(0, --index);
    } else {
        letter = currentText.slice(0, ++index);
    }

    const typingElement = document.getElementById("typing");
    if (typingElement) {
        typingElement.textContent = letter;
    }

    let typeSpeed = 100;
    if (isDeleting) {
        typeSpeed /= 2;
    }

    if (!isDeleting && letter.length === currentText.length) {
        typeSpeed = 1500; // Pause showing full word
        isDeleting = true;
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
})();

// Smooth Scroll Setup
document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        document.querySelector(targetId).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Dynamic Navbar Scroll Effect
window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.style.background = "#0f172a";
        nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.4)";
        nav.style.padding = "15px 10%";
    } else {
        nav.style.background = "rgba(15, 23, 42, 0.95)";
        nav.style.boxShadow = "none";
        nav.style.padding = "20px 10%";
    }
});

// Smooth Fade-In Scroll Animation
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.6s ease-out";
    observer.observe(section);
});