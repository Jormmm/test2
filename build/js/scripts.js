// Custom Scripts
function burgerMenu() {
	const burger = document.querySelector('.burger')
	const menu = document.querySelector('.menu')
	const body = document.querySelector('body')
	const menuLinks = document.querySelectorAll('.menu__item-link')

	burger.addEventListener('click', () => {
		if (!menu.classList.contains('active')) {
			menu.classList.add('active')
			burger.classList.add('active')
			body.classList.add('locked')
		} else {
			menu.classList.remove('active')
			burger.classList.remove('active')
			body.classList.remove('locked')
		}
	})

	// Закрытие меню при клике на пункт
	menuLinks.forEach(link => {
		link.addEventListener('click', () => {
			menu.classList.remove('active')
			burger.classList.remove('active')
			body.classList.remove('locked')
		})
	})

	// Брейкпоинт навбара
	window.addEventListener('resize', () => {
			menu.classList.remove('active')
			burger.classList.remove('active')
			body.classList.remove('locked')
	})
}

burgerMenu()

//tabs

function tabs(
	headerSelector,
	tabSelector,
	contentSelector,
	activeClass,
	display = 'flex'
) {
	const header = document.querySelector(headerSelector),
		tab = document.querySelectorAll(tabSelector),
		content = document.querySelectorAll(contentSelector)
	function hideTabContent() {
		content.forEach(item => {
			item.style.display = 'none'
		})
		tab.forEach(item => {
			item.classList.remove(activeClass)
		})
	}
	function showTabContent(i = 0) {
		content[i].style.display = display
		tab[i].classList.add(activeClass)
	}
	hideTabContent()
	showTabContent()
	header.addEventListener('click', e => {
		const target = e.target
		if (
			target.classList.contains(tabSelector.replace(/\./, '')) ||
			target.parentNode.classList.contains(tabSelector.replace(/\./, ''))
		) {
			tab.forEach((item, i) => {
				if (target == item || target.parentNode == item) {
					hideTabContent()
					showTabContent(i)
				}
			})
		}
	})
}

// ПЕРВЫЙ аргумент - класс всего нашего хедера табов.
// ВТОРОЙ аргумент - класс конкретного элемента, при клике на который будет переключатся таб.
// ТРЕТИЙ аргумент - класс того блока, который будет переключаться.
// ЧЕТВЕРТЫЙ аргумент - класс активности, который будет добавлятся для таба, который сейчас активен.
tabs('.tabs__header', '.tabs__picture', '.tabs__content-item', 'activate')

const phoneInput = document.querySelector('.form-number')
// const btn = document.querySelector('.form__button');

const mask = new IMask(phoneInput, {
    mask: "+{38}(000)0000000",
});




// в эту константу помещаем URL развёрнутого веб-приложения Google Apps Script
// ВНИМАНИЕ! Это должен быть адрес ВАШЕГО РАЗВЕРНУТОГО ПРИЛОЖЕНИЯ
// ТЕКУЩИЙ URL_APP приведён для примера
const URL_APP =
	'https://script.google.com/macros/s/AKfycbzzzfbqPye_5GVmiSmNM3dh1w1xvT4CyCoRRSITXp2af40Nx90fzNWUx47hdZ5zkE9_zw/exec'

// находим форму в документе
const form = document.querySelector('.form');

// указываем адрес отправки формы (нужно только в начале примера)
form.action = URL_APP

// вспомогательная функция проверки заполненности формы
function isFilled(details) {
	const { name, email, phone} = details
	if (!name) return false
	if (!email) return false
	if (!phone) return false
	return true
}

// навешиваем обработчик на отправку формы
form.addEventListener('submit', async ev => {
	// отменяем действие по умолчанию
	ev.preventDefault()

	// получаем ссылки на элементы формы
	const name = document.querySelector('[name=name]')
	const email = document.querySelector('[name=email]')
	const phone = document.querySelector('[name=phone]')

	// собираем данные из элементов формы
	let details = {
		name: name.value.trim(),
		email: email.value.trim(),
		phone: phone.value.trim()
	}

	// если поля не заполнены - прекращаем обработку
	if (!isFilled(details)) return

	// подготавливаем данные для отправки
	let formBody = []
	for (let property in details) {
		// кодируем названия и значения параметров
		let encodedKey = encodeURIComponent(property)
		let encodedValue = encodeURIComponent(details[property])
		formBody.push(encodedKey + '=' + encodedValue)
	}
	// склеиваем параметры в одну строку
	formBody = formBody.join('&')

	// выполняем отправку данных в Google Apps
	const result = await fetch(URL_APP, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		},
		cors: "no-cors",
		// mode: 'cors',
		body: formBody,
	})
		.then(res => res.json())
		.catch(err => alert('Ошибка!'))
	.then((res) => console.log(res));

	if (result.type === 'success') {
		name.value = ''
		email.value = ''
		phone.value = ''
		alert('Дякуємо!')
	}
	if (result.type === 'error') {
		alert(`Ошибка( ${result.errors}`)
	}
})



