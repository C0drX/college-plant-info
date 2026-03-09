function DeleteButton({ onClick }) {
  return (
    <button className="action-btn action-btn-danger" onClick={onClick}>
      DELETE
    </button>
  );
}

export default DeleteButton;
