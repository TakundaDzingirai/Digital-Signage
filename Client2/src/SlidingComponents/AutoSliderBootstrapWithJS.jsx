import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AutoSliderBootstrapWithJS = () => {
    useEffect(() => {
        // Initialize the Bootstrap carousel component
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            window.$(carousel).carousel();
        }
    }, []);

    return (
        <div className="container">
            <h1>AutoSlider Bootstrap with JavaScript in React</h1>
            <div className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="image1.jpg" className="d-block w-100" alt="Image 1" />
                    </div>
                    <div className="carousel-item">
                        <img src="image2.jpg" className="d-block w-100" alt="Image 2" />
                    </div>
                    <div className="carousel-item">
                        <img src="image3.jpg" className="d-block w-100" alt="Image 3" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExample" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExample" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    );
};

export default AutoSliderBootstrapWithJS;
