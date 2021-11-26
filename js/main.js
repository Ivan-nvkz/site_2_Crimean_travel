$(function () {

   $('.photo-gallery__slider').slick({
      speed: 1500,
      responsive: [
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }
      ],
      prevArrow: '<button type="button" class="slick-prev slick-btn"><img src="images/icons/errow-prev.svg"></button>',
      nextArrow: '<button type="button" class="slick-next slick-btn"><img src="images/icons/errow-next.svg"></button>'
   });

   $('.photo-gallery__inner').magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
         enabled: true,
         navigateByImgClick: true,
         preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
      },
   });

   // Календарь в форме (дата заезда/выезда)
   new AirDatepicker('.reserve__input-bottom-in', {
      buttons: ['today', 'clear'],
      // timepicker: true,
      position: 'top right',
      minDate: new Date(),
      onSelect({ date, formattedDate, datepicker }) {
         datepicker.hide();
      }
   });
   new AirDatepicker('.reserve__input-bottom-out', {
      buttons: ['today', 'clear'],
      // timepicker: true,
      position: 'top right',
      minDate: new Date(),
      onSelect({ date, formattedDate, datepicker }) {
         datepicker.hide();
      }
   });
});