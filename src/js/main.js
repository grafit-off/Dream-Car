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


	// Accodions
	const accordionTrigger = document.querySelectorAll(".accordion__trigger"),
		accordionBody = document.querySelectorAll(".accordion__body");

	const accordionsToggle = (triggers, bodyElements) => {
		triggers.forEach((el) => {
			el.addEventListener("click", () => {
				el.disabled = true;
				setTimeout(() => {
					el.disabled = false;
				}, 500);
				const elBody = el.closest(".accordion__item").querySelector(".accordion__body");
				el.classList.toggle('accordion__trigger--active');
				elBody.style.height = `${elBody.scrollHeight}px`;
				if (elBody.style.height === "0px" || window.getComputedStyle(elBody).height === "0px") {
					el.setAttribute("aria-expanded", "true");
					elBody.setAttribute("aria-hidden", "false");
				} else {
					elBody.style.height = "0";
					el.setAttribute("aria-expanded", "false");
					elBody.setAttribute("aria-hidden", "true");
				}
			});
		});
		bodyElements.forEach((el) => {
			el.addEventListener("transitionend", () => {
				if (el.style.height !== "0px") {
					el.style.height = "auto";

				}
			});
		});
	};
	accordionsToggle(accordionTrigger, accordionBody);
	// -- //

	// Image Preview
	/* 
		Идея
		По нажатию на картинку в списке, передавать src в выводимое изображение,
		а src выводимого изображения передавть картинке по которой произошел клик.

		План
		1. Создать переменные выводимого изображения и блока списка картинок/кнопок.
		2. Добавить слушатель на блок и способом делегирования отлавливать картинку
			по которой произошел клик.
		3. Получить в новые переменные src и alt картинки по которой произошел клик
			и src, alt выводимого изображение.
		4. Заменить src, alt выводимого изображения на src,alt картинки по которой произошел клик
			из переменной и заменить src,alt картинки по которой произошел клик
			на src,alt выводимого изображения.
	*/
	const mainImg = document.querySelector('.image-preview__current');
	const imgList = document.querySelector('.image-preview__list');

	imgList.addEventListener('click', (e) => {
		let image = e.target;
		if (image.classList.contains('preview-item__image')) {
			console.log('yes');
			let mainImgSrc = mainImg.getAttribute('src');
			let mainImgAlt = mainImg.getAttribute('alt');

			let imageSrc = image.getAttribute('src');
			let imageAlt = image.getAttribute('alt');

			mainImg.setAttribute('src', `${imageSrc}`);
			mainImg.setAttribute('alt', `${imageAlt}`);

			image.setAttribute('src', `${mainImgSrc}`);
			image.setAttribute('alt', `${mainImgAlt}`);
		}
	})
	// -- //
});

