import React from 'react';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import ProductCard from '../../components/ProductCard/ProductCard';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import './Home.css';

// Mock data - replace with API calls
const categories = [
    { id: 1, name: 'Trà Sữa', slug: 'tra-sua', image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400' },
    { id: 2, name: 'Trà Trái Cây', slug: 'tra-trai-cay', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400' },
    { id: 3, name: 'Đá Xay', slug: 'da-xay', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400' },
    { id: 4, name: 'Topping', slug: 'topping', image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400' },
];

const popularProducts = [
    {
        id: 1,
        name: 'Trà Sữa Trân Châu Đường Đen',
        description: 'Trà sữa cổ điển với siro đường đen đậm đà và trân châu dai ngon.',
        price: 55000,
        image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400'
    },
    {
        id: 2,
        name: 'Trà Sữa Khoai Môn',
        description: 'Vị khoai môn béo ngọt hòa quyện hoàn hảo với trà sữa đặc trưng của quán.',
        price: 58000,
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400'
    },
    {
        id: 3,
        name: 'Trà Xoài Chanh Dây',
        description: 'Sự kết hợp tươi mát giữa trà xanh nhài, xoài và chanh dây chua ngọt.',
        price: 60000,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'
    },
    {
        id: 4,
        name: 'Matcha Latte',
        description: 'Bột matcha thượng hạng được pha cùng sữa tươi tạo nên hương vị đậm đà.',
        price: 58000,
        image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400'
    },
];

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Trà Sữa <span className="highlight">Đậm Vị</span>,
                            <br />
                            Trân Châu <span className="highlight">Đúng Gu</span>
                        </h1>
                        <p className="hero-description">
                            Khám phá thế giới trà sữa tươi ngon, pha chế từ những nguyên liệu 
                            tuyển chọn. Đặt ngay để tận hưởng khoảnh khắc ngọt ngào!
                        </p>
                        <div className="hero-buttons">
                            <Link to="/menu" className="btn btn-primary">Đặt Hàng Ngay</Link>
                            <Link to="/menu" className="btn btn-secondary">Xem Thực Đơn</Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img 
                            src="https://images.unsplash.com/photo-1558857563-b371033873b8?w=600" 
                            alt="Boba Tea" 
                        />
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Khám Phá Thực Đơn</h2>
                        <Link to="/menu" className="see-all-link">
                            Xem tất cả <RightOutlined />
                        </Link>
                    </div>
                    <div className="categories-grid">
                        {categories.map(category => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Products Section */}
            <section className="popular-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Bán Chạy Nhất</h2>
                        <Link to="/menu" className="see-all-link">
                            Xem tất cả <RightOutlined />
                        </Link>
                    </div>
                    <div className="products-grid">
                        {popularProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Promotion Banner */}
            <section className="promotion-section">
                <div className="section-container">
                    <div className="promotion-banner">
                        <div className="promotion-content">
                            <h3>Ưu Đãi Đặc Biệt Thứ 3 Vui Vẻ!</h3>
                            <p>Mua 1 TẶNG 1 cho tất cả các món Trà Trái Cây. Giải nhiệt mùa hè ngay thôi!</p>
                        </div>
                        <Link to="/promotions" className="btn btn-promo">Nhận Ưu Đãi</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
