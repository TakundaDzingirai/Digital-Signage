import React, { useState, useEffect } from "react";

const CustomCarousel = ({ images, timeout }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, timeout);

        return () => clearInterval(interval);
    }, [currentIndex, timeout, images.length]);

    return (
        <div className="slider">
            <ul className="slider-list">
                {images.map((image, index) => (
                    <li
                        key={index}
                        className={`slider-item ${index === currentIndex ? "active" : ""
                            }`}
                    >
                        <img src={image} alt={`Image ${index + 1}`} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomCarousel;
