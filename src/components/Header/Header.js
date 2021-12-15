import './Header.modules.css';
import logo from '../../img/logo.svg';
import avatar from '../../img/avatar.png';

function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__left">
                    <img src={logo} />
                </div>
                <div className="header__right">
                    <span className="header__right_notification active">
                        <span className="header__right_notification--new"></span>
                    </span>
                    <span className="header__right_settings"></span>
                    <img src={avatar} />
                </div>
            </div>
        </header>
    );
}

export default Header;