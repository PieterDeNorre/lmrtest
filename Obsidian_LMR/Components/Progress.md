---
Estimation: "4"
tags:
  - Component
  - Shared
---
## Info

Maakt gebruik van QuizContext en Question context.
Dit component kan op verschillende plaatsen herbruikt worden.
In verschillende weergaves.

Enerzijds op de map, Info corner en resultatenoverzichten als complexe weergave,
anderzijds in de model die een level voltooid in zijn simpele weergave

Weergave van progress balk met label (breuk vorm of percentage) met bijkomend icoon of text (level) op een blauwe achtergrond anderzijds enkel de gele progress balk

Animaties met Framer motion.

## Attributes

- className: string
- bar: boolean
- overview: boolean
- total: number
- label: number
- core: number

## Gebruikt in

- [[Map]]
- [[Info corner]]
- Spel overzicht