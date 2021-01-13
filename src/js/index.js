// NAV
const nav = document.querySelector(".header__nav");
const burguer = document.querySelector(".burguer");
const mobileNav = document.querySelector(".mobile-nav");
const overlay = document.querySelector(".overlay");

burguer.addEventListener("click", (e) => {
  e.preventDefault();
  nav.classList.toggle("open");
  mobileNav.classList.toggle("open");
  overlay.classList.toggle("open");
});

// SCROLL
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("header__nav-link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// ELEMENTOS EN SCROLL
const sections = document.querySelectorAll(".section");

const revealSectionCallBack = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting === true) {
    entry.target.classList.remove("hidden");
    observer.unobserve(entry.target);
  }
};

const revealSectionOptions = {
  root: null,
  threshold: 0.3,
};

const sectionObserver = new IntersectionObserver(
  revealSectionCallBack,
  revealSectionOptions
);

sections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("hidden");
});

// ABOUT
const about = document.querySelector(".about");

const revealSectionCallBack2 = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting === true) {
    document.querySelector(".about__title").classList.add("animation1");
    document.querySelector(".about__details-image").classList.add("animation2");
    document
      .querySelector(".about__details-description")
      .classList.add("animation3");
    observer.unobserve(entry.target);
  }
};

const revealSectionOptions2 = {
  root: null,
  threshold: 0.3,
};

const sectionObserver2 = new IntersectionObserver(
  revealSectionCallBack2,
  revealSectionOptions2
);

sectionObserver2.observe(about);

// PROYECTS
const contact = document.querySelector(".contact");

const revealSectionCallBack3 = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting === true) {
    document.querySelector(".contact__title").classList.add("animation4");
    document.querySelector(".contact__form").classList.add("animation5");
    document.querySelector(".contact__details").classList.add("animation6");

    observer.unobserve(entry.target);
  }
};

const revealSectionOptions3 = {
  root: null,
  threshold: 0.3,
};

const sectionObserver3 = new IntersectionObserver(
  revealSectionCallBack3,
  revealSectionOptions3
);

sectionObserver3.observe(contact);

// SLIDER
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let currentSlide = 0;
const maxSlide = slides.length - 1;

// Funciones
const restartInterval = function () {
  clearInterval(changeSlide);
  changeSlide = setInterval(nextSlide, 8000);
};

const showContent = function (content) {
  document.querySelectorAll(".slide__description").forEach(function (slide) {
    slide.classList.remove("animation7");
  });

  document
    .querySelector(`.slide__description[data-content="${content}"]`)
    .classList.add("animation7");
};

const createDots = function () {
  slides.forEach((slide, index) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document.querySelectorAll(".dots__dot").forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = function (slide) {
  slides.forEach((sli, index) => {
    sli.style.transform = `translateX(${100 * (index - slide)}%)`;
  });
};

const nextSlide = function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activateDot(currentSlide);
  restartInterval();
  showContent(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
  activateDot(currentSlide);
  restartInterval();
  showContent(currentSlide);
};

// Inicializando el slider
const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
  showContent(0);
};

init();

// EVENT LISTENERS
btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
    restartInterval();
  } else if (e.key === "ArrowRight") {
    nextSlide();
    restartInterval();
  }
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
    restartInterval();
    showContent(slide);
  }
});

let changeSlide = setInterval(nextSlide, 8000);

// STICKY NAV
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const observerCallbackStickyNav = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting === false) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const observerOptionsNav = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserverNav = new IntersectionObserver(
  observerCallbackStickyNav,
  observerOptionsNav
);

headerObserverNav.observe(header);
