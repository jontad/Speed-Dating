# Gruppen GAJJS
Projeketarbete i kursen Systemdesign med ett användareperspektiv (1MD034) vår 2020, Uppsala universitet.

## Komma igång
För kunna testa hemsidan behöver Javascriptmotor Node JS vara installerat. För att installera följ steget nedan.
1. Installera [Node JS](https://nodejs.org)
2. Navigera till rätt katalog med kommandotolk.
3. Skriv `npm install` och vänta tills alla nödvändiga filer har installerats. (Det är bara ignorera om npm ger varningen "No repository field" i slutet)
4. Starta servern genom att skriva `node app.js`
5. Använd valfri webbläsaren och surfa till `localhost:3000`. Där kommer man till startsidan.
6. För att ansluta från en annan dator kan man ansluta via `server IP:3000`.
(Det kan hända att man behöver ändra inställning i brandväggen i vissa datorer.

## Deltagare
Deltagaren börja med att skapa konto genom att välja `Skapa konto`. När man har skapat en profil då kan man logga in genom att välja `Logga in -> användaren`. När man har loggat in kommer man till sin profil.

## Arrangörer
Arrangörer kan logga in genom att välja `Logga in -> Admin`. I denna prototyp finns inget Admin-konto, och det räcker med att trycka `Logga in`. Man kommer då till arrangörsidan.

Där kan arrangören se inloggade användare, matcha användare manuellt och automatiskt och starta träffar i valfri längd, angett i minuter. 

## Katalogstruktur
<pre>
 ├── README.md
 ├── app.js
 ├── public
 │   ├── css
 │   │   ├── css filer
 │   ├── img
 │   │   └── Bilder
 │   └── js
 │       ├── Javascript filer
 │   
 └── views
     ├── HTML filer
     
</pre>
## Medlemmar
- Andreas Harju Schnee
- Gholam Mohammadi
- Johan Lövgren
- Jonathan Tadese
- Simon Pettersson
