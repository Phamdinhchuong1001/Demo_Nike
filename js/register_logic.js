document.getElementById('registerButton').addEventListener('click', function (e) {
    e.preventDefault();

    // 1. Thu thập và làm sạch dữ liệu đầu vào
    const username = document.getElementById('username').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('registerMessage');

    // Xóa thông báo cũ và reset màu
    message.textContent = '';
    message.style.color = 'red';

    // 2. Kiểm tra tính hợp lệ của dữ liệu

    // Kiểm tra trường rỗng
    if (!username || !email || !password || !confirmPassword || !phone) {
        message.textContent = 'Vui lòng điền đầy đủ thông tin.';
        return;
    }

    // Kiểm tra định dạng Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        message.textContent = 'Lỗi: Địa chỉ email không hợp lệ.';
        return;
    }

    // Kiểm tra Mật khẩu (tối thiểu 6 ký tự)
    if (password.length < 6) {
        message.textContent = 'Lỗi: Mật khẩu phải có ít nhất 6 ký tự.';
        return;
    }

    // Kiểm tra Nhập lại Mật khẩu
    if (password !== confirmPassword) {
        message.textContent = 'Lỗi: Mật khẩu xác nhận không khớp.';
        return;
    }

    // 3. Kiểm tra và Lưu tài khoản vào Local Storage

    // Kiểm tra xem đã tồn tại user với email này chưa
    const storedUser = localStorage.getItem('user_' + email);
    if (storedUser) {
        message.textContent = 'Lỗi: Tài khoản email này đã tồn tại.';
        return;
    }

    // Tạo đối tượng user
    const user = {
        username: username,
        phone: phone,
        email: email,
        password: password // LƯU Ý: Trong môi trường thực, cần mã hóa mật khẩu trước khi lưu
    };

    // Lưu user vào Local Storage với key 'user_[email]'
    localStorage.setItem('user_' + email, JSON.stringify(user));

    // 4. Thông báo thành công và Chuyển hướng
    message.style.color = 'green';
    message.textContent = 'Đăng ký thành công! Đang chuyển hướng...';

    // Chuyển hướng sang trang đăng nhập sau 2 giây
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
});