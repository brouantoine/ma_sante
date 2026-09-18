/*
 * ============================================================
 * MA SANTÉ - ROUTES PRINCIPALES DE L'APPLICATION
 * ============================================================
 *
 * Ce fichier définit toutes les routes de l'application React.
 *
 * Fonctionnement :
 *
 * 1. L'utilisateur arrive sur /login s'il n'est pas connecté.
 *
 * 2. Après connexion, "/" redirige vers "/modules".
 *
 * 3. "/modules" constitue la page principale de l'application.
 *
 * 4. "/direction" ouvre directement Direction.jsx.
 *
 * 5. Les autres modules utilisent AppLayout.
 *
 * ============================================================
 */


/* ============================================================
   REACT ROUTER
   ============================================================ */

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";


/* ============================================================
   AUTHENTIFICATION
   ============================================================ */

import { useAuth } from "./context/AuthContext";


/* ============================================================
   PAGES
   ============================================================ */


/* ------------------------------------------------------------
   Page de connexion
   ------------------------------------------------------------ */

import Login from "./pages/Login";


/* ------------------------------------------------------------
   Page principale des modules
   ------------------------------------------------------------ */

import Modules from "./pages/Modules";


/* ------------------------------------------------------------
   Ancien tableau de bord
   ------------------------------------------------------------ */

import Dashboard from "./pages/Dashboard";


/* ------------------------------------------------------------
   MODULE DIRECTION
   ------------------------------------------------------------
   
   Fichier :
       src/pages/Direction.jsx

   URL :
       /direction

   IMPORTANT :
   Direction possède son propre layout complet.
   Elle ne doit donc PAS être placée à l'intérieur
   de AppLayout.
   
   ------------------------------------------------------------ */

import Direction from "./pages/Direction";


/* ------------------------------------------------------------
   ESPACE CAISSE
   ------------------------------------------------------------ */

import Caisse from "./pages/Caisse";


/* ------------------------------------------------------------
   GESTION DES STOCKS
   ------------------------------------------------------------ */

import Stocks from "./pages/Stocks";


/* ------------------------------------------------------------
   FORMULAIRE DE CRÉATION D'UN PATIENT
   ------------------------------------------------------------ */

import PatientForm from "./pages/PatientForm";


/* ------------------------------------------------------------
   GESTION DES RENDEZ-VOUS
   ------------------------------------------------------------ */

import Appointments from "./pages/Appointments";


/* ------------------------------------------------------------
   GESTION DES RESSOURCES HUMAINES
   ------------------------------------------------------------ */

import Employees from "./pages/employees";


/* ------------------------------------------------------------
   GESTION DES CONSULTATIONS
   ------------------------------------------------------------ */

import Consultations from "./pages/Consultations";


/* ------------------------------------------------------------
   GESTION DE L'HOSPITALISATION
   ------------------------------------------------------------ */

import Hospitalization from "./pages/Hospitalization";


/* ------------------------------------------------------------
   GESTION DE LA FACTURATION
   ------------------------------------------------------------ */

import Billing from "./pages/Billing";


/* ------------------------------------------------------------
   GESTION DU LABORATOIRE
   ------------------------------------------------------------ */

import Laboratory from "./pages/Laboratory";


/* ------------------------------------------------------------
   GESTION DE LA PHARMACIE
   ------------------------------------------------------------ */

import Pharmacy from "./pages/pharmacy";


/* ------------------------------------------------------------
   SOINS INFIRMIERS
   ------------------------------------------------------------ */

import Nursing from "./pages/Nursing";


/* ------------------------------------------------------------
   PAGES TEMPORAIRES
   ------------------------------------------------------------ */

import PlaceholderPage from "./pages/PlaceholderPage";


/* ------------------------------------------------------------
   RAPPORTS
   ------------------------------------------------------------ */

import Reports from "./pages/Reports";


/* ============================================================
   LAYOUT PRINCIPAL
   ============================================================ */

import AppLayout from "./layouts/AppLayout";


/* ============================================================
   PROTECTION DES ROUTES
   ============================================================ */

function Protected({ children }) {

  /*
   * Récupération du token d'authentification.
   */

  const { token } = useAuth();


  /*
   * Si l'utilisateur est connecté :
   *     → affichage de la page.
   *
   * Sinon :
   *     → retour vers /login.
   */

  return token
    ? children
    : <Navigate to="/login" replace />;
}


/* ============================================================
   APPLICATION PRINCIPALE
   ============================================================ */

export default function App() {

  return (

    <Routes>


      {/* ======================================================
          PAGE DE CONNEXION
          ====================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* ======================================================
          MODULE DIRECTION
          ======================================================

          IMPORTANT :

          Direction est volontairement placée HORS de
          AppLayout.

          Pourquoi ?

          Direction.jsx possède déjà :

          - son propre logo MA SANTE
          - son propre menu
          - sa propre barre supérieure
          - son propre profil Directeur
          - son propre dashboard

          Si on la mettait dans AppLayout, les deux layouts
          seraient affichés en même temps.

          Cela provoquerait notamment :

          - MA SANTÉ affiché deux fois
          - le menu affiché deux fois
          - Patients aujourd'hui pouvant apparaître dans
            une interface imbriquée
          - deux barres supérieures

          Structure :

              /direction
                   ↓
              Protected
                   ↓
              Direction.jsx

          ====================================================== */}

      <Route
        path="/direction"
        element={
          <Protected>
            <Direction />
          </Protected>
        }
      />


      {/* ======================================================
          APPLICATION PRINCIPALE
          ======================================================

          Tous les autres modules utilisent AppLayout.

          Structure :

              /
              ↓
          Protected
              ↓
          AppLayout
              ↓
          module

          ====================================================== */}

      <Route
        path="/"
        element={
          <Protected>
            <AppLayout />
          </Protected>
        }
      >


        {/* ====================================================
            PAGE D'ACCUEIL
            ==================================================== */}

        <Route
          index
          element={
            <Navigate
              to="/modules"
              replace
            />
          }
        />


        {/* ====================================================
            MODULES DE L'APPLICATION
            ==================================================== */}

        <Route
          path="modules"
          element={<Modules />}
        />


        {/* ====================================================
            MODULE : CAISSE
            ====================================================

            URL :
                /caisse

            Fichier :
                pages/Caisse.jsx

            ==================================================== */}

        <Route
          path="caisse"
          element={<Caisse />}
        />


        {/* ====================================================
            MODULE : GESTION DES STOCKS
            ====================================================

            URL :
                /stocks

            Fichier :
                pages/Stocks.jsx

            ==================================================== */}

        <Route
          path="stocks"
          element={<Stocks />}
        />


        {/* ====================================================
            MODULE : TABLEAU DE BORD
            ==================================================== */}

        <Route
          path="dashboard"
          element={<Dashboard />}
        />


        {/* ====================================================
            CRÉATION D'UN PATIENT
            ====================================================

            URL :
                /patients/new

            ==================================================== */}

        <Route
          path="patients/new"
          element={<PatientForm />}
        />


        {/* ====================================================
            MODULE : RENDEZ-VOUS
            ==================================================== */}

        <Route
          path="appointments"
          element={<Appointments />}
        />


        {/* ====================================================
            MODULE : CONSULTATIONS
            ====================================================

            URL :
                /consultations

            Fichier :
                pages/Consultations.jsx

            ==================================================== */}

        <Route
          path="consultations"
          element={<Consultations />}
        />


        {/* ====================================================
            MODULE : HOSPITALISATION
            ====================================================

            URL :
                /hospitalization

            Fichier :
                pages/Hospitalization.jsx

            ==================================================== */}

        <Route
          path="hospitalization"
          element={<Hospitalization />}
        />


        {/* ====================================================
            MODULE : COMPTABILITÉ / FACTURATION
            ====================================================

            URL :
                /billing

            Fichier :
                pages/Billing.jsx

            ==================================================== */}

        <Route
          path="billing"
          element={<Billing />}
        />


        {/* ====================================================
            MODULE : LABORATOIRE
            ====================================================

            URL :
                /laboratory

            Fichier :
                pages/Laboratory.jsx

            ==================================================== */}

        <Route
          path="laboratory"
          element={<Laboratory />}
        />


        {/* ====================================================
            MODULE : PHARMACIE
            ====================================================

            URL :
                /pharmacy

            Fichier :
                pages/pharmacy.jsx

            ==================================================== */}

        <Route
          path="pharmacy"
          element={<Pharmacy />}
        />


        {/* ====================================================
            MODULE : SOINS INFIRMIERS
            ====================================================

            URL :
                /nursing

            Fichier :
                pages/Nursing.jsx

            ==================================================== */}

        <Route
          path="nursing"
          element={<Nursing />}
        />


        {/* ====================================================
            MODULE : RESSOURCES HUMAINES
            ====================================================

            URL :
                /employees

            Fichier :
                pages/employees.jsx

            IMPORTANT :

            AVANT :
                PlaceholderPage

            MAINTENANT :
                Employees

            Donc le clic sur Ressources humaines ouvre
            directement employees.jsx.

            ==================================================== */}

        <Route
          path="employees"
          element={<Employees />}
        />


        {/* ====================================================
            MODULE : ÉQUIPEMENTS MÉDICAUX
            ==================================================== */}

        <Route
          path="equipments"
          element={
            <PlaceholderPage
              title="Équipements médicaux"
            />
          }
        />


        {/* ====================================================
            MODULE : MAINTENANCE
            ==================================================== */}

        <Route
          path="maintenance"
          element={
            <PlaceholderPage
              title="Maintenance"
            />
          }
        />


        {/* ====================================================
            MODULE : RAPPORTS ET STATISTIQUES
            ====================================================

            URL :
                /reports

            Fichier :
                pages/Reports.jsx

            IMPORTANT :

            Reports reste complètement indépendant de
            Direction.

            ==================================================== */}

        <Route
          path="reports"
          element={<Reports />}
        />


        {/* ====================================================
            MODULE : INTELLIGENCE ARTIFICIELLE
            ==================================================== */}

        <Route
          path="ai-assistant"
          element={
            <PlaceholderPage
              title="Intelligence artificielle"
            />
          }
        />


        {/* ====================================================
            PARAMÈTRES
            ==================================================== */}

        <Route
          path="settings"
          element={
            <PlaceholderPage
              title="Paramètres"
            />
          }
        />


      </Route>


      {/* ======================================================
          ROUTE PAR DÉFAUT
          ======================================================

          Toute URL inconnue retourne vers l'accueil.

          ====================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />


    </Routes>

  );
}