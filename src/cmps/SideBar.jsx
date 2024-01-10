import { EmailComposeButton } from "./EmailComposeButton";
import { FolderList } from "./FolderList";

// eslint-disable-next-line react/prop-types
export function SideBar({onComposeClick,onFolderClick}) {


  return (
    <section className="sidebar">
      <EmailComposeButton onComposeClick={onComposeClick} />
      <FolderList onFolderClick={onFolderClick}/>
    </section>
  );
}