/*
 * ============================================================
 * MA SANTE - MODULE DIRECTION
 * ============================================================
 *
 * Dashboard de la Direction Générale
 *
 * Fichier :
 * src/pages/Direction.jsx
 *
 * Style basé sur la maquette fournie.
 * ============================================================
 */

import React from "react";
import "../styles/Direction.css";

import {
  HeartPulse,
  LayoutDashboard,
  Users,
  Stethoscope,
  FlaskConical,
  Pill,
  CreditCard,
  BedDouble,
  Package,
  UserRound,
  Wrench,
  Siren,
  FileText,
  Search,
  Bell,
  ChevronDown,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Activity,
  Database,
  Truck,
  Box,
  AlertTriangle,
  CheckCircle2,
  Clock3,
} from "lucide-react";


/* ============================================================
   DONNÉES DU MENU
   ============================================================ */

const menuItems = [
  {
    label: "Tableau de bord",
    icon: LayoutDashboard,
    path: "/direction",
    active: true,
  },
  {
    label: "Patients",
    icon: Users,
    path: "/patients",
  },
  {
    label: "Consultations",
    icon: Stethoscope,
    path: "/consultations",
  },
  {
    label: "Laboratoire",
    icon: FlaskConical,
    path: "/laboratory",
  },
  {
    label: "Pharmacie",
    icon: Pill,
    path: "/pharmacy",
  },
  {
    label: "Caisse / Facturation",
    icon: CreditCard,
    path: "/billing",
  },
  {
    label: "Hospitalisation / Lits",
    icon: BedDouble,
    path: "/hospitalization",
  },
  {
    label: "Stocks",
    icon: Package,
    path: "/stocks",
  },
  {
    label: "Ressources humaines",
    icon: UserRound,
    path: "/employees",
  },
  {
    label: "Équipements",
    icon: Wrench,
    path: "/equipments",
  },
  {
    label: "Urgences",
    icon: Siren,
    path: "/urgences",
  },
  {
    label: "Rapports & Statistiques",
    icon: FileText,
    path: "/reports",
  },
];


/* ============================================================
   CARTES STATISTIQUES
   ============================================================ */

const statistics = [
  {
    title: "Patients aujourd'hui",
    value: "128",
    variation: "+12%",
    icon: Users,
    color: "blue",
  },
  {
    title: "Consultations",
    value: "96",
    variation: "+8%",
    icon: Stethoscope,
    color: "blue",
  },
  {
    title: "Recettes du jour",
    value: "2 450 000",
    unit: "FCFA",
    variation: "+18%",
    icon: Database,
    color: "green",
  },
  {
    title: "Lits disponibles",
    value: "18",
    unit: "/ 50",
    variation: "62% occupés",
    icon: BedDouble,
    color: "blue",
  },
  {
    title: "Analyses réalisées",
    value: "45",
    variation: "+5%",
    icon: FlaskConical,
    color: "green",
  },
  {
    title: "Médicaments délivrés",
    value: "230",
    variation: "+10%",
    icon: Pill,
    color: "red",
  },
  {
    title: "Stock critiques",
    value: "3",
    action: "Voir détails",
    icon: Box,
    color: "orange",
  },
  {
    title: "Urgences",
    value: "7",
    action: "En cours",
    icon: Siren,
    color: "red",
  },
];


/* ============================================================
   DONNÉES DU GRAPHIQUE
   ============================================================ */

const consultationData = [
  {
    day: "Lun",
    consultations: 70,
    patients: 45,
  },
  {
    day: "Mar",
    consultations: 90,
    patients: 55,
  },
  {
    day: "Mer",
    consultations: 150,
    patients: 80,
  },
  {
    day: "Jeu",
    consultations: 75,
    patients: 45,
  },
  {
    day: "Ven",
    consultations: 115,
    patients: 70,
  },
  {
    day: "Sam",
    consultations: 155,
    patients: 90,
  },
  {
    day: "Dim",
    consultations: 170,
    patients: 105,
  },
];


/* ============================================================
   SERVICES
   ============================================================ */

const services = [
  {
    name: "Médecine générale",
    percentage: 36,
    color: "#2d7ff9",
  },
  {
    name: "Pédiatrie",
    percentage: 18,
    color: "#4f8df7",
  },
  {
    name: "Gynécologie",
    percentage: 15,
    color: "#697cf4",
  },
  {
    name: "Chirurgie",
    percentage: 12,
    color: "#f39a13",
  },
  {
    name: "Laboratoire",
    percentage: 10,
    color: "#f2c21b",
  },
  {
    name: "Autres",
    percentage: 9,
    color: "#806df1",
  },
];


/* ============================================================
   ALERTES
   ============================================================ */

const alerts = [
  {
    type: "critical",
    title: "Stock critique : Gants",
    text: "Il reste 25 unités (seuil : 50)",
    time: "Il y a 20 min",
    icon: AlertTriangle,
  },
  {
    type: "warning",
    title: "Maintenance : Générateur",
    text: "Intervention prévue dans 3 jours",
    time: "Il y a 1 h",
    icon: Wrench,
  },
  {
    type: "info",
    title: "Affluence élevée aux urgences",
    text: "Temps d'attente estimé : 45 min",
    time: "Il y a 2 h",
    icon: Siren,
  },
  {
    type: "success",
    title: "3 résultats d'analyses à valider",
    text: "",
    time: "Il y a 3 h",
    icon: CheckCircle2,
  },
];


/* ============================================================
   COMPOSANT : CARTE STATISTIQUE
   ============================================================ */

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className="direction-stat-card">

      <div className={`direction-stat-icon ${stat.color}`}>
        <Icon
          size={25}
          strokeWidth={2.2}
        />
      </div>

      <div className="direction-stat-info">

        <span className="direction-stat-title">
          {stat.title}
        </span>

        <div className="direction-stat-value-row">

          <strong className="direction-stat-value">
            {stat.value}
          </strong>

          {stat.unit && (
            <span className="direction-stat-unit">
              {stat.unit}
            </span>
          )}

        </div>

        {stat.variation && (
          <span
            className={
              stat.variation.includes("%")
                ? "direction-stat-positive"
                : "direction-stat-secondary"
            }
          >

            {stat.variation.includes("%") && (
              <TrendingUp size={11} />
            )}

            {stat.variation}

          </span>
        )}

        {stat.action && (
          <button className="direction-stat-action">
            {stat.action}
          </button>
        )}

      </div>

    </div>
  );
}


/* ============================================================
   GRAPHIQUE SVG
   ============================================================ */

function ConsultationChart() {

  const width = 560;
  const height = 235;

  const left = 48;
  const right = 15;
  const top = 18;
  const bottom = 38;

  const graphWidth = width - left - right;
  const graphHeight = height - top - bottom;

  const maxValue = 200;


  /* ----------------------------------------------------------
     Position horizontale
     ---------------------------------------------------------- */

  const getX = (index) => {
    return left + (index * graphWidth) / 6;
  };


  /* ----------------------------------------------------------
     Position verticale
     ---------------------------------------------------------- */

  const getY = (value) => {
    return (
      top +
      graphHeight -
      (value / maxValue) * graphHeight
    );
  };


  /* ----------------------------------------------------------
     Création des lignes SVG
     ---------------------------------------------------------- */

  const makePath = (key) => {

    return consultationData
      .map((item, index) => {

        const x = getX(index);
        const y = getY(item[key]);

        return `${index === 0 ? "M" : "L"} ${x} ${y}`;

      })
      .join(" ");
  };


  return (
    <div className="direction-chart-wrapper">

      <svg
        className="direction-chart-svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >

        {/* ==================================================
            LIGNES HORIZONTALES
            ================================================== */}

        {[0, 50, 100, 150, 200].map((value) => (

          <g key={value}>

            <line
              x1={left}
              y1={getY(value)}
              x2={width - right}
              y2={getY(value)}
              className="chart-grid"
            />

            <text
              x="10"
              y={getY(value) + 4}
              className="chart-axis"
            >
              {value}
            </text>

          </g>

        ))}


        {/* ==================================================
            LIGNE CONSULTATIONS
            ================================================== */}

        <path
          d={makePath("consultations")}
          className="chart-consultations"
        />


        {/* ==================================================
            LIGNE PATIENTS
            ================================================== */}

        <path
          d={makePath("patients")}
          className="chart-patients"
        />


        {/* ==================================================
            POINTS CONSULTATIONS
            ================================================== */}

        {consultationData.map((item, index) => (

          <circle
            key={`consultation-${index}`}
            cx={getX(index)}
            cy={getY(item.consultations)}
            r="3.5"
            className="chart-point-consultations"
          />

        ))}


        {/* ==================================================
            POINTS PATIENTS
            ================================================== */}

        {consultationData.map((item, index) => (

          <circle
            key={`patient-${index}`}
            cx={getX(index)}
            cy={getY(item.patients)}
            r="3.5"
            className="chart-point-patients"
          />

        ))}


        {/* ==================================================
            JOURS
            ================================================== */}

        {consultationData.map((item, index) => (

          <text
            key={item.day}
            x={getX(index)}
            y={height - 12}
            textAnchor="middle"
            className="chart-day"
          >
            {item.day}
          </text>

        ))}

      </svg>

    </div>
  );
}


/* ============================================================
   DONUT DES SERVICES
   ============================================================ */

function ServicesDonut() {

  /*
   * On utilise un conic-gradient pour reproduire
   * le donut de la maquette.
   */

  let current = 0;


  const gradientParts = services.map((service) => {

    const start = current;

    current += service.percentage;

    return `${service.color} ${start}% ${current}%`;

  });


  return (
    <div className="services-chart-area">

      {/* ======================================================
          DONUT
          ====================================================== */}

      <div
        className="services-donut"
        style={{
          background: `conic-gradient(${gradientParts.join(", ")})`,
        }}
      >

        <div className="services-donut-center">

          <span>
            Total
          </span>

          <strong>
            96
          </strong>

        </div>

      </div>


      {/* ======================================================
          LÉGENDE
          ====================================================== */}

      <div className="services-legend">

        {services.map((service) => (

          <div
            className="service-legend-item"
            key={service.name}
          >

            <span
              className="service-dot"
              style={{
                backgroundColor: service.color,
              }}
            />

            <span className="service-name">
              {service.name}
            </span>

            <strong>
              {service.percentage}%
            </strong>

          </div>

        ))}

      </div>

    </div>
  );
}


/* ============================================================
   COMPOSANT PRINCIPAL
   ============================================================ */

const Direction = () => {

  return (

    <div className="direction-dashboard">


      {/* ======================================================
          SIDEBAR
          ====================================================== */}

      <aside className="direction-sidebar">


        {/* ====================================================
            LOGO
            ==================================================== */}

        <div className="direction-brand">

          <div className="direction-brand-icon">

            <HeartPulse
              size={28}
              strokeWidth={2.5}
            />

          </div>

          <span>
            MA SANTE
          </span>

        </div>


        {/* ====================================================
            NAVIGATION
            ==================================================== */}

        <nav className="direction-sidebar-nav">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (

              <a
                key={item.label}
                href={item.path}
                className={`direction-menu-item ${
                  item.active ? "active" : ""
                }`}
              >

                <Icon
                  size={16}
                  strokeWidth={2}
                />

                <span>
                  {item.label}
                </span>

                {item.active && (

                  <span className="direction-menu-arrow">
                    ›
                  </span>

                )}

              </a>

            );

          })}

        </nav>

      </aside>


      {/* ======================================================
          ZONE PRINCIPALE
          ====================================================== */}

      <main className="direction-content">


        {/* ====================================================
            TOPBAR
            ==================================================== */}

        <header className="direction-topbar">


          {/* ==================================================
              RECHERCHE
              ================================================== */}

          <div className="direction-search">

            <Search size={16} />

            <input
              type="text"
              placeholder="Rechercher un patient, une consultation, un utilisateur..."
            />

          </div>


          {/* ==================================================
              PARTIE DROITE
              ================================================== */}

          <div className="direction-topbar-right">


            {/* =================================================
                NOTIFICATIONS
                ================================================= */}

            <button className="direction-notification">

              <Bell size={19} />

              <span>
                5
              </span>

            </button>


            {/* =================================================
                PROFIL DIRECTEUR
                ================================================= */}

            <div className="direction-user">

              <div className="direction-user-avatar">
                👨🏾‍💼
              </div>

              <div className="direction-user-info">

                <strong>
                  Directeur
                </strong>

              </div>

              <ChevronDown
                size={15}
                className="direction-user-chevron"
              />

            </div>

          </div>

        </header>


        {/* ====================================================
            CONTENU
            ==================================================== */}

        <div className="direction-page-content">


          {/* ==================================================
              TITRE
              ================================================== */}

          <div className="direction-page-heading">

            <div>

              <h1>
                Tableau de bord - Direction
              </h1>

              <p>
                Vue globale des activités de la clinique
              </p>

            </div>


            {/* =================================================
                DATE
                ================================================= */}

            <button className="direction-date-button">

              <span>
                Aujourd'hui
              </span>

              <CalendarDays size={16} />

            </button>

          </div>


          {/* ==================================================
              STATISTIQUES
              ================================================== */}

          <section className="direction-statistics">

            {statistics.map((stat) => (

              <StatCard
                key={stat.title}
                stat={stat}
              />

            ))}

          </section>


          {/* ==================================================
              ZONE GRAPHIQUES
              ================================================== */}

          <section className="direction-dashboard-grid">


            {/* =================================================
                ÉVOLUTION DES CONSULTATIONS
                ================================================= */}

            <div className="direction-panel direction-consultations-panel">

              <div className="direction-panel-header">

                <h2>
                  Évolution des consultations
                </h2>

                <div className="direction-chart-legend">

                  <span>

                    <i className="legend-blue" />

                    Consultations

                  </span>

                  <span>

                    <i className="legend-green" />

                    Patients

                  </span>

                </div>

              </div>


              <ConsultationChart />

            </div>


            {/* =================================================
                RÉPARTITION DES SERVICES
                ================================================= */}

            <div className="direction-panel direction-services-panel">

              <div className="direction-panel-header">

                <h2>
                  Répartition des services
                </h2>

              </div>


              <ServicesDonut />

            </div>


            {/* =================================================
                ALERTES
                ================================================= */}

            <div className="direction-panel direction-alerts-panel">

              <div className="direction-panel-header">

                <h2>
                  Alertes et notifications
                </h2>

                <button className="direction-see-all">
                  Voir tout
                </button>

              </div>


              {/* =================================================
                  LISTE DES ALERTES
                  ================================================= */}

              <div className="direction-alert-list">

                {alerts.map((alert, index) => {

                  const AlertIcon = alert.icon;

                  return (

                    <div
                      className="direction-alert"
                      key={index}
                    >


                      {/* =========================================
                          ICÔNE ALERTE
                          ========================================= */}

                      <div
                        className={`direction-alert-icon ${alert.type}`}
                      >

                        <AlertIcon
                          size={15}
                          strokeWidth={2.5}
                        />

                      </div>


                      {/* =========================================
                          CONTENU ALERTE
                          ========================================= */}

                      <div className="direction-alert-content">

                        <div className="direction-alert-title-row">

                          <strong>
                            {alert.title}
                          </strong>

                          <span>
                            {alert.time}
                          </span>

                        </div>


                        {alert.text && (

                          <p>
                            {alert.text}
                          </p>

                        )}

                      </div>

                    </div>

                  );

                })}

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>

  );
};

export default Direction;