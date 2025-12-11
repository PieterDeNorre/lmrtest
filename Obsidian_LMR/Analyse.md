## Plan van aanpak

##### A) Functionele analyse van het project en de verwachtingen van de klant visualiseren
![[Datamap.canvas]]
##### B) Componenten en  structuren bepalen
[[Kanban]]
##### C) Tech stack bepalen
	- Nextjs 16 (reactjs)
	- Tailwind-css/Variants (styling)
	- Framer motion (animaties)
	- knip (Cleanproject)


## Bedenkingen / vragen

- Browser caching ?
- Tracking ?
- Saving data / results to db on a user basis
- Ondersteuning verschillende talen
- Zijn er nog bijkomende types van vragen/spelletjes
- Interpretaties van scores voor de overzichten en opties zijn me nog niet 100% duidelijk

Deze zaken zijn allemaal nog niet opgenomen in de inschattingen

## Inschattingen
### Contexten
```dataview
TABLE Estimation AS "Inschatting (h)" FROM "Context" SORT file.name ASC
```
### Componenten
```dataview
TABLE Estimation AS "Inschatting (h)" FROM "Components" SORT file.name ASC
```
### Views
```dataview
TABLE Estimation AS "Inschatting (h)" FROM "Views" SORT file.name ASC
```
### Utils
```dataview
TABLE Estimation AS "Inschatting (h)" FROM "Utils" SORT file.name ASC
```


### Other
```dataview
TABLE Estimation AS "Inschatting (h)" FROM "Other" SORT file.name ASC
```


## Totaal Inschattingen
```dataviewjs
const includeFolders = ["Components", "Views", "Utils", "Context", "Other"];

const pages = dv.pages().where(p => {
  const estimation = p.Estimation;
  if (!estimation) return false;
  const folder = p.file.folder || "Root";
  return includeFolders.includes(folder);
});

const byFolder = {};

for (let page of pages) {
  const folder = page.file.folder || "Root";
  let estimation = page.Estimation;
  
  // Handle different estimation formats
  if (typeof estimation === 'string') {
    // Remove any non-numeric characters except decimal point
    estimation = estimation.replace(/[^\d.]/g, '');
  }
  
  // Convert to number, default to 0 if invalid
  estimation = parseFloat(estimation);
  if (isNaN(estimation)) estimation = 0;
  
  if (!byFolder[folder]) byFolder[folder] = [];
  byFolder[folder].push(estimation);
}

const folderTotals = Object.entries(byFolder).map(([folder, estimations]) => [
  folder, 
  estimations.reduce((a, b) => a + b, 0)
]);

const grandTotal = folderTotals.reduce((sum, [folder, total]) => sum + total, 0);
const days = grandTotal / 8
dv.table(["Folder", "Totaal inschattingen (h)"], 
  [...folderTotals, ["**Totaal uren**", `**${grandTotal}**`], ["**Totaal dagen**", `**${days}**`]]
);

```


