import type { FaqBundle } from '@/js/types/faqTypes.ts';

export const faqBundles: FaqBundle[] = [
  // Accueil (/)
  {
    routes: [/^\/$/],
    items: [
      { question: 'Combien de temps pour voir des résultats ?',
        answer: 'La plupart constatent des progrès en 4 à 6 semaines avec 2–3 séances/semaine et une hygiène de vie adaptée.' },
      { question: 'Intervenez-vous à Liège et alentours ?',
        answer: 'Oui, à Liège et communes proches (Flémalle, Grâce-Hollogne…), en entreprise ou à domicile.' },
      { question: 'Vos séances conviennent-elles aux débutants ?',
        answer: 'Oui, chaque programme est individualisé selon votre niveau, vos objectifs et vos contraintes de santé.' },
      { question: 'Proposez-vous un essai ou un bilan ?',
        answer: 'Un bilan initial sert à clarifier vos objectifs, vos disponibilités et un plan d’action réaliste.' },
    ],
  },

  // Coaching général (/coaching-general)
  {
    routes: [/^\/coaching-general\/?$/],
    items: [
      { question: 'Quelles formules en coaching général ?',
        answer: 'Séances individuelles ou petit groupe, à domicile, en extérieur ou en salle, avec suivi de progression.' },
      { question: 'Comment fixez-vous les objectifs ?',
        answer: 'Entretien + tests simples pour définir des objectifs mesurables (santé, performance, silhouette).' },
      { question: 'Faut-il du matériel spécifique ?',
        answer: 'Non, nous nous adaptons et apportons l’essentiel. On exploite l’environnement disponible.' },
      { question: 'Et en cas de douleur ou reprise ?',
        answer: 'Contenu et intensité ajustés, en lien avec vos contraintes et, si besoin, votre professionnel de santé.' },
    ],
  },

  // Coaching entreprise (/coaching-entreprise)
  {
    routes: [/^\/coaching-entreprise\/?$/],
    items: [
      { question: 'Quels bénéfices pour l’entreprise ?',
        answer: 'Bien-être accru, cohésion d’équipe, baisse du stress/absentéisme et meilleure productivité.' },
      { question: 'Comment organiser sur site ?',
        answer: 'Créneaux adaptés (pause midi, fin de journée), matériel mobile, formats courts si nécessaire.' },
      { question: 'Et pour des équipes sédentaires ?',
        answer: 'Progressif et sécurisé : mobilité, cardio-renfo modéré, récupération, options low impact.' },
      { question: 'Personnalisation par métiers/équipes ?',
        answer: 'Oui, contenus calibrés selon contraintes (postures, horaires, espaces, culture interne).' },
    ],
  },

  // À propos (/a-propos)
  {
    routes: [/^\/a-propos\/?$/],
    items: [
      { question: 'Votre approche de coaching ?',
        answer: 'Personnalisée, progressive, orientée résultats, avec suivi régulier de la charge et des sensations.' },
      { question: 'Débutants et athlètes ?',
        answer: 'Oui, du débutant à l’athlète, avec plans adaptés au niveau, au temps et aux objectifs.' },
      { question: 'Certifications ou références ?',
        answer: 'Coach diplômé, expérience en entreprise et en accompagnement individuel à Liège et Huy.' },
      { question: 'Premier contact : déroulé ?',
        answer: 'Échange de besoins, bilan, puis proposition claire et adaptée.' },
    ],
  },

  // Témoignages (/temoignages)
  {
    routes: [/^\/temoignages\/?$/],
    items: [
      { question: 'Origine des témoignages ?',
        answer: 'Clients suivis à Liège/Huy, en individuel, groupe et entreprise, avec accord de publication.' },
      { question: 'Contacter un ancien client ?',
        answer: 'Possible sur accord, en respectant la confidentialité et le cadre légal.' },
      { question: 'Résultats mesurables affichés ?',
        answer: 'Oui, quand pertinent : temps de course, charges, fréquence d’entraînement, douleur perçue.' },
      { question: 'Résultats garantis ?',
        answer: 'Ils dépendent de l’assiduité, du sommeil, de la nutrition et du stress. Objectifs réalistes et suivis.' },
    ],
  },

  // Vidéos (/coaching-sportif-video)
  {
    routes: [/^\/coaching-sportif-video\/?$/],
    items: [
      { question: 'Utilité des vidéos ?',
        answer: 'Illustrer l’exécution précise, améliorer la technique et l’autonomie en sécurité.' },
      { question: 'Remplacent-elles l’accompagnement ?',
        answer: 'Elles complètent le coaching, mais ne remplacent pas l’individualisation ni les corrections en direct.' },
      { question: 'Filtres par niveau/objectif ?',
        answer: 'Oui, par thématique (mobilité, renfo, cardio…), avec niveaux et points clés.' },
      { question: 'Peu de temps : que prioriser ?',
        answer: 'Formats 10–20 min guidés selon vos besoins (dos, épaules, cardio, HIIT doux).' },
    ],
  },

  // Programme (/programme)
  {
    routes: [/^\/programme\/?$/],
    items: [
      { question: 'Disponibilité du programme ?',
        answer: 'Très bientôt. Laissez vos coordonnées pour être prévenu de la mise en ligne.' },
      { question: 'Contenu prévu ?',
        answer: 'Plans structurés, progressifs et modulables selon niveau, matériel et emploi du temps.' },
      { question: 'Suivi à distance ?',
        answer: 'Oui, accompagnement et ajustements selon la formule choisie.' },
      { question: 'Douleurs chroniques : adapté ?',
        answer: 'Variantes sécurisées et recommandations, en concertation avec votre soignant si besoin.' },
    ],
  },

  // RDV (/rdv)
  {
    routes: [/^\/rdv\/?$/],
    items: [
      { question: 'Réserver un rendez-vous ?',
        answer: 'Choisissez un créneau via le formulaire ; confirmation rapide par e-mail.' },
      { question: 'Types de séances réservable ?',
        answer: 'Bilan initial, coaching individuel, duo/groupe, ou intervention en entreprise.' },
      { question: 'Que préparer au premier RDV ?',
        answer: 'Tenue confortable, disponibilités, antécédents pertinents et objectifs prioritaires.' },
      { question: 'Déplacer ou annuler ?',
        answer: 'Oui, prévenez au plus tôt ; modalités précisées dans l’e-mail.' },
    ],
  },

  // Contact (/contact)
  {
    routes: [/^\/contact\/?$/],
    items: [
      { question: 'Meilleur moyen de vous joindre ?',
        answer: 'Le formulaire de contact est idéal ; appel possible selon vos disponibilités.' },
      { question: 'Délai de réponse ?',
        answer: 'En général sous 24–48 h ouvrées, avec une réponse adaptée à vos objectifs.' },
      { question: 'Intervention à la Route de Yernée 264 ?',
        answer: 'Oui, adresse de référence ; séances possibles sur site client ou à domicile.' },
      { question: 'Devis pour entreprises ?',
        answer: 'Oui, sur demande avec périmètre, fréquence, contraintes et objectifs.' },
    ],
  },

  // Mentions légales (/mentions-legales)
  {
    routes: [/^\/mentions-legales\/?$/],
    items: [
      { question: 'Qui est l’éditeur du site ?',
        answer: 'SBG Coaching. Coordonnées et mentions obligatoires figurent sur cette page.' },
      { question: 'Qui héberge le site ?',
        answer: 'L’hébergeur est indiqué dans la section dédiée (nom, adresse, contacts).' },
      { question: 'Signaler un contenu litigieux ?',
        answer: 'Utilisez la page contact avec les informations utiles ; traitement dans les meilleurs délais.' },
      { question: 'Limites de responsabilité ?',
        answer: 'Mentionnées concernant l’accès, l’utilisation et le contenu du site.' },
    ],
  },

  // Politique de confidentialité (/politique-de-confidentialite)
  {
    routes: [/^\/politique-de-confidentialite\/?$/],
    items: [
      { question: 'Quelles données collectez-vous ?',
        answer: 'Uniquement les informations nécessaires (contact, rendez-vous) selon les bases légales applicables.' },
      { question: 'Comment protégez-vous les données ?',
        answer: 'Mesures techniques et organisationnelles ; accès limité au personnel autorisé.' },
      { question: 'Durée de conservation ?',
        answer: 'Le temps nécessaire aux finalités (gestion client, obligations légales).' },
      { question: 'Comment exercer vos droits ?',
        answer: 'Demandez accès, rectification ou suppression via la page contact.' },
    ],
  },

  // Actualités générales (/actualite-generale)
  {
    routes: [/^\/actualite-generale\/?$/],
    items: [
      { question: 'Quel type d’actualités ?',
        answer: 'Nouveautés, événements à venir, retours d’expérience et contenus bien-être/coaching.' },
      { question: 'Fréquence de mise à jour ?',
        answer: 'Régulièrement selon l’activité (événements, partenariats, publications pédagogiques).' },
      { question: 'Proposer un sujet ?',
        answer: 'Oui, envoyez votre idée via la page contact ; priorité aux sujets utiles à la communauté.' },
      { question: 'Publiez-vous des retours clients ?',
        answer: 'Oui, avec accord préalable, pour illustrer des parcours et bonnes pratiques.' },
    ],
  },
];

