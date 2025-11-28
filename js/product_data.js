// Hàm tiện ích: Định dạng số tiền thành định dạng tiền tệ (VND).
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

// Mảng Dữ liệu Sản phẩm Mẫu (productsData): Chứa thông tin chi tiết của tất cả sản phẩm.
const productsData = [
    // === SẢN PHẨM GIÀY NAM ===
    {
        id: 'field-general-black',
        name: 'Nike Air Force 1',
        productType: 'Giày', // Phân loại chính
        type: 'Jordan',
        category: "Giày Nam | Hàng Mới Về",
        gender: '',
        price: 3519000,
        originalPrice: null,
        status: ["new"],
        description: 'Đôi giày cổ điển với đế ngoài gai chắc chắn, phù hợp cho cả đi chơi và tập luyện nhẹ.',
        images: [
            '../assets/images/product/men/shoe/product_1.avif',
            '../assets/images/product/men/product_detail_shoe/product1_1.avif',
            '../assets/images/product/men/product_detail_shoe/product1_2.avif',
            '../assets/images/product/men/product_detail_shoe/product1_3.avif',
        ],
        sizes: [
            { size: 38, available: true },
            { size: 39, available: false },
            { size: 40, available: true },
            { size: 41, available: false },
            { size: 42, available: true },
            { size: 43, available: true },
            { size: 44, available: true },
        ],
    },
    {
        id: 'field-general-brown',
        name: 'Nike Dunk Low Retro Limited',
        productType: 'Giày', // Phân loại chính
        type: 'Running',
        category: "Giày Nam | Hàng Mới Về",
        gender: '',
        price: 3829000,
        originalPrice: null,
        status: ["new"],
        description: 'Phiên bản nâu/trắng của Field General, thiết kế cá tính, mạnh mẽ.',
        images: [
            '../assets/images/product/men/shoe/product_2.avif',
            '../assets/images/product/men/product_detail_shoe/product2_1.avif',
            '../assets/images/product/men/product_detail_shoe/product2_2.avif',
            '../assets/images/product/men/product_detail_shoe/product2_3.avif',
        ],
        sizes: [
            { size: 35.5, available: true },
            { size: 38, available: true },
            { size: 41, available: true },
            { size: 42, available: false },
            { size: 44, available: true },
        ],
    },
    {
        id: 'acg-zoom-gaiadome',
        name: 'Nike Shox Ride 2 Premium',
        productType: 'Giày', // Phân loại chính
        type: 'Basketball',
        category: "Giày Nam | Chống Nước",
        gender: '',
        price: 6609000,
        originalPrice: 7000000,
        status: ["sale"],
        description: 'Giày boot siêu bền bỉ với công nghệ GORE-TEX chống nước tuyệt đối.',
        images: [
            '../assets/images/product/men/shoe/product_3.avif',
            '../assets/images/product/men/product_detail_shoe/product3_1.avif',
            '../assets/images/product/men/product_detail_shoe/product3_2.avif',
            '../assets/images/product/men/product_detail_shoe/product3_3.avif',
        ],
        sizes: [
            { size: 40, available: true },
            { size: 42, available: true },
            { size: 43, available: false },
            { size: 44, available: true },
        ],
    },
    {
        id: 'air-max-sc',
        name: 'Nike Total 90',
        productType: 'Giày', // Phân loại chính
        type: 'Lifestyle',
        category: "Giày Nam | Giảm Giá",
        gender: '',
        price: 1909000,
        originalPrice: 2500000,
        status: ["sale"],
        description: 'Thiết kế đơn giản, cổ điển với công nghệ Air Max mang lại sự êm ái.',
        images: [
            '../assets/images/product/men/shoe/product_4.avif',
            '../assets/images/product/men/product_detail_shoe/product4_1.avif',
            '../assets/images/product/men/product_detail_shoe/product4_2.avif',
            '../assets/images/product/men/product_detail_shoe/product4_3.avif',
        ],
        sizes: [
            { size: 40, available: true },
            { size: 41, available: true },
            { size: 42, available: false },
            { size: 43, available: true },
        ],
    },
    {
        id: 'air-force-1-07',
        name: 'Nike Cortez SE',
        productType: 'Giày', // Phân loại chính
        type: 'Lifestyle',
        category: "Giày Nam | Phong cách sống",
        gender: '',
        price: 2919000,
        originalPrice: null,
        status: ["memberExclusive"],
        description: 'AF1 là sự kết hợp hoàn hảo giữa phong cách cổ điển và sự thoải mái.',
        images: [
            '../assets/images/product/men/shoe/product_5.avif',
            '../assets/images/product/men/product_detail_shoe/product5_1.avif',
            '../assets/images/product/men/product_detail_shoe/product5_2.avif',
            '../assets/images/product/men/product_detail_shoe/product5_3.avif',
        ],
        sizes: [
            { size: 42, available: true },
            { size: 43, available: true },
            { size: 44, available: false },
            { size: 45, available: true },
        ],
    },
    {
        id: 'dunk-low-retro',
        name: 'Nike Field General Leather',
        productType: 'Giày', // Phân loại chính
        type: 'Lifestyle',
        category: "Giày Nam | Phong cách sống",
        gender: '',
        price: 3089000,
        originalPrice: null,
        status: ["memberExclusive"],
        description: 'Thiết kế cổ điển từ thập niên 80, mang đậm phong cách đường phố.',
        images: [
            '../assets/images/product/men/shoe/product_6.avif',
            '../assets/images/product/men/product_detail_shoe/product6_1.avif',
            '../assets/images/product/men/product_detail_shoe/product6_2.avif',
            '../assets/images/product/men/product_detail_shoe/product6_3.avif',
        ],
        sizes: [
            { size: 40, available: true },
            { size: 44, available: true },
            { size: 45, available: false },
            { size: 46, available: true },
        ],
    },

    // ============================================== SẢN PHẨM QUẦN ÁO NAM ====================================================
    {
        id: 'tech-fleece-hoodie-black',
        name: 'Nike Pro',
        productType: 'Quần Áo', // Phân loại chính
        type: 'T-Shirt',
        category: "Quần Áo Nam | Tech Fleece",
        gender: '',
        price: 659000,
        originalPrice: null,
        status: ["new"],
        description: 'Áo khoác nỉ công nghệ giữ ấm nhẹ nhàng, thiết kế hiện đại, form slim-fit.',
        images: [
            '../assets/images/product/men/clothes/ao1.avif',
            '../assets/images/product/men/product_detail_clothes/ao1_1.avif',
            '../assets/images/product/men/product_detail_clothes/ao1_2.avif',
            '../assets/images/product/men/product_detail_clothes/ao1_3.avif',
        ],
        sizes: [
            { size: 'S', available: true },
            { size: 'M', available: true },
            { size: 'L', available: true },
            { size: 'XL', available: false }
        ],
    },
    {
        id: 'club-fleece-crew',
        name: 'Nike Solo Swoosh',
        productType: 'Quần Áo', // Phân loại chính
        type: 'Running',
        category: "Quần Áo Nam | Áo Tay Dài",
        gender: 'Cho Nam',
        price: 2499000,
        originalPrice: 3599000,
        status: ["sale"],
        description: 'Áo nỉ cổ tròn mềm mại, cổ điển, phù hợp cho phong cách casual hàng ngày.',
        images: [
            '../assets/images/product/men/clothes/ao2.avif',
            '../assets/images/product/men/product_detail_clothes/ao2_1.avif',
            '../assets/images/product/men/product_detail_clothes/ao2_2.avif',
            '../assets/images/product/men/product_detail_clothes/ao2_3.avif',
        ],
        sizes: [
            { size: 'XS', available: true },
            { size: 'S', available: true },
            { size: 'M', available: true }
        ],
    },
    {
        id: 'dri-fit-adv-shorts',
        name: 'Nike Tech Pack',
        productType: 'Quần Áo', // Phân loại chính
        type: 'Basketball',
        category: "Quần Áo Nam | Tập Luyện",
        gender: 'Cho Nam',
        price: 3109000,
        originalPrice: null,
        status: ["memberExclusive"],
        description: 'Quần shorts tập luyện công nghệ Dri-FIT ADV giúp thấm hút mồ hôi tối đa.',
        images: [
            '../assets/images/product/men/clothes/ao3.avif',
            '../assets/images/product/men/product_detail_clothes/ao3_1.avif',
            '../assets/images/product/men/product_detail_clothes/ao3_2.avif',
            '../assets/images/product/men/product_detail_clothes/ao3_3.avif',
            
        ],
        sizes: [
            { size: 'M', available: true },
            { size: 'L', available: true },
            { size: 'XL', available: true }
        ],
    },
    {
        id: 'tech-fleece-hoodie-black',
        name: 'Nike Pro',
        productType: 'Quần Áo', // Phân loại chính
        type: 'Áo Khoác',
        category: "Quần Áo Nam | Tech Fleece",
        gender: '',
        price: 659000,
        originalPrice: null,
        status: ["new"],
        description: 'Áo khoác nỉ công nghệ giữ ấm nhẹ nhàng, thiết kế hiện đại, form slim-fit.',
        images: [
            '../assets/images/product/men/clothes/ao1.avif',
            '../assets/images/product/men/product_detail_clothes/ao1_1.avif',
            '../assets/images/product/men/product_detail_clothes/ao1_2.avif',
            '../assets/images/product/men/product_detail_clothes/ao1_3.avif',
        ],
        sizes: [
            { size: 'S', available: true },
            { size: 'M', available: true },
            { size: 'L', available: true },
            { size: 'XL', available: false }
        ],
    }, 	
    {
        id: 'tech-fleece-hoodie-black',
        name: 'Nike Pro',
        productType: 'Quần Áo', // Phân loại chính
        type: 'Quần Short',
        category: "Quần Áo Nam | Tech Fleece",
        gender: '',
        price: 659000,
        originalPrice: null,
        status: ["new"],
        description: 'Áo khoác nỉ công nghệ giữ ấm nhẹ nhàng, thiết kế hiện đại, form slim-fit.',
        images: [
            '../assets/images/product/men/clothes/ao1.avif',
            '../assets/images/product/men/product_detail_clothes/ao1_1.avif',
            '../assets/images/product/men/product_detail_clothes/ao1_2.avif',
            '../assets/images/product/men/product_detail_clothes/ao1_3.avif',
        ],
        sizes: [
            { size: 'S', available: true },
            { size: 'M', available: true },
            { size: 'L', available: true },
            { size: 'XL', available: false }
        ],
    },
    {
        id: 'tech-fleece-hoodie-black',
        name: 'Nike Pro',
        productType: 'Quần Áo', // Phân loại chính
        type: 'Quần Dài',
        category: "Quần Áo Nam | Tech Fleece",
        gender: '',
        price: 659000,
        originalPrice: null,
        status: ["new"],
        description: 'Áo khoác nỉ công nghệ giữ ấm nhẹ nhàng, thiết kế hiện đại, form slim-fit.',
        images: [
            '../assets/images/product/men/clothes/ao1.avif',
            '../assets/images/product/men/product_detail_clothes/ao1_1.avif',
            '../assets/images/product/men/product_detail_clothes/ao1_2.avif',
            '../assets/images/product/men/product_detail_clothes/ao1_3.avif',
        ],
        sizes: [
            { size: 'S', available: true },
            { size: 'M', available: true },
            { size: 'L', available: true },
            { size: 'XL', available: false }
        ],
    },
];

// Dữ liệu giả định cho các sản phẩm liên quan (Sử dụng 4 sản phẩm cuối cùng).
const relatedProductsData = productsData.slice(-4);