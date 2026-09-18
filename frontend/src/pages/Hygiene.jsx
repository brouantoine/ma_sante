/**
 * ============================================================
 * MA SANTÉ - MODULE HYGIÈNE
 * ============================================================
 *
 * Gestion de l'hygiène et de la propreté de la clinique.
 *
 * Fonctionnalités :
 * - Suivi du taux de conformité
 * - Gestion des tâches de nettoyage
 * - Suivi des produits d'hygiène
 * - Gestion des déchets médicaux
 * - Contrôles et audits
 * - Ajout d'une nouvelle tâche
 *
 * Les données sont actuellement des données de démonstration.
 * Elles seront ensuite reliées à Django / PostgreSQL.
 * ============================================================
 */

import React, { useMemo, useState } from "react";

import {
  ShieldCheck,
  FlaskConical,
  CalendarDays,
  AlertTriangle,
  Plus,
  Search,
  X,
  CheckCircle2,
  Clock3,
  Trash2,
  Biohazard,
  Package,
  LockKeyhole,
  ClipboardCheck,
  ChevronRight,
  Save,
  Eye,
} from "lucide-react";

import "../styles/hygiene.css";

/* ============================================================
   DONNÉES DE DÉMONSTRATION
   ============================================================ */

const CLEANING_TASKS = [
  {
    id: 1,
    zone: "Bloc opératoire",
    type: "Désinfection",
    responsible: "ADOU K.",
    status: "Terminée",
    hour: "08:00",
  },
  {
    id: 2,
    zone: "Chambres patients",
    type: "Nettoyage",
    responsible: "KOUAME S.",
    status: "En cours",
    hour: "10:30",
  },
  {
    id: 3,
    zone: "Salle d'attente",
    type: "Nettoyage",
    responsible: "TRAORE M.",
    status: "Planifiée",
    hour: "14:00",
  },
  {
    id: 4,
    zone: "Laboratoire",
    type: "Désinfection",
    responsible: "DIARRA L.",
    status: "En cours",
    hour: "12:00",
  },
  {
    id: 5,
    zone: "Sanitaires",
    type: "Nettoyage",
    responsible: "YAO F.",
    status: "En retard",
    hour: "11:30",
  },
];

const HYGIENE_PRODUCTS = [
  {
    id: 1,
    name: "Désinfectant",
    quantity: "12/09/2026",
    icon: FlaskConical,
    color: "blue",
  },
  {
    id: 2,
    name: "Savon liquide",
    quantity: "12/09/2026",
    icon: LockKeyhole,
    color: "green",
  },
  {
    id: 3,
    name: "Gants",
    quantity: "12/09/2026",
    icon: ShieldCheck,
    color: "cyan",
  },
  {
    id: 4,
    name: "Masques",
    quantity: "11/09/2026",
    icon: Biohazard,
    color: "purple",
  },
  {
    id: 5,
    name: "Sacs DASRI",
    quantity: "11/09/2026",
    icon: Package,
    color: "blue",
  },
];

const WASTE_TYPES = [
  {
    id: 1,
    name: "Déchets infectieux",
    quantity: "12 kg",
    collection: "10/09/2026",
    icon: Biohazard,
    color: "red",
  },
  {
    id: 2,
    name: "Déchets chimiques",
    quantity: "3 kg",
    collection: "09/09/2026",
    icon: Trash2,
    color: "orange",
  },
  {
    id: 3,
    name: "Déchets assimilés",
    quantity: "8 kg",
    collection: "09/09/2026",
    icon: Trash2,
    color: "gray",
  },
];

/* ============================================================
   BADGE DE STATUT
   ============================================================ */

function TaskStatus({ status }) {
  let className = "planned";

  if (status === "Terminée") {
    className = "completed";
  }

  if (status === "En cours") {
    className = "progress";
  }

  if (status === "En retard") {
    className = "late";
  }

  return (
    <span className={`hygiene-task-status ${className}`}>
      {status}
    </span>
  );
}

/* ============================================================
   CARTE STATISTIQUE
   ============================================================ */

function HygieneStatCard({
  icon: Icon,
  value,
  label,
  color,
}) {
  return (
    <div className={`hygiene-stat-card ${color}`}>
      <div className="hygiene-stat-icon">
        <Icon size={22} strokeWidth={2.2} />
      </div>

      <div className="hygiene-stat-content">
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

/* ============================================================
   MODULE HYGIÈNE
   ============================================================ */

export default function Hygiene() {
  /* ----------------------------------------------------------
     ÉTATS
     ---------------------------------------------------------- */

  const [search, setSearch] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [taskForm, setTaskForm] = useState({
    zone: "",
    type: "Nettoyage",
    responsible: "",
    date: "",
    hour: "",
  });

  /* ----------------------------------------------------------
     RECHERCHE
     ---------------------------------------------------------- */

  const filteredTasks = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return CLEANING_TASKS;
    }

    return CLEANING_TASKS.filter(
      (task) =>
        task.zone.toLowerCase().includes(value) ||
        task.type.toLowerCase().includes(value) ||
        task.responsible.toLowerCase().includes(value) ||
        task.status.toLowerCase().includes(value)
    );
  }, [search]);

  /* ----------------------------------------------------------
     CHANGEMENT FORMULAIRE
     ---------------------------------------------------------- */

  const handleTaskChange = (event) => {
    const { name, value } = event.target;

    setTaskForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* ----------------------------------------------------------
     NOUVELLE TÂCHE
     ---------------------------------------------------------- */

  const openNewTask = () => {
    setSelectedTask(null);

    setTaskForm({
      zone: "",
      type: "Nettoyage",
      responsible: "",
      date: "",
      hour: "",
    });

    setShowTaskModal(true);
  };

  /* ----------------------------------------------------------
     MODIFICATION TÂCHE
     ---------------------------------------------------------- */

  const openEditTask = (task) => {
    setSelectedTask(task);

    setTaskForm({
      zone: task.zone,
      type: task.type,
      responsible: task.responsible,
      date: "",
      hour: task.hour,
    });

    setShowTaskModal(true);
  };

  /* ----------------------------------------------------------
     FERMETURE MODALE
     ---------------------------------------------------------- */

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setSelectedTask(null);

    setTaskForm({
      zone: "",
      type: "Nettoyage",
      responsible: "",
      date: "",
      hour: "",
    });
  };

  /* ----------------------------------------------------------
     ENREGISTREMENT
     ---------------------------------------------------------- */

  const handleTaskSubmit = (event) => {
    event.preventDefault();

    /*
     * Plus tard :
     *
     * await api.post("/hygiene/tasks/", taskForm);
     *
     * ou :
     *
     * await api.put(`/hygiene/tasks/${selectedTask.id}/`, taskForm);
     */

    alert(
      selectedTask
        ? "Tâche modifiée avec succès."
        : "Nouvelle tâche créée avec succès."
    );

    closeTaskModal();
  };

  /* ==========================================================
     RENDU
     ========================================================== */

  return (
    <div className="hygiene-page">
      {/* ==================================================
          EN-TÊTE
         ================================================== */}

      <header className="hygiene-header">
        <div className="hygiene-title-area">
          <div className="hygiene-title-icon">
            <ShieldCheck size={25} />
          </div>

          <div>
            <h1>Hygiène</h1>

            <p>
              Suivi de la propreté, de la désinfection
              et de la gestion des déchets médicaux
            </p>
          </div>
        </div>

        <button
          type="button"
          className="hygiene-primary-button"
          onClick={openNewTask}
        >
          <Plus size={16} />
          Nouvelle tâche
        </button>
      </header>

      {/* ==================================================
          STATISTIQUES
         ================================================== */}

      <section className="hygiene-stat-grid">
        <HygieneStatCard
          icon={ShieldCheck}
          value="96%"
          label="Taux de conformité"
          color="green"
        />

        <HygieneStatCard
          icon={FlaskConical}
          value="8"
          label="Tâches en cours"
          color="blue"
        />

        <HygieneStatCard
          icon={CalendarDays}
          value="3"
          label="Tâches en retard"
          color="orange"
        />

        <HygieneStatCard
          icon={Biohazard}
          value="2"
          label="Incidents d'hygiène"
          color="purple"
        />
      </section>

      {/* ==================================================
          BARRE D'OUTILS
         ================================================== */}

      <div className="hygiene-toolbar">
        <div className="hygiene-search">
          <Search size={16} />

          <input
            type="text"
            placeholder="Rechercher une zone, une tâche..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="hygiene-clear-search"
              aria-label="Effacer la recherche"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="hygiene-date-info">
          <CalendarDays size={14} />
          Mise à jour :
          <strong>10/09/2026</strong>
        </div>
      </div>

      {/* ==================================================
          PREMIÈRE LIGNE
         ================================================== */}

      <div className="hygiene-main-grid">
        {/* =================================================
            TÂCHES DE NETTOYAGE
           ================================================= */}

        <section className="hygiene-panel tasks-panel">
          <div className="hygiene-panel-header">
            <div>
              <h2>Tâches de nettoyage</h2>

              <p>
                Suivi des opérations d'hygiène
              </p>
            </div>

            <button
              type="button"
              className="hygiene-small-button"
              onClick={openNewTask}
            >
              <Plus size={14} />
              Nouvelle tâche
            </button>
          </div>

          <div className="hygiene-table-wrapper">
            <table className="hygiene-table">
              <thead>
                <tr>
                  <th>Zone / Lieu</th>
                  <th>Type</th>
                  <th>Responsable</th>
                  <th>Statut</th>
                  <th>Heure</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <strong>{task.zone}</strong>
                    </td>

                    <td>{task.type}</td>

                    <td>{task.responsible}</td>

                    <td>
                      <TaskStatus status={task.status} />
                    </td>

                    <td>{task.hour}</td>

                    <td>
                      <button
                        type="button"
                        className="hygiene-edit-button"
                        title="Modifier"
                        aria-label={`Modifier ${task.zone}`}
                        onClick={() => openEditTask(task)}
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredTasks.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="hygiene-empty"
                    >
                      Aucune tâche trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* =================================================
            SUIVI DES PRODUITS
           ================================================= */}

        <section className="hygiene-panel products-panel">
          <div className="hygiene-panel-header">
            <div>
              <h2>Suivi des produits</h2>

              <p>
                Produits d'hygiène disponibles
              </p>
            </div>
          </div>

          <div className="hygiene-products-list">
            {HYGIENE_PRODUCTS.map((product) => {
              const Icon = product.icon;

              return (
                <div
                  className="hygiene-product-row"
                  key={product.id}
                >
                  <div
                    className={`hygiene-product-icon ${product.color}`}
                  >
                    <Icon size={15} />
                  </div>

                  <div className="hygiene-product-info">
                    <strong>{product.name}</strong>

                    <span>Disponible</span>
                  </div>

                  <span className="product-date">
                    {product.quantity}
                  </span>

                  <span className="product-check">
                    <CheckCircle2 size={14} />
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ==================================================
          DEUXIÈME LIGNE
         ================================================== */}

      <div className="hygiene-bottom-grid">
        {/* =================================================
            GESTION DES DÉCHETS
           ================================================= */}

        <section className="hygiene-panel waste-panel">
          <div className="hygiene-panel-header">
            <div>
              <h2>Gestion des déchets médicaux</h2>

              <p>
                Suivi du tri, stockage et enlèvement
              </p>
            </div>

            <button
              type="button"
              className="hygiene-link-button"
              onClick={() =>
                alert("Gestion complète des déchets")
              }
            >
              Voir tout
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="waste-grid">
            {WASTE_TYPES.map((waste) => {
              const Icon = waste.icon;

              return (
                <div
                  className="waste-card"
                  key={waste.id}
                >
                  <div
                    className={`waste-icon ${waste.color}`}
                  >
                    <Icon size={18} />
                  </div>

                  <strong>{waste.name}</strong>

                  <span className="waste-quantity">
                    {waste.quantity}
                  </span>

                  <small>
                    Collecte : {waste.collection}
                  </small>
                </div>
              );
            })}
          </div>
        </section>

        {/* =================================================
            CONTRÔLES ET AUDITS
           ================================================= */}

        <section className="hygiene-panel audit-panel">
          <div className="hygiene-panel-header">
            <div>
              <h2>Contrôles et audits</h2>

              <p>
                Suivi des contrôles d'hygiène
              </p>
            </div>
          </div>

          <div className="audit-content">
            <div className="audit-item">
              <div className="audit-icon">
                <ClipboardCheck size={18} />
              </div>

              <div className="audit-info">
                <strong>Dernier contrôle</strong>

                <span>09/09/2026</span>
              </div>

              <span className="audit-status">
                Conforme
              </span>
            </div>

            <div className="audit-separator"></div>

            <div className="audit-item">
              <div className="audit-icon next">
                <CalendarDays size={18} />
              </div>

              <div className="audit-info">
                <strong>Prochain contrôle</strong>

                <span>16/09/2026</span>
              </div>

              <ChevronRight
                size={15}
                className="audit-arrow"
              />
            </div>

            <div className="audit-summary">
              <div>
                <strong>96%</strong>

                <span>
                  conformité globale
                </span>
              </div>

              <div className="audit-progress">
                <div
                  className="audit-progress-bar"
                  style={{
                    width: "96%",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ==================================================
          RÉSUMÉ DU MODULE
         ================================================== */}

      <section className="hygiene-summary">
        <div className="summary-icon">
          <CheckCircle2 size={21} />
        </div>

        <div className="summary-content">
          <strong>
            État général de l'hygiène
          </strong>

          <span>
            Les indicateurs d'hygiène de la clinique
            sont actuellement conformes aux objectifs
            définis.
          </span>
        </div>

        <div className="summary-score">
          <strong>96%</strong>

          <span>Conformité</span>
        </div>
      </section>

      {/* ==================================================
          MODAL NOUVELLE TÂCHE
         ================================================== */}

      {showTaskModal && (
        <div
          className="hygiene-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeTaskModal();
            }
          }}
        >
          <div className="hygiene-modal">
            <div className="hygiene-modal-header">
              <div className="modal-title">
                <div className="modal-icon">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h2>
                    {selectedTask
                      ? "Modifier la tâche"
                      : "Nouvelle tâche"}
                  </h2>

                  <p>
                    Planification d'une opération
                    d'hygiène
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeTaskModal}
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>

            <form
              className="hygiene-form"
              onSubmit={handleTaskSubmit}
            >
              <div className="hygiene-form-grid">
                <div className="hygiene-form-group">
                  <label htmlFor="zone">
                    Zone / Lieu
                  </label>

                  <input
                    id="zone"
                    name="zone"
                    type="text"
                    placeholder="Ex. Bloc opératoire"
                    value={taskForm.zone}
                    onChange={handleTaskChange}
                    required
                  />
                </div>

                <div className="hygiene-form-group">
                  <label htmlFor="type">
                    Type d'intervention
                  </label>

                  <select
                    id="type"
                    name="type"
                    value={taskForm.type}
                    onChange={handleTaskChange}
                  >
                    <option value="Nettoyage">
                      Nettoyage
                    </option>

                    <option value="Désinfection">
                      Désinfection
                    </option>

                    <option value="Décontamination">
                      Décontamination
                    </option>

                    <option value="Stérilisation">
                      Stérilisation
                    </option>
                  </select>
                </div>

                <div className="hygiene-form-group">
                  <label htmlFor="responsible">
                    Responsable
                  </label>

                  <input
                    id="responsible"
                    name="responsible"
                    type="text"
                    placeholder="Nom du responsable"
                    value={taskForm.responsible}
                    onChange={handleTaskChange}
                    required
                  />
                </div>

                <div className="hygiene-form-group">
                  <label htmlFor="date">
                    Date
                  </label>

                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={taskForm.date}
                    onChange={handleTaskChange}
                    required
                  />
                </div>

                <div className="hygiene-form-group">
                  <label htmlFor="hour">
                    Heure
                  </label>

                  <input
                    id="hour"
                    name="hour"
                    type="time"
                    value={taskForm.hour}
                    onChange={handleTaskChange}
                    required
                  />
                </div>
              </div>

              <div className="hygiene-form-note">
                <Clock3 size={15} />

                <span>
                  La tâche sera ajoutée au planning
                  des opérations d'hygiène.
                </span>
              </div>

              <div className="hygiene-modal-actions">
                <button
                  type="button"
                  className="hygiene-cancel-button"
                  onClick={closeTaskModal}
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="hygiene-save-button"
                >
                  <Save size={15} />

                  {selectedTask
                    ? "Enregistrer"
                    : "Créer la tâche"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}