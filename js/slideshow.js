document.addEventListener('DOMContentLoaded', function () {
    // 1. Định nghĩa các biến trạng thái
    const images = document.querySelectorAll('.slideshow-image');
    let currentIndex = 0;

    /**
     * Hàm chuyển sang hình ảnh tiếp theo trong slideshow.
     * Thực hiện: Ẩn ảnh hiện tại, tính toán chỉ mục mới, hiển thị ảnh mới.
     */
    function showNextImage() {
        // Ẩn hình ảnh hiện tại
        images[currentIndex].classList.remove('active');

        // Chuyển sang hình ảnh tiếp theo (dùng toán tử modulo để quay vòng)
        currentIndex = (currentIndex + 1) % images.length;

        // Hiển thị hình ảnh mới
        images[currentIndex].classList.add('active');
    }

    // 2. Khởi tạo
    // Hiển thị hình ảnh đầu tiên khi tải trang
    if (images.length > 0) {
        images[0].classList.add('active');
    }

    // 3. Thiết lập tự động chuyển đổi
    // Thiết lập interval để gọi hàm showNextImage sau mỗi 5 giây (5000ms)
    setInterval(showNextImage, 5000);
});