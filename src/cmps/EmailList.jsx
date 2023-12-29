/* eslint-disable react/prop-types */
import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails,onDeleteEmail }) {

  if(!emails) return <div>Loading</div>
  if(emails.length===0) return <div>No emails in the folder</div>

  return (
    <ul className="emaillist">
      {emails.map((email) => (
        <li key={email._id}>
          <EmailPreview email={email} onDeleteEmail={onDeleteEmail} />
        </li>
      ))}
    </ul>
  );
}
