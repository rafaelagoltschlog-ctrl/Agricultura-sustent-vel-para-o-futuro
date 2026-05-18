// ==========================================
// SCRIPT.JS - AgriTech Sustentável
// ==========================================

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menu Mobile Responsivo
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fecha o menu mobile ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // 2. Menu Fixo no Topo e Botão Voltar ao Topo
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Efeito no Menu
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Botão Voltar ao Topo
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show-btn');
        } else {
            backToTopBtn.classList.remove('show-btn');
        }
    });

    // 3. Contadores Numéricos Animados
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Menor = mais rápido

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.innerText;
            
            const inc = target / speed;

            if (current < target) {
                counter.innerText = Math.ceil(current + inc);
                setTimeout(animateCounters, 20);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Acionar a animação do contador apenas quando a seção estiver visível
    const observerOptions = {
        root: null,
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // 4. Animação ao aparecer elementos (Scroll Reveal)
    const fadeElements = document.querySelectorAll('.card, .about-text, .about-img, .gallery-item, .stat-box');

    const fadeObserverOptions = {
        root: null,
        threshold: 0.2
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(element => {
        // Configura estado inicial
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeObserver.observe(element);
    });

    // 5. Validação do Formulário de Contato
    const contactForm = document.getElementById('contact-form');
    const formMsg = document.getElementById('form-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita o envio padrão da página

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || phone === '' || message === '') {
                formMsg.innerText = 'Por favor, preencha todos os campos.';
                formMsg.style.color = 'red';
            } else {
                // Simulação de envio com sucesso
                formMsg.innerText = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
                formMsg.style.color = 'green';
                contactForm.reset(); // Limpa o formulário
            }
        });
    }
});