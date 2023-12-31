// react
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Outlet } from "react-router";
import { useSearchParams } from "react-router-dom";

// Services
import { emailService } from "../services/email.service";

// pages
import { EmailCompose } from "./EmailCompose";

// components
import { EmailFilter } from "../cmps/EmailFilter";
import { EmailList } from "../cmps/EmailList";
import { SmallActionButton } from "../cmps/SmallActionButton";
import { Logo } from "../cmps/Logo";
import { SideBar } from "../cmps/SideBar";
import { EmailListTopBar } from "../cmps/EmailListTopBar";
import { HamburgerMenu } from "../cmps/HamburgerMenu";

export function EmailIndex() {
  const [emails, setEmails] = useState([]);
  const [folder, setFolder] = useState(["inbox"]);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadEmails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBy]);

  function onSetFilter(fieldsToUpdate) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }));
  }

  function onClearFilter() {
    setFilterBy(emailService.getDefaultFilter());
  }

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy);
      setEmails(emails);
    } catch (err) {
      console.log("Had issues loading emails", err);
    }
  }

  function onDeleteEmail() {
    console.log("EmailIndex onDeleteEmail");
  }

  // eslint-disable-next-line no-unused-vars
  async function onUpdateEmail(emailToUpdate) {
    try {
      const updatedEmail = await emailService.save(emailToUpdate);
      setEmails((prevEmails) => {
        prevEmails.map((email) => {
          return email.id === updatedEmail.id ? updatedEmail : email;
        });
      });
    } catch (error) {
      console.log("Failed on email update");
    }
  }

  function onComposeClick() {
    // hideUserMsg();
    // open the compose dialog, while staying in the same folder and
    // retaining the search params
    setSearchParams((prev) => {
      prev.set("compose", "new");
      return prev;
    });
  }

  return (
    <section className="emailindex">
      <HamburgerMenu />
      <Logo />
      <SideBar />
      <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />

      <section className="emailindex-main">
        <EmailListTopBar />
        <EmailList
          emails={emails}
          folder={folder}
          onUpdateEmail={onUpdateEmail}
          onDeleteEmail={onDeleteEmail}
        />
      </section>
    </section>
  );
}
