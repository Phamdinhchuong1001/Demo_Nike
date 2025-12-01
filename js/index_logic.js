document.addEventListener('DOMContentLoaded', function () {
    // Lấy trạng thái đăng nhập và tên người dùng từ sessionStorage.
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userName = sessionStorage.getItem('loggedInUser');

    // Lấy các phần tử HTML cần thiết cho giao diện người dùng
    const userLink = document.getElementById('userLink');
    const userDropdownContainer = document.getElementById('userDropdownContainer');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const logoutButton = document.getElementById('logoutButton');

    // Cập nhật giao diện dựa trên trạng thái đăng nhập
    if (isLoggedIn === 'true' && userName) {
        // --- TRẠNG THÁI ĐÃ ĐĂNG NHẬP: Ẩn link đăng nhập, hiện dropdown user ---

        // Ẩn Link/Icon Đăng nhập
        if (userLink) userLink.style.display = 'none';

        // Hiện Dropdown Menu và Cập nhật Tên người dùng
        if (userDropdownContainer) userDropdownContainer.style.display = 'block';

        if (userNameDisplay) {
            userNameDisplay.textContent = userName;
        }

    } else {
        // --- TRẠNG THÁI CHƯA ĐĂNG NHẬP: Hiện link đăng nhập, ẩn dropdown user ---

        // Hiện Link/Icon Đăng nhập
        if (userLink) userLink.style.display = 'block';

        // Ẩn Dropdown Menu
        if (userDropdownContainer) userDropdownContainer.style.display = 'none';

    }

    // Gán sự kiện cho nút Đăng xuất: Xóa dữ liệu phiên và tải lại trang.
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('loggedInUser');
            // Tải lại trang để cập nhật giao diện
            window.location.reload();
        });
    }
});