document.addEventListener("DOMContentLoaded", () => {
	// Includes
	// @include('_animateOnScroll.js');
	// @include('_scrollLockIOS.js');
	// @include('_modal.js');
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
	// -- //

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
	// -- //

	// Smooth Scroll
	if (isiPhone || isiPad || isiPod) {
		let linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
			V = 0.2;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
		for (let i = 0; i < linkNav.length; i++) {
			linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
				e.preventDefault(); //отменяем стандартное поведение
				let w = window.pageYOffset,  // производим прокрутка прокрутка
					hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
				t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
					start = null;
				requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
				function step(time) {
					if (start === null) start = time;
					let progress = time - start,
						r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
					window.scrollTo(0, r);
					if (r != w + t) {
						requestAnimationFrame(step)
					} else {
						location.hash = hash  // URL с хэшем
					}
				}
			}, false);
		}
	}

	// -- //

	// Accodions
	const accordionTrigger = document.querySelectorAll(".accordion__trigger");
	const accordionBody = document.querySelectorAll(".accordion__body");

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
					if (elBody.querySelector('.accordion__constructor-form')) {
						openBuilderBtn.forEach((el) => {
							el.setAttribute("aria-expanded", "false");
						})
					}
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

	// Open and scroll to builder 
	const openBuilderBtn = [document.querySelector('.hero-buttons__order'), document.querySelector('.hero__btn')];
	const builder = document.querySelector('.accordion__constructor-form');

	const openBuilderAccordion = () => {
		const accordion = builder.closest('.accordion');
		const accTrigger = accordion.querySelector('.accordion__trigger');
		const accBody = accordion.querySelector('.accordion__body');
		accTrigger.disabled = true;
		setTimeout(() => {
			accTrigger.disabled = false;
		}, 500);
		accTrigger.classList.add('accordion__trigger--active');
		accBody.style.height = `${accBody.scrollHeight}px`;
		if (accBody.style.height === "0px" || window.getComputedStyle(accBody).height === "0px") {
			accTrigger.setAttribute("aria-expanded", "true");
			accBody.setAttribute("aria-hidden", "false");
		}
	}
	const scrollToBuilder = () => {
		V = 0.2;
		let w = window.pageYOffset;
		t = builder.getBoundingClientRect().top,
			start = null;
		requestAnimationFrame(step);
		function step(time) {
			if (start === null) start = time;
			let progress = time - start,
				r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
			window.scrollTo(0, r);
			if (r != w + t) {
				requestAnimationFrame(step)
			}
		}
	}
	openBuilderBtn.forEach((el) => {
		el.addEventListener('click', () => {
			el.setAttribute("aria-expanded", "true");
			openBuilderAccordion();
			setTimeout(() => {
				scrollToBuilder();
			}, 100);
		})
	});
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
		?Почему бы просто не забрать сам елемент, в чем смысл игры с alt и src?
	*/
	const mainImg = document.querySelector('.image-preview__current');
	const imgList = document.querySelector('.image-preview__list');

	imgList.addEventListener('click', (e) => {
		let image = e.target;
		if (image.classList.contains('preview-item__image')) {
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

	// Number Spinner
	const schildSpinner = document.querySelector('.schild__input');
	const btnPlus = document.querySelector('.schild__plus');
	const btnMinus = document.querySelector('.schild__minus');

	const spinnerIncr = () => {
		let value = parseInt(schildSpinner.value, 10);
		value = !isNaN(value) ? ++value : 0;
		if (value > 100) {
			value = 0;
		}
		schildSpinner.value = value;
	}
	const spinnerDecr = () => {
		let value = parseInt(schildSpinner.value, 10);
		value = !isNaN(value) ? --value : 0;
		if (value < 0) {
			value = 100;
		}
		schildSpinner.value = value;
	}

	// -- //

	// Generate Order List and Price
	const orderList = document.querySelector('.order-info__list');
	const heelInp = document.querySelector('input[value="Металлический подпятник"]');
	const frontRowInp = document.querySelector('input[value="Передний ряд"]');
	const backRowInp = document.querySelector('input[value="Задний ряд"]');
	const trunkInp = document.querySelector('input[value="Багажник"]');
	const orderPrice = document.querySelector('.price-block__price');
	let orderSum = 0;
	let schildSum = 0;

	const generateOrderPrice = () => {
		orderPrice.textContent = orderSum + schildSum;
	}

	const createClearEl = () => {
		if (orderList.children.length === 0) {
			const elem = document.createElement('li');
			elem.className = `order-info__item main-text order-clear`;
			elem.textContent = ` Здесь пусто`;
			orderList.append(elem);
		}
	}

	const generateListItem = (item, className, text, price) => {
		if (item.checked) {
			orderSum += price;

			const elem = document.createElement('li');
			elem.className = `order-info__item main-text ${className}`;
			elem.textContent = ` ${text}`;
			orderList.append(elem);
			if (document.querySelector('.order-clear')) {
				document.querySelector('.order-clear').remove();
			}
		} else if (document.querySelector(`.${className}`) !== null) {
			orderSum -= price;
			document.querySelector(`.${className}`).remove();
			createClearEl();
		}
		generateOrderPrice();
	}

	// Shild 
	const generateSchildItem = () => {
		schildSum = parseInt(schildSpinner.value, 10) * 50;
		if (parseInt(schildSpinner.value, 10) !== 0) {
			if (document.querySelector('.order-schild') === null) {
				const elem = document.createElement('li');
				elem.className = 'order-info__item main-text order-schild';
				elem.innerHTML = ` Фирменные шильды ${schildSpinner.value} шт.`;
				orderList.append(elem);
			} else {
				document.querySelector('.order-schild').textContent = ` Фирменные шильды ${schildSpinner.value} шт.`;
			}
			if (document.querySelector('.order-clear')) {
				document.querySelector('.order-clear').remove();
			}
		} else if (document.querySelector('.order-schild') !== null) {
			document.querySelector('.order-schild').remove();
			createClearEl();
		}

		generateOrderPrice();
	}
	btnPlus.addEventListener('click', () => {
		spinnerIncr();
		generateSchildItem();
	})
	btnMinus.addEventListener('click', () => {
		spinnerDecr();
		generateSchildItem();
	})

	// Heel
	generateListItem(heelInp, 'order-heel', 'Подпятник', 500);
	heelInp.addEventListener('change', () => {
		generateListItem(heelInp, 'order-heel', 'Подпятник', 500);
	})

	// Front Row
	generateListItem(frontRowInp, 'order-front-row', 'Комплект ковриков для переднего ряда', 1700);
	frontRowInp.addEventListener('change', () => {
		generateListItem(frontRowInp, 'order-front-row', 'Комплект ковриков для переднего ряда', 1700);
	})

	// Back Row
	generateListItem(backRowInp, 'order-back-row', 'Комплект ковриков для заднего ряда', 1600);
	backRowInp.addEventListener('change', () => {
		generateListItem(backRowInp, 'order-back-row', 'Комплект ковриков для заднего ряда', 1600);
	})

	// Trunk
	trunkInp.addEventListener('change', () => {
		generateListItem(trunkInp, 'order-trunk', 'Коврик для багажника', 1000);
	})
	// -- //

});

