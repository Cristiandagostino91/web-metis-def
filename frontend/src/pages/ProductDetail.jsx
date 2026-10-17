import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { getProduct } from '../services/api';
import { toast } from '../hooks/use-toast';
import { 
  ShoppingCart, ArrowLeft, Check, Package, Truck, 
  Shield, Info, AlertTriangle, Beaker, FileText, Phone
} from 'lucide-react';
import SEOHead, { generateProductSchema } from '../components/SEOHead';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await getProduct(id);
      setProduct(data);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Prodotto non trovato",
        variant: "destructive"
      });
      navigate('/prodotti');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Aggiunto al carrello",
      description: `${quantity}x ${product.name} aggiunto al carrello`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metis-600"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title={`${product.name} - Integratore Alimentare`}
        description={`Acquista ${product.name} a €${product.price}. ${product.description?.substring(0, 150)}... Spedizione in tutta Italia.`}
        keywords={`${product.name}, integratore alimentare, ${product.brand}, acquista online`}
        canonical={`/prodotti/${product.id}`}
        type="product"
        schema={generateProductSchema(product)}
      />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-metis-600 to-metis-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/prodotti')}
            className="flex items-center gap-2 text-metis-100 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Torna ai prodotti
          </button>
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-metis-100 mt-2">{product.brand}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <Card className="overflow-hidden">
              <CardContent className="p-0 bg-white">
                <div className="aspect-square w-full flex items-center justify-center p-4 md:p-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {product.glutenFree && (
                <span className="px-3 py-1 bg-metis-100 text-metis-700 rounded-full text-sm font-medium flex items-center gap-1">
                  <Check className="w-4 h-4" /> Senza Glutine
                </span>
              )}
              {product.lactoseFree && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1">
                  <Check className="w-4 h-4" /> Senza Lattosio
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Price & Add to Cart */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-metis-600">€{product.price.toFixed(2)}</span>
                </div>
                
                {/* Info - Prodotto disponibile in studio */}
                <div className="bg-metis-50 border border-metis-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-metis-800">
                    <Package className="w-4 h-4 inline mr-2" />
                    <strong>Prodotto disponibile presso il nostro studio</strong>
                  </p>
                  <p className="text-xs text-metis-700 mt-1">
                    Per acquistare questo prodotto, contattaci o vieni a trovarci in studio.
                  </p>
                </div>
                
                <p className="text-gray-600 mb-6">{product.subtitle}</p>

                {/* Contact buttons instead of cart */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <a href="tel:+390828526615" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-metis-600 to-metis-600 hover:from-metis-700 hover:to-metis-700 text-white py-6 text-lg rounded-full">
                      <Phone className="w-5 h-5 mr-2" />
                      Chiama per Info
                    </Button>
                  </a>
                  <Link to="/contatti" className="flex-1">
                    <Button variant="outline" className="w-full border-2 border-metis-600 text-metis-600 hover:bg-metis-50 py-6 text-lg rounded-full">
                      Richiedi Informazioni
                    </Button>
                  </Link>
                </div>

                {/* Hidden shop elements - kept in code
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    <Truck className="w-4 h-4 inline mr-1" />
                    <strong>Spedizione: €8,90</strong> per 1-3 prodotti
                  </p>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>

                <Button onClick={handleAddToCart}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Aggiungi al Carrello
                </Button>
                */}

                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
                  <div className="text-center">
                    <Truck className="w-6 h-6 mx-auto text-metis-600 mb-1" />
                    <span className="text-xs text-gray-600">Consegna<br/>2-3 giorni</span>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 mx-auto text-metis-600 mb-1" />
                    <span className="text-xs text-gray-600">Pagamento<br/>Sicuro</span>
                  </div>
                  <div className="text-center">
                    <Package className="w-6 h-6 mx-auto text-metis-600 mb-1" />
                    <span className="text-xs text-gray-600">Qualità<br/>Garantita</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-metis-600" />
                  Informazioni Prodotto
                </h3>
                <div className="space-y-3">
                  {product.netWeight && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Peso Netto</span>
                      <span className="font-semibold">{product.netWeight}</span>
                    </div>
                  )}
                  {product.format && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Formato</span>
                      <span className="font-semibold">{product.format}</span>
                    </div>
                  )}
                  {product.flavor && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Gusto</span>
                      <span className="font-semibold">{product.flavor}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Marchio</span>
                    <span className="font-semibold">{product.brand || 'Metis'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="mt-8 space-y-6">
          {/* Description */}
          {product.fullDescription && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-metis-600" />
                  Descrizione
                </h3>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {product.fullDescription}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-metis-600" />
                  Benefici
                </h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-metis-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-metis-600" />
                  Ingredienti
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing, idx) => (
                    <span key={idx} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                      {ing}
                    </span>
                  ))}
                </div>
                {product.fullIngredients && (
                  <p className="mt-4 text-sm text-gray-600 italic">
                    {product.fullIngredients}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Nutritional Info */}
          {product.nutritionalInfo && product.nutritionalInfo.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Valori Nutrizionali</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-metis-50">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Nutriente</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Per dose</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">%VNR*</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.nutritionalInfo.map((info, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-3 px-4 text-gray-700">{info.nutrient}</td>
                          <td className="py-3 px-4 text-right font-semibold">{info.perDose}</td>
                          <td className="py-3 px-4 text-right text-metis-600">{info.vnr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-500 mt-2">*VNR = Valori Nutritivi di Riferimento</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Usage */}
          {product.usage && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Modalità d'Uso</h3>
                <p className="text-gray-700 bg-metis-50 p-4 rounded-lg">
                  {product.usage}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Warnings */}
          {product.warnings && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Avvertenze
                </h3>
                <p className="text-yellow-900 text-sm">
                  {product.warnings}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Back to Products */}
        <div className="mt-8 text-center">
          <Link to="/prodotti">
            <Button variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna a tutti i prodotti
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
