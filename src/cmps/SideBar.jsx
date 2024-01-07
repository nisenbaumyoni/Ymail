import { EmailComposeButton } from "./EmailComposeButton";

export function SideBar(onComposeClick) {


  return (
    <section className="sidebar">
      <EmailComposeButton onComposeClick={onComposeClick} />
    </section>
  );
}