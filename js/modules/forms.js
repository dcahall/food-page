import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

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

			postData("http://localhost:3000/requests", json)
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
		openModal('.modal', modalTimerId);

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
			closeModal('.modal');
		}, 4000)
	}
}

export default forms;