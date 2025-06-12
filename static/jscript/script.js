document.addEventListener('DOMContentLoaded', function() {
    // --- Typing effect for #mon_nom ---
    const words = ["BA MAMOUDOU", "Développeur", "Créatif", "Curieux"];
    const monNom = document.getElementById('mon_nom');
    let wordIndex = 0, charIndex = 0, typing = true;
    function typeEraseLoop() {
        const currentWord = words[wordIndex];
        if (typing) {
            if (charIndex < currentWord.length) {
                monNom.textContent = currentWord.slice(0, charIndex + 1);
                charIndex++;
                setTimeout(typeEraseLoop, 80);
            } else {
                typing = false;
                setTimeout(typeEraseLoop, 1000);
            }
        } else {
            if (charIndex > 0) {
                monNom.textContent = currentWord.slice(0, charIndex - 1);
                charIndex--;
                setTimeout(typeEraseLoop, 70);
            } else {
                typing = true;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEraseLoop, 500);
            }
        }
    }
    if (monNom) typeEraseLoop();

    // --- Typing effect for #typed-text ---
    const text = "Développeur | Créatif | Curieux";
    const typedText = document.getElementById('typed-text');
    let i = 0;
    function typeWriter() {
        if (typedText && i <= text.length) {
            typedText.textContent = text.slice(0, i);
            i++;
            setTimeout(typeWriter, 70);
        }
    }
    if (typedText) typeWriter();

    // --- Shine animation for button ---
    const btn = document.querySelector('.btn');
    if (btn) {
        const shine = btn.querySelector('.shine');
        function animateShine() {
            shine.style.transition = 'none';
            shine.style.left = '-75%';
            void shine.offsetWidth;
            shine.style.transition = 'left 1s cubic-bezier(.4,1.7,.7,1)';
            shine.style.left = '120%';
        }
        setInterval(animateShine, 2500);
        animateShine();
    }

    // --- Contact Form Logic ---
    const form = document.getElementById('contact-form');
    const emailInput = document.querySelector('#contact-form input[type="email"]');
    const emailError = document.getElementById('email-error');
    const msgDiv = document.getElementById('form-message');

    // Animate form appearance
    if (form) {
        setTimeout(() => {
            form.classList.add('visible');
        }, 200);

        // Reset the form if the message was sent successfully
        // if (form && form.dataset.msgSent === "true") {
        //     form.reset();
        // }
    }

    // Hide the message after 4 seconds
    if (msgDiv) {
        setTimeout(() => {
            msgDiv.style.display = 'none';
        }, 4000);
    }

    // Live email validation
    if (emailInput && emailError) {
        emailInput.addEventListener('input', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value && !emailPattern.test(emailInput.value)) {
                emailError.textContent = "Veuillez entrer une adresse email valide.";
            } else {
                emailError.textContent = "";
            }
        });
    }

    // --- Slider for About Page ---
    const btns = document.querySelectorAll('.slider-btn');
    const slides = document.querySelectorAll('.slider-slide');
    btns.forEach((btn, idx) => {
        btn.addEventListener('click', function() {
            btns.forEach(b => b.classList.remove('active'));
            slides.forEach(s => s.classList.remove('active'));
            btn.classList.add('active');
            slides[idx].classList.add('active');
        });
    });


    const portfolioLink = document.querySelector('.portfolio-link');
    if (portfolioLink) {
        const shine = portfolioLink.querySelector('.shine');
        function animateShine() {
            shine.style.transition = 'none';
            shine.style.left = '-75%';
            void shine.offsetWidth;
            shine.style.transition = 'left 1.2s cubic-bezier(.4,1.7,.7,1)';
            shine.style.left = '120%';
        }
        setInterval(animateShine, 3000);
        animateShine();
    }
});