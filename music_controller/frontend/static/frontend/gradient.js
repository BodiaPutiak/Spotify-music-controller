const gradientElement = document.getElementById('gradient');
let position = 0;

function animateGradient() {
  position++;
  gradientElement.style.backgroundPosition = `${position}% 0%`;

  if (position >= 100) {
    position = 0;
  }

  requestAnimationFrame(animateGradient);
}

animateGradient();