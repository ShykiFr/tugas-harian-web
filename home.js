$(document).ready(function() {
  
  // 1. Integrasi dengan data login temanmu
  // Mengambil username dari local storage yang diset di login.js
  let loggedInUser = localStorage.getItem('currentUser');
  
  // Jika tidak ada data login (bypass URL), kasih nama default
  if (!loggedInUser) {
    loggedInUser = "Guest User";
  }

  // Update foto profil di kotak text area berdasarkan username
  const userAvatarUrl = `https://ui-avatars.com/api/?name=${loggedInUser.replace(' ', '+')}&background=1d9bf0&color=fff`;
  $('#current-user-avatar').attr('src', userAvatarUrl);

  // 2. Fungsi memuat feed dari API (AJAX via jQuery)
  function loadFeeds() {
    $.ajax({
      url: 'https://dummyjson.com/posts?limit=15', // Hit API
      method: 'GET',
      success: function(response) {
        // Hapus animasi loading
        $('#feed-container').empty();

        // Render setiap post
        response.posts.forEach(function(post) {
          const authorName = "User " + post.userId;
          const handle = "@user" + post.userId;
          const likes = post.reactions.likes || Math.floor(Math.random() * 500);
          const views = post.views || Math.floor(Math.random() * 5000);
          
          const postHTML = `
            <article class="post">
              <img src="https://ui-avatars.com/api/?name=${authorName.replace(' ', '+')}&background=random" alt="Avatar" class="avatar">
              <div class="post-content">
                <div class="post-header">
                  <span class="username">${authorName}</span>
                  <span class="handle">${handle}</span> · <span class="time">Just now</span>
                </div>
                <p class="post-text">${post.body}</p>
                
                <div class="post-stats">
                  <div class="stat-item">
                    <svg class="icon" style="width:18px" viewBox="0 0 24 24"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z"></path></svg> 
                    ${Math.floor(Math.random() * 50)}
                  </div>
                  <div class="stat-item">
                    <svg class="icon" style="width:18px" viewBox="0 0 24 24"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88z"></path></svg> 
                    ${Math.floor(Math.random() * 30)}
                  </div>
                  <div class="stat-item">
                    <svg class="icon" style="width:18px" viewBox="0 0 24 24"><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91z"></path></svg> 
                    ${likes}
                  </div>
                  <div class="stat-item">📊 ${views}</div>
                </div>
              </div>
            </article>
          `;

          $('#feed-container').append(postHTML);
        });
      },
      error: function(err) {
        console.error("Gagal load API:", err);
        $('#feed-container').html('<p style="text-align:center; padding:20px; color:red;">Gagal memuat API dari DummyJSON.</p>');
      }
    });
  }

  // Eksekusi load data
  loadFeeds();

  // 3. Logika Membuat Post Baru (Menggunakan username temanmu)
  $('#btn-post').on('click', function() {
    const tweetText = $('#tweet-input').val().trim();
    if(!tweetText) return; 

    // Generate handle twitter otomatis dari username login, ubah spasi jadi underscore
    const userHandle = "@" + loggedInUser.toLowerCase().replace(/\s+/g, '_');

    const newPostHTML = `
      <article class="post" style="background-color: rgba(29, 155, 240, 0.05);">
        <img src="${userAvatarUrl}" alt="Avatar" class="avatar">
        <div class="post-content">
          <div class="post-header">
            <span class="username">${loggedInUser}</span>
            <span class="handle">${userHandle}</span> · <span class="time">Just now</span>
          </div>
          <p class="post-text">${tweetText}</p>
          
          <div class="post-stats">
            <div class="stat-item">💬 0</div>
            <div class="stat-item">🔁 0</div>
            <div class="stat-item">❤️ 0</div>
            <div class="stat-item">📊 0</div>
          </div>
        </div>
      </article>
    `;

    // Sisipkan hasil input ke urutan teratas feed
    $('#feed-container').prepend(newPostHTML);
    $('#tweet-input').val(''); // Kosongkan form
  });

});