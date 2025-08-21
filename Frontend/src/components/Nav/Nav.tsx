import { useLocation } from 'react-router-dom'
import './Nav.css'
import { Link } from 'react-router-dom';

function Nav(){

    const location = useLocation();

    const navLinks = [
        { path: '/', text: 'Home' },
        { path: '/WorkPanel', text: 'Work Panel' },
        { path: '/daily-challenges', text: 'Daily challenges' },
        { path: '/randomChallenges', text: 'Random Challenge' },
        { path: '/studyMethods', text: 'Focus Mode/Pomodoro' },
        { path: '/calendar', text: 'Calendar/Planner' },
        { path: '/profile', text: 'Profile' },
        { path: '/statistics', text: 'Statistics' },
        { path: '/reports', text: 'Reports/Summary' },
        { path: '/goals', text: 'Goals' },
    ]

    return(
        <div className='.navContainerwrapeper'>
       
        <nav className='navContainer'>

            <div className='navUser'>
                <div className='navUserImgContainer'>
                            <img className='navUserImg' src="https://img.freepik.com/vector-premium/iconos-usuario-incluye-iconos-usuario-icones-personas-simbolos-elementos-diseno-grafico-calidad-premium_981536-526.jpg?semt=ais_hybrid&w=740" alt="" />
                </div>

                <div className='NavUserNameinfoContainer'>
                            <div className='NavUserNameContainer'>

                            <h3 className='NavUserNameh3'>FirstName</h3>
                            <h3 className='NavUserNameh3'>LastName</h3>
                            </div>
                            
                            <p  className='NavUserNamep'>Admin</p>
                </div>

            </div>
        

        <ul className='navLinks'>
            {navLinks.map((link) => (
                            <li
                            key={link.path}
                            className={`navLink ${location.pathname === link.path ? 'active' : ''}`}
                          >
                            <Link to={link.path}>{link.text}</Link>
                          </li>
            ))}

        </ul>
        </nav>

        </div>
    )
}
export default Nav
