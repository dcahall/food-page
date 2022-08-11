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
            this.transfer = 60;
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
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

	const	getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status ${res.status}`);
		}
		return await res.json();
	}

	getResource('http://localhost:3000/menu')
	.then(data => {
		data.forEach(({img, altimg, title, descr, price}) => {
			new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
		});
	});

	// FORMS

	const	forms = document.querySelectorAll('form');
	const	message = {
		loading: 'img/form/spinner.svg',
		failure: 'Что-то пошло не так...',
		success: 'Спасибо! Мы скоро с вами свяжемся'
	};


	forms.forEach(item => {
		bindPostData(item);
	})

	const	postData = async (url, data) => {
		let res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: data
		});

		return await res.json();
	}

	function bindPostData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			waitingSpinner = document.createElement('img');
			waitingSpinner.src = message.loading;
			waitingSpinner.style.cssText = `display: block; 
									  margin: 0 auto;`;
			form.insertAdjacentElement('afterend', waitingSpinner);

			const	formData = new FormData(form);

			const	json = JSON.stringify(Object.fromEntries(formData.entries()));			

			postData("http://localhost:3000/requests", json)
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
			})
			.catch(() => {
				showThanksModal(message.failure);
			})
			.finally(() => {
				waitingSpinner.remove();
				form.reset();
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

	// Sliders

	const	offer_slider = document.querySelector('.offer__slider'),
			nextSlide = offer_slider.querySelector('.offer__slider-next'),
			prevSlide = offer_slider.querySelector(".offer__slider-prev"),
			totalSlide = offer_slider.querySelector('#total'),
			currentSlide = offer_slider.querySelector('#current'),
			allSlides = offer_slider.querySelectorAll('.offer__slide'),
			slidesWrapper = offer_slider.querySelector('.offer__slider-wrapper'),
			slidesField = offer_slider.querySelector(".offer__slider-inner");
			width = window.getComputedStyle(slidesWrapper).width;
	let		slideIndex = 0;
	let		offsetX = 0;

	slidesField.style.cssText = `width: ${100 * allSlides.length + '%'};
								display: flex;
								transition: 0.5s all;`;
	slidesWrapper.style.overflow = 'hidden';
	
	offer_slider.style.position = 'relative';
	
	const	indicator = document.createElement('ol'),
			dots = [];

	indicator.classList.add('carousel-indicators');
	offer_slider.append(indicator);

	function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

	for(let i = 0; i < allSlides.length; i++) {
		let	dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i);
		dot.classList.add('dot');
		indicator.append(dot);
		dots.push(dot);
		if (i == slideIndex) {
			dot.style.opacity = '1';
		}
	}

	dots.forEach(dot => {
		dot.addEventListener('click', event => {;
			slideIndex = +event.target.getAttribute('data-slide-to');
			offsetX = +deleteNotDigits(width) * slideIndex;

			showSlide();
			
			dots.forEach(dot => dot.style.opacity = .5);
			dots[slideIndex].style.opacity = 1;
		})
	})

	allSlides.forEach(slide => slide.style.width = width);

	function showSlide() {
		currentSlide.textContent = getZero(slideIndex + 1);
		slidesField.style.transform = `translate(-${offsetX}px)`;
	}

	nextSlide.addEventListener('click', () => {
		dots[slideIndex].style = 'opacity: .5';
		if (offsetX === +deleteNotDigits(width) * (allSlides.length - 1)) {
			offsetX = 0;
			slideIndex = 0;
		} else {
			offsetX = offsetX + +deleteNotDigits(width);
			++slideIndex;
		}
		dots[slideIndex].style = 'opacity: 1';
		showSlide();
	});

	prevSlide.addEventListener('click', () => {
		dots[slideIndex].style = 'opacity: .5';
		if (slideIndex == 0) {
			slideIndex = allSlides.length - 1;
			offsetX = +deleteNotDigits(width) * (allSlides.length - 1)
		} else {
			offsetX = offsetX - +deleteNotDigits(width);
			--slideIndex;
		}
		dots[slideIndex].style = 'opacity: 1';
		showSlide(slideIndex);
	})

	totalSlide.textContent = getZero(allSlides.length);
	showSlide();

	// Calculator

	const result = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio;

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = "female";
		localStorage.setItem('sex', 'female');
	}

	function	initCalc(selector, activeClass) {
		elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass)
			if (elem.getAttribute('id') === localStorage.getItem('sex')
				|| elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			} 
		});
	}

	initCalc('#gender div ', 'calculating__choose-item_active');
	initCalc('.calculating__choose_big div', 'calculating__choose-item_active');

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}
		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', ratio);
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', sex);
				}
	
				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});
	
				e.target.classList.add(activeClass);
	
				calcTotal();
			});
		});
	}

	getStaticInformation('#gender div ', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {
			if (input.value.match(/\D/g)) {
				input.style.border = "1px solid red";
			} else {
				input.style.border = "none";
			}

			switch(input.getAttribute('id')) {
				case "height":
					height = +input.value;
					break;
				case "weight":
					weight = +input.value;
					break;
				case "age":
					age = +input.value;
					break;
			}

			calcTotal();
		});
	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
});