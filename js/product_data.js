// Hàm tiện ích: Định dạng số tiền thành định dạng tiền tệ (VND).
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

// Mảng Dữ liệu Sản phẩm Mẫu (productsData): Chứa thông tin chi tiết của tất cả sản phẩm.
const productsData = [
    //========================================= === SẢN PHẨM GIÀY NAM ===========================================================
    
    {
        id: 'field-general-black',
        name: 'Nike Air Force 1',
        productType: 'Giày', // Phân loại chính
        type: 'Jordan',
        category: "Giày Nam | Hàng Mới Về",
        gender: 'Nam',
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
        gender: 'Nam',
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
        gender: 'Nam',
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
        gender: 'Nam',
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
        gender: 'Nam',
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
        gender: 'Nam',
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
    //--sp moi can chinh sua lai--//
    {
        id: 'dunk-low-retro',
        name: 'Nike Field General Leather',
        productType: 'Giày', // Phân loại chính
        type: 'Lifestyle',
        category: "Giày Nam | Phong cách sống",
        gender: 'Nam',
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
    {
        id: 'dunk-low-retro',
        name: 'Nike Field General Leather',
        productType: 'Giày', // Phân loại chính
        type: 'Lifestyle',
        category: "Giày Nam | Phong cách sống",
        gender: 'Nam',
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
    {
        id: 'dunk-low-retro',
        name: 'Nike Field General Leather',
        productType: 'Giày', // Phân loại chính
        type: 'Lifestyle',
        category: "Giày Nam | Phong cách sống",
        gender: 'Nam',
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
        gender: 'Nam',
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
        gender: 'Nam',
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
        gender: 'Nam',
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
        gender: 'Nam',
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
        gender: 'Nam',
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
        gender: 'Nam',
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

    // ============================================== SẢN PHẨM PHỤ KIỆN NAM ====================================================
    {
        id: 'sportswear-essentials-backpack',
        name: 'Nike Sportswear Essentials Backpack',
        productType: 'Phụ Kiện', // <--- ĐIỂM QUAN TRỌNG: Gán loại sản phẩm là 'Phụ Kiện'
        type: 'Túi & Ba Lô',
        category: "Phụ Kiện Nam | Ba Lô",
        gender: 'Nam',
        price: 1599000,
        originalPrice: null,
        status: ["new"],
        description: 'Ba lô thiết yếu cho các hoạt động thể thao, có ngăn đựng laptop.',
        images: [
            '../assets/images/product/men/accessory/pk1bag.avif', // Thay bằng đường dẫn ảnh phụ kiện
            '../assets/images/product/men/product_detail_accessory/pk1_1bag.avif',
            '../assets/images/product/men/product_detail_accessory/pk1_2bag.avif',
            '../assets/images/product/men/product_detail_accessory/pk1_3bag.avif'
        ],
        sizes: [
            { size: 'OS', available: true }, // Phụ kiện thường là One Size (OS)
        ],
    },
    {
        id: 'heritage-backpack',
        name: 'Nike Heritage',
        productType: 'Phụ Kiện', // <--- ĐIỂM QUAN TRỌNG
        type: 'Túi & Ba Lô',
        category: "Phụ Kiện Nam | Ba Lô",
        gender: 'Nam',
        price: 750000,
        originalPrice: 900000,
        status: ["sale"],
        description: 'Chiếc balo này luôn đồng hành cùng bạn. Ngăn chính giúp bạn để laptop tách biệt với các vật dụng lớn, ngăn trước có khóa kéo giữ an toàn cho những đồ nhỏ cần thiết, và bên hông có ngăn để chai nước.',
        images: [
            '../assets/images/product/men/accessory/pk2bag.avif', // Thay bằng đường dẫn ảnh phụ kiện
            '../assets/images/product/men/product_detail_accessory/pk2_1bag.avif',
            '../assets/images/product/men/product_detail_accessory/pk2_2bag.avif',
            '../assets/images/product/men/product_detail_accessory/pk2_3bag.avif'
        ],
        sizes: [
            { size: 'OS', available: true }, // Phụ kiện thường là One Size (OS)
        ],
    },
    {
        id: 'academy-team-bagback',
        name: 'Nike Academy Team',
        productType: 'Phụ Kiện', // <--- ĐIỂM QUAN TRỌNG
        type: 'Túi & Ba Lô',
        category: "Phụ Kiện Nam | Ba Lô",
        gender: 'Nam',
        price: 1449000,
        originalPrice: null,
        status: ["new"],
        description: 'Chiếc balo này luôn đồng hành cùng bạn. Ngăn chính giúp bạn để laptop tách biệt với các vật dụng lớn, ngăn trước có khóa kéo giữ an toàn cho những đồ nhỏ cần thiết, và bên hông có ngăn để chai nước.',
        images: [
            '../assets/images/product/men/accessory/pk3bag.avif', // Thay bằng đường dẫn ảnh phụ kiện
            '../assets/images/product/men/product_detail_accessory/pk3_1bag.avif',
            '../assets/images/product/men/product_detail_accessory/pk3_2bag.avif',
            '../assets/images/product/men/product_detail_accessory/pk3_3bag.avif'
        ],
        sizes: [
            { size: 'OS', available: true }, // Phụ kiện thường là One Size (OS)
        ],
    },
    {
        id: 'multiplier-socks',
        name: 'Nike Multiplier',
        productType: 'Phụ Kiện', // <--- ĐIỂM QUAN TRỌNG
        type: 'Vớ (Tất)',
        category: "Phụ Kiện Nam | Vớ (Tất)",
        gender: 'Nam',
        price: 1449000,
        originalPrice: null,
        status: ["new"],
        description: 'Chiếc balo này luôn đồng hành cùng bạn. Ngăn chính giúp bạn để laptop tách biệt với các vật dụng lớn, ngăn trước có khóa kéo giữ an toàn cho những đồ nhỏ cần thiết, và bên hông có ngăn để chai nước.',
        images: [
            '../assets/images/product/men/accessory/pk1socks.avif', // Thay bằng đường dẫn ảnh phụ kiện
            '../assets/images/product/men/product_detail_accessory/pk1_1socks.avif',
        ],
        sizes: [
            { size: 'OS', available: true }, // Phụ kiện thường là One Size (OS)
        ],
    },
    // Thêm các sản phẩm phụ kiện khác ở đây...
    //---------------------------------- Giày Nữ --------------------------------------------//
    { 
        id: 'W101', 
        name: 'Air Force 1 Low', 
        productType: 'Giày', 
        type: 'Lifestyle', 
        gender: 'Nữ', // 👈
        price: 2500000, 
        status: ['new'],
        images: [
            '../assets/images/product/women/shoes/product_1.avif',
        ],
        sizes: [
            { size: 36, available: true },
            { size: 37, available: true },
            { size: 38, available: true }
        ]
    },
    //---------------------------------- Quần Áo Nữ --------------------------------------------//
    {
        id: 'tech-fleece-hoodie-black',
        name: 'Nike Pro',
        productType: 'Quần Áo', // Phân loại chính
        type: 'T-Shirt',
        category: "Quần Áo Nữ | Tech Fleece",
        gender: 'Nữ',
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
    //---------------------------------- Phụ Kiện Nữ --------------------------------------------//
    {
        id: 'sportswear-essentials-backpack',
        name: 'Nike Sportswear Essentials Backpack',
        productType: 'Phụ Kiện', // <--- ĐIỂM QUAN TRỌNG: Gán loại sản phẩm là 'Phụ Kiện'
        type: 'Túi & Ba Lô',
        category: "Phụ Kiện Nữ | Ba Lô",
        gender: 'Nữ',
        price: 1599000,
        originalPrice: null,
        status: ["new"],
        description: 'Ba lô thiết yếu cho các hoạt động thể thao, có ngăn đựng laptop.',
        images: [
            '../assets/images/product/men/accessory/pk1bag.avif', // Thay bằng đường dẫn ảnh phụ kiện
            '../assets/images/product/men/product_detail_accessory/pk1_1bag.avif',
            '../assets/images/product/men/product_detail_accessory/pk1_2bag.avif',
            '../assets/images/product/men/product_detail_accessory/pk1_3bag.avif'
        ],
        sizes: [
            { size: 'OS', available: true }, // Phụ kiện thường là One Size (OS)
        ],
    },
];


// Dữ liệu giả định cho các sản phẩm liên quan (Sử dụng 4 sản phẩm cuối cùng).
const relatedProductsData = productsData.slice(-4);