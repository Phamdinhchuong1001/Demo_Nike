document.getElementById('registerButton').addEventListener('click', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('registerMessage');
    
    // Xóa thông báo cũ và reset màu
    message.textContent = '';
    message.style.color = 'red';

    // 1. Kiểm tra trường rỗng
    if (!username || !email || !password || !confirmPassword) {
        message.textContent = 'Vui lòng điền đầy đủ thông tin.';
        return;
    }

    // 2. Kiểm tra định dạng Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(email)) {
        message.textContent = 'Lỗi: Địa chỉ email không hợp lệ.';
        return;
    }

    // 3. Kiểm tra Mật khẩu (ví dụ: tối thiểu 6 ký tự)
    if (password.length < 6) {
        message.textContent = 'Lỗi: Mật khẩu phải có ít nhất 6 ký tự.';
        return;
    }

    // 4. Kiểm tra Nhập lại Mật khẩu
    if (password !== confirmPassword) {
        message.textContent = 'Lỗi: Mật khẩu xác nhận không khớp.';
        return;
    }

    // 5. Lưu tài khoản vào Local Storage
    // Kiểm tra xem đã tồn tại user với email này chưa
    const storedUser = localStorage.getItem('user_' + email);
    if (storedUser) {
        message.textContent = 'Lỗi: Tài khoản email này đã tồn tại.';
        return;
    }

    const user = {
        username: username,
        email: email,
        password: password 
    };

    localStorage.setItem('user_' + email, JSON.stringify(user));
    
    message.style.color = 'green';
    message.textContent = 'Đăng ký thành công! Đang chuyển hướng...';
    
    // Chuyển hướng sang trang đăng nhập sau 2 giây
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
});