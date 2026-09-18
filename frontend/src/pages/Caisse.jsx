import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Caisse.css";

/*
|--------------------------------------------------------------------------
| Icônes
|--------------------------------------------------------------------------
*/
function Icon({ name, size = 20 }) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons = {
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </>
    ),

    patient: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),

    billing: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
        <path d="M8 15h5" />
      </>
    ),

    payment: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h3" />
      </>
    ),

    history: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v6h6" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    report: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h17" />
        <path d="m7 15 4-4 3 2 5-6" />
      </>
    ),

    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),

    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
  };

  return <svg {...commonProps}>{icons[name]}</svg>;
}

/*
|--------------------------------------------------------------------------
| Badge du statut
|--------------------------------------------------------------------------
*/
function StatusBadge({ status }) {
  let className = "status-badge";

  if (status === "En attente") {
    className += " status-waiting";
  }

  if (status === "En consultation") {
    className += " status-consultation";
  }

  if (status === "Payé") {
    className += " status-paid";
  }

  return <span className={className}>{status}</span>;
}

/*
|--------------------------------------------------------------------------
| Données de démonstration
|--------------------------------------------------------------------------
*/
const initialPatients = [
  {
    id: "001",
    patient: "TRAORE Awa",
    service: "Médecine",
    doctor: "Dr. KOUAME",
    status: "En attente",
  },
  {
    id: "002",
    patient: "KONE Ibrahim",
    service: "Chirurgie",
    doctor: "Dr. BAH",
    status: "En consultation",
  },
  {
    id: "003",
    patient: "DIALLO Mariam",
    service: "Pédiatrie",
    doctor: "Dr. KONE",
    status: "Payé",
  },
  {
    id: "004",
    patient: "YAO Claude",
    service: "Médecine",
    doctor: "Dr. KOUAME",
    status: "En attente",
  },
];

/*
|--------------------------------------------------------------------------
| Page Caisse
|--------------------------------------------------------------------------
*/
export default function Caisse() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState(initialPatients);

  /*
  |--------------------------------------------------------------------------
  | Recherche patient
  |--------------------------------------------------------------------------
  */
  const filteredPatients = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return patients;
    }

    return patients.filter((item) =>
      [
        item.id,
        item.patient,
        item.service,
        item.doctor,
        item.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [search, patients]);

  /*
  |--------------------------------------------------------------------------
  | Ajouter un patient
  |--------------------------------------------------------------------------
  | Pour le moment, ceci ajoute une donnée de démonstration.
  | Plus tard, cette fonction sera connectée à l'API Django.
  |--------------------------------------------------------------------------
  */
  const handleNewPatient = () => {
    const nextNumber = String(patients.length + 1).padStart(3, "0");

    const newPatient = {
      id: nextNumber,
      patient: "NOUVEAU PATIENT",
      service: "Médecine",
      doctor: "À affecter",
      status: "En attente",
    };

    setPatients((currentPatients) => [
      ...currentPatients,
      newPatient,
    ]);
  };

  return (
    <div className="caisse-page">

      {/* =========================================================
          SIDEBAR
      ========================================================= */}
      <aside className="caisse-sidebar">

        {/* Logo */}
        <div className="caisse-brand">
          <div className="brand-icon">
            ♥
          </div>

          <div className="brand-text">
            <span>MA</span>
            <strong>SANTÉ</strong>
          </div>
        </div>

        {/* Menu */}
        <nav className="caisse-nav">

          <Link
            to="/modules"
            className="caisse-nav-item"
          >
            <Icon name="home" />
            <span>Accueil</span>
          </Link>

          <button
            type="button"
            className="caisse-nav-item active"
          >
            <Icon name="patient" />
            <span>Enregistrer un patient</span>
          </button>

          <Link
            to="/billing"
            className="caisse-nav-item"
          >
            <Icon name="billing" />
            <span>Facturation</span>
          </Link>

          <button
            type="button"
            className="caisse-nav-item"
          >
            <Icon name="payment" />
            <span>Paiements</span>
          </button>

          <button
            type="button"
            className="caisse-nav-item"
          >
            <Icon name="history" />
            <span>Historique</span>
          </button>

          <button
            type="button"
            className="caisse-nav-item"
          >
            <Icon name="report" />
            <span>Bilan</span>
          </button>

          <Link
            to="/reports"
            className="caisse-nav-item"
          >
            <Icon name="report" />
            <span>Rapports</span>
          </Link>

        </nav>
      </aside>

      {/* =========================================================
          CONTENU PRINCIPAL
      ========================================================= */}
      <main className="caisse-content">

        {/* =======================================================
            HEADER
        ======================================================= */}
        <header className="caisse-header">

          <div className="caisse-header-title">
            <h1>Espace Caissier</h1>

            <p>
              Enregistrement / Accueil patient
            </p>
          </div>

          {/* Profil caissière */}
          <div className="cashier-profile">

            <div className="cashier-avatar">
              CF
            </div>

            <div className="cashier-info">
              <strong>
                COULIBALY Fatou
              </strong>

              <span>
                Caissière
              </span>
            </div>

          </div>

        </header>

        {/* =======================================================
            CONTENU
        ======================================================= */}
        <section className="caisse-main">

          {/* =====================================================
              BARRE DE RECHERCHE + NOUVEAU PATIENT
          ===================================================== */}
          <div className="patient-toolbar">

            <div className="search-box">

              <Icon
                name="search"
                size={21}
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Rechercher un patient (nom, téléphone...)"
              />

            </div>

            <button
              type="button"
              className="new-patient-btn"
              onClick={handleNewPatient}
            >
              <Icon
                name="plus"
                size={20}
              />

              <span>
                Nouveau patient
              </span>
            </button>

          </div>

          {/* =====================================================
              TABLEAU PATIENTS
          ===================================================== */}
          <div className="patients-card">

            <div className="table-wrapper">

              <table className="patients-table">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Patient</th>
                    <th>Service</th>
                    <th>Affecté à</th>
                    <th>Statut</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>

                  {filteredPatients.map((item) => (
                    <tr key={item.id}>

                      <td>
                        {item.id}
                      </td>

                      <td className="patient-name">
                        {item.patient}
                      </td>

                      <td>
                        {item.service}
                      </td>

                      <td>
                        {item.doctor}
                      </td>

                      <td>
                        <StatusBadge
                          status={item.status}
                        />
                      </td>

                      <td>
                        <button
                          type="button"
                          className="row-action"
                          aria-label={`Ouvrir ${item.patient}`}
                        >
                          <Icon
                            name="arrow"
                            size={17}
                          />
                        </button>
                      </td>

                    </tr>
                  ))}

                  {filteredPatients.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="empty-row"
                      >
                        Aucun patient trouvé.
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* =====================================================
              BILANS
          ===================================================== */}
          <section className="summary-grid">

            {/* Bilan jour */}
            <article className="summary-card">

              <span className="summary-label">
                Bilan du jour
              </span>

              <strong className="summary-value green">
                450 000 FCFA
              </strong>

              <span className="summary-note">
                Recettes enregistrées aujourd'hui
              </span>

            </article>

            {/* Bilan semaine */}
            <article className="summary-card">

              <span className="summary-label">
                Bilan semaine
              </span>

              <strong className="summary-value green">
                2 850 000 FCFA
              </strong>

              <span className="summary-note">
                Total des recettes de la semaine
              </span>

            </article>

            {/* Bilan mois */}
            <article className="summary-card">

              <span className="summary-label">
                Bilan mois
              </span>

              <strong className="summary-value blue">
                12 450 000 FCFA
              </strong>

              <span className="summary-note">
                Total des recettes du mois
              </span>

            </article>

          </section>

        </section>

      </main>

    </div>
  );
}