import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="footer">
            <h5>&copy; 2021 | <Link to="/about">About</Link></h5>
        </div>
    )
}

export default Footer