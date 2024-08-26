const cards = document.querySelectorAll('.card');

function flipCard(card) {
  card.classList.add('is-flipped');
}
function observeCard(card, index) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const delay = index * 500; 
      setTimeout(() => {
        flipCard(card);
      }, delay);
    }
  }, {
    rootMargin: '0px',
    threshold: 0.7
  });

  observer.observe(card);
}
cards.forEach((card, index) => {
  observeCard(card, index);
});

