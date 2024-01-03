// eslint-disable-next-line no-unused-vars

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { emailService } from "../services/email.service";

export function EmailDetails({onUpdateEmail}) {
  const [email, setEmail] = useState(null);
  const params = useParams();

  useEffect(() => {
    loadEmail();
  }, []);

  async function loadEmail() {
    const email = await emailService.getById(params.emailId);
    setEmail(email);
  }

  if (!email) return <div>Loading...</div>;

  return (
    <section className="emaildetails">

      <Link to="/" className="icon-back" >Back</Link>
      <div className="emaildetails-details">
        <h1 className="emaildetails-subject">{email.subject}</h1>
        <span className="emaildetails-header">{email.from}</span>
        <article className="emaildetails-content">{email.body}</article>
      </div>
    </section>
  );
}
