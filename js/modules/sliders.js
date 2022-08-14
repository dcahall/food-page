import {getZero} from './timer';

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
}

export default sliders;