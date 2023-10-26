// Swiper JS
var swiper = new Swiper(".products-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: false,
    loop: true,
    /*autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },*/
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
    },
    breakpoints: {
      835: {
        slidesPerView: 2,
        spaceBetween: 30,
        centeredSlides: false,
      },
      1106: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
      },
    },
  });