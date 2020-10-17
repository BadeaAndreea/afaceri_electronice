# bdsa-product-catalog

# git clone

```bash
git clone https://github.com/csie-afacerielectronice/bdsa-product-catalog.git
```

```bash
cd bdsa-product-catalog
```

```bash
npm install
```

# install mysql

Pentru a configura serviciul mysql -> https://tutoriale.webtech-superheroes.net/configurare-mediu-de-lucru/mysql

# import baza de date

```sql
source ~/environment/bdsa-product-catalog/sql/catalog.sql
```

# import date

```sql
INSERT INTO categories (name, description) VALUES ('Carti','Cele mai tari carti');
```

```sql
INSERT INTO products (name, description, category_id, price) VALUES ('Clean Code', 'Make code great again!', 1, 100);
```

```sql
exit
```

# run server.js

```bash
node server.js
```

