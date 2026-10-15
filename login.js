$(document).ready(function() {
    const $inputUser = $('input[placeholder="Email or username"]');
    const $btnSubmit = $('.tombol-abu');

    $btnSubmit.on('click', function(e) {
        e.preventDefault();
        const username = $inputUser.val().trim();

        if (!username) {
            alert('Mohon masukkan email atau username Anda!');
            return;
        }

        const teksAsli = $(this).text();
        $(this).text('Memproses...');

        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
            success: function(response) {
                localStorage.setItem('currentUser', username);
                window.location.href = 'home.html';
            },
            error: function() {
                alert('Gagal terhubung ke server.');
                $btnSubmit.text(teksAsli);
            }
        });
    });
});