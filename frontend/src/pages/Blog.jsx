import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, X, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import SEOHead from '../components/SEOHead';
import { getBlogPosts } from '../services/api';

// Contenuto completo degli articoli dal sito originale centrometis.com (fallback)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const articoliCompleti = [
  {
    id: 'b0',
    title: "L'obesità è una malattia, non mancanza di volontà",
    subtitle: 'Una condizione complessa che richiede un approccio multidisciplinare',
    excerpt: "L'obesità è una patologia complessa e multifattoriale, riconosciuta dalla comunità scientifica internazionale. Non è una colpa personale.",
    author: 'Dott.ssa Paola Buoninfante',
    date: '23 aprile 2026',
    image: `${BACKEND_URL}/api/uploads/blog_obesita.jpg`,
    category: 'Patologie',
    contenutoCompleto: `L'obesità è una patologia e non è accettabile che venga ancora oggi banalizzata o interpretata come una colpa personale. Ridurla a una semplice mancanza di disciplina significa ignorare le conoscenze scientifiche oggi disponibili e contribuire alla diffusione di pregiudizi ancora troppo radicati.

Si tratta di una condizione complessa e multifattoriale, riconosciuta dalla comunità scientifica internazionale, il cui sviluppo dipende dall'interazione di numerosi elementi. Tra questi rientrano la genetica, la presenza di altre patologie, lo stile di vita sedentario, la qualità e la durata del sonno, i fattori socioeconomici e culturali, oltre alle influenze legate ai genitori e a fattori della prima infanzia.

Tutti questi aspetti, insieme alle alterazioni metaboliche, agli aspetti psicologici e alle caratteristiche dell'ambiente in cui viviamo, possono influenzare in modo significativo il rischio di sviluppare obesità, nonché la possibilità di affrontarla con successo.

Le persone che convivono con questa patologia sono spesso esposte a giudizi, stereotipi e atteggiamenti colpevolizzanti che possono compromettere il benessere psicologico, favorire l'isolamento sociale e persino allontanarle dai percorsi di cura.

Affrontare l'obesità richiede, invece, un approccio globale, basato sull'ascolto, sul rispetto senza pregiudizio e sul supporto multidisciplinare.

Al Centro Metis un team di specialisti accompagna il paziente nel percorso di salute:

• Visita nutrizionale
• Analisi ematochimiche
• Ecografie
• Visite mediche
• Valutazione di terapia farmacologica per l'obesità (come supporto alla dieta)
• Piano nutrizionale
• Indagini strumentali
• Piano di controlli settimanali, mensili e trimestrali

Siamo insieme, passo dopo passo.`
  },
  {
    id: 'b1',
    title: 'Dieta chetogenica e fertilità',
    subtitle: 'Migliorare gli indici di fertilità femminili e maschili',
    excerpt: 'La dieta chetogenica può avere effetti positivi sulla fertilità sia maschile che femminile.',
    author: 'Dott.ssa Paola Buoninfante',
    date: '13 marzo 2025',
    image: 'https://lirp.cdn-website.com/e31877ad/dms3rep/multi/opt/pexels-photo-5982371-8ec5b8de-1920w.jpeg',
    category: 'Nutrizione',
    contenutoCompleto: `La dieta chetogenica (o meglio, sarebbe parlare di diete chetogeniche) è un protocollo nutrizionale oggetto di studi scientifici da un secolo. Il suo primo impiego fu nella terapia dei bambini affetti da epilessia resistente ai farmaci. Nel tempo e attraverso molteplici studi, sono stati valutati i suoi effetti e i benefici in relazione a diverse condizioni mediche. Successivamente le diete chetogeniche hanno trovato impiego anche per il dimagrimento.

Come funzionano?

Sono diete basate su un apporto molto basso di zuccheri. L'organismo, bisognoso di energia, è indotto a trasformare i grassi in corpi chetonici, utilizzati efficacemente nei processi organici come alternativa agli zuccheri.

Quali sono i vantaggi di una dieta chetogenica?

Miglioramento di glicemia, colesterolo, trigliceridi e rapida perdita di peso.

Questo a sua volta determina un miglioramento anche degli indici di fertilità.

Vediamo come:

Nel caso degli indici di fertilità femminile ciò avviene perché si regola l'insulina, ed è noto che l'insulino-resistenza influisca negativamente sulla fertilità, oltre ad essere correlata alla sindrome dell'ovaio policistico.

Inoltre, questo genere di protocollo nutrizionale riduce gli indici di infiammazione, ed è noto che l'infiammazione cronica influisca negativamente sulla fertilità.

L'azione promossa è quella di una stabilizzazione degli ormoni, compresi, quindi, quelli coinvolti nella regolazione del ciclo mestruale e dell'ovulazione.

Per quanto riguarda la fertilità maschile, gli studi a riguardo hanno evidenziato un miglioramento della salute degli spermatozoi. Infatti, ridurre l'assunzione di zuccheri e carboidrati raffinati e, al contempo, includere quotidianamente nella propria dieta verdure e ortaggi (quindi vitamine e antiossidanti) può migliorare la morfologia e la motilità degli spermatozoi. Anche perché si promuove la regolazione degli ormoni coinvolti nella produzione stessa degli spermatozoi. Infine, la riduzione dei picchi glicemici può aiutare a mantenere un livello più stabile degli ormoni sessuali maschili, come il testosterone.`
  },
  {
    id: 'b2',
    title: 'Alimentazione sostenibile: il modello della dieta mediterranea',
    subtitle: "L'impronta ecologica delle nostre scelte alimentari",
    excerpt: 'La dieta mediterranea rappresenta un modello di alimentazione sostenibile riconosciuto dall\'UNESCO.',
    author: 'Dott.ssa Paola Buoninfante',
    date: '13 marzo 2025',
    image: 'https://lirp.cdn-website.com/e31877ad/dms3rep/multi/opt/pane-pomodoro-8b5e0280-1920w.png',
    category: 'Sostenibilità',
    contenutoCompleto: `"Siamo ciò che mangiamo", questo è un detto molto famoso.

Sapete cosa anche è lo specchio delle nostre scelte alimentari? L'ambiente. Ciò che produciamo, trasportiamo, acquistiamo, consumiamo e sprechiamo lascia un'impronta ecologica.

Dal 1990 le emissioni globali di CO2 sono aumentate del 50% circa.

In poco più di un secolo l'agricoltura ha perso il 75 per cento della varietà delle colture.

1,3 miliardi di tonnellate di cibo vanno sprecate ogni anno.

Il settore alimentare rappresenta il 30% del consumo totale di energia, ed è responsabile del 22% delle emissioni di gas serra. L'allevamento animale è una delle voci più pesanti in questo bilancio.

Quindi come possiamo adottare modelli alimentari e comportamentali più sostenibili?

Una delle possibili soluzioni è la dieta mediterranea, non soltanto salutare, ma anche ecologicamente sostenibile.

Al contrario delle abitudini moderne, che tendono a privilegiare prodotti industrializzati e di origine animale, la dieta mediterranea prevede un maggiore consumo di prodotti freschi e poco o nulla lavorati: frutta, verdura, legumi e cereali integrali. L'olio extravergine di oliva rappresenta la principale fonte di grassi, il consumo di pesce, uova e latticini è moderato. Basso il consumo di carne, in particolare carne rossa e trasformata.

Un altro punto chiave è la predilezione per alimenti stagionali e di produzione locale.

Questo consente diversi miglioramenti:
• Un minor impatto ambientale
• Riduzione dell'emissione di gas serra
• Migliore efficienza nell'impiego di acqua
• Migliore efficienza dell'uso del suolo
• Riduzione dell'inquinamento derivato dai trasporti`
  },
  {
    id: 'b3',
    title: 'La nutrizione per la fibromialgia',
    subtitle: 'Ridurre l\'infiammazione e curare il microbiota',
    excerpt: 'Un approccio nutrizionale mirato può aiutare a gestire i sintomi della fibromialgia.',
    author: 'Dott.ssa Paola Buoninfante',
    date: '13 marzo 2025',
    image: 'https://lirp.cdn-website.com/e31877ad/dms3rep/multi/opt/pexels-photo-7278800-2f4777a9-bfa4f6d9-1920w.jpeg',
    category: 'Patologie',
    contenutoCompleto: `La fibromialgia è una patologia caratterizzata da dolore muscoloscheletrico diffuso e affaticamento. Si tratta di una patologia reumatica che colpisce per lo più le donne. Una strategia nutrizionale personalizzata, che accompagni la terapia farmacologica, può aiutare a ridurre i sintomi dolorosi.

L'alimentazione di chi soffre di fibromialgia deve rispondere a più necessità:

• Abbassare gli indici di infiammazione

• Assicurare un introito completo e bilanciato di nutrienti e micronutrienti

• Regolare l'equilibrio glicemico, evitando che livelli alti di insulina favoriscano lo stato di infiammazione, aumentando la sintomatologia dolorosa

• Assicurare il benessere del microbiota (esiste infatti una correlazione tra patologie infiammatorie e salute del microbiota)

In linea generale, è prima di tutto consigliabile ridurre caffeina e non consumare alcolici, oltre a bere abbastanza acqua per mantenere buoni livelli di idratazione.

Una valutazione di medico e nutrizionista, infine, può considerare l'integrazione di omega 3 e vitamina D.`
  }
];

const Blog = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [dbPosts, setDbPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carica i post dal database
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getBlogPosts(true); // solo pubblicati
        setDbPosts(posts);
      } catch (error) {
        // Se fallisce, usa solo gli articoli hardcoded
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Combina post dal database con quelli hardcoded (evita duplicati per titolo)
  const allArticles = React.useMemo(() => {
    const hardcodedTitles = articoliCompleti.map(a => a.title.toLowerCase());
    const uniqueDbPosts = dbPosts.filter(p => 
      !hardcodedTitles.includes((p.title || '').toLowerCase())
    ).map(p => ({
      id: p.id || p._id,
      title: p.title,
      subtitle: p.excerpt || '',
      excerpt: p.excerpt || p.content?.substring(0, 150) + '...',
      author: p.author || 'Dott.ssa Paola Buoninfante',
      date: p.date || new Date().toLocaleDateString('it-IT'),
      image: p.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600',
      category: p.category || 'Nutrizione',
      contenutoCompleto: p.content || p.excerpt || ''
    }));
    
    return [...uniqueDbPosts, ...articoliCompleti];
  }, [dbPosts]);

  const openArticleModal = (article) => {
    setSelectedArticle(article);
    document.body.style.overflow = 'hidden';
  };

  const closeArticleModal = () => {
    setSelectedArticle(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEOHead 
        title="Blog - Articoli sulla Nutrizione e Alimentazione"
        description="Blog di nutrizione del Centro Metis. Articoli su dieta chetogenica, alimentazione sostenibile, fibromialgia e molto altro. Dott.ssa Paola Buoninfante."
        keywords="blog nutrizione, dieta chetogenica fertilità, dieta mediterranea sostenibile, nutrizione fibromialgia, nutrizionista salerno"
        canonical="/blog"
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-metis-600 via-metis-600 to-metis-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">
            Approfondimenti
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">Blog</h1>
          <p className="text-lg md:text-xl text-metis-100 max-w-2xl mx-auto">
            Articoli, consigli e approfondimenti sul mondo della nutrizione
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metis-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Caricamento articoli...</p>
          </div>
        ) : (
        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
            {allArticles.map((post) => (
              <Card 
                key={post.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col border-0 shadow-lg rounded-2xl bg-white cursor-pointer"
                onClick={() => openArticleModal(post)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-metis-500 to-metis-600 text-white text-xs rounded-full font-semibold shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Dott.ssa Buoninfante</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-metis-600 transition-colors">{post.title}</h3>
                  <p className="text-gray-600 mb-5 flex-grow line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <Button className="w-full bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 rounded-full shadow-md">
                    Leggi l'articolo completo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-br from-metis-600 via-metis-600 to-metis-700 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hai domande sulla nutrizione?
          </h2>
          <p className="text-metis-100 text-lg mb-8 max-w-2xl mx-auto">
            Contatta Centro Metis per una consulenza personalizzata con la dott.ssa Buoninfante
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

      {/* Article Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeArticleModal}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <button
                onClick={closeArticleModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                data-testid="close-article-modal"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1.5 bg-gradient-to-r from-metis-500 to-metis-600 text-white text-xs rounded-full font-semibold mb-3 inline-block">
                  {selectedArticle.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {selectedArticle.title}
                </h2>
                {selectedArticle.subtitle && (
                  <p className="text-metis-100 mt-2 text-lg">{selectedArticle.subtitle}</p>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Author and Date */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-metis-500 to-metis-600 rounded-full flex items-center justify-center text-white font-bold">
                    PB
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedArticle.author}</p>
                    <p className="text-gray-500">{selectedArticle.date}</p>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose max-w-none mb-8">
                {selectedArticle.contenutoCompleto.split('\n\n').map((paragraph, idx) => (
                  <p key={`para-${selectedArticle.id}-${idx}`} className="text-gray-600 mb-4 leading-relaxed whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                <Link to="/contatti" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 rounded-full py-6">
                    Richiedi una Consulenza
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

export default Blog;