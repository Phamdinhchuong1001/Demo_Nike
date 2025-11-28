// Xử lý sự kiện khi người dùng nhấn nút Đăng nhập
document.getElementById('loginButton').addEventListener('click', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const message = document.getElementById('loginMessage');

    message.textContent = '';
    message.style.color = 'red';

    // Lấy thông tin người dùng đã đăng ký từ Local Storage bằng email làm key.
    const storedUser = localStorage.getItem('user_' + email);
    
    // Kiểm tra tồn tại người dùng.
    if (!storedUser) {
        message.textContent = 'Lỗi: Email hoặc Mật khẩu không chính xác.';
        return;
    }

    const user = JSON.parse(storedUser);

    // So sánh mật khẩu nhập vào với mật khẩu đã lưu trữ.
    if (user.password === password) {
        // Đăng nhập thành công: Lưu trạng thái và thông tin người dùng vào Session Storage.
        message.style.color = 'green';
        message.textContent = 'Đăng nhập thành công! Đang chuyển hướng...';
        
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('loggedInUser', user.username);
        // Lưu Email để sử dụng cho các chức năng yêu cầu ID người dùng (ví dụ: giỏ hàng, yêu thích).
        sessionStorage.setItem('loggedInUserEmail', user.email); 
        
        // Chuyển hướng đến trang chính sau 1.5 giây.
        setTimeout(() => {
            window.location.href = '../html/index.html'; 
        }, 1500);

    } else {
        // Sai mật khẩu.
        message.textContent = 'Lỗi: Email hoặc Mật khẩu không chính xác.';
    }
});