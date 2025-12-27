import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
    return (
        <Link to={`/menu?category=${category.slug}`} className="category-card">
            <div className="category-image">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay"></div>
                <span className="category-name">{category.name}</span>
            </div>
        </Link>
    );
};

export default CategoryCard;
