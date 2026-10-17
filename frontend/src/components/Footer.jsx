import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { contactInfo } from '../mock/mockData';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6 bg-white p-4 rounded-2xl inline-block shadow-lg">
              <img 
                src={`${process.env.REACT_APP_BACKEND_URL}/api/uploads/logo.webp`}
                alt="Centro Metis Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Studio nutrizionale che offre consulenze specialistiche e percorsi personalizzati per il tuo benessere.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/share/18657L7gvn/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-metis-500 hover:to-metis-600 transition-all duration-300 shadow-lg">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/centro_metis?igsh=MTZnM2N6Y29kaWx5dQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-metis-500 hover:to-metis-600 transition-all duration-300 shadow-lg">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Link Rapidi</h3>
            <ul className="space-y-3">
              <li><Link to="/chi-siamo" className="text-sm text-gray-400 hover:text-metis-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-metis-500 rounded-full"></span>Chi Siamo</Link></li>
              <li><Link to="/servizi" className="text-sm text-gray-400 hover:text-metis-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-metis-500 rounded-full"></span>Servizi</Link></li>
              <li><Link to="/prodotti" className="text-sm text-gray-400 hover:text-metis-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-metis-500 rounded-full"></span>Prodotti</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-400 hover:text-metis-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-metis-500 rounded-full"></span>Blog</Link></li>
              <li><Link to="/zone-servite" className="text-sm text-gray-400 hover:text-metis-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-metis-500 rounded-full"></span>Zone Servite</Link></li>
              <li><Link to="/prenota" className="text-sm text-gray-400 hover:text-metis-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-metis-500 rounded-full"></span>Prenota Visita</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Servizi</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-400 hover:text-metis-400 transition-colors cursor-pointer">Bioterapia Nutrizionale</li>
              <li className="text-gray-400 hover:text-metis-400 transition-colors cursor-pointer">Dieta Chetogenica</li>
              <li className="text-gray-400 hover:text-metis-400 transition-colors cursor-pointer">Nutrizione Sportiva</li>
              <li className="text-gray-400 hover:text-metis-400 transition-colors cursor-pointer">Nutrizione in Gravidanza</li>
              <li className="text-gray-400 hover:text-metis-400 transition-colors cursor-pointer">Nutrizione Oncologica</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Contatti</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-metis-500" />
                </div>
                <span className="text-sm text-gray-400">
                  {contactInfo.address}<br />
                  {contactInfo.city}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-metis-500" />
                </div>
                <div className="flex flex-col">
                  <a href="tel:+39330670225" className="text-sm text-gray-400 hover:text-metis-400 transition-colors font-semibold">
                    330 670 225 (Cellulare)
                  </a>
                  <a href={`tel:${contactInfo.phone}`} className="text-sm text-gray-400 hover:text-metis-400 transition-colors">
                    {contactInfo.phone} (Fisso)
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-metis-500" />
                </div>
                <a href={`mailto:${contactInfo.email}`} className="text-sm text-gray-400 hover:text-metis-400 transition-colors">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Centro Metis. Tutti i diritti riservati. | Iscrizione Albo n. 052079
          </p>
          <Link 
            to="/admin" 
            className="text-xs text-gray-600 hover:text-metis-400 transition-colors mt-2 inline-block"
          >
            Area Riservata
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;