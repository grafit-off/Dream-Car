document.addEventListener("DOMContentLoaded", () => {
	// Includes
	// @include('_animateOnScroll.js');
	// -- //

	// Header Theme Switcher
	const themeSwitcher = document.querySelector(".theme-switcher");
	const initialState = (themeName) => {
		localStorage.setItem('site-theme', themeName);
		document.documentElement.className = themeName;
	}

	if (localStorage.getItem('site-theme') === undefined || localStorage.getItem('site-theme') === null) {
		initialState('light-theme');
	} else {
		initialState(localStorage.getItem('site-theme'));
		if (localStorage.getItem('site-theme') === 'dark-theme') {
			themeSwitcher.textContent = 'Светлая тема';
		} else {
			themeSwitcher.textContent = 'Тёмная тема';
		}
	}

	const themeToggle = () => {
		if (localStorage.getItem('site-theme') === 'dark-theme') {
			initialState('light-theme');
			themeSwitcher.textContent = 'Тёмная тема';
		} else {
			initialState('dark-theme');
			themeSwitcher.textContent = 'Светлая тема';
		}
	}


	themeSwitcher.addEventListener('click', themeToggle);

	// Hero Swiper
	const swiper = new Swiper(".swiper", {
		containerModifierClass: "swiper",
		wrapperClass: "swiper__wrapper",
		slideClass: "swiper__slide",
		loop: true,
		breakpoints: {
			320: {
				slidesPerView: 2.05,
				spaceBetween: 10,
				pagination: false
			},
			480: {
				slidesPerView: 3,
				spaceBetween: 15,
				navigation: false,
				pagination: {
					el: ".hero-buttons__pagination",
					clickable: true
				}
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 15,
				pagination: {
					el: ".hero-buttons__pagination",
					clickable: true
				},
				navigation: {
					nextEl: ".hero-buttons__swiper--next",
					prevEl: ".hero-buttons__swiper--prev"
				}
			}
		}
	});
})

