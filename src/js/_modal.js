// MODAL

// vars
const body = document.querySelector('body');
const modalButtons = document.querySelectorAll('.modal-btn');
const lockPadding = document.querySelectorAll('.fixed-padding');
const modalCloseButtons = document.querySelectorAll('.close-modal');
const timeout = 800;
let currentCloseBtn;
let unlock = true;
let isMultipleClick = false;
let bodyWasNotLock;

// Проверки
if (lockPadding.length === 0) {
	console.log('@MODALS: "Класс "fixed-padding" нигде не был указан!"')
}
if (typeof (disableScroll) !== 'function' && typeof (enableScroll) !== 'function') {
	console.log(`Тип данных переменных "disableScroll" и "enableScroll": "${typeof (disableScroll)} и ${typeof (enableScroll)}"! Для IOS НЕ будет выполнятся скрипт scrollLockIOS`);
}
// -- //
if (modalButtons.length > 0) {
	for (let index = 0; index < modalButtons.length; index++) {
		const modalCurrentButton = modalButtons[index];
		modalCurrentButton.addEventListener("click", function (e) {
			const modalName = modalCurrentButton.dataset.path;
			const curentModal = document.getElementById(modalName);
			if (curentModal != null) {
				modalOpen(curentModal);
				setTimeout(() => {
					modalCloseButtons.forEach((el) => {
						el.focus()
					})
				}, 100)
				e.preventDefault();
			} else {
				console.log(`Модальное окно не существует! ${curentModal}`);
			}
		});
	}
}

if (modalCloseButtons.length > 0) {
	for (let index = 0; index < modalCloseButtons.length; index++) {
		const el = modalCloseButtons[index];
		currentCloseBtn = el;
		el.addEventListener('click', function (e) {
			modalClose(el.closest('.modal'));
			e.preventDefault();
		});
	}
}
let previousActiveElement;
function modalOpen(curentModal) {
	if (curentModal && unlock) {
		previousActiveElement = document.activeElement;
		const modalActive = document.querySelector('.modal.open');
		if (modalActive) {
			modalClose(modalActive, false);
		}
		else {
			bodyLock();
		}
		curentModal.classList.add('open');

		curentModal.addEventListener("mousedown", function (e) {
			if (isMultipleClick === false) {
				if (!e.target.closest('.modal__content')) {
					modalClose(e.target.closest('.modal'));
				}
				isMultipleClick = true;
			} else {
				setTimeout(() => {
					isMultipleClick = false;
				}, timeout);
			}
		});
	}
}
function modalClose(modalActive, doUnlock = true) {
	if (unlock) {
		modalActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
	setTimeout(function () {
		previousActiveElement.focus();
	}, timeout);

}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	if (!body.classList.contains('lock')) {
		bodyWasNotLock = true;
		if (isiPhone || isiPad || isiPod) {
			disableScroll();
		} else {
			body.classList.add('lock');
		}
	} else {
		bodyWasNotLock = false;
	}
	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		if (bodyWasNotLock == true) {
			if (isiPhone || isiPad || isiPod) {
				enableScroll();
			} else {
				body.classList.remove('lock');
			}
		}
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (document.querySelector('.modal.open')) {
		if (e.which === 27) {
			const modalActive = document.querySelector('.modal.open');
			modalClose(modalActive);
		}
	}
});
(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();