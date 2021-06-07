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

	// Accordion
	const accordionTriggers = document.querySelectorAll(".accordion__trigger");

	const accordionTriggerDisable = (trigger) => {
		trigger.disabled = true;
		setTimeout(() => {
			trigger.disabled = false;
		}, 500);
	}

	const accordionOpen = (trigger, body) => {
		body.style.height = body.scrollHeight + 'px';
		if (body.style.height === "0px" || window.getComputedStyle(body).height === "0px") {
			trigger.classList.add("accordion__trigger--active");
			trigger.setAttribute("aria-expanded", "true");
			body.setAttribute("aria-hidden", "false");
			body.classList.remove('accordion__body--hidden');
		}
	}

	const accordionClose = (trigger, body) => {
		if (body.style.height !== "0px" && window.getComputedStyle(body).height !== "0px") {
			trigger.classList.remove("accordion__trigger--active");
			trigger.setAttribute("aria-expanded", "false");
			body.setAttribute("aria-hidden", "true");
			body.style.height = body.scrollHeight + 'px';
			setTimeout(() => {
				body.style.height = "0";
			}, 0);
			setTimeout(() => {
				body.classList.add('accordion__body--hidden');
			}, 500);
		}
	}

	const setHeightOnTransitionEnd = (body) => {
		body.addEventListener("transitionend", () => {
			if (body.style.height !== "0px") {
				body.style.height = "auto";
			}
		})
	}

	const accordionToggle = (target) => {
		const trigger = target;
		const body = target.closest('.accordion__item').querySelector('.accordion__body');
		setHeightOnTransitionEnd(body);
		accordionClose(trigger, body);
		accordionOpen(trigger, body);
		accordionTriggerDisable(trigger);
	}

	accordionTriggers.forEach(trigger => {
		trigger.addEventListener('click', (e) => {
			let self = e.currentTarget;
			accordionToggle(self);
		})
	})
	// -- //

	// Open and scroll to builder 
	const openBuilderBtn = [document.querySelector('.hero-buttons__order'), document.querySelector('.hero__btn')];
	const builder = document.querySelector('.accordion__constructor-form');

	const scrollToBuilder = () => {
		V = 0.35;
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
			let path = el.dataset.accpath;
			let accordion = document.querySelector('.accordion').querySelector(`[data-accpath="${path}"]`);
			let trigger = accordion.querySelector('.accordion__trigger');
			let body = accordion.querySelector('.accordion__body');
			accordionTriggerDisable(trigger);
			accordionTriggerDisable(el);
			accordionOpen(trigger, body);
			setTimeout(() => {
				scrollToBuilder();
				document.querySelector('[name="Форма ячейки"]').focus();
			}, 500);

		})
	});
	// -- //

	// Close Accordion
	const accCloseBtns = document.querySelectorAll('.accordion-close');
	accCloseBtns.forEach((el) => {
		el.addEventListener('click', () => {
			const accordion = el.closest('.accordion__item');
			const trigger = accordion.querySelector('.accordion__trigger');
			const body = accordion.querySelector('.accordion__body');
			accordionTriggerDisable(el);
			accordionTriggerDisable(trigger);
			accordionClose(trigger, body);
			trigger.focus();
			console.log(trigger);

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

	const imageToggle = (image) => {
		let mainImgSrc = mainImg.getAttribute('src');
		let mainImgAlt = mainImg.getAttribute('alt');

		let imageSrc = image.getAttribute('src');
		let imageAlt = image.getAttribute('alt');

		mainImg.setAttribute('src', `${imageSrc}`);
		mainImg.setAttribute('alt', `${imageAlt}`);

		image.setAttribute('src', `${mainImgSrc}`);
		image.setAttribute('alt', `${mainImgAlt}`);
	}

	imgList.addEventListener('click', (e) => {
		let image = e.target.querySelector('.preview-item__image');
		imageToggle(image);
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

	// Schild 
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
	schildSpinner.addEventListener('keydown', (e) => {
		if (e.key == 'Enter') {
			generateSchildItem();
		}
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

	// Input Mask
	const inputTel = document.querySelector('input[type="tel"]');
	const inMask = new Inputmask('+7 (999) 999-99-99');
	inMask.mask(inputTel);
	// -- //

	// Validate
	const validate = (selector, rules) => {
		new window.JustValidate(selector, {
			rules: rules,
			messages: {
				name: {
					required: 'Это поле обязательно!'
				},
				auto: {
					required: 'Это поле обязательно!'
				},
				tel: {
					required: 'Это поле обязательно!'
				}
			},
			submitHandler: (form, value, ajax) => {
				console.log(form);
			}
		})
	};

	/* validate('.form', {
		name: { required: true }, auto: { required: true }, tel: { required: true }
	}) */
	// -- //

	// Form Send
	const form = document.querySelector('.form');

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const self = e.currentTarget;
		const formData = new FormData(self);


		const name = document.querySelector('input[name="Имя"]').value;
		const auto = document.querySelector('input[name="Модель автомобиля"]').value;
		const tel = inputTel.value;
		const heel = heelInp.value;
		const frontRow = frontRowInp.value;
		const backRow = backRowInp.value;
		const trunk = trunkInp.value;
		const schild = schildSpinner.value;

		formData.append('Имя', JSON.stringify(name));
		formData.append('Марка авто', auto);
		formData.append('Номер телефона', tel);
		formData.append('Металлический подпятник', heel);
		formData.append('Передний ряд', frontRow);
		formData.append('Задний ряд', backRow);
		formData.append('Багажник ', trunk);
		formData.append('Фирменные шильды .шт', schild);

		let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
			method: 'POST',
			body: formData
		})

		let result = await response.json();
		console.log(result);
	})
});

/* const xhr = new XMLHttpRequest();
		xhr.addEventListener('readystatechange', () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					console.log('Отправлено');
				}
			}
		});
		xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
		xhr.send(formData);
		xhr.onload = function () {
			alert(`Загружено: ${xhr.status} ${xhr.response}`);
		}; */