import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useCart } from '../context/CartContext';
import { toast } from '../hooks/use-toast';
import { Search, ShoppingCart, Eye } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Prodotti = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        toast({
          title: "Errore",
          description: "Impossibile caricare i prodotti.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Prodotto aggiunto!",
      description: `${product.name} è stato aggiunto al carrello.`,
    });
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
        title="Integratori Alimentari - Sali Minerali, Omega 3, Vitamina D"
        description="Acquista integratori alimentari di qualità: Sali Minerali Metis, Omega 3, Vitamina D. Prodotti selezionati dal Dr. Memoli per il tuo benessere. Spedizione in tutta Italia."
        keywords="integratori alimentari, sali minerali, omega 3, vitamina d, integratori metis, acquista integratori online"
        canonical="/prodotti"
      />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-metis-600 via-metis-600 to-metis-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">I Nostri Prodotti</h1>
          <p className="text-lg md:text-xl text-metis-100 max-w-2xl mx-auto">
            Integratori e prodotti selezionati per supportare il tuo benessere quotidiano
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Cerca prodotti..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 text-base rounded-full border-gray-200 shadow-sm focus:ring-2 focus:ring-metis-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Products Grid - Centered */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col bg-white border-0 shadow-lg rounded-2xl">
                <Link to={`/prodotti/${product.id}`} className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.inStock ? (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-metis-500 to-metis-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      Disponibile
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      Esaurito
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/95 backdrop-blur-sm text-metis-600 px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-4 h-4" />
                      Vedi Dettagli
                    </span>
                  </div>
                </Link>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <Link to={`/prodotti/${product.id}`}>
                    <h3 className="font-bold text-xl text-gray-900 mb-2 hover:text-metis-600 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-metis-600 font-medium mb-2">{product.subtitle || product.brand}</p>
                  <p className="text-sm text-gray-500 mb-4 flex-grow line-clamp-2 leading-relaxed">{product.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {product.glutenFree && (
                      <span className="text-xs px-3 py-1.5 bg-metis-50 text-metis-700 rounded-full font-medium border border-metis-100">Senza Glutine</span>
                    )}
                    {product.lactoseFree && (
                      <span className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full font-medium border border-blue-100">Senza Lattosio</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                    <span className="text-2xl font-bold bg-gradient-to-r from-metis-600 to-metis-600 bg-clip-text text-transparent">€{product.price.toFixed(2)}</span>
                    <div className="flex gap-2">
                      <Link to={`/prodotti/${product.id}`}>
                        <Button className="bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 rounded-full shadow-md hover:shadow-lg transition-all" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Dettagli
                        </Button>
                      </Link>
                      {/* Shop button - hidden but kept in code
                      <Button
                        className="bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 rounded-full shadow-md hover:shadow-lg transition-all"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        disabled={!product.inStock}
                        data-testid={`add-to-cart-${product.id}`}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Aggiungi
                      </Button>
                      */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Nessun prodotto trovato</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prodotti;