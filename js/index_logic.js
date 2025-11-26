document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userName = sessionStorage.getItem('loggedInUser');

    // Lấy các phần tử HTML cần thiết
    const userLink = document.getElementById('userLink'); // Link/Icon Đăng nhập
    const userDropdownContainer = document.getElementById('userDropdownContainer'); // Container Dropdown
    const userNameDisplay = document.getElementById('userNameDisplay'); // Element hiển thị tên trong Dropdown
    const logoutButton = document.getElementById('logoutButton'); // Nút Đăng xuất

    if (isLoggedIn === 'true' && userName) {
        // --- TRẠNG THÁI ĐÃ ĐĂNG NHẬP ---
        
        // 1. Ẩn Link/Icon Đăng nhập
        if (userLink) userLink.style.display = 'none';

        // 2. Hiện Dropdown Menu và Cập nhật Tên
        if (userDropdownContainer) userDropdownContainer.style.display = 'block'; // Hiển thị Dropdown
        
        if (userNameDisplay) {
            userNameDisplay.textContent = userName; // Hiển thị tên
            // Đảm bảo Dropdown toggle vẫn hoạt động (class 'nav-link dropdown-toggle' trong HTML đã lo)
        }

    } else {
        // --- TRẠNG THÁI CHƯA ĐĂNG NHẬP ---
        
        // 1. Hiện Link/Icon Đăng nhập
        if (userLink) userLink.style.display = 'block'; 

        // 2. Ẩn Dropdown Menu
        if (userDropdownContainer) userDropdownContainer.style.display = 'none';
        
    }

    // Xử lý nút Đăng xuất (Logic vẫn giữ nguyên)
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('loggedInUser');
            // Tải lại trang để cập nhật giao diện
            window.location.reload(); 
        });
    }
});