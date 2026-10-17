import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]


async def seed_database():
    print("🌱 Starting database seeding...")
    
    # Clear existing data
    print("Clearing existing data...")
    await db.products.delete_many({})
    await db.services.delete_many({})
    await db.blog_posts.delete_many({})
    
    # Seed Products
    products = [
        {
            'id': '1',
            'name': 'Omega 3 Premium',
            'category': 'integratori',
            'price': 29.90,
            'image': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600',
            'description': 'Integratore di Omega 3 ad alto dosaggio, essenziale per la salute cardiovascolare',
            'inStock': True,
            'featured': True
        },
        {
            'id': '2',
            'name': 'Sali Minerali Complex',
            'category': 'integratori',
            'price': 19.90,
            'image': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600',
            'description': 'Mix completo di sali minerali per il benessere quotidiano',
            'inStock': True,
            'featured': True
        },
        {
            'id': '3',
            'name': 'Vitamina D3',
            'category': 'integratori',
            'price': 15.90,
            'image': 'https://images.unsplash.com/photo-1550572017-4c6b0c9d0885?w=600',
            'description': 'Vitamina D3 per il supporto del sistema immunitario',
            'inStock': True,
            'featured': False
        },
        {
            'id': '4',
            'name': 'Probiotici Avanzati',
            'category': 'integratori',
            'price': 34.90,
            'image': 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600',
            'description': 'Formula avanzata di probiotici per la salute intestinale',
            'inStock': True,
            'featured': True
        },
        {
            'id': '5',
            'name': 'Magnesio Supremo',
            'category': 'integratori',
            'price': 22.90,
            'image': 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600',
            'description': 'Magnesio altamente biodisponibile per energia e relax',
            'inStock': True,
            'featured': False
        },
        {
            'id': '6',
            'name': 'Multivitaminico Completo',
            'category': 'integratori',
            'price': 27.90,
            'image': 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600',
            'description': 'Formula completa di vitamine e minerali essenziali',
            'inStock': True,
            'featured': False
        }
    ]
    
    await db.products.insert_many(products)
    print(f"✅ Inserted {len(products)} products")
    
    # Seed Services
    services = [
        {
            'id': 's1',
            'title': 'Consulenza Nutrizionale',
            'price': 80.00,
            'duration': '60 min',
            'description': 'Prima visita con valutazione completa e piano alimentare personalizzato',
            'image': 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600',
            'category': 'consulenze'
        },
        {
            'id': 's2',
            'title': 'Bioimpedenziometria',
            'price': 40.00,
            'duration': '30 min',
            'description': 'Analisi della composizione corporea con strumentazione avanzata',
            'image': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
            'category': 'analisi'
        },
        {
            'id': 's3',
            'title': 'Dieta Chetogenica',
            'price': 120.00,
            'duration': '90 min',
            'description': 'Programma completo per dimagrimento con dieta chetogenica',
            'image': '/api/uploads/dieta_chetogenica.jpg',
            'category': 'programmi'
        },
        {
            'id': 's4',
            'title': 'Nutrizione Sportiva',
            'price': 100.00,
            'duration': '60 min',
            'description': 'Piano alimentare personalizzato per atleti e sportivi',
            'image': '/api/uploads/nutrizione_sportiva.jpg',
            'category': 'programmi'
        },
        {
            'id': 's5',
            'title': 'Nutrizione in Gravidanza',
            'price': 90.00,
            'duration': '60 min',
            'description': 'Supporto nutrizionale durante gravidanza e allattamento',
            'image': 'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=600',
            'category': 'consulenze'
        },
        {
            'id': 's6',
            'title': 'Controllo Periodico',
            'price': 50.00,
            'duration': '30 min',
            'description': 'Visita di controllo e adattamento del piano alimentare',
            'image': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
            'category': 'consulenze'
        }
    ]
    
    await db.services.insert_many(services)
    print(f"✅ Inserted {len(services)} services")
    
    # Seed Blog Posts
    blog_posts = [
        {
            'id': 'b1',
            'title': 'Dieta chetogenica e fertilità',
            'excerpt': 'Migliorare gli indici di fertilità femminili e maschili attraverso l\'alimentazione',
            'content': 'La dieta chetogenica può avere effetti positivi sulla fertilità sia maschile che femminile. Questo regime alimentare, caratterizzato da un basso apporto di carboidrati e un alto contenuto di grassi, può contribuire a regolare gli ormoni e migliorare la salute riproduttiva...',
            'author': 'Dott.ssa Paola Buoninfante',
            'date': '13 marzo 2025',
            'image': 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800',
            'category': 'Nutrizione',
            'published': True
        },
        {
            'id': 'b2',
            'title': 'Alimentazione sostenibile: il modello della dieta mediterranea',
            'excerpt': 'L\'impronta ecologica delle nostre scelte alimentari',
            'content': 'La dieta mediterranea rappresenta un modello di alimentazione sostenibile riconosciuto dall\'UNESCO come patrimonio culturale immateriale dell\'umanità. Questo regime alimentare non solo promuove la salute umana, ma ha anche un impatto positivo sull\'ambiente...',
            'author': 'Dott.ssa Paola Buoninfante',
            'date': '13 marzo 2025',
            'image': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800',
            'category': 'Sostenibilità',
            'published': True
        },
        {
            'id': 'b3',
            'title': 'La nutrizione per la fibromialgia',
            'excerpt': 'Ridurre l\'infiammazione e curare il microbiota intestinale',
            'content': 'Un approccio nutrizionale mirato può aiutare a gestire i sintomi della fibromialgia. La ricerca ha dimostrato che una dieta anti-infiammatoria e la cura del microbiota intestinale possono portare a miglioramenti significativi nella qualità della vita dei pazienti...',
            'author': 'Dott.ssa Paola Buoninfante',
            'date': '13 marzo 2025',
            'image': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
            'category': 'Patologie',
            'published': True
        }
    ]
    
    await db.blog_posts.insert_many(blog_posts)
    print(f"✅ Inserted {len(blog_posts)} blog posts")
    
    print("🎉 Database seeding completed successfully!")


if __name__ == "__main__":
    asyncio.run(seed_database())
