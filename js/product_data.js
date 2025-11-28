// Hàm tiện ích: Định dạng tiền tệ
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

// Mảng Dữ liệu Sản phẩm Mẫu (productsData)
const productsData = [
    {
        id: 'field-general-black',
        name: 'Nike Field General (Black)',
        type: 'Lifestyle', // Đã thay đổi: Phân loại chính (Lifestyle/Running/Basketball...)
        category: "Giày Nam | Hàng Mới Về", // Giữ lại cho mục đích hiển thị
        gender: 'Cho Nam',
        price: 3519000,
        originalPrice: null,
        status: ["new"],
        description: 'Đôi giày cổ điển với đế ngoài gai chắc chắn, phù hợp cho cả đi chơi và tập luyện nhẹ. Chất liệu da lộn cao cấp mang lại cảm giác mềm mại và sang trọng. Thiết kế đơn sắc dễ dàng phối hợp với mọi trang phục.',
        images: [
            '../assets/images/product/product_detail/product_1.avif',
            '../assets/images/product/product_detail/p1.avif',
            '../assets/images/product/product_detail/p2.avif',
            '../assets/images/product/product_detail/p3.avif',
        ],
        sizes: [
            { size: 38, available: true },
            { size: 39, available: false },
            { size: 40, available: true },
            { size: 41, available: false }
        ],
    },
    { 
        id: 'field-general-brown', 
        name: 'Nike Field General (Brown)', 
        type: 'Lifestyle', // Đã thêm
        category: "Giày Nữ | Hàng Mới Về", 
        gender: 'Cho Nữ', 
        price: 3519000, 
        originalPrice: null,
        status: ["new"],
        description: 'Phiên bản nâu/trắng của Field General, thiết kế cá tính, mạnh mẽ.', 
        images: ['../assets/images/product/product_2.avif'], 
        sizes: [
            { size: 35.5, available: true }, 
            { size: 38, available: true }, 
            { size: 41, available: true }
        ], 
    },
    { 
        id: 'acg-zoom-gaiadome', 
        name: 'Nike ACG Zoom Gaiadome GORE-TEX SE', 
        type: 'Training', // Đã thêm (Hoặc Outdoor/Hiking)
        category: "Giày Nam | Chống Nước", 
        gender: 'Cho Nam', 
        price: 6609000, 
        originalPrice: 7000000,
        status: ["sale", "memberExclusive"],
        description: 'Giày boot siêu bền bỉ với công nghệ GORE-TEX chống nước tuyệt đối. Đế ngoài chắc chắn và hệ thống Zoom Air mang lại sự thoải mái và độ bền vượt trội cho những chuyến phiêu lưu.', 
        images: ['../assets/images/product/product_3.avif'], 
        sizes: [{ size: 40, available: true }, { size: 42, available: true }], 
    },
    { 
        id: 'air-max-sc', 
        name: 'Nike Air Max SC', 
        type: 'Lifestyle', // Đã thêm
        category: "Giày Nam | Giảm Giá", 
        gender: 'Cho Nam', 
        price: 1909000, 
        originalPrice: 2500000, 
        status: ["sale"], 
        description: 'Thiết kế đơn giản, cổ điển với công nghệ Air Max mang lại sự êm ái.', 
        images: ['../assets/images/product/product_4.avif'], 
        sizes: [{ size: 40, available: true }, { size: 41, available: true }], 
    },
    { 
        id: 'air-force-1-07', 
        name: 'Nike Air Force 1 \'07', 
        type: 'Lifestyle', // Đã thêm
        category: "Giày Nam | Phong cách sống", 
        gender: 'Cho Nam', 
        price: 2919000, 
        originalPrice: null, 
        status: [], 
        description: 'AF1 là sự kết hợp hoàn hảo giữa phong cách cổ điển và sự thoải mái.', 
        images: ['../assets/images/product/product_5.avif'], 
        sizes: [{ size: 42, available: true }, { size: 43, available: true }], 
    },
    { 
        id: 'dunk-low-retro', 
        name: 'Nike Dunk Low Retro', 
        type: 'Lifestyle', // Đã thêm
        category: "Giày Nam | Phong cách sống", 
        gender: 'Cho Nam', 
        price: 3089000, 
        originalPrice: null, 
        status: [], 
        description: 'Thiết kế cổ điển từ thập niên 80, mang đậm phong cách đường phố.', 
        images: ['../assets/images/product/product_6.avif'], 
        sizes: [{ size: 40, available: true }, { size: 44, available: true }], 
    }
];

// Dữ liệu giả định cho các sản phẩm liên quan (Sử dụng 4 sản phẩm cuối cùng)
const relatedProductsData = productsData.slice(2, 6);