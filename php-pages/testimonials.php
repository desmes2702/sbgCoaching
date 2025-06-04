<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Coaching sportif professionnel, individuel et en groupe. Découvrez nos services adaptés à vos besoins et vos objectifs.">
	<title>Témoignages</title>
</head>

<body class="page__testimonials" data-page="testimonials" data-variant="black" data-module="testimonials links scrollReveal">

	<div class="wrapper-1440">
		<?php
		$base = __DIR__ . '/../pages/';
		include $base . 'components/__menu.php';
		?>
	</div>

	<main class="main">
		<?php
		include $base . 'testimonials/__testimonial-new.php';
		?>
		<?php
		include $base . 'testimonials/__testimonials-last.php';
		?>
		<?php
		include $base . 'testimonials/__testimonials-submit.php';
		?>
	</main>

	<?php
	include $base . 'components/__footer.php';
	?>

	<script type="module" src="/src/js/main.ts"></script>

</body>

</html>
