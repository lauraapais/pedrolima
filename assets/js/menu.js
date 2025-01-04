document.getElementById('menuOpen').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    const button = document.getElementById('menuOpen');
    const navSelect = document.querySelector('.navSelect'); // Select the navSelect element

    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        button.textContent = 'Menu';
        navSelect.style.display = 'block'; // Show navSelect when menu is closed
    } else {
        menu.classList.add('open');
        button.textContent = 'Fechar';
        navSelect.style.display = 'none'; // Hide navSelect when menu is open
    }
});
