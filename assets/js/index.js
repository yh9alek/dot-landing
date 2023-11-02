// Swiper JS to work in products section
var swiper = new Swiper(".products-swiper", {
    slidesPerView: 'auto',
    spaceBetween: 10,
    centeredSlides: false,
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
    },
    breakpoints: {
      835: {
        //slidesPerView: 2,
        spaceBetween: 30,
      },
      1106: {
        //slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
      },
    },
  });

  // Swiper JS to work in populars section
var swiper = new Swiper(".populars-swiper", {
  slidesPerView: 'auto',
  spaceBetween: 30,
  centeredSlides: false,
  loop: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next2",
  },
  breakpoints: {
    564: {
      //slidesPerView: 2,
      spaceBetween: 30,
    },
    835: {
      //slidesPerView: 3,
      spaceBetween: 30,
    },
    1106: {
      //slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});