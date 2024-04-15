import Card from '../../components/Card/Card';
import './LandingPage.css';
import Astrounat from '/imgs/astronaut.svg';

function RegisterCallToActionButton() {
  return (
    <a className="register-cta-btn" href="">APRENDER</a>
  )
}

function LoginCallToActionButton() {
  return (
    <a className="login-cta-btn" href="">JA TEM CONTA ?</a>
  )
}

function Header() {
  return (
    <div className='header-container'>
      {/* <img src="" alt="" /> */}
      <a href="">
        <p className='logo'>FLUENTIFY</p>
      </a>
      <nav className="header-nav-container">
        <ul className="header-list-container">
          <li>
            <a href="">Inicío</a>
          </li>
          <li>
            <a href="">Sobre</a>
          </li>
          <li>
            <a href="">Serviços</a>
          </li>
        </ul>
        <RegisterCallToActionButton />
      </nav>
    </div>
  )
}

function Footer() {
  return (
    <>
      Footer
    </>
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
  console.log(Astrounat)

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
      <section className='mountain-one'></section>
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
      <section className='mountain-two'></section>
      <Footer />
    </>
  )
}

export default LandingPage;