'use client'

import { useMemo, useState } from 'react'
import config from '../config.json'
import { ArrowUpRight, Check, Code2, Copy, ExternalLink, Hash, Menu, Palette, Play, Terminal, Video, X } from 'lucide-react'

type Tab = 'home' | 'links' | 'news' | 'config'

const themes = config.themes
const fonts = config.fonts
type ThemeKey = keyof typeof themes
type FontKey = keyof typeof fonts

function isThemeKey(value: string): value is ThemeKey {
  return value in themes
}

function isFontKey(value: string): value is FontKey {
  return value in fonts
}

export default function Page() {
  const [tab, setTab] = useState<Tab>('home')
  const [theme, setTheme] = useState<ThemeKey>(isThemeKey(config.appearance.defaultTheme) ? config.appearance.defaultTheme : 'green')
  const [font, setFont] = useState<FontKey>(isFontKey(config.appearance.defaultFont) ? config.appearance.defaultFont : 'mono')
  const [copied, setCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeTheme = themes[theme]
  const prompt = useMemo(() => `radzio@web:~$ ${tab === 'home' ? 'cat about.md' : tab === 'links' ? 'ls links/' : tab === 'news' ? 'tail -f news.log' : 'nano config.json'}`, [tab])

  function copyHandle() {
    navigator.clipboard?.writeText('radzio00')
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <main className="terminal-app" style={{ '--accent': activeTheme.accent, '--accent-dim': activeTheme.dim, '--font-family': fonts[font].family } as React.CSSProperties}>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#home" onClick={() => setTab('home')}><span className="brand-mark">&gt;_</span><span>r4dzioo<span className="muted">.pl</span></span></a>
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Główna nawigacja">
          {(['home', 'links', 'news', 'config'] as Tab[]).map((item) => <button key={item} className={tab === item ? 'nav-item active' : 'nav-item'} onClick={() => { setTab(item); setMenuOpen(false) }}><span className="nav-index">0{(['home', 'links', 'news', 'config'] as Tab[]).indexOf(item) + 1}</span>{item}</button>)}
        </nav>
        <button className="menu-button" aria-label="Otwórz menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        <div className="system-state"><i /> SYSTEM ONLINE</div>
      </header>

      <div className="shell">
        <div className="command-line"><span className="prompt-symbol">$</span><span>{prompt}</span><span className="cursor" /></div>
        {tab === 'home' && <Home onCopy={copyHandle} copied={copied} onLinks={() => setTab('links')} />}
        {tab === 'links' && <Links />}
        {tab === 'news' && <News />}
        {tab === 'config' && <Config theme={theme} setTheme={setTheme} font={font} setFont={setFont} />}
      </div>
      <footer className="footer"><span>© 2026 {config.profile.name}</span><span className="footer-center">built with <span className="heart">♥</span></span><span>v1.0.0 / {activeTheme.label}</span></footer>
    </main>
  )
}

function Home({ onCopy, copied, onLinks }: { onCopy: () => void; copied: boolean; onLinks: () => void }) {
  return <section className="home-view page-enter" id="home">
    <div className="hero-grid">
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse-dot" /> {config.profile.status} // {config.profile.location}</div>
        <h1>Hej, jestem<br /><span className="glow-text">{config.profile.name}</span><span className="blink">_</span></h1>
        <p className="hero-role">{config.profile.role}</p>
        <p className="hero-bio">{config.profile.bio}</p>
        <div className="hero-actions"><button className="primary-button" onClick={onLinks}><Play size={15} fill="currentColor" /> explore links <ArrowUpRight size={15} /></button><button className="ghost-button" onClick={onCopy}>{copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'copied!' : 'copy handle'}</button></div>
      </div>
      <div className="terminal-card hero-terminal"><div className="window-bar"><span className="window-title">~/radzio00/about.sh</span><span className="window-dots"><i /><i /><i /></span></div><div className="terminal-content"><div><span className="term-green">const</span> user = {'{'}</div><div className="indent"><span className="term-blue">name</span>: <span className="term-yellow">&quot;radzio00&quot;</span>,</div><div className="indent"><span className="term-blue">focus</span>: [<span className="term-yellow">&quot;Roblox&quot;</span>, <span className="term-yellow">&quot;dev&quot;</span>],</div><div className="indent"><span className="term-blue">coffee</span>: <span className="term-orange">true</span>,</div><div className="indent"><span className="term-blue">status</span>: <span className="term-yellow">&quot;creating...&quot;</span></div><div>{'}'};</div><br /><div className="term-comment">// always building something new</div><div><span className="term-green">await</span> <span className="term-blue">create</span>(<span className="term-yellow">&quot;the next idea&quot;</span>);<span className="cursor inline" /></div></div></div>
    </div>
    {config.appearance.showStats && <div className="stats-row">{config.stats.map((stat) => <div className="stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}<div className="stat stat-command"><Hash size={16} /><span>scroll to explore</span></div></div>}
    <div className="section-heading"><span>// quick access</span><span className="line" /></div>
    {config.appearance.showQuickLinks && <div className="quick-links">{config.links.slice(0, 3).map((link) => <a className="quick-link" href={link.url} target="_blank" rel="noreferrer" key={link.label}><span className="link-icon">{link.label === 'GitHub' ? <Code2 size={18} /> : link.label === 'YouTube' ? <Video size={18} /> : <Hash size={18} />}</span><span><b>{link.label}</b><small>{link.description}</small></span><ExternalLink size={15} /></a>)}</div>}
  </section>
}

function Links() { return <section className="content-view page-enter"><div className="view-heading"><span className="section-kicker">/links</span><h2>Połączmy się<span className="accent">.</span></h2><p>Wybierz kanał i dołącz do mojego małego zakątka internetu.</p></div><div className="links-list">{config.links.map((link, index) => <a className="link-row" href={link.url} target="_blank" rel="noreferrer" key={link.label}><span className="row-number">0{index + 1}</span><span className="row-main"><b>{link.label}</b><small>{link.description}</small></span><code>{link.command}</code><ArrowUpRight size={19} /></a>)}</div></section> }

function News() { return <section className="content-view page-enter"><div className="view-heading"><span className="section-kicker">/news.log</span><h2>Ostatnie aktualności<span className="accent">.</span></h2><p>Nowe rzeczy, eksperymenty i wiadomości prosto z terminala.</p></div><div className="news-list">{config.news.map((item) => <article className="news-card" key={item.date}><div className="news-meta"><span>{item.date}</span><span className="tag">[{item.tag}]</span></div><h3>{item.title}</h3><p>{item.body}</p><span className="news-prompt">radzio@web:~$ echo &quot;more soon&quot;</span></article>)}</div></section> }

function Config({ theme, setTheme, font, setFont }: { theme: ThemeKey; setTheme: (theme: ThemeKey) => void; font: FontKey; setFont: (font: FontKey) => void }) { return <section className="content-view page-enter"><div className="view-heading"><span className="section-kicker">/config.json</span><h2>Konfigurator<span className="accent">.</span></h2><p>Edytuj config.json, aby zmienić dane, linki, aktualności, motyw i ustawienia widoku.</p></div><div className="config-grid"><div className="config-panel"><div className="panel-title"><Palette size={16} /> accent_theme</div><div className="theme-options">{(Object.keys(themes) as ThemeKey[]).map((key) => <button className={theme === key ? 'theme-option selected' : 'theme-option'} onClick={() => setTheme(key)} key={key}><i style={{ background: themes[key].accent }} />{themes[key].label}{theme === key && <Check size={14} />}</button>)}</div></div><div className="config-panel"><div className="panel-title"><Terminal size={16} /> font_family</div><div className="theme-options">{(Object.keys(fonts) as FontKey[]).map((key) => <button className={font === key ? 'theme-option selected' : 'theme-option'} onClick={() => setFont(key)} key={key}><i className="font-swatch" style={{ fontFamily: fonts[key].family }}>Aa</i>{fonts[key].label}{font === key && <Check size={14} />}</button>)}</div></div></div></section> }
