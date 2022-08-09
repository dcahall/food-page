window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
    
    // Timer

	const	deadline = "2022-09-01";

	function	getTimeRemaining(endTime) {
		let		days = 0,
				hours = 0,
				minutes = 0,
				seconds = 0;
		const	total = Date.parse(endTime) - new Date();
		
		if (total <= 0) 
			return { total, days, hours, minutes, seconds };
		days = Math.floor(total / (1000 * 3600 * 24));
		hours = Math.floor(total / (1000 * 3600) % 24);
		minutes = Math.floor(total / (1000 * 60) % 60);
		seconds = Math.floor(total / 1000 % 60);

		return { total, days, hours, minutes, seconds };
	}

	function	getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		}
		return num;
	}

	function	setClock(selector, endTime) {
		const	timer = document.querySelector(selector);
				days = timer.querySelector('#days'),
				hours = timer.querySelector('#hours'),
				minutes = timer.querySelector('#minutes'),
				seconds = timer.querySelector('#seconds');
		let		timeInterval = setInterval(updateClock, 1000);

		updateClock(endTime);

		function	updateClock() {
			const	t = getTimeRemaining(endTime);
			
			days.textContent = getZero(t.days);
			hours.textContent = getZero(t.hours);
			minutes.textContent = getZero(t.minutes);
			seconds.textContent = getZero(t.seconds);
			
			if (t.total <= 0) {
				clearInterval(timeInterval);
				return ;
			}
		}
	}

	setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для создание карточек меню

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();

	// FORMS

	const	forms = document.querySelectorAll('form');
	const	message = {
		loading: 'img/form/spinner.svg',
		failure: 'Что-то пошло не так...',
		success: 'Спасибо! Мы скоро с вами свяжемся'
	};


	forms.forEach(item => {
		postData(item);
	})

	function postData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			waitingSpinner = document.createElement('img');
			waitingSpinner.src = message.loading;
			waitingSpinner.style.cssText = `display: block; 
									  margin: 0 auto;`;
			form.insertAdjacentElement('afterend', waitingSpinner);

			const	formData = new FormData(form);
					data = {};

			formData.forEach((value, index) => {
				data[index] = value;
			});

			fetch('server.php', { 
				method: 'POST',
				body: JSON.stringify(data),
				headers: {'Content-type': 'application/json'}
			}).then(data => data.text())
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
			})
			.catch(() => {
				showThanksModal(message.failure);
			})
			.finally(() => {
				form.reset();
				waitingSpinner.remove();
			});
		});
	}

	function showThanksModal(message) {
		const	prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML =  `<div class="modal__content">
									  <div class="modal__close" data-close>&times;</div>
									  <div class="modal__title">${message}</div>
								  </div>`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.remove('hide');
			prevModalDialog.classList.add('show');
			closeModal();
		}, 4000)
	}
	
	fetch('http://localhost:3000/menu')
	.then(response => response.json())
	.then(json => console.log(json));
});