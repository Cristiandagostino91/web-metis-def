import { useEffect } from 'react';

const SEOHead = ({ 
  title, 
  description, 
  keywords,
  canonical,
  type = 'website',
  image,
  schema
}) => {
  const baseUrl = 'https://www.centrometis.com';
  const defaultImage = `${baseUrl}/og-image.jpg`;
  
  useEffect(() => {
    // Update title
    document.title = title ? `${title} | Centro Metis` : 'Centro Metis | Nutrizionista Bellizzi Salerno';
    
    // Update meta tags
    const updateMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Primary meta tags
    if (description) {
      updateMeta('description', description);
    }
    if (keywords) {
      updateMeta('keywords', keywords);
    }
    
    // Open Graph
    updateMeta('og:title', title || 'Centro Metis', true);
    updateMeta('og:description', description || 'Studio nutrizionale a Bellizzi (SA)', true);
    updateMeta('og:type', type, true);
    updateMeta('og:image', image || defaultImage, true);
    if (canonical) {
      updateMeta('og:url', `${baseUrl}${canonical}`, true);
    }
    
    // Twitter
    updateMeta('twitter:title', title || 'Centro Metis', true);
    updateMeta('twitter:description', description || 'Studio nutrizionale a Bellizzi (SA)', true);
    updateMeta('twitter:image', image || defaultImage, true);
    
    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical ? `${baseUrl}${canonical}` : baseUrl);
    
    // Schema.org structured data
    if (schema) {
      // Remove old schema
      const oldSchema = document.querySelector('script[data-schema="page"]');
      if (oldSchema) {
        oldSchema.remove();
      }
      
      // Add new schema
      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-schema', 'page');
      schemaScript.textContent = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }
    
  }, [title, description, keywords, canonical, type, image, schema]);
  
  return null;
};

export default SEOHead;

// Helper function to generate Product schema
export const generateProductSchema = (product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image,
  "brand": {
    "@type": "Brand",
    "name": "Metis"
  },
  "offers": {
    "@type": "Offer",
    "url": `https://www.centrometis.com/prodotti/${product.id}`,
    "priceCurrency": "EUR",
    "price": product.price,
    "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    "seller": {
      "@type": "Organization",
      "name": "Centro Metis"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "12"
  }
});

// Helper function to generate Service schema
export const generateServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.title,
  "description": service.description,
  "provider": {
    "@type": "MedicalBusiness",
    "name": "Centro Metis",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via John Fitzgerald Kennedy, 66",
      "addressLocality": "Bellizzi",
      "addressRegion": "SA",
      "postalCode": "84092"
    }
  },
  "areaServed": {
    "@type": "City",
    "name": "Bellizzi"
  },
  "serviceType": service.category
});

// Helper function to generate BlogPost schema
export const generateBlogSchema = (post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.excerpt,
  "image": post.image,
  "datePublished": post.date,
  "author": {
    "@type": "Person",
    "name": post.author || "Dr. Memoli"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Centro Metis",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.centrometis.com/logo.png"
    }
  }
});

// FAQ Schema helper
export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
