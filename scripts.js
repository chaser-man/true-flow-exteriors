// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Simple mailto form submission handling
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const phone = formData.get('phone') || '';
        const service = formData.get('service') || '';
        const message = formData.get('message') || '';
        
        // Create email content
        const subject = encodeURIComponent('New Contact Form Submission - True Flow Exteriors');
        const body = encodeURIComponent(`Hello,

I'm interested in your exterior services. Here are my details:

Name: ${name}
Email: ${email}
Phone: ${phone}
Service Requested: ${service}

Message:
${message}

Please contact me to discuss my project.

Thank you!
${name}`);
        
        // Create mailto link
        const mailtoLink = `mailto:nielsen.chase@icloud.com?subject=${subject}&body=${body}`;
        
        // Show notification
        showNotification('Opening your email client to send the message...', 'info');
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form after a short delay
        setTimeout(() => {
            this.reset();
            showNotification('Form cleared. Please send the email from your email client.', 'success');
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .contact-item, .about-text, .about-image');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Phone number formatting
function formatPhoneNumber(input) {
    const phoneNumber = input.value.replace(/\D/g, '');
    const formattedNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    input.value = formattedNumber;
}

// Add phone formatting to phone inputs
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', () => formatPhoneNumber(input));
});

// Add loading states to buttons
document.querySelectorAll('.btn').forEach(btn => {
    if (btn.type === 'submit') {
        btn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            this.disabled = true;
            
            // Re-enable after form submission (you can adjust this based on your needs)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    }
});

// Add hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add click-to-call functionality
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // On desktop, show a notification
        if (window.innerWidth > 768) {
            e.preventDefault();
            const phoneNumber = this.href.replace('tel:', '');
            showNotification(`Call us at ${phoneNumber}`, 'info');
        }
    });
});

// Add email click tracking
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
        showNotification('Opening your email client...', 'info');
    });
});

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.background = '#1d4ed8';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.background = '#2563eb';
});

console.log('True Flow Exteriors website loaded successfully!');

// Logo Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('logoModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const logoImages = document.querySelectorAll('.logo-img, .footer-logo-img');

    // Open modal when any logo is clicked
    logoImages.forEach(logo => {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
        closeModalFunction();
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunction();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFunction();
        }
    });

    // Function to close modal
    function closeModalFunction() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    // Add touch/swipe to close on mobile
    let startY = 0;
    let currentY = 0;

    modalImage.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });

    modalImage.addEventListener('touchmove', function(e) {
        currentY = e.touches[0].clientY;
        const diffY = Math.abs(currentY - startY);
        
        // If swiped down significantly, close modal
        if (currentY - startY > 100) {
            closeModalFunction();
        }
    });
});

// Mock Reviews System
document.addEventListener('DOMContentLoaded', function() {
    // Mock review data
    const mockReviews = [
        {
            name: "Sarah M.",
            service: "Power Washing",
            rating: 5,
            text: "Absolutely fantastic service! They power washed our driveway and it looks brand new. Very professional team and fair pricing.",
            date: "December 2024"
        },
        {
            name: "Mike R.",
            service: "Weed Removal",
            rating: 5,
            text: "True Flow did an amazing job removing all the weeds from our property. They were thorough and cleaned up everything perfectly.",
            date: "November 2024"
        },
        {
            name: "Jennifer L.",
            service: "Pet Waste Cleanup",
            rating: 4,
            text: "Great service! They come weekly to clean up after our dogs. Reliable and always on time. Highly recommend!",
            date: "November 2024"
        },
        {
            name: "David K.",
            service: "Multiple Services",
            rating: 5,
            text: "Used them for power washing and curb painting. Exceeded expectations on both services. Will definitely hire again!",
            date: "October 2024"
        },
        {
            name: "Lisa P.",
            service: "Curb Painting",
            rating: 5,
            text: "Our curbs look incredible! Professional work and attention to detail. Great value for the quality of service.",
            date: "October 2024"
        },
        {
            name: "Tom H.",
            service: "Power Washing",
            rating: 4,
            text: "Did a good job cleaning our deck and patio. The team was friendly and worked efficiently. Would use again.",
            date: "September 2024"
        }
    ];

    // Load reviews from localStorage and merge with mock reviews
    function loadReviews() {
        const storedReviews = JSON.parse(localStorage.getItem('trueFlowReviews')) || [];
        return [...storedReviews, ...mockReviews];
    }

    // Save new review to localStorage
    function saveReview(review) {
        const storedReviews = JSON.parse(localStorage.getItem('trueFlowReviews')) || [];
        storedReviews.unshift(review); // Add to beginning
        localStorage.setItem('trueFlowReviews', JSON.stringify(storedReviews));
    }

    // Generate star HTML
    function generateStars(rating) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            starsHTML += `<i class="fas fa-star" ${i <= rating ? 'style="color: #fbbf24;"' : 'style="color: #d1d5db;"'}></i>`;
        }
        return starsHTML;
    }

    // Create review card HTML
    function createReviewCard(review) {
        return `
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-name">${review.name}</div>
                        <div class="review-service">${review.service}</div>
                    </div>
                    <div class="review-rating">
                        ${generateStars(review.rating)}
                    </div>
                </div>
                <div class="review-text">"${review.text}"</div>
                <div class="review-date">${review.date}</div>
            </div>
        `;
    }

    // Display all reviews
    function displayReviews() {
        const reviewsGrid = document.getElementById('reviews-grid');
        const reviews = loadReviews();
        
        if (reviews.length === 0) {
            reviewsGrid.innerHTML = `
                <div class="no-reviews">
                    <i class="fas fa-star"></i>
                    <h3>No Reviews Yet</h3>
                    <p>Be the first to share your experience!</p>
                </div>
            `;
        } else {
            reviewsGrid.innerHTML = reviews.map(review => createReviewCard(review)).join('');
        }

        // Update stats
        updateReviewStats(reviews);
    }

    // Update review statistics
    function updateReviewStats(reviews) {
        if (reviews.length === 0) return;

        const totalReviews = reviews.length;
        const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1);
        
        // Update the stats display
        const ratingNumber = document.querySelector('.rating-number');
        const totalReviewsSpan = document.querySelector('.total-reviews');
        
        if (ratingNumber) ratingNumber.textContent = averageRating;
        if (totalReviewsSpan) totalReviewsSpan.textContent = `Based on ${totalReviews} reviews`;
    }

    // Star rating functionality
    const starRatingInput = document.getElementById('star-rating');
    const ratingValueInput = document.getElementById('rating-value');
    let selectedRating = 0;

    if (starRatingInput) {
        const stars = starRatingInput.querySelectorAll('i');
        
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                highlightStars(index + 1);
            });
            
            star.addEventListener('mouseleave', () => {
                highlightStars(selectedRating);
            });
            
            star.addEventListener('click', () => {
                selectedRating = index + 1;
                ratingValueInput.value = selectedRating;
                highlightStars(selectedRating);
            });
        });
    }

    function highlightStars(rating) {
        const stars = starRatingInput.querySelectorAll('i');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.className = 'fas fa-star active';
            } else {
                star.className = 'far fa-star';
            }
        });
    }

    // Review form submission
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const newReview = {
                name: formData.get('name'),
                service: formData.get('service'),
                rating: parseInt(formData.get('rating')),
                text: formData.get('review'),
                date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            };

            // Validate required fields
            if (!newReview.name || !newReview.service || !newReview.rating || !newReview.text) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Save the review
            saveReview(newReview);
            
            // Show success message
            showNotification('Thank you for your review! It has been added to our website.', 'success');
            
            // Reset form
            this.reset();
            selectedRating = 0;
            highlightStars(0);
            ratingValueInput.value = '';
            
            // Refresh reviews display
            displayReviews();
            
            // Scroll to reviews to show the new review
            setTimeout(() => {
                document.getElementById('reviews-grid').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 500);
        });
    }

    // Initialize reviews display
    displayReviews();
});
