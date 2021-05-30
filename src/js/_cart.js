const productsBtn = document.querySelectorAll('.product__btn');
const cartProductsList = document.querySelector('.cart__list');
const cart = document.querySelector('.cart__wrapper');
const cartQuantity = cart.querySelector('.cart__quantity-numb');
const cartQuantityWord = cart.querySelector('.cart__word');
const fullPrice = document.querySelector('.sum');
let price = 0;


const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};

const printQuantity = () => {
	let productsListLength = cartProductsList.children.length; // удалил симпл бар контент блок, добавил просто список
	cartQuantity.textContent = productsListLength;
	if (productsListLength == 0) {
		cartQuantityWord.textContent = ` товара`;
		cartQuantity.textContent = 'нет';
	} else if (productsListLength == 1) {
		cartQuantityWord.textContent = ` товар`;
	} else if (productsListLength < 5 && productsListLength > 1) {
		cartQuantityWord.textContent = ` товара`;
	} else if (productsListLength >= 5) {
		cartQuantityWord.textContent = ` товаров`;
	}

};
const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)} ₴`;
};

const generateCartProduct = (img, title, price, id) => {
	return `
		<li class="cart__item">
			<article class="c-item" data-id="${id}">
				<img src="${img}" alt="${title}" class="c-item__image">
				<div href="item.html" class="c-item__link">
					<h4 class="c-item__title">${title}</h4>
					<span class="c-item__price">${normalPrice(price)}</span>
				</div>
				<button class="c-item__delete" aria-label="Удалить товар">
				×
				</button>
			</article>
		</li>
	`;
};

const deleteProducts = (productParent) => {
	let id = productParent.querySelector('.c-item').dataset.id;
	if (document.querySelector(`.product__item[data-id="${id}"]`)) {
		console.log('Товар удален с localStorage')
		document.querySelector(`.product__item[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
	}
	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.c-item__price').textContent));
	minusFullPrice(currentPrice);
	printFullPrice();
	productParent.remove();
	printQuantity();
	updateStorage()
};

productsBtn.forEach(el => {
	// el.closest('.product__item').setAttribute('data-id', randomId());
	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.product__item');
		let id = parent.dataset.id;
		if (cartProductsList.querySelectorAll(`.c-item[data-id="${id}"]`).length == 0) {
			let img = parent.querySelector('.product__image--first').getAttribute('src');
			let title = parent.querySelector('.product__name').textContent;
			let priceString = priceWithoutSpaces(parent.querySelector('.product__price').textContent);
			let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product__price').textContent));
			plusFullPrice(priceNumber);
			printFullPrice();
			cartProductsList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));
			printQuantity();
			updateStorage()
			self.disabled = true;
		} else {
			console.log('Alredy exist')
			// Получить снэк-бар DIV
			let cartSnackbar = document.getElementById("snackbar-cart");
			// Добавить "show" класс для DIV
			cartSnackbar.className = "show";
			// После 3 секунд, извлеките класс show из DIV
			setTimeout(function () { cartSnackbar.className = cartSnackbar.className.replace("show", ""); }, 3000);
		}
	});
});

cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('c-item__delete')) {
		deleteProducts(e.target.closest('.cart__item'));
	}
});

// Сохранение в localStorage
const countSum = () => {
	document.querySelectorAll('.c-item').forEach((el) => {
		price += parseInt(priceWithoutSpaces(el.querySelector('.c-item__price').textContent));
	})
}
const initialState = () => {
	if (localStorage.getItem('products') !== null) {
		cartProductsList.innerHTML = localStorage.getItem('products');
		printQuantity()
		countSum();
		printFullPrice();
		document.querySelectorAll('.c-item').forEach((el) => {
			let id = el.dataset.id;
			if (document.querySelector(`.product__item[data-id="${id}"]`)) {
				console.log('Товары загрузились с localStarage. Кнопка добавления была отключена, так как товар уже в корзине!')
				document.querySelector(`.product__item[data-id="${id}"]`).querySelector('.product__btn').disabled = true;
			}
		})
	}
}
initialState();

const updateStorage = () => {
	let html = cartProductsList.innerHTML;
	html = html.trim();
	if (html.length) {
		localStorage.setItem('products', html);
	} else {
		localStorage.removeItem('products');
	}
}


// -- //