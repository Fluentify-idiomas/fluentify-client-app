import './style.css';

import CountriesFlags from '/imgs/countries-flags.svg';
import WppIcon from '/imgs/wpp-icon.svg';
import FacebookIcon from '/imgs/facebook-icon.svg';
import InstagramIcon from '/imgs/instagram-icon.svg';
import XIcon from '/imgs/x-icon.svg';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer-container'>
      <div className='footer-section-one'>
        <div>
          <h1>FLUENTIFY</h1>
          <img src={CountriesFlags} alt="" />
        </div>
        <div className='footer-section-one-p1'>
          <ul>
            <li><a href="">Início</a></li>
            <li><a href="">Sobre</a></li>
            <li><a href="">Serviços</a></li>
            <li><a href="">Contatos</a></li>
          </ul>
          <ul>
            <li><a href="">Início</a></li>
            <li><a href="">Sobre</a></li>
            <li><a href="">Serviços</a></li>
            <li><a href="">Contatos</a></li>
          </ul>
          <ul>
            <li><a href="">Início</a></li>
            <li><a href="">Sobre</a></li>
            <li><a href="">Serviços</a></li>
            <li><a href="">Contatos</a></li>
          </ul>
        </div>
        <div className='footer-section-one-p2'>
          <ul className='contacts-container'>
            <h3>Contatos</h3>
            <li>(xx) xxxx-xxxx</li>
            <li><a href="maito:fluentify@gmail.com">fluentify@gmail.com</a></li>
          </ul>
          <ul className="icons-container">
            <li>
              <a href="">
                <img src={InstagramIcon} alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src={FacebookIcon} alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src={XIcon} alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src={WppIcon} alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='footer-section-two'>
        <p>Copyright @Fluentify - {currentYear}</p>
      </div>
    </footer>
  )
}

export default Footer;