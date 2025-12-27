import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Slider, Pagination } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/slices/cartSlice';
import './Menu.css';

// Mock data
const allProducts = [
    { id: 1, name: 'Trà Sữa Trân Châu Đường Đen', price: 45000, category: 'tra-sua', image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400' },
    { id: 2, name: 'Trà Sữa Matcha Đậu Đỏ', price: 55000, category: 'tra-sua', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400' },
    { id: 3, name: 'Trà Đào Cam Sả', price: 40000, category: 'tra-trai-cay', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400' },
    { id: 4, name: 'Sữa Tươi Trân Châu', price: 50000, category: 'tra-sua', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400' },
    { id: 5, name: 'Trà Sữa Khoai Môn', price: 48000, category: 'tra-sua', image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400' },
    { id: 6, name: 'Trà Ô Long Kem Sữa', price: 52000, category: 'tra-sua', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400' },
    { id: 7, name: 'Trà Vải Lychee', price: 42000, category: 'tra-trai-cay', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400' },
    { id: 8, name: 'Smoothie Xoài', price: 55000, category: 'da-xay', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400' },
    { id: 9, name: 'Trà Sữa Hokkaido', price: 58000, category: 'tra-sua', image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400' },
    { id: 10, name: 'Trà Chanh Leo', price: 38000, category: 'tra-trai-cay', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400' },
    { id: 11, name: 'Đá Xay Oreo', price: 50000, category: 'da-xay', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400' },
    { id: 12, name: 'Trà Sữa Okinawa', price: 52000, category: 'tra-sua', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400' },
];

const categories = [
    { id: 'all', name: 'Tất Cả', slug: 'all' },
    { id: 'tra-sua', name: 'Trà Sữa Truyền Thống', slug: 'tra-sua' },
    { id: 'tra-trai-cay', name: 'Trà Sữa Trái Cây', slug: 'tra-trai-cay' },
    { id: 'da-xay', name: 'Đá Xay', slug: 'da-xay' },
    { id: 'topping', name: 'Topping', slug: 'topping' },
];

const Menu = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
    const [priceRange, setPriceRange] = useState([20000, 80000]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('popular');
    
    const pageSize = 9;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    const filteredProducts = useMemo(() => {
        let filtered = allProducts;
        
        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }
        
        // Filter by price range
        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
        
        // Sort
        if (sortBy === 'price-low') {
            filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered = [...filtered].sort((a, b) => b.price - a.price);
        }
        
        return filtered;
    }, [selectedCategory, priceRange, sortBy]);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredProducts.slice(start, start + pageSize);
    }, [filteredProducts, currentPage]);

    const handleAddToCart = (product) => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            options: {
                size: 'M',
                sugar: '100%',
                ice: '100%',
                toppings: []
            }
        }));
    };

    return (
        <div className="menu-page">
            <div className="menu-container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <Link to="/menu">Menu</Link>
                    <span>/</span>
                    <span className="current">Trà Sữa</span>
                </div>

                <div className="menu-layout">
                    {/* Sidebar */}
                    <aside className="menu-sidebar">
                        <div className="filter-section">
                            <h3>Lọc Sản Phẩm</h3>
                        </div>

                        <div className="filter-section">
                            <h4>Danh Mục</h4>
                            <ul className="category-list">
                                {categories.map(cat => (
                                    <li key={cat.id}>
                                        <button
                                            className={`category-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
                                            onClick={() => {
                                                setSelectedCategory(cat.slug);
                                                setCurrentPage(1);
                                            }}
                                        >
                                            {selectedCategory === cat.slug && <CheckCircleFilled className="check-icon" />}
                                            {cat.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="filter-section">
                            <h4>Khoảng Giá</h4>
                            <Slider
                                range
                                min={20000}
                                max={80000}
                                step={5000}
                                value={priceRange}
                                onChange={setPriceRange}
                                tooltip={{ formatter: (value) => formatPrice(value) }}
                            />
                            <div className="price-range-labels">
                                <span>{formatPrice(priceRange[0])}</span>
                                <span>{formatPrice(priceRange[1])}</span>
                            </div>
                            <button 
                                className="apply-filter-btn"
                                onClick={() => setCurrentPage(1)}
                            >
                                Áp dụng
                            </button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="menu-main">
                        <div className="menu-header">
                            <h1>Menu Trà Sữa</h1>
                            <div className="sort-select">
                                <span>Sắp xếp theo:</span>
                                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option value="popular">Phổ biến nhất</option>
                                    <option value="price-low">Giá thấp đến cao</option>
                                    <option value="price-high">Giá cao đến thấp</option>
                                </select>
                            </div>
                        </div>

                        <div className="products-grid">
                            {paginatedProducts.map(product => (
                                <div key={product.id} className="product-card-menu">
                                    <Link to={`/product/${product.id}`} className="product-link">
                                        <div className="product-image">
                                            <img src={product.image} alt={product.name} />
                                        </div>
                                        <div className="product-info">
                                            <h3>{product.name}</h3>
                                            <p className="price">{formatPrice(product.price)}</p>
                                        </div>
                                    </Link>
                                    <button 
                                        className="add-to-cart-btn"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="no-products">
                                <p>Không tìm thấy sản phẩm phù hợp</p>
                            </div>
                        )}

                        {filteredProducts.length > pageSize && (
                            <div className="pagination-wrapper">
                                <Pagination
                                    current={currentPage}
                                    total={filteredProducts.length}
                                    pageSize={pageSize}
                                    onChange={setCurrentPage}
                                    showSizeChanger={false}
                                />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Menu;
