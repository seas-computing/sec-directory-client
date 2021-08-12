import './Footer.css';
import footerLogo from './footer.png';

const currentYear = new Date().getUTCFullYear();

const Footer = () => (
  <div className="app-footer">
    <img 
      className="app-footer--logo" 
      src={footerLogo} 
      alt="Harvard John A. Paulson School of Engineering and Applied Sciences"
    />
      <p className="app-footer--copyright">
        {`© ${currentYear} President and Fellows of Harvard College`}
      </p>
  </div>
);

export default Footer;
