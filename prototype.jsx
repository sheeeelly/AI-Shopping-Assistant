/* Clickable prototype layer — reuses existing components, adds state */

/* AI answer view inside the panel (shown after clicking a suggested prompt) */
const AiAnswerView = ({ question, context, onBack }) => {
  const homeProducts = PRODUCTS.slice(0, 3);
  const pdpReply = "This dress runs true to size — the stretch satin gives a forgiving fit through the bodice, and the strapless silhouette suits A-, B-, and C-cups well. For a formal wedding, the floor length and mermaid line read elegant without being too occasion-specific. If you're worried about staying-power for dancing, our reviewers note the convertible straps add useful support.";
  const homeReply = "Got it — I pulled three dusty-blue bridesmaid styles under $120 that work for a beach wedding. Light fabrics, easy to move in, all available in petite sizing.";

  return (
    <>
      <div className="msg user">
        <div className="msg-bubble">{question}</div>
      </div>
      <div className="msg ai">
        <div className="msg-bubble">
          {context === 'pdp' ? pdpReply : homeReply}
        </div>
      </div>
      {context !== 'pdp' && (
        <div>
          <div className="ap-section-label">
            <span>Recommended · {homeProducts.length}</span>
            <span style={{textTransform:'none', letterSpacing:0, fontFamily:'var(--sans)', color:'var(--mute)'}}>Sorted by match</span>
          </div>
          <div className="recs">
            {homeProducts.map((p, i) => (
              <div key={p.id} className="rec-card">
                <div className={`rec-img ${['', 'alt-1', 'alt-2'][i]}`}>
                  <div className="rec-img-tag">[ {p.color.toUpperCase()} ]</div>
                </div>
                <div className="rec-meta">
                  <div className="rec-name">{p.name}</div>
                  <div className="rec-price">${p.price}{p.was && <s>${p.was}</s>}</div>
                  <div className="rec-attrs">
                    <span className="rec-attr">{p.fabric}</span>
                    <span className="rec-attr">{p.silhouette}</span>
                  </div>
                  <div className="rec-deliv">↗ {p.delivery}</div>
                  <div className="rec-cta-row">
                    <button className="rcta-primary">View product</button>
                    <button className="rcta-second">+ Compare</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <button onClick={onBack} style={{
        background:'transparent', border:'1px solid var(--line-2)',
        padding:'10px 14px', fontSize:11, letterSpacing:'0.16em',
        textTransform:'uppercase', cursor:'pointer', fontFamily:'var(--sans)',
        color:'var(--ink)', alignSelf:'flex-start',
      }}>← Ask another question</button>
    </>
  );
};

/* Interactive panel: shows prompts → swaps to answer view on click */
const InteractivePanel = ({ context = 'home', onClose }) => {
  const [asked, setAsked] = React.useState(null);

  const homePrompts = [
    'Help me find a bridesmaid dress under $120',
    'What should I wear to a beach wedding?',
    'Show me mother-of-the-bride dresses',
    'I need a formal dress for petite size',
    'Compare these two styles',
  ];
  const pdpPrompts = [
    'Is this dress good for a formal wedding?',
    'What body types does this silhouette suit?',
    'Is this fabric comfortable?',
    'Compare this dress with similar styles',
    'Is this a good option for mother of the bride?',
  ];
  const prompts = context === 'pdp' ? pdpPrompts : homePrompts;

  return (
    <div className="assistant-panel">
      <div className="ap-header">
        <div className="ap-header-row">
          <div className="ap-title-wrap">
            <div className="ap-mono-mark">M</div>
            <div className="ap-title">AI Shopping Assistant</div>
          </div>
          <div className="ap-header-actions">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="18" height="18"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1 .7-1.5 1.3-1.5 2.5"/><circle cx="12" cy="17" r=".7" fill="currentColor"/></svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="18" height="18" onClick={onClose} style={{cursor:'pointer'}}><path d="M6 6l12 12M18 6 6 18"/></svg>
          </div>
        </div>
      </div>
      <div className="ap-body">
        {!asked ? (
          <>
            <div style={{
              background:'linear-gradient(180deg, oklch(0.97 0.02 240), #fff)',
              border:'1px solid oklch(0.92 0.03 240)',
              padding:'20px 18px',
            }}>
              <div style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--ai-deep)', marginBottom:8}}>Welcome</div>
              <div style={{fontFamily:'var(--serif)', fontSize:22, letterSpacing:'0.01em', marginBottom:8, lineHeight:1.2}}>
                Hi, I'm your <em style={{color:'var(--ai-deep)'}}>shopping assistant.</em>
              </div>
              <div style={{fontSize:13, color:'var(--mute)', lineHeight:1.5}}>
                {context === 'pdp'
                  ? 'Ask me anything about this dress — fit, fabric, occasion, or how it compares to similar styles.'
                  : 'I can help you find the right dress, narrow down options, compare products, and answer shopping questions.'}
              </div>
            </div>
            <div>
              <div className="ap-section-label"><span>Try a prompt</span></div>
              <div style={{display:'flex', flexDirection:'column', gap:8}}>
                {prompts.map((p, i) => (
                  <div key={i} onClick={() => setAsked(p)} style={{
                    border:'1px solid var(--line)',
                    padding:'12px 14px',
                    background:'#fff',
                    fontSize:13,
                    cursor:'pointer',
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    gap:10,
                  }}>
                    <span style={{display:'inline-flex', alignItems:'center', gap:10}}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="oklch(0.42 0.06 240)" strokeWidth="1.6" style={{flexShrink:0}}>
                        <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z"/>
                      </svg>
                      {p}
                    </span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--mute-2)" strokeWidth="1.4">
                      <path d="M5 12h14m-6-6 6 6-6 6"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <AiAnswerView question={asked} context={context} onBack={() => setAsked(null)}/>
        )}
      </div>
      <div className="composer">
        <textarea placeholder={context === 'pdp' ? "Ask about this dress..." : "Describe what you're looking for..."} rows={1} defaultValue=""/>
        <div className="composer-row">
          <div className="composer-tools">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="5" width="18" height="14" rx="1"/><circle cx="9" cy="11" r="2"/></svg>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 4v12m-5-5 5 5 5-5"/></svg>
          </div>
          <button className="composer-send">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ───────── PROTOTYPE SCREENS ───────── */
const HomePrototype = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="frame" data-screen-label="Home prototype" style={{minHeight: 1100}}>
      <div onClick={() => setOpen(false)}>
        <SiteChrome/>
        <HeroRow/>
        <div onClick={(e) => { e.stopPropagation(); setOpen(true); }} style={{cursor:'pointer'}}>
          <CompactHomeEntry/>
        </div>
        <ColorStrip/>
      </div>
      {open && (
        <>
          <div className="dim" onClick={() => setOpen(false)}/>
          <InteractivePanel context="home" onClose={() => setOpen(false)}/>
        </>
      )}
    </div>
  );
};

const PdpPrototype = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="frame" data-screen-label="PDP prototype" style={{minHeight: 1080}}>
      <PDP/>
      <div onClick={() => setOpen(true)} style={{cursor:'pointer'}}>
        <PDPFloatingAI pulse={!open}/>
      </div>
      {open && (
        <>
          <div className="dim" onClick={() => setOpen(false)}/>
          <InteractivePanel context="pdp" onClose={() => setOpen(false)}/>
        </>
      )}
    </div>
  );
};

const PrototypeApp = () => {
  const [tab, setTab] = React.useState('home');
  return (
    <div style={{background:'#f0eee9', minHeight:'100vh', fontFamily:'var(--sans)'}}>
      <div style={{
        position:'sticky', top:0, zIndex:200,
        background:'#fff', borderBottom:'1px solid var(--line)',
        padding:'14px 24px',
        display:'flex', alignItems:'center', gap:20,
      }}>
        <div style={{fontFamily:'var(--serif)', fontSize:20, letterSpacing:'0.04em'}}>
          MAISON · <em style={{color:'var(--ai-deep)'}}>clickable prototype</em>
        </div>
        <div style={{display:'flex', gap:8, marginLeft:'auto'}}>
          {[['home','Homepage entry'], ['pdp','PDP entry']].map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              background: tab === k ? 'var(--ink)' : 'transparent',
              color: tab === k ? '#fff' : 'var(--ink)',
              border: '1px solid var(--ink)',
              padding:'9px 16px',
              fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase',
              fontFamily:'var(--sans)', cursor:'pointer',
            }}>{label}</button>
          ))}
        </div>
      </div>
      <div style={{display:'flex', justifyContent:'center', padding:'24px 0 60px'}}>
        {tab === 'home' ? <HomePrototype/> : <PdpPrototype/>}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<PrototypeApp/>);
