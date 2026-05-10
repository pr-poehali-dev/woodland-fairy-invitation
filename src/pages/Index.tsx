import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = "https://cdn.poehali.dev/projects/1ef3fdcb-f305-4032-9b6b-7eb16be02ed4/files/7d6e5e27-6eff-48fd-9684-cf9a17dcd470.jpg";

const NAV_LINKS = [
  { label: 'О нас', href: '#about' },
  { label: 'Программа', href: '#schedule' },
  { label: 'Место', href: '#venue' },
  { label: 'RSVP', href: '#rsvp' },
];

const SCHEDULE = [
  { time: '15:00', title: 'Сбор гостей', desc: 'Встреча у главного входа, приветственные напитки' },
  { time: '16:00', title: 'Церемония', desc: 'Торжественная регистрация брака в лесном павильоне' },
  { time: '17:30', title: 'Фуршет', desc: 'Лёгкие закуски и фотосессия в саду' },
  { time: '19:00', title: 'Торжественный ужин', desc: 'Банкет, поздравления и первый танец' },
  { time: '21:00', title: 'Вечеринка', desc: 'Живая музыка и танцы под звёздным небом' },
  { time: '00:00', title: 'Фейерверк', desc: 'Праздничный салют в полночь' },
];

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return inView;
}

function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <section id={id} ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </section>
  );
}

function Ornament() {
  return (
    <div className="flex items-center gap-3 justify-center my-6">
      <div className="gold-line flex-1 max-w-24" />
      <span style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>✦</span>
      <span style={{ color: 'var(--gold)', fontSize: '0.55rem', opacity: 0.7 }}>✦</span>
      <span style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>✦</span>
      <div className="gold-line flex-1 max-w-24" />
    </div>
  );
}

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: '', guests: '1', attend: 'yes', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--forest)', color: 'var(--cream)' }}>

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
        style={{
          background: scrolled ? 'rgba(22,38,24,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none'
        }}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="font-['Cormorant_Garamond'] text-lg tracking-widest" style={{ color: 'var(--gold)' }}>
            А&nbsp;&nbsp;✦&nbsp;&nbsp;Е
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
            ))}
          </div>
          <a
            href="#rsvp"
            className="hidden md:block text-xs tracking-widest uppercase px-5 py-2 transition-all duration-300"
            style={{ border: '1px solid var(--gold)', color: 'var(--gold)', fontFamily: 'Golos Text' }}
            onMouseEnter={e => { const el = e.target as HTMLElement; el.style.background = 'var(--gold)'; el.style.color = 'var(--forest)'; }}
            onMouseLeave={e => { const el = e.target as HTMLElement; el.style.background = 'transparent'; el.style.color = 'var(--gold)'; }}>
            Подтвердить
          </a>
        </div>
      </nav>

      {/* HERO */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Лесная свадьба" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(22,38,24,0.55) 0%, rgba(22,38,24,0.7) 60%, var(--forest) 100%)' }} />
        </div>

        <div className="absolute top-32 left-16 text-4xl animate-float opacity-20" style={{ animationDelay: '0s' }}>🍃</div>
        <div className="absolute top-48 right-20 text-3xl animate-float opacity-15" style={{ animationDelay: '2s' }}>🌿</div>
        <div className="absolute bottom-48 left-24 text-2xl animate-float opacity-20" style={{ animationDelay: '4s' }}>🍂</div>
        <div className="absolute bottom-64 right-16 text-3xl animate-float opacity-15" style={{ animationDelay: '1s' }}>🌿</div>

        <div className="relative z-10 text-center px-6 animate-fade-up">
          <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: 'var(--gold)', fontFamily: 'Golos Text' }}>
            приглашение на свадьбу
          </p>
          <h1 className="font-['Cormorant_Garamond'] font-light leading-none mb-4" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', color: 'var(--cream)' }}>
            Александр<br />
            <span className="italic" style={{ color: 'var(--gold)', fontSize: '0.7em' }}>&</span><br />
            Елизавета
          </h1>
          <Ornament />
          <p className="font-['Cormorant_Garamond'] text-xl italic mb-2" style={{ color: 'var(--gold-light)' }}>
            14 июня 2025 года
          </p>
          <p className="text-sm tracking-widest opacity-70" style={{ fontFamily: 'Golos Text' }}>
            Усадьба «Лесной двор» · Подмосковье
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#about"
              className="px-8 py-3 font-['Golos_Text'] text-sm tracking-widest uppercase transition-all duration-300"
              style={{ background: 'var(--gold)', color: 'var(--forest)' }}
              onMouseEnter={e => (e.target as HTMLElement).style.background = 'var(--gold-light)'}
              onMouseLeave={e => (e.target as HTMLElement).style.background = 'var(--gold)'}>
              Узнать подробнее
            </a>
            <a
              href="#rsvp"
              className="px-8 py-3 font-['Golos_Text'] text-sm tracking-widest uppercase transition-all duration-300"
              style={{ border: '1px solid rgba(201,168,76,0.5)', color: 'var(--gold)' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = 'var(--gold)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'rgba(201,168,76,0.5)'; }}>
              Подтвердить участие
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12" style={{ background: 'linear-gradient(180deg, transparent, var(--gold))' }} />
          <Icon name="ChevronDown" size={14} style={{ color: 'var(--gold)' }} />
        </div>
      </div>

      {/* ABOUT */}
      <Section id="about" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)', fontFamily: 'Golos Text' }}>О событии</p>
          <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-5xl mb-6" style={{ color: 'var(--cream)' }}>
            Наша лесная сказка
          </h2>
          <Ornament />
          <p className="font-['Cormorant_Garamond'] text-lg md:text-xl italic leading-relaxed mb-8" style={{ color: 'var(--gold-light)' }}>
            «Мы нашли друг друга среди звёзд и решили отпраздновать это среди деревьев»
          </p>
          <p className="leading-relaxed opacity-80 mb-6 text-base" style={{ fontFamily: 'Golos Text', color: 'var(--cream)' }}>
            Мы рады пригласить вас разделить с нами один из самых важных дней в нашей жизни. Торжество пройдёт в окружении вековых сосен и лесных цветов, в атмосфере тепла, любви и волшебства.
          </p>
          <p className="leading-relaxed opacity-80 text-base" style={{ fontFamily: 'Golos Text', color: 'var(--cream)' }}>
            Ваше присутствие станет для нас лучшим подарком. Мы ждём вас, чтобы вместе начать эту новую главу.
          </p>

          <div className="grid grid-cols-3 gap-8 mt-14">
            {[
              { icon: 'Calendar', label: 'Дата', value: '14 июня 2025' },
              { icon: 'Clock', label: 'Начало', value: '15:00' },
              { icon: 'MapPin', label: 'Место', value: 'Усадьба «Лесной двор»' },
            ].map(item => (
              <div key={item.label} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3" style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
                  <Icon name={item.icon} fallback="Circle" size={16} style={{ color: 'var(--gold)' }} />
                </div>
                <p className="text-xs tracking-widest uppercase opacity-50 mb-1" style={{ fontFamily: 'Golos Text' }}>{item.label}</p>
                <p className="font-['Cormorant_Garamond'] text-lg" style={{ color: 'var(--cream)' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="gold-line max-w-xs mx-auto opacity-30" />

      {/* SCHEDULE */}
      <Section id="schedule" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)', fontFamily: 'Golos Text' }}>Программа дня</p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-5xl" style={{ color: 'var(--cream)' }}>
              День нашей свадьбы
            </h2>
            <Ornament />
          </div>

          <div className="space-y-8">
            {SCHEDULE.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="flex gap-6 items-start">
                  <div className="w-14 shrink-0 text-right">
                    <span className="font-['Cormorant_Garamond'] text-lg" style={{ color: 'var(--gold)' }}>{item.time}</span>
                  </div>
                  <div className="pb-6">
                    <h3 className="font-['Cormorant_Garamond'] text-xl mb-1" style={{ color: 'var(--cream)' }}>{item.title}</h3>
                    <p className="text-sm opacity-60" style={{ fontFamily: 'Golos Text', color: 'var(--cream)' }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="gold-line max-w-xs mx-auto opacity-30" />

      {/* VENUE */}
      <Section id="venue" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)', fontFamily: 'Golos Text' }}>Место и карта</p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-5xl" style={{ color: 'var(--cream)' }}>
              Усадьба «Лесной двор»
            </h2>
            <Ornament />
            <p className="opacity-70 text-base" style={{ fontFamily: 'Golos Text', color: 'var(--cream)' }}>
              Московская область, Одинцовский район, д. Лесная, 1
            </p>
          </div>

          <div className="relative rounded overflow-hidden mb-10" style={{ border: '1px solid rgba(201,168,76,0.2)', height: 320 }}>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=36.8,55.7,37.2,55.9&layer=mapnik"
              className="w-full h-full opacity-70"
              style={{ filter: 'sepia(0.4) saturate(0.7) brightness(0.7)' }}
              title="Карта"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center px-6 py-4" style={{ background: 'rgba(22,38,24,0.85)', border: '1px solid rgba(201,168,76,0.3)' }}>
                <Icon name="MapPin" size={20} className="mx-auto mb-2" style={{ color: 'var(--gold)' }} />
                <p className="font-['Cormorant_Garamond'] text-lg" style={{ color: 'var(--cream)' }}>Усадьба «Лесной двор»</p>
                <p className="text-xs opacity-60 mt-1" style={{ fontFamily: 'Golos Text', color: 'var(--cream)' }}>Московская область</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: 'Car', title: 'На автомобиле', desc: '45 минут от МКАД по Минскому шоссе, съезд на 47 км' },
              { icon: 'Train', title: 'На электричке', desc: 'С Белорусского вокзала до ст. Лесная, далее 5 мин. такси' },
              { icon: 'Bus', title: 'Трансфер', desc: 'Организуем автобус от м. Киевская в 14:00' },
            ].map(item => (
              <div key={item.title} className="p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.12)' }}>
                <Icon name={item.icon} fallback="Circle" size={18} className="mx-auto mb-3" style={{ color: 'var(--gold)' }} />
                <h4 className="font-['Cormorant_Garamond'] text-lg mb-2" style={{ color: 'var(--cream)' }}>{item.title}</h4>
                <p className="text-sm opacity-60 leading-relaxed" style={{ fontFamily: 'Golos Text', color: 'var(--cream)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="gold-line max-w-xs mx-auto opacity-30" />

      {/* RSVP */}
      <Section id="rsvp" className="py-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)', fontFamily: 'Golos Text' }}>Ответ на приглашение</p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-5xl" style={{ color: 'var(--cream)' }}>
              Подтвердите участие
            </h2>
            <Ornament />
            <p className="opacity-70 text-sm" style={{ fontFamily: 'Golos Text', color: 'var(--cream)' }}>
              Пожалуйста, ответьте до 1 мая 2025 года
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-6">🌿</div>
              <h3 className="font-['Cormorant_Garamond'] text-3xl mb-3" style={{ color: 'var(--gold)' }}>Спасибо!</h3>
              <p className="opacity-70 text-base" style={{ fontFamily: 'Golos Text', color: 'var(--cream)' }}>
                Мы получили ваш ответ и с нетерпением ждём встречи
              </p>
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="space-y-5">
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2 opacity-60" style={{ fontFamily: 'Golos Text', color: 'var(--cream)' }}>Ваше имя</label>
                <input
                  type="text"
                  required
                  placeholder="Иван Иванов"
                  value={rsvpForm.name}
                  onChange={e => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                  className="w-full px-4 py-3 forest-input rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase mb-2 opacity-60" style={{ fontFamily: 'Golos Text', color: 'var(--cream)' }}>Вы придёте?</label>
                <div className="grid grid-cols-2 gap-3">
                  {[{ value: 'yes', label: 'Да, буду!' }, { value: 'no', label: 'К сожалению, нет' }].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRsvpForm({ ...rsvpForm, attend: opt.value })}
                      className="py-3 text-sm tracking-widest uppercase transition-all duration-300"
                      style={{
                        fontFamily: 'Golos Text',
                        border: `1px solid ${rsvpForm.attend === opt.value ? 'var(--gold)' : 'rgba(201,168,76,0.2)'}`,
                        background: rsvpForm.attend === opt.value ? 'var(--gold)' : 'transparent',
                        color: rsvpForm.attend === opt.value ? 'var(--forest)' : 'var(--cream)',
                      }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase mb-2 opacity-60" style={{ fontFamily: 'Golos Text', color: 'var(--cream)' }}>Количество гостей</label>
                <select
                  value={rsvpForm.guests}
                  onChange={e => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                  className="w-full px-4 py-3 forest-input rounded-none appearance-none">
                  {['1', '2', '3', '4'].map(n => (
                    <option key={n} value={n} style={{ background: 'var(--forest-light)' }}>{n} {n === '1' ? 'гость' : 'гостя'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase mb-2 opacity-60" style={{ fontFamily: 'Golos Text', color: 'var(--cream)' }}>Пожелания или вопросы</label>
                <textarea
                  rows={3}
                  placeholder="Диетические предпочтения, пожелания..."
                  value={rsvpForm.message}
                  onChange={e => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                  className="w-full px-4 py-3 forest-input rounded-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 text-sm tracking-widest uppercase font-['Golos_Text'] transition-all duration-300"
                style={{ background: 'var(--gold)', color: 'var(--forest)' }}
                onMouseEnter={e => (e.target as HTMLElement).style.background = 'var(--gold-light)'}
                onMouseLeave={e => (e.target as HTMLElement).style.background = 'var(--gold)'}>
                Отправить ответ
              </button>
            </form>
          )}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-14 text-center px-6" style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>
        <div className="font-['Cormorant_Garamond'] text-3xl mb-3" style={{ color: 'var(--gold)' }}>
          А ✦ Е
        </div>
        <p className="text-xs tracking-widest uppercase opacity-40 mb-6" style={{ fontFamily: 'Golos Text', color: 'var(--cream)' }}>
          14 · 06 · 2025
        </p>
        <Ornament />
        <p className="font-['Cormorant_Garamond'] italic text-base opacity-50" style={{ color: 'var(--cream)' }}>
          «Любовь — это не то, что мы находим. Это то, что мы создаём вместе»
        </p>
      </footer>
    </div>
  );
}