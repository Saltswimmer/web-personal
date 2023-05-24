/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { generate } from "shortid";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { IoLogoReact } from "react-icons/io5";
import { BsGithub } from "react-icons/bs";

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

    return <div className="Sidebar">
        <h2 className="LogoName">Ethan Ciavolella</h2>
    </div>
}

function Navbar() {

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

    return <div className="Navbar">
        <Navlink title='About' section='#about'/>
        <Navlink title='Projects' section='#projects'/>
        <Navlink title='Top' section='#top' disable={hideTopLink}/>
    </div>
    
}

function ProjectModal({texturl}) {
    const [text, setText] = useState('');

    useEffect(() => {
        let fetchText = async function () {
            try {
                const response = await fetch(texturl);
                setText(await response.text());
              } catch (error) {
                setText('Error loading resource')
              }
        }

        fetchText();
    }, [texturl]);

    return <dialog id={texturl}>
        <div className="ModalBackgroundBlur">
            <ReactMarkdown>{text}</ReactMarkdown>
        </div>
    </dialog>
}

function Project({src, caption, texturl}) {

    return <span className='Project' onClick={() => document.getElementById(texturl).showModal()}>
        <img width={625} src={src} alt={caption}/>
        <h2>{caption}</h2>
        <ProjectModal texturl={texturl}/>
    </span>;
}

export default function Index() {
    return <>
        <span id='top' />
        <Sidebar />
        <Navbar />

        <div className="Section">
            <img src='logo.svg' alt='Ethan Ciavolella logo'/>
            <h1>Committed to excellence.<br />Driven by creativity.</h1>
        </div>
        <div id='about' className="Section">
            <h2>About me</h2>
            <p>
                I earned my bachelor&apos;s degree in computer science
                at Rowan University in May 2023.
                <br></br>
            </p>
            <br></br>
            <h2>About this site</h2>
            <p>
                This site was created using <a href='https://react.dev/'><IoLogoReact />React. </a>
                You can view the source code over on my <a href='https://github.com/Saltswimmer/web-personal/'><BsGithub />GitHub page.</a>
            </p>
        </div>
        <div id='projects' className="Section">
            <Project id={generate()} src='harbour.png' caption='Harbour' texturl='/projects/project-1.md'/>
            <Project id={generate()} src='harbour.png' caption='Ochre' texturl='/projects/project-2.md'/>
            <Project id={generate()} src='harbour.png' caption='Project Cranefly' texturl='/projects/project-3.md'/>
        </div>
    </>
}