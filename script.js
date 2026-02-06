// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // 1. MOBILE MENU TOGGLE
    // ====================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
    
    // ====================
    // 2. NAVIGATION SCROLL & HIGHLIGHT
    // ====================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Function to highlight active navigation link
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight nav link on scroll
    window.addEventListener('scroll', highlightNavLink);
    
    // ====================
    // 3. LOAD DYNAMIC IMAGES
    // ====================
    // City image for introduction section
    const cityImage = document.getElementById('cityImage');
    if (cityImage) {
        cityImage.style.backgroundImage = 'url("https://picsum.photos/600/400?random=2")';
        cityImage.style.backgroundSize = 'cover';
        cityImage.style.backgroundPosition = 'center';
        cityImage.innerHTML = ''; // Clear placeholder text
    }
    
    // Tourism images
    const tourismImages = [
        { id: 'tourismImage1', url: 'https://picsum.photos/400/300?random=3' },
        { id: 'tourismImage2', url: 'https://picsum.photos/400/300?random=4' },
        { id: 'tourismImage3', url: 'https://picsum.photos/400/300?random=5' }
    ];
    
    tourismImages.forEach(image => {
        const imgElement = document.getElementById(image.id);
        if (imgElement) {
            imgElement.style.backgroundImage = `url("${image.url}")`;
            imgElement.style.backgroundSize = 'cover';
            imgElement.style.backgroundPosition = 'center';
        }
    });
    
    // ====================
    // 4. TOURISM BUTTON INTERACTION
    // ====================
    const cardButtons = document.querySelectorAll('.card-btn');
    cardButtons.forEach(button => {
        button.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            alert(`Bạn đã chọn xem thêm về: ${location}\n\nThông tin chi tiết về ${location} sẽ được cập nhật trong phiên bản tiếp theo!`);
            
            // Add visual feedback
            this.style.backgroundColor = '#e55039';
            this.textContent = 'Đã chọn!';
            
            setTimeout(() => {
                this.style.backgroundColor = '';
                this.textContent = 'Xem thêm';
            }, 1500);
        });
    });
    
    // ====================
    // 5. CONTACT FORM HANDLING
    // ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc (Họ tên, Email, Nội dung)');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Vui lòng nhập địa chỉ email hợp lệ');
                return;
            }
            
            // Show success message
            alert(`Cảm ơn ${name}!\n\nTin nhắn của bạn đã được gửi thành công.\nChúng tôi sẽ liên hệ với bạn qua email: ${email}\n\n(Lưu ý: Đây là form demo, thông tin chưa được gửi đến server)`);
            
            // Reset form
            contactForm.reset();
            
            // Add visual feedback
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Đã gửi thành công!';
            submitBtn.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 2000);
        });
    }
    
    // ====================
    // 6. SCROLL TO TOP BUTTON (Optional)
    // ====================
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);
    
    // Style the button
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 100;
        box-shadow: 0 4px 12px rgba(26, 95, 180, 0.3);
    `;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ====================
    // 7. PAGE LOAD ANIMATION
    // ====================
    // Add fade-in animation to sections
    const fadeElements = document.querySelectorAll('section, .tourism-card, .cuisine-card');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger on load and scroll
    window.addEventListener('load', fadeInOnScroll);
    window.addEventListener('scroll', fadeInOnScroll);
    
    // ====================
    // 8. CURRENT YEAR IN FOOTER
    // ====================
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(element => {
        if (element.textContent.includes('2024')) {
            element.textContent = element.textContent.replace('2024', currentYear);
        }
    });
    
    // ====================
    // 9. HERO TITLE TYPING EFFECT (Optional enhancement)
    // ====================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // ====================
    // 10. INITIALIZE PAGE
    // ====================
    console.log('Website Thành phố Đà Nẵng đã được tải thành công!');
    console.log('Chào mừng bạn đến với thành phố đáng sống nhất Việt Nam.');
});