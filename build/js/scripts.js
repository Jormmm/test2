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

