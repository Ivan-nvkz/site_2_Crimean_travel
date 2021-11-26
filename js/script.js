'use strict';
document.addEventListener('DOMContentLoaded', () => {

   // Время
   let clock = document.querySelector('.clock');

   function time() {
      let date = new Date();
      let hours = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();

      if (hours < 10) {
         hours = '0' + hours;
      }
      if (min < 10) {
         min = '0' + min;
      }
      if (sec < 10) {
         sec = '0' + sec;
      }
      clock.innerHTML = ` ${hours}:${min}:${sec}`;
   }
   setInterval(time, 1000);

   //  Разворот треугольника и выпадающее меню при клике
   const triangle = document.querySelector('.triangle-down');
   const modalExcursions = document.querySelector('.modal-list-excursions');

   triangle.addEventListener('click', function () {

      if (triangle.classList.contains('triangle-down') && modalExcursions.classList.contains('modal-list-excursions')) {
         triangle.classList.remove('triangle-down');
         triangle.classList.add('triangle-up');
         modalExcursions.classList.remove('modal-list-excursions');
         modalExcursions.classList.add('modal-list-excursions--active');
      } else if (triangle.classList.contains('triangle-up') && modalExcursions.classList.contains('modal-list-excursions--active')) {
         triangle.classList.remove('triangle-up');
         triangle.classList.add('triangle-down');
         modalExcursions.classList.remove('modal-list-excursions--active');
         modalExcursions.classList.add('modal-list-excursions');
      }
   });

   // Скрыть/показать меню на мобильном при клике на бургер
   const menuBtn = document.querySelector('.menu__btn');
   const menuList = document.querySelector('.menu__list');
   const menuClosed = document.querySelector('.menu-closed');

   menuBtn.addEventListener('click', function (e) {
      e.preventDefault();
      menuList.classList.toggle('menu__list--active');
   });

   //Скрыть меню бургер при клике на X 
   menuClosed.addEventListener('click', function (e) {
      e.preventDefault();
      menuList.classList.remove('menu__list--active');
   });
   // Скрыть/показать футер-меню на мобильном при клике на бургер
   const btnFooterMenu = document.querySelector('.footer__menu-btn');
   const footerMenuList = document.querySelector('.footer-top');

   btnFooterMenu.addEventListener('click', function () {
      footerMenuList.classList.toggle('footer-top--active');
   });

   // Плавный скролл + кнопка вверх
   const anchors = document.querySelectorAll('.menu__link');

   if (window.location.hash != '') {
      scrollToId(window.location.hash);
   }

   for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {

         if (e.target.classList.contains('menu__link')) {
            e.preventDefault();

            let link = e.target;
            scrollToId(link.hash);

            let ancorActive = document.querySelector('.menu__link--active');
            ancorActive.classList.remove('menu__link--active');
            link.classList.add('menu__link--active');
         }
      });
   }

   function elemOffsetTop(node) {
      let coords = node.getBoundingClientRect();
      return coords.top + window.pageYOffset;

   }

   function scrollToId(id) {
      let target = document.querySelector(id);

      if (target !== null) {
         let position = elemOffsetTop(target) - 130;

         window.scrollTo({
            top: position,
            behavior: "smooth"
         });
      }
   }

   let btnUp = document.querySelector('.btn-up');
   btnUp.addEventListener('click', function (e) {
      window.scrollTo({
         top: 0,
         behavior: "smooth"
      });
   });

   let scrollWind = window;
   scrollWind.addEventListener('scroll', function () {
      let pos = window.pageYOffset;

      if (pos > window.innerHeight) {
         btnUp.classList.add('btn-up-open');
      } else {
         btnUp.classList.remove('btn-up-open');
      }
   });


   // Модальное окно
   const userNameInput = document.querySelector('.reserve__input');
   const formBtn = document.querySelector('.reserve__btn');
   const modal = document.querySelector('.modal');
   const modalCloseBtn = document.querySelector('.modal__close-button');

   formBtn.addEventListener('click', function () {

      if (userNameInput.value !== true) {
         modal.classList.add('modal__active');
      }
   });

   modalCloseBtn.addEventListener('click', function () {
      modal.classList.remove('modal__active');
   });


   // Дата
   let spanDate = document.querySelector('.date');
   let date = new Date();

   let options = {
      // era: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      timezone: 'UTC',
   };

   spanDate.innerHTML = (date.toLocaleString("ru", options));


   // Погода
   // Получаем прогноз в массив data
   fetch('http://api.openweathermap.org/data/2.5/weather?id=694423&lang=ru&appid=43a0a67a2a21b316413e3546d6a6b1fd')

      .then(function (resp) { return resp.json() })
      .then(function (data) {
         // console.log(data);
         //добавляем название города
         document.querySelector('.weather__city').textContent = data.name;
         //data.main.temp содержит значение в Кельвинах, отнимаем от  273, чтобы получить значение в градусах Цельсия
         document.querySelector('.weather__forecast').innerHTML = Math.round(data.main.temp - 273) + '&deg;' + 'C';
         document.querySelector('.weather__feels-like').innerHTML = Math.round(data.main.feels_like - 273) + '&deg;' + 'C';
         document.querySelector('.weather__humidity').innerHTML = Math.round(data.main.humidity) + ' ' + '%';
         document.querySelector('.wind-speed').innerHTML = Math.round(data.wind.speed) + ' ' + 'м/с';
         document.querySelector('.wind-gust').innerHTML = Math.round(data.wind.gust) + ' ' + 'м/с';
         //Добавляем описание погоды
         document.querySelector('.weather__desc').textContent = data.weather[0]['description'];
         //Добавляем иконку погоды
         document.querySelector('.weather__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
      })
      .catch(function () {
         //Обрабатываем ошибки
      });


   // Отмена клика мыши по не рабочим direction__item
   const directionItemAll = document.querySelectorAll('.direction__item');

   directionItemAll.forEach((item) => {
      if (item.innerText !== "Турбазы в Крыму" && item.innerText !== "Экскурсии и туры") {
         item.addEventListener('click', function (e) {
            e.preventDefault();
         });
      }
   });



   //Отмена клика мыши по не рабочим popular-offers__link 
   const popularOffersLink = document.querySelectorAll('.popular-offers__link');

   popularOffersLink.forEach((item, i) => {
      item.addEventListener('click', function (e) {
         e.preventDefault();

      });
   });


   // Валидация формы
   //  Поле "Имя"
   const MIN_NAME_LENGTH = 3;
   const MAX_NAME_LENGTH = 25;

   //  Вариант с событием 'invalid'
   // userNameInput.addEventListener('invalid', () => {
   //    if (userNameInput.validity.tooShort) {
   //       userNameInput.setCustomValidity('Имя должно состоять минимум из трех символов');
   //    } else if (userNameInput.validity.tooLong) {
   //       userNameInput.setCustomValidity('Имя не должно состоять более чем из 25 символов');
   //    } else if (userNameInput.validity.valueMissing) {
   //       userNameInput.setCustomValidity('* Обязательное поле для заполнения');
   //    } else {
   //       userNameInput.setCustomValidity('');
   //    }
   //    console.log(userNameInput.validity);
   // });


   //  Вариант с событием 'input'
   userNameInput.addEventListener('input', () => {
      const valueLength = userNameInput.value.length;

      if (valueLength < MIN_NAME_LENGTH) {
         userNameInput.setCustomValidity('Ещё' + ' ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');

      } else if (valueLength > MAX_NAME_LENGTH) {
         userNameInput.setCustomValidity('Удалите лишнее' + (valueLength - MAX_NAME_LENGTH) + 'симв.');

      } else {
         userNameInput.setCustomValidity('');
      }

      userNameInput.reportValidity();
   });







































































































});







