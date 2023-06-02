/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
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
        <div style={{display: 'inline-block'}}>
            <a 
                style={{paddingRight: '16px'}}
                href='https://www.linkedin.com/in/ethan-ciavolella-962432193/'
            ><img width='32px' src='li.svg' alt='My LinkedIn'></img></a>
            <a href='https://github.com/Saltswimmer/'><img width='32px' src='github-mark-white.svg' alt='My GitHub page'></img></a>
        </div>
    </div>
}

function Navbar() {

    let [hideTopLink, setHideTopLink] = useState(true);

    useEffect(function () {
        const handleScroll = () => {
            if (window.scrollY > 700) {
                setHideTopLink(false);
            } else if (window.scrollY < 675) {
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

function ProjectModal({ texturl, videoEmbed, onClose }) {
    const [text, setText] = useState('');
    const modal = useRef(null);
    
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

    if (modal.current) {
        modal.current.scrollTop = 0;
    }
    
    return <div className="Isolate"><dialog
        id={texturl}
        onClose={() => {
            onClose();
        }}
        ref={modal}
    >
        {videoEmbed}
        <ReactMarkdown>{text}</ReactMarkdown>
        <span style={{display: 'flex', justifyContent: 'center'}}><h4 style={{textAlign: "right"}} onClick={() => document.getElementById(texturl).close()}>Close</h4></span>
    </dialog></div>
}

function Project({src, caption, texturl, children}) {
    const [open, setOpen] = useState(false);

    let handleClose = () => {
        setOpen(false);
        document.body.classList.remove('NoScroll');
    }
    
    return <span className='Project' onClick={() => {
        if (!open) {
            document.getElementById(texturl).showModal();
            document.body.classList.add('NoScroll');
            setOpen(true);
        }
    }}>
    <img width={625} src={src} alt={caption}/>
    <h2 style={{textAlign: 'center'}}>{caption}</h2>
    <ProjectModal texturl={texturl} videoEmbed={children} onClose={handleClose} />
    </span>;
}

export default function Index() {
    return <>
        <span id='top' />
        <Sidebar />
        <Navbar />

        <div className="Section" style={{minHeight: "700px"}}>
            <h1 style={{textAlign: "center",paddingBottom: "25px"}}>Committed to excellence.<br />Driven by creativity.</h1>
            <br/>
            <img src='logo.svg' alt='Ethan Ciavolella logo' style={{mixBlendMode: 'difference', maxWidth:'45%'}}/>
        </div>
        <div id='about' className="Section">
            <h1>About me</h1>
            <p>
                I earned my bachelor&apos;s degree in computer science
                at Rowan University in May 2023. My career interests include
                web design, user interface/user experience, and application development.
                I also develop video games as a hobby in my spare time.
                
                The languages I am most proficient at
                include:
            </p>
            <ul>
                <li>Java</li>
                <li>Javascript</li>
                <li>C++</li>
                <li>Python</li>
                <br></br>Below are some libraries and platforms I&apos;ve used over the years:
            </ul>
            <ul>
                <li>Web and UI design
                    <ul>
                        <li>React</li>
                        <li>CSS</li>
                        <li>JavaFX</li>
                    </ul>
                </li>
                <li>Databases
                    <ul>
                        <li>MySQL</li>
                        <li>PostgreSQL</li>
                    </ul>
                </li>
                <li>Scientific
                    <ul>
                        <li>Matplotlib</li>
                        <li>MATLAB</li>
                    </ul>
                </li>
                <li>Game development
                    <ul>
                        <li>Unity</li>
                        <li>Unreal Engine 4</li>
                        <li>Godot</li>
                    </ul>
                </li>
            </ul> 
            <p>
                As of June 2023, I am seeking employment for a full-time position.
                Check my LinkedIn page for more information.
            </p>
            <h2>Awards and Accomplishments</h2>
            <ul>
                <li>B.S. Computer Science, 3.9/4.0 GPA</li>
                <li>John H. Martinson Honors College graduate</li>
                <li>2x Rowan University President&apos;s Scholars of Excellence List</li>
                <li>7x Rowan University Dean&apos;s List</li>
            </ul>
            <h2>About this site</h2>
            <p>
                This website was created using <a href='https://react.dev/'><IoLogoReact />React. </a>
                You can view the source code over on my <a href='https://github.com/Saltswimmer/web-personal/'><BsGithub />GitHub page.</a>
            </p>
        </div>
        <div id='projects' className="Section">
            <h1>Projects</h1>
            <Project id={generate()} src='harbour.png' caption='Harbour' texturl='/projects/project-1.md'>
            </Project><br></br>
            <Project id={generate()} src='ochre.png' caption='Ochre' texturl='/projects/project-2.md'>
                <video controls loop width='500px'>
                    <source src='ochre_footage.mp4' type='video/mp4'/>
                </video>
            </Project><br></br>
            <Project id={generate()} src='cranefly.png' caption='Project Cranefly' texturl='/projects/project-3.md'>
            </Project><br></br>
        </div>
        <div id='footer' className="Section"><p>©2023 Ethan Ciavolella<br></br>For business or other inquiries, contact me at ethanciavo@gmail.com.</p></div>
    </>
}