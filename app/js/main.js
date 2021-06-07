document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".animate-item"),o=(e,t,o)=>{let n=e.getBoundingClientRect();n.top+n.height-n.height*o>0&&window.innerHeight-n.top-n.height*t>0?e.classList.add("animated"):e.hasAttribute("data-animation-once")||e.classList.remove("animated")};0!=e.length&&(e.forEach(e=>{o(e,.5,.5)}),document.addEventListener("scroll",()=>{e.forEach(e=>{o(e,.5,.5)})}));const n=null!=navigator.userAgent.match(/iPhone/i),r=null!=navigator.userAgent.match(/iPad/i),c=null!=navigator.userAgent.match(/iPod/i);let l=()=>{let e=window.scrollY;document.querySelector("html").style.scrollBehavior="auto",document.body.classList.add("ios-lock"),document.body.dataset.position=e,document.body.style.top=-e+"px"},i=()=>{let e=parseInt(document.body.dataset.position,10);document.body.style.top="auto",document.body.classList.remove("ios-lock"),window.scroll({top:e,left:0}),document.querySelector("html").removeAttribute("style"),document.body.removeAttribute("data-position")};const a=document.querySelector("body"),s=document.querySelectorAll(".modal-btn"),d=document.querySelectorAll(".fixed-padding"),u=document.querySelectorAll(".close-modal");let m,h,p,g=!0,y=!1;if(0===d.length&&console.log('@MODALS: "Класс "fixed-padding" нигде не был указан!"'),s.length>0)for(let e=0;e<s.length;e++){const t=s[e];t.addEventListener("click",(function(e){const o=t.dataset.path,n=document.getElementById(o);null!=n?(f(n),setTimeout(()=>{u.forEach(e=>{e.focus()})},100),e.preventDefault()):console.log("Модальное окно не существует! "+n)}))}if(u.length>0)for(let e=0;e<u.length;e++){const t=u[e];m=t,t.addEventListener("click",(function(e){_(t.closest(".modal")),e.preventDefault()}))}function f(e){if(e&&g){p=document.activeElement;const t=document.querySelector(".modal.open");t?_(t,!1):function(){const e=window.innerWidth-a.offsetWidth+"px";if(d.length>0)for(let t=0;t<d.length;t++){d[t].style.paddingRight=e}a.style.paddingRight=e,a.classList.contains("lock")?h=!1:(h=!0,n||r||c?l():a.classList.add("lock"));g=!1,setTimeout((function(){g=!0}),800)}(),e.classList.add("open"),e.addEventListener("mousedown",(function(e){!1===y?(e.target.closest(".modal__content")||_(e.target.closest(".modal")),y=!0):setTimeout(()=>{y=!1},800)}))}}function _(e,t=!0){g&&(e.classList.remove("open"),t&&setTimeout((function(){if(d.length>0)for(let e=0;e<d.length;e++)d[e].style.paddingRight="0px";a.style.paddingRight="0px",1==h&&(n||r||c?i():a.classList.remove("lock"))}),800)),setTimeout((function(){p.focus()}),800)}document.addEventListener("keydown",(function(e){if(document.querySelector(".modal.open")&&27===e.which){_(document.querySelector(".modal.open"))}})),Element.prototype.closest||(Element.prototype.closest=function(e){for(var t=this;t;){if(t.matches(e))return t;t=t.parentElement}return null}),Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector);const v=document.querySelector(".theme-switcher"),S=e=>{localStorage.setItem("site-theme",e),document.documentElement.className=e};void 0===localStorage.getItem("site-theme")||null===localStorage.getItem("site-theme")?S("light-theme"):(S(localStorage.getItem("site-theme")),"dark-theme"===localStorage.getItem("site-theme")?v.textContent="Светлая тема":v.textContent="Тёмная тема");v.addEventListener("click",()=>{"dark-theme"===localStorage.getItem("site-theme")?(S("light-theme"),v.textContent="Тёмная тема"):(S("dark-theme"),v.textContent="Светлая тема")});new Swiper(".swiper",{containerModifierClass:"swiper",wrapperClass:"swiper__wrapper",slideClass:"swiper__slide",loop:!0,breakpoints:{320:{slidesPerView:2.05,spaceBetween:10,pagination:!1},480:{slidesPerView:3,spaceBetween:15,navigation:!1,pagination:{el:".hero-buttons__pagination",clickable:!0}},992:{slidesPerView:3,spaceBetween:15,pagination:{el:".hero-buttons__pagination",clickable:!0},navigation:{nextEl:".hero-buttons__swiper--next",prevEl:".hero-buttons__swiper--prev"}}}});if(n||r||c){let e=document.querySelectorAll('[href^="#"]'),o=.2;for(let n=0;n<e.length;n++)e[n].addEventListener("click",(function(e){e.preventDefault();let n=window.pageYOffset,r=this.href.replace(/[^#]*(.*)/,"$1");t=document.querySelector(r).getBoundingClientRect().top,start=null,requestAnimationFrame((function e(c){null===start&&(start=c);let l=c-start,i=t<0?Math.max(n-l/o,n+t):Math.min(n+l/o,n+t);window.scrollTo(0,i),i!=n+t?requestAnimationFrame(e):location.hash=r}))}),!1)}const q=document.querySelectorAll(".accordion__trigger"),w=e=>{e.disabled=!0,setTimeout(()=>{e.disabled=!1},500)},b=(e,t)=>{t.style.height=t.scrollHeight+"px","0px"!==t.style.height&&"0px"!==window.getComputedStyle(t).height||(e.classList.add("accordion__trigger--active"),e.setAttribute("aria-expanded","true"),t.setAttribute("aria-hidden","false"),t.classList.remove("accordion__body--hidden"))},E=(e,t)=>{"0px"!==t.style.height&&"0px"!==window.getComputedStyle(t).height&&(e.classList.remove("accordion__trigger--active"),e.setAttribute("aria-expanded","false"),t.setAttribute("aria-hidden","true"),t.style.height=t.scrollHeight+"px",setTimeout(()=>{t.style.height="0"},0),setTimeout(()=>{t.classList.add("accordion__body--hidden")},500))};q.forEach(e=>{e.addEventListener("click",e=>{(e=>{const t=e,o=e.closest(".accordion__item").querySelector(".accordion__body");(e=>{e.addEventListener("transitionend",()=>{"0px"!==e.style.height&&(e.style.height="auto")})})(o),E(t,o),b(t,o),w(t)})(e.currentTarget)})});const L=[document.querySelector(".hero-buttons__order"),document.querySelector(".hero__btn")],k=document.querySelector(".accordion__constructor-form");L.forEach(e=>{e.addEventListener("click",()=>{let o=e.dataset.accpath,n=document.querySelector(".accordion").querySelector(`[data-accpath="${o}"]`),r=n.querySelector(".accordion__trigger"),c=n.querySelector(".accordion__body");w(r),w(e),b(r,c),setTimeout(()=>{(()=>{V=.35;let e=window.pageYOffset;t=k.getBoundingClientRect().top,start=null,requestAnimationFrame((function o(n){null===start&&(start=n);let r=n-start,c=t<0?Math.max(e-r/V,e+t):Math.min(e+r/V,e+t);window.scrollTo(0,c),c!=e+t&&requestAnimationFrame(o)}))})(),document.querySelector('[name="Форма ячейки"]').focus()},500)})});document.querySelectorAll(".accordion-close").forEach(e=>{e.addEventListener("click",()=>{const t=e.closest(".accordion__item"),o=t.querySelector(".accordion__trigger"),n=t.querySelector(".accordion__body");w(e),w(o),E(o,n),o.focus(),console.log(o)})});const x=document.querySelector(".image-preview__current"),A=document.querySelector(".image-preview__list");A.addEventListener("click",e=>{(e=>{let t=x.getAttribute("src"),o=x.getAttribute("alt"),n=e.getAttribute("src"),r=e.getAttribute("alt");x.setAttribute("src",""+n),x.setAttribute("alt",""+r),e.setAttribute("src",""+t),e.setAttribute("alt",""+o)})(e.target.querySelector(".preview-item__image"))});const C=document.querySelector(".schild__input"),T=document.querySelector(".schild__plus"),I=document.querySelector(".schild__minus"),M=document.querySelector(".order-info__list"),B=document.querySelector('input[value="Металлический подпятник"]'),N=document.querySelector('input[value="Передний ряд"]'),R=document.querySelector('input[value="Задний ряд"]'),P=document.querySelector('input[value="Багажник"]'),D=document.querySelector(".price-block__price");let F=0,H=0;const O=()=>{D.textContent=F+H},$=()=>{if(0===M.children.length){const e=document.createElement("li");e.className="order-info__item main-text order-clear",e.textContent=" Здесь пусто",M.append(e)}},Y=(e,t,o,n)=>{if(e.checked){F+=n;const e=document.createElement("li");e.className="order-info__item main-text "+t,e.textContent=" "+o,M.append(e),document.querySelector(".order-clear")&&document.querySelector(".order-clear").remove()}else null!==document.querySelector("."+t)&&(F-=n,document.querySelector("."+t).remove(),$());O()},W=()=>{if(H=50*parseInt(C.value,10),0!==parseInt(C.value,10)){if(null===document.querySelector(".order-schild")){const e=document.createElement("li");e.className="order-info__item main-text order-schild",e.innerHTML=` Фирменные шильды ${C.value} шт.`,M.append(e)}else document.querySelector(".order-schild").textContent=` Фирменные шильды ${C.value} шт.`;document.querySelector(".order-clear")&&document.querySelector(".order-clear").remove()}else null!==document.querySelector(".order-schild")&&(document.querySelector(".order-schild").remove(),$());O()};T.addEventListener("click",()=>{(()=>{let e=parseInt(C.value,10);e=isNaN(e)?0:++e,e>100&&(e=0),C.value=e})(),W()}),I.addEventListener("click",()=>{(()=>{let e=parseInt(C.value,10);e=isNaN(e)?0:--e,e<0&&(e=100),C.value=e})(),W()}),C.addEventListener("keydown",e=>{"Enter"==e.key&&W()}),Y(B,"order-heel","Подпятник",500),B.addEventListener("change",()=>{Y(B,"order-heel","Подпятник",500)}),Y(N,"order-front-row","Комплект ковриков для переднего ряда",1700),N.addEventListener("change",()=>{Y(N,"order-front-row","Комплект ковриков для переднего ряда",1700)}),Y(R,"order-back-row","Комплект ковриков для заднего ряда",1600),R.addEventListener("change",()=>{Y(R,"order-back-row","Комплект ковриков для заднего ряда",1600)}),P.addEventListener("change",()=>{Y(P,"order-trunk","Коврик для багажника",1e3)})});
//# sourceMappingURL=main.js.map
