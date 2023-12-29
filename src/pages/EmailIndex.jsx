// react
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Outlet } from "react-router";
import { useSearchParams } from "react-router-dom";

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
  return (
    <section className="emailindex">
      <HamburgerMenu />
      <Logo />
      <SideBar />
      <EmailFilter />

      <section className="emailindex-main">
        <EmailListTopBar />
        <EmailList />
      </section>
    </section>
  );
}
