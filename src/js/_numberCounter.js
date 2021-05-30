// COUNTER
// Тегу указать атрибут "data-count="число"".
// Перед скриптом должен быть подключен animateOnScroll!
// counter(елементы где отображать счёт, элемент animateOnScroll (trigger), длительность, шаг)
// counter(document.querySelectorAll('.big'), document.querySelector('#hero4'));

const counter = (elements, trigger, countDuration = 2000, countStep = 1) => {
	if (trigger == 'auto' || trigger == null || trigger == undefined) {
		console.log(`Animated Item не указан! Проверьте подключен ли "animateOnScroll"! ${animatedItem}`)
	} else {
		function countNumbers(elements) {
			elements.forEach((el) => {
				let n = 0;
				let num = el.getAttribute("data-count");
				let t = (countDuration / (num / countStep));
				let interval = setInterval(() => {
					n = n + countStep;
					if (n >= num) {
						clearInterval(interval);
					}
					el.innerHTML = n;
				}, t);
			});
		}
		window.addEventListener('scroll', function scrolling() {
			if (trigger.classList.contains('animated')) {
				this.removeEventListener('scroll', scrolling);
				countNumbers(elements);
			}
		});
	}
}