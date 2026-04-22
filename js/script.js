function scrollToImage(index) {
    const wrapper = document.querySelector('.carousel-wrapper');
    const cardWidth = document.querySelector('.card').offsetWidth + 20;
    
    wrapper.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
    });

    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}