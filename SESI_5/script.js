const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
	const isDark = theme === 'dark';

	document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
	themeToggle.setAttribute('aria-pressed', String(isDark));
	themeToggle.querySelector('.theme-toggle__icon').textContent = isDark ? '☀' : '☾';
	// themeToggle.querySelector('.theme-toggle__label').textContent = isDark
	// 	? 'Light mode'
	// 	: 'Dark mode';
}

setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
	const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';

	localStorage.setItem('theme', nextTheme);
	setTheme(nextTheme);
});

const gallery = document.querySelector('[data-gallery]');

if (gallery) {
	const track = gallery.querySelector('.gallery__track');
	const slides = [...gallery.querySelectorAll('.gallery__slide')];
	const dots = [...gallery.querySelectorAll('.gallery__dot')];
	let currentSlide = 0;

	function showSlide(index) {
		currentSlide = (index + slides.length) % slides.length;
		track.style.transform = `translateX(-${currentSlide * 100}%)`;

		dots.forEach((dot, dotIndex) => {
			const isActive = dotIndex === currentSlide;
			dot.classList.toggle('is-active', isActive);
			dot.setAttribute('aria-current', String(isActive));
		});
	}

	gallery.querySelector('[data-gallery-prev]').addEventListener('click', () => showSlide(currentSlide - 1));
	gallery.querySelector('[data-gallery-next]').addEventListener('click', () => showSlide(currentSlide + 1));
	dots.forEach((dot) => dot.addEventListener('click', () => showSlide(Number(dot.dataset.galleryDot))));
}
