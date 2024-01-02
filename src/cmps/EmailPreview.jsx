/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";

const inboxFields = ["from", "subject", "sentAt"];
const sentFields = ["to", "subject", "sentAt"];

export function EmailPreview({ email, folder , onDeleteEmail, onEmailClick }) {

  // console.log('EmailPreview/email',email );
  return (
    <article className="emailpreview">
      <div className="emailpreview-multichoise-actions"></div>
      <Link to={`/email/${email.id}`} >
      <div className="emailpreview-fields">
        <div className="">{email.from}</div>
        <div className="emailpreview-subject">{email.subject}</div>
        <div className="emailpreview-sentat">{email.sentAt}</div>
      </div>
      </Link>
      <div className="emailpreview-emailactions">

      </div>
    </article>
  );
}
