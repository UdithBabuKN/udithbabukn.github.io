import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Breadcrumbs Component
 * Follows schema.org/BreadcrumbList specification with both semantic microdata
 * and accessible navigation markup.
 *
 * @param {Array} items - Array of { label: string, path: string, isCurrent?: boolean }
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="sk-breadcrumb-nav">
      <ol 
        className="sk-breadcrumb-list" 
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const position = index + 1;

          return (
            <li 
              key={item.path || index} 
              className={`sk-breadcrumb-item ${isLast ? 'current' : ''}`}
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              {!isLast ? (
                <>
                  <Link 
                    to={item.path} 
                    itemProp="item" 
                    className="sk-breadcrumb-link"
                  >
                    {index === 0 && <span className="sk-breadcrumb-icon" aria-hidden="true">⌂ </span>}
                    <span itemProp="name">{item.label}</span>
                  </Link>
                  <meta itemProp="position" content={position} />
                  <span className="sk-breadcrumb-sep" aria-hidden="true">/</span>
                </>
              ) : (
                <>
                  <span 
                    itemProp="name" 
                    className="sk-breadcrumb-current" 
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                  <link itemProp="item" href={`https://udithbabukn.github.io${item.path}`} />
                  <meta itemProp="position" content={position} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
