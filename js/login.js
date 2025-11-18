document.getElementById('loginButton').addEventListener('click', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const message = document.getElementById('loginMessage');

    message.textContent = '';
    message.style.color = 'red';

    // 1. Lấy thông tin người dùng từ Local Storage
    const storedUser = localStorage.getItem('user_' + email);
    
    if (!storedUser) {
        message.textContent = 'Lỗi: Email hoặc Mật khẩu không chính xác.';
        return;
    }

    const user = JSON.parse(storedUser);

    // 2. Kiểm tra mật khẩu
    if (user.password === password) {
        // Đăng nhập thành công
        message.style.color = 'green';
        message.textContent = 'Đăng nhập thành công! Đang chuyển hướng...';
        
        // LƯU TRẠNG THÁI: Lưu trạng thái đăng nhập và tên người dùng vào Session Storage
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('loggedInUser', user.username);
        
        // Chuyển hướng sang trang index
        setTimeout(() => {
            window.location.href = '../html/index.html'; 
        }, 1500);

    } else {
        // Sai mật khẩu
        message.textContent = 'Lỗi: Email hoặc Mật khẩu không chính xác.';
    }
});