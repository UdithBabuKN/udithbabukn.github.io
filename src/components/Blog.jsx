import { useState, useEffect, useRef } from 'react';
import { blogPosts } from '../data/blogPostsData';

function getCategoryColor(category) {
    switch (category) {
        case 'Foundations': return '#7EBDC2'; // Soft Teal
        case 'Playbook': return '#9DBA94'; // Soft Matcha
        case 'Sales Excellence': return '#E5989B'; // Dusty Rose
        case 'Growth & Analytics': return '#F4CB8C'; // Soft Peach
        default: return '#B5A6C9'; // Muted Lavender
    }
}

export default function Blog() {
    const carouselRef = useRef(null);

    if (!blogPosts || blogPosts.length === 0) {
        return <p style={{textAlign: 'center', color: 'var(--error-color)'}}>Unable to load blog posts.</p>;
    }

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -380 : 380;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="section blog-header" id="blog" style={{ opacity: 1, transform: 'none' }}>
            <h1 className="section-header">Blogs</h1>
            
            <div className="blog-carousel-wrapper">
                <button 
                    className="carousel-btn left" 
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <i className="ph-duotone ph-caret-left"></i>
                </button>

                <div className="blog-carousel" ref={carouselRef}>
                    {blogPosts.map(post => {
                        const currentYear = new Date().getFullYear().toString();
                        const yearToReplace = '2025';
                        let displayTitle = post.title;
                        if (currentYear !== yearToReplace && displayTitle.includes(yearToReplace)) {
                            displayTitle = displayTitle.replace(yearToReplace, currentYear);
                        }

                        return (
                            <a href={`blog/${post.slug}.html`} className="blog-card" key={post.slug} style={{ '--category-color': getCategoryColor(post.category), textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                                <div className="blog-card-image-container">
                                    <img src={`images/blogimages/${post.image}`} alt={displayTitle} className="blog-card-image" loading="lazy" />
                                </div>
                                <div className="blog-card-content">
                                    <span className="blog-card-category">{post.category}</span>
                                    <h3 className="blog-card-title">{displayTitle}</h3>
                                    <p className="blog-card-excerpt">{post.excerpt}</p>
                                    <div className="blog-card-footer">
                                        <div className="author-info">
                                            <img src="picofme.webp" alt="Udith Babu K N" className="author-image" width="40" height="40" />
                                            <div className="author-details">
                                                <span className="author-name">Udith Babu K N</span>
                                                <span className="read-time">{post.readTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>

                <button 
                    className="carousel-btn right" 
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <i className="ph-duotone ph-caret-right"></i>
                </button>
            </div>
        </section>
    );
}
