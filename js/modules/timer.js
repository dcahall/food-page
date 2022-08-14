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

export default timer;
export {getZero};