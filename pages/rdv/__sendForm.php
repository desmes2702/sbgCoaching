<?php
// Sécurité basique : accepter uniquement les requêtes POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	http_response_code(405); // Méthode non autorisée
	echo 'Méthode non autorisée.';
	exit;
}

// Fonction de nettoyage simple
function sanitize($data)
{
	return htmlspecialchars(stripslashes(trim($data)));
}

// Récupération des données du formulaire
$nom = sanitize($_POST['nom'] ?? '');
$prenom = sanitize($_POST['prenom'] ?? '');
$telephone = sanitize($_POST['telephone'] ?? '');
$email = sanitize($_POST['email'] ?? '');
$type = sanitize($_POST['type'] ?? '');
$duree = sanitize($_POST['duree'] ?? '');
$objectif = sanitize($_POST['objectif'] ?? '');
$precision = sanitize($_POST['precision'] ?? '');
$precisionDuree = sanitize($_POST['precisionDuree'] ?? '');
$age = sanitize($_POST['age'] ?? '');
$fragile = sanitize($_POST['fragile'] ?? '');

// Adresse email de destination
$to = sanitize($_POST['to'] ?? 'samuel.billagarcia@gmail.com');

// Sujet de l'email
$subject = "Nouveau rendez-vous via le formulaire - SBG Coaching";

// Construction du message HTML
$message = "
<html>
<head>
  <meta charset='UTF-8'>
  <title>Demande de rendez-vous</title>
</head>
<body>
  <h2>Nouveau formulaire de prise de rendez-vous</h2>
  <p><strong>Type de coaching :</strong> {$type}</p>
  <p><strong>Durée souhaitée :</strong> {$duree}</p>
  <p><strong>Objectif :</strong> {$objectif}</p>";

if (!empty($precision) || !empty($precisionDuree)) {
	$message .= "<p><strong>Précisions :</strong> {$precision} {$precisionDuree}</p>";
}

$message .= "
  <hr>
  <h3>Informations personnelles</h3>
  <p><strong>Nom :</strong> {$nom} {$prenom}</p>
  <p><strong>Âge :</strong> {$age} ans</p>
  <p><strong>Fragilité :</strong> {$fragile}</p>
  <p><strong>Téléphone :</strong> {$telephone}</p>
  <p><strong>Email :</strong> {$email}</p>
</body>
</html>
";

// Headers pour envoyer un email HTML
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Formulaire SBG Coaching <no-reply@sbgcoaching.com>\r\n";
$headers .= "Reply-To: no-reply@sbgcoaching.com\r\n";

// Envoi de l'email
if (mail($to, $subject, $message, $headers)) {
	echo 'OK';
} else {
	echo 'Erreur lors de l\'envoi de l\'email.';
}
