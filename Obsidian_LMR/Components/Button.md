---
Estimation: "6"
tags:
  - Component
  - Shared
---
## Info

Dit complexe component zal gebruikt worden doorheen de volledig applicatie.
Ook voor de validatie van de multiple choice vragen.
Zal in verschillende stijlen kunnen weergegeven worden via "variant", primary, secondary, tertiary, etc.

Zal verschillende statussen hebben zoals active, disabled, selected etc.
zal verschillende sizes en vormen aan kunnen square, circle, notRounded etc..

## Attributes

- children: ReactNode
- label: string
- action: Function
- variant: string
- size: string
- square: boolean
- active: boolean
- disables: boolean
- selected: boolean
- isCorrect: boolean
- className: string
- notRounded: boolean
- animate: boolean
- circle: boolean

## Gebruikt in

- [[Info corner]]
- [[Job locations]]
- [[Modal wrapper]]