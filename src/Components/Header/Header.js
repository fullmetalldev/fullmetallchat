import React from 'react';
import userLogo from "./userlogo.svg"
import "./header.css"

const Header = ({userForm, setUserForm, user}) => {
    return (
        <header className="header">
            <div className="container">
                <nav className="header__row">
                    <div>
                        <h2 className="appName">FullmetallChat</h2>
                    </div>
                    {user !== ""
                        ? <div>
                            <img className="regiseterLogo" src={user.avatar} alt=""/>
                            {user.login}
                        </div>
                        : <div onClick={()=> setUserForm(!userForm)}>
                            <span>Войти</span>
                            <img className="regiseterLogo" src={userLogo} alt=""/>
                        </div>}
                </nav>
            </div>
        </header>
    );
};

export default Header;