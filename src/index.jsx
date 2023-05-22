/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

function Navlink({title, section, disable=false}) {

    const handleClick = (event) => {
        event.preventDefault();

        let target = document.querySelector(section);
        target.scrollIntoView({ behavior: 'smooth' });
    }

    if (disable) {
        return <a className="Navlink disable">{title}</a>
    }
    return <a className="Navlink" onClick={handleClick}>{title}</a>
}

function Sidebar() {

    let [hideTopLink, setHideTopLink] = useState(true);

    useEffect(function () {
        const handleScroll = () => {
            if (window.scrollY > 575) {
                setHideTopLink(false);
            } else if (window.scrollY < 565) {
                setHideTopLink(true);
            }
        }
        
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

    }, []);
    

    return <div className="Sidebar">
        <h3 className="Logo">Ethan Ciavolella</h3>
        <span className="Navbar">
            <Navlink title='About' section='#about'/>
            <Navlink title='Projects' section='#projects'/>
            <Navlink title='Top' section='#top' disable={hideTopLink}/>
        </span>
    </div>
}

export default function Index() {
    return <>
        <span id='top' />
        <Sidebar />
        <div className="Content">
            <div className="Section">
                <h1>Committed to excellence, driven by creativity.</h1>
            </div>
            <div id='about' className="Section">
            </div>
            <div id='projects' className="Section">
                <p>Lorem ipsum doler sit amet</p>
            </div>
        </div>
    </>
}