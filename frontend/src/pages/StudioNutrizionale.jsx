import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Phone, ArrowRight, X, CheckCircle, Stethoscope, Activity, Heart, Baby, Users, Ribbon } from 'lucide-react';
import SEOHead from '../components/SEOHead';

// Servizi dello Studio Nutrizionale
const serviziNutrizionali = [
  {
    id: 'bioimpedenziometria',
    titolo: 'Bioimpedenziometria e Calorimetria Indiretta',
    icona: Activity,
    descrizione: 'Indagini strumentali non invasive per conoscere la tua reale composizione corporea e il metabolismo basale.',
    contenutoCompleto: `Conoscere peso e altezza di un individuo e ricavare il BMI con una formula non è sufficiente. E così vale anche per il mettersi in dieta e pensare di valutare i risultati sulla sola bilancia, poiché questa ci dice solo il peso, non la composizione corporea, né tantomeno se ad un calo ponderale sia corrisposta una perdita di adipe o se siamo andati ad intaccare la massa muscolare.

Basti pensare al fatto che due persone della medesima età possono avere lo stesso peso e la stessa altezza, ma una composizione corporea molto diversa: se prendiamo ad esempio un uomo di 30 anni, alto 170 cm e del peso di 80 Kg, questo risulterà, secondo le formule, in sovrappeso, ma potrebbe invece trattarsi di uno sportivo con un'importante massa muscolare.

Qual è la soluzione dunque? Effettuare le indagini strumentali che ci possano fornire un quadro più chiaro e più veritiero: bioimpedenziometria e calorimetria indiretta.

La bioimpedenziometria è un'indagine strumentale non invasiva che permette di misurare la composizione corporea dell'individuo. Viene effettuata con l'applicazione di elettrodi in più punti del corpo. Dai dati ottenuti si può stabilire la percentuale di idratazione e la composizione del corpo: massa grassa, massa magra e acqua intra ed extra cellulare.

La calorimetria indiretta, invece, è la misurazione, a partire dal consumo di ossigeno e dalla produzione di anidride carbonica, dei parametri che permettono di calcolare l'energia impiegata dal corpo per le reazioni biochimiche che si verificano all'interno dell'organismo. In pratica ci fornisce la misurazione del metabolismo basale.`,
    benefici: ['Composizione corporea precisa', 'Misurazione metabolismo basale', 'Monitoraggio progressi reali', 'Personalizzazione dieta'],
    immagine: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'
  },
  {
    id: 'protocollo-obesita',
    titolo: 'Protocollo Obesità',
    icona: Heart,
    descrizione: "L'obesità è una patologia complessa e multifattoriale. Al Centro Metis un team di specialisti ti accompagna nel percorso di salute.",
    contenutoCompleto: `L'obesità è una patologia e non è più accettabile che venga banalizzata o addirittura vista come una colpa. Si tratta di una patologia complessa e multifattoriale, riconosciuta dalla comunità scientifica, che non può essere ridotta a una semplice questione di forza di volontà: sono in gioco fattori genetici, metabolici, psicologici, sociali e ambientali che contribuiscono in modo determinante al suo sviluppo.

Continuare a banalizzarla o, addirittura, a considerarla una responsabilità individuale significa alimentare stigma e discriminazione, che non solo feriscono la dignità delle persone, ma ostacolano anche la prevenzione e le cure.

Al Centro Metis un team di specialisti accompagna il paziente nel percorso di salute:

• Visita nutrizionale
• Indagini strumentali
• Analisi ematochimiche
• Ecografie
• Visite mediche
• Valutazione di terapia farmacologica per l'obesità (come supporto alla dieta)
• Piano nutrizionale
• Piano di controlli settimanali, mensili e trimestrali

Siamo insieme, passo dopo passo.`,
    benefici: ['Team multidisciplinare', 'Approccio senza stigma', 'Supporto farmacologico se necessario', 'Controlli periodici'],
    immagine: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800'
  },
  {
    id: 'protocollo-lipedema',
    titolo: 'Protocollo Lipedema',
    icona: Users,
    descrizione: 'Il lipedema è una patologia cronica e progressiva. Al Centro Metis ti accompagniamo nella gestione a 360 gradi, dalla diagnosi alla terapia.',
    contenutoCompleto: `Il lipedema è una patologia cronica e progressiva. Parliamo di una condizione caratterizzata da un accumulo anomalo di tessuto adiposo che può interessare diverse aree del corpo, spesso accompagnato da edema, dolore, senso di pesantezza e infiammazione sistemica.

È importante sottolineare che il lipedema non è necessariamente sinonimo di sovrappeso o obesità, ma può manifestarsi anche in persone normopeso.

La gestione del lipedema richiede un approccio multidisciplinare, con il contributo di diversi specialisti quali medico, nutrizionista, fisioterapista.

Al Centro Metis ti accompagniamo nella gestione del lipedema a 360 gradi, dalla diagnosi alla terapia.`,
    benefici: ['Diagnosi accurata', 'Approccio multidisciplinare', 'Gestione del dolore', 'Terapia personalizzata'],
    immagine: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800'
  },
  {
    id: 'disbiotest',
    titolo: 'DisbioTest',
    icona: Activity,
    descrizione: 'Test delle urine per rilevare la disbiosi intestinale e individuare la migliore strategia di cura per il tuo microbiota.',
    contenutoCompleto: `Il nostro intestino ospita trilioni di microrganismi, un ecosistema complesso fatto di batteri "buoni" e "cattivi" che convivono in equilibrio: è il microbiota intestinale. Quando questo equilibrio si rompe – per colpa di stress, alimentazione scorretta, antibiotici, infezioni o stili di vita poco salutari – si parla di disbiosi.

Sintomi della disbiosi:
• Pancia gonfia
• Spossatezza
• Irregolarità intestinale
• Malessere
• Sbalzi d'umore e sonno disturbato

Perché è importante diagnosticare e curare la disbiosi? Perché il microbiota non si occupa solo della digestione:

• Aiuta a regolare il sistema immunitario
• Produce vitamine e sostanze benefiche
• Protegge da patogeni esterni
• Influenza il nostro metabolismo
• E persino il nostro umore, attraverso il cosiddetto asse intestino-cervello

Basta un semplice test delle urine per rilevare una eventuale condizione di disbiosi e individuare la migliore strategia di cura.`,
    benefici: ['Test non invasivo', 'Diagnosi precisa', 'Strategia di cura mirata', 'Miglioramento del benessere'],
    immagine: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800'
  },
  {
    id: 'nutrizione-oncologica',
    titolo: 'Nutrizione Oncologica',
    icona: Heart,
    descrizione: 'Supporto nutrizionale nel percorso di cura delle patologie oncologiche per migliorare la qualità della vita.',
    contenutoCompleto: `Quando si affronta una terapia antitumorale, è normale che l'appetito possa diminuire. Qual è l'aiuto che può dare il nutrizionista in questa fase?

La valutazione dello stato di nutrizione del paziente oncologico e l'elaborazione di una strategia nutrizionale personalizzata hanno lo scopo di:

• Supportare e consolidare gli effetti della terapia antitumorale
• Limitare gli effetti collaterali e le possibili complicanze che da essa possono derivare
• Contrastare la malnutrizione
• Migliorare lo stato di salute generale e la qualità della vita del paziente`,
    benefici: ['Supporto durante le terapie', 'Contrasto malnutrizione', 'Gestione effetti collaterali', 'Qualità della vita'],
    immagine: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800'
  },
  {
    id: 'gravidanza-allattamento',
    titolo: 'Gravidanza e Allattamento',
    icona: Baby,
    descrizione: 'La gravidanza è un viaggio in cui ti accompagna anche l\'alimentazione. Una buona occasione per riscrivere le proprie abitudini.',
    contenutoCompleto: `La gravidanza è un viaggio in cui ti accompagna anche l'alimentazione. Una buona occasione per riscrivere le proprie abitudini alimentari e la cura di sé.

Mangiare bene non significa "mangiare per due", ma scegliere meglio: la qualità degli alimenti, la giusta quantità e qualità dei macronutrienti, le vitamine e i minerali che guidano la crescita del feto. E, da non trascurare, la giusta idratazione.

Una curiosità: le papille gustative del feto iniziano a formarsi molto presto. Con il tempo diventano funzionali grazie al contatto con il liquido amniotico. I sapori di ciò che mangia la madre raggiungono il bambino. È una prima, silenziosa educazione al gusto.

E dopo la nascita? Allattare è un lavoro e richiede altre energie e nutrienti specifici. Lo sapevi che durante i primi sei mesi di allattamento esclusivo al seno il fabbisogno di energia è maggiore? E non di poco. Le assunzioni raccomandate, come espresse da tabella LARN, prevedono un aumento del fabbisogno energetico di ben 500 Kcal al giorno.

Parliamo di precise necessità in termini di macronutrienti, vitamine e minerali: B12, Tiamina, Riboflavina, Folati, vitamine A, C, D, Calcio, Ferro…

Chi sta allattando ha bisogno di pasti nutrienti costruiti con i nutrienti giusti. Allattare è un grande impegno per il corpo: una valutazione nutrizionale personalizzata può fare la differenza per garantire energia, benessere e serenità a mamma e bambino.`,
    benefici: ['Sviluppo ottimale del feto', 'Educazione al gusto', 'Supporto in allattamento', 'Benessere mamma-bambino'],
    immagine: 'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800'
  },
  {
    id: 'pcos',
    titolo: 'PCOS - Sindrome dell\'Ovaio Policistico',
    icona: Heart,
    descrizione: 'Gestione nutrizionale della PCOS con un approccio multidisciplinare che coinvolge diversi specialisti.',
    contenutoCompleto: `La PCOS è una condizione cronica che può influenzare sia la salute fisica che quella psicologica della donna. Per gestirla al meglio è fondamentale un approccio multidisciplinare che coinvolga ginecologo, endocrinologo, nutrizionista e psicologo.

Dal punto di vista della gestione nutrizionale, è importante sapere che esiste una forte connessione tra insulino-resistenza e PCOS. La resistenza insulinica non soltanto peggiora i sintomi della PCOS, ma potrebbe essere una delle cause del suo sviluppo.

Al Centro Metis diverse professionisti della salute ti accompagnano nel tuo percorso passo dopo passo.`,
    benefici: ['Approccio multidisciplinare', 'Gestione insulino-resistenza', 'Supporto completo', 'Team di specialisti'],
    immagine: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800'
  },
  {
    id: 'fibromialgia',
    titolo: 'Fibromialgia',
    icona: Heart,
    descrizione: 'Un piano nutrizionale personalizzato può aiutare ad alleviare i sintomi dolorosi della fibromialgia.',
    contenutoCompleto: `Lo sapevi che un piano nutrizionale personalizzato può aiutare ad alleviare i sintomi dolorosi della fibromialgia?

Infatti, è possibile realizzare una dieta che:
• Abbassi i livelli di infiammazione
• Sia bilanciata e completa di nutrienti e micronutrienti
• Regoli l'equilibrio glicemico, evitando che livelli alti di insulina favoriscano lo stato di infiammazione, aumentando la sintomatologia dolorosa
• Assicuri il benessere del microbiota (esiste infatti una correlazione tra patologie infiammatorie e salute del microbiota)`,
    benefici: ['Riduzione infiammazione', 'Equilibrio glicemico', 'Salute del microbiota', 'Alleviamento sintomi'],
    immagine: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800'
  },
  {
    id: 'endometriosi',
    titolo: 'Endometriosi e Adenomiosi',
    icona: Heart,
    descrizione: 'Supporto nutrizionale per la gestione dei sintomi dell\'endometriosi e adenomiosi con un approccio multidisciplinare.',
    contenutoCompleto: `L'endometriosi non riguarda solo l'apparato riproduttivo, ma spesso coinvolge anche l'intestino. Molte donne che ne soffrono lamentano gonfiore, dolore addominale, alterazioni dell'evacuazione e difficoltà digestive.

Alla base di questi sintomi possono esserci diversi fattori come:
• Infiammazione cronica, tipica dell'endometriosi, che può rendere l'intestino più sensibile e reattivo
• Lesioni endometriosiche che interessano direttamente l'intestino
• Squilibri del microbiota (disbiosi)
• Crescita eccessiva di batteri nel tenue (SIBO)
• Aumentata permeabilità intestinale

È fondamentale un inquadramento multidisciplinare e che l'alimentazione sia guidata da un professionista del settore.

Lo scopo della strategia nutrizionale è il sostegno nella gestione dei sintomi:
• Contribuire a ridurre lo stato infiammatorio
• Accompagnare le fasi ormonali
• Migliorare l'energia quotidiana
• Favorire un miglior stato di salute generale

Non esiste una dieta standard, ma percorsi personalizzati costruiti sulle caratteristiche di ciascuna persona. Al Centro Metis un'équipe di specialisti ti accompagnerà nel tuo percorso di salute: saremo insieme passo dopo passo.`,
    benefici: ['Riduzione infiammazione', 'Gestione sintomi intestinali', 'Supporto ormonale', 'Percorso personalizzato'],
    immagine: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800'
  },
  {
    id: 'fiocchetto-lilla',
    titolo: 'Spazio Ascolto Fiocchetto Lilla',
    icona: Ribbon,
    descrizione: 'Spazio di ascolto gratuito di 30 minuti per parlare del rapporto con il cibo e con il corpo.',
    contenutoCompleto: `Il fiocchetto Lilla per la sensibilizzazione, la prevenzione e il contrasto dei Disturbi del Comportamento Alimentare (DCA).

Il Centro Metis, in collaborazione con la dottoressa Mariagrazia Stabile, psicologa esperta di DCA, offre a chi lo richiederà uno spazio di ascolto gratuito di 30 minuti.

Uno spazio sicuro per parlare del rapporto con il cibo e con il corpo.

L'iniziativa durerà per tutto il 2026.`,
    benefici: ['Ascolto gratuito', 'Psicologa esperta DCA', 'Spazio sicuro', 'Prevenzione e supporto'],
    immagine: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800'
  }
];

// Consulenze Specialistiche Mediche
const consulenzeMediche = [
  'Visite cardiologiche',
  'Visite dermatologiche',
  'Visite diabetologiche',
  'Visite endocrinologiche',
  'Visite ginecologiche',
  'Visite ortopediche',
  'Visite psicologiche',
  'Visite reumatologiche',
  'Ecografie',
  'Holter pressorio',
  'Holter cardiaco'
];

const StudioNutrizionale = () => {
  const [selectedServizio, setSelectedServizio] = useState(null);

  const openModal = (servizio) => {
    setSelectedServizio(servizio);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedServizio(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEOHead 
        title="Studio Nutrizionale - Visite, Protocolli e Indagini Strumentali | Centro Metis Bellizzi"
        description="Studio nutrizionale Centro Metis a Bellizzi (SA). Visite nutrizionali, bioimpedenziometria, calorimetria, protocollo obesità, lipedema, PCOS, fibromialgia, endometriosi. Consulenze mediche specialistiche."
        keywords="studio nutrizionale bellizzi, bioimpedenziometria salerno, calorimetria indiretta, protocollo obesità, lipedema, PCOS nutrizionista, fibromialgia dieta, endometriosi alimentazione, disbiotest"
        canonical="/studio-nutrizionale"
      />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-metis-600 via-metis-600 to-metis-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">
            Centro Metis
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">Studio Nutrizionale</h1>
          <p className="text-lg md:text-xl text-metis-100 max-w-3xl mx-auto leading-relaxed">
            Visite nutrizionali, piani personalizzati e diverse metodiche terapeutiche per il dimagrimento, 
            il trattamento di patologie e lo sport.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Intro Section */}
        <div className="bg-gradient-to-br from-metis-50 to-metis-50 rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Percorsi Nutrizionali Personalizzati
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Al Centro Metis la dottoressa Paola Buoninfante e il suo team di professionisti della salute 
              e della nutrizione guidano i pazienti passo dopo passo nel percorso di salute, 
              per il dimagrimento o il trattamento di patologie.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-metis-600 flex-shrink-0 mt-1" />
              <p className="text-gray-700">Diversi protocolli nutrizionali e metodiche terapeutiche a seconda di caratteristiche individuali, condizioni di salute, esigenze personali e obiettivi.</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-metis-600 flex-shrink-0 mt-1" />
              <p className="text-gray-700">Ogni percorso inizia con visita nutrizionale, indagini strumentali (bioimpedenziometria e calorimetria indiretta) e valutazione dello stato di salute.</p>
            </div>
          </div>
        </div>

        {/* Servizi Nutrizionali Grid */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">I Nostri Servizi e Protocolli</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Clicca su ogni servizio per scoprire tutti i dettagli</p>
          </div>
          
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
              {serviziNutrizionali.map((servizio) => (
                <Card 
                  key={servizio.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg rounded-2xl bg-white cursor-pointer"
                  onClick={() => openModal(servizio)}
                  data-testid={`servizio-${servizio.id}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={servizio.immagine}
                      alt={servizio.titolo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <servizio.icona className="w-5 h-5 text-white" />
                        <span className="text-white text-sm font-medium">Servizio</span>
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight">{servizio.titolo}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{servizio.descrizione}</p>
                    <Button className="w-full bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 rounded-full shadow-md">
                      Scopri di più
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Consulenze Mediche Specialistiche */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-r from-metis-600 to-metis-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Consulenze Specialistiche</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Presso il Centro Metis è possibile effettuare visite mediche specialistiche e indagini diagnostiche
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {consulenzeMediche.map((consulenza, idx) => (
              <div key={idx} className="flex items-center space-x-2 bg-metis-50 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-metis-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm font-medium">{consulenza}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Indagini Aggiuntive */}
        <div className="bg-gradient-to-br from-metis-50 to-metis-50 rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">È inoltre possibile effettuare</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white rounded-2xl px-6 py-4 shadow-md">
              <span className="font-semibold text-gray-800">Breath Test Lattosio</span>
            </div>
            <div className="bg-white rounded-2xl px-6 py-4 shadow-md">
              <span className="font-semibold text-gray-800">DisbioTest (per la disbiosi intestinale)</span>
            </div>
            <div className="bg-white rounded-2xl px-6 py-4 shadow-md">
              <span className="font-semibold text-gray-800">Adipometria</span>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-br from-metis-600 via-metis-600 to-metis-700 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prenota la tua Visita Nutrizionale
          </h2>
          <p className="text-metis-100 text-lg mb-8 max-w-2xl mx-auto">
            Inizia il tuo percorso di salute con una consulenza personalizzata. 
            Ti accompagniamo passo dopo passo.
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
                Richiedi Appuntamento
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedServizio && (
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
                src={selectedServizio.immagine}
                alt={selectedServizio.titolo}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                data-testid="close-modal"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center space-x-2 mb-2">
                  <selectedServizio.icona className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedServizio.titolo}</h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="prose max-w-none mb-8">
                {selectedServizio.contenutoCompleto.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gray-600 mb-4 leading-relaxed whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Benefits */}
              <div className="bg-metis-50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Benefici</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedServizio.benefici.map((beneficio, idx) => (
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

export default StudioNutrizionale;
