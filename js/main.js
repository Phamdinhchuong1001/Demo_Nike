(function ($) {
    "use strict";

    // Hàm điều khiển Spinner tải trang: Ẩn spinner sau 1ms.
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Khởi tạo thư viện WOW.js để kích hoạt các hiệu ứng animation khi cuộn trang.
    new WOW().init();


    // Xử lý thanh Navbar cố định (Sticky Navbar): Thêm class fixed và style khi cuộn xuống.
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('position-fixed bg-dark shadow-sm');
        } else {
            $('.navbar').removeClass('position-fixed bg-dark shadow-sm');
        }
    });
    
    
    // Xử lý nút "Back to top": Hiển thị/Ẩn nút và xử lý cuộn lên đầu trang.
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Khởi tạo Owl Carousel cho phần Đánh giá (Testimonials).
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });

    
})(jQuery);