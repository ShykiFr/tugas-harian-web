$(document).ready(function() {
    const $inputUser = $('#login-input');
    const $btnSubmit = $('#btn-next');

    $btnSubmit.on('click', function(e) {
        e.preventDefault();
        const username = $inputUser.val().trim();

        if (!username) {
            $inputUser.css('border-color', 'red');
            alert('Mohon masukkan email, nomor HP, atau username Anda!');
            return;
        }

        const teksAsli = $(this).text();
        
        $(this).text('Memproses...').css('opacity', '0.5');

        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
            success: function(response) {
                localStorage.setItem('currentUser', username);
                window.location.href = 'home.html';
            },
            error: function() {
                alert('Gagal terhubung ke server.');
                $btnSubmit.text(teksAsli).css('opacity', '1');
            }
        });
    });

    $inputUser.on('input', function() {
        $(this).css('border-color', 'var(--border-color)');
    });
});