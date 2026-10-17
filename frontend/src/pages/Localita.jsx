import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import SEOHead from '../components/SEOHead';

const localita = [
  { nome: "Bellizzi", distanza: "Sede", descrizione: "La nostra sede principale si trova in Via Kennedy 66" },
  { nome: "Salerno", distanza: "15 km", descrizione: "Raggiungi il nostro studio in soli 15 minuti dal centro di Salerno" },
  { nome: "Battipaglia", distanza: "8 km", descrizione: "Vicini a Battipaglia, facilmente raggiungibili dalla SS18" },
  { nome: "Eboli", distanza: "15 km", descrizione: "Serviamo pazienti da Eboli e dalla Piana del Sele" },
  { nome: "Pontecagnano Faiano", distanza: "10 km", descrizione: "A pochi minuti dall'aeroporto di Salerno" },
  { nome: "Montecorvino Rovella", distanza: "12 km", descrizione: "Facilmente accessibile dai Monti Picentini" },
  { nome: "Montecorvino Pugliano", distanza: "10 km", descrizione: "Vicini a tutto il territorio montecorvino" },
  { nome: "Giffoni Valle Piana", distanza: "20 km", descrizione: "Serviamo anche la Valle del Picentino" },
  { nome: "Baronissi", distanza: "25 km", descrizione: "Ben collegati con l'area universitaria" },
  { nome: "Fisciano", distanza: "28 km", descrizione: "Vicini all'Università di Salerno" },
  { nome: "Nocera Inferiore", distanza: "30 km", descrizione: "Raggiungi il nostro studio dall'Agro Nocerino" },
  { nome: "Cava de' Tirreni", distanza: "25 km", descrizione: "Serviamo pazienti dalla Costa d'Amalfi" }
];

const Localita = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Nutrizionista Salerno e Provincia - Zone Servite"
        description="Centro Metis - Nutrizionista a Bellizzi che serve tutta la provincia di Salerno: Battipaglia, Eboli, Pontecagnano, Montecorvino, Baronissi, Fisciano. Prenota la tua consulenza."
        keywords="nutrizionista salerno provincia, nutrizionista battipaglia, nutrizionista eboli, nutrizionista pontecagnano, dietologo salerno, nutrizionista montecorvino, nutrizionista baronissi"
        canonical="/zone-servite"
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-metis-600 via-metis-600 to-metis-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nutrizionista Salerno e Provincia
          </h1>
          <p className="text-xl text-metis-100 max-w-3xl mx-auto">
            Il Centro Metis serve pazienti da tutta la provincia di Salerno. 
            Scopri quanto siamo vicini a te!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Info Box */}
        <Card className="mb-12 border-metis-200 bg-metis-50">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-metis-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">La Nostra Sede</h2>
                  <p className="text-gray-600">Via John Fitzgerald Kennedy, 66 - 84092 Bellizzi (SA)</p>
                </div>
              </div>
              <div className="flex gap-4">
                <a href="tel:+390828526615">
                  <Button className="bg-metis-600 hover:bg-metis-700 rounded-full">
                    <Phone className="w-4 h-4 mr-2" />
                    0828 52615
                  </Button>
                </a>
                <Link to="/prenota">
                  <Button variant="outline" className="border-metis-600 text-metis-600 hover:bg-metis-100 rounded-full">
                    Prenota Visita
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Località Grid */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Zone Servite</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {localita.map((loc, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{loc.nome}</h3>
                  <span className="bg-metis-100 text-metis-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {loc.distanza}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{loc.descrizione}</p>
                <div className="flex items-center text-metis-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Consulenze disponibili
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SEO Content */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Il Tuo Nutrizionista di Fiducia nella Provincia di Salerno
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              <strong>Centro Metis</strong> è lo studio nutrizionale di riferimento per chi cerca un 
              <strong> nutrizionista a Salerno e provincia</strong>. Situati strategicamente a Bellizzi, 
              siamo facilmente raggiungibili da tutti i comuni della zona: <strong>Battipaglia, Eboli, 
              Pontecagnano, Montecorvino, Baronissi, Fisciano</strong> e molti altri.
            </p>
            <p className="mb-4">
              Offriamo consulenze specialistiche in <strong>bioterapia nutrizionale</strong>, 
              <strong> dieta chetogenica</strong>, <strong>nutrizione sportiva</strong> e 
              piani alimentari personalizzati per ogni esigenza. Il nostro approccio scientifico 
              e personalizzato ha già aiutato centinaia di pazienti nella provincia di Salerno.
            </p>
            <p className="mb-4">
              Cerchi un <strong>dietologo a Salerno</strong>? Un <strong>nutrizionista a Battipaglia</strong>? 
              O forse un esperto in <strong>diete a Eboli</strong>? Centro Metis è la risposta. 
              La nostra posizione centrale ci permette di servire efficacemente tutta l'area salernitana.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-metis-600 to-metis-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Prenota la Tua Consulenza</h2>
          <p className="text-metis-100 mb-8 max-w-2xl mx-auto">
            Indipendentemente da dove ti trovi nella provincia di Salerno, siamo pronti ad aiutarti 
            nel tuo percorso verso il benessere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/prenota">
              <Button size="lg" className="bg-white text-metis-600 hover:bg-metis-50 rounded-full px-8">
                Prenota Online
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="tel:+390828526615">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
                <Phone className="mr-2 w-5 h-5" />
                Chiama Ora
              </Button>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Localita;
