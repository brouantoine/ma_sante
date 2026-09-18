/*
 * ============================================================
 * MA SANTÉ - PAGE DES MODULES
 * ============================================================
 *
 * Cette page constitue la page d'accueil de l'application
 * après authentification.
 *
 * Elle affiche les différents modules disponibles dans
 * l'application sous forme de cartes.
 *
 * IMPORTANT :
 *
 * - L'administrateur attribue des modules à un utilisateur.
 * - L'utilisateur connecté ne voit que les modules autorisés.
 * - L'administrateur peut voir tous les modules.
 * - La recherche permet de retrouver rapidement un module.
 *
 * ============================================================
 */

import { useMemo, useState } from "react";

import { Link } from "react-router-dom";

import {
  Search,
  X,
  Filter,
  Users,
  CalendarDays,
  Stethoscope,
  BedDouble,
  HeartPulse,
  FlaskConical,
  Pill,
  Package,
  Calculator,
  UserRoundCog,
  Building2,
  Wrench,
  ShoppingCart,
  FileText,
  ShieldCheck,
  Headphones,
  Archive,
  Bot,
  ChevronRight,
  Info,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import "../styles/modules.css";


/*
 * ============================================================
 * LISTE DE TOUS LES MODULES
 * ============================================================
 */

const ALL_MODULES = [

  /* ==========================================================
     CAISSE
     ==========================================================

     IMPORTANT :
     Le module conserve l'id "patients" afin de ne pas casser
     le système actuel de droits par rôle.

     MAIS son chemin est maintenant :

         /caisse

     Ainsi, lorsqu'on clique sur Caisse, on ouvre :

         pages/Caisse.jsx

  ========================================================== */

  {
    id: "patients",

    name: "Caisse",

    description:
      "Enregistrer les patients, gérer l'accueil et les opérations de caisse",

    path: "/caisse",

    icon: Users,

    color: "blue",
  },


  /* ==========================================================
     RENDEZ-VOUS
  ========================================================== */

  {
    id: "appointments",

    name: "Rendez-vous",

    description:
      "Planifier et gérer les rendez-vous des patients",

    path: "/appointments",

    icon: CalendarDays,

    color: "green",
  },


  /* ==========================================================
     CONSULTATIONS
  ========================================================== */

  {
    id: "consultations",

    name: "Consultation Medecine Générale",

    description:
      "Gérer les consultations médicales et les prescriptions",

    path: "/consultations",

    icon: Stethoscope,

    color: "purple",
  },


  /* ==========================================================
     HOSPITALISATION
  ========================================================== */

  {
    id: "hospitalization",

    name: "Hospitalisation",

    description:
      "Gérer les admissions, séjours et sorties des patients",

    path: "/hospitalization",

    icon: BedDouble,

    color: "red",
  },


  /* ==========================================================
     SOINS INFIRMIERS
  ========================================================== */

  {
    id: "nursing",

    name: "Soins infirmiers",

    description:
      "Saisir les soins, surveillances et traitements",

    path: "/nursing",

    icon: HeartPulse,

    color: "cyan",
  },


  /* ==========================================================
     LABORATOIRE
  ========================================================== */

  {
    id: "laboratory",

    name: "Laboratoire",

    description:
      "Gérer les analyses et résultats de laboratoire",

    path: "/laboratory",

    icon: FlaskConical,

    color: "orange",
  },


  /* ==========================================================
     PHARMACIE
  ========================================================== */

  {
    id: "pharmacy",

    name: "Pharmacie",

    description:
      "Gérer les médicaments, ordonnances et stocks pharmaceutiques",

    path: "/pharmacy",

    icon: Pill,

    color: "pink",
  },


  /* ==========================================================
     STOCKS
  ========================================================== */

  {
    id: "stocks",

    name: "Gestion des stocks",

    description:
      "Suivre les stocks de médicaments, matériel et consommables",

    path: "/stocks",

    icon: Package,

    color: "blue-dark",
  },


  /* ==========================================================
     COMPTABILITÉ
  ========================================================== */

  {
    id: "accounting",

    name: "Comptabilité",

    description:
      "Gérer la facturation, les paiements et les rapports financiers",

    path: "/billing",

    icon: Calculator,

    color: "purple",
  },


  /* ==========================================================
     RESSOURCES HUMAINES
  ========================================================== */

  {
    id: "hr",

    name: "Ressources humaines",

    description:
      "Gérer le personnel, les congés et les plannings",

    path: "/employees",

    icon: UserRoundCog,

    color: "green-dark",
  },


  /* ==========================================================
     DIRECTION
  ========================================================== */

  {
  id: "direction",
  name: "Direction",
  description:
    "Tableau de bord de la direction et suivi de l'activité de l'établissement",
  path: "/direction",
  icon: Building2,
  color: "yellow",
},


  /* ==========================================================
     MAINTENANCE
  ========================================================== */

  {
    id: "maintenance",

    name: "Maintenance",

    description:
      "Gérer les interventions et la maintenance des équipements",

    path: "/maintenance",

    icon: Wrench,

    color: "gray",
  },


  /* ==========================================================
     APPROVISIONNEMENT
  ========================================================== */

  {
    id: "procurement",

    name: "Approvisionnement",

    description:
      "Gérer les commandes et les fournisseurs",

    path: "/procurement",

    icon: ShoppingCart,

    color: "red",
  },


  /* ==========================================================
     RAPPORTS ET STATISTIQUES
  ========================================================== */

  {
    id: "reports",

    name: "Rapports et statistiques",

    description:
      "Consulter les rapports et les indicateurs clés",

    path: "/reports",

    icon: FileText,

    color: "blue-light",
  },


  /* ==========================================================
     ADMINISTRATION
  ========================================================== */

  {
    id: "administration",

    name: "Administration",

    description:
      "Gérer les utilisateurs, les rôles et les paramètres système",

    path: "/administration",

    icon: ShieldCheck,

    color: "indigo",
  },


  /* ==========================================================
     ACCUEIL / RÉCEPTION
  ========================================================== */

  {
    id: "reception",

    name: "Accueil / Réception",

    description:
      "Gérer l'accueil des patients et les admissions",

    path: "/reception",

    icon: Headphones,

    color: "cyan",
  },


  /* ==========================================================
     HYGIÈNE ET SÉCURITÉ
  ========================================================== */

  {
    id: "hygiene",

    name: "Hygiène et sécurité",

    description:
      "Suivre les contrôles et la sécurité sanitaire",

    path: "/hygiene",

    icon: ShieldCheck,

    color: "green",
  },


  /* ==========================================================
     ARCHIVES
  ========================================================== */

  {
    id: "archives",

    name: "Archives",

    description:
      "Consulter et gérer les dossiers archivés",

    path: "/archives",

    icon: Archive,

    color: "blue-light",
  },


  /* ==========================================================
     INTELLIGENCE ARTIFICIELLE
  ========================================================== */

  {
    id: "ia",

    name: "Intelligence Artificielle",

    description:
      "Assistance intelligente pour l'analyse des informations et l'aide à la décision",
 
    path: "/ia",

    icon: Bot,

    color: "indigo",
  },

];


/*
 * ============================================================
 * DROITS PAR DÉFAUT
 * ============================================================
 */

const DEFAULT_ROLE_MODULES = {


  /* ==========================================================
     ADMINISTRATEUR
     ==========================================================

     L'administrateur possède accès à tous les modules.
  ========================================================== */

  ADMIN: ALL_MODULES.map(
    (module) => module.id
  ),


  /* ==========================================================
     DIRECTEUR
  ========================================================== */

  DIRECTOR: [

    "patients",

    "appointments",

    "consultations",

    "hospitalization",

    "laboratory",

    "pharmacy",

    "stocks",

    "accounting",

    "hr",

    "direction",

    "maintenance",

    "procurement",

    "reports",

    "administration",

    "reception",

    "hygiene",

    "archives",

    "ia",

  ],


  /* ==========================================================
     MÉDECIN
  ========================================================== */

  DOCTOR: [

    "patients",

    "appointments",

    "consultations",

    "hospitalization",

    "laboratory",

    "pharmacy",

    "reports",

    "ia",

  ],


  /* ==========================================================
     INFIRMIER
  ========================================================== */

  NURSE: [

    "patients",

    "appointments",

    "hospitalization",

    "nursing",

    "laboratory",

  ],


  /* ==========================================================
     RÉCEPTIONNISTE
  ========================================================== */

  RECEPTION: [

    "patients",

    "appointments",

    "reception",

  ],


  /* ==========================================================
     LABORANTIN
  ========================================================== */

  LAB: [

    "patients",

    "laboratory",

  ],


  /* ==========================================================
     PHARMACIEN
  ========================================================== */

  PHARMACY: [

    "patients",

    "pharmacy",

    "stocks",

  ],


  /* ==========================================================
     COMPTABLE
  ========================================================== */

  ACCOUNTING: [

    "patients",

    "accounting",

    "reports",

  ],


  /* ==========================================================
     STOCK
  ========================================================== */

  STOCK: [

    "stocks",

    "pharmacy",

    "procurement",

  ],


  /* ==========================================================
     RESSOURCES HUMAINES
  ========================================================== */

  HR: [

    "hr",

    "reports",

  ],


  /* ==========================================================
     MAINTENANCE
  ========================================================== */

  MAINTENANCE: [

    "maintenance",

  ],

};


/*
 * ============================================================
 * COMPOSANT PRINCIPAL
 * ============================================================
 */

export default function Modules() {


  /*
   * ==========================================================
   * AUTHENTIFICATION
   * ==========================================================
   */

  const {
    user,
    logout,
  } = useAuth();


  /*
   * ==========================================================
   * RECHERCHE
   * ==========================================================
   */

  const [
    search,
    setSearch,
  ] = useState("");


  /*
   * ==========================================================
   * DÉCONNEXION
   * ==========================================================
   */

  function handleLogout() {

    logout();

  }


  /*
   * ==========================================================
   * MODULES AUTORISÉS
   * ==========================================================
   */

  const authorizedModules = useMemo(() => {

    /*
     * Si aucun utilisateur n'est connecté,
     * aucun module n'est affiché.
     */

    if (!user) {

      return [];

    }


    /*
     * ========================================================
     * CAS 1 :
     * Le backend fournit directement les modules.
     * ========================================================
     */

    if (Array.isArray(user.modules)) {

      return ALL_MODULES.filter(
        (module) =>
          user.modules.includes(module.id)
      );

    }


    /*
     * ========================================================
     * CAS 2 :
     * Les modules sont déterminés selon le rôle.
     * ========================================================
     */

    const roleModules =
      DEFAULT_ROLE_MODULES[user.role];


    /*
     * Si le rôle n'est pas reconnu,
     * aucun module n'est affiché.
     */

    if (!roleModules) {

      return [];

    }


    /*
     * Retourner uniquement les modules autorisés.
     */

    return ALL_MODULES.filter(
      (module) =>
        roleModules.includes(module.id)
    );

  }, [user]);


  /*
   * ==========================================================
   * FILTRAGE PAR RECHERCHE
   * ==========================================================
   */

  const filteredModules = useMemo(() => {

    const value =
      search
        .trim()
        .toLowerCase();


    /*
     * Si aucune recherche n'est effectuée,
     * afficher tous les modules autorisés.
     */

    if (!value) {

      return authorizedModules;

    }


    /*
     * Rechercher dans le nom et la description.
     */

    return authorizedModules.filter(
      (module) =>

        module.name
          .toLowerCase()
          .includes(value)

        ||

        module.description
          .toLowerCase()
          .includes(value)
    );

  }, [
    search,
    authorizedModules,
  ]);


  /*
   * ==========================================================
   * INITIALES UTILISATEUR
   * ==========================================================
   */

  const initials = (

    user?.first_name?.[0]

    ||

    user?.username?.[0]

    ||

    "U"

  ).toUpperCase();


  /*
   * ==========================================================
   * AFFICHAGE
   * ==========================================================
   */

  return (

    <div className="modules-page">


      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside className="modules-sidebar">

        <div className="sidebar-logout-container">

          <button
            className="modules-logout"
            onClick={handleLogout}
            title="Déconnexion"
            type="button"
          >

            <LogOut
              size={21}
              strokeWidth={2}
            />

            <span>
              Déconnexion
            </span>

          </button>

        </div>

      </aside>


      {/* ======================================================
          ZONE PRINCIPALE
      ====================================================== */}

      <div className="modules-main">


        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className="modules-topbar">


          {/* ==================================================
              LOGO
          ================================================== */}

          <div className="modules-brand">

            <div className="modules-brand-icon">
              ♥
            </div>


            <div>

              <div className="modules-brand-title">
                MA SANTÉ
              </div>

              <div className="modules-brand-subtitle">
                Clinique & Gestion Hospitalière
              </div>

            </div>

          </div>


          {/* ==================================================
              UTILISATEUR
          ================================================== */}

          <div className="modules-user">


            {/* Notification */}

            <div className="modules-notification">

              <span>
                3
              </span>

              🔔

            </div>


            {/* Avatar */}

            <div className="modules-avatar">

              {initials}

            </div>


            {/* Informations utilisateur */}

            <div className="modules-user-information">

              <strong>

                {user?.first_name
                  ||
                  user?.username
                  ||
                  "Utilisateur"}

                {" "}

                {user?.last_name || ""}

              </strong>


              <small>

                {user?.role_label
                  ||
                  "Utilisateur"}

              </small>

            </div>

          </div>

        </header>


        {/* ====================================================
            CONTENU
        ==================================================== */}

        <main className="modules-content">


          <section className="modules-panel">


            {/* ==================================================
                TITRE
            ================================================== */}

            <div className="modules-heading">


              <div className="modules-heading-icon">
                ▦
              </div>


              <div>

                <h1>
                  Modules de l’application
                </h1>


                <p>
                  Voici les différents modules disponibles dans
                  MA SANTÉ. Les modules affichés dépendent de
                  vos droits d’accès.
                </p>

              </div>

            </div>


            {/* ==================================================
                RECHERCHE
            ================================================== */}

            <div className="modules-search-area">


              <div className="modules-search">


                <Search
                  size={23}
                  strokeWidth={2}
                />


                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Rechercher un module par son nom..."
                  aria-label="Rechercher un module"
                />


                {search && (

                  <button
                    className="clear-search"
                    onClick={() =>
                      setSearch("")
                    }
                    title="Effacer la recherche"
                    type="button"
                  >

                    <X
                      size={22}
                    />

                  </button>

                )}

              </div>


              {/* =================================================
                  FILTRE
              ================================================= */}

              <button
                className="all-modules-button"
                type="button"
                title="Modules accessibles"
              >

                <Filter
                  size={18}
                />

                <span>
                  Tous les modules
                </span>

              </button>

            </div>


            {/* ==================================================
                GRILLE DES MODULES
            ================================================== */}

            {filteredModules.length > 0 ? (

              <div className="modules-grid">


                {filteredModules.map(
                  (module) => {

                    const Icon =
                      module.icon;


                    return (

                      <Link
                        key={module.id}
                        to={module.path}
                        className={
                          `module-card module-${module.color}`
                        }
                      >


                        {/* ====================================
                            ICÔNE
                        ==================================== */}

                        <div className="module-icon">

                          <Icon
                            size={39}
                            strokeWidth={2}
                          />

                        </div>


                        {/* ====================================
                            TEXTE
                        ==================================== */}

                        <div className="module-text">

                          <h2>
                            {module.name}
                          </h2>


                          <p>
                            {module.description}
                          </p>

                        </div>


                        {/* ====================================
                            FLÈCHE
                        ==================================== */}

                        <ChevronRight
                          className="module-arrow"
                          size={22}
                          strokeWidth={2}
                        />

                      </Link>

                    );

                  }
                )}

              </div>

            ) : (


              /* =================================================
                 AUCUN MODULE
              ================================================= */

              <div className="modules-empty">


                <Search
                  size={42}
                />


                <h2>
                  Aucun module trouvé
                </h2>


                <p>
                  Aucun module ne correspond à votre recherche.
                </p>


                <button
                  onClick={() =>
                    setSearch("")
                  }
                  type="button"
                >

                  Afficher tous les modules

                </button>

              </div>

            )}


            {/* ==================================================
                INFORMATION
            ================================================== */}

            <div className="modules-information">


              <div className="information-icon">

                <Info
                  size={24}
                />

              </div>


              <div>

                <h3>
                  Recherche de module
                </h3>


                <p>
                  Utilisez la barre de recherche ci-dessus pour
                  trouver rapidement un module par son nom.
                </p>


                <p>
                  Les modules visibles sont déterminés par les
                  droits qui ont été attribués à l'utilisateur.
                </p>

              </div>

            </div>


          </section>


        </main>


      </div>


    </div>

  );

}