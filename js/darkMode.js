

const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');
const container = document.querySelector('.container');
const icon = document.querySelector('.bi')
const h1 = document.querySelector('h1');

// Retrieve the theme preference from local storage if available
const theme = localStorage.getItem('theme');
if (theme) {
  setTheme(theme);
}

toggle.addEventListener('click', function (){
  this.classList.toggle('bi-moon');
  if(this.classList.toggle('bi-brightness-high-fill')){
    setTheme('light');
  }else{
    setTheme('dark');
  }
});

function setTheme(theme) {
  if (theme === 'light') {
    body.style.background = '#E3E0DE';
    container.style.background = '#e8f1f2d2';
    body.style.color = '#04030F';
    icon.style.color = '#04030F';
    h1.style.color = 'blueviolet';
  } else {
    body.style.background = '#04030F';
    container.style.background = '#212A30';
    body.style.color = '#212A30';
    icon.style.color = '#E3E0DE';
    h1.style.color = '#E3E0DE';
  }
  body.style.transition = '2s';

  // Store the theme preference in local storage
  localStorage.setItem('theme', theme);
}
