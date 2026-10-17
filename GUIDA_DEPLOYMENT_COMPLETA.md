# 📘 GUIDA COMPLETA DEPLOYMENT
## Centro Metis - Sito Vetrina Nutrizionista

---

# INDICE

1. [Panoramica del Progetto](#1-panoramica-del-progetto)
2. [Preparazione: Repository GitHub](#2-preparazione-repository-github)
3. [Creare Account MongoDB Atlas (Database Gratuito)](#3-creare-account-mongodb-atlas)
4. [Creare Account DigitalOcean](#4-creare-account-digitalocean)
5. [Deploy su DigitalOcean App Platform](#5-deploy-su-digitalocean-app-platform)
6. [Configurazione Dominio Personalizzato](#6-configurazione-dominio-personalizzato)
7. [Importare il Database](#7-importare-il-database)
8. [Verifica Finale e Test](#8-verifica-finale-e-test)
9. [Manutenzione e Aggiornamenti](#9-manutenzione-e-aggiornamenti)
10. [Risoluzione Problemi Comuni](#10-risoluzione-problemi-comuni)
11. [Credenziali e Riferimenti](#11-credenziali-e-riferimenti)

---

# 1. PANORAMICA DEL PROGETTO

## Cos'è questo progetto?
Un sito web professionale per uno studio di nutrizione, composto da:
- **Sito pubblico**: Homepage, servizi, blog, contatti
- **Pannello Admin**: Gestione contenuti (accessibile da /admin)
- **E-commerce**: Nascosto ma presente nel codice (riattivabile)

## Architettura Tecnica
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    FRONTEND     │────▶│    BACKEND      │────▶│   DATABASE      │
│    (React)      │     │   (FastAPI)     │     │   (MongoDB)     │
│                 │     │                 │     │                 │
│  DigitalOcean   │     │  DigitalOcean   │     │  MongoDB Atlas  │
│    ~$5/mese     │     │   ~$5/mese      │     │    Gratuito     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Costi Stimati
| Servizio | Costo Mensile | Note |
|----------|---------------|------|
| DigitalOcean App Platform | $5-12 | Backend + Frontend |
| MongoDB Atlas | $0 | Piano gratuito (512MB) |
| Dominio (opzionale) | ~$12/anno | Se non hai già un dominio |
| **TOTALE** | **~$5-12/mese** | |

---

# 2. PREPARAZIONE: REPOSITORY GITHUB

## Passo 2.1: Accedi a GitHub
1. Vai su **https://github.com**
2. Se non hai un account, clicca **"Sign up"** e crea uno nuovo
3. Se hai già un account, clicca **"Sign in"**

## Passo 2.2: Clona il Repository
Il repository del progetto ti è stato condiviso. Per clonarlo:

```bash
git clone https://github.com/Cristiandagostino91/web-metis-def.git
```

## Passo 2.3: Verifica la Struttura
Il repository contiene:
- `backend/` - API e logica server (Python/FastAPI)
- `frontend/` - Interfaccia utente (React)
- `database_export.json` - Dati da importare nel database
- `GUIDA_DEPLOYMENT_COMPLETA.md` - Questa guida

## Link del Repository GitHub
```
📎 LINK GITHUB: https://github.com/_______________/centro-metis-website
```
*(Compila con il link ricevuto)*

---

# 3. CREARE ACCOUNT MONGODB ATLAS

MongoDB Atlas è il servizio cloud gratuito per il database.

## Passo 3.1: Registrazione
1. Vai su **https://www.mongodb.com/cloud/atlas/register**
2. Compila il form:
   - Email: la tua email
   - Password: scegli una password sicura
   - Nome: il tuo nome
3. Clicca **"Create your Atlas account"**
4. Verifica l'email cliccando il link ricevuto

## Passo 3.2: Creare un'Organizzazione e Progetto
1. Dopo il login, ti verrà chiesto di creare un'organizzazione
2. Nome organizzazione: `Centro Metis` (o quello che preferisci)
3. Nome progetto: `centrometis-production`
4. Clicca **"Create Project"**

## Passo 3.3: Creare il Cluster (Database)
1. Clicca **"Build a Database"**
2. Seleziona **"M0 FREE"** (piano gratuito)
3. Provider: **AWS** (consigliato)
4. Regione: **Frankfurt (eu-central-1)** (più vicino all'Italia)
5. Cluster Name: `CentroMetisCluster`
6. Clicca **"Create"**

⏳ *Attendi 1-3 minuti per la creazione del cluster*

## Passo 3.4: Creare Utente Database
1. Nella sezione **"Security Quickstart"**, crea un utente:
   - Username: `centrometis_admin`
   - Password: **genera una password sicura** (clicca "Autogenerate Secure Password")
   - **IMPORTANTE**: Copia e salva questa password!
2. Clicca **"Create User"**

## Passo 3.5: Configurare Accesso di Rete
1. Nella sezione **"Where would you like to connect from?"**
2. Seleziona **"Cloud Environment"**
3. Clicca **"Add IP Address"**
4. Seleziona **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Questo permette al server DigitalOcean di connettersi
5. Clicca **"Add Entry"**

## Passo 3.6: Ottenere la Connection String
1. Clicca **"Connect"** sul tuo cluster
2. Seleziona **"Connect your application"**
3. Driver: **Python** / Version: **3.12 or later**
4. Copia la connection string, sarà simile a:
```
mongodb+srv://centrometis_admin:<password>@centrometiscluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
5. **Sostituisci `<password>`** con la password creata al passo 3.4

## Credenziali MongoDB da Salvare
```
📝 MONGODB CONNECTION STRING:
mongodb+srv://centrometis_admin:TUA_PASSWORD@centrometiscluster.xxxxx.mongodb.net/?retryWrites=true&w=majority

📝 Database Name: centrometis
📝 Username: centrometis_admin
📝 Password: _______________
```

---

# 4. CREARE ACCOUNT DIGITALOCEAN

## Passo 4.1: Registrazione
1. Vai su **https://www.digitalocean.com**
2. Clicca **"Sign up"**
3. Puoi registrarti con:
   - Email e password
   - Google account
   - GitHub account (consigliato se hai già GitHub)

## Passo 4.2: Verifica Account
1. DigitalOcean richiede un metodo di pagamento per verificare l'account
2. Puoi usare:
   - Carta di credito/debito
   - PayPal
3. **Non ti verrà addebitato nulla** finché non superi i crediti gratuiti

## Passo 4.3: Crediti Gratuiti
- I nuovi account ricevono **$200 di crediti gratuiti** per 60 giorni
- Questo ti permette di testare tutto senza spendere nulla inizialmente

---

# 5. DEPLOY SU DIGITALOCEAN APP PLATFORM

## Passo 5.1: Creare una Nuova App
1. Dal dashboard DigitalOcean, clicca **"Create"** → **"Apps"**
2. Oppure vai direttamente a: **https://cloud.digitalocean.com/apps/new**

## Passo 5.2: Connettere GitHub
1. Seleziona **"GitHub"** come source
2. Clicca **"Connect GitHub"**
3. Autorizza DigitalOcean ad accedere ai tuoi repository
4. Seleziona il repository **centro-metis-website**
5. Branch: **main** (o master)
6. Clicca **"Next"**

## Passo 5.3: Configurare i Componenti

### Componente 1: Backend (API)
1. DigitalOcean rileverà automaticamente le cartelle
2. Per il **Backend**, configura:
   - **Name**: `backend`
   - **Source Directory**: `/backend`
   - **Type**: `Web Service`
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Run Command**: `uvicorn server:app --host 0.0.0.0 --port 8080`
   - **HTTP Port**: `8080`
   - **Instance Size**: `Basic ($5/mo)` - 512 MB RAM, 1 vCPU

### Componente 2: Frontend (Sito Web)
1. Clicca **"+ Add Resource"** → **"Static Site"**
2. Configura:
   - **Name**: `frontend`
   - **Source Directory**: `/frontend`
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `build`

## Passo 5.4: Configurare Variabili d'Ambiente

### Per il Backend:
Clicca su **backend** → **Settings** → **Environment Variables**

Aggiungi queste variabili:

| Chiave | Valore |
|--------|--------|
| `MONGO_URL` | `mongodb+srv://centrometis_admin:PASSWORD@cluster.mongodb.net/centrometis` |
| `DB_NAME` | `centrometis` |
| `JWT_SECRET` | `genera_stringa_casuale_64_caratteri` |

**Per generare JWT_SECRET**, usa questo sito: https://randomkeygen.com/
Copia una stringa dalla sezione "CodeIgniter Encryption Keys"

### Per il Frontend:
Clicca su **frontend** → **Settings** → **Environment Variables**

| Chiave | Valore |
|--------|--------|
| `REACT_APP_BACKEND_URL` | `${backend.INTERNAL_URL}` |

*Nota: `${backend.INTERNAL_URL}` è una variabile speciale di DigitalOcean che si risolve automaticamente*

## Passo 5.5: Configurare il Routing (IMPORTANTE!)

1. Vai su **Settings** → **Routes**
2. Aggiungi queste regole:

| Route | Component | Type |
|-------|-----------|------|
| `/api` | backend | HTTP |
| `/` | frontend | HTTP |

Questo fa sì che:
- Le chiamate a `/api/*` vadano al backend
- Tutto il resto vada al frontend

## Passo 5.6: Rivedere e Lanciare
1. Clicca **"Next"** per vedere il riepilogo
2. Regione: **Frankfurt** (più vicina all'Italia)
3. Piano: **Basic** (~$12/mese totali per entrambi i componenti)
4. Clicca **"Create Resources"**

⏳ *Il primo deploy richiede 5-10 minuti*

## Passo 5.7: Verificare il Deploy
1. Attendi che lo status diventi **"Deployed"** ✅
2. Clicca sull'URL generato (es: `https://centro-metis-xxxxx.ondigitalocean.app`)
3. Verifica che il sito sia visibile

---

# 6. CONFIGURAZIONE DOMINIO PERSONALIZZATO

Se vuoi usare il dominio `centrometis.com` invece dell'URL di DigitalOcean.

## Passo 6.1: Aggiungere il Dominio su DigitalOcean
1. Vai su **App** → **Settings** → **Domains**
2. Clicca **"Add Domain"**
3. Inserisci: `centrometis.com`
4. Clicca **"Add Domain"**

## Passo 6.2: Configurare i DNS
DigitalOcean ti mostrerà i record DNS da configurare:

```
Tipo: CNAME
Nome: www
Valore: centro-metis-xxxxx.ondigitalocean.app

Tipo: A
Nome: @
Valore: (IP fornito da DigitalOcean)
```

## Passo 6.3: Dove Configurare i DNS
Vai sul pannello del tuo registrar di dominio:
- **Aruba**: https://admin.aruba.it
- **GoDaddy**: https://dcc.godaddy.com
- **Namecheap**: https://ap.www.namecheap.com
- **Register.it**: https://controlpanel.register.it

Aggiungi i record DNS come indicato da DigitalOcean.

⏳ *La propagazione DNS può richiedere fino a 24-48 ore*

## Passo 6.4: SSL/HTTPS
DigitalOcean genera automaticamente un certificato SSL gratuito tramite Let's Encrypt.
Il tuo sito sarà accessibile via HTTPS senza configurazioni aggiuntive.

---

# 7. IMPORTARE IL DATABASE

Dopo il deploy, devi importare i dati (servizi, prodotti, blog) nel database.

## Metodo 1: Usando MongoDB Compass (Interfaccia Grafica)

### Passo 7.1: Scaricare MongoDB Compass
1. Vai su **https://www.mongodb.com/try/download/compass**
2. Scarica la versione per il tuo sistema operativo
3. Installa e apri MongoDB Compass

### Passo 7.2: Connettersi al Database
1. Incolla la connection string di MongoDB Atlas
2. Clicca **"Connect"**

### Passo 7.3: Creare il Database
1. Clicca **"Create database"**
2. Database Name: `centrometis`
3. Collection Name: `services`
4. Clicca **"Create Database"**

### Passo 7.4: Importare i Dati
1. Seleziona la collezione `services`
2. Clicca **"Add Data"** → **"Import JSON or CSV file"**
3. Seleziona il file `database_export.json`
4. Ripeti per ogni collezione (products, blog_posts)

## Metodo 2: Usando la Linea di Comando

```bash
# Installa MongoDB Database Tools
# macOS
brew install mongodb-database-tools

# Windows - scarica da:
# https://www.mongodb.com/try/download/database-tools

# Importa i dati
mongoimport --uri "TUA_CONNECTION_STRING" \
  --db centrometis \
  --collection services \
  --file database_export.json \
  --jsonArray
```

## Metodo 3: Script Python Automatico

Il progetto include uno script di importazione:

```bash
cd backend
pip install motor python-dotenv
python import_database.py
```

---

# 8. VERIFICA FINALE E TEST

## Checklist di Verifica

### ☐ Sito Pubblico
- [ ] Homepage carica correttamente
- [ ] Immagini visibili
- [ ] Menu di navigazione funziona
- [ ] Pagina Servizi mostra i servizi
- [ ] Pagina Blog mostra gli articoli
- [ ] Pagina Contatti funziona
- [ ] Pulsante WhatsApp visibile

### ☐ Pannello Admin
- [ ] Vai su `tuodominio.com/admin`
- [ ] Login con: `admin@centrometis.com` / `CentroMetis@2024!Admin`
- [ ] Dashboard mostra le statistiche
- [ ] Tab Servizi carica senza errori
- [ ] Tab Prodotti carica senza errori
- [ ] Tab Blog carica senza errori
- [ ] Puoi creare un nuovo servizio di test
- [ ] Puoi eliminare il servizio di test

### ☐ Funzionalità
- [ ] Form contatti invia correttamente
- [ ] Immagini si caricano nell'admin
- [ ] Modifiche ai contenuti si salvano

---

# 9. MANUTENZIONE E AGGIORNAMENTI

## Aggiornare il Sito
Quando fai modifiche al codice:
1. Fai commit e push su GitHub
2. DigitalOcean rileva automaticamente le modifiche
3. Avvia un nuovo deploy automatico

## Backup del Database
1. Vai su MongoDB Atlas
2. Cluster → **"..."** → **"Backup"**
3. Puoi configurare backup automatici (disponibili nei piani a pagamento)

## Monitoraggio
- DigitalOcean App Platform include monitoraggio base
- Vai su **App** → **Insights** per vedere:
  - Utilizzo CPU/RAM
  - Richieste HTTP
  - Errori

---

# 10. RISOLUZIONE PROBLEMI COMUNI

## Problema: Sito mostra pagina bianca
**Causa**: Errore JavaScript nel frontend
**Soluzione**: 
1. Apri la console del browser (F12)
2. Controlla gli errori
3. Verifica che `REACT_APP_BACKEND_URL` sia corretto

## Problema: Errore 500 nelle API
**Causa**: Errore nel backend o database
**Soluzione**:
1. Vai su DigitalOcean → App → **Runtime Logs**
2. Cerca l'errore specifico
3. Verifica `MONGO_URL` sia corretto

## Problema: Login admin non funziona
**Causa**: Database non popolato o credenziali errate
**Soluzione**:
1. Verifica di aver importato il database
2. Usa esattamente: `admin@centrometis.com` / `CentroMetis@2024!Admin`

## Problema: Immagini non si caricano
**Causa**: Cartella uploads non persistente
**Soluzione**:
1. Usa un servizio di storage esterno (es: DigitalOcean Spaces, AWS S3)
2. Oppure usa URL di immagini esterne (Unsplash, ecc.)

## Problema: Deploy fallisce
**Causa**: Errore nel codice o nelle dipendenze
**Soluzione**:
1. Vai su DigitalOcean → App → **Build Logs**
2. Cerca l'errore specifico
3. Correggi il codice e fai push

---

# 11. CREDENZIALI E RIFERIMENTI

## Credenziali da Conservare

```
╔════════════════════════════════════════════════════════════════╗
║                    CREDENZIALI PROGETTO                        ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  GITHUB                                                        ║
║  Repository: https://github.com/_____________/centro-metis     ║
║                                                                ║
║  MONGODB ATLAS                                                 ║
║  URL Login: https://cloud.mongodb.com                          ║
║  Email: _______________________                                ║
║  Password: ____________________                                ║
║  Connection String: mongodb+srv://...                          ║
║                                                                ║
║  DIGITALOCEAN                                                  ║
║  URL Login: https://cloud.digitalocean.com                     ║
║  Email: _______________________                                ║
║  Password: ____________________                                ║
║  App URL: https://_____________.ondigitalocean.app             ║
║                                                                ║
║  PANNELLO ADMIN SITO                                           ║
║  URL: https://centrometis.com/admin                            ║
║  Email: admin@centrometis.com                                  ║
║  Password: CentroMetis@2024!Admin                              ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

## Link Utili

| Servizio | URL |
|----------|-----|
| GitHub | https://github.com |
| MongoDB Atlas | https://cloud.mongodb.com |
| DigitalOcean | https://cloud.digitalocean.com |
| MongoDB Compass | https://www.mongodb.com/try/download/compass |

## Supporto Tecnico

- **DigitalOcean Docs**: https://docs.digitalocean.com/products/app-platform/
- **MongoDB Docs**: https://docs.mongodb.com/
- **React Docs**: https://react.dev/

---

# APPENDICE A: TRASFERIMENTO PROPRIETÀ GITHUB

Se vuoi trasferire il repository a un altro account:

1. Vai su GitHub → Repository → **Settings**
2. Scorri fino a **"Danger Zone"**
3. Clicca **"Transfer"**
4. Inserisci il username GitHub del nuovo proprietario
5. Conferma il trasferimento

Il nuovo proprietario riceverà un'email per accettare il trasferimento.

---

# APPENDICE B: VARIABILI D'AMBIENTE COMPLETE

## Backend (.env)
```env
# Database MongoDB (OBBLIGATORIO)
MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/centrometis
DB_NAME=centrometis

# Autenticazione JWT (OBBLIGATORIO)
JWT_SECRET=stringa_casuale_64_caratteri_minimo

# Email - Resend (OPZIONALE)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# PayPal (OPZIONALE - per e-commerce)
PAYPAL_CLIENT_ID=xxxxxxxxxxxxx
```

## Frontend (.env)
```env
# URL Backend API (OBBLIGATORIO)
REACT_APP_BACKEND_URL=https://tuo-backend.ondigitalocean.app
```

---

*Guida versione 1.0*
*Progetto: Centro Metis - Sito Vetrina Nutrizionista*
