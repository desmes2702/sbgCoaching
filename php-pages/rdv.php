<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Coaching sportif professionnel, individuel et en groupe. Découvrez nos services adaptés à vos besoins et vos objectifs.">
	<title>Accueil | Coaching Sportif</title>
</head>

<body class="page__rdv" data-page="rdv" data-variant="" data-module="links">

	<div class="wrapper-1440-black">
		<?php
		$base = __DIR__ . '/../pages/';
		include $base . 'components/__menu.php';
		?>
	</div>

	<main class="main ">
		<?php
		include $base . 'rdv/__form.php';
		?>
	</main>

	<script type="module" src="/src/js/main.ts"></script>

</body>

</html>
