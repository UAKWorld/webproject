// Visitor counter
let visitorCount = localStorage.getItem('visitorCount') || 0;
document.getElementById('visitorCount').textContent = visitorCount;
visitorCount++;
localStorage.setItem('visitorCount', visitorCount);

// Language dropdown
function changeLanguage(lang) {
  // Replace the following with your own logic for language translation
  let aboutText;
  switch (lang) {
    case 'en':
      aboutText = 'Welcome to Solent School!';
      break;
    case 'fr':
      aboutText = 'Bienvenue à l\'école Solent!';
      break;
    case 'es':
      aboutText = '¡Bienvenido a la escuela Solent!';
      break;
    default:
      aboutText = 'Welcome to Solent School!';
  }
  document.getElementById('aboutText').textContent = aboutText;
}