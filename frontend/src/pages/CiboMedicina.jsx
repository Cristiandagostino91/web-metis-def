import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Phone, ArrowRight, X, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

// Dati delle categorie con contenuti dettagliati
const categorie = [
  {
    id: 1,
    titolo: "Infanzia",
    descrizione: "Piani alimentari mirati a far crescere il bambino in modo equilibrato, senza il rischio che sviluppi una condizione di obesità.",
    immagine: "https://lirp.cdn-website.com/e31877ad/dms3rep/multi/opt/medici-Centro-Salerno-021-1104w.jpg",
    contenutoCompleto: `L'obesità infantile è un problema sempre più diffuso. Secondo i dati dell'OMS, in Italia il 42% dei bambini è in eccesso ponderale.

È fondamentale che i bambini adottino buone abitudini alimentari fin da subito, così da poter crescere in modo corretto, senza privazioni e con gusto, ma soprattutto senza il rischio di avere problemi di peso.

I rischi dell'obesità in età pediatrica includono:
• Steatosi epatica
• Diabete di tipo 2
• Problemi ortopedici
• Rialzo della pressione arteriosa
• Aumento di colesterolo e trigliceridi
• Disturbi psicologici

Un bambino può ingrassare anche assumendo quantità di cibo apparentemente normali. L'obesità infantile può essere connessa a scelte errate nella dieta, come eccesso di grassi e proteine animali, poca frutta e verdura, sedentarietà e irregolarità nella distribuzione dei pasti.`,
    benefici: ["Crescita equilibrata", "Prevenzione obesità", "Educazione alimentare", "Abitudini sane"]
  },
  {
    id: 2,
    titolo: "Gravidanza e Allattamento",
    descrizione: "Tutto il necessario, a livello di alimentazione, per far sì che il nascituro e la futura mamma godano di un perfetto stato di salute.",
    immagine: "https://lirp.cdn-website.com/e31877ad/dms3rep/multi/opt/medici-Centro-Salerno-022-1104w.jpg",
    contenutoCompleto: `Durante la gravidanza e l'allattamento, l'alimentazione della madre influenza direttamente la salute del bambino. Un corretto apporto nutrizionale è fondamentale.

Durante la gravidanza il piano alimentare deve garantire:
• Lo sviluppo ottimale del feto
• La prevenzione di carenze vitaminiche e minerali
• Il controllo dell'aumento di peso
• La riduzione del rischio di diabete gestazionale
• La prevenzione dell'anemia
• La gestione di nausee e disturbi gastrointestinali

Durante l'allattamento l'alimentazione deve:
• Assicurare la qualità del latte materno
• Mantenere le energie della neo-mamma
• Supportare il recupero post-parto
• Prevenire carenze nutrizionali

Particolare attenzione viene posta alla supplementazione di acido folico, ferro, calcio, vitamina D e omega-3.`,
    benefici: ["Sviluppo fetale ottimale", "Prevenzione carenze", "Energia per la mamma", "Latte materno di qualità"]
  },
  {
    id: 3,
    titolo: "Adolescenza",
    descrizione: "Un adeguato apporto di tutti i nutrienti è fondamentale per uno corretto sviluppo dell'adolescente, senza che quest'ultimo sviluppi problemi di peso.",
    immagine: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    contenutoCompleto: `L'adolescenza è un periodo di grandi cambiamenti fisici e psicologici. L'alimentazione gioca un ruolo cruciale nello sviluppo armonioso del giovane.

In questa fase è importante garantire:
• Un corretto apporto calorico per sostenere la crescita
• Proteine di qualità per lo sviluppo muscolare
• Calcio e vitamina D per la salute delle ossa
• Ferro, soprattutto per le ragazze
• Zinco per lo sviluppo puberale

Problematiche comuni in adolescenza:
• Alimentazione disordinata
• Eccesso di junk food
• Salto dei pasti
• Diete fai-da-te pericolose
• Disturbi del comportamento alimentare

Il nostro approccio con gli adolescenti è basato sull'educazione alimentare, senza imposizioni rigide, per formare adulti consapevoli delle proprie scelte.`,
    benefici: ["Sviluppo armonioso", "Prevenzione disturbi alimentari", "Educazione nutrizionale", "Performance scolastiche"]
  },
  {
    id: 4,
    titolo: "Ciclo Mestruale",
    descrizione: "Programmi di alimentazione bilanciati e ricchi di micronutrienti che aiutino a sostenere la donna in un momento di bruschi cambiamenti ormonali.",
    immagine: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    contenutoCompleto: `Il ciclo mestruale è influenzato profondamente dall'alimentazione. Una dieta mirata può aiutare a gestire i sintomi e a regolarizzare il ciclo.

Disturbi comuni legati al ciclo:
• Sindrome premestruale (PMS)
• Crampi e dolori addominali
• Sbalzi d'umore
• Ritenzione idrica
• Voglie alimentari
• Stanchezza e irritabilità

L'alimentazione può aiutare attraverso:
• Alimenti ricchi di magnesio (riduce i crampi)
• Omega-3 (azione antinfiammatoria)
• Ferro (per compensare le perdite)
• Vitamina B6 (regola l'umore)
• Riduzione di sale (contro la ritenzione)
• Limitazione di caffeina e alcol

Ogni fase del ciclo richiede attenzioni specifiche: nella fase follicolare, ovulatoria, luteale e mestruale l'organismo ha esigenze diverse.`,
    benefici: ["Riduzione sintomi PMS", "Regolarizzazione ciclo", "Energia costante", "Equilibrio ormonale"]
  },
  {
    id: 5,
    titolo: "Menopausa",
    descrizione: "Regimi alimentari specifici per la menopausa, periodo in cui il metabolismo si riduce e c'è una più elevata possibilità di contrarre l'osteoporosi.",
    immagine: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=800",
    contenutoCompleto: `La menopausa rappresenta una fase di grandi cambiamenti per l'organismo femminile. Un'alimentazione mirata può aiutare a gestire i sintomi e prevenire complicanze.

Cambiamenti tipici della menopausa:
• Vampate di calore
• Aumento di peso
• Redistribuzione del grasso corporeo
• Perdita di massa muscolare e ossea
• Aumento del rischio cardiovascolare
• Alterazioni dell'umore e del sonno

Strategie nutrizionali:
• Alimenti ricchi di fitoestrogeni (soia, legumi)
• Calcio e vitamina D per le ossa
• Proteine per preservare la massa muscolare
• Omega-3 per il cuore e il cervello
• Controllo dell'indice glicemico
• Alimenti antinfiammatori

L'obiettivo è mantenere un peso sano, proteggere ossa e cuore, e gestire i sintomi in modo naturale.`,
    benefici: ["Gestione vampate", "Protezione ossa", "Controllo peso", "Salute cardiovascolare"]
  },
  {
    id: 6,
    titolo: "Età Geriatrica",
    descrizione: "Piani alimentari studiati sulla base delle esigenze delle persone anziane, strutturati in maniera tale da preservare la vitalità organica.",
    immagine: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800",
    contenutoCompleto: `Con l'avanzare dell'età, le esigenze nutrizionali cambiano significativamente. La nutrizione geriatrica si occupa di prevenire e trattare la malnutrizione nell'anziano.

Problematiche nutrizionali dell'anziano:
• Sarcopenia (perdita di massa muscolare)
• Riduzione dell'appetito
• Difficoltà di masticazione e deglutizione
• Alterazioni del gusto e dell'olfatto
• Interazioni farmaco-nutrienti
• Malassorbimento intestinale

Il nostro approccio prevede:
• Valutazione dello stato nutrizionale
• Screening della sarcopenia
• Piano alimentare adattato alle capacità masticatorie
• Attenzione alla consistenza e palatabilità
• Integrazione proteica quando necessaria
• Supplementazione di vitamina D e B12

L'obiettivo è mantenere l'autonomia e la qualità della vita il più a lungo possibile.`,
    benefici: ["Prevenzione sarcopenia", "Mantenimento autonomia", "Vitalità preservata", "Qualità della vita"]
  },
  {
    id: 7,
    titolo: "Sport",
    descrizione: "Regimi di alimentazione aventi lo scopo di aumentare la massa magra o di ottimizzare le prestazioni dello sportivo.",
    immagine: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    contenutoCompleto: `La nutrizione sportiva è fondamentale per ottimizzare le performance atletiche, accelerare il recupero e prevenire infortuni.

I nostri piani per sportivi includono:
• Calcolo del fabbisogno energetico specifico
• Timing dei nutrienti pre, durante e post allenamento
• Strategie di idratazione
• Integrazione mirata quando necessario
• Gestione del peso per discipline con categorie
• Piani specifici per gare e competizioni

Discipline seguite:
• Sport di endurance (ciclismo, corsa, triathlon)
• Sport di forza (bodybuilding, powerlifting)
• Sport di squadra (calcio, basket, pallavolo)
• Sport da combattimento
• Fitness e CrossFit

L'obiettivo è massimizzare le performance rispettando la salute dell'atleta, con piani personalizzati basati su obiettivi specifici.`,
    benefici: ["Performance ottimizzate", "Recupero accelerato", "Massa muscolare", "Prevenzione infortuni"]
  },
  {
    id: 8,
    titolo: "Dimagrimento",
    descrizione: "Diete dimagranti personalizzate sulla base della fisicità e degli obiettivi del paziente.",
    immagine: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    contenutoCompleto: `Il dimagrimento efficace richiede un approccio personalizzato che consideri la storia del paziente, il suo metabolismo e i suoi obiettivi.

Il nostro metodo prevede:
• Valutazione della composizione corporea
• Analisi del metabolismo basale
• Piano alimentare personalizzato
• Deficit calorico sostenibile
• Preservazione della massa muscolare
• Supporto motivazionale

Tipologie di intervento:
• Dieta ipocalorica bilanciata
• Dieta chetogenica (per casi specifici)
• Digiuno intermittente
• Ricomposizione corporea

Cosa ci differenzia:
• Niente diete drastiche
• Niente effetto yo-yo
• Educazione alimentare
• Risultati duraturi

L'obiettivo non è solo perdere peso, ma imparare a mangiare correttamente per mantenere i risultati nel tempo.`,
    benefici: ["Perdita peso duratura", "No effetto yo-yo", "Massa muscolare preservata", "Educazione alimentare"]
  },
  {
    id: 9,
    titolo: "Patologie",
    descrizione: "Programmi alimentari studiati per alleviare i sintomi di una specifica patologia e per potenziare l'efficacia della terapia farmacologica.",
    immagine: "https://lirp.cdn-website.com/e31877ad/dms3rep/multi/opt/medici-Centro-Salerno-029-1104w.jpg",
    contenutoCompleto: `L'alimentazione interviene in tutti i processi organici. Ogni alimento e ogni combinazione di alimenti offre una diversa possibilità terapeutica.

In caso di patologie, la nutrizione può:
• Alleviare i sintomi
• Curare le cause
• Accompagnare la terapia farmacologica
• Potenziarne l'efficacia

Patologie trattate:
• Diabete e sindrome metabolica
• Malattie cardiovascolari
• Patologie gastrointestinali
• Malattie autoimmuni
• Patologie tiroidee
• Ipertensione
• Dislipidemie
• Patologie renali
• Patologie oncologiche

Un'alimentazione adeguata ed equilibrata è fondamentale per mantenere la vitalità negli anni, contrastare gli effetti dell'invecchiamento e l'insorgere di patologie.`,
    benefici: ["Supporto terapia", "Riduzione sintomi", "Prevenzione complicanze", "Qualità della vita"]
  }
];

const CiboMedicina = () => {
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  const openModal = (categoria) => {
    setSelectedCategoria(categoria);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCategoria(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEOHead 
        title="Il Cibo sia la tua Medicina - Nutrizione e Salute"
        description="Centro Metis: il cibo come medicina. Piani nutrizionali per infanzia, gravidanza, menopausa, sport, dimagrimento e patologie. Nutrizionista Bellizzi Salerno."
        keywords="cibo medicina, nutrizione salute, dieta personalizzata, alimentazione bambini, dieta gravidanza, dieta menopausa, nutrizionista salerno"
        canonical="/il-cibo-sia-la-tua-medicina"
      />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-metis-600 via-metis-600 to-metis-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">
            Ippocrate
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            "Fa' che il cibo sia la tua medicina"
          </h1>
          <p className="text-lg md:text-xl text-metis-100 max-w-3xl mx-auto leading-relaxed">
            Per mantenere uno stato di salute ottimale il primo passo è quello di nutrirsi in maniera consapevole ed equilibrata. 
            Centro Metis elabora piani alimentari personalizzati che possano aiutarti a vivere bene e a lungo.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Intro */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Alimentazione in rapporto alla nostra salute
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Prendersi cura della propria salute significa scegliere alimenti che contengono il giusto apporto di sostanze nutritive, 
            i quali aiutano a prevenire l'infiammazione e le patologie croniche come il diabete e le malattie cardiache.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
            {categorie.map((categoria) => (
              <Card 
                key={categoria.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg rounded-2xl bg-white cursor-pointer"
                onClick={() => openModal(categoria)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={categoria.immagine}
                    alt={categoria.titolo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{categoria.titolo}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{categoria.descrizione}</p>
                  <Button className="w-full bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 rounded-full shadow-md">
                    Scopri di più
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-metis-600 via-metis-600 to-metis-700 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Inizia il tuo percorso di salute
          </h2>
          <p className="text-metis-100 text-lg mb-8 max-w-2xl mx-auto">
            Contatta Centro Metis e prenota una consulenza con la dott.ssa Buoninfante per scoprire come l'alimentazione può aiutarti.
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
                Richiedi Consulenza
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCategoria && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-64 overflow-hidden rounded-t-3xl">
              <img
                src={selectedCategoria.immagine}
                alt={selectedCategoria.titolo}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl font-bold text-white">{selectedCategoria.titolo}</h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="prose max-w-none mb-8">
                {selectedCategoria.contenutoCompleto.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gray-600 mb-4 leading-relaxed whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Benefits */}
              <div className="bg-metis-50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Benefici</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedCategoria.benefici.map((beneficio, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-metis-600 flex-shrink-0" />
                      <span className="text-gray-700">{beneficio}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
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

export default CiboMedicina;
