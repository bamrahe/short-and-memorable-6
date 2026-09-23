const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedLanguage = localStorage.getItem('language') || 'en';

const translations = {
	en: {
		language: { choose: 'Choose language' },
		nav: { home: 'Home', portfolio: 'Portfolio', about: 'About', gallery: 'Gallery' },
		footer: 'abam &copy; 2026',
		home: {
			welcome: 'Welcome to my website!',
			intro: 'This is a simple website created for demonstration purposes.',
			glass: "I'm using <b>glassmorphism</b> style.",
			explain: 'This style is characterized by a frosted glass effect, which gives the appearance of a semi-transparent background with a blurred effect. It creates a modern and elegant look for the website.',
			explore: 'Feel free to explore the different sections of the website and learn more about me and my work. You can find my portfolio and information about me in the navigation menu above.',
			thanks: 'Thank you for visiting my website!',
			enjoy: 'Enjoy your stay!',
			blur: "Everything after I'm using glassmorphism style is just me pressing tab btw"
		},
		about: {
			profile: 'Profile', name: 'Name', age: 'Age', job: 'Job', student: 'Student', city: 'City', gender: 'Gender', male: 'Male', heading: 'About Me',
			description: 'Hello! My name is Abraham Nararya Rahe Jatmiko, also called Abam, and I am a Grade 6 student who loves learning and taking on new challenges. I believe that every day is an opportunity to grow, discover new things, and become a better person. My favorite subjects are Mathematics and Science, and I enjoy participating in academic competitions and school activities. Through these experiences, I have learned the importance of hard work, discipline, teamwork, and perseverance. Outside the classroom, I enjoy riding bicycle, coding, and solving puzzles. These activities help me develop creativity, confidence, and problem-solving skills. I am grateful for the support of my family, teachers, and friends, who encourage me to always do my best.'
		},
		portfolio: { heading: 'My Portfolio', subheading: 'Here are some of my projects:' },
		gallery: { heading: 'Gallery', ariaLabel: 'Photo gallery', chooseImage: 'Choose a gallery image', previous: 'Previous image', next: 'Next image', watchVideo: 'Watch Video', caption1: 'Abraham, ready to learn something new.', caption2: '"MY HEALTHY CALENDAR" using MIT App Inventor', caption3: 'Bounce the Ball using Camera Sensing in Scratch', caption4: 'Lomba Makan Krupuk' },
		titles: { home: 'Home', about: 'About Me', portfolio: 'Portfolio', gallery: 'Gallery' }
	},
	id: {
		language: { choose: 'Pilih bahasa' },
		nav: { home: 'Beranda', portfolio: 'Portofolio', about: 'Tentang Saya', gallery: 'Galeri' },
		footer: 'abam &copy; 2026',
		home: {
			welcome: 'Selamat datang di situs web saya!',
			intro: 'Ini adalah situs web sederhana yang dibuat untuk tujuan demonstrasi.',
			glass: 'Saya menggunakan gaya <b>glassmorphism</b>.',
			explain: 'Gaya ini memiliki ciri efek kaca buram yang memberikan tampilan transparan dengan efek kabur. Hasilnya adalah tampilan modern dan elegan untuk situs web.',
			explore: 'Silakan jelajahi berbagai bagian situs ini untuk mengenal saya dan karya saya. Anda dapat menemukan portofolio dan informasi tentang saya melalui menu navigasi di atas.',
			thanks: 'Terima kasih sudah berkunjung ke situs web saya!',
			enjoy: 'Selamat menikmati!',
			blur: 'Semua teks setelah bagian gaya glassmorphism ini hanya hasil saya menekan tombol tab.'
		},
		about: {
			profile: 'Profil', name: 'Nama', age: 'Usia', job: 'Pekerjaan', student: 'Pelajar', city: 'Kota', gender: 'Jenis Kelamin', male: 'Laki-laki', heading: 'Tentang Saya',
			description: 'Halo! Nama saya Abraham Nararya Rahe Jatmiko, biasa dipanggil Abam. Saya adalah siswa kelas 6 yang senang belajar dan menghadapi tantangan baru. Saya percaya bahwa setiap hari adalah kesempatan untuk berkembang, menemukan hal baru, dan menjadi pribadi yang lebih baik. Pelajaran favorit saya adalah Matematika dan Sains. Saya juga senang mengikuti kompetisi akademik dan kegiatan sekolah. Dari pengalaman tersebut, saya belajar pentingnya kerja keras, disiplin, kerja sama, dan ketekunan. Di luar kelas, saya suka bersepeda, membuat kode, dan memecahkan teka-teki. Kegiatan tersebut membantu saya mengembangkan kreativitas, kepercayaan diri, dan kemampuan memecahkan masalah. Saya berterima kasih atas dukungan keluarga, guru, dan teman-teman yang selalu mendorong saya untuk melakukan yang terbaik.'
		},
		portfolio: { heading: 'Portofolio Saya', subheading: 'Berikut adalah beberapa proyek saya:' },
		gallery: { heading: 'Galeri', ariaLabel: 'Galeri foto', chooseImage: 'Pilih gambar galeri', previous: 'Gambar sebelumnya', next: 'Gambar berikutnya', watchVideo: 'Tonton Video', caption1: 'Abraham, siap mempelajari hal baru.', caption2: '"MY HEALTHY CALENDAR" menggunakan MIT App Inventor', caption3: 'Bounce the Ball menggunakan Camera Sensing di Scratch', caption4: 'Lomba Makan Krupuk' },
		titles: { home: 'Beranda', about: 'Tentang Saya', portfolio: 'Portofolio', gallery: 'Galeri' }
	}
};

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

function getTranslation(language, key) {
	return key.split('.').reduce((value, part) => value?.[part], translations[language]);
}

function setLanguage(language) {
	const dictionary = translations[language];
	const titleKey = document.querySelector('[data-title]')?.dataset.title;

	document.documentElement.lang = language === 'id' ? 'id' : 'en';
	document.querySelectorAll('[data-i18n]').forEach((element) => {
		const translation = getTranslation(language, element.dataset.i18n);

		if (translation !== undefined) {
			element.innerHTML = translation;
		}
	});
	document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
		const translation = getTranslation(language, element.dataset.i18nAriaLabel);

		if (translation !== undefined) {
			element.setAttribute('aria-label', translation);
		}
	});

	if (titleKey) {
		document.title = dictionary.titles[titleKey];
	}

	document.querySelectorAll('[data-language]').forEach((button) => {
		button.setAttribute('aria-pressed', String(button.dataset.language === language));
	});

	document.querySelectorAll('.gallery__dot').forEach((dot, index) => {
		const label = language === 'id' ? `Tampilkan gambar ${index + 1}` : `Show image ${index + 1}`;
		dot.setAttribute('aria-label', label);
	});

	localStorage.setItem('language', language);
}

setLanguage(savedLanguage);

document.querySelectorAll('[data-language]').forEach((button) => {
	button.addEventListener('click', () => setLanguage(button.dataset.language));
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
