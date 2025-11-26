document.addEventListener('DOMContentLoaded', function() {
    // 1. Lấy thông tin đăng nhập từ SESSION STORAGE
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userEmail = sessionStorage.getItem('loggedInUserEmail'); 
    
    // Kiểm tra bảo mật: Nếu chưa đăng nhập, chuyển hướng người dùng
    if (isLoggedIn !== 'true' || !userEmail) {
        // alert('Vui lòng đăng nhập để truy cập Hồ sơ.');
        // window.location.href = 'login.html'; // Tạm thời comment để test
        // return; 
    }

    // 2. Định nghĩa các DOM elements và Dữ liệu người dùng
    const infoTabLink = document.getElementById('infoTabLink');
    const updateTabLink = document.getElementById('updateTabLink');
    const personalInfoTab = document.getElementById('personalInfoTab');
    const updateInfoTab = document.getElementById('updateInfoTab');
    const updateProfileForm = document.getElementById('updateProfileForm');
    const fullNameInput = document.getElementById('fullNameInput');
    const phoneNumberInput = document.getElementById('phoneNumberInput');
    const avatarInput = document.getElementById('avatarInput');
    const previewAvatar = document.getElementById('previewAvatar');
    const cancelUpdateButton = document.getElementById('cancelUpdateButton');
    const displayAvatar = document.getElementById('displayAvatar');
    
    // Giả lập dữ liệu người dùng (ưu tiên Local Storage)
    let userData = {
        username: sessionStorage.getItem('loggedInUser') || 'Chương', // Tên mặc định
        email: userEmail || 'chuong@gmail.com', // Email mặc định
        phone: '0819009239', 
        avatar: '../assets/images/profile/avatar.jpg'
    };

    // Lấy chi tiết tài khoản từ LOCAL STORAGE (dùng Email làm Key)
    const storedUserDetail = localStorage.getItem('user_' + userData.email);
    if (storedUserDetail) {
        try {
            const storedData = JSON.parse(storedUserDetail);
            // Cập nhật userData với dữ liệu đã lưu
            userData = { ...userData, ...storedData };
        } catch (e) {
            console.error('Lỗi khi phân tích JSON từ localStorage:', e);
        }
    }


    // Hàm cập nhật hiển thị thông tin
    function updateDisplayInfo() {
        document.getElementById('userNameProfile').textContent = userData.username;
        document.getElementById('userEmailBasic').textContent = userData.email;
        document.getElementById('nameDetail').textContent = userData.username;
        document.getElementById('userEmailDetail').textContent = userData.email;
        document.getElementById('userPhoneDetail').textContent = userData.phone;
        
        // Cập nhật ảnh đại diện ở cả 2 tab
        displayAvatar.src = userData.avatar;
        previewAvatar.src = userData.avatar;

        // Cập nhật giá trị trong form chỉnh sửa
        fullNameInput.value = userData.username;
        phoneNumberInput.value = userData.phone;
    }

    // Chạy lần đầu để hiển thị dữ liệu
    updateDisplayInfo();

    // 3. Logic Chuyển Tab với Animation
    
    // Hàm chuyển sang tab Thông tin cá nhân
    function showPersonalInfoTab() {
        // Cập nhật trạng thái active của nav link
        infoTabLink.classList.add('active');
        updateTabLink.classList.remove('active');

        // Bật animation trượt ngược (Update -> Info)
        personalInfoTab.classList.remove('slide-out', 'active');
        personalInfoTab.classList.add('active'); // Hiển thị Info
        
        updateInfoTab.classList.remove('slide-in', 'active');
        updateInfoTab.classList.add('slide-out'); // Ẩn Update

        // Sau khi animation kết thúc, dọn dẹp class để sẵn sàng cho lần sau
        setTimeout(() => {
            updateInfoTab.classList.remove('slide-out');
            personalInfoTab.classList.remove('slide-out');
        }, 500);
    }

    // Hàm chuyển sang tab Cập nhật thông tin
    function showUpdateInfoTab() {
        // Cập nhật trạng thái active của nav link
        updateTabLink.classList.add('active');
        infoTabLink.classList.remove('active');
        
        // Bật animation trượt (Info -> Update)
        personalInfoTab.classList.add('slide-out'); // Ẩn Info
        updateInfoTab.classList.add('slide-in'); // Hiện Update
        updateInfoTab.classList.add('active');
        personalInfoTab.classList.remove('active');

        // Đặt lại các giá trị trong form trước khi hiển thị
        fullNameInput.value = userData.username;
        phoneNumberInput.value = userData.phone;
        previewAvatar.src = userData.avatar;
    }
    
    // Gắn sự kiện click
    infoTabLink.addEventListener('click', function(e) {
        e.preventDefault();
        showPersonalInfoTab();
    });

    updateTabLink.addEventListener('click', function(e) {
        e.preventDefault();
        showUpdateInfoTab();
    });
    
    // 4. Xử lý Form Cập nhật
    
    // Xử lý xem trước ảnh đại diện
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                previewAvatar.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Xử lý submit form cập nhật
    updateProfileForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 1. Cập nhật dữ liệu từ form
        userData.username = fullNameInput.value;
        userData.phone = phoneNumberInput.value;
        
        const saveProfile = () => {
             // 2. Lưu dữ liệu mới vào Local Storage
            localStorage.setItem('user_' + userData.email, JSON.stringify(userData));
            
            // 3. Cập nhật hiển thị và chuyển tab
            updateDisplayInfo();
            showPersonalInfoTab();
            alert('Cập nhật thông tin thành công!');
        };

        // Xử lý ảnh đại diện (giả lập việc lưu ảnh)
        if (avatarInput.files.length > 0) {
            const file = avatarInput.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                // Lưu Base64 string của ảnh vào userData
                userData.avatar = event.target.result;
                saveProfile();
            };
            reader.readAsDataURL(file);
        } else {
            saveProfile();
        }
    });

    // Xử lý nút Hủy
    cancelUpdateButton.addEventListener('click', function() {
        // Đặt lại giá trị form về dữ liệu hiện tại (nếu người dùng đã thay đổi trước khi hủy)
        updateDisplayInfo(); 
        // Quay lại tab thông tin cá nhân
        showPersonalInfoTab();
    });
    // ⭐ PHẦN BỔ SUNG CHO LOGOUT:
    const logoutButton = document.getElementById('logoutButton');
    //
    // ⭐ 5. LOGIC ĐĂNG XUẤT ⭐
    
    /**
     * Xử lý đăng xuất: Xóa session và chuyển hướng về trang chủ.
     */
    function handleLogout() {
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            // Xóa tất cả thông tin đăng nhập khỏi Session Storage
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('loggedInUser');
            sessionStorage.removeItem('loggedInUserEmail');

            // Chuyển hướng về trang chủ
            window.location.href = '../html/index.html';
        }
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
    // ⭐ KẾT THÚC LOGIC ĐĂNG XUẤT ⭐
});