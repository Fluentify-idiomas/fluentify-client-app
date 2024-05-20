import './style.css';

import Astrounat from '/imgs/astronaut.svg';
import PcFlagsLightning from '/imgs/pc-flags-lightning.svg';
import ManReading from '/imgs/man-reading.svg';

import Footer from '@/components/Footer/index';
import Card from '@/components/LandingPage/Card';
// import Footer from '../../components/Footer';


function RegisterCallToActionButton() {
  return (
    <a className="register-cta-btn" href="/register">APRENDER</a>
  )
}

function LoginCallToActionButton() {
  return (
    <a className="login-cta-btn" href="/login">JA TEM CONTA ?</a>
  )
}

function Header() {
  return (
    <div className='header-container'>
      <a href="#">
        <p className='logo'>FLUENTIFY</p>
      </a>
      <nav className="header-nav-container">
        <ul className="header-list-container">
          <li>
            <a href="#">Inicío</a>
          </li>
          <li>
            <a href="#metodos-ensino">Métodos</a>
          </li>
          <li>
            <a href="#idiomas">Idiomas</a>
          </li>
          <li>
            <a href="#7-dias">7 dias</a>
          </li>
        </ul>
        <RegisterCallToActionButton />
      </nav>
    </div>
  )
}

function DuoCtaBtn() {
  return (
    <div className='duo-cta-btn'>
      <RegisterCallToActionButton />
      <LoginCallToActionButton />
    </div>
  )
}

function LandingPage() {
  return (
    <>
      <Header />
      <section className='first-section-container'>
        <div className='first-section-one'>
          <h1>
            Cultura e <span className='text-color-one'>Intercâmbio</span><br/>
            Linguistico na <span className='text-color-two'>Fluentify</span>
          </h1>
          <p>
            Junte-se à nossa comunidade e mergulhe em uma<br />
            experiência enriquecedora de aprendizado.
          </p>
          <DuoCtaBtn />
        </div>
        <div className='first-section-two'>
          <img src={Astrounat} alt="" />
        </div>
      </section>
      <section id="metodos-ensino" className='mountain-one'></section>
      <section className='second-section-container'>
        <h1>Métodos de Ensino</h1>
        <div className='second-section-container-inside'>
          <div className='second-section-one'>
            <ul>
              <li>
                <Card icon="/imgs/voice-recognition.svg" texts={["Reconhecimento", "de Voz"]} alt="" />
              </li>
              <li>
                <Card icon="/imgs/social.svg" texts={["Interação", "Social"]} alt="" />
              </li>
              <li>
                <Card icon="/imgs/goals.svg" texts={["Metas e", "Objetivos"]} alt="" />
              </li>
            </ul>
            <ul>
              <li>
                <Card icon="/imgs/gaming.svg" texts={["Aprendizado", "Gamificado"]} alt="" />
              </li>
              <li>
                <Card icon="/imgs/feedback.svg" texts={["Feedback", "Imediato"]} alt="" />
              </li>
              <li>
                <Card icon="/imgs/online-teacher.svg" texts={["Professores", "Online"]} alt="" />
              </li>
            </ul>
          </div>
          <div className='second-section-two'>
            <h2>
              Só quem quer <span className='text-color-one'>Aprender</span><br />
              faz com a <span className='text-color-two'>FLUENTIFY</span>
            </h2>
            <p>
              Temos a melhor metodologia do mercado para garantir que<br />
              você aprenda com eficiência.
            </p>
            <DuoCtaBtn />
          </div>
        </div>
      </section>
      <section id="idiomas" className='mountain-two'></section>
      <section className='third-section-container'>
        <h1>
          6 idiomas para aprender com <span className='text-color-one'>Maestria</span><br/>
          Na plataforma da <span className='text-color-two'>FLUENTIFY</span>
        </h1>
        <div className='third-section-one'>
          <ul>
            <li>INGLÊS</li>
            <li>ESPANHOL</li>
            <li>INGLÊS</li>
            <li>FRANCÊS</li>
            <li>ALEMÃO</li>
            <li>GRÊGO</li>
            <li>HOLANDÊS</li>
          </ul>
          <img src={PcFlagsLightning} />
        </div>
      </section>
      <section id="7-dias" className="mountain-three"></section>
      <section className='fourth-section-container'>
        <img src={ManReading} alt="" />
        <div className='fourth-section-one'>
          <div className='fourth-section-two'>
            <h1>
              Crie sua conta e comece <span className='text-color-one'>Agora</span><br />
              a estudar com a <span className='text-color-two'>FLUENTIFY</span>
            </h1>
            <p>
              Venha sem compromisso com a possibilidade de<br />
              realizar um reembolso em até 7 dias
            </p>
            <DuoCtaBtn></DuoCtaBtn>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default LandingPage;