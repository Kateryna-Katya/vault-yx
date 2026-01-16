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
});