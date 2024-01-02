// eslint-disable-next-line no-unused-vars

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { emailService } from "../services/email.service";

export function EmailDetails() {
  const [email, setEmail] = useState(null);
  const params = useParams();

  useEffect(() => {
    loadEmail()
  }, [])

  async function loadEmail() {
    const email = await emailService.getById(params.emailId)
    setEmail(email)
  }

  if (!email) return <div>Loading...</div>;

//   console.log("EmailDetails");
//   console.log("params ", params);

  return (
    <section className="emaildetails">
      <h1 className="emaildetails-subject">{email.subject}</h1>
      <h2 className="emaildetails-header">{email.from}</h2>
      <article className="emaildetails-content">{email.body}</article>
    </section>
  );
}
