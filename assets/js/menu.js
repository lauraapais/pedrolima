document.getElementById('menuOpen').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    const button = document.getElementById('menuOpen');

    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        button.textContent = 'Menu';
    } else {
        menu.classList.add('open');
        button.textContent = 'Fechar';
    }
});
