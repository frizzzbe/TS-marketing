import { questionsMap } from './questionMap.js';

document.addEventListener('DOMContentLoaded', () => {
  const mainHeader = document.querySelector('.main-header'),      // мобильное меню
  burger = document.querySelector('.burger'),
  mobWrapperMenu = document.querySelector('.mob-wrapper-menu'),
  mobLinks = document.querySelectorAll('.mobile-menu-link a'),
  closeCookie = document.querySelector('.cookies .close'),  // сообщение о куках
  cookiesModal = document.querySelector('.cookies'),
  cookiesAccept = document.querySelector('.cookies .cookie-accept'),
  modalOverlay = document.querySelector('.modal-overlay'),  // модальное окно с информацией об услугах
  questionContent = document.querySelector('.question-modal .question-content'),
  closeQuestion = document.querySelector('.question-modal .close'),
  questionOpenModal = document.querySelectorAll('.question-item .question');
      
  // мобильное меню
  burger.addEventListener('click', function(e){
    mainHeader.classList.toggle('checked');
  });
  for (let mobLink of mobLinks){
    mobLink.addEventListener('click', function(e){
      mainHeader.classList.toggle('checked');
    });
  }
  mobWrapperMenu.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-menu')){
      mainHeader.classList.toggle('checked');
    }
  });
      
  // куки 
  checkCookies();

  function checkCookies(){
    if(!!getCookie('cookie')){
      if (getCookie('cookie') == 'false'){
        cookiesModal.style.display = 'block';
      }
    } else {
      document.cookie = "cookie=false;max-age=5000000000;path=/";
      cookiesModal.style.display = 'block';
    }
  }
  
  function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  closeCookie.addEventListener('click', () => {
    cookiesModal.style.display = 'none';
  });
  
  cookiesAccept.addEventListener('click', () => {
    document.cookie = "cookie=true;max-age=5000000000;path=/";
    cookiesModal.style.display = 'none';
  });
  
  // модальное окно с информацией об услугах
  function closeModal() {
    document.querySelector('body').style.overflow = 'visible';
    modalOverlay.style.display = 'none';
  }

  modalOverlay.addEventListener('click', (e) => {
    if (!e.target.closest('.question-modal')){
      closeModal();
    }
  });

  closeQuestion.addEventListener('click', closeModal);

  // динамическое изменение контента в модальном окне question
  // значения в файле questionMap
  for (let questionBtn of questionOpenModal) {
    let keyPhrase = questionBtn.closest('.question-item').textContent.toUpperCase();
  
    questionBtn.addEventListener('click', ()=>{
      if (questionsMap.get(keyPhrase) != undefined){
        document.querySelector('body').style.overflow = 'hidden';
        modalOverlay.style.display = 'block';
  
        questionContent.innerHTML = '';
        questionContent.insertAdjacentHTML('afterbegin', questionsMap.get(keyPhrase));
      } else {
        throw new Error(`Ключа ${keyPhrase} не существует в объекте questionsMap в файле questionMap.js`);
      }
    });
  }

});