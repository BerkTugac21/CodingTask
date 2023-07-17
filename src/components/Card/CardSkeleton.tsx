import React from 'react';

import './card-skeleton.scss';

export interface CardSkeletonProps {
    count: number
}


const CardSkeleton = (props: CardSkeletonProps) => {

    const { count } = props;

    return (
        <div className="card-grid">
            {/* Generate multiple skeleton cards */}
            {Array.from({ length: count }).map((_, index) => (
                <div className="card skeleton" key={index}>
                    <div className="skeleton-content">
                        <div className="skeleton-image"></div>
                        <div className="skeleton-title"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardSkeleton;
