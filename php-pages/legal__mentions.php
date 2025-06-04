<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="Mentions légales de SBG Coaching" />
	<meta name="robots" content="noindex,follow" />
	<title>Mentions légales | SBG Coaching</title>
</head>

<body class="page__legal" data-page="legal">
	<?php
	$base = __DIR__ . '/../pages/';
	include $base . 'components/__menu.php';
	?>

	<main class="main wrapper-1440 scroll-reveal">
		<section id="legal-dynamic-content">
			<?php include $base . 'legal__mentions/__mentions-noscript.php'; ?>
		</section>
	</main>

	<?php include $base . 'components/__footer.php'; ?>

	<!-- JS global -->
	<script type="module" src="/src/js/main.ts"></script>
</body>

</html>
