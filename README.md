# r4dzioo.pl — Personal Landing Page

Nowoczesna, minimalistyczna strona osobista zbudowana w **Next.js 14 + TypeScript + Tailwind CSS**.  
Wszystkie dane konfiguracyjne znajdują się w jednym pliku: **`config.json`**.

---

## 🚀 Szybki start

### Wymagania
- Node.js 18.17+ 
- npm lub yarn

### Instalacja

```bash
# 1. Sklonuj lub pobierz projekt
git clone https://github.com/twoje-repo/r4dzioo-site.git
cd r4dzioo-site

# 2. Zainstaluj zależności
npm install

# 3. Uruchom lokalnie
npm run dev
```

Strona będzie dostępna pod adresem **http://localhost:3000**

---

## ⚙️ Konfiguracja

> **Całą zawartość strony zmieniasz TYLKO w pliku `config.json`.**  
> Nie musisz dotykać żadnego innego pliku!

### Jak zmienić podstawowe dane

Otwórz `config.json` i edytuj sekcję `site`:

```json
"site": {
  "name": "Twój Nick",
  "username": "@twoj_nick",
  "description": "Twój opis",
  "avatar": "/avatar.png"
}
```

---

### 🖼️ Jak zmienić avatar

1. Wrzuć swoje zdjęcie do folderu `/public/` (np. `avatar.png`)
2. W `config.json` ustaw ścieżkę:

```json
"site": {
  "avatar": "/avatar.png"
}
```

Obsługiwane formaty: PNG, JPG, WEBP, SVG

---

### 🎮 Jak zmienić adres serwera Minecraft

```json
"minecraft": {
  "enabled": true,
  "serverName": "Nazwa Serwera",
  "address": "mc.twoja-domena.pl",
  "port": 25565,
  "description": "Opis serwera"
}
```

Aby **wyłączyć** sekcję Minecraft:
```json
"minecraft": {
  "enabled": false
}
```

---

### 💬 Jak zmienić Discord

```json
"socials": {
  "discord": {
    "enabled": true,
    "name": "Discord",
    "username": "twoj_nick",
    "url": "https://discord.gg/twoj-serwer",
    "description": "Dołącz do serwera"
  }
}
```

Aby wyłączyć kartę Discord: ustaw `"enabled": false`

---

### 📺 Jak zmienić YouTube

```json
"socials": {
  "youtube": {
    "enabled": true,
    "name": "YouTube",
    "url": "https://youtube.com/@twoj_kanal",
    "description": "Subskrybuj kanał"
  }
}
```

---

### ➕ Jak dodać nową platformę social media

Dopisz nowy obiekt do sekcji `socials` w `config.json`:

```json
"socials": {
  "twitch": {
    "enabled": true,
    "name": "Twitch",
    "url": "https://twitch.tv/twoj_nick",
    "username": "twoj_nick",
    "description": "Oglądaj streamy live"
  }
}
```

Obsługiwane ikony: `discord`, `youtube`, `github`, `tiktok`, `instagram`, `twitch`, `twitter`

---

### 🎨 Jak zmienić kolory

Zmień kolor akcentu (fioletowy domyślnie) w `config.json`:

```json
"appearance": {
  "accentColor": "#8b5cf6",
  "accentColorHex": "139, 92, 246"
}
```

> **Ważne:** `accentColorHex` to ten sam kolor, ale w formacie `R, G, B` (bez `#`).  
> Możesz użyć dowolnego konwertera hex → rgb, np. https://www.rapidtables.com/convert/color/hex-to-rgb.html

Przykładowe kolory:
- Fioletowy: `"#8b5cf6"` → `"139, 92, 246"`
- Niebieski: `"#3b82f6"` → `"59, 130, 246"`
- Zielony: `"#22c55e"` → `"34, 197, 94"`
- Różowy: `"#ec4899"` → `"236, 72, 153"`

---

### 🔍 Jak zmienić SEO (tytuł, opis, OG)

```json
"seo": {
  "title": "Twój Nick — Official Website",
  "description": "Twój opis dla wyszukiwarek",
  "image": "/og.png",
  "url": "https://twoja-domena.pl"
}
```

Dla Open Graph (podgląd przy udostępnianiu linku) wrzuć plik `og.png` do folderu `/public/` w rozmiarze **1200×630 px**.

---

### 📋 Jak dodać / usunąć link ze sekcji "Linki"

```json
"links": [
  {
    "title": "Nazwa linku",
    "description": "Krótki opis",
    "url": "https://twoj-link.com",
    "icon": "link",
    "enabled": true
  }
]
```

Ustaw `"enabled": false`, żeby ukryć link bez usuwania go z pliku.

---

## 🌐 Wdrożenie na Vercel

### Metoda 1: GitHub + Vercel (zalecana)

1. Wrzuć projekt na GitHub (repozytorium może być prywatne)
2. Wejdź na https://vercel.com i zaloguj się
3. Kliknij **"New Project"**
4. Zaimportuj swoje repozytorium
5. Vercel automatycznie wykryje Next.js
6. Kliknij **"Deploy"**

Każdy push na `main` automatycznie aktualizuje stronę.

### Metoda 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Własna domena

W panelu Vercel → Project Settings → Domains → dodaj `r4dzioo.pl` i ustaw rekordy DNS zgodnie z instrukcją Vercela.

---

## 📁 Struktura projektu

```
r4dzioo-site/
├── app/
│   ├── layout.tsx          # Metadane SEO, globalne style
│   ├── page.tsx            # Główna strona
│   └── globals.css         # Style globalne, CSS variables
├── components/
│   ├── Hero.tsx            # Sekcja hero (avatar, imię, przyciski)
│   ├── SocialLinks.tsx     # Karty social media
│   ├── MinecraftServer.tsx # Sekcja serwera Minecraft
│   ├── LinkCards.tsx       # Lista linków
│   ├── GridBackground.tsx  # Tło z siatką
│   └── Footer.tsx          # Stopka
├── lib/
│   └── config.ts           # Ładowanie i walidacja config.json
├── types/
│   └── config.ts           # TypeScript typy
├── public/
│   ├── avatar.png          # Twoje zdjęcie/avatar
│   ├── og.png              # Obraz Open Graph
│   └── favicon.ico         # Favicon
├── config.json             # ← GŁÓWNA KONFIGURACJA
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🐛 Rozwiązywanie problemów

**Avatar się nie wyświetla**
- Upewnij się, że plik jest w folderze `/public/`
- Sprawdź, czy ścieżka w `config.json` zaczyna się od `/`

**Status Minecrafta nie działa**
- Strona korzysta z API `mcsrvstat.us` — musi być dostępne publicznie
- Jeśli serwer jest offline, zostanie to poprawnie wyświetlone

**Błąd walidacji config.json**
- Sprawdź składnię JSON (np. na https://jsonlint.com)
- Upewnij się, że wymagane pola (`site.name`, `seo.title`) są wypełnione
