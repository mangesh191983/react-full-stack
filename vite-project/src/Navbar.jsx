import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to ='/'>Home</Link>
                </li>
                <li>
                    <Link to ='/articles_list'>Articles</Link>
                </li>                
                <li>
                    <Link to ='/news'>News</Link>
                </li>
            </ul>
        </nav>        
    );
}