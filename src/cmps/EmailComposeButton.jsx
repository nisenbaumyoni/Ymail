import { Link } from "react-router-dom";

export function EmailComposeButton({ onComposeClick }) {
  return (
    <Link to="/inbox/edit">
      <button
        className="large-button email-compose-button"
        onClick={onComposeClick}
      >
        Compose
      </button>
    </Link>
  );
}
