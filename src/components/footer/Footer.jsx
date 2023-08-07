import style from './Footer.module.css';

import logo from '../../assets/icons/logo.svg';
import instagram from '../../assets/icons/Instagram.svg';
import twitter from '../../assets/icons/Twitter.svg';
import facebook from '../../assets/icons/Facebook.svg';

function Footer() {
  return (
    <footer className={style.wrapper}>
      <div className={style.container}>
        <div className={style.inner}>
          <div className={style.logo}>
            <img src={logo} alt="logo" />
            <div className={style.title}>
              <span>MangoRead</span>
              <p>Читай мангу с нами</p>
            </div>
          </div>
          <ul className={style.links}>
            <li>
              <a href="#">
                <img src={facebook} alt="facebook" />
                <span>Link One</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src={instagram} alt="instagram" />
                <span>Link Two</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src={twitter} alt="twitter" />
                <span>Link Three</span>
              </a>
            </li>
          </ul>
          <iframe
            className={style.map}
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.6602949023546!2d-0.1280986843270862!3d51.5073003172518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce9e3d63ab%3A0xb657d3a91467d2e0!2sBig%20Ben!5e0!3m2!1sen!2suk!4v1566394202155!5m2!1sen!2suk"
            width="400"
            height="250"
            frameBorder="0"
            allowFullScreen=""
            loading="lazy"
            style={{
              borderRadius: '20px',
              boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.15)',
            }}></iframe>
        </div>
      </div>
      <hr />
      <div className={style.copyright}>
        <span>©2022, All right reserved.</span>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Cookies Settings</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
