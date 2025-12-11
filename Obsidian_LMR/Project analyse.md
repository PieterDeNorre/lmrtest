---
tags:
  - ProjectOverview
  - Documentation
created: 2025-12-11
---

# LMR Test - Interactieve Beroepskeuze Quiz Applicatie

## Hoofdfunctionaliteit

De LMR Test is een **interactieve quiz-applicatie** die jongeren helpt bij het ontdekken van geschikte beroepen door middel van een speelse, geanimeerde ervaring. De applicatie combineert verschillende vraagformaten met visuele elementen en gamification om gebruikers te begeleiden in hun beroepskeuze.

## 🛠️ Technische Stack

- **Framework**: Next.js 16 met App Router (React 19)
- **Styling**: Tailwind CSS v4 met Tailwind Variants
- **Animaties**: Framer Motion voor vloeiende overgangen
- **Taal**: TypeScript voor type-veiligheid
- **Projectbeheer**: Obsidian met Dataview plugin voor documentatie

## 📱 Applicatie Structuur (Quiz Flow)

### 1. Level Selectie

**Component**: [[Level Selection]]

- **Functie**: Keuze van moeilijkheidsgraad/leeftijdscategorie
- **Sub-componenten**: [[Level Option]] met avatar en level beschrijving
- **Animaties**: Framer Motion overgangen met scale en opacity effecten
- **Context**: Gebruikt QuizContext om gekozen level op te slaan

### 2. Beroepen Selectie

**Component**: [[Job Selection]]

- **Functie**: Interactieve kaart met beroepslocaties
- **Sub-componenten**: [[Job Locations]] met geanimeerde voertuigen en vliegtuigen
- **Animaties**: SVG path animaties voor voertuigen over een kaart
- **Visueel**: Combinatie van kaart, animaties en interactieve hotspots

### 3. Multiple Choice Quiz

**Component**: [[Multiple Choice]], [[Tegel spel]], [[Reactie vragen]]

- **Functie**: Hoofdquiz met verschillende vraagtypen
- **Sub-componenten**:
  - [[Question Container]]: Behandelt individuele vragen, en kiest het correcte vragen type
  - [[Info Corner]]: Toont spelinformatie, timer, avatar en voortgang
- **Vraagtypen**: Meerkeuze vragen met score berekening

### 4. Resultaten Overzicht

Componenten: 
- [[Job opties]]
- [[Spel overzicht]]
- [[Diploma]]
- [[Jobs overzicht]]

## 🧩 Kern Componenten

### Gedeelde Componenten (/shared)

- [[Modal Wrapper]]: Herbruikbare modal wrapper met animaties en decoratieve spijkers
- [[Button]]: Versatiele button component met verschillende varianten
- [[Progress]]: Progress bar voor scores en voortgang
- [[Timer]]: Tijd beheer component
- [[Avatar]]: Gebruiker representatie
- [[IconsProvider]]: Icon management systeem
- [[Info corner]]: Klankbord voor gebruiker

### Context Management

- **QuizContext**:
  - Timer functionaliteit (start, pause, reset)
  - Quiz stappen en navigatie
  - Level selectie
  - Resultaten opslag
  
- **QuestionsContext**:
  - Vragen beheer en navigatie
  - Antwoorden opslag
  - Huidige vraag index tracking

## 🎨 Animatie Systeem

- **Framer Motion**: Gebruikt voor alle overgangen en animaties
- **SVG Animaties**: Voertuigen die over kaartpaden bewegen
- **Component Animaties**: Fade-ins, scale effecten, staggered animaties
- **Page Transitions**: Vloeiende overgangen tussen quiz stappen

## 💾 Data Management

- **Mock Data**: Vragen, beroepsinformatie en UI teksten in `/mock/flavour.ts`
- **Server-side Data**: Quiz data wordt server-side opgehaald via `getQuizData()`
- **State Management**: React Context voor quiz state en vragen

## 📋 Projectdocumentatie (Obsidian)

- [[Kanban]]: Taakbeheer en voortgang tracking
- **Component Documentatie**: Gedetailleerde specs per component
- **Tijdsinschattingen**: Dataview queries voor development estimaties
- **Dataview Integratie**: Automatische berekeningen en overzichten

## 🔧 Ontwikkeling & Tooling

- **Development**: Hot reloading met Next.js dev server
- **Linting**: ESLint configuratie voor code kwaliteit
- **Knip**: Tool voor het vinden van ongebruikte code en dependencies
- **TypeScript**: Volledige type safety door het project

## 🎯 Gebruikerservaring Flow

1. **Start**: Level selectie met intro tekst en animaties
2. **Verkenning**: Interactieve kaart met beroepslocaties
3. **Quiz**: Getimede multiple choice vragen met real-time feedback
4. **Resultaat**: Overzicht van scores per beroepsgebied met aanbevelingen

## 📊 Component Overzicht

```dataview
TABLE FROM "Components"
SORT file.name ASC
```

## 📊 Views Overzicht

```dataview
TABLE FROM "Views"
SORT file.name ASC
```
## 📊 Contexts Overzicht

```dataview
TABLE FROM "Context"
SORT file.name ASC
```

## 📊 Utils Overzicht

```dataview
TABLE FROM "Utils"
SORT file.name ASC
```
## 🎮 Quiz Types

De applicatie ondersteunt verschillende vraagtypen:

- [[Meerkeuze vragen]]: Standaard multiple choice
- [[Tegel spel]]: Interactieve tegel-gebaseerde vragen
- [[Reactie vragen]]: Reactie-tijd gebaseerde vragen
- ... ?

## 🏗️ Architectuur

De applicatie combineert moderne web technologieën met doordachte UX design om een engaging en educatieve ervaring te creëren voor beroepsoriëntatie. Elke component is modulair opgezet met duidelijke separation of concerns tussen UI, state management en business logic.

---


