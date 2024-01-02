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
  const [folder, setFolder] = useState(['Inbox']);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

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

  return (
    <section className="emailindex">
      <HamburgerMenu />
      <Logo />
      <SideBar />
      <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />

      <section className="emailindex-main">
        <EmailListTopBar />
        <EmailList emails={emails} onDeleteEmail={onDeleteEmail} folder={folder}/>
      </section>
    </section>
  );
}
