document.getElementById('menuOpen').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    var navSelect = document.querySelector('.navSelect');
    var menuOpenButton = document.getElementById('menuOpen');

    menu.classList.toggle('open');

    if (menu.classList.contains('open')) {
        navSelect.style.opacity = '0';
        menuOpenButton.textContent = 'Fechar';
    } else {
        navSelect.style.opacity = '1';
        menuOpenButton.textContent = 'Menu';
    }
});
