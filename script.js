// Swiper initialization
const swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// Mobile menu toggle
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Active navigation link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
});

// Photo Editor Functionality
document.addEventListener('DOMContentLoaded', function() {
    const previewImage = document.getElementById('preview-image');
    const uploadInput = document.getElementById('upload-input');
    const uploadBtn = document.getElementById('upload-btn');
    const brightnessSlider = document.getElementById('brightness');
    const contrastSlider = document.getElementById('contrast');
    const brightnessValue = document.getElementById('brightness-value');
    const contrastValue = document.getElementById('contrast-value');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const saveBtn = document.getElementById('save-btn');
    const resetBtn = document.getElementById('reset-btn');

    let currentFilter = 'none';
    let originalImageSrc = previewImage.src;

    // Upload image
    uploadBtn.addEventListener('click', () => {
        uploadInput.click();
    });

    uploadInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                originalImageSrc = e.target.result;
                resetFilters();
            }
            reader.readAsDataURL(file);
        }
    });

    // Update brightness
    brightnessSlider.addEventListener('input', function() {
        brightnessValue.textContent = this.value + '%';
        applyFilters();
    });

    // Update contrast
    contrastSlider.addEventListener('input', function() {
        contrastValue.textContent = this.value + '%';
        applyFilters();
    });

    // Apply filter
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            currentFilter = this.getAttribute('data-filter');
            applyFilters();
        });
    });

    // Apply all filters
    function applyFilters() {
        const brightness = brightnessSlider.value;
        const contrast = contrastSlider.value;
        
        previewImage.style.filter = `
            brightness(${brightness}%) 
            contrast(${contrast}%) 
            ${currentFilter}
        `;
    }

    // Reset filters
    function resetFilters() {
        brightnessSlider.value = 100;
        contrastSlider.value = 100;
        brightnessValue.textContent = '100%';
        contrastValue.textContent = '100%';
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        filterButtons[0].classList.add('active');
        currentFilter = 'none';
        
        applyFilters();
    }

    resetBtn.addEventListener('click', resetFilters);

    // Save image
    saveBtn.addEventListener('click', function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = previewImage.naturalWidth;
        canvas.height = previewImage.naturalHeight;
        
        // Apply current filters to canvas
        ctx.filter = `
            brightness(${brightnessSlider.value}%) 
            contrast(${contrastSlider.value}%) 
            ${currentFilter}
        `;
        
        ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height);
        
        // Create download link
        const link = document.createElement('a');
        link.download = 'edited-book-cover.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    // Add to cart functionality
    const cartButtons = document.querySelectorAll('.bx-cart-alt');
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productBox = this.closest('.box');
            const productName = productBox.querySelector('h2').textContent;
            const productPrice = productBox.querySelector('.price').textContent;
            
            alert(`"${productName}" telah ditambahkan ke keranjang!\nHarga: ${productPrice}`);
        });
    });

    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.bx-heart');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productBox = this.closest('.box');
            const productName = productBox.querySelector('h2').textContent;
            
            if (this.style.color === 'red') {
                this.style.color = '#ccc';
                alert(`"${productName}" dihapus dari wishlist`);
            } else {
                this.style.color = 'red';
                alert(`"${productName}" ditambahkan ke wishlist`);
            }
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Terima kasih! Email ${email} telah berlangganan buletin kami.`);
        this.reset();
    });
});

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

// Login Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const loginClose = document.getElementById('login-close');
    const registerClose = document.getElementById('register-close');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const profile = document.querySelector('.profile');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const togglePassword = document.getElementById('toggle-password');
    const toggleRegPassword = document.getElementById('toggle-reg-password');
    const regPassword = document.getElementById('reg-password');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');

    // Open login modal when profile is clicked
    profile.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modals
    function closeModals() {
        loginModal.classList.remove('active');
        registerModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    loginClose.addEventListener('click', closeModals);
    registerClose.addEventListener('click', closeModals);

    // Switch between login and register
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.remove('active');
        registerModal.classList.add('active');
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.classList.remove('active');
        loginModal.classList.add('active');
    });

    // Close modal when clicking outside
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeModals();
        }
    });

    registerModal.addEventListener('click', function(e) {
        if (e.target === registerModal) {
            closeModals();
        }
    });

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        const icon = this.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('bx-hide');
            icon.classList.add('bx-show');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('bx-show');
            icon.classList.add('bx-hide');
        }
    });

    toggleRegPassword.addEventListener('click', function() {
        const icon = this.querySelector('i');
        
        if (regPassword.type === 'password') {
            regPassword.type = 'text';
            icon.classList.remove('bx-hide');
            icon.classList.add('bx-show');
        } else {
            regPassword.type = 'password';
            icon.classList.remove('bx-show');
            icon.classList.add('bx-hide');
        }
    });

    // Password strength indicator
    regPassword.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        let text = 'Kekuatan password';
        let color = '#ff4444';

        // Check password strength
        if (password.length >= 8) strength += 25;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
        if (password.match(/\d/)) strength += 25;
        if (password.match(/[^a-zA-Z\d]/)) strength += 25;

        // Update strength indicator
        strengthFill.style.width = strength + '%';
        
        if (strength < 50) {
            color = '#ff4444';
            text = 'Lemah';
        } else if (strength < 75) {
            color = '#ffa726';
            text = 'Sedang';
        } else {
            color = '#4CAF50';
            text = 'Kuat';
        }
        
        strengthFill.style.background = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        // Simulate login process
        const loginBtn = this.querySelector('.login-btn');
        const originalText = loginBtn.innerHTML;
        
        loginBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Memproses...';
        loginBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // In real application, you would validate credentials with backend
            if (email && password) {
                // Update profile to show logged in state
                const profileSpan = document.querySelector('.profile span');
                profileSpan.textContent = email.split('@')[0];
                
                // Show success message
                alert('Login berhasil! Selamat datang di BukuKU.');
                closeModals();
            } else {
                alert('Email dan password harus diisi!');
            }
            
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
        }, 1500);
    });

    // Register form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak cocok!');
            return;
        }

        const registerBtn = this.querySelector('.login-btn');
        const originalText = registerBtn.innerHTML;
        
        registerBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Mendaftarkan...';
        registerBtn.disabled = true;

        // Simulate registration process
        setTimeout(() => {
            // In real application, you would send data to backend
            alert(`Pendaftaran berhasil! Selamat bergabung, ${firstName} ${lastName}.`);
            
            // Switch to login modal
            registerModal.classList.remove('active');
            loginModal.classList.add('active');
            
            registerBtn.innerHTML = originalText;
            registerBtn.disabled = false;
        }, 2000);
    });

    // Social login buttons
    document.querySelectorAll('.social-btn').forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
            alert(`Login dengan ${platform} akan segera tersedia!`);
        });
    });
});