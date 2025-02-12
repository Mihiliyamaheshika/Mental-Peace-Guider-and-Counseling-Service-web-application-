// Slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.querySelectorAll(".slideshow img");
    slides.forEach(slide => slide.style.display = "none");
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close');

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function () {
        lightbox.style.display = 'block';
        lightboxImg.src = this.src;
    });
});

closeLightbox.addEventListener('click', function () {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', function (e) {
    if (e.target == this) {
        lightbox.style.display = 'none';
    }
});
