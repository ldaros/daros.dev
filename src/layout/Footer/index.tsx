import { FC } from "react";
import "./styles.scss";

const GITHUB_URL = "https://github.com/ldaros";
const LINKEDIN_URL = "https://www.linkedin.com/in/darosluan/";

export const Footer: FC = () => (
  <footer className="footer" id="contact">
    <div className="footer__logo">
      <img className="footer__icon" src="/assets/logo.svg" alt="" />
      <h5 className="footer__name">Luan Daros</h5>
    </div>
    <div className="footer__links">
      <a className="footer__link" href={GITHUB_URL}>
        github
      </a>
      <a className="footer__link" href={LINKEDIN_URL}>
        linkedin
      </a>
    </div>
  </footer>
);
