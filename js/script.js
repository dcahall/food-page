import tabs			from  './modules/tabs';
import modal		from './modules/modal';
import calculator	from './modules/calculator';
import cards		from './modules/cards';
import forms		from './modules/forms';
import slider		from './modules/sliders';
import timer		from './modules/timer';
import {openModal}	from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

	modal('[data-modal]', '.modal', modalTimerId);
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	calculator();
	cards();
	timer('.timer', '2022-09-01');
	forms('form', modalTimerId);
	slider({
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
