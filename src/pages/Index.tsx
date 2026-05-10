import { useState, useEffect, useRef } from 'react';

const IMG_CORNER   = 'https://cdn.poehali.dev/projects/1ef3fdcb-f305-4032-9b6b-7eb16be02ed4/files/6d59e4fb-217e-4c8c-b02c-964615c100b2.jpg';
const IMG_HOUSE    = 'https://cdn.poehali.dev/projects/1ef3fdcb-f305-4032-9b6b-7eb16be02ed4/files/72a41068-8dae-4f58-ac4c-17cbca37bef6.jpg';
const IMG_DEER     = 'https://cdn.poehali.dev/projects/1ef3fdcb-f305-4032-9b6b-7eb16be02ed4/files/469e1ca2-d50c-458e-bdb7-a4b47673f9f8.jpg';
const IMG_FOREST   = 'https://cdn.poehali.dev/projects/1ef3fdcb-f305-4032-9b6b-7eb16be02ed4/files/48026b69-4639-49c4-bcb9-e8b500367ee3.jpg';
const IMG_ORNAMENT = 'https://cdn.poehali.dev/projects/1ef3fdcb-f305-4032-9b6b-7eb16be02ed4/files/d8be9226-8e58-4641-834c-2ff3f373759e.jpg';
const COUPLE_PHOTO = 'https://cdn.poehali.dev/projects/1ef3fdcb-f305-4032-9b6b-7eb16be02ed4/bucket/d1ece0a1-6c03-4bef-ac9a-48ce33878333.png';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Rule() {
  return <div className="rule-thick" />;
}
function RuleThin() {
  return <div className="rule-thin" />;
}

function Ornament({ label }: { label?: string }) {
  return (
    <div className="ornament text-sm my-2">
      {label || '❧'}
    </div>
  );
}

export default function Index() {
  const [attend, setAttend] = useState<'yes' | 'no'>('yes');
  const [form, setForm] = useState({ name: '', guests: '', wishes: '' });
  const [sent, setSent] = useState(false);

  const refMain  = useReveal();
  const refNames = useReveal();
  const refForm  = useReveal();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="paper-texture min-h-screen relative overflow-x-hidden">

      {/* ── BOTANICAL CORNERS fixed ── */}
      <img src={IMG_CORNER} alt="" className="corner-leaf tl" />
      <img src={IMG_CORNER} alt="" className="corner-leaf tr" />
      <img src={IMG_CORNER} alt="" className="corner-leaf bl" />
      <img src={IMG_CORNER} alt="" className="corner-leaf br" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-6">

        {/* ══ NAV ══ */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-4 fade-in">
          {[
            { label: 'Главная',      id: 'top' },
            { label: 'Наша история', id: 'story' },
            { label: 'Детали',       id: 'details' },
            { label: 'Анкета гостя', id: 'rsvp' },
            { label: 'Пожелания',    id: 'rsvp' },
          ].map(n => (
            <button key={n.label} onClick={() => scrollTo(n.id)} className="nav-link">
              {n.label}
            </button>
          ))}
        </nav>

        {/* ══ MASTHEAD ══ */}
        <header id="top" className="text-center">
          <Rule />
          <h1 className="mega-title py-3 fade-in">Приглашение</h1>
          <div
            className="fade-in-d1 flex items-center justify-center gap-3 mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'var(--ink-mid)', fontSize: '1.1rem' }}
          >
            <span className="rule-thin" style={{ flex: 1, display: 'inline-block', height: 1, background: 'var(--ink-mid)' }} />
            на нашу свадьбу
            <span className="rule-thin" style={{ flex: 1, display: 'inline-block', height: 1, background: 'var(--ink-mid)' }} />
          </div>
          <Rule />
          <RuleThin />
          <div className="fade-in-d2 flex items-center justify-between py-2 gap-2 flex-wrap px-1">
            <span className="font-type text-xs" style={{ color: 'var(--ink-soft)', letterSpacing: '0.14em' }}>ВЫПУСК №1</span>
            <span className="font-type text-xs hidden sm:inline" style={{ color: 'var(--ink-soft)', letterSpacing: '0.1em' }}>✦ СОЗДАЁМ НАШУ ВЕЧНУЮ ИСТОРИЮ ✦</span>
            <span className="font-type text-xs" style={{ color: 'var(--ink-soft)', letterSpacing: '0.14em' }}>21 ИЮЛЯ 2026 ГОДА</span>
          </div>
          <RuleThin />
          <Rule />
        </header>

        {/* ══ 3-COLUMN MAIN BLOCK ══ */}
        <div ref={refMain} id="story" className="reveal mt-1 border border-[var(--border-color)]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr_1fr]">

            {/* LEFT */}
            <div className="p-5 border-b md:border-b-0 md:border-r border-[var(--border-color)] flex flex-col gap-4">
              <div>
                <h3 className="font-headline text-xs tracking-widest text-center mb-2" style={{ color: 'var(--ink)' }}>
                  ДОРОГИЕ ДРУЗЬЯ!
                </h3>
                <RuleThin />
                <p className="font-serif text-base leading-relaxed text-center mt-2" style={{ color: 'var(--ink-soft)' }}>
                  Мы очень хотим разделить с вами один из самых важных дней в нашей жизни — день нашей свадьбы! Приглашаем вас стать частью нашей истории любви.
                </p>
                <div className="flex justify-center mt-3">
                  <img src={IMG_ORNAMENT} alt="" className="h-8 opacity-60" style={{ mixBlendMode: 'multiply' }} />
                </div>
              </div>

              <RuleThin />

              {/* Date */}
              <div className="text-center">
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(3.5rem,9vw,5rem)', lineHeight: 1, color: 'var(--ink)' }}>21</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 'clamp(1.4rem,4vw,2rem)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)' }}>ИЮЛЯ</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(3rem,8vw,4rem)', lineHeight: 1, color: 'var(--ink)' }}>2026</div>
              </div>

              <RuleThin />

              {/* Deer */}
              <img
                src={IMG_DEER}
                alt="олень"
                className="w-full opacity-80"
                style={{ mixBlendMode: 'multiply', filter: 'sepia(0.2) contrast(1.1)' }}
              />
            </div>

            {/* CENTER — photo */}
            <div id="details" className="p-3 border-b md:border-b-0 md:border-r border-[var(--border-color)] flex flex-col items-center">
              <div className="photo-frame w-full overflow-hidden" style={{ maxHeight: 480 }}>
                <img
                  src={COUPLE_PHOTO}
                  alt="Кристина и Виталий"
                  className="w-full h-full object-cover object-top"
                  style={{ aspectRatio: '3/4' }}
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="p-5 flex flex-col gap-4">
              <div>
                <h3 className="font-headline text-xs tracking-widest text-center mb-2" style={{ color: 'var(--ink)' }}>
                  МЕСТО ПРОВЕДЕНИЯ
                </h3>
                <RuleThin />
                <img
                  src={IMG_HOUSE}
                  alt="La Villa"
                  className="w-full mt-2 opacity-85"
                  style={{ mixBlendMode: 'multiply', filter: 'sepia(0.35) contrast(1.1)' }}
                />
                <p className="font-headline text-sm text-center tracking-widest mt-2" style={{ color: 'var(--ink)' }}>
                  LaVilla House
                </p>
                <RuleThin />
                <p className="font-serif text-sm text-center leading-snug mt-2" style={{ color: 'var(--ink-soft)' }}>
                  Речкуновская Зона Отдыха м-н,<br />
                  Бердск, Новосибирская область
                </p>
              </div>

              <RuleThin />

              <img
                src={IMG_FOREST}
                alt=""
                className="w-full opacity-65"
                style={{ mixBlendMode: 'multiply', filter: 'sepia(0.25) contrast(1.1)' }}
              />

              <RuleThin />

              <p className="font-headline text-sm text-center tracking-widest leading-snug" style={{ color: 'var(--ink)' }}>
                МЫ БУДЕМ РАДЫ<br />ВИДЕТЬ ВАС!
              </p>
            </div>
          </div>
        </div>

        {/* ══ NAMES BLOCK ══ */}
        <div ref={refNames} className="reveal border-x border-b border-[var(--border-color)] py-7 px-4 text-center">
          <div className="names-title">Кристина &amp; Виталий</div>

          <div className="flex items-center justify-center gap-3 my-2">
            <span style={{ flex: 1, height: 1, background: 'var(--border-color)', maxWidth: 120, display: 'block' }} />
            <span style={{ color: 'var(--ink)', fontSize: '1.1rem' }}>♥</span>
            <span style={{ flex: 1, height: 1, background: 'var(--border-color)', maxWidth: 120, display: 'block' }} />
          </div>

          <Ornament label="НАШ ДЕНЬ" />

          <p className="font-serif text-base md:text-lg leading-relaxed max-w-xl mx-auto mt-4" style={{ color: 'var(--ink-soft)' }}>
            Мы верим, что любовь — это не только чувство, но и выбор. И мы выбрали друг друга. Этот день станет началом нашей новой, удивительной главы, и мы хотим, чтобы вы были рядом, чтобы разделить с нами радость, смех и самые тёплые моменты.
          </p>
        </div>

        {/* ══ RSVP ══ */}
        <div id="rsvp" ref={refForm} className="reveal mt-6">
          <div className="form-section p-6 md:p-10">
            <div className="text-center mb-6">
              <Ornament />
              <h2 className="font-headline text-xl md:text-2xl tracking-widest mb-2" style={{ color: 'var(--ink)' }}>
                АНКЕТА ГОСТЯ
              </h2>
              <p className="font-serif text-base" style={{ color: 'var(--ink-soft)' }}>
                Пожалуйста, подтвердите своё присутствие на нашей свадьбе
              </p>
            </div>

            {sent ? (
              <div className="text-center py-10">
                <p className="font-headline text-2xl mb-3" style={{ color: 'var(--forest)' }}>Спасибо!</p>
                <p className="font-serif text-lg" style={{ color: 'var(--ink-soft)' }}>
                  Ваш ответ принят. С нетерпением ждём встречи 21 июля!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
                <div>
                  <p className="field-label text-center mb-3">Вы планируете присутствовать?</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <label className="radio-opt">
                      <input type="radio" name="attend" value="yes" checked={attend === 'yes'} onChange={() => setAttend('yes')} />
                      Да, с удовольствием!
                    </label>
                    <label className="radio-opt">
                      <input type="radio" name="attend" value="no" checked={attend === 'no'} onChange={() => setAttend('no')} />
                      К сожалению, не смогу(
                    </label>
                  </div>
                </div>

                <RuleThin />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="field-label">Ваше имя</label>
                    <input
                      type="text"
                      required
                      placeholder="Введите ваше имя"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="field-input"
                    />
                  </div>
                  <div>
                    <label className="field-label">Количество гостей (включая вас)</label>
                    <input
                      type="text"
                      placeholder="Укажите количество"
                      value={form.guests}
                      onChange={e => setForm({ ...form, guests: e.target.value })}
                      className="field-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label">Пожелания нам</label>
                  <textarea
                    rows={4}
                    placeholder="Ваши тёплые слова..."
                    value={form.wishes}
                    onChange={e => setForm({ ...form, wishes: e.target.value })}
                    className="field-input resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="submit-btn">Отправить ответ</button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ══ FOOTER ══ */}
        <footer className="text-center py-8">
          <Ornament />
          <p className="quote-text px-4">
            «Настоящая любовь — как лес: она вечна, глубока и полна чудес»
          </p>
          <Ornament />
          <RuleThin />
          <p className="font-type text-xs mt-3" style={{ color: 'var(--ink-mid)', letterSpacing: '0.15em' }}>
            21 · 07 · 2026 &nbsp;✦&nbsp; КРИСТИНА И ВИТАЛИЙ
          </p>
        </footer>

      </div>
    </div>
  );
}
