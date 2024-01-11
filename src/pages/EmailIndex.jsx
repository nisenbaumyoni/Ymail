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
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());
  const [folder, setFolder] = useState(["inbox"]);
  const [inboxCounter, setInboxCounter] = useState(countFolder("inbox"));

  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  let {emailId} = params
  let curFolder = params.folder
  
  useEffect(() => {
    setSearchParams(filterBy);
    loadEmails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBy]);

  useEffect(() => {
    setInboxCounter(countFolder("inbox"));
    console.log("InboxCounter ",inboxCounter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emails]);

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy);
      setEmails(emails);
    } catch (err) {
      console.log("Had issues loading emails", err);
    }
  }

  function countFolder(folderId) {
    return emails.filter((email) => email.folder === folderId).length;
  }

  // async function countInbox() {
  //   try {
  //     const emails = await emailService.query(filterBy);
  //     setEmails(emails);
  //   } catch (err) {
  //     console.log("Had issues loading emails", err);
  //   }
  // }

  function onSetFilter(fieldsToUpdate) {
    console.log("EmailIndex.onsetfilter , fieldstoupdate ",fieldsToUpdate);
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }));
  }

  function onClearFilter() {
    setFilterBy(emailService.getDefaultFilter());
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
    // setSearchParams((prev) => {
    //   prev.set("compose", "new");
    //   return prev;
    // });

    const url=`/${curFolder}?compose=new`
    navigate(url)
  }

  function onFolderClick(folderId, inboxCounter) {
    console.log("EmailIndex.onFolderClick", folderId);
    // const field = "folder"
    // const value = folderId
    // onSetFilter((prevFilter) => ({ ...prevFilter, [field]: value }));

    // const navigateArgs = {
    //   pathname: `/email/${folder}`,
    // };
    // const composeVal = searchParams.get("compose");
    // if (composeVal) {
    //   navigateArgs.search = `?compose=${composeVal}`;
    // }
    // navigate(navigateArgs);
  }

  const isComposeOpen =  !!searchParams.get("compose")

  return (
    <section className="emailindex">
      <HamburgerMenu />
      <Logo />
      <SideBar onComposeClick={onComposeClick} onFolderClick={onFolderClick} />
      <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />

      <section className="emailindex-main">
        <EmailListTopBar />
        {!emailId && <EmailList
          emails={emails}
          folder={filterBy.folder}
          onUpdateEmail={onUpdateEmail}
          onDeleteEmail={onDeleteEmail}
        />}
        {emailId && <Outlet/>}
        {(isComposeOpen) && <EmailCompose/>}
      </section>
    </section>
  );
}
