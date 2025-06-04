<footer>
	<div class="wrapper-982 ">
		<section id="contact__info " class="contact__info section-height90">
			<h2 class="title">Contactez-moi</h2>
			<p>Pour toutes informations, voici les coordonnées de SBG Coaching :</p>
			<ul aria-label="Mes différents moyens de contact">
				<li class="contact__info__item contact__info__mail">
					<a href="mailto:info@sbg.be" class="contact__link">info@sbg.be</a>
				</li>
				<li class="contact__info__item contact__info__phone">
					<a href="tel:0494205075" class="contact__link">0494 20 50 75</a>
				</li>
				<li class="contact__info__item contact__info__map">Route de Yernée 264, 4480 Engis</li>

			</ul>

			<div class="contact__info__iframe">
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2535.447894064328!2d5.338040776833654!3d50.544440180591536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c1aabcf7c0482d%3A0xf7bb9c0d8fdde17c!2sRte%20de%20Yern%C3%A9e%20264%2C%204480%20Engis%2C%20Belgique!5e0!3m2!1sfr!2sfr!4v1737715092033!5m2!1sfr!2sfr" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
			</div>

			<div class="contact__info__social">
				<p>Rejoignez-nous !</p>
				<?php
				includeComponent('__links-social-black');
				?>
			</div>



		</section>
	</div>
	<?php
	includeComponent('__form');
	?>
	<div class="wrapper-982 ">
		<section class="footer__nav">
			<img src="img/logo-black.svg" alt="logo de l'entreprise SBG Coaching" class="footer__logo">
			<div class="footer__nav-col1">
				<h2 class="footer__nav__slogan">le seul mauvais entraînement est celui que l’on ne fait pas</h2>
				<p>Votre corps mérite l'effort, votre esprit mérite la discipline. Ensemble, nous transformerons chaque excuse en une victoire personnelle. Faites le premier pas, le reste suivra.</p>
			</div>
			<nav class="footer__nav-col2">
				<ul class="footer__nav__coaching">
					<h3>Coaching</h3>
					<li><a href="entreprise.php">Entreprise</a>
					<li><a href="general.php">Général</a></li>
					<li><a href="program.php">Programmes</a></li>
				</ul>
				<ul class="footer__nav__informations">
					<h3>Informations</h3>
					<li class="nav__informations__item1"><a href="index.php">Accueil</a></li>
					<li class="nav__informations__item2"><a href="about.php">à propos</a> </li>
					<li class="nav__informations__item3"><a href="testimonials.php">Témoignages</a></li>
					<li class="nav__informations__item4"><a href="contact.php">Contact</a></li>
					<li class="footer__nav__rdv"><a href="rdv.php"><strong>Prise de rendez-vous</strong></a></li>
				</ul>
			</nav>
			<div class="footer__nav-col3">
				<p class="footer__copyright">&copy;SBG Coaching 2025</p>
				<div class="footer__legal">
					<a href="legal__mention.php">Mentions légales</a>
					<a href="legal__conditions.php">Conditions d'utilisation</a>
				</div>
				<div class="footer__social">
					<?php
					includeComponent('__links-social-black');
					?>
				</div>
			</div>
		</section>
	</div>
</footer>