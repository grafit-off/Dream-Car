document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".animate-item"),t=(e,t,i)=>{let n=e.getBoundingClientRect();n.top+n.height-n.height*i>0&&window.innerHeight-n.top-n.height*t>0?e.classList.add("animated"):e.hasAttribute("data-animation-once")||e.classList.remove("animated")};0!=e.length&&(e.forEach(e=>{t(e,.5,.5)}),document.addEventListener("scroll",()=>{e.forEach(e=>{t(e,.5,.5)})}));const i=document.querySelector(".theme-switcher"),n=e=>{localStorage.setItem("site-theme",e),document.documentElement.className=e};void 0===localStorage.getItem("site-theme")||null===localStorage.getItem("site-theme")?n("light-theme"):(n(localStorage.getItem("site-theme")),"dark-theme"===localStorage.getItem("site-theme")?i.textContent="Светлая тема":i.textContent="Тёмная тема");i.addEventListener("click",()=>{"dark-theme"===localStorage.getItem("site-theme")?(n("light-theme"),i.textContent="Тёмная тема"):(n("dark-theme"),i.textContent="Светлая тема")});new Swiper(".swiper",{containerModifierClass:"swiper",wrapperClass:"swiper__wrapper",slideClass:"swiper__slide",loop:!0,breakpoints:{320:{slidesPerView:2.05,spaceBetween:10,pagination:!1},480:{slidesPerView:3,spaceBetween:15,navigation:!1,pagination:{el:".hero-buttons__pagination",clickable:!0}},992:{slidesPerView:3,spaceBetween:15,pagination:{el:".hero-buttons__pagination",clickable:!0},navigation:{nextEl:".hero-buttons__swiper--next",prevEl:".hero-buttons__swiper--prev"}}}})});
//# sourceMappingURL=main.js.map
