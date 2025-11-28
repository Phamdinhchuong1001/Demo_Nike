// product_detail_logic.js

// --- PHẦN 1: HÀM HELPERS CHO LOGIC YÊU THÍCH ---

// Hàm Helper để lấy tên người dùng hiện tại từ LocalStorage (Đã thêm TRY...CATCH)
function getCurrentUsername() {
    const loggedInUser = localStorage.getItem('loggedInUser'); 
    if (loggedInUser) {
        try {
            // Đảm bảo dữ liệu là JSON hợp lệ và lấy username
            return JSON.parse(loggedInUser).username; 
        } catch (e) {
            console.error("Lỗi phân tích JSON cho 'loggedInUser'. Vui lòng kiểm tra logic đăng nhập:", e);
            // THÊM: Hiện thông báo cảnh báo để dễ dàng debug
            // alert("Cảnh báo: Dữ liệu đăng nhập bị lỗi. Vui lòng đăng nhập lại."); 
            return null; // Trả về null nếu có lỗi phân tích JSON
        }
    }
    return null; 
}

// Hàm lấy danh sách yêu thích của người dùng
function getFavoritesByUsername(username) {
    const favoritesKey = `favorites_${username}`;
    const favoritesJson = localStorage.getItem(favoritesKey);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
}

// Hàm lưu danh sách yêu thích
function saveFavoritesByUsername(username, favorites) {
    const favoritesKey = `favorites_${username}`;
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
}

// -----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Biến để theo dõi kích thước được chọn
    let selectedSize = null; 
    let currentProduct = null; // Biến toàn cục cục bộ để lưu sản phẩm đang xem

    // --- LOGIC TẢI TRANG CHÍNH ---

    function initializeProductPage() {
        // KIỂM TRA ĐẢM BẢO DỮ LIỆU ĐÃ ĐƯỢC TẢI TỪ product_data.js
        if (typeof productsData === 'undefined' || typeof formatCurrency === 'undefined') {
            console.error("Lỗi: Không tìm thấy productsData hoặc formatCurrency. Đảm bảo product_data.js đã được nhúng trước product_detail_logic.js.");
            document.getElementById('product-name').textContent = "Lỗi tải dữ liệu.";
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || 'field-general-black'; 

        const product = productsData.find(p => p.id === productId);

        if (product) {
            currentProduct = product; 
            loadProductDetails(product);
            setupAddToCartButton();
            setupFavoriteButton(); 
            loadRelatedProducts(relatedProductsData); 
        } else {
            document.getElementById('product-name').textContent = "Không tìm thấy sản phẩm.";
        }
        
        // GỌI HÀM CẬP NHẬT TRẠNG THÁI HEADER TẠI ĐÂY ĐỂ ĐỒNG BỘ
        updateHeaderLoginStatus(); 
    }
    
    // --- CÁC HÀM XỬ LÝ CHÍNH (GIỮ NGUYÊN) ---

    // ... (loadProductDetails, loadThumbnails, loadSizeOptions, loadColorOptions, loadRelatedProducts, setupAddToCartButton GIỮ NGUYÊN) ...

    /**
     * Tải và hiển thị thông tin sản phẩm chính
     */
    function loadProductDetails(product) {
        // 1. Cập nhật thông tin cơ bản
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-category').textContent = product.category;
        document.getElementById('product-gender').textContent = product.gender || '';
        document.getElementById('product-description').innerHTML = product.description.replace(/\n/g, '<br>');

        // Xử lý giá (Sử dụng formatCurrency từ file product_data.js)
        let priceHtml = '';
        if (product.originalPrice && product.price < product.originalPrice) {
            priceHtml = `
                <span class="text-danger">${formatCurrency(product.price)}</span>
                <span class="text-white-50 text-decoration-line-through fs-6 ms-2">${formatCurrency(product.originalPrice)}</span>
            `;
        } else {
            priceHtml = formatCurrency(product.price);
        }
        document.getElementById('product-price').innerHTML = priceHtml;
        
        // 2. Tải ảnh chính
        const mainImage = document.getElementById('main-product-image');
        mainImage.src = product.images[0];
        mainImage.alt = product.name;

        // 3. Tải và thiết lập Gallery ảnh thu nhỏ
        loadThumbnails(product.images, mainImage);

        // 4. Tải Tùy chọn Kích thước
        loadSizeOptions(product.sizes);
        
        // 5. Tải Tùy chọn Màu sắc
        loadColorOptions(product.colors);
    }
    
    /**
     * Tạo và hiển thị các ảnh thu nhỏ
     */
    function loadThumbnails(images, mainImage) {
        const thumbnailContainer = document.getElementById('thumbnail-gallery');
        thumbnailContainer.innerHTML = '';

        images.forEach((imgSrc, index) => {
            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.classList.add('thumbnail-item');
            if (index === 0) { thumbnailDiv.classList.add('active'); }
            thumbnailDiv.innerHTML = `<img src="${imgSrc}" class="img-fluid" alt="Ảnh ${index + 1}">`; 

            thumbnailDiv.addEventListener('click', () => {
                mainImage.src = imgSrc;
                document.querySelectorAll('#thumbnail-gallery .thumbnail-item').forEach(item => {
                    item.classList.remove('active');
                });
                thumbnailDiv.classList.add('active');
            });

            thumbnailContainer.appendChild(thumbnailDiv);
        });
    }

    /**
     * Tạo và hiển thị các tùy chọn kích thước
     */
    function loadSizeOptions(sizes) {
        const sizeContainer = document.getElementById('size-options-container');
        sizeContainer.innerHTML = '';

        sizes.forEach(sizeItem => {
            const sizeDiv = document.createElement('div');
            sizeDiv.classList.add('size-option');
            sizeDiv.textContent = `EU ${sizeItem.size}`;

            if (!sizeItem.available) {
                sizeDiv.classList.add('disabled');
            } else {
                sizeDiv.addEventListener('click', () => {
                    if (sizeDiv.classList.contains('disabled')) return;

                    document.querySelectorAll('#size-options-container .size-option').forEach(item => {
                        item.classList.remove('active');
                    });

                    sizeDiv.classList.add('active');
                    selectedSize = sizeItem.size;
                    document.getElementById('size-error').style.display = 'none';
                });
            }

            sizeContainer.appendChild(sizeDiv);
        });
    }
    
    /**
     * Tạo và hiển thị các tùy chọn màu sắc
     */
    function loadColorOptions(colors) {
        const colorContainer = document.getElementById('color-options-container');
        const currentColorSpan = document.getElementById('current-color');
        
        if (colors && colors.length > 0) {
            const productColorsSection = document.getElementById('product-colors');
            if (productColorsSection) productColorsSection.style.display = 'block';
            
            colorContainer.innerHTML = '';
            
            colors.forEach(color => {
                const colorDiv = document.createElement('div');
                colorDiv.classList.add('color-option');
                colorDiv.style.backgroundColor = color.hex; 
                colorDiv.title = color.name;
                
                if (color.isActive) {
                    colorDiv.classList.add('active');
                    currentColorSpan.textContent = color.name;
                }
                
                colorDiv.addEventListener('click', () => {
                    document.querySelectorAll('#color-options-container .color-option').forEach(item => {
                        item.classList.remove('active');
                    });
                    colorDiv.classList.add('active');
                    currentColorSpan.textContent = color.name;
                    // TODO: Thêm logic thay đổi toàn bộ chi tiết sản phẩm/ảnh khi chuyển màu thực tế
                });
                
                colorContainer.appendChild(colorDiv);
            });
        }
    }

    /**
     * Tải và hiển thị các sản phẩm liên quan
     */
    function loadRelatedProducts(products) {
        const container = document.getElementById('you-might-also-like-container');
        if (!container) return;
        container.innerHTML = '';

        products.forEach(product => {
            const productCol = document.createElement('div');
            const detailLink = `product_detail.html?id=${product.id}`; 
            
            productCol.classList.add('col-lg-3', 'col-md-6', 'wow', 'fadeInUp');
            productCol.setAttribute('data-wow-delay', '0.1s');

            const genderDisplay = product.gender || 'Giày Thể Thao';

            productCol.innerHTML = `
                <div class="product-item bg-dark text-center border p-3 rounded-3" style="border-color: #343a40!important;">
                    <a href="${detailLink}">
                        <img class="img-fluid mb-3 rounded-3" src="${product.images?.[0]}" alt="${product.name}">
                    </a>
                    <h6 class="fw-bold">${product.name}</h6>
                    <p class="text-muted small mb-2">${genderDisplay}</p>
                    <h5 class="fw-bold text-primary">${formatCurrency(product.price)}</h5>
                    <a href="${detailLink}" class="btn btn-outline-light btn-sm rounded-pill mt-2">Xem chi tiết</a>
                </div>
            `;
            container.appendChild(productCol);
        });
    }
    
    /**
     * Xử lý nút "Thêm vào Giỏ"
     */
    function setupAddToCartButton() {
        const addToCartBtn = document.getElementById('add-to-bag-btn');
        if (!addToCartBtn) return;
        
        addToCartBtn.addEventListener('click', () => {
            if (!selectedSize) {
                document.getElementById('size-error').style.display = 'block';
                return;
            }

            const productName = document.getElementById('product-name').textContent;
            alert(`Đã thêm sản phẩm "${productName}" - Size EU ${selectedSize} vào giỏ hàng!`);
            // TODO: Thêm logic lưu vào LocalStorage/SessionStorage cho Giỏ hàng
        });
    }


    // --- HÀM CẬP NHẬT TRẠNG THÁI HEADER (MỚI) ---

    function updateHeaderLoginStatus() {
        const username = getCurrentUsername();
        const userLink = document.getElementById('userLink');
        const userIcon = document.getElementById('userIcon');
        const userDropdownContainer = document.getElementById('userDropdownContainer');
        const userNameDisplay = document.getElementById('userNameDisplay');
        const logoutButton = document.getElementById('logoutButton');

        if (username) {
            // Đã đăng nhập
            if (userLink) userLink.style.display = 'none';
            if (userIcon) userIcon.classList.replace('fa-user', 'fa-user-circle'); // Tùy chọn: đổi icon
            if (userDropdownContainer) userDropdownContainer.style.display = 'block';
            if (userNameDisplay) userNameDisplay.textContent = username;
        } else {
            // Chưa đăng nhập
            if (userLink) userLink.style.display = 'block';
            if (userIcon) userIcon.classList.replace('fa-user-circle', 'fa-user');
            if (userDropdownContainer) userDropdownContainer.style.display = 'none';
        }
        
        // Thiết lập logic Đăng xuất
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('loggedInUser');
                alert('Bạn đã đăng xuất thành công.');
                window.location.reload(); 
            });
        }
    }
    
    // --- XỬ LÝ NÚT YÊU THÍCH (GIỮ NGUYÊN LOGIC CỦA BẠN) ---
    
    /**
     * Xử lý nút "Yêu thích"
     */
    function setupFavoriteButton() {
        const favoriteBtn = document.getElementById('favorite-btn');
        if (!favoriteBtn || !currentProduct) return;
        
        // 1. Hàm cập nhật trạng thái nút
        function updateFavoriteButtonState() {
            const username = getCurrentUsername();
            
            // Nếu chưa đăng nhập, chỉ hiển thị trạng thái mặc định
            if (!username) {
                favoriteBtn.innerHTML = `Yêu thích <i class="fa fa-heart ms-2"></i>`;
                favoriteBtn.classList.remove('btn-light', 'btn-primary');
                favoriteBtn.classList.add('btn-outline-light');
                return;
            }

            const favorites = getFavoritesByUsername(username);
            const isFavorite = favorites.some(item => item.id === currentProduct.id);

            favoriteBtn.classList.toggle('btn-light', isFavorite);
            favoriteBtn.classList.toggle('btn-outline-light', !isFavorite);
            
            favoriteBtn.innerHTML = isFavorite ? 
                `Đã thêm vào Yêu thích <i class="fa fa-heart ms-2 text-danger"></i>` : 
                `Yêu thích <i class="fa fa-heart ms-2"></i>`;
        }

        updateFavoriteButtonState(); // Cập nhật trạng thái ban đầu
        
        // 2. Xử lý sự kiện click
        favoriteBtn.addEventListener('click', () => {
            const username = getCurrentUsername();
            if (!username) {
                // **ĐÂY LÀ CHỖ HIỂN THỊ ALERT CỦA BẠN**
                alert('Vui lòng đăng nhập để thêm sản phẩm vào mục yêu thích.');
                return;
            }
            
            let favorites = getFavoritesByUsername(username);
            const productID = currentProduct.id;
            const existingIndex = favorites.findIndex(item => item.id === productID);

            if (existingIndex > -1) {
                // Xóa (Unfavorite)
                favorites.splice(existingIndex, 1);
                alert(`Đã xóa "${currentProduct.name}" khỏi mục yêu thích.`);
            } else {
                // Thêm vào
                const favoriteItem = {
                    id: currentProduct.id,
                    name: currentProduct.name,
                    category: currentProduct.category,
                    gender: currentProduct.gender,
                    price: currentProduct.price,
                    image: currentProduct.images?.[0] 
                };
                favorites.push(favoriteItem);
                alert(`Đã thêm "${currentProduct.name}" vào mục yêu thích.`);
            }

            saveFavoritesByUsername(username, favorites);
            updateFavoriteButtonState(); // Cập nhật lại nút sau khi thao tác
        });
    }

    // Khởi tạo trang khi DOM đã sẵn sàng
    initializeProductPage();
});