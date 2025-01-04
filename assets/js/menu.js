document.getElementById('menuOpen').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    const button = document.getElementById('menuOpen');
    const navSelect = document.querySelector('.navSelect');
    const menuBackground = document.querySelector('.menuBackground');

    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        menuBackground.classList.remove('open');
        button.textContent = 'Menu';
        navSelect.style.display = 'block';
    } else {
        menu.classList.add('open');
        menuBackground.classList.add('open');
        button.textContent = 'Fechar';
        navSelect.style.display = 'none';
    }
});
