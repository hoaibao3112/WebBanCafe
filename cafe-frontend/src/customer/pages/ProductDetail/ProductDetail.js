import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarFilled, HeartOutlined, HeartFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/slices/cartSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductDetail.css';

// Mock data
const productData = {
    id: 1,
    name: 'Trà Sữa Trân Châu Đường Đen',
    rating: 4.8,
    reviewCount: 256,
    description: 'Hương vị đậm đà của trà sữa truyền thống, hòa quyện với vị ngọt thanh của đường đen và sự dai ngon của trân châu. Một lựa chọn hoàn hảo cho bất kỳ thời điểm nào trong ngày.',
    longDescription: 'Trà Sữa Trân Châu Đường Đen là sự kết hợp tinh tế giữa trà sữa thơm lừng và trân châu đường đen mềm dai, ngọt ngào. Mỗi ngụm trà là một trải nghiệm khó quên, đánh thức mọi giác quan của bạn. Chúng tôi sử dụng những lá trà hảo hạng và sữa tươi nguyên chất để tạo nên hương vị béo ngậy, đậm đà. Trân châu được nấu kỹ với đường đen tự nhiên, tạo nên độ dai hoàn hảo và vị ngọt thanh đặc trưng. Đây không chỉ là một thức uống, mà còn là một niềm vui nhỏ nhỏ giúp bạn thư giãn sau những giờ làm việc căng thẳng.',
    basePrice: 55000,
    images: [
        'https://images.unsplash.com/photo-1558857563-b371033873b8?w=600',
        'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600',
        'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600',
        'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600',
    ],
    sizes: [
        { id: 'M', name: 'Size M', priceAdd: 0 },
        { id: 'L', name: 'Size L', priceAdd: 10000 },
    ],
    sugarLevels: ['100%', '70%', '50%', '30%', 'Ít đường'],
    iceLevels: ['100%', '70%', '50%', '30%', 'Không đá'],
    toppings: [
        { id: 1, name: 'Trân châu đen', price: 5000 },
        { id: 2, name: 'Pudding trứng', price: 10000 },
        { id: 3, name: 'Thạch dừa', price: 5000 },
    ],
    ingredients: ['Trà đen', 'Sữa tươi', 'Đường đen', 'Trân châu tapioca'],
};

const relatedProducts = [
    { id: 2, name: 'Trà Sữa Matcha', price: 50000, image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400' },
    { id: 3, name: 'Trà Sữa Khoai Môn', price: 52000, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400' },
    { id: 4, name: 'Trà Oolong Kem Phô Mai', price: 60000, image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400' },
    { id: 5, name: 'Trà Sữa Truyền Thống', price: 45000, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400' },
];

const ProductDetail = () => {
    // eslint-disable-next-line no-unused-vars
    const { id } = useParams();
    const dispatch = useDispatch();
    
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedSugar, setSelectedSugar] = useState('100%');
    const [selectedIce, setSelectedIce] = useState('100%');
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const product = productData; // In real app, fetch by id

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    const calculateTotal = () => {
        const sizePrice = product.sizes.find(s => s.id === selectedSize)?.priceAdd || 0;
        const toppingsPrice = selectedToppings.reduce((sum, toppingId) => {
            const topping = product.toppings.find(t => t.id === toppingId);
            return sum + (topping?.price || 0);
        }, 0);
        return (product.basePrice + sizePrice + toppingsPrice) * quantity;
    };

    const toggleTopping = (toppingId) => {
        setSelectedToppings(prev => 
            prev.includes(toppingId)
                ? prev.filter(id => id !== toppingId)
                : [...prev, toppingId]
        );
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: calculateTotal() / quantity,
            image: product.images[0],
            quantity,
            options: {
                size: selectedSize,
                sugar: selectedSugar,
                ice: selectedIce,
                toppings: selectedToppings.map(id => product.toppings.find(t => t.id === id)?.name)
            }
        }));
    };

    const tabItems = [
        {
            key: 'description',
            label: 'Mô tả',
            children: <p className="tab-content">{product.longDescription}</p>
        },
        {
            key: 'ingredients',
            label: 'Thành phần',
            children: (
                <ul className="ingredients-list">
                    {product.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                </ul>
            )
        },
        {
            key: 'reviews',
            label: `Đánh giá (${product.reviewCount})`,
            children: <p className="tab-content">Hiển thị đánh giá từ khách hàng...</p>
        },
    ];

    return (
        <div className="product-detail-page">
            <div className="product-container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <Link to="/menu">Trà Sữa</Link>
                    <span>/</span>
                    <span className="current">{product.name}</span>
                </div>

                <div className="product-layout">
                    {/* Image Gallery */}
                    <div className="product-gallery">
                        <div className="main-image">
                            <img src={product.images[selectedImage]} alt={product.name} />
                            <button 
                                className="favorite-btn"
                                onClick={() => setIsFavorite(!isFavorite)}
                            >
                                {isFavorite ? <HeartFilled className="filled" /> : <HeartOutlined />}
                            </button>
                        </div>
                        <div className="thumbnail-list">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={img} alt={`${product.name} ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                        <h1 className="product-title">{product.name}</h1>
                        
                        <div className="product-rating">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <StarFilled key={i} className={i < Math.floor(product.rating) ? 'filled' : ''} />
                                ))}
                            </div>
                            <span className="rating-text">{product.rating} ({product.reviewCount} đánh giá)</span>
                        </div>

                        <p className="product-description">{product.description}</p>

                        {/* Size Options */}
                        <div className="option-group">
                            <h4>Kích thước</h4>
                            <div className="option-buttons">
                                {product.sizes.map(size => (
                                    <button
                                        key={size.id}
                                        className={`option-btn size-btn ${selectedSize === size.id ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size.id)}
                                    >
                                        <span className="option-name">{size.name}</span>
                                        <span className="option-price">
                                            {size.priceAdd === 0 ? '+0đ' : `+${formatPrice(size.priceAdd)}`}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sugar Level */}
                        <div className="option-group">
                            <h4>Mức đường</h4>
                            <div className="option-buttons inline">
                                {product.sugarLevels.map(level => (
                                    <button
                                        key={level}
                                        className={`option-btn ${selectedSugar === level ? 'active' : ''}`}
                                        onClick={() => setSelectedSugar(level)}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ice Level */}
                        <div className="option-group">
                            <h4>Mức đá</h4>
                            <div className="option-buttons inline">
                                {product.iceLevels.map(level => (
                                    <button
                                        key={level}
                                        className={`option-btn ${selectedIce === level ? 'active' : ''}`}
                                        onClick={() => setSelectedIce(level)}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Toppings */}
                        <div className="option-group">
                            <h4>Topping thêm</h4>
                            <div className="toppings-list">
                                {product.toppings.map(topping => (
                                    <button
                                        key={topping.id}
                                        className={`topping-btn ${selectedToppings.includes(topping.id) ? 'active' : ''}`}
                                        onClick={() => toggleTopping(topping.id)}
                                    >
                                        <span>{topping.name}</span>
                                        <span className="topping-price">+{formatPrice(topping.price)}</span>
                                        {selectedToppings.includes(topping.id) && <span className="check">✓</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="purchase-section">
                            <div className="quantity-selector">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <MinusOutlined />
                                </button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>
                                    <PlusOutlined />
                                </button>
                            </div>
                            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                                🛒 Thêm vào giỏ hàng - {formatPrice(calculateTotal())}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="product-tabs">
                    <Tabs items={tabItems} />
                </div>

                {/* Related Products */}
                <section className="related-section">
                    <h2>Có thể bạn cũng thích</h2>
                    <div className="related-grid">
                        {relatedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductDetail;
