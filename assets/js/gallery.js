
        let currentModalImages = [];
        let currentModalIndex = 0;

        // Filter functionality
        function filterGallery(category) {
            const items = document.querySelectorAll('.gallery-item');
            const buttons = document.querySelectorAll('.filter-btn');
            
            // Update button styles
            buttons.forEach(btn => {
                btn.style.background = 'white';
                btn.style.color = '#295473';
                btn.style.border = '2px solid #295473';
                btn.style.boxShadow = 'none';
            });
            
            // Style active button
            event.target.style.background = 'linear-gradient(135deg, #295473 0%, #4682b4 100%)';
            event.target.style.color = 'white';
            event.target.style.border = 'none';
            event.target.style.boxShadow = '0 4px 12px rgba(41, 84, 115, 0.3)';
            
            // Filter items
            items.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Change main image in card
        function changeImage(thumbnail, index) {
            const card = thumbnail.closest('.gallery-item');
            const mainImage = card.querySelector('.main-image');
            const counter = card.querySelector('.image-counter');
            const thumbnails = card.querySelectorAll('.thumbnail');
            const galleryImages = card.querySelectorAll('.gallery-images img');
            
            // Update main image
            if (galleryImages[index]) {
                mainImage.src = galleryImages[index].src;
                mainImage.alt = galleryImages[index].alt;
            }
            
            // Update counter
            counter.textContent = `${index + 1} / ${thumbnails.length}`;
            
            // Update thumbnail styles
            thumbnails.forEach((thumb, i) => {
                if (i === index) {
                    thumb.classList.add('active');
                    thumb.style.border = '3px solid #295473';
                    thumb.style.opacity = '1';
                } else {
                    thumb.classList.remove('active');
                    thumb.style.border = '3px solid transparent';
                    thumb.style.opacity = '0.7';
                }
            });
        }

        // Enhanced modal functionality
        function openModal(images, captions, startIndex = 0) {
            currentModalImages = images;
            currentModalIndex = startIndex;
            
            const modal = document.getElementById('imageModal');
            modal.style.display = 'block';
            
            updateModalContent();
            createModalThumbnails();
        }

        function updateModalContent() {
            const modalImg = document.getElementById('modalImage');
            const modalCaption = document.getElementById('modalCaption');
            
            if (currentModalImages[currentModalIndex]) {
                modalImg.src = currentModalImages[currentModalIndex].src;
                modalCaption.innerHTML = `
                    <h3>${currentModalImages[currentModalIndex].title}</h3>
                    <p>${currentModalImages[currentModalIndex].caption}</p>
                    <div style="margin-top: 10px; font-size: 0.9rem; opacity: 0.8;">
                        ${currentModalIndex + 1} / ${currentModalImages.length}
                    </div>
                `;
            }
        }

        function createModalThumbnails() {
            const thumbnailContainer = document.getElementById('modalThumbnails');
            thumbnailContainer.innerHTML = '';
            
            currentModalImages.forEach((img, index) => {
                const thumb = document.createElement('img');
                thumb.src = img.src;
                thumb.style.cssText = `
                    width: 60px;
                    height: 45px;
                    border-radius: 5px;
                    cursor: pointer;
                    object-fit: cover;
                    border: 2px solid ${index === currentModalIndex ? '#4682b4' : 'transparent'};
                    opacity: ${index === currentModalIndex ? '1' : '0.6'};
                    transition: all 0.3s ease;
                `;
                thumb.onclick = () => {
                    currentModalIndex = index;
                    updateModalContent();
                    updateModalThumbnails();
                };
                thumbnailContainer.appendChild(thumb);
            });
        }

        function updateModalThumbnails() {
            const thumbnails = document.querySelectorAll('#modalThumbnails img');
            thumbnails.forEach((thumb, index) => {
                thumb.style.border = index === currentModalIndex ? '2px solid #4682b4' : '2px solid transparent';
                thumb.style.opacity = index === currentModalIndex ? '1' : '0.6';
            });
        }

        function previousImage() {
            if (currentModalIndex > 0) {
                currentModalIndex--;
                updateModalContent();
                updateModalThumbnails();
            }
        }

        function nextImage() {
            if (currentModalIndex < currentModalImages.length - 1) {
                currentModalIndex++;
                updateModalContent();
                updateModalThumbnails();
            }
        }

        function closeModal() {
            document.getElementById('imageModal').style.display = 'none';
        }

        // Add click handlers to gallery items
        document.addEventListener('DOMContentLoaded', function() {
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                // Add hover effects
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                    const img = this.querySelector('.main-image');
                    if (img) img.style.transform = 'scale(1.05)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0px)';
                    this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    const img = this.querySelector('.main-image');
                    if (img) img.style.transform = 'scale(1)';
                });
                
                // Add click handler for modal
                item.addEventListener('click', function(e) {
                    // Don't open modal if clicking on thumbnails
                    if (e.target.classList.contains('thumbnail')) return;
                    
                    const title = this.querySelector('h3').textContent;
                    const description = this.querySelector('p').textContent;
                    const galleryImages = this.querySelectorAll('.gallery-images img');
                    
                    const images = Array.from(galleryImages).map(img => ({
                        src: img.src,
                        title: title,
                        caption: img.alt || description
                    }));
                    
                    openModal(images, [], 0);
                });
            });

            // Add hover effects to filter buttons
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                btn.addEventListener('mouseenter', function() {
                    if (this.style.background !== 'linear-gradient(135deg, rgb(41, 84, 115) 0%, rgb(70, 130, 180) 100%)') {
                        this.style.background = 'linear-gradient(135deg, #295473 0%, #4682b4 100%)';
                        this.style.color = 'white';
                        this.style.border = 'none';
                        this.style.transform = 'translateY(-2px)';
                    }
                });
                
                btn.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('active') && this.style.background !== 'linear-gradient(135deg, rgb(41, 84, 115) 0%, rgb(70, 130, 180) 100%)') {
                        this.style.background = 'white';
                        this.style.color = '#295473';
                        this.style.border = '2px solid #295473';
                        this.style.transform = 'translateY(0px)';
                    }
                });
            });

            // Add hover effects to thumbnails
            document.addEventListener('mouseover', function(e) {
                if (e.target.classList.contains('thumbnail')) {
                    e.target.style.transform = 'scale(1.1)';
                }
            });
            
            document.addEventListener('mouseout', function(e) {
                if (e.target.classList.contains('thumbnail')) {
                    e.target.style.transform = 'scale(1)';
                }
            });

            // Add hover effects to navigation arrows
            const navArrows = document.querySelectorAll('.nav-arrow');
            navArrows.forEach(arrow => {
                arrow.addEventListener('mouseenter', function() {
                    this.style.background = 'rgba(70, 130, 180, 0.8)';
                    this.style.transform = 'translateY(-50%) scale(1.1)';
                });
                
                arrow.addEventListener('mouseleave', function() {
                    this.style.background = 'rgba(0,0,0,0.5)';
                    this.style.transform = 'translateY(-50%) scale(1)';
                });
            });

            // Close modal when clicking outside the image
            document.getElementById('imageModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal();
                }
            });

            // Keyboard navigation for modal
            document.addEventListener('keydown', function(e) {
                const modal = document.getElementById('imageModal');
                if (modal.style.display === 'block') {
                    if (e.key === 'ArrowLeft') {
                        previousImage();
                    } else if (e.key === 'ArrowRight') {
                        nextImage();
                    } else if (e.key === 'Escape') {
                        closeModal();
                    }
                }
            });
        });

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .thumbnail-strip::-webkit-scrollbar {
                height: 4px;
            }
            
            .thumbnail-strip::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 2px;
            }
            
            .thumbnail-strip::-webkit-scrollbar-thumb {
                background: #295473;
                border-radius: 2px;
            }
            
            .thumbnail-strip::-webkit-scrollbar-thumb:hover {
                background: #4682b4;
            }
            
            #modalThumbnails::-webkit-scrollbar {
                height: 4px;
            }
            
            #modalThumbnails::-webkit-scrollbar-track {
                background: rgba(255,255,255,0.2);
                border-radius: 2px;
            }
            
            #modalThumbnails::-webkit-scrollbar-thumb {
                background: rgba(255,255,255,0.5);
                border-radius: 2px;
            }
        `;
        document.head.appendChild(style);
    