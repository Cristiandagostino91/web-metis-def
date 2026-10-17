import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();
  const cartCount = getCartCount();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Chi Siamo', path: '/chi-siamo' },
    { name: 'Cibo e Medicina', path: '/il-cibo-sia-la-tua-medicina' },
    { name: 'Studio', path: '/studio-nutrizionale' },
    { name: 'Edu. Alimentare', path: '/educazione-alimentare' },
    { name: 'Servizi', path: '/servizi' },
    { name: 'Prodotti', path: '/prodotti' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contatti', path: '/contatti' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={`${process.env.REACT_APP_BACKEND_URL}/api/uploads/logo.webp`}
              alt="Centro Metis Logo" 
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-metis-600 bg-metis-50'
                    : 'text-gray-700 hover:text-metis-600 hover:bg-metis-50/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+39330670225" className="flex items-center space-x-2 text-gray-600 hover:text-metis-600 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">330 670 225</span>
            </a>
            
            {/* Admin link - hidden but kept in code
            <Link to="/admin" className="text-gray-500 hover:text-metis-600 transition-colors p-2 rounded-full hover:bg-metis-50">
              <User className="w-5 h-5" />
            </Link>
            */}

            {/* Cart - hidden but kept in code
            <Link to="/carrello" className="relative">
              <Button variant="outline" size="icon" className="relative rounded-full border-gray-200 hover:border-metis-500 hover:text-metis-600">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-metis-500 to-metis-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            */}

            <Link to="/prenota">
              <Button className="bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 text-white rounded-full px-6 shadow-md shadow-metis-500/20 transition-all hover:shadow-lg hover:shadow-metis-500/30">
                Prenota Visita
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Cart mobile - hidden but kept in code
            <Link to="/carrello" className="relative">
              <Button variant="outline" size="icon" className="relative rounded-full">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-metis-500 to-metis-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-metis-600 bg-metis-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <Link to="/prenota" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 text-white rounded-full">
                  Prenota Visita
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;