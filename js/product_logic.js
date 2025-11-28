// =======================================================
// 1. BIẾN TRẠNG THÁI LỌC VÀ SẮP XẾP
// =======================================================

// Khởi tạo trạng thái lọc và sắp xếp
let currentFilters = {
    category: '', // Ví dụ: 'Running'
    price: 'all', // Ví dụ: '1000000-3000000'
    status: [], // Ví dụ: ['sale', 'new']
    size: null, // Ví dụ: 42
};

let currentSort = 'newest'; // newest, price-asc, price-desc


// =======================================================
// 2. HÀM TẠO VÀ HIỂN THỊ SẢN PHẨM (RENDER)
// =======================================================

// *** formatCurrency ĐÃ ĐƯỢC CHUYỂN SANG product_data.js ***

/**
 * Tạo HTML cho một sản phẩm.
 * @param {Object} product - Đối tượng sản phẩm.
 * @returns {string} HTML của sản phẩm.
 */
function createProductHtml(product) {
    // Xử lý tag trạng thái (Sale, New, Exclusive)
    let statusTag = '';
    if (product.status && product.status.length > 0) {
        // Ưu tiên hiển thị Sale > New > Exclusive
        if (product.status.includes('sale')) {
            statusTag = `<p class="text-danger fw-bold m-0">Sale</p>`;
        } else if (product.status.includes('new')) {
            statusTag = `<p class="text-danger fw-bold m-0">Hàng Mới Về</p>`;
        } else if (product.status.includes('memberExclusive')) {
            statusTag = `<p class="text-warning fw-bold m-0">Độc Quyền Thành Viên</p>`;
        }
    }

    // Xử lý giá (sử dụng formatCurrency từ product_data.js)
    let priceHtml = '';
    // Kiểm tra product.originalPrice và product.status.includes('sale') để hiển thị giá sale
    if (product.originalPrice && product.status?.includes('sale') && product.price < product.originalPrice) {
        priceHtml = `
            <p class="fw-bold m-0 text-danger">${formatCurrency(product.price)}</p>
            <span class="text-muted text-decoration-line-through">${formatCurrency(product.originalPrice)}</span>
        `;
    } else {
        priceHtml = `<p class="fw-bold m-0">${formatCurrency(product.price)}</p>`;
    }

    // Lấy ảnh đầu tiên hoặc ảnh mặc định (đã cập nhật để dùng images[0] nếu có, hoặc imageUrl nếu dùng cấu trúc cũ)
    const imageUrl = product.images?.[0] || product.imageUrl; 
    
    // Tạo HTML tổng thể cho sản phẩm
    return `
        <div class="col-md-6 col-xl-4 wow fadeInUp" data-wow-delay="0.3s" data-product-id="${product.id}">
            <div class="product-item">
                <a href="product_detail.html?id=${product.id}">
                    <img class="img-fluid w-100" src="${imageUrl}" alt="${product.name}">
                </a>
                <div class="p-3 text-start">
                    ${statusTag}
                    <h5 class="fw-bold mb-1">${product.name}</h5>
                    <p class="mb-1 text-muted">${product.gender}</p>
                    ${priceHtml}
                </div>
            </div>
        </div>
    `;
}

/**
 * Hiển thị các sản phẩm lên lưới (grid).
 * @param {Array<Object>} products - Mảng sản phẩm đã được lọc/sắp xếp.
 */
function renderProducts(products) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    productGrid.innerHTML = ''; // Xóa nội dung cũ

    if (products.length === 0) {
        productGrid.innerHTML = `<div class="col-12"><p class="text-center text-light">Không tìm thấy sản phẩm phù hợp.</p></div>`;
        return;
    }

    products.forEach(product => {
        productGrid.innerHTML += createProductHtml(product);
    });

    // Kích hoạt lại animation WOW cho các phần tử mới
    new WOW().init();
}

// =======================================================
// 3. HÀM LỌC VÀ SẮP XẾP CHÍNH
// =======================================================

/**
 * Thực hiện lọc sản phẩm dựa trên trạng thái `currentFilters`.
 * @param {Array<Object>} data - Dữ liệu sản phẩm gốc (productsData từ file riêng).
 * @returns {Array<Object>} Mảng sản phẩm đã được lọc.
 */
function applyFilters(data) {
    return data.filter(product => {
        let isMatch = true;

        // 1. Lọc theo Danh mục (Category)
        // Lưu ý: Category trong product_data.js là 'Giày Nam | Hàng Mới Về', 
        // nhưng dữ liệu giả mới của bạn là 'Lifestyle'. Tôi sẽ dùng 'Lifestyle'.
        if (currentFilters.category && product.category !== currentFilters.category) {
            isMatch = false;
        }

        // 2. Lọc theo Giá (Price Range)
        if (isMatch && currentFilters.price !== 'all') {
            const [min, max] = currentFilters.price.split('-').map(Number);
            if (product.price < min || product.price > max) {
                isMatch = false;
            }
        }

        // 3. Lọc theo Trạng thái (Status/Sale)
        if (isMatch && currentFilters.status.length > 0) {
            // Kiểm tra xem sản phẩm có bất kỳ trạng thái nào trong mảng `currentFilters.status` không
            const hasRequiredStatus = currentFilters.status.some(status => product.status?.includes(status));
            if (!hasRequiredStatus) {
                isMatch = false;
            }
        }

        // 4. Lọc theo Kích thước (Size)
        if (isMatch && currentFilters.size !== null) {
            // Cấu trúc product_data.js cũ dùng mảng số ([40, 41]), cấu trúc chi tiết dùng mảng object.
            // Để tương thích, ta phải kiểm tra cả 2 trường hợp.
            let hasSize = false;
            if (Array.isArray(product.sizes) && product.sizes.every(s => typeof s === 'number')) {
                 // Trường hợp mảng số: [40, 41, 42]
                hasSize = product.sizes.includes(currentFilters.size);
            } else if (Array.isArray(product.sizes) && product.sizes.every(s => typeof s === 'object')) {
                // Trường hợp mảng object: [{ size: 35.5, available: true }]
                hasSize = product.sizes.some(sizeItem => sizeItem.size === currentFilters.size && sizeItem.available);
            }
            
            if (!hasSize) {
                isMatch = false;
            }
        }
        
        return isMatch;
    });
}

/**
 * Thực hiện sắp xếp sản phẩm dựa trên trạng thái `currentSort`.
 * @param {Array<Object>} products - Mảng sản phẩm đã được lọc.
 * @returns {Array<Object>} Mảng sản phẩm đã được sắp xếp.
 */
function applySorting(products) {
    const sortedProducts = [...products]; // Tạo bản sao để không thay đổi mảng gốc

    switch (currentSort) {
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
        default:
            // Giữ nguyên thứ tự trong mảng gốc (Giả định là newest)
            break;
    }
    return sortedProducts;
}

/**
 * Hàm tổng hợp: Lọc, sắp xếp và render lại.
 */
function updateProductDisplay() {
    // SỬ DỤNG productsData TỪ product_data.js
    if (typeof productsData === 'undefined') {
        console.error("Lỗi: productsData chưa được tải. Đảm bảo product_data.js được nhúng trước.");
        return;
    }
    
    let filteredProducts = applyFilters(productsData);
    let finalProducts = applySorting(filteredProducts);
    renderProducts(finalProducts);
}

// =======================================================
// 4. LOGIC GẮN SỰ KIỆN (EVENT LISTENERS)
// =======================================================

document.addEventListener('DOMContentLoaded', function () {
    // --- Khởi tạo lần đầu ---
    updateProductDisplay();

    // --- Logic Ẩn/Hiện Bộ Lọc ---
    const toggleButton = document.getElementById('hideFiltersToggle');
    const filterSidebar = document.getElementById('filterSidebar')?.parentElement;
    const productGridContainer = document.getElementById('productGridContainer');
    
    if (toggleButton && filterSidebar && productGridContainer) {
        toggleButton.addEventListener('click', function() {
            filterSidebar.classList.toggle('d-none'); 

            if (filterSidebar.classList.contains('d-none')) {
                productGridContainer.classList.remove('col-lg-9');
                productGridContainer.classList.add('col-lg-12');
                toggleButton.textContent = 'Hiện Bộ Lọc'; 
            } else {
                productGridContainer.classList.remove('col-lg-12');
                productGridContainer.classList.add('col-lg-9');
                toggleButton.textContent = 'Ẩn Bộ Lọc'; 
            }
        });
    }

    // Optional: Add basic chevron rotation for filter toggles
    document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(toggler => {
        toggler.addEventListener('click', function() {
            const icon = this.querySelector('.fa-chevron-down');
            if (icon) {
                icon.classList.toggle('fa-rotate-180');
            }
        });
    });

    // --- Logic Lọc theo Danh mục (Category) ---
    document.querySelectorAll('#categoryFilter a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-filter-value');
            
            // Toggle active class 
            document.querySelectorAll('#categoryFilter a').forEach(a => a.classList.remove('active-filter'));
            this.classList.add('active-filter');

            currentFilters.category = category;
            updateProductDisplay();
        });
    });

    // --- Logic Lọc theo Giá (Price) ---
    document.querySelectorAll('#priceFilter input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            currentFilters.price = this.value;
            updateProductDisplay();
        });
    });

    // --- Logic Lọc theo Trạng thái (Status) ---
    document.querySelectorAll('#saleFilter input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const statusValue = this.value;
            if (this.checked) {
                if (!currentFilters.status.includes(statusValue)) {
                    currentFilters.status.push(statusValue);
                }
            } else {
                currentFilters.status = currentFilters.status.filter(s => s !== statusValue);
            }
            updateProductDisplay();
        });
    });
    
    // --- Logic Lọc theo Kích thước (Size) ---
    document.querySelectorAll('#sizeFilter .size-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Dùng parseFloat để tương thích với các size thập phân (ví dụ: 35.5)
            const size = parseFloat(this.getAttribute('data-size')); 
            
            const isActive = this.classList.contains('active');
            
            // Xóa active của tất cả các nút
            document.querySelectorAll('#sizeFilter .size-btn').forEach(btn => btn.classList.remove('active', 'btn-light'));
            document.querySelectorAll('#sizeFilter .size-btn').forEach(btn => btn.classList.add('btn-outline-light'));


            if (isActive) {
                // Nếu đang active thì hủy chọn
                currentFilters.size = null;
            } else {
                // Nếu chưa active thì chọn
                this.classList.remove('btn-outline-light');
                this.classList.add('active', 'btn-light');
                currentFilters.size = size;
            }
            updateProductDisplay();
        });
    });

    // --- Logic Sắp xếp (Sort By) ---
    document.querySelectorAll('#sortByDropdown + .dropdown-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            currentSort = this.getAttribute('data-sort-by');
            
            const dropdownToggle = document.getElementById('sortByDropdown');
            dropdownToggle.textContent = 'Sắp Xếp Theo: ' + this.textContent;

            updateProductDisplay();
        });
    });
});