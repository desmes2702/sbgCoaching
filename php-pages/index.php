<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Coaching sportif professionnel, individuel et en groupe. Découvrez nos services adaptés à vos besoins et vos objectifs.">
	<title>Accueil | Coaching Sportif</title>
</head>

<?php
$currentPage = 'index';
// Inclusion sécurisée d’un partial spécifique à une page
include realpath(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'pages' . DIRECTORY_SEPARATOR . 'includePath.php');
?>

<body class="page__accueil" data-page="$currentPage" data-module="links faq scrollReveal">
	<div class="wrapper-1440-black">
		<?php
		includeComponent('__menu');
		?>
	</div>

	<main class="main">
		<?php
		includePartial('__hero', $currentPage);
		?>

		<?php
		includePartial('__program', $currentPage);
		?>

		<?php
		includePartial('__coaching-business', $currentPage);
		?>

		<?php
		includePartial('__testimonials', $currentPage);
		?>
		<?php
		includePartial('__offline-info', $currentPage);
		?>
	</main>

	<?php
	includeComponent('__faq');
	?>

	<?php
	includeComponent('__footer');
	?>

	<script type="module" src="/src/js/main.ts"></script>
</body>

</html>
