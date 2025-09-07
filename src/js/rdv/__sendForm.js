/* eslint-env browser */
/* global document, alert */
export function sendFormData() {
  const acceptLegal = document.getElementById("accept-legal");
  if (!acceptLegal || !acceptLegal.checked) {
    alert(
      "Veuillez accepter les mentions légales et les conditions d'utilisation."
    );
    return;
  }

  /* const formData = new FormData();

	for (const key in userResponses) {
	  formData.append(key, userResponses[key]);
	}

	formData.append('to', 'samuel.billagarcia@gmail.com');

	fetch('/pages/rdv/__sendForm.php', {
	  method: 'POST',
	  body: formData
	})
	.then(response => response.text())
	.then(responseText => {
	  if (responseText.trim() === 'OK') {
		alert('Votre demande a bien été envoyée ! 📩');
		window.location.reload(); // Optionnel
	  } else {
		alert('Erreur lors de l\'envoi du formulaire : ' + responseText);
	  }
	})
	.catch(error => {
	  console.error(error);
	  alert('Erreur réseau. Veuillez réessayer.');
	}); */
}

/* export function attachSendListener() {
	const submitBtn = document.querySelector('.form__summary__submit button[type="submit"]');
	if (submitBtn) {
	  submitBtn.addEventListener('click', function (e) {
		e.preventDefault();
		sendFormData();
	  });
	}
  } */
 
