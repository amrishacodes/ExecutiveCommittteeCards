const cards = Array.from(document.querySelectorAll('.card'));

const imgWidth = 250 + (window.innerWidth * 0.1); 
let calculator = Math.floor((window.innerWidth * 0.9) / imgWidth);

console.log(calculator);

function addFlip(card) {
  card.classList.add('is-flipped');
}

function removeFlip(card) {
  card.classList.remove('is-flipped');
}

function observeCard(card) {
  const observer = new IntersectionObserver((entries) => {
    const delay = 500;
    if (entries[0].isIntersecting) {
      const flippables = [];
      const index = cards.indexOf(card);
      const row = Math.floor(index / calculator);

      for (let i = 0; i < calculator; i++) {
        if (cards[index + i]) {
          flippables.push(cards[index + i]);
        }
      }

      if(row % 2 != 0){
        flippables.reverse();
      }

      flippables.forEach((flippable, i) => {
        setTimeout(() => {
          addFlip(flippable);
        }, delay * i);
      }
      );
    } else {
      const flippables = [];
      const index = cards.indexOf(card);
      const row = Math.floor(index / calculator);

      for (let i = 0; i < calculator; i++) {
        if (cards[index + i]) {
          flippables.push(cards[index + i]);
        }
      }

      if(row % 2 != 0){
        flippables.reverse();
      }

      flippables.forEach((flippable, i) => {
        setTimeout(() => {
          removeFlip(flippable);
        }, delay * i);
      }
      );
    }
  }, {
    rootMargin: '0px',
    threshold: 0.6
  });

  observer.observe(card);
}

for(let card of cards){
  // we are checking if we need to add observer or not
  // we check this by seeing how many card there are in the row
  // that was calculated via the calculator variable already.
  
  // why we need this?
  // even i didn't give much thought to it. hehe
  // but it works.
  // so, i am happy.
  // if you have any idea why we need this, please let me know.
  
  // so we only add an observer in the very first card of each row
  // basically lets say if one line has 3 cards then
  // observer will be on 0, 3,6, etc. basically every number that is divisible by 3.

  // to see if we need to go from right or left? we see if the number is divisble by 2 or not.
  // if the number is divisble by 2 then we know its the alternative one and it needs to be left to right
  // else it needs to be right to left.

  if(cards.indexOf(card) % calculator == 0){
    observeCard(card);
  }
}

// cards.forEach((card, index) => {
//   observeCard(card, index);
// });

