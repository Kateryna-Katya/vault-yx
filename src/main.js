document.addEventListener('DOMContentLoaded', () => {
    // Инициализация иконок Lucide
    lucide.createIcons();

    // Триггер анимации входа (Vanilla JS)
    setTimeout(() => {
        document.body.classList.add('is-loaded');
    }, 100);

    // Плавный скролл для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Учитываем высоту хедера при прокрутке
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Эффект микро-движения для логотипа
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mousemove', (e) => {
            const { offsetX, offsetY, target } = e;
            const { clientWidth, clientHeight } = target;
            const xPos = (offsetX / clientWidth) - 0.5;
            const yPos = (offsetY / clientHeight) - 0.5;
            target.style.transform = `translate(${xPos * 8}px, ${yPos * 8}px)`;
        });
        logo.addEventListener('mouseleave', (e) => {
            e.target.style.transform = `translate(0, 0)`;
        });
    }
    
    // Бургер-меню (простая реализация)
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            if(nav.style.display === 'flex') {
                nav.style.position = 'absolute';
                nav.style.top = '80px';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = '#fff';
                nav.style.padding = '20px';
                nav.style.borderBottom = '3px solid #000';
                nav.querySelector('.nav__list').style.flexDirection = 'column';
            }
        });
    }

    console.log("Vault-YX Engine Initialized 🚀");
    // Reveal on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-item__trigger');
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('faq-item--active');
            
            // Закрываем все остальные (опционально)
            faqItems.forEach(i => i.classList.remove('faq-item--active'));
            
            if (!isActive) {
                item.classList.add('faq-item--active');
            }
        });
    });
    // --- Логика формы Контактов ---

    const contactForm = document.getElementById('ai-contact-form');
    const phoneInput = document.getElementById('phone');
    const captchaLabel = document.getElementById('captcha-question');
    const captchaInput = document.getElementById('captcha-answer');
    const formMessage = document.getElementById('form-message');

    // Генерируем капчу
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let captchaResult = num1 + num2;
    if (captchaLabel) {
        captchaLabel.innerText = `${num1} + ${num2} = ?`;
    }

    // Валидация телефона (только цифры)
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // Обработка отправки (имитация AJAX)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Проверка капчи
            if (parseInt(captchaInput.value) !== captchaResult) {
                alert('Ошибка капчи! Попробуйте снова.');
                return;
            }

            // Имитация загрузки
            const submitBtn = contactForm.querySelector('.btn--submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerText = 'Отправка...';

            setTimeout(() => {
                // Показываем сообщение об успехе
                formMessage.style.display = 'flex';
                contactForm.reset();
                
                // Скрываем через 5 секунд (опционально)
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 5000);
            }, 1500);
        });
    }
});