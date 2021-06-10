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
		V = 0.7;
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
			setHeightOnTransitionEnd(body);
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
	schildSpinner.addEventListener('blur', () => {
		if (schildSpinner.value < 101 && schildSpinner.value >= 0) {
			generateSchildItem();
		} else {
			schildSpinner.value = 0;
			generateSchildItem();
		}
	})
	schildSpinner.addEventListener('keydown', () => {
		if (isNaN(parseInt(schildSpinner.value, 10))) {
			schildSpinner.value = 0;
		}
	})
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
	const inputTel = document.querySelectorAll('input[type="tel"]');
	const inMask = new Inputmask('+7 (999) 999-99-99');
	inMask.mask(inputTel);

	const inMaskSchild = new Inputmask('999', { placeholder: '' });
	inMaskSchild.mask(schildSpinner);

	// -- //

	// Validate
	let isValid = false;
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
				},
				email: {
					required: 'Это поле обязательно!',
					email: 'Пожалуйста! Введите действительный эмейл!'
				}
			},
			submitHandler: (form, value, ajax) => {
				isValid = true;
			}
		})
	};

	validate('.form', {
		name: { required: true }, auto: { required: true }, tel: { required: true }
	})
	validate('.call-form', {
		name: { required: true }, tel: { required: true }
	})
	validate('.reviews-form', {
		name: { required: true }, email: { required: true, email: true }
	})


	// -- //


	// Snackbar
	const snackbarBtn = document.querySelector('.snackbar-btn');
	const snackbar = document.querySelector(".snackbar");
	function snackbarShow(text = snackbar.textContent, type, time = 3100, delay = 0) {
		snackbar.textContent = text;
		if (snackbarBtn) {
			snackbarBtn.disabled = true;
		}

		setTimeout(() => {
			snackbar.removeAttribute('hidden')
			if (type == 0) {
				snackbar.classList.add('show-notification');
				setTimeout(() => {
					snackbar.className = snackbar.className.replace("show-notification", "");
					snackbar.setAttribute('hidden', '')
				}, time);
			} else if (type == 1) {
				snackbar.classList.add('show-attention');
				setTimeout(() => {
					snackbar.className = snackbar.className.replace("show-attention", "");
					snackbar.setAttribute('hidden', '')
				}, time);
			}
			if (snackbarBtn) {
				setTimeout(() => {
					snackbarBtn.disabled = false;
				}, time)
			}
		}, delay)
	}
	// -- //

	// Form Send
	const form = document.querySelector('.form');
	const formBtn = document.querySelector('.form__submit');
	const data = {}

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		formBtn.disabled = true;
		setTimeout(() => {
			formBtn.disabled = false;
		}, 1000);

		if (isValid) {
			const name = document.querySelector('input[name="Имя"]').value;
			const auto = document.querySelector('input[name="Модель автомобиля"]').value;
			const tel = inputTel.value;
			const heel = heelInp.checked;
			const frontRow = frontRowInp.checked;
			const backRow = backRowInp.checked;
			const trunk = trunkInp.checked;
			const schild = schildSpinner.value;
			const edging = document.querySelectorAll('input[name="Цвет окантовки"]');
			const canvas = document.querySelectorAll('input[name="Цвет полотна"]');
			const shape = document.querySelectorAll('input[name="Форма ячейки"]');

			data.order = {};
			data.order.name = name;
			data.order.tel = tel;
			data.order.auto = auto;
			data.order.heel = heel;
			data.order.frontRow = frontRow;
			data.order.backRow = backRow;
			data.order.trunk = trunk;
			data.order.schild = schild;

			shape.forEach((el) => {
				if (el.checked) {
					data.order.shape = el.value;
				}
			});
			canvas.forEach((el) => {
				if (el.checked) {
					data.order.canvas = el.value;
				}
			});
			edging.forEach((el) => {
				if (el.checked) {
					data.order.edging = el.value;
				}
			});

			let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'application/json; charset=utf-8'
				}
			})
			console.log('Sending data...');


			if (await response.ok) {
				console.log(`Response status: ${await response.status}`);
				let modal = form.closest('.modal');
				let result = await response.json();
				console.log('Request data...');
				console.log(result);
				modalClose(modal);
				setTimeout(() => {
					snackbarShow(undefined, 0);
				}, 800);
			}
		}
	})


	const callForm = document.querySelector('.call-form');
	const callFormBtn = document.querySelector('.call-form__submit');

	callForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		callFormBtn.disabled = true;
		setTimeout(() => {
			callFormBtn.disabled = false;
		}, 1000);

		if (isValid) {
			console.log('Sending data...');

			data.callback = {};

			const callInputName = callForm.querySelector('input[name="name"]').value;
			const callInputTel = callForm.querySelector('input[name="tel"]').value;

			data.callback.name = callInputName;
			data.callback.tel = callInputTel;
			let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			})
			if (await response.ok) {
				console.log('Request data...');
				console.log(`Status: ${await response.status}`);
				let data = await response.json()
				console.log(data);
				snackbarShow('Спасибо! Мы скоро Вам перезвоним!', '0');
			}
		}
	});

	const reviewForm = document.querySelector('.reviews-form');
	const reviewFormbtn = document.querySelector('.reviews-form__submit');

	reviewForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		reviewFormbtn.disabled = true;
		setTimeout(() => {
			reviewFormbtn.disabled = false;
		}, 1000);

		if (isValid) {
			console.log('Sending data...');

			data.review = {
			}

			const reviewInputName = reviewForm.querySelector('input[name="name"]').value;
			const reviewInputEmail = reviewForm.querySelector('input[name="email"]').value;
			const reviewInputSubject = reviewForm.querySelector('input[name="subject"]').value;
			const reviewInputMessage = reviewForm.querySelector('textarea[name="message"]').value;

			data.review.name = reviewInputName;
			data.review.email = reviewInputEmail;
			data.review.subject = reviewInputSubject;
			data.review.message = reviewInputMessage;

			let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			})
			if (await response.ok) {
				console.log('Request data...');
				console.log(`Status: ${await response.status}`);
				let data = await response.json()
				console.log(data);
				snackbarShow('Спасибо за отзыв!', '0');
			}
		}
	});
});