# Platzl Reisen Website mit Strapi CMS

Eine moderne Busreisen-Website für Platzl-reisen.at mit vollständiger Strapi CMS Integration.

## 🚀 Setup

### 1. Frontend starten
```bash
npm run dev
```

### 2. Strapi CMS Setup (Einzige Backend-Lösung)

#### Installation
```bash
npx create-strapi-app@latest platzl-strapi --quickstart
cd platzl-strapi
```

#### Content-Types erstellen
Kopieren Sie die JSON-Dateien aus `strapi-config/` in Ihr Strapi-Projekt:

1. **Reise (Trip)**
   - Pfad: `src/api/trip/content-types/trip/schema.json`
   - Felder: Titel, Untertitel, Beschreibung, Kategorie, Therme-Infos, etc.

2. **Hotel**
   - Pfad: `src/api/hotel/content-types/hotel/schema.json`
   - Felder: Name, Sterne, Preis, Bild, Beschreibung, Ausstattung

3. **Reisetermin (Trip-Date)**
   - Pfad: `src/api/trip-date/content-types/trip-date/schema.json`
   - Felder: Datum, Preis, Verfügbarkeit

#### Strapi starten
```bash
npm run develop
```

### 3. Content-Types konfigurieren

1. Öffnen Sie http://localhost:1337/admin
2. Erstellen Sie einen Admin-Account
3. Die Content-Types werden automatisch erkannt
4. Gehen Sie zu Settings > Users & Permissions > Roles > Public
5. Aktivieren Sie folgende Permissions:
   - Trip: find, findOne
   - Hotel: find, findOne
   - Trip-date: find, findOne
   - Upload: find, findOne

### 4. Beispieldaten über Strapi Admin hinzufügen

#### Reise erstellen:
1. Content Manager > Trip > Create new entry
2. Füllen Sie alle Felder aus:
   - **Titel**: "Portoroz - Erholung & Sommerurlaub an der Adria"
   - **Untertitel**: "Thermenhotels und Hotels mit beheizten Meerwasserpools direkt am Meer!"
   - **Kategorie**: "therme"
   - **Featured Date**: "18.08."
   - **Base Price**: 589
   - **Therme-Felder** ausfüllen

#### Hotels hinzufügen:
1. Content Manager > Hotel > Create new entry
2. Verknüpfen Sie das Hotel mit der Reise
3. Laden Sie ein Hotelbild hoch

#### Termine hinzufügen:
1. Content Manager > Trip Date > Create new entry
2. Verknüpfen Sie den Termin mit der Reise

## 🎨 Design Features

- **Platzl Reisen Farben**: Rot (#dc2626), Gelb (#fbbf24)
- **Responsive Design** für alle Geräte
- **Tab-Navigation** für Reisedetails
- **Hotel-Modals** mit erweiterten Informationen
- **CMS-Integration** für einfache Inhaltsverwaltung

## 📝 CMS Verwaltung

Ihre Sekretärin kann über das Strapi Admin Panel:
- ✅ Neue Reisen hinzufügen
- ✅ Hotels mit Bildern verwalten
- ✅ Termine und Preise aktualisieren
- ✅ Alle Texte bearbeiten
- ✅ Therme-Informationen pflegen

## 🔧 Technische Details

- **Frontend**: React + TypeScript + Tailwind CSS
- **CMS & Backend**: Strapi v4 (mit integrierter SQLite Datenbank)
- **API**: REST API mit Axios
- **Medien**: Strapi Media Library
- **Deployment**: Vite Build für Production

**Keine zusätzliche Datenbank erforderlich** - Strapi verwaltet alles intern!