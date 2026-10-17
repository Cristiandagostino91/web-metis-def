#!/usr/bin/env python3
"""
Script per importare il database Centro Metis.
Uso: python3 import_database.py

Assicurati di configurare MONGO_URL nel file .env prima di eseguire.
"""

import asyncio
import json
import os
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Carica variabili ambiente
load_dotenv()

MONGO_URL = os.environ.get('MONGO_URL')
DB_NAME = os.environ.get('DB_NAME', 'centrometis')

async def import_database():
    if not MONGO_URL:
        print("❌ Errore: MONGO_URL non configurato nel file .env")
        print("   Aggiungi: MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/")
        return
    
    # Cerca il file di export
    export_file = Path(__file__).parent.parent / 'database_export.json'
    if not export_file.exists():
        export_file = Path(__file__).parent / 'database_export.json'
    
    if not export_file.exists():
        print("❌ Errore: File database_export.json non trovato")
        return
    
    print(f"📂 Caricamento dati da {export_file}")
    
    with open(export_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"🔌 Connessione a MongoDB...")
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print(f"📊 Database: {DB_NAME}")
    print("-" * 40)
    
    for collection_name, documents in data.items():
        if documents:
            # Rimuovi _id per evitare conflitti
            for doc in documents:
                if '_id' in doc:
                    del doc['_id']
            
            # Inserisci documenti
            try:
                # Prima svuota la collezione (opzionale)
                await db[collection_name].delete_many({})
                result = await db[collection_name].insert_many(documents)
                print(f"✅ {collection_name}: {len(result.inserted_ids)} documenti importati")
            except Exception as e:
                print(f"❌ {collection_name}: Errore - {e}")
        else:
            print(f"⏭️  {collection_name}: nessun documento da importare")
    
    print("-" * 40)
    print("🎉 Importazione completata!")
    print(f"\n📝 Credenziali Admin:")
    print(f"   Email: admin@centrometis.com")
    print(f"   Password: CentroMetis@2024!Admin")

if __name__ == "__main__":
    asyncio.run(import_database())
