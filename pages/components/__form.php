<div class="wrapper-982-black ">
	<section id="footer-contact-form" class="contact__form section-height90 ">
		<h2 class="contact__title title">Formulaire de contact</h2>
		<p>Toutes les informations qui seront inscrites dans ce formulaire seront directement envoyer à notre boîte mail.</p>
		<form action="/submit" method="post">
			<div class="contact__wrapper-col1">
				<fieldset class="contact__personal">
					<legend>Informations personnelles</legend>

					<label for="lastname" class="contact__label">Nom*</label>
					<input type="text" id="lastname" name="lastname" class="contact__input" required aria-required="true" autocomplete="family-name">

					<label for="firstname" class="contact__label">Prénom*</label>
					<input type="text" id="firstname" name="firstname" class="contact__input" required aria-required="true" autocomplete="given-name">

					<label for="phone" class="contact__label">Téléphone</label>
					<input type="tel" id="phone" name="phone" class="contact__input" autocomplete="tel" pattern="^(\+32\s?[1-9]{1}[0-9]?\s?\d{2}\s?\d{2}\s?\d{2}|\b0[1-9]{1}[0-9]?\s?\d{2}\s?\d{2}\s?\d{2})$"
						placeholder="04XX XX XX XX">

				</fieldset>

				<fieldset class="contact__information">
					<legend>Coordonnées</legend>

					<label for="email" class="contact__label">Email*</label>
					<input type="email" id="email" name="email" class="contact__input" required aria-required="true" autocomplete="email" placeholder="exemple@domaine.com">
				</fieldset>
			</div>
			<div class="contact__wrapper-col2">
				<fieldset class="contact__message">
					<legend>Votre message</legend>

					<label for="message" class="contact__label">Message*</label>
					<textarea id="message" name="message" class="contact__textarea" required aria-required="true"></textarea>
				</fieldset>


				<fieldset class="contact__terms">
					<input type="checkbox" id="terms" name="terms" required aria-required="true">
					<label for="terms">
						J'accepte les <a href="/mentions-legales" target="_blank">mentions légales</a> et les
						<a href="/legal_mentions-utilisation" target="_blank">conditions d'utilisation</a>.
					</label>
				</fieldset>


				<fieldset class="contact__recaptcha">
					<div class="g-recaptcha" data-sitekey="VOTRE_SITE_KEY"></div>
				</fieldset>

				<button type="submit" class="contact__button button" aria-label="Envoyer le formulaire de contact">Envoyer</button>
			</div>
		</form>
	</section>
</div>