document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".animate-item"),t=(e,t,i)=>{let r=e.getBoundingClientRect();r.top+r.height-r.height*i>0&&window.innerHeight-r.top-r.height*t>0?e.classList.add("animated"):e.hasAttribute("data-animation-once")||e.classList.remove("animated")};0!=e.length&&(e.forEach(e=>{t(e,.5,.5)}),document.addEventListener("scroll",()=>{e.forEach(e=>{t(e,.5,.5)})}));const i=document.querySelector(".theme-switcher"),r=e=>{localStorage.setItem("site-theme",e),document.documentElement.className=e};void 0===localStorage.getItem("site-theme")||null===localStorage.getItem("site-theme")?r("light-theme"):(r(localStorage.getItem("site-theme")),"dark-theme"===localStorage.getItem("site-theme")?i.textContent="Светлая тема":i.textContent="Тёмная тема");i.addEventListener("click",()=>{"dark-theme"===localStorage.getItem("site-theme")?(r("light-theme"),i.textContent="Тёмная тема"):(r("dark-theme"),i.textContent="Светлая тема")});new Swiper(".swiper",{containerModifierClass:"swiper",wrapperClass:"swiper__wrapper",slideClass:"swiper__slide",loop:!0,breakpoints:{320:{slidesPerView:2.05,spaceBetween:10,pagination:!1},480:{slidesPerView:3,spaceBetween:15,navigation:!1,pagination:{el:".hero-buttons__pagination",clickable:!0}},992:{slidesPerView:3,spaceBetween:15,pagination:{el:".hero-buttons__pagination",clickable:!0},navigation:{nextEl:".hero-buttons__swiper--next",prevEl:".hero-buttons__swiper--prev"}}}});const a=document.querySelectorAll(".accordion__trigger"),n=document.querySelectorAll(".accordion__body");var o;o=n,a.forEach(e=>{e.addEventListener("click",()=>{e.disabled=!0,setTimeout(()=>{e.disabled=!1},500);const t=e.closest(".accordion__item").querySelector(".accordion__body");e.classList.toggle("accordion__trigger--active"),t.style.height=t.scrollHeight+"px","0px"===t.style.height||"0px"===window.getComputedStyle(t).height?(e.setAttribute("aria-expanded","true"),t.setAttribute("aria-hidden","false")):(t.style.height="0",e.setAttribute("aria-expanded","false"),t.setAttribute("aria-hidden","true"))})}),o.forEach(e=>{e.addEventListener("transitionend",()=>{"0px"!==e.style.height&&(e.style.height="auto")})});const s=document.querySelector(".image-preview__current");document.querySelector(".image-preview__list").addEventListener("click",e=>{let t=e.target,i=s.getAttribute("src"),r=s.getAttribute("alt"),a=t.getAttribute("src"),n=t.getAttribute("alt");s.setAttribute("src",""+a),s.setAttribute("alt",""+n),t.setAttribute("src",""+i),t.setAttribute("alt",""+r)})});
//# sourceMappingURL=main.js.map
