# Intro React

Før vi begynner må vi starte med gjøre prosjektet klart.

## Gjør oss klare

### Installer pakkene som trengs

```
npm install
```

### Lag databasen

```
npx prisma migrate dev --name init
```

Du kan åpne databasen med følgende kommando

```
npx prisma studio
```

### Start REST-api serveren

```
npm run dev
```

## Bygg frontend

- [ ] Lag en hook for å fetche data
- [ ] Lag en hook for å gjøre post/put request
- [ ] Lag en blogg feed
- [ ] Lag en blogg side som man kan lese hele innholdet
- [ ] Lag et login/signup form
  - [ ] Login gjøres kun med email, ikke passord
  - [ ] Lage bruker er epost og navn
  - [ ] Style formet
  - [ ] Style avhengig av error eller success
  - [ ] Auto focus på errror
  - [ ] Auto åpne signup hvis man prøver å logge inn uten å ha bruker
- [ ] Lag et form for å lage nye blogg innlegg
  - [ ]
