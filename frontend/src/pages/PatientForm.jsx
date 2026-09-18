import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import PageHeader from "../components/PageHeader";

const initial = {
  patient_number: "", last_name: "", first_names: "", birth_date: "", sex: "M",
  phone: "", address: "", email: "", profession: "", emergency_contact: "",
  blood_group: "", history: "", allergies: "", insurance: "", insurance_number: ""
};

export default function PatientForm() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function update(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/patients/", form);
      navigate("/patients");
    } catch (err) {
      setError(err.response?.data ? JSON.stringify(err.response.data) : "Impossible d'enregistrer le patient.");
    }
  }

  return (
    <>
      <PageHeader title="Nouveau patient" subtitle="Créer un dossier patient électronique" />
      <form className="panel form-panel" onSubmit={submit}>
        {error && <div className="alert error">{error}</div>}
        <h2>Informations personnelles</h2>
        <div className="form-grid">
          <Field label="Numéro patient unique" name="patient_number" value={form.patient_number} onChange={update} required/>
          <Field label="Nom" name="last_name" value={form.last_name} onChange={update} required/>
          <Field label="Prénoms" name="first_names" value={form.first_names} onChange={update} required/>
          <Field label="Date de naissance" type="date" name="birth_date" value={form.birth_date} onChange={update} required/>
          <Select label="Sexe" name="sex" value={form.sex} onChange={update} options={[["M","Masculin"],["F","Féminin"],["O","Autre"]]}/>
          <Select label="Groupe sanguin" name="blood_group" value={form.blood_group} onChange={update} options={["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(x => [x,x])}/>
          <Field label="Téléphone" name="phone" value={form.phone} onChange={update}/>
          <Field label="E-mail" type="email" name="email" value={form.email} onChange={update}/>
          <Field label="Adresse" name="address" value={form.address} onChange={update}/>
          <Field label="Profession" name="profession" value={form.profession} onChange={update}/>
          <Field label="Personne à contacter en urgence" name="emergency_contact" value={form.emergency_contact} onChange={update}/>
          <Field label="Assurance" name="insurance" value={form.insurance} onChange={update}/>
          <Field label="Numéro d'assurance" name="insurance_number" value={form.insurance_number} onChange={update}/>
        </div>
        <h2 className="form-section-title">Informations médicales</h2>
        <div className="form-grid one-column">
          <TextArea label="Antécédents" name="history" value={form.history} onChange={update}/>
          <TextArea label="Allergies" name="allergies" value={form.allergies} onChange={update}/>
        </div>
        <div className="form-actions"><button type="button" className="secondary-button" onClick={() => navigate("/patients")}>Annuler</button><button className="primary-button">Enregistrer le patient</button></div>
      </form>
    </>
  );
}

function Field({ label, ...props }) {
  return <label className="field"><span>{label}</span><input {...props}/></label>;
}
function TextArea({ label, ...props }) {
  return <label className="field"><span>{label}</span><textarea rows="4" {...props}/></label>;
}
function Select({ label, options, ...props }) {
  return <label className="field"><span>{label}</span><select {...props}><option value="">Sélectionner</option>{options.map(([v,l]) => <option key={v} value={v}>{l}</option>)}</select></label>;
}
