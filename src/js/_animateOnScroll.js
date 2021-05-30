// Animate In Scroll
// class="animate-item" data-animation='from-left' data-animation-once
const animItems = document.querySelectorAll(".animate-item");

const elementInViewport = (element, offsetTop, offsetBottom) => {
	let bounds = element.getBoundingClientRect();
	if ((bounds.top + bounds.height - bounds.height * offsetBottom > 0) && (window.innerHeight - bounds.top - bounds.height * offsetTop > 0)) {
		element.classList.add("animated");
	} else if (!element.hasAttribute("data-animation-once")) {
		element.classList.remove("animated");
	}
};

if (animItems.length != 0) {
	animItems.forEach(el => {
		elementInViewport(el, .5, .5);
	})
	document.addEventListener('scroll', () => {
		animItems.forEach(el => {
			elementInViewport(el, .5, .5);
		});
	});
};
// -- //

/*
// OLD
const scrollAnimate = () => {
	// let windowCenter = (window.innerHeight / 2) + window.scrollY;
	let windowBottom = window.innerHeight + window.scrollY - 300;
	animItems.forEach((el) => {
		let scrollOffset = el.offsetTop;
		if (windowBottom >= scrollOffset) {
			el.classList.add('animated')
		} else {
			let animationRepeat = el.hasAttribute('data-animation-once');
			if (!animationRepeat) {
				el.classList.remove('animated')
			}
		}
	});
}

if (animItems.length != 0) {
	console.log('@ANIMATEONSCROLL: ON')
	scrollAnimate()
	window.addEventListener('scroll', () => {
		scrollAnimate()

	})
} else {
	console.log('@ANIMATEONSCROLL: "На странице нету елементов анимации, НО функция scrollAnimate включена! Возможно вам стоит её отключить?"')
}
*/