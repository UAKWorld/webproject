


// Language dropdown
function changeLanguage(lang) {
  // Replace the following with your own logic for language translation
  let aboutText;
  switch (lang) {
    case 'en':
      aboutText = 'Welcome to Greenfield College!';
      break;
    case 'fr':
      aboutText = 'Bienvenue au Collège Greenfield!';
      break;
    case 'es':
      aboutText = '¡Bienvenidos a Greenfield College!';
      break;
    default:
      aboutText = 'Welcome to Greenfield College!';
  }
  document.getElementById('aboutText').textContent = aboutText;
}

$(document).ready(function(){
  $.ajax({
    url:'/getvistorcount',
    type:'GET'
  }).done(function(data){
    if(data.usersCount !== undefined)
    {
      $('#visitorCount').empty().append(data.usersCount);
    }

  });
});