Aplicatia Catalog Vacante consta intr-o platforma care permite userilor sa manipuleze sejururile si voucherele de reducere de care dispun. Acestia pot vizualiza informatiile din baza de date, pot filtra sejururile in functie de destinatie, sau aplica voucherele pe care si le doresc, vizualizand astfel pretul redus.
Din structura de ADMIN se pot adauga sejururi si vouchere noi, se pot modifica si chiar sterge cu ajutorul unui Form.


Mediul de lucru ales a fost Cloud9 oferit de Amazon Services, cu o baza de date mysql. Requesturile primite de la client sunt manipulate de server prin express js, cu operatii de GET, POST, PUT si DELETE. Acestea pot primi si un parametru (id, destinatie), care va face obiectul clauzei WHERE. Baza de date contine 3 tabele "sejururi", "vouchere" si "wishlist", relationate prin foreign keys. 

Pentru partea de frontend am folosit in consturirea elementelor html clase aferente librariilor de Bootstrap pe care le-am importat alaturi de jquery.

Ca imbunatatiri viitoare dorim adaugarea posibilitatii de a realiza un wishlist pentru fiecare utilizator si Log-in.


# catalog vacante

# git clone

```bash
git clone https://github.com/BadeaAndreea/afaceri_electronice.git
```

```bash
cd afaceri_electronice
```

```bash
npm install
```

# install mysql

Pentru a configura serviciul mysql -> https://tutoriale.webtech-superheroes.net/configurare-mediu-de-lucru/mysql

# import baza de date

```sql
source ~/environment/myApp/afaceri_electronice/sql/myApp.sql
```

# import date

```sql
INSERT INTO sejururis(titlu, destinatie, pret, durata, link) values('Vacanta Grecia','Mikonos',300,5,"link");

INSERT INTO voucheres(id_sejur, valoare, end_date, status) values(1, 15, str_to_date('21-12-2020','%d-%m-%Y'), 0);
```

```sql
exit
```

# run server.js

```bash
node server.js
```

