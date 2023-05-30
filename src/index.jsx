/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { generate } from "shortid";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { IoLogoReact } from "react-icons/io5";
import { BsGithub } from "react-icons/bs";
import { MdArrowBack, MdClose, MdArrowForward } from "react-icons/md";

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

function ProjectModal({texturl, videoEmbed, onClose}) {
    const [text, setText] = useState('');
    const dialog = useRef(null);

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

    return <div className="Isolate"><dialog
        id={texturl}
        onClose={onClose}
        ref={dialog}
    >
        <div tabIndex={0} />
        <div style={{display: 'flex', justifyContent: 'space-around', position: "sticky", background: "white"}}>
            <MdArrowBack tabIndex={1}/>
            <MdClose tabIndex={2} onClick={()=>dialog.current.close()}/>
            <MdArrowForward tabIndex={3} onClick={()=>{}}/>
        
        </div>
        <ReactMarkdown>{text}</ReactMarkdown>
        {videoEmbed}
    </dialog></div>
}

function Project({src, caption, texturl, children}) {
    const [open, setOpen] = useState(false);
    const modal = useRef(null);

    let handleClose = () => {
        setOpen(false);
        document.body.classList.remove('NoScroll');
    }

    useEffect(() => {
        if (open) {
            document.addEventListener('click', (e) => {
                if (modal.current && !modal.current.contains(e.target)) {
                    document.getElementById(texturl).close();
                }}
            )
        }
    }, [open, texturl])

    return <span className='Project' onClick={() => {
            document.getElementById(texturl).showModal();
            document.body.classList.add('NoScroll');
            setOpen(true);
        }}>
        <img width={625} src={src} alt={caption}/>
        <h2>{caption}</h2>
        <ProjectModal ref={modal} texturl={texturl} videoEmbed={children} onClose={handleClose}/>
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
            <h1>About me</h1>
            <p>
                I earned my bachelor&apos;s degree in computer science
                at Rowan University in May 2023. The languages I am most proficient at
                include:
                <ul>
                    <li>Java</li>
                    <li>Javascript</li>
                    <li>C++</li>
                    <li>Python</li>
                </ul><br></br>
                Below are some libraries and platforms I&apos;ve used over the years:
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
            </p>
            <h2>Awards and Accomplishments</h2>
            <p>
                <ul>
                    <li>B.S. Computer Science, 3.9/4.0 GPA</li>
                    <li>John H. Martinson Honors College graduate</li>
                    <li>2x Rowan University President&apos;s Scholars of Excellence List</li>
                    <li>7x Rowan University Dean&apos;s List</li>
                </ul>
            </p>
            <br></br>
            <h2>About this site</h2>
            <p>
                This site was created using <a href='https://react.dev/'><IoLogoReact />React. </a>
                You can view the source code over on my <a href='https://github.com/Saltswimmer/web-personal/'><BsGithub />GitHub page.</a>
            </p>
        </div>
        <div id='projects' className="Section">
            <h1>Projects</h1>
            <Project id={generate()} src='harbour.png' caption='Harbour' texturl='/projects/project-1.md'/><br></br>
            <Project id={generate()} src='ochre_0.png' caption='Ochre' texturl='/projects/project-2.md'>
                <video controls loop width='500px'>
                    <source src='ochre_footage.mp4' type='video/mp4'/>
                </video>
            </Project>
            <br></br>
            <Project id={generate()} src='harbour.png' caption='Project Cranefly' texturl='/projects/project-3.md'/><br></br>
        </div>
    </>
}