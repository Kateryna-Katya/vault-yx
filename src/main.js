document.addEventListener('DOMContentLoaded', () => {
    // Инициализация иконок Lucide
    lucide.createIcons();

    // Плавный скролл для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Эффект микро-движения для логотипа при наведении
    const logo = document.querySelector('.logo');
    logo.addEventListener('mousemove', (e) => {
        const { offsetX, offsetY, target } = e;
        const { clientWidth, clientHeight } = target;
        const xPos = (offsetX / clientWidth) - 0.5;
        const yPos = (offsetY / clientHeight) - 0.5;
        
        target.style.transform = `translate(${xPos * 10}px, ${yPos * 10}px)`;
    });

    logo.addEventListener('mouseleave', (e) => {
        e.target.style.transform = `translate(0, 0)`;
    });

    console.log("Vault-YX Engine Initialized 🚀");
});