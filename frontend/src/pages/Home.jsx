import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Calendar, Heart, Star, Play } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getProducts, getServices, getBlogPosts } from '../services/api';
import { testimonials } from '../mock/mockData';
import { useCart } from '../context/CartContext';
import { toast } from '../hooks/use-toast';
import SEOHead, { generateFAQSchema } from '../components/SEOHead';

const faqData = [
  { question: "Quanto costa una visita nutrizionale?", answer: "Il costo della prima visita nutrizionale varia in base al tipo di consulenza richiesta. Contattaci per un preventivo personalizzato. Offriamo anche pacchetti di follow-up a prezzi agevolati." },
  { question: "Cosa devo portare alla prima visita?", answer: "Alla prima visita è utile portare eventuali analisi del sangue recenti, elenco dei farmaci assunti e una breve storia delle diete seguite in precedenza." },
  { question: "Quanto tempo ci vuole per vedere i risultati?", answer: "I primi risultati si vedono generalmente dopo 2-4 settimane. Il percorso completo varia in base agli obiettivi: perdita di peso, miglioramento di patologie, ottimizzazione delle performance sportive." },
  { question: "Gli integratori sono necessari?", answer: "Non sempre. Gli integratori vengono consigliati solo quando necessario, in base alle carenze individuali. Nel nostro shop trovi integratori Metis di alta qualità selezionati dal Dr. Memoli." }
];

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

const Home = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, servicesData, blogData] = await Promise.all([
          getProducts(true), // fetch only featured products
          getServices(),
          getBlogPosts(true)
        ]);
        setProducts(productsData);
        setServices(servicesData);
        setBlogPosts(blogData);
      } catch (error) {
        toast({
          title: "Errore",
          description: "Impossibile caricare i dati. Riprova più tardi.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Prodotto aggiunto!",
      description: `${product.name} è stato aggiunto al carrello.`,
    });
  };

  const featuredProducts = products.filter(p => p.featured);
  const featuredServices = services.slice(0, 3);

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
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Nutrizionista Bellizzi Salerno - Bioterapia Nutrizionale"
        description="Centro Metis - Studio nutrizionale a Bellizzi (SA). Specializzati in bioterapia nutrizionale, dieta chetogenica, nutrizione sportiva. Prenota la tua consulenza personalizzata. Tel: 0828 52615"
        keywords="nutrizionista bellizzi, nutrizionista salerno, bioterapia nutrizionale, dieta chetogenica, dieta personalizzata, perdere peso, nutrizione sportiva"
        canonical="/"
        schema={generateFAQSchema(faqData)}
      />

      {/* Video Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-gradient-to-br from-metis-700 via-metis-600 to-metis-800">
        {/* Video ottimizzato per tutti i dispositivi */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/video/poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/metis-lite.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <span className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Heart className="w-4 h-4" />
                <span>Benvenuto al Centro Metis</span>
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                La tua salute,<br />
                <span className="text-metis-400">la nostra missione</span>
              </h2>
              <p className="text-base md:text-lg text-gray-200 mb-6 max-w-xl">
                Scopri il nostro approccio personalizzato alla nutrizione e al benessere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/prenota">
                  <Button size="lg" className="bg-metis-500 hover:bg-metis-600 text-white rounded-full px-8 shadow-lg w-full sm:w-auto">
                    Prenota Ora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/chi-siamo">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 w-full sm:w-auto">
                    Scopri Chi Siamo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-metis-50 via-white to-metis-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNmEzNGEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6TTAgMThjMC0zLjMxNCAyLjY4Ni02IDYtNnM2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNnpNMzYgNTRjMC0zLjMxNCAyLjY4Ni02IDYtNnM2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-metis-100 to-metis-100 text-metis-700 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm">
                <Heart className="w-4 h-4" />
                <span>Il tuo percorso verso il benessere</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
                Inizia il tuo percorso di
                <span className="bg-gradient-to-r from-metis-600 to-metis-600 bg-clip-text text-transparent"> salute</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Centro Metis è uno studio nutrizionale specializzato in bioterapia nutrizionale. 
                Ti seguiamo con un approccio personalizzato per raggiungere i tuoi obiettivi di salute e benessere.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/prenota">
                  <Button size="lg" className="bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 text-white group w-full sm:w-auto rounded-full px-8 shadow-lg shadow-metis-500/30 transition-all hover:shadow-xl hover:shadow-metis-500/40">
                    Prenota una Consulenza
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/chi-siamo">
                  <Button size="lg" variant="outline" className="border-2 border-metis-600 text-metis-600 hover:bg-metis-50 w-full sm:w-auto rounded-full px-8">
                    Scopri di più
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-metis-600 to-metis-600 bg-clip-text text-transparent">500+</div>
                  <div className="text-sm text-gray-500 mt-1">Pazienti soddisfatti</div>
                </div>
                <div className="h-14 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-metis-600 to-metis-600 bg-clip-text text-transparent">15+</div>
                  <div className="text-sm text-gray-500 mt-1">Anni di esperienza</div>
                </div>
                <div className="h-14 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-1">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-4xl font-bold text-gray-900">5.0</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Recensioni</div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <img 
                  src="https://lirp.cdn-website.com/e31877ad/dms3rep/multi/opt/medici-Centro-Salerno-048-1066h.jpg" 
                  alt="Centro Metis - Studio Nutrizionale Bellizzi" 
                  className="rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-80 h-80 bg-metis-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
              <div className="absolute -top-8 -right-8 w-80 h-80 bg-metis-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: 'benefit-1', icon: CheckCircle, title: 'Piani Personalizzati', desc: 'Ogni piano nutrizionale è strutturato sulle tue esigenze individuali' },
              { id: 'benefit-2', icon: Heart, title: 'Approccio Olistico', desc: 'Un team di specialisti ti segue in ogni fase del percorso' },
              { id: 'benefit-3', icon: Calendar, title: 'Monitoraggio Costante', desc: 'Controlli periodici per ottimizzare i risultati' }
            ].map((benefit) => (
              <Card key={benefit.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl bg-white">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-metis-100 to-metis-100 rounded-2xl flex items-center justify-center mb-6">
                    <benefit.icon className="w-8 h-8 text-metis-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-metis-100 text-metis-700 rounded-full text-sm font-semibold mb-4">Cosa Offriamo</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">I Nostri Servizi</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Consulenze specialistiche e piani nutrizionali per ogni esigenza
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg rounded-2xl">
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={getServiceImage(service)} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-gradient-to-r from-metis-500 to-metis-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">{service.category}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-5 line-clamp-2 leading-relaxed">{service.description}</p>
                  <Link to="/contatti">
                    <Button className="w-full bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 rounded-full shadow-md">
                      Richiedi Informazioni
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/servizi">
              <Button size="lg" variant="outline" className="border-2 border-metis-600 text-metis-600 hover:bg-metis-50 rounded-full px-8">
                Vedi Tutti i Servizi
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-metis-100 text-metis-700 rounded-full text-sm font-semibold mb-4">I Nostri Prodotti</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Integratori Selezionati</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Prodotti di alta qualità per supportare il tuo benessere
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
              {products.slice(0, 3).map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group bg-white border-0 shadow-lg rounded-2xl">
                  <Link to={`/prodotti/${product.id}`} className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-metis-500 to-metis-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      Disponibile
                    </div>
                  </Link>
                  <CardContent className="p-6">
                    <Link to={`/prodotti/${product.id}`}>
                      <h3 className="font-bold text-xl text-gray-900 mb-2 hover:text-metis-600 transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-2xl font-bold bg-gradient-to-r from-metis-600 to-metis-600 bg-clip-text text-transparent">€{product.price.toFixed(2)}</span>
                      <Link to={`/prodotti/${product.id}`}>
                        <Button 
                          className="bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 rounded-full shadow-md"
                          size="sm"
                        >
                          Scopri
                        </Button>
                      </Link>
                      {/* Shop button - hidden but kept in code
                      <Button 
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                      >
                        Aggiungi
                      </Button>
                      */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link to="/prodotti">
              <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 shadow-lg">
                Vedi Tutti i Prodotti
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-metis-600 via-metis-600 to-metis-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">Testimonianze</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Cosa Dicono di Noi</h2>
            <p className="text-xl text-metis-100 max-w-2xl mx-auto">
              La soddisfazione dei nostri pazienti è la nostra priorità
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex mb-5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={`star-${testimonial.id}-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white mb-6 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-metis-200">{testimonial.source}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-metis-100 text-metis-700 rounded-full text-sm font-semibold mb-4">Blog</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Dal Nostro Blog</h2>
            <p className="text-xl text-gray-600">
              Consigli e approfondimenti sulla nutrizione
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg rounded-2xl">
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={post.imageUrl || post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-metis-500 to-metis-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                    {post.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-metis-600 font-medium mb-2">{post.date || post.createdAt}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-metis-600 transition-colors">{post.title}</h3>
                  <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">{post.excerpt || post.content?.substring(0, 150)}</p>
                  <Link to={`/blog/${post.id}`} className="text-metis-600 font-semibold hover:text-metis-700 inline-flex items-center group/link">
                    Leggi di più
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-metis-600 via-metis-600 to-metis-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 md:p-16 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pronto a iniziare il tuo percorso?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Prenota una consulenza e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi di salute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/prenota">
                <Button size="lg" className="bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 text-white w-full sm:w-auto rounded-full px-8 shadow-lg shadow-metis-500/30">
                  Prenota Ora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contatti">
                <Button size="lg" variant="outline" className="border-2 border-metis-600 text-metis-600 hover:bg-metis-50 w-full sm:w-auto rounded-full px-8">
                  Contattaci
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-metis-100 text-metis-700 rounded-full text-sm font-semibold mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Domande Frequenti</h2>
          </div>
          
          <div className="space-y-6">
            <details className="group bg-gray-50 rounded-2xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-gray-900 list-none">
                <span>Quanto costa una visita nutrizionale?</span>
                <span className="text-metis-600 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Il costo della prima visita nutrizionale varia in base al tipo di consulenza richiesta. 
                Contattaci per un preventivo personalizzato. Offriamo anche pacchetti di follow-up a prezzi agevolati.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-2xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-gray-900 list-none">
                <span>Cosa devo portare alla prima visita?</span>
                <span className="text-metis-600 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Alla prima visita è utile portare eventuali analisi del sangue recenti, 
                elenco dei farmaci assunti e una breve storia delle diete seguite in precedenza.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-2xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-gray-900 list-none">
                <span>Quanto tempo ci vuole per vedere i risultati?</span>
                <span className="text-metis-600 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                I primi risultati si vedono generalmente dopo 2-4 settimane. Il percorso completo 
                varia in base agli obiettivi: perdita di peso, miglioramento di patologie, 
                ottimizzazione delle performance sportive.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-2xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-gray-900 list-none">
                <span>Gli integratori sono necessari?</span>
                <span className="text-metis-600 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Non sempre. Gli integratori vengono consigliati solo quando necessario, 
                in base alle carenze individuali. Nel nostro shop trovi integratori Metis 
                di alta qualità selezionati dal Dr. Memoli.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;