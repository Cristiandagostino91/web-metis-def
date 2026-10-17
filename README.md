# Centro Metis - Sito Vetrina Nutrizionista

Sito web professionale per studio di nutrizione con pannello di amministrazione.

## Tecnologie
- **Frontend**: React 18, TailwindCSS, Shadcn/UI
- **Backend**: FastAPI (Python)
- **Database**: MongoDB

## Struttura Progetto
```
├── backend/          # API e logica server
├── frontend/         # Interfaccia utente React
├── database_export.json  # Dati da importare
└── GUIDA_DEPLOYMENT_COMPLETA.md
```

## Quick Start (Sviluppo Locale)

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Credenziali Admin
- **URL**: /admin
- **Email**: admin@centrometis.com
- **Password**: CentroMetis@2024!Admin

## Deployment
Vedi `GUIDA_DEPLOYMENT_COMPLETA.md` per istruzioni dettagliate.
