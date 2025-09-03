import { formatText, formatNumber, formatEmail } from '../global/__utils.js';

// =============================
// Variables principales
// =============================

const formContainer = document.querySelector('.form__container');
const formTimeline = document.querySelector('.form__timeline');
const formWrapper = document.querySelector('.form__wrapper');
const backBtn = document.querySelector('.form__back');
const nextBtn = document.querySelector('.form__next');
const undertitleSpan = document.getElementById('undertitle-specification');

// Questions
const questions = [
  { id: 1, type: 'choice', question: 'Vous êtes une entreprise, un particulier ?' },
  { id: 2, type: 'text', question: 'Expliquez-moi votre objectif sportif' },
  { id: 3, type: 'input', question: 'Quel âge avez-vous ?' },
  { id: 4, type: 'choice', question: 'Durée de votre coaching' },
  { id: 5, type: 'input', question: 'Vos coordonnées' },
  { id: 6, type: 'summary', question: 'Résumé de vos réponses' }
];

let currentIndex = 0;
const userResponses = {}; // Pour stocker les réponses

// =============================
// Fonctions utilitaires
// =============================

function updateUndertitle(value) {
  undertitleSpan.textContent = `_${value}`;
}

function animateUndertitle() {
  undertitleSpan.style.opacity = '0';
  undertitleSpan.style.transform = 'translateY(-5px)';
  setTimeout(() => {
    undertitleSpan.style.opacity = '1';
    undertitleSpan.style.transform = 'translateY(0)';
    undertitleSpan.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  }, 50);
}

function isCurrentQuestionValid() {
  if (currentIndex === 0) {
    const selected = document.querySelector('input[name="type"]:checked');
    return !!selected;
  } else if (currentIndex === 1) {
    const textarea = document.getElementById('objectif');
    return textarea && textarea.value.trim().length >= 10;
  } else if (currentIndex === 2) {
    const ageInput = document.getElementById('age');
    const fragileChoice = document.querySelector('input[name="fragile"]:checked');
    const precisionTextarea = document.getElementById('precision');

    const ageValid = ageInput && ageInput.value >= 1 && ageInput.value <= 120;
    const fragileValid = fragileChoice !== null;

    if (fragileChoice && fragileChoice.value === 'oui') {
      const precisionValid = precisionTextarea && precisionTextarea.value.trim().length >= 5;
      return ageValid && fragileValid && precisionValid;
    }

    return ageValid && fragileValid;
  } else if (currentIndex === 3) {
    const selected = document.querySelector('input[name="duree"]:checked');
    const precisionDuree = document.getElementById('precision-duree');

    if (!selected) return false;
    if (selected.value === 'autre') {
      return precisionDuree && precisionDuree.value.trim().length >= 5;
    }
    return true;
  } else if (currentIndex === 4) {
    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const telephone = document.getElementById('telephone');
    const email = document.getElementById('email');

    const nomValid = nom && nom.value.trim().length >= 2;
    const prenomValid = prenom && prenom.value.trim().length >= 2;
    const telephoneValid = telephone && telephone.value.trim().length >= 8;
    const emailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

    return nomValid && prenomValid && emailValid;
  }

  return true;
}

function showValidationError(selector) {
  const formQuestion = document.querySelector('.form__question');
  let errorMessage = '';

  if (currentIndex === 0) {
    errorMessage = "Veuillez choisir Entreprise ou Particulier.";
  } 
  else if (currentIndex === 1) {
    errorMessage = "Merci de préciser votre objectif sportif (minimum 10 caractères).";
  }
  else if (currentIndex === 2) {
    const ageInput = document.getElementById('age');
    const fragileChoice = document.querySelector('input[name="fragile"]:checked');
    const precisionTextarea = document.getElementById('precision');

    if (!ageInput || !(ageInput.value >= 1 && ageInput.value <= 120)) {
      errorMessage = "Veuillez entrer un âge valide (entre 1 et 120 ans).";
      selector = '#age';
    } else if (!fragileChoice) {
      errorMessage = "Merci d'indiquer si vous avez une fragilité ou non.";
      selector = 'input[name="fragile"]';
    } else if (fragileChoice.value === 'oui' && (!precisionTextarea || precisionTextarea.value.trim().length < 5)) {
      errorMessage = "Merci de préciser votre fragilité physique.";
      selector = '#precision';
    } else {
      errorMessage = "Veuillez renseigner votre âge et votre état de santé.";
    }
  }
  else if (currentIndex === 3) {
    const dureeChoice = document.querySelector('input[name="duree"]:checked');
    const precisionDureeTextarea = document.getElementById('precision-duree');

    if (!dureeChoice) {
      errorMessage = "Veuillez sélectionner une durée de coaching.";
      selector = 'input[name="duree"]';
    } else if (dureeChoice.value === 'autre' && (!precisionDureeTextarea || precisionDureeTextarea.value.trim().length < 5)) {
      errorMessage = "Merci de préciser la durée de votre coaching.";
      selector = '#precision-duree';
    } else {
      errorMessage = "Veuillez sélectionner une durée de coaching.";
    }
  }
  else if (currentIndex === 4) {
    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');

    const nomValid = nom && nom.value.trim().length >= 2;
    const prenomValid = prenom && prenom.value.trim().length >= 2;
    const emailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

    if (!nomValid) {
      errorMessage = "Merci d'indiquer un nom valide (au moins 2 lettres).";
      selector = '#nom';
    } else if (!prenomValid) {
      errorMessage = "Merci d'indiquer un prénom valide (au moins 2 lettres).";
      selector = '#prenom';
    } else if (!emailValid) {
      errorMessage = "Merci de saisir une adresse email valide.";
      selector = '#email';
    } else {
      errorMessage = "Merci de compléter vos coordonnées (le n° de téléphone n'est pas obligatoire).";
    }
  }
  else {
    errorMessage = "Veuillez remplir correctement ce champ.";
  }

  formQuestion.classList.add('form__question--error');

  let errorBlock = formQuestion.querySelector('.form__error');
  if (!errorBlock) {
    errorBlock = document.createElement('div');
    errorBlock.classList.add('form__error');
    formQuestion.appendChild(errorBlock);
  }

  errorBlock.textContent = errorMessage;

  // 🔥 Ajout du focus directement
  if (selector) {
    focusOnError(selector);
  }

  enableAutoClearError(); // L'utilisateur pourra enlever l'erreur quand il corrige
}



function enableAutoClearError() {
  const formQuestion = document.querySelector('.form__question');
  const errorBlock = formQuestion.querySelector('.form__error');
  if (!errorBlock) return;

  // Écoute tous les inputs/textareas dans la question actuelle
  const inputs = formQuestion.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (isCurrentQuestionValid()) {
        errorBlock.remove(); // Supprime l'erreur visuellement
      }
    });

    // Pour les radios : écouter changement aussi
    input.addEventListener('change', () => {
      if (isCurrentQuestionValid()) {
        errorBlock.remove();
      }
    });
  });
}

function focusOnError(selector) {
  const field = document.querySelector(selector);
  if (field) {
    field.focus({ preventScroll: true });

    const rect = field.getBoundingClientRect();
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (!isVisible) {
      field.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

function saveCurrentAnswer() {
  if (currentIndex === 0) {
    const selected = document.querySelector('input[name="type"]:checked');
    if (selected) userResponses.type = selected.value;
  } else if (currentIndex === 1) {
    const textarea = document.getElementById('objectif');
    if (textarea) userResponses.objectif = textarea.value.trim();
  } else if (currentIndex === 2) {
    const age = document.getElementById('age');
    const fragile = document.querySelector('input[name="fragile"]:checked');
    const precision = document.getElementById('precision');

    if (age) userResponses.age = age.value.trim();
    if (fragile) userResponses.fragile = fragile.value;
    if (precision && !precision.disabled) {
      userResponses.precision = precision.value.trim();
    } else {
      userResponses.precision = '';
    }
  } else if (currentIndex === 3) {
    const duree = document.querySelector('input[name="duree"]:checked');
    const precisionDuree = document.getElementById('precision-duree');

    if (duree) userResponses.duree = duree.value;
    if (precisionDuree && !precisionDuree.disabled) {
      userResponses.precisionDuree = precisionDuree.value.trim();
    } else {
      userResponses.precisionDuree = '';
    }
  } else if (currentIndex === 4) {
    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const telephone = document.getElementById('telephone');
    const email = document.getElementById('email');

    if (nom) userResponses.nom = nom.value.trim();
    if (prenom) userResponses.prenom = prenom.value.trim();
    if (telephone) userResponses.telephone = telephone.value.trim();
    if (email) userResponses.email = email.value.trim();
  }
}
function updateUndertitleAccordingToStep() {
  if (currentIndex === 5) {
    updateUndertitle('Résumé');
    const undertitle = document.querySelector('.form__undertitle');
    if (undertitle) {
      undertitle.style.margin = '0'; // 🔥 Ici on annule les marges
    }
  } else if (userResponses.type) {
    updateUndertitle(userResponses.type);
    const undertitle = document.querySelector('.form__undertitle');
    if (undertitle) {
      undertitle.style.margin = ''; // 🔥 On remet la marge normale
    }
  } else {
    updateUndertitle('');
    const undertitle = document.querySelector('.form__undertitle');
    if (undertitle) {
      undertitle.style.margin = ''; // 🔥 Idem
    }
  }
}

// =============================
// Initialisation
// =============================

function initForm() {
  generateTimeline();
  renderQuestion();
  updateNavigation();
}

function generateTimeline() {
  formTimeline.innerHTML = '';

  questions.forEach((_, index) => {
    const step = document.createElement('div');
    step.classList.add('form__timeline__step');

    const circle = document.createElement('span');
    circle.classList.add('form__timeline__circle');
    circle.dataset.index = index;

    const line = document.createElement('span');
    line.classList.add('form__timeline__line');

    step.appendChild(circle);
    if (index < questions.length - 1) step.appendChild(line);

    formTimeline.appendChild(step);
  });
}

function renderQuestion() {
  const question = questions[currentIndex];
  let questionHTML = '';

  if (currentIndex === 0) {
    questionHTML = `
      <div class="form__question">
        <div class="form__question__header">
          <span class="form__question__step">${currentIndex + 1}/${questions.length}</span>
        </div>
        <fieldset class="form__fieldset">
          <legend class="form__legend">${question.question}</legend>
          <div class="form__question__choices">
            <label class="form__question__choice">
              <input type="radio" name="type" value="Entreprise" aria-required="true" />
              <span>Entreprise</span>
            </label>
            <label class="form__question__choice">
              <input type="radio" name="type" value="Particulier" aria-required="true" />
              <span>Particulier</span>
            </label>
          </div>
        </fieldset>
      </div>
    `;
  } else if (currentIndex === 1) {
    questionHTML = `
      <div class="form__question">
        <div class="form__question__header">
          <span class="form__question__step">${currentIndex + 1}/${questions.length}</span>
        </div>
        <div class="form__question__group">
          <label for="objectif" class="form__label">Expliquez-moi votre objectif sportif *</label>
          <textarea id="objectif" name="objectif" class="form__textarea" rows="5" aria-required="true"></textarea>
        </div>
      </div>
    `;
  } else if (currentIndex === 2) {
    questionHTML = `
      <div class="form__question">
        <div class="form__question__header">
          <span class="form__question__step">${currentIndex + 1}/${questions.length}</span>
        </div>
        <div class="form__question__group">
          <label for="age" class="form__label">Quel âge avez-vous ? *</label>
          <input type="number" id="age" name="age" class="form__input" min="1" max="120" aria-required="true" placeholder="Votre âge" />
        </div>
        <div class="form__question__group">
          <p class="form__label">Avez-vous une fragilité/handicap physique ? *</p>
          <div class="form__question__choices form__question__choices-grid">
            <label class="form__question__choice">
              <input type="radio" name="fragile" value="oui" aria-required="true" />
              <span>Oui</span>
            </label>
            <label class="form__question__choice">
              <input type="radio" name="fragile" value="non" aria-required="true" />
              <span>Non</span>
            </label>
            <label class="form__question__choice">
              <input type="radio" name="fragile" value="ne-souhaite-pas-preciser" aria-required="true" />
              <span>Ne souhaite pas préciser</span>
            </label>
          </div>
        </div>
        <div class="form__question__group">
          <label for="precision" class="form__label">Si "oui" précisez :</label>
          <textarea id="precision" name="precision" class="form__textarea" rows="4" placeholder="Précision(s)"></textarea>
        </div>
      </div>
    `;
  } else if (currentIndex === 3) {
    questionHTML = `
      <div class="form__question">
        <div class="form__question__header">
          <span class="form__question__step">${currentIndex + 1}/${questions.length}</span>
        </div>
        <fieldset class="form__fieldset form__question__group">
          <legend class="form__legend">Durée de votre coaching *</legend>
          <div class="form__question__choices form__question__choices-grid">
            <label class="form__question__choice">
              <input type="radio" name="duree" value="3 mois" aria-required="true" />
              <span>3 mois</span>
            </label>
            <label class="form__question__choice">
              <input type="radio" name="duree" value="6 mois" aria-required="true" />
              <span>6 mois</span>
            </label>
            <label class="form__question__choice">
              <input type="radio" name="duree" value="12 mois" aria-required="true" />
              <span>12 mois</span>
            </label>
            <label class="form__question__choice">
              <input type="radio" name="duree" value="autre" aria-required="true" />
              <span>Autre</span>
            </label>
          </div>
        </fieldset>
        <div class="form__question__group">
          <label for="precision-duree" class="form__label">Si "autre" précisez :</label>
          <textarea id="precision-duree" name="precision-duree" class="form__textarea" rows="4" placeholder="Précision(s)"></textarea>
        </div>
      </div>
    `;
  } else if (currentIndex === 4) {
    questionHTML = `
      <div class="form__question">
        <div class="form__question__header">
          <span class="form__question__step">${currentIndex + 1}/${questions.length}</span>
        </div>
        <div class="form__question__group">
          <label for="nom" class="form__label">Nom *</label>
          <input type="text" id="nom" name="nom" class="form__input" aria-required="true" placeholder="Votre nom" />
        </div>
        <div class="form__question__group">
          <label for="prenom" class="form__label">Prénom *</label>
          <input type="text" id="prenom" name="prenom" class="form__input" aria-required="true" placeholder="Votre prénom" />
        </div>
        <div class="form__question__group">
          <label for="telephone" class="form__label">Numéro de téléphone</label>
          <input type="tel" id="telephone" name="telephone" class="form__input" placeholder="Votre numéro" />
        </div>
        <div class="form__question__group">
          <label for="email" class="form__label">Adresse email *</label>
          <input type="email" id="email" name="email" class="form__input" aria-required="true" placeholder="Votre email" />
        </div>
      </div>
    `;
  } else if (currentIndex === 5) {
    questionHTML = `
      <div class="form__summary">
        <fieldset class="form__summary__fieldset form__fieldset-coaching">
          <legend>Informations coaching</legend>
          <div class="form__wrapper">
            <div class="form__summary__infos">
              <p class="summary__infos__type">${formatText(userResponses.type)}</p>
              <p class="summary__infos__duree">${formatText(userResponses.duree)}</p>
            </div>
  
            <div class="form__summary__textarea">
              <h4>Objectif</h4>
              <p>${userResponses.objectif || '-'}</p>
            </div>
  
            ${userResponses.precision ? `
            <div class="form__summary__textarea">
              <h4>Précisions</h4>
              <p>${userResponses.precision}</p>
            </div>
            ` : ''}
  
          </div>
  
          <div class="wrapper__button">
            <button type="button" class="form__summary__edit button button-darker" data-edit="coaching">Modifier</button>
          </div>
        </fieldset>
  
        <fieldset class="form__summary__fieldset form__fieldset-personal">
          <legend>Informations personnelles</legend>
          <div class="form__wrapper">
            <div class="form__summary__infos">
              <p class="summary__infos__personal">${formatText(userResponses.nom)} ${formatText(userResponses.prenom)}, ${userResponses.age || '-'} ans</p>
            </div>
  
            <div class="form__summary__inputs">
              <h4>Coordonnées</h4>
              <div>
                <p class="summary__infos__phone">${formatNumber(userResponses.telephone)}</p>
                <p class="summary__infos__mail">${formatEmail(userResponses.email)}</p>
              </div>
            </div>
          </div>
  
          <div class="wrapper__button">
            <button type="button" class="form__summary__edit button button-darker" data-edit="personal">Modifier</button>
          </div>
        </fieldset>
  
        <section class="form__summary__submit">
          <h2 class="title">Envoi du formulaire</h2>
          <p>Toutes vos informations seront envoyées à <span>SBG Coaching</span> et nous vous répondrons le plus rapidement possible.</p>
  
          <div class="form__summary__legal">
            <label>
              <input type="checkbox" id="accept-legal" required>
              <span>J’accepte que mes données personnelles, y compris celles relatives à ma santé, soient utilisées dans le cadre de mon suivi personnalisé. Ces données ne seront ni partagées ni revendues. <a href="/legal__mention.php" target="_blank" rel="noopener">En savoir plus</a>.</span>
            </label>
          </div>
  
          <div class="form__summary__recaptcha">
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
          </div>
  
          <div class="wrapper__button">
            <button type="submit" class="button button-red">Envoyer</button>
          </div>
  
        </section>
  
      </div>
    `;
  }
  

  formWrapper.innerHTML = questionHTML;

  if (currentIndex === 0) {
    if (userResponses.type) {
      const selected = document.querySelector(`input[name="type"][value="${userResponses.type}"]`);
      if (selected) selected.checked = true;
      updateUndertitle(userResponses.type || '');
    }
    const radios = document.querySelectorAll('input[name="type"]');
    radios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        updateUndertitle(e.target.value);
        animateUndertitle();
      });
    });

  } else if (currentIndex === 1) {
    const textarea = document.getElementById('objectif');
    if (textarea && userResponses.objectif) {
      textarea.value = userResponses.objectif;
    }

  } else if (currentIndex === 2) {
    const ageInput = document.getElementById('age');
    if (ageInput && userResponses.age) ageInput.value = userResponses.age;

    const precisionTextarea = document.getElementById('precision');
    if (precisionTextarea && userResponses.precision) {
      precisionTextarea.value = userResponses.precision;
    }

    const radiosFragile = document.querySelectorAll('input[name="fragile"]');
    if (userResponses.fragile) {
      const selectedFragile = document.querySelector(`input[name="fragile"][value="${userResponses.fragile}"]`);
      if (selectedFragile) selectedFragile.checked = true;
    }

    function updatePrecisionFragile() {
      const selected = document.querySelector('input[name="fragile"]:checked');
      if (selected && selected.value === 'oui') {
        precisionTextarea.disabled = false;
        precisionTextarea.parentElement.style.opacity = '1';
      } else {
        precisionTextarea.disabled = true;
        precisionTextarea.parentElement.style.opacity = '0.2';
        precisionTextarea.value = '';
      }
    }

    radiosFragile.forEach(radio => {
      radio.addEventListener('change', updatePrecisionFragile);
    });

    updatePrecisionFragile();

  } else if (currentIndex === 3) {
    const precisionDureeTextarea = document.getElementById('precision-duree');
    if (precisionDureeTextarea && userResponses.precisionDuree) {
      precisionDureeTextarea.value = userResponses.precisionDuree;
    }

    const radiosDuree = document.querySelectorAll('input[name="duree"]');
    if (userResponses.duree) {
      const selectedDuree = document.querySelector(`input[name="duree"][value="${userResponses.duree}"]`);
      if (selectedDuree) selectedDuree.checked = true;
    }

    function updatePrecisionDuree() {
      const selected = document.querySelector('input[name="duree"]:checked');
      if (selected && selected.value === 'autre') {
        precisionDureeTextarea.disabled = false;
        precisionDureeTextarea.parentElement.style.opacity = '1';
      } else {
        precisionDureeTextarea.disabled = true;
        precisionDureeTextarea.parentElement.style.opacity = '0.2';
        precisionDureeTextarea.value = '';
      }
    }

    radiosDuree.forEach(radio => {
      radio.addEventListener('change', updatePrecisionDuree);
    });

    updatePrecisionDuree();

  } else if (currentIndex === 4) {
    if (userResponses.nom) {
      const nomInput = document.getElementById('nom');
      if (nomInput) nomInput.value = userResponses.nom;
    }
    if (userResponses.prenom) {
      const prenomInput = document.getElementById('prenom');
      if (prenomInput) prenomInput.value = userResponses.prenom;
    }
    if (userResponses.telephone) {
      const telephoneInput = document.getElementById('telephone');
      if (telephoneInput) telephoneInput.value = userResponses.telephone;
    }
    if (userResponses.email) {
      const emailInput = document.getElementById('email');
      if (emailInput) emailInput.value = userResponses.email;
    }
  } if (currentIndex === 5) {
    formWrapper.style.border = 'none';
    nextBtn.style.opacity = '0.2';
    nextBtn.disabled = true;
    /* import('./__sendForm.js').then(module => {
      module.attachSendListener();
    }); */
    
  } else {
    formWrapper.style.border = ''; // Remettre bordure normale
    nextBtn.style.opacity = '1';
    nextBtn.disabled = false;
  }

  updateTimeline();
}


function updateTimeline() {
  const circles = document.querySelectorAll('.form__timeline__circle');
  circles.forEach((circle, index) => {
    circle.classList.remove('form__timeline__circle-viewed', 'form__timeline__circle-reading');
    if (index < currentIndex) {
      circle.classList.add('form__timeline__circle-viewed');
    } else if (index === currentIndex) {
      circle.classList.add('form__timeline__circle-reading');
    }
  });
}

function updateNavigation() {
  backBtn.hidden = currentIndex === 0;

  if (currentIndex === 5) {
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.2';
    nextBtn.classList.add('no-hover'); // 🔥 On ajoute une classe spéciale
  } else {
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
    nextBtn.classList.remove('no-hover'); // 🔥 On enlève la classe
  }

  updateUndertitleAccordingToStep(); // 🔥 Nouvelle ligne propre ici
}


// =============================
// Navigation (Back / Next)
// =============================

nextBtn.addEventListener('click', () => {
  if (!isCurrentQuestionValid()) {
    if (currentIndex === 0) {
      showValidationError('input[name="type"]'); // Focus sur le premier radio
    } else if (currentIndex === 1) {
      showValidationError('#objectif');
    } else if (currentIndex === 2) {
      showValidationError('#age');
    } else if (currentIndex === 3) {
      showValidationError('input[name="duree"]'); // Pareil ici
    } else if (currentIndex === 4) {
      showValidationError('#nom');
    }
    return;
  }

  saveCurrentAnswer();
  currentIndex++;
  renderQuestion();
  updateNavigation();
});


backBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
    updateNavigation();
  }
});

// 1. EventListener pour les boutons Modifier
document.addEventListener('click', function (e) {
  if (e.target.matches('.form__summary__edit')) {
    const editType = e.target.dataset.edit;
    handleEditButton(editType);
  }
});

// 2. Fonction pour gérer le retour à la bonne étape
function handleEditButton(type) {
  if (type === 'coaching') {
    currentIndex = 0; // Retour au début du formulaire
  } else if (type === 'personal') {
    currentIndex = 4; // Retour aux coordonnées
  }

  renderQuestion();
  updateNavigation();
  formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

  /* highlightEditedField(); */
}

/* function highlightEditedField() {
  const formQuestion = document.querySelector('.form__question');
  if (!formQuestion) return;

  formQuestion.classList.add('form__edit-highlight');

  // Retirer la classe après 1,5s pour que ce soit temporaire
  setTimeout(() => {
    formQuestion.classList.remove('form__edit-highlight');
  }, 1500);
} */



// =============================
// Lancement
// =============================

initForm();