import { Link, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function EmailComposeButton({ onComposeClick }) {
  return (
    <section className="emailcompose-section">
      <button
        className="large-button email-compose-button"
        onClick={onComposeClick}
      >
        Compose
      </button>
    </section>
  );
}
