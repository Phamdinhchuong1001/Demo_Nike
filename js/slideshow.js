document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slideshow-image');
    let currentIndex = 0;

    function showNextImage() {
        // Ẩn hình ảnh hiện tại
        images[currentIndex].classList.remove('active');

        // Chuyển sang hình ảnh tiếp theo
        currentIndex = (currentIndex + 1) % images.length;

        // Hiển thị hình ảnh mới
        images[currentIndex].classList.add('active');
    }

    // Hiển thị hình ảnh đầu tiên khi tải trang
    if (images.length > 0) {
        images[0].classList.add('active');
    }

    // Thiết lập interval để chuyển ảnh sau mỗi 5 giây (5000ms)
    setInterval(showNextImage, 5000); 
});