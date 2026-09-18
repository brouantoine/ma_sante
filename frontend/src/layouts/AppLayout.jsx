/*
 * ============================================================
 * MA SANTÉ - LAYOUT PRINCIPAL DE L'APPLICATION
 * ============================================================
 *
 * Ce fichier définit la structure générale de l'application
 * après authentification.
 *
 * ------------------------------------------------------------
 * ORGANISATION DE L'INTERFACE
 * ------------------------------------------------------------
 *
 * ┌───────────────────────────────────────────────────────────┐
 * │ ♥ MA SANTÉ                         🔔   👤 Utilisateur      │
 * ├────────────────┬──────────────────────────────────────────┤
 * │                │                                          │
 * │ Déconnexion    │                                          │
 * │                │          CONTENU DE LA PAGE              │
 * │                │                                          │
 * │                │          <Outlet />                      │
 * │                │                                          │
 * └────────────────┴──────────────────────────────────────────┘
 *
 * ------------------------------------------------------------
 * IMPORTANT
 * ------------------------------------------------------------
 *
 * L'ancienne liste des modules dans la sidebar a été supprimée.
 *
 * Les modules sont maintenant affichés dans :
 *
 *     /modules
 *
 * via le composant :
 *
 *     src/pages/Modules.jsx
 *
 * La sidebar contient uniquement :
 *
 *     → Déconnexion
 *
 * ------------------------------------------------------------
 * RESPONSABILITÉS DE CE FICHIER
 * ------------------------------------------------------------
 *
 * 1. Afficher le header MA SANTÉ.
 * 2. Afficher l'utilisateur connecté.
 * 3. Afficher les notifications.
 * 4. Afficher le bouton Déconnexion.
 * 5. Afficher les pages avec <Outlet />.
 * 6. Gérer l'affichage responsive sur mobile.
 *
 * ============================================================
 */


/*
 * ============================================================
 * IMPORTS REACT ROUTER
 * ============================================================
 *
 * Outlet :
 * Permet d'afficher automatiquement la page correspondant
 * à la route actuelle.
 *
 * useNavigate :
 * Permet de rediriger l'utilisateur après sa déconnexion.
 */

import {
  Outlet,
  useNavigate
} from "react-router-dom";


/*
 * ============================================================
 * ICÔNES
 * ============================================================
 */

import {
  LogOut,
  Menu,
  X,
  Bell,
  HeartPulse
} from "lucide-react";


/*
 * ============================================================
 * REACT
 * ============================================================
 */

import {
  useState
} from "react";


/*
 * ============================================================
 * CONTEXTE D'AUTHENTIFICATION
 * ============================================================
 *
 * useAuth permet de récupérer :
 *
 * user   → utilisateur actuellement connecté
 *
 * logout → fonction permettant de fermer sa session
 */

import {
  useAuth
} from "../context/AuthContext";


/*
 * ============================================================
 * COMPOSANT APP LAYOUT
 * ============================================================
 */

export default function AppLayout() {


  /*
   * ==========================================================
   * AUTHENTIFICATION
   * ==========================================================
   *
   * On récupère les informations de l'utilisateur connecté
   * depuis AuthContext.
   */

  const {
    user,
    logout
  } = useAuth();


  /*
   * ==========================================================
   * NAVIGATION
   * ==========================================================
   *
   * useNavigate permet de retourner à la page de connexion
   * après une déconnexion.
   */

  const navigate = useNavigate();


  /*
   * ==========================================================
   * MENU MOBILE
   * ==========================================================
   *
   * false :
   *     la sidebar est fermée.
   *
   * true :
   *     la sidebar est ouverte.
   */

  const [open, setOpen] = useState(false);


  /*
   * ==========================================================
   * FONCTION DE DÉCONNEXION
   * ==========================================================
   *
   * Lorsque l'utilisateur clique sur Déconnexion :
   *
   * 1. logout() ferme la session.
   * 2. navigate() renvoie vers /login.
   *
   */

  function handleLogout() {

    /*
     * Suppression des informations d'authentification.
     */

    logout();


    /*
     * Retour à la page de connexion.
     *
     * replace: true empêche l'utilisateur de revenir
     * à la page protégée avec le bouton "Précédent".
     */

    navigate(
      "/login",
      {
        replace: true
      }
    );

  }


  /*
   * ==========================================================
   * INITIALe DE L'UTILISATEUR
   * ==========================================================
   *
   * Exemple :
   *
   * Fidèle N'DRI
   *
   * affichera :
   *
   * F
   *
   * Si le prénom n'est pas disponible, on utilise le début
   * du username.
   *
   * Si aucune information n'est disponible :
   *
   * U = Utilisateur
   */

  const userInitial = (
    user?.first_name?.[0] ||
    user?.username?.[0] ||
    "U"
  ).toUpperCase();


  /*
   * ==========================================================
   * NOM COMPLET
   * ==========================================================
   *
   * On évite d'afficher "undefined" lorsqu'une information
   * n'est pas disponible.
   */

  const userFullName = [

    user?.first_name,
    user?.last_name

  ]
    .filter(Boolean)
    .join(" ") || "Utilisateur";


  /*
   * ==========================================================
   * RÔLE DE L'UTILISATEUR
   * ==========================================================
   *
   * role_label est privilégié car il contient généralement
   * le nom lisible du rôle.
   *
   * Exemple :
   *
   * role       = DOCTOR
   *
   * role_label = Médecin
   */

  const userRole =
    user?.role_label ||
    user?.role ||
    "Utilisateur";


  /*
   * ==========================================================
   * AFFICHAGE
   * ==========================================================
   */

  return (

    <div className="app-shell">


      {/* ======================================================
          SIDEBAR
          ======================================================

          La sidebar ne contient désormais plus la liste
          complète des modules.

          Elle contient uniquement le bouton :
          
              Déconnexion

          Les modules sont affichés dans Modules.jsx.
      ====================================================== */}

      <aside
        className={`sidebar ${
          open
            ? "sidebar-open"
            : ""
        }`}
      >


        {/* ====================================================
            EN-TÊTE DE LA SIDEBAR
            ==================================================== */}

        <div className="brand-block">


          {/* --------------------------------------------------
              LOGO MÉDICAL
             -------------------------------------------------- */}

          <div className="brand-mark">

            <HeartPulse
              size={27}
              strokeWidth={2.5}
            />

          </div>


          {/* --------------------------------------------------
              NOM DE L'APPLICATION
             -------------------------------------------------- */}

          <div>

            <div className="brand-title">

              <span>
                MA
              </span>

              {" "}

              <b>
                SANTÉ
              </b>

            </div>


            <div className="brand-subtitle">
              Clinique & Gestion Hospitalière
            </div>

          </div>


          {/* --------------------------------------------------
              FERMETURE DU MENU SUR MOBILE
             -------------------------------------------------- */}

          <button
            className="mobile-close"
            onClick={() => setOpen(false)}
            type="button"
            aria-label="Fermer le menu"
          >

            <X
              size={20}
            />

          </button>

        </div>


        {/* ====================================================
            NAVIGATION
            ====================================================

            IMPORTANT :
            Aucun module n'est affiché ici.

            L'utilisateur accède aux modules depuis la page :

                /modules
        ==================================================== */}

        <nav className="nav-list">


          {/* ==================================================
              BOUTON DÉCONNEXION
              ==================================================

              C'est désormais le SEUL bouton présent dans
              la partie navigation de la sidebar.
          ================================================== */}

          <button
            className="nav-item logout-navigation"
            onClick={handleLogout}
            type="button"
            title="Déconnexion"
          >

            <LogOut
              size={20}
              strokeWidth={2}
            />

            <span>
              Déconnexion
            </span>

          </button>


        </nav>


        {/* ====================================================
            ESPACE UTILISATEUR
            ====================================================

            On affiche ici uniquement les informations du
            compte actuellement connecté.

            Il n'y a PAS de deuxième bouton Déconnexion.
        ==================================================== */}

        <div className="sidebar-footer">


          {/* --------------------------------------------------
              INFORMATIONS UTILISATEUR
             -------------------------------------------------- */}

          <div className="user-mini">


            {/* Avatar */}

            <div className="avatar">

              {userInitial}

            </div>


            {/* Nom et rôle */}

            <div>

              <strong>
                {userFullName}
              </strong>

              <small>
                {userRole}
              </small>

            </div>


          </div>


        </div>


      </aside>


      {/* ======================================================
          ZONE PRINCIPALE
          ====================================================== */}

      <div className="main-area">


        {/* ====================================================
            BARRE SUPÉRIEURE
            ==================================================== */}

        <header className="topbar">


          {/* --------------------------------------------------
              BOUTON MENU MOBILE
             --------------------------------------------------

              Ce bouton apparaît principalement sur les
              petits écrans.

              Il permet d'ouvrir la sidebar.
          -------------------------------------------------- */}

          <button
            className="mobile-menu"
            onClick={() => setOpen(true)}
            type="button"
            aria-label="Ouvrir le menu"
          >

            <Menu
              size={23}
              strokeWidth={2}
            />

          </button>


          {/* --------------------------------------------------
              IDENTITÉ DE L'APPLICATION
             -------------------------------------------------- */}

          <div className="topbar-brand-container">


            <div className="top-brand">

              MA{" "}

              <span>
                SANTÉ
              </span>

            </div>


            <div className="top-slogan">

              Clinique & Gestion Hospitalière

            </div>


          </div>


          {/* --------------------------------------------------
              ACTIONS À DROITE DU HEADER
             -------------------------------------------------- */}

          <div className="top-actions">


            {/* ================================================
                NOTIFICATIONS
                ================================================ */}

            <button
              className="icon-button"
              title="Notifications"
              type="button"
            >

              <Bell
                size={19}
                strokeWidth={2}
              />


              {/* ----------------------------------------------
                  BADGE DE NOTIFICATION
                 ---------------------------------------------- */}

              <span className="notification-badge">

                3

              </span>

            </button>


            {/* ================================================
                UTILISATEUR CONNECTÉ
                ================================================ */}

            <div className="top-user">


              {/* Avatar */}

              <div className="avatar small">

                {userInitial}

              </div>


              {/* Nom + rôle */}

              <div>

                <strong>
                  {userFullName}
                </strong>

                <small>
                  {userRole}
                </small>

              </div>


            </div>


          </div>


        </header>


        {/* ====================================================
            CONTENU DES PAGES
            ====================================================

            <Outlet /> permet à React Router d'afficher
            automatiquement la page correspondant à la route.

            Exemple :

            /modules
            └── Modules.jsx

            /patients
            └── Patients.jsx

            /appointments
            └── Appointments.jsx

            /consultations
            └── Consultations.jsx

            etc.
        ==================================================== */}

        <main className="page-content">

          <Outlet />

        </main>


      </div>


      {/* ======================================================
          OVERLAY MOBILE
          ======================================================

          Lorsque la sidebar est ouverte sur téléphone,
          cet overlay recouvre le reste de l'écran.

          Un clic dessus ferme la sidebar.
      ====================================================== */}

      {open && (

        <button
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
          type="button"
          aria-label="Fermer le menu"
        />

      )}


    </div>

  );

}