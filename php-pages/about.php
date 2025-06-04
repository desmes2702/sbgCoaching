<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Coaching sportif professionnel, individuel et en groupe. Découvrez nos services adaptés à vos besoins et vos objectifs.">
	<title>Coaching Hero</title>

</head>

<body class="page" id="page__about" data-variant="" data-page="about" data-module=" links faq scrollReveal">
	<div class="wrapper-1440-black">
		<?php
		$base = __DIR__ . '/../pages/';
		include $base . 'components/__menu.php';
		?>
	</div>
	<main>
		<?php
		include $base . 'about/__hero.php';
		?>

		<?php
		include $base . 'about/__experience.php';
		?>

		<?php
		include $base . 'about/__slogan.php';
		?>

		<?php
		include $base . 'about/__message.php';
		?>
	</main>

	<?php
	include $base . 'components/__faq.php';
	?>

	<?php
	include $base . 'components/__footer.php';
	?>

	<script type="module" src="/src/js/main.ts"></script>
</body>


</html>
