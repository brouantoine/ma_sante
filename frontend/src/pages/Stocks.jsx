/*
 * ============================================================
 * MA SANTÉ - GESTION DES STOCKS
 * ============================================================
 *
 * Interface principale du module Gestion des stocks.
 *
 * Cette page présente :
 * - les produits ;
 * - les quantités en stock ;
 * - les seuils d'alerte ;
 * - les produits critiques ;
 * - les entrées / sorties ;
 * - les fournisseurs ;
 * - les rapports.
 *
 * ============================================================
 */

import React, { useMemo, useState } from "react";
import "../styles/Stocks.css";


/* ============================================================
   DONNÉES DE DÉMONSTRATION
   ============================================================ */

const produitsInitials = [
  {
    id: "001",
    produit: "Gants",
    categorie: "Consommable",
    stock: 25,
    seuil: 50,
  },
  {
    id: "002",
    produit: "Sérum 500ml",
    categorie: "Consommable",
    stock: 120,
    seuil: 50,
  },
  {
    id: "003",
    produit: "Réactif NFS",
    categorie: "Laboratoire",
    stock: 15,
    seuil: 30,
  },
  {
    id: "004",
    produit: "Masques",
    categorie: "Consommable",
    stock: 200,
    seuil: 100,
  },
];


/* ============================================================
   COMPOSANT PRINCIPAL
   ============================================================ */

export default function Stocks() {

  /* ----------------------------------------------------------
     État de la recherche
     ---------------------------------------------------------- */

  const [recherche, setRecherche] = useState("");


  /* ----------------------------------------------------------
     État de l'onglet sélectionné
     ---------------------------------------------------------- */

  const [menuActif, setMenuActif] = useState("Produits");


  /* ----------------------------------------------------------
     Produits
     ---------------------------------------------------------- */

  const [produits] = useState(produitsInitials);


  /* ----------------------------------------------------------
     Filtrage des produits
     ---------------------------------------------------------- */

  const produitsFiltres = useMemo(() => {

    const texte = recherche.toLowerCase().trim();

    if (!texte) {
      return produits;
    }

    return produits.filter((produit) =>
      produit.produit.toLowerCase().includes(texte) ||
      produit.categorie.toLowerCase().includes(texte) ||
      produit.id.toLowerCase().includes(texte)
    );

  }, [recherche, produits]);


  /* ----------------------------------------------------------
     Statistiques
     ---------------------------------------------------------- */

  const nombreProduits = produits.length;

  const produitsCritiques = produits.filter(
    (produit) => produit.stock <= produit.seuil
  ).length;

  const stockTotal = produits.reduce(
    (total, produit) => total + produit.stock,
    0
  );


  /* ----------------------------------------------------------
     Gestion du menu
     ---------------------------------------------------------- */

  const handleMenu = (menu) => {
    setMenuActif(menu);
  };


  /* ----------------------------------------------------------
     Nouveau produit
     ---------------------------------------------------------- */

  const handleNouveauProduit = () => {
    alert("Le formulaire de création d'un nouveau produit sera disponible prochainement.");
  };


  /* ==========================================================
     AFFICHAGE
     ========================================================== */

  return (

    <div className="stocks-page">


      {/* ======================================================
          BARRE LATÉRALE
          ====================================================== */}

      <aside className="stocks-sidebar">


        {/* ----------------------------------------------------
            LOGO
            ---------------------------------------------------- */}

        <div className="stocks-logo">

          <div className="stocks-logo-icon">
            ♥
          </div>

          <div className="stocks-logo-text">
            <strong>MASANTE</strong>
            <span>Gestion de clinique</span>
          </div>

        </div>


        {/* ----------------------------------------------------
            MENU
            ---------------------------------------------------- */}

        <nav className="stocks-navigation">


          <button
            type="button"
            className={`stocks-nav-item ${
              menuActif === "Accueil" ? "active" : ""
            }`}
            onClick={() => handleMenu("Accueil")}
          >
            <span className="stocks-nav-icon">⌂</span>
            <span>Accueil</span>
          </button>


          <button
            type="button"
            className={`stocks-nav-item ${
              menuActif === "Produits" ? "active" : ""
            }`}
            onClick={() => handleMenu("Produits")}
          >
            <span className="stocks-nav-icon">▣</span>
            <span>Produits</span>
          </button>


          <button
            type="button"
            className={`stocks-nav-item ${
              menuActif === "Entrées / Sorties" ? "active" : ""
            }`}
            onClick={() => handleMenu("Entrées / Sorties")}
          >
            <span className="stocks-nav-icon">⇄</span>
            <span>Entrées / Sorties</span>
          </button>


          <button
            type="button"
            className={`stocks-nav-item ${
              menuActif === "Seuils d'alerte" ? "active" : ""
            }`}
            onClick={() => handleMenu("Seuils d'alerte")}
          >
            <span className="stocks-nav-icon">⚠</span>
            <span>Seuils d'alerte</span>
          </button>


          <button
            type="button"
            className={`stocks-nav-item ${
              menuActif === "Fournisseurs" ? "active" : ""
            }`}
            onClick={() => handleMenu("Fournisseurs")}
          >
            <span className="stocks-nav-icon">♙</span>
            <span>Fournisseurs</span>
          </button>


          <button
            type="button"
            className={`stocks-nav-item ${
              menuActif === "Rapports" ? "active" : ""
            }`}
            onClick={() => handleMenu("Rapports")}
          >
            <span className="stocks-nav-icon">▤</span>
            <span>Rapports</span>
          </button>

        </nav>


        {/* ----------------------------------------------------
            VERSION
            ---------------------------------------------------- */}

        <div className="stocks-sidebar-footer">
          Ma Santé Clinique
          <span>v1.0</span>
        </div>

      </aside>



      {/* ======================================================
          CONTENU PRINCIPAL
          ====================================================== */}

      <main className="stocks-main">


        {/* ====================================================
            EN-TÊTE
            ==================================================== */}

        <header className="stocks-header">


          <div className="stocks-header-title">

            <h1>Espace Responsable des Stocks</h1>

            <p>
              Gestion des produits et des mouvements de stock
            </p>

          </div>


          <div className="stocks-user">


            <div className="stocks-user-avatar">
              👨🏾‍💼
            </div>


            <div className="stocks-user-info">

              <strong>N'GUESSAN Paul</strong>

              <span>
                Responsable Stocks
              </span>

            </div>

          </div>

        </header>



        {/* ====================================================
            ZONE DE CONTENU
            ==================================================== */}

        <section className="stocks-content">


          {/* ==================================================
              STATISTIQUES
              ================================================== */}

          <div className="stocks-statistics">


            <div className="stocks-stat-card">

              <div className="stocks-stat-icon">
                📦
              </div>

              <div>
                <span>Produits</span>
                <strong>{nombreProduits}</strong>
              </div>

            </div>


            <div className="stocks-stat-card">

              <div className="stocks-stat-icon">
                📊
              </div>

              <div>
                <span>Stock total</span>
                <strong>{stockTotal}</strong>
              </div>

            </div>


            <div className="stocks-stat-card stocks-stat-danger">

              <div className="stocks-stat-icon">
                ⚠
              </div>

              <div>
                <span>Alertes</span>
                <strong>{produitsCritiques}</strong>
              </div>

            </div>


          </div>



          {/* ==================================================
              TITRE + ACTIONS
              ================================================== */}

          <div className="stocks-section-header">


            <div>

              <h2>Liste des produits</h2>

              <p>
                Consultez et gérez les produits disponibles en stock.
              </p>

            </div>


            <div className="stocks-actions">


              <div className="stocks-search">

                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={recherche}
                  onChange={(event) =>
                    setRecherche(event.target.value)
                  }
                />

              </div>


              <button
                type="button"
                className="stocks-new-button"
                onClick={handleNouveauProduit}
              >
                <span>+</span>
                Nouveau produit
              </button>

            </div>

          </div>



          {/* ==================================================
              TABLEAU
              ================================================== */}

          <div className="stocks-table-container">

            <table className="stocks-table">

              <thead>

                <tr>

                  <th>#</th>

                  <th>Produit</th>

                  <th>Catégorie</th>

                  <th>Stock</th>

                  <th>Seuil</th>

                  <th>Statut</th>

                </tr>

              </thead>


              <tbody>

                {produitsFiltres.length > 0 ? (

                  produitsFiltres.map((produit) => {

                    const critique =
                      produit.stock <= produit.seuil;

                    return (

                      <tr key={produit.id}>


                        <td className="stocks-id">
                          {produit.id}
                        </td>


                        <td className="stocks-product-name">
                          {produit.produit}
                        </td>


                        <td>
                          <span className="stocks-category">
                            {produit.categorie}
                          </span>
                        </td>


                        <td
                          className={
                            critique
                              ? "stocks-quantity critical"
                              : "stocks-quantity"
                          }
                        >
                          {produit.stock}
                        </td>


                        <td>
                          {produit.seuil}
                        </td>


                        <td>

                          {critique ? (

                            <span className="stocks-status critical">
                              Critique
                            </span>

                          ) : (

                            <span className="stocks-status ok">
                              OK
                            </span>

                          )}

                        </td>

                      </tr>

                    );

                  })

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="stocks-empty"
                    >
                      Aucun produit trouvé.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>



          {/* ==================================================
              PIED DE TABLEAU
              ================================================== */}

          <div className="stocks-table-footer">

            <span>
              {produitsFiltres.length} produit(s) affiché(s)
            </span>

            <span>
              Dernière mise à jour : aujourd'hui
            </span>
          </div>
        </section>

      </main>

    </div>
  );
}