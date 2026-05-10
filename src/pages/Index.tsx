import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const LEAF_CORNER = "https://cdn.poehali.dev/projects/1ef3fdcb-f305-4032-9b6b-7eb16be02ed4/files/6d59e4fb-217e-4c8c-b02c-964615c100b2.jpg";
const LEAF_BRANCH = "https://cdn.poehali.dev/projects/1ef3fdcb-f305-4032-9b6b-7eb16be02ed4/files/5604387a-f9ec-4c59-ab84-f5c6f099fe09.jpg";

const SCHEDULE = [
  { time: '15:00', title: 'Сбор гостей', desc: 'Встреча у главного входа, приветственные напитки' },
  { time: '16:00', title: 'Церемония', desc: 'Торжественная регистрация брака' },
  { time: '17:30', title: 'Фуршет', desc: 'Лёгкие закуски и фотосессия в саду' },
  { time: '19:00', title: 'Торжественный ужин', desc: 'Банкет, поздравления и первый танец' },
  { time: '21:00', title: 'Вечеринка', desc: 'Живая музыка и танцы' },
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
  }, [ref]);
  return inView;
}

function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  return (
    <section id={id} ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}>
      {children}
    </section>
  );
}

function FancyRule({ label }: { label?: string }) {
  return (
    <div className="fancy-rule my-6">
      {label && <span className="serif italic px-2" style={{ color: 'var(--forest)' }}>{label}</span>}
    </div>
  );
}

function CornerLeaves() {
  return (
    <>
      <img src={LEAF_CORNER} alt="" className="leaf-corner" style={{ top: 0, left: 0 }} />
      <img src={LEAF_CORNER} alt="" className="leaf-corner" style={{ top: 0, right: 0, transform: 'scaleX(-1)' }} />
      <img src={LEAF_CORNER} alt="" className="leaf-corner" style={{ bottom: 0, left: 0, transform: 'scaleY(-1)' }} />
      <img src={LEAF_CORNER} alt="" className="leaf-corner" style={{ bottom: 0, right: 0, transform: 'scale(-1, -1)' }} />
    </>
  );
}

export default function Index() {
  const [rsvpForm, setRsvpForm] = useState({ name: '', guests: '1', attend: 'yes', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen paper-bg botanical-frame relative overflow-hidden">

      {/* Botanical leaves at corners — frame around the whole site */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <img src={LEAF_CORNER} alt="" className="leaf-corner" style={{ top: 0, left: 0 }} />
        <img src={LEAF_CORNER} alt="" className="leaf-corner" style={{ top: 0, right: 0, transform: 'scaleX(-1)' }} />
        <img src={LEAF_CORNER} alt="" className="leaf-corner" style={{ bottom: 0, left: 0, transform: 'scaleY(-1)' }} />
        <img src={LEAF_CORNER} alt="" className="leaf-corner" style={{ bottom: 0, right: 0, transform: 'scale(-1, -1)' }} />
      </div>

      {/* Paper stains overlay */}
      <div className="paper-stains" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-12 py-10 md:py-16">

        {/* MASTHEAD — newspaper header */}
        <header className="text-center animate-ink">
          <div className="flex items-center justify-between text-xs typewriter mb-3" style={{ color: 'var(--ink-soft)' }}>
            <span>№ 0721 · ИЗДАНИЕ ЛЕТНЕЕ</span>
            <span className="hidden sm:inline">ВТОРНИК · 21 ИЮЛЯ · 2026</span>
            <span>ЦЕНА — БЕСЦЕННО</span>
          </div>
          <div className="thick-rule" />

          <p className="serif italic text-sm md:text-base mb-2" style={{ color: 'var(--sepia)' }}>
            — Свадебный вестник —
          </p>

          <h1 className="headline text-5xl sm:text-7xl md:text-8xl my-4">
            ВЕСТНИК<br />
            <span className="headline-italic" style={{ fontSize: '0.85em' }}>любви</span>
          </h1>

          <div className="thick-rule" />
          <p className="typewriter text-xs md:text-sm tracking-widest" style={{ color: 'var(--ink-soft)' }}>
            ОФИЦИАЛЬНОЕ ПРИГЛАШЕНИЕ · ЕДИНСТВЕННЫЙ ВЫПУСК · ТИРАЖ ОГРАНИЧЕН
          </p>
        </header>

        {/* HERO ARTICLE */}
        <Section className="mt-10 md:mt-16">
          <div className="text-center mb-8">
            <p className="article-label">экстренный выпуск</p>
            <h2 className="headline text-4xl md:text-6xl mb-4">
              СЕНСАЦИЯ! ДВА СЕРДЦА<br />
              ОБЪЯВЛЯЮТ О СОЮЗЕ
            </h2>
            <p className="serif italic text-lg md:text-xl" style={{ color: 'var(--forest)' }}>
              Подробности на первой полосе
            </p>
          </div>

          <FancyRule />

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center text-center my-10">
            <div>
              <p className="typewriter text-xs tracking-widest mb-2" style={{ color: 'var(--sepia)' }}>невеста</p>
              <h3 className="headline text-5xl md:text-6xl" style={{ color: 'var(--forest)' }}>Кристина</h3>
              <p className="serif italic mt-2" style={{ color: 'var(--ink-soft)' }}>прелестная и сияющая</p>
            </div>
            <div className="text-7xl headline-italic" style={{ color: 'var(--forest)' }}>&</div>
            <div>
              <p className="typewriter text-xs tracking-widest mb-2" style={{ color: 'var(--sepia)' }}>жених</p>
              <h3 className="headline text-5xl md:text-6xl" style={{ color: 'var(--forest)' }}>Виталий</h3>
              <p className="serif italic mt-2" style={{ color: 'var(--ink-soft)' }}>галантный и преданный</p>
            </div>
          </div>

          <FancyRule />

          {/* Date mega */}
          <div className="text-center my-12">
            <p className="typewriter text-xs tracking-widest mb-3" style={{ color: 'var(--sepia)' }}>
              торжественная дата
            </p>
            <div className="flex items-end justify-center gap-4 md:gap-8">
              <div>
                <div className="date-mega">21</div>
                <p className="typewriter text-xs tracking-widest mt-2">ДЕНЬ</p>
              </div>
              <div className="pb-4">
                <div className="text-3xl headline-italic">·</div>
              </div>
              <div>
                <div className="date-mega">07</div>
                <p className="typewriter text-xs tracking-widest mt-2">МЕСЯЦ</p>
              </div>
              <div className="pb-4">
                <div className="text-3xl headline-italic">·</div>
              </div>
              <div>
                <div className="date-mega">26</div>
                <p className="typewriter text-xs tracking-widest mt-2">ГОД</p>
              </div>
            </div>
            <div className="mt-6 inline-block">
              <span className="stamp">только один день</span>
            </div>
          </div>
        </Section>

        {/* DOUBLE BORDER DIVIDER */}
        <div className="double-border my-12 py-2 text-center">
          <span className="serif italic text-base px-4" style={{ color: 'var(--forest)' }}>
            ✦ важнейшие сведения о торжестве ✦
          </span>
        </div>

        {/* ABOUT — newspaper article style */}
        <Section id="about" className="mb-16">
          <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-start">
            <article>
              <p className="article-label">от редакции</p>
              <h2 className="headline text-3xl md:text-5xl mb-2">
                Лето, что войдёт в историю
              </h2>
              <p className="serif italic mb-6" style={{ color: 'var(--sepia)' }}>
                Корреспондент сообщает с места событий
              </p>

              <div className="newspaper-cols serif text-base md:text-lg leading-relaxed" style={{ color: 'var(--ink)' }}>
                <p className="drop-cap mb-4">
                  Дорогие друзья и родственники! С особым волнением и радостью сообщаем вам о грядущем торжестве, которому суждено стать одним из самых светлых дней нашей жизни.
                </p>
                <p className="mb-4">
                  В этот летний день, под щедрым солнцем и в окружении самых близких людей, состоится наше бракосочетание. Мы будем безмерно счастливы видеть вас рядом и разделить с вами эти волшебные мгновения.
                </p>
                <p>
                  Просим вас явиться нарядными, в добром расположении духа и с готовностью танцевать до самого утра. Подробное расписание дня — на следующей странице.
                </p>
              </div>
            </article>

            <aside className="article">
              <p className="article-label">справка</p>
              <div className="space-y-4 text-sm serif">
                <div>
                  <p className="typewriter text-xs tracking-widest mb-1" style={{ color: 'var(--sepia)' }}>ДАТА</p>
                  <p className="text-base" style={{ color: 'var(--ink)' }}>21 июля 2026 г.</p>
                </div>
                <div className="border-t border-dotted pt-3" style={{ borderColor: 'var(--ink)' }}>
                  <p className="typewriter text-xs tracking-widest mb-1" style={{ color: 'var(--sepia)' }}>НАЧАЛО</p>
                  <p className="text-base" style={{ color: 'var(--ink)' }}>15:00 пополудни</p>
                </div>
                <div className="border-t border-dotted pt-3" style={{ borderColor: 'var(--ink)' }}>
                  <p className="typewriter text-xs tracking-widest mb-1" style={{ color: 'var(--sepia)' }}>МЕСТО</p>
                  <p className="text-base" style={{ color: 'var(--ink)' }}>Усадьба «Лесной двор»</p>
                </div>
                <div className="border-t border-dotted pt-3" style={{ borderColor: 'var(--ink)' }}>
                  <p className="typewriter text-xs tracking-widest mb-1" style={{ color: 'var(--sepia)' }}>ДРЕСС-КОД</p>
                  <p className="text-base" style={{ color: 'var(--ink)' }}>Парадно-летний</p>
                </div>
              </div>
            </aside>
          </div>
        </Section>

        <div className="double-border my-12 py-2 text-center">
          <span className="serif italic text-base px-4" style={{ color: 'var(--forest)' }}>
            ✦ хроника торжественного дня ✦
          </span>
        </div>

        {/* SCHEDULE */}
        <Section id="schedule" className="mb-16">
          <div className="text-center mb-10">
            <p className="article-label">программа</p>
            <h2 className="headline text-3xl md:text-5xl mb-2">
              Расписание торжества
            </h2>
            <p className="serif italic" style={{ color: 'var(--sepia)' }}>Час за часом, минута в минуту</p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12">
            {SCHEDULE.map((item, i) => (
              <div key={i} className="tl-row">
                <div className="text-right">
                  <span className="headline text-2xl md:text-3xl" style={{ color: 'var(--forest)' }}>{item.time}</span>
                </div>
                <div>
                  <h3 className="headline text-xl mb-1">{item.title}</h3>
                  <p className="serif text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <div className="double-border my-12 py-2 text-center">
          <span className="serif italic text-base px-4" style={{ color: 'var(--forest)' }}>
            ✦ карта местности ✦
          </span>
        </div>

        {/* VENUE */}
        <Section id="venue" className="mb-16">
          <div className="text-center mb-8">
            <p className="article-label">путеводитель</p>
            <h2 className="headline text-3xl md:text-5xl mb-2">
              Усадьба «Лесной двор»
            </h2>
            <p className="serif italic" style={{ color: 'var(--sepia)' }}>
              Московская область, Одинцовский район, д. Лесная, 1
            </p>
          </div>

          <div className="article p-2" style={{ borderWidth: 2 }}>
            <div className="relative" style={{ height: 360, border: '1px solid var(--ink)' }}>
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=36.8,55.7,37.2,55.9&layer=mapnik"
                className="w-full h-full"
                style={{ filter: 'sepia(0.85) saturate(0.6) contrast(1.1) brightness(0.95)' }}
                title="Карта"
              />
              <div className="absolute top-3 left-3 stamp" style={{ transform: 'rotate(-3deg)' }}>
                место встречи
              </div>
            </div>
            <p className="text-center typewriter text-xs mt-2" style={{ color: 'var(--sepia)' }}>
              ИЗВЛЕЧЕНО ИЗ КАРТОГРАФИЧЕСКОГО АРХИВА
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: 'Car', title: 'НА ЭКИПАЖЕ', desc: '45 минут от МКАД по Минскому шоссе, съезд на 47-м километре' },
              { icon: 'Train', title: 'ПОЕЗДОМ', desc: 'С Белорусского вокзала до станции «Лесная», далее извозчик' },
              { icon: 'Bus', title: 'ОБЩИМ ТРАНСПОРТОМ', desc: 'Организованный омнибус от метро «Киевская» в 14:00' },
            ].map(item => (
              <div key={item.title} className="article">
                <Icon name={item.icon} fallback="MapPin" size={22} style={{ color: 'var(--forest)' }} />
                <h4 className="typewriter text-xs tracking-widest mt-3 mb-2" style={{ color: 'var(--ink)' }}>{item.title}</h4>
                <p className="serif text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <div className="double-border my-12 py-2 text-center">
          <span className="serif italic text-base px-4" style={{ color: 'var(--forest)' }}>
            ✦ телеграмма для молодожёнов ✦
          </span>
        </div>

        {/* RSVP */}
        <Section id="rsvp" className="mb-16">
          <div className="text-center mb-8">
            <p className="article-label">форма ответа</p>
            <h2 className="headline text-3xl md:text-5xl mb-2">
              Подтвердите присутствие
            </h2>
            <p className="serif italic" style={{ color: 'var(--sepia)' }}>
              Просим ответить телеграммой не позднее 1 июля 1926 года
            </p>
          </div>

          <div className="article max-w-2xl mx-auto" style={{ borderWidth: 2, padding: '2rem' }}>
            <div className="text-center mb-6">
              <span className="stamp">срочно</span>
            </div>

            {submitted ? (
              <div className="text-center py-10">
                <h3 className="headline text-4xl mb-4" style={{ color: 'var(--forest)' }}>Телеграмма принята!</h3>
                <p className="serif italic text-lg" style={{ color: 'var(--ink)' }}>
                  Благодарим за скорый ответ. С нетерпением ждём встречи 21 июля.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvp} className="space-y-6">
                <div>
                  <label className="typewriter text-xs tracking-widest block mb-1" style={{ color: 'var(--sepia)' }}>
                    ВАШЕ ИМЯ И ФАМИЛИЯ
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="например, Иван Петров"
                    value={rsvpForm.name}
                    onChange={e => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    className="paper-input"
                  />
                </div>

                <div>
                  <label className="typewriter text-xs tracking-widest block mb-3" style={{ color: 'var(--sepia)' }}>
                    БУДЕТЕ ЛИ ПРИСУТСТВОВАТЬ?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ value: 'yes', label: 'Да, прибуду' }, { value: 'no', label: 'Не смогу' }].map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setRsvpForm({ ...rsvpForm, attend: opt.value })}
                        className="py-3 typewriter text-xs tracking-widest transition-all"
                        style={{
                          background: rsvpForm.attend === opt.value ? 'var(--forest)' : 'transparent',
                          color: rsvpForm.attend === opt.value ? 'var(--paper)' : 'var(--ink)',
                          border: '2px solid var(--forest)',
                          textTransform: 'uppercase',
                        }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="typewriter text-xs tracking-widest block mb-1" style={{ color: 'var(--sepia)' }}>
                    КОЛИЧЕСТВО ПЕРСОН
                  </label>
                  <select
                    value={rsvpForm.guests}
                    onChange={e => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                    className="paper-input">
                    {['1', '2', '3', '4'].map(n => (
                      <option key={n} value={n}>{n} {n === '1' ? 'персона' : 'персоны'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="typewriter text-xs tracking-widest block mb-1" style={{ color: 'var(--sepia)' }}>
                    ПОЖЕЛАНИЯ И ПОМЕТКИ
                  </label>
                  <textarea
                    rows={3}
                    placeholder="оставьте телеграмму молодожёнам..."
                    value={rsvpForm.message}
                    onChange={e => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                    className="paper-input resize-none"
                    style={{ borderBottom: '1px dashed var(--ink)' }}
                  />
                </div>

                <div className="text-center pt-4">
                  <button type="submit" className="btn-stamp">
                    отправить телеграмму
                  </button>
                </div>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-dotted" style={{ borderColor: 'var(--ink)' }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 typewriter text-xs" style={{ color: 'var(--sepia)' }}>
                <span>ТЕЛЕФОН ДЛЯ СВЯЗИ:</span>
                <span style={{ color: 'var(--forest)' }}>+7 (999) 123-45-67</span>
                <span>КРИСТИНА И ВИТАЛИЙ</span>
              </div>
            </div>
          </div>
        </Section>

        {/* FOOTER MASTHEAD */}
        <footer className="mt-16 text-center">
          <div className="thick-rule" />

          <div className="my-8">
            <img src={LEAF_BRANCH} alt="" className="mx-auto h-24 opacity-70" style={{ mixBlendMode: 'multiply' }} />
          </div>

          <h3 className="headline-italic text-3xl md:text-4xl mb-4">
            «Любовь — единственная разумная и удовлетворительная цель человеческого существования»
          </h3>
          <p className="serif italic" style={{ color: 'var(--sepia)' }}>— Эрих Фромм</p>

          <div className="mt-8 thick-rule" />

          <div className="flex flex-col md:flex-row justify-between items-center text-xs typewriter mt-4 gap-2" style={{ color: 'var(--ink-soft)' }}>
            <span>ОТПЕЧАТАНО С ЛЮБОВЬЮ</span>
            <span>К · &nbsp;&nbsp;✦&nbsp;&nbsp; · В</span>
            <span>21 · 07 · 2026</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
