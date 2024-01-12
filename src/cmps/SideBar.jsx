import { EmailComposeButton } from "./EmailComposeButton";
import { FolderList } from "./FolderList";

// eslint-disable-next-line react/prop-types
export function SideBar({onComposeClick,onFolderClick,inboxCounter}) {


  return (
    <section className="sidebar">
      <EmailComposeButton onComposeClick={onComposeClick} />
      <FolderList onFolderClick={onFolderClick} inboxCounter={inboxCounter}/>
    </section>
  );
}