import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { emailService } from "../services/email.service";

export function EmailCompose(props) {
  console.log('props', props);
  const [email, setEmail] = useState(emailService.createEmail());
//   const { onAddEmail, onUpdateEmail } = useOutletContext();
  const navigate = useNavigate();
  const { emailId } = useParams();

  useEffect(() => {
    if (emailId) loadEmail();
  }, []);

  async function loadEmail() {
    try {
      const email = await emailService.getById(emailId);
      setEmail(email);
    } catch (err) {
      navigate("/inbox");
      console.log("Had issues loading email", err);
    }
  }

  function handleChange({ target }) {
    let { name: field, value, type } = target;
    switch (type) {
      case "number":
      case "range":
        value = +value || "";
        break;
      case "checkbox":
        value = target.checked;
      // eslint-disable-next-line no-fallthrough
      default:
        break;
    }
    setEmail((prevEmail) => ({ ...prevEmail, [field]: value }));
  }

  async function onSaveEmail(ev) {
    ev.preventDefault();
    try {
      if (email.id) await onUpdateEmail(email);
      else await onAddEmail(email);
      navigate("/email");
    } catch (err) {
      console.log("Had issues saving email", err);
    }
  }

  return (
    // <h1>EmailCompose</h1>
    <section className="emailcompose close-btn">EmailCompose
    <Link to="/:folder"><img className="icon-delete" alt="" /></Link>
    </section>
  );
}
