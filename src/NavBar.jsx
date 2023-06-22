import NavButton from './NavButton.jsx';

export default function NavBar(){
    return <>
        <div id='NavBar'>
            <div className='nav-bar-content content-boundary'>
                <NavButton children='Services' className='active'/>
                <NavButton children='Projects'/>
                <NavButton children='About'/>
                <NavButton children='Contact'/>
            </div>
        </div>
    </>
}