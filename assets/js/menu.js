document.getElementById('menuOpen').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    var navSelect = document.querySelector('.navSelect');
    var menuOpenButton = document.getElementById('menuOpen');

    menu.classList.toggle('open');

    if (menu.classList.contains('open')) {
        navSelect.classList.add("blur");
        menuOpenButton.textContent = 'Fechar';
    } else {
        navSelect.classList.remove("blur");
        menuOpenButton.textContent = 'Menu';
    }
});
