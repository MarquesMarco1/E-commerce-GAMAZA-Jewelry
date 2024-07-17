import cart from '../assets/cart.svg';
import profile from '../assets/profile.svg';
import lotus from '../assets/lotus.svg';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="flex items-center justify-between bg-light-purple h-24 mt-10">
            <Link to={`/`}>
                <img src={lotus} className='ml-24' alt="logo of a lotus that redirect to the landing/home page" />
            </Link>
            <h1 className='text-gold font-primary font-normal text-6xl'>Gamaza Jewelry</h1>
            <div className='flex mr-24'>
                <Link to={`/profile`}>
                    <img src={profile} className='mr-8' alt="logo of a person that redirect to your profile and the edition or suppression of your profile" />
                </Link>
                <Link to={`/cart`}>
                    <img src={cart} className='gold' alt="logo of a cart that redirect to your cart and the finalization of your order" />
                </Link>
            </div>
        </header>
    );
}