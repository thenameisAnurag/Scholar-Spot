const wrapper=document.querySelector('.wrapper');
const loginLink=document.querySelector('.login-link');
const registerLink=document.querySelector('.register-link');
const btnPopup=document.querySelector('.btnlogin-popup');
const iconClose=document.querySelector('.close-icon');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});


const navLinks = document.querySelectorAll('.navigation .nav-link');

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    removeActiveClass();
    link.classList.add('active');
  });

  link.addEventListener('mouseleave', () => {
    link.classList.remove('active');
  });
});

function removeActiveClass() {
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
}


//  -----------------First Code 
//////////////----------GENERATE BUTTON----------///////////////////////

// JavaScript used to set randomness for particles.
// Could be done via SSR
// Event Listeners for Login/Register Popup
// document.addEventListener('DOMContentLoaded', () => {
//     const wrapper = document.querySelector('.wrapper');
//     const loginLink = document.querySelector('.login-link');
//     const registerLink = document.querySelector('.register-link');
//     const btnPopup = document.querySelector('.btnlogin-popup');
//     const iconClose = document.querySelector('.close-icon');
  
//     registerLink.addEventListener('click', () => {
//       wrapper.classList.add('active');
//     });
  
//     loginLink.addEventListener('click', () => {
//       wrapper.classList.remove('active');
//     });
  
//     btnPopup.addEventListener('click', () => {
//       wrapper.classList.add('active-popup');
//     });
  
//     iconClose.addEventListener('click', () => {
//       wrapper.classList.remove('active-popup');
//     });
//   });
  
//   // Event Listeners for Navigation Links
//   document.addEventListener('DOMContentLoaded', () => {
//     const navLinks = document.querySelectorAll('.navigation .nav-link');
  
//     navLinks.forEach((link) => {
//       link.addEventListener('mouseenter', () => {
//         removeActiveClass();
//         link.classList.add('active');
//       });
  
//       link.addEventListener('mouseleave', () => {
//         link.classList.remove('active');
//       });
//     });
  
//     function removeActiveClass() {
//       navLinks.forEach((link) => {
//         link.classList.remove('active');
//       });
//     }
//   });
  
  // Generate Button
  document.addEventListener('DOMContentLoaded', () => {
    const RANDOM = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const PARTICLES = document.querySelectorAll('.particle');
  
    PARTICLES.forEach((P) => {
      P.style.setProperty('--x', `${RANDOM(20, 80)}`);
      P.style.setProperty('--y', `${RANDOM(20, 80)}`);
      P.style.setProperty('--duration', `${RANDOM(6, 20)}`);
      P.style.setProperty('--delay', `${RANDOM(1, 10)}`);
      P.style.setProperty('--alpha', `${RANDOM(40, 90) / 100}`);
      P.style.setProperty(
        '--origin-x',
        `${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%`
      );
      P.style.setProperty(
        '--origin-y',
        `${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%`
      );
      P.style.setProperty('--size', `${RANDOM(40, 90) / 100}`);
    });
  });
  