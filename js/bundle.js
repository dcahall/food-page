/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function	calculator() {
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
			let elements = document.querySelectorAll(selector);
	
			elements.forEach(elem => {
				elem.classList.remove(activeClass)
				if (elem.getAttribute('id') === localStorage.getItem('sex')
					|| elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
					elem.classList.add(activeClass);
				} 
			});
		}
	
		initCalc('#gender div', 'calculating__choose-item_active');
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
	
		getStaticInformation('#gender div', 'calculating__choose-item_active');
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function	cards() {
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


	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
	.then(data => {
		data.forEach(({img, altimg, title, descr, price}) => {
			new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
		});
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function	forms(formSelector, modalTimerId) {
	const	forms = document.querySelectorAll(formSelector);
	const	message = {
		loading: 'img/form/spinner.svg',
		failure: 'Что-то пошло не так...',
		success: 'Спасибо! Мы скоро с вами свяжемся'
	};


	forms.forEach(item => {
		bindPostData(item);
	})

	function bindPostData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const	waitingSpinner = document.createElement('img');
			waitingSpinner.src = message.loading;
			waitingSpinner.style.cssText = `display: block; 
									  margin: 0 auto;`;
			form.insertAdjacentElement('afterend', waitingSpinner);

			const	formData = new FormData(form);

			const	json = JSON.stringify(Object.fromEntries(formData.entries()));			

			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
			.then(data => {
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
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

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
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
		}, 4000)
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
	const	modal = document.querySelector(modalSelector);

	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
	const	modal = document.querySelector(modalSelector);

	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';

	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}

function	modal(triggerSelector, modalSelector, modalTimerId) {
    const	modalTrigger = document.querySelectorAll(triggerSelector),
        	modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/sliders.js":
/*!*******************************!*\
  !*** ./js/modules/sliders.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function	sliders({container, slide, nextArrow, prevArrow,
					totalCounter, currentCounter, wrapper, field}) {
	const	offer_slider = document.querySelector(container),
			nextSlide = offer_slider.querySelector(nextArrow),
			prevSlide = offer_slider.querySelector(prevArrow),
			totalSlide = offer_slider.querySelector(totalCounter),
			currentSlide = offer_slider.querySelector(currentCounter),
			allSlides = offer_slider.querySelectorAll(slide),
			slidesWrapper = offer_slider.querySelector(wrapper),
			slidesField = offer_slider.querySelector(field),
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

	for (let i = 0; i < allSlides.length; i++) {
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
		currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex + 1);
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

	totalSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(allSlides.length);
	showSlide();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliders);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	let tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

	function hideTabContent() {

	tabsContent.forEach(item => {
		item.classList.add('hide');
		item.classList.remove('show', 'fade');
	});

	tabs.forEach(item => {
		item.classList.remove(activeClass);
	});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add(activeClass);
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', function(event) {
	const target = event.target;
	if (target && target.classList.contains(tabsSelector.replace(/\./, ''))) {
		tabs.forEach((item, i) => {
			if (target == item) {
				hideTabContent();
				showTabContent(i);
			}
		});
	}
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getZero": () => (/* binding */ getZero)
/* harmony export */ });
function	getZero(num) {
	if (num >= 0 && num < 10) {
		return `0${num}`;
	}
	return num;
}

function	timer(id, deadline) {

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

	function	setClock(selector, endTime) {
		const	timer = document.querySelector(selector),
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

	setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
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


const	getResource = async (url) => {
	let res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status ${res.status}`);
	}
	return await res.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/sliders */ "./js/modules/sliders.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









window.addEventListener('DOMContentLoaded', function() {
	const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);

	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_calculator__WEBPACK_IMPORTED_MODULE_2__["default"])();
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-09-01');
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
	(0,_modules_sliders__WEBPACK_IMPORTED_MODULE_5__["default"])({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: ".offer__slider-prev",
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: ".offer__slider-inner"
	});
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map