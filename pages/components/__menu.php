<header class="header">
    <div class="header__container">
        <div class="header__logo">
            <a href="index.php" class="header__logo-link"><img id="menu__logo" src="img/logo.svg" alt="Logo SBG"></a>
        </div>
        <nav class="header__nav">
            <ul class="header__nav-list">
                <li class="header__nav-item"><span>coaching</span><a href="entreprise.php" class="header__nav-link">Entreprise</a></li>
                <li class="header__nav-item"><span>coaching</span><a href="general.php" class="header__nav-link">Général</a></li>
            </ul>
        </nav>
        <button class="header__btn__menu menu__toggle" aria-label="Ouvrir le menu"><img id="menu__icon" src="img/icon__burger.svg" alt="Ouvrir le menu"></button>
    </div>
</header>

<div class="menu">
    <button class="menu__close" aria-label="Fermer le menu"><img src="img/icon__close.svg" alt="Fermer le menu"></button>
    <nav class="menu__nav">
        <section class="menu__section">
            <h2 class="menu__title">Informations</h2>
            <ul class="menu__list">
                <li class="menu__item"><a href="index.php" class="menu__link">Accueil</a></li>
                <li class="menu__item"><a href="testimonials.php" class="menu__link">Témoignages</a></li>
                <li class="menu__item"><a href="about.php" class="menu__link">À Propos</a></li>
                <li class="menu__item"><a href="contact.php" class="menu__link">Contact</a></li>
                <li class="menu__item menu__item__rdv"><a href="rdv.php" class="menu__link">Prise de rendez-vous</a></li>
            </ul>
        </section>
        <section class="menu__section">
            <h2 class="menu__title">Coaching</h2>
            <ul class="menu__list">
                <li class="menu__item"><a href="entreprise.php" class="menu__link">Entreprise</a></li>
                <li class="menu__item"><a href="program.php" class="menu__link">Programmes</a></li>
                <li class="menu__item"><a href="general.php" class="menu__link">Général</a></li>
            </ul>
        </section>
        <section class="menu__section menu__section__profil">
            <h2 class="menu__title">Mon espace</h2>
            <ul class="menu__list">
                <li class="menu__item menu__item__program"><a href="#my-programs" class="menu__link">Mes programmes</a></li>
                <li class="menu__item menu__item__info"><a href="#my-info" class="menu__link">Mes informations</a></li>
                <li class="menu__item menu__item__disconnect"><a href="#logout" class="menu__link">Se déconnecter</a></li>
            </ul>
        </section>
        <?php
        includeComponent('__links-social-menu');
        ?>
    </nav>
</div>
