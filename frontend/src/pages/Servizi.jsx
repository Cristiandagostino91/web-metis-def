import React, { useState, useEffect } from 'react';
import { getServices } from '../services/api';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Calendar, ArrowRight, CheckCircle, X } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import SEOHead from '../components/SEOHead';

// Mappa delle immagini corrette per i servizi (override del database)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const serviceImageOverrides = {
  'Dieta Chetogenica': `${BACKEND_URL}/api/uploads/dieta_chetogenica.jpg`,
  'Nutrizione Sportiva': `${BACKEND_URL}/api/uploads/nutrizione_sportiva.jpg`,
  'Dieta per lo Sport': `${BACKEND_URL}/api/uploads/nutrizione_sportiva.jpg`
};

// Applica le immagini corrette ai servizi
const getServiceImage = (service) => {
  return serviceImageOverrides[service.title] || service.image;
};

// Dettagli completi dei servizi
const serviceDetails = {
  "Bioterapia Nutrizionale": {
    fullDescription: `La Bioterapia Nutrizionale è un approccio terapeutico che utilizza il cibo come strumento di cura. Non si tratta semplicemente di una dieta, ma di un vero e proprio percorso di guarigione attraverso l'alimentazione.

Questo metodo si basa sulla conoscenza degli effetti che ogni alimento produce nell'organismo, considerando non solo l'apporto calorico ma soprattutto le reazioni biochimiche che innesca.

La Bioterapia Nutrizionale è particolarmente indicata per:
• Dimagrimento e ricomposizione corporea
• Patologie metaboliche (diabete, dislipidemie)
• Disturbi gastrointestinali
• Patologie autoimmuni
• Supporto in caso di patologie oncologiche
• Disturbi ormonali

Il percorso prevede una valutazione iniziale completa, seguita da controlli periodici per monitorare i progressi e adattare il piano alimentare alle esigenze del paziente.`,
    benefits: ["Approccio personalizzato", "Utilizzo del cibo come medicina", "Risultati duraturi", "Supporto costante"]
  },
  "Dieta Chetogenica": {
    fullDescription: `La Dieta Chetogenica è un protocollo alimentare a bassissimo contenuto di carboidrati che induce l'organismo a utilizzare i grassi come fonte primaria di energia, producendo i cosiddetti "corpi chetonici".

Questo approccio è scientificamente validato per:
• Perdita di peso rapida e significativa
• Riduzione della massa grassa preservando la massa muscolare
• Miglioramento dei parametri metabolici
• Controllo della glicemia nei pazienti diabetici
• Riduzione dell'infiammazione sistemica
• Miglioramento delle performance cognitive

Il protocollo chetogenico presso Centro Metis viene personalizzato in base alle esigenze individuali e monitorato attraverso:
• Analisi della composizione corporea
• Monitoraggio dei corpi chetonici
• Controlli ematici periodici
• Supporto motivazionale continuo

La durata del percorso varia in base agli obiettivi, con fasi di transizione guidate per il mantenimento dei risultati.`,
    benefits: ["Dimagrimento veloce", "Preserva la massa muscolare", "Riduce l'infiammazione", "Migliora l'energia"]
  },
  "Dieta per lo Sport": {
    fullDescription: `La Nutrizione Sportiva è fondamentale per ottimizzare le performance atletiche, accelerare il recupero e prevenire infortuni. Ogni sport ha esigenze nutrizionali specifiche che devono essere considerate.

I nostri piani per sportivi includono:
• Valutazione della composizione corporea con bioimpedenziometria
• Calcolo del fabbisogno energetico specifico per disciplina
• Timing dei nutrienti pre, durante e post allenamento
• Integrazione mirata quando necessario
• Strategie per la gestione del peso nelle discipline con categorie
• Piani per competizioni e gare

Ci occupiamo di atleti di diverse discipline:
• Sport di endurance (ciclismo, corsa, triathlon)
• Sport di forza (bodybuilding, powerlifting)
• Sport di squadra (calcio, basket, pallavolo)
• Sport da combattimento
• Fitness e CrossFit

L'obiettivo è massimizzare le performance rispettando la salute dell'atleta.`,
    benefits: ["Migliora le performance", "Accelera il recupero", "Previene infortuni", "Gestione del peso"]
  },
  "Alimentazione in Gravidanza e Allattamento": {
    fullDescription: `La gravidanza e l'allattamento sono momenti cruciali in cui l'alimentazione della madre influenza direttamente la salute del bambino. Un corretto apporto nutrizionale è fondamentale per:

Durante la gravidanza:
• Garantire lo sviluppo ottimale del feto
• Prevenire carenze di vitamine e minerali
• Controllare l'aumento di peso
• Ridurre il rischio di diabete gestazionale
• Prevenire l'anemia
• Gestire nausee e disturbi gastrointestinali

Durante l'allattamento:
• Assicurare la qualità del latte materno
• Mantenere le energie della neo-mamma
• Supportare il recupero post-parto
• Prevenire carenze nutrizionali

Il piano alimentare viene adattato trimestre per trimestre, considerando le diverse esigenze di ogni fase. Particolare attenzione viene posta alla supplementazione di acido folico, ferro, calcio, vitamina D e omega-3.`,
    benefits: ["Sviluppo ottimale del bambino", "Controllo del peso", "Prevenzione carenze", "Supporto energetico"]
  },
  "Nutrizione Oncologica": {
    fullDescription: `La Nutrizione Oncologica è un supporto fondamentale durante e dopo le terapie antitumorali. Una corretta alimentazione può migliorare significativamente la qualità della vita del paziente oncologico.

Obiettivi della nutrizione oncologica:
• Mantenere o recuperare un adeguato stato nutrizionale
• Preservare la massa muscolare
• Supportare il sistema immunitario
• Gestire gli effetti collaterali delle terapie (nausea, alterazioni del gusto, mucosite)
• Ridurre l'infiammazione
• Migliorare la tolleranza ai trattamenti

Il nostro approccio prevede:
• Valutazione nutrizionale completa
• Piano alimentare personalizzato in base al tipo di tumore e terapia
• Gestione delle problematiche alimentari specifiche
• Integrazione mirata quando necessario
• Collaborazione con l'équipe oncologica

Ogni paziente viene seguito con particolare attenzione e sensibilità, adattando continuamente il piano alle sue condizioni.`,
    benefits: ["Supporta le terapie", "Migliora la qualità della vita", "Gestisce effetti collaterali", "Preserva la massa muscolare"]
  },
  "Nutrizione Geriatrica": {
    fullDescription: `Con l'avanzare dell'età, le esigenze nutrizionali cambiano significativamente. La Nutrizione Geriatrica si occupa di prevenire e trattare la malnutrizione nell'anziano, condizione purtroppo molto frequente.

Problematiche nutrizionali dell'anziano:
• Sarcopenia (perdita di massa muscolare)
• Riduzione dell'appetito
• Difficoltà di masticazione e deglutizione
• Alterazioni del gusto e dell'olfatto
• Interazioni farmaco-nutrienti
• Malassorbimento

Il nostro approccio prevede:
• Valutazione dello stato nutrizionale
• Screening della sarcopenia
• Piano alimentare adattato alle capacità masticatorie
• Attenzione alla consistenza e palatabilità dei cibi
• Integrazione proteica quando necessaria
• Supplementazione di vitamina D e calcio per la salute ossea

L'obiettivo è mantenere l'autonomia e la qualità della vita il più a lungo possibile.`,
    benefits: ["Previene la sarcopenia", "Mantiene l'autonomia", "Adattato alle esigenze", "Migliora la qualità della vita"]
  },
  "Alimentazione Infanzia e Adolescenza": {
    fullDescription: `L'alimentazione durante l'infanzia e l'adolescenza pone le basi per la salute futura. È fondamentale instaurare corrette abitudini alimentari fin dai primi anni di vita.

Ci occupiamo di:
• Svezzamento e alimentazione del lattante
• Alimentazione del bambino in età prescolare e scolare
• Nutrizione dell'adolescente
• Disturbi del comportamento alimentare
• Obesità infantile e sovrappeso
• Selettività alimentare
• Allergie e intolleranze alimentari

Il nostro approccio con bambini e adolescenti:
• Coinvolgimento attivo della famiglia
• Educazione alimentare giocosa per i più piccoli
• Piani alimentari che rispettano i gusti del bambino
• Gestione del rapporto con il cibo senza imposizioni
• Supporto nelle fasi di crescita e sviluppo puberale

L'obiettivo non è solo nutrizionale ma anche educativo, per formare adulti consapevoli delle proprie scelte alimentari.`,
    benefits: ["Corrette abitudini alimentari", "Crescita ottimale", "Educazione alimentare", "Coinvolgimento familiare"]
  },
  "Nutrizione per la Menopausa": {
    fullDescription: `La menopausa rappresenta una fase di grandi cambiamenti per l'organismo femminile. Un'alimentazione mirata può aiutare a gestire i sintomi e prevenire le problematiche tipiche di questa fase.

Problematiche della menopausa:
• Vampate di calore
• Aumento di peso e redistribuzione del grasso corporeo
• Perdita di massa muscolare
• Osteoporosi
• Aumento del rischio cardiovascolare
• Alterazioni dell'umore e del sonno

Il nostro approccio nutrizionale:
• Alimenti ricchi di fitoestrogeni
• Adeguato apporto di calcio e vitamina D
• Controllo dell'indice glicemico
• Alimenti antinfiammatori
• Supporto per la salute cardiovascolare
• Strategie per il controllo del peso

Ogni donna vive la menopausa in modo diverso: il piano alimentare viene personalizzato in base ai sintomi specifici e alle esigenze individuali.`,
    benefits: ["Gestisce i sintomi", "Previene l'osteoporosi", "Controlla il peso", "Protegge il cuore"]
  }
};

const Servizi = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        toast({
          title: "Errore",
          description: "Impossibile caricare i servizi.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openServiceModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeServiceModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metis-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEOHead 
        title="Servizi Nutrizionali - Bioterapia, Dieta Chetogenica, Nutrizione Sportiva"
        description="Consulenze nutrizionali personalizzate a Bellizzi (SA). Bioterapia nutrizionale, dieta chetogenica, nutrizione sportiva, nutrizione in gravidanza. Prenota la tua visita."
        keywords="bioterapia nutrizionale bellizzi, dieta chetogenica salerno, nutrizionista sportivo, consulenza nutrizionale, dieta personalizzata"
        canonical="/servizi"
      />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-metis-600 via-metis-600 to-metis-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">
            Cosa Offriamo
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">I Nostri Servizi</h1>
          <p className="text-lg md:text-xl text-metis-100 max-w-2xl mx-auto">
            Bioterapia nutrizionale, consulenze specialistiche e piani alimentari personalizzati per ogni esigenza
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Services Grid - Centered */}
        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg rounded-2xl bg-white cursor-pointer"
                onClick={() => openServiceModal(service)}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={getServiceImage(service)}
                    alt={service.title || service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-metis-500 to-metis-600 text-white text-xs rounded-full font-semibold shadow-lg">
                      {service.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-metis-600 transition-colors">
                    {service.title || service.name}
                  </h3>
                  <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">{service.description}</p>
                  <Button className="w-full bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 rounded-full shadow-md">
                    Scopri di più
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gradient-to-br from-metis-50 to-metis-50 rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Come Funziona?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Il tuo percorso verso il benessere in 3 semplici passi</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-metis-600 to-metis-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 mx-auto shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Contattaci</h3>
              <p className="text-gray-600">
                Chiamaci o invia una mail per prenotare una consulenza specialistica
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-metis-600 to-metis-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 mx-auto shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Valutazione</h3>
              <p className="text-gray-600">
                Analisi completa con bioimpedenziometria, calorimetria e adipometria
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-metis-600 to-metis-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 mx-auto shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Piano Personalizzato</h3>
              <p className="text-gray-600">
                Ricevi il tuo piano nutrizionale strutturato sulle tue esigenze
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-br from-metis-600 via-metis-600 to-metis-700 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prenota una Consulenza
          </h2>
          <p className="text-metis-100 text-lg mb-8 max-w-2xl mx-auto">
            Per informazioni sui costi e per prenotare una consulenza specialistica, contattaci telefonicamente o via email.
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
                <Calendar className="w-5 h-5 mr-2" />
                Richiedi Appuntamento
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeServiceModal}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className="relative h-64 overflow-hidden rounded-t-3xl">
              <img
                src={getServiceImage(selectedService)}
                alt={selectedService.title || selectedService.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <button
                onClick={closeServiceModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1.5 bg-gradient-to-r from-metis-500 to-metis-600 text-white text-xs rounded-full font-semibold mb-3 inline-block">
                  {selectedService.category}
                </span>
                <h2 className="text-3xl font-bold text-white">
                  {selectedService.title || selectedService.name}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {serviceDetails[selectedService.title || selectedService.name] ? (
                <>
                  <div className="prose max-w-none mb-8">
                    {serviceDetails[selectedService.title || selectedService.name].fullDescription.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-gray-600 mb-4 leading-relaxed whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div className="bg-metis-50 rounded-2xl p-6 mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Benefici Principali</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {serviceDetails[selectedService.title || selectedService.name].benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-metis-600 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-600 mb-8 leading-relaxed">{selectedService.description}</p>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contatti" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 rounded-full py-6">
                    Richiedi Informazioni
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="tel:+390828526155" className="flex-1">
                  <Button variant="outline" className="w-full border-2 border-metis-600 text-metis-600 hover:bg-metis-50 rounded-full py-6">
                    <Phone className="w-5 h-5 mr-2" />
                    Chiama Ora
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Servizi;
