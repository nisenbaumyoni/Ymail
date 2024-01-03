/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";

export function EmailPreview({ email, folder , onDeleteEmail, onEmailClick, onUpdateEmail }) {

  // console.log('EmailPreview/email',email );
  return (
    <article className="emailpreview">
      <div className="emailpreview-multichoise-actions">multi</div>
      <div className="emailpreview-fields">
        <div className="emailpreview-from">{email.from}</div>
      <Link to={`/email/${email.id}`} >
        <div className="emailpreview-subject">{email.subject}</div>
      </Link>
        <div className="emailpreview-sentat">{utilService.formattedDate(email.sentAt)}</div>
      </div>
      <div className="emailpreview-emailactions">mlactn

      </div>
    </article>
  );
}
