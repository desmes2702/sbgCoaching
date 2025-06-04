<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Coaching sportif professionnel, individuel et en groupe. Découvrez nos services adaptés à vos besoins et vos objectifs.">
	<title>Coaching d'entreprise</title>

	<title>Document</title>
</head>

<body class="page" id="page__coaching" data-variant="black" data-page="coaching-entreprise" data-module="coaching faq links scrollReveal">
	<div class="wrapper-1440" id="page__coaching__wrapper__menu">
		<?php
		$base = __DIR__ . '/../pages/';
		include $base . 'components/__menu.php';
		?>
	</div>

	<main class="main">
		<?php
		include $base . 'entreprise/__hero.php';
		?>
		<?php
		include $base . 'entreprise/__performance.php';
		?>
		<?php
		include $base . 'entreprise/__improve.php';
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
