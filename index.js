const lightbox = document.getElementById('lightbox');
const openButton = document.querySelector('.submit-button');
const lightboxButtons = document.querySelectorAll('.lightboxButton');
const overlay = document.getElementById('overlay');
const closeButton = document.querySelector('.close-img');

openButton.addEventListener('click', (event) => {
    event.preventDefault();
    lightbox.style.display = 'flex';
    overlay.style.display = 'block';
});

lightboxButtons.forEach(lightboxButtonElement => {
    lightboxButtonElement.addEventListener('click', () => {
        lightbox.style.display = 'none';
        overlay.style.display = 'none';
    });
});

closeButton.addEventListener("click", function() {
    lightbox.style.display = 'none';
    overlay.style.display = 'none';
});