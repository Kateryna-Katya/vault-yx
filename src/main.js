document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Анимация появления Hero (запуск через класс в body)
    setTimeout(() => {
        document.body.classList.add('is-loaded');
    }, 100);

    // 3. ЛОГИКА МОБИЛЬНОГО МЕНЮ (ИСПРАВЛЕНО)
    const burgerOpen = document.getElementById('burger-open');
    const burgerClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    function toggleMenu() {
        mobileMenu.classList.toggle('is-active');
        // Блокируем скролл body при открытом меню
        if (mobileMenu.classList.contains('is-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    if (burgerOpen) burgerOpen.addEventListener('click', toggleMenu);
    if (burgerClose) burgerClose.addEventListener('click', toggleMenu);

    // Закрытие меню при клике на любой пункт навигации
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('is-active');
            document.body.style.overflow = '';
        });
    });

    // 4. ПЛАВНЫЙ СКРОЛЛ К СЕКЦИЯМ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. АККОРДЕОН FAQ
    const faqTriggers = document.querySelectorAll('.faq-item__trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.parentElement;
            const isOpen = parent.classList.contains('faq-item--active');
            
            // Закрываем другие открытые пункты
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('faq-item--active');
            });

            if (!isOpen) {
                parent.classList.add('faq-item--active');
            }
        });
    });

    // 6. ВАЛИДАЦИЯ ТЕЛЕФОНА (ТОЛЬКО ЦИФРЫ)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

    // 7. МАТЕМАТИЧЕСКАЯ КАПЧА И ОТПРАВКА ФОРМЫ
    const contactForm = document.getElementById('ai-contact-form');
    const captchaLabel = document.getElementById('captcha-question');
    const captchaInput = document.getElementById('captcha-answer');
    const formMessage = document.getElementById('form-message');

    if (captchaLabel) {
        let n1 = Math.floor(Math.random() * 10) + 1;
        let n2 = Math.floor(Math.random() * 10) + 1;
        let correctAnswer = n1 + n2;
        captchaLabel.innerText = `${n1} + ${n2} =`;

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                if (parseInt(captchaInput.value) !== correctAnswer) {
                    alert('Неправильный ответ на проверочный пример!');
                    return;
                }

                // Имитация AJAX отправки
                const btn = contactForm.querySelector('button');
                btn.disabled = true;
                btn.innerText = 'Отправка...';

                setTimeout(() => {
                    formMessage.style.display = 'flex';
                    contactForm.reset();
                    // Через 4 секунды возвращаем форму в исходный вид
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                        btn.disabled = false;
                        btn.innerText = 'Отправить запрос';
                    }, 4000);
                }, 1500);
            });
        }
    }

    // 8. REVEAL ON SCROLL (ПОЯВЛЕНИЕ БЛОКОВ)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 9. COOKIE POPUP
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (cookiePopup && !localStorage.getItem('vault_cookies_accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('is-show');
        }, 2500);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            cookiePopup.classList.remove('is-show');
            localStorage.setItem('vault_cookies_accepted', 'true');
        });
    }

    console.log("Vault-YX Blog: System Online 🚀");
});