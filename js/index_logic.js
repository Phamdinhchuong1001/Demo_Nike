document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userName = sessionStorage.getItem('loggedInUser');
    const userIcon = document.getElementById('userIcon');
    const userLink = document.getElementById('userLink');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const logoutButton = document.getElementById('logoutButton');

    if (isLoggedIn === 'true' && userName) {
        // Đã đăng nhập: Ẩn Icon, hiện Tên và Nút Đăng xuất
        if (userIcon) userIcon.style.display = 'none';
        if (userLink) userLink.href = '#'; // Hoặc link đến trang profile
        if (userNameDisplay) {
            userNameDisplay.textContent = 'Xin chào, ' + userName; // Hiển thị tên
            userNameDisplay.style.display = 'inline';
        }
        if (logoutButton) {
            logoutButton.classList.remove('d-none');
        }
    } else {
        // Chưa đăng nhập: Hiện Icon, ẩn Tên và Nút Đăng xuất
        if (userIcon) userIcon.style.display = 'inline';
        if (userLink) userLink.href = 'login.html';
        if (userNameDisplay) userNameDisplay.style.display = 'none';
        if (logoutButton) logoutButton.classList.add('d-none');
    }

    // Xử lý nút Đăng xuất
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('loggedInUser');
            // Tải lại trang để cập nhật giao diện
            window.location.reload(); 
        });
    }
});