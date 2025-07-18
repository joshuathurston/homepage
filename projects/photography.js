document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const photoCards = document.querySelectorAll('.photo-card');

    // Filter photos based on category
    function filterPhotos(category) {
        photoCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter photos
            filterPhotos(button.dataset.category);
        });
    });

    // Initialize with 'all' category
    filterPhotos('all');
});

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close-modal');
    const viewFullBtns = document.querySelectorAll('.view-full-btn');

    viewFullBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const imgSrc = btn.getAttribute('data-full');
            modalImg.src = imgSrc;
            modal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        modalImg.src = '';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalImg.src = '';
        }
    });
}); 