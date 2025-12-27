import React from 'react';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/slices/cartSlice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
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
        <Link to={`/product/${product.id}`} className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                {product.description && (
                    <p className="product-description">{product.description}</p>
                )}
                <div className="product-footer">
                    <span className="product-price">{formatPrice(product.price)}</span>
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        <PlusOutlined />
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
