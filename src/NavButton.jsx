export default function NavButton(props){
    const {children, className} = props;

    return <button className={`nav-bar-button ${className}`}>{children}</button>
}