import { formatText } from "../utils/formatText";

function MedicinalImportance({ plant }) {
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <h4 className="mb-3 text-success fw-bold">Medicinal Importance</h4>

        <div>
          {plant.medicinal_importance &&
          plant.medicinal_importance.trim() !== ""
            ? formatText(plant.medicinal_importance)
            : "Not used as medicine"}
        </div>
      </div>
    </div>
  );
}
export default MedicinalImportance;
