# Hopverkefni-1

## Vefforritun 2 - Uppsetning og Keyrsla

Velkomin/n! Þetta er leiðbeiningar um hvernig á að setja upp og keyra verkefnið **Hopverkefni-1**.

## COMMANDS ##
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run dev


## TENGJAST NEON DATA BASE##
Keyrt var psql -h pg.neon.tech til að tengjast Neon gagnagrunninum.
Staðfesting var framkvæmd með því að fylgja slóðinni sem birtist í tilkynningu.
Þegar tenging var staðfest birtist listi yfir gagnagrunna með \l, og neondb var valinn.
Nú er hægt að keyra SQL fyrirspurnir til að skoða og vinna með gögn í gagnagrunninum.
Hvað þetta gerir:

Með þessu er sett upp tenging við Neon PostgreSQL-gagnagrunn. Notkun psql gerir kleift að stjórna töflum, sækja gögn, bæta við nýjum gögnum og breyta þeim sem eru til staðar. Þannig er hægt að sjá hvað er í gagnagrunninum, prófa fyrirspurnir og undirbúa allt sem þarf fyrir þróunina.


### **1️. Undirbúningur**
Áður en þú byrjar, vertu viss um að þú sért með **Node.js**, **PostgreSQL** og **Prisma** uppsett á tölvunni þinni.

### **2. Afrita umhverfisbreytur**
Þú þarft að hafa `.env` skrána með réttum gagnagrunnstengingum.
Ef hún er ekki til staðar, búðu til hana með:
```bash
cp .env.example .env
```
Opnaðu síðan `.env` og settu inn rétt **DATABASE_URL**.

### **3. Setja upp og keyra gagnagrunninn**
Keyrðu eftirfarandi skipanir til að búa til Prisma Client, framkvæma migrations og setja gögn í gagnagrunninn:

```bash
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
```

Ef þú vilt skoða gögnin í gagnagrunninum skaltu nota Prisma Studio:
```bash
npx prisma studio
```
Þetta opnar Prisma Studio í vafranum, þar sem þú getur skoðað og breytt gögnum.

### **4. Keyra netþjóninn**
Til að ræsa Express netþjóninn skaltu keyra:
```bash
npm run dev
```
Þetta mun ræsa netþjóninn á `http://localhost:3000`.

### **5. Keyra framendann með Vite**
Núna skaltu keyra:
```bash
npm run dev
```
(`localhost:3000`).

### **6️⃣ Prófa API með Postman eða curl**
Þú getur prófað API með því að nota **Postman** eða keyra:
```bash
curl http://localhost:3000/items
```
Ef þetta skilar **200 OK**, þá er netþjónninn keyrandi.

### **7️⃣ Gagnlegar skipanir**
| Skipun | Lýsing |
|--------|---------|
| `npx prisma generate` | Býr til Prisma Client |
| `npx prisma migrate deploy` | Beitir öllum migration skrám á gagnagrunninn |
| `npx prisma db seed` | Setur inn prufugögn í gagnagrunninn |
| `npx prisma studio` | Opnar Prisma Studio til að skoða gagnagrunninn |
| `npm run dev` | Keyrir netþjóninn |

---

### **Tilbúið til notkunar!**
Ef þú lendir í vandræðum, athugaðu **error skilaboð** og passaðu að `.env` skráin sé rétt uppsett.

