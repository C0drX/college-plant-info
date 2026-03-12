import { Link } from "react-router-dom";

function EditButton({ id }) {
  return (
    <Link to={`/admin/edit/${id}`} className="action-btn action-btn-warning">
      EDIT
    </Link>
  );
}

export default EditButton;
