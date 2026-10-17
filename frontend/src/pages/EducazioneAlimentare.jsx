import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Phone, ArrowRight, Calendar, Clock, MapPin, Download, Users } from 'lucide-react';
import SEOHead from '../components/SEOHead';

// Calendario degli incontri gratuiti 2025/2026
// NOTA: Aggiornare questo array ogni anno con i nuovi incontri
const incontriGratuiti = [
  {
    id: 1,
    argomento: "Sindrome dell'ovaio policistico e insulino resistenza",
    data: "26 Settembre 2025",
    ora: "20:00",
    mese: "Settembre"
  },
  {
    id: 2,
    argomento: "Terapia farmacologica: un aiuto alla dieta",
    data: "24 Ottobre 2025",
    ora: "20:00",
    mese: "Ottobre"
  },
  {
    id: 3,
    argomento: "Psicologia della fame",
    data: "28 Novembre 2025",
    ora: "20:00",
    mese: "Novembre"
  },
  {
    id: 4,
    argomento: "Cuciniamo! E ci scambiamo gli auguri di Natale",
    data: "19 Dicembre 2025",
    ora: "Da definire",
    mese: "Dicembre",
    speciale: true
  },
  {
    id: 5,
    argomento: "Qual è la dieta per me? Risponde la doc",
    data: "30 Gennaio 2026",
    ora: "20:00",
    mese: "Gennaio"
  },
  {
    id: 6,
    argomento: "Lipedema e linfedema: cosa sono e qual è la terapia nutrizionale",
    data: "27 Febbraio 2026",
    ora: "20:00",
    mese: "Febbraio"
  },
  {
    id: 7,
    argomento: "Gestire lo stress: mindfulness, alimentazione e fisioterapia",
    data: "27 Marzo 2026",
    ora: "20:00",
    mese: "Marzo"
  },
  {
    id: 8,
    argomento: 'La nostra salute e la salute del mondo: il modello "One Health"',
    data: "8 Maggio 2026",
    ora: "20:00",
    mese: "Maggio"
  }
];

// URL del PDF - Aggiornare ogni anno con il nuovo file
const PDF_URL = "/educazione-alimentare-2025-2026.pdf";

const EducazioneAlimentare = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEOHead 
        title="Educazione Alimentare - Incontri Gratuiti 2025/2026 | Centro Metis Bellizzi"
        description="Incontri gratuiti di educazione alimentare al Centro Metis di Bellizzi (SA). PCOS, terapia farmacologica, psicologia della fame, lipedema, stress e alimentazione. Dott.ssa Paola Buoninfante."
        keywords="educazione alimentare bellizzi, incontri gratuiti nutrizione, corsi alimentazione salerno, PCOS dieta, lipedema nutrizione, psicologia fame, Centro Metis"
        canonical="/educazione-alimentare"
      />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-metis-600 via-metis-600 to-metis-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">
            Incontri Gratuiti
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">Educazione Alimentare</h1>
          <p className="text-lg md:text-xl text-metis-100 max-w-3xl mx-auto leading-relaxed">
            Calendario degli incontri gratuiti 2025/2026 presso il Centro Metis. 
            Un'opportunità per imparare e condividere insieme.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Download PDF Section */}
        <div className="bg-gradient-to-br from-metis-50 to-metis-50 rounded-3xl p-8 md:p-12 mb-16 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-metis-600 to-metis-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Calendario Incontri 2025/2026
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Scarica il calendario completo degli incontri gratuiti di educazione alimentare. 
            Ti aspettiamo al Centro Metis!
          </p>
          <a 
            href={PDF_URL} 
            download="Educazione-Alimentare-Centro-Metis-2025-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 rounded-full px-8 shadow-lg">
              <Download className="w-5 h-5 mr-2" />
              Scarica il Calendario PDF
            </Button>
          </a>
        </div>

        {/* Incontri Grid */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Prossimi Incontri</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tutti gli incontri sono gratuiti e aperti a tutti. Non è necessaria la prenotazione.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {incontriGratuiti.map((incontro) => (
              <Card 
                key={incontro.id}
                className={`overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg rounded-2xl ${
                  incontro.speciale ? 'bg-gradient-to-br from-amber-50 to-orange-50 ring-2 ring-amber-200' : 'bg-white'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                        incontro.speciale 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-metis-100 text-metis-700'
                      }`}>
                        {incontro.mese}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {incontro.argomento}
                      </h3>
                    </div>
                    {incontro.speciale && (
                      <span className="text-2xl">🎄</span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-metis-600" />
                      <span>{incontro.data}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-metis-600" />
                      <span>{incontro.ora}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Location */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-metis-600 to-metis-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Dove si svolgono</h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Tutti gli incontri si svolgono presso il <strong>Centro Metis</strong> della Dott.ssa Paola Buoninfante.
              </p>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-metis-600" />
                  <span>Via Kennedy, 66 - Bellizzi (SA)</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-metis-600" />
                  <span>0828 52615 | 330 670 225</span>
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-metis-50 to-metis-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-8 h-8 text-metis-600" />
                <h4 className="text-lg font-bold text-gray-900">Partecipazione</h4>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-metis-600 font-bold">✓</span>
                  <span>Incontri gratuiti e aperti a tutti</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-metis-600 font-bold">✓</span>
                  <span>Non è necessaria la prenotazione</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-metis-600 font-bold">✓</span>
                  <span>Condotti dalla Dott.ssa Buoninfante</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-metis-600 font-bold">✓</span>
                  <span>Spazio per domande e confronto</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-br from-metis-600 via-metis-600 to-metis-700 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vuoi maggiori informazioni?
          </h2>
          <p className="text-metis-100 text-lg mb-8 max-w-2xl mx-auto">
            Contattaci per qualsiasi domanda sugli incontri di educazione alimentare o per prenotare una consulenza nutrizionale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+390828526155">
              <Button size="lg" className="bg-white text-metis-700 hover:bg-metis-50 w-full sm:w-auto rounded-full px-8 shadow-lg">
                <Phone className="w-5 h-5 mr-2" />
                0828 52615
              </Button>
            </a>
            <Link to="/contatti">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto rounded-full px-8">
                Contattaci
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducazioneAlimentare;
