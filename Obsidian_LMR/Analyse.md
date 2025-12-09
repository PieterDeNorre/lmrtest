
## Bedenkingen
Is er nood aan:
- Zijn er nog bijkomende types van vragen/spelletjes
- interpretaties van scores
- Caching
- Tracking
- Saving data for user to db

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

## Totaal
```dataviewjs
const includeFolders = ["Components", "Views", "Utils", "Context"];

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

dv.table(["Folder", "Totaal inschatingen (h)"], 
  [...folderTotals, ["**Totaal**", `**${grandTotal}**`]]
);
```

## Mindmap / Kanban
[[Datamap.canvas]]
[[Kanban]]