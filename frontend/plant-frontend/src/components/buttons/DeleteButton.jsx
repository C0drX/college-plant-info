function DeleteButton({ onClick, isDeleted }) {
  return (
    <button className="action-btn action-btn-danger" onClick={onClick}>
      {isDeleted ? "RESTORE" : "DELETE"}
    </button>
  );
}

export default DeleteButton;
