export function initRecaptcha() {
	if (!document.querySelector('.g-recaptcha')) return;
  
	const script = document.createElement('script');
	script.src = 'https://www.google.com/recaptcha/api.js';
	script.async = true;
	script.defer = true;
	document.body.appendChild(script);
  }