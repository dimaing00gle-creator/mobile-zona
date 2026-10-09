/**
 * All landing page content in one place.
 * REPLACE marks placeholder data that must be swapped for real data before launch.
 *
 * Photos: Unsplash (free license https://unsplash.com/license).
 * Authors: 85mm.ca, Micah & Sammie Chaffin, Mockup Free, Igor Omilaev, Dagny Reese, Klim Musalimov, gomi,
 * Caleb George, Kelly Sikkema, Hugo Agut Tugal, Luis Villasmil, Xianjuan HU, Andrey Matveev.
 */

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const site = {
  name: "Mobile Zona",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobilezona.ua", // REPLACE: real domain
  title: "Mobile Zona — смартфони та аксесуари з живою консультацією",
  description:
    "Мережа магазинів смартфонів та аксесуарів Mobile Zona. Офіційна гарантія, розстрочка 0% і безкоштовна консультація. Залиште заявку — підберемо модель і зарезервуємо в найближчому магазині.",
  phone: "+380 67 000 00 00", // REPLACE
  email: "hello@mobilezona.ua", // REPLACE
  hotlineHours: "Щодня 9:00–21:00",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" }, // REPLACE
    { label: "Telegram", href: "https://t.me/" }, // REPLACE
    { label: "Facebook", href: "https://facebook.com/" }, // REPLACE
  ],
  foundedYear: 2017, // REPLACE
};

export const nav = [
  { href: "#catalog", label: "Каталог" },
  { href: "#services", label: "Послуги" },
  { href: "#about", label: "Про нас" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#stores", label: "Магазини" },
];

// Shared copy reused across several blocks
export const common = {
  cta: "Отримати консультацію",
  skipLink: "Перейти до змісту",
  logoLabel: `${site.name} — на головну`,
};

export const header = {
  cta: "Консультація",
  navLabel: "Основна навігація",
  mobileNavLabel: "Мобільна навігація",
  menuOpen: "Відкрити меню",
  menuClose: "Закрити меню",
  // the mobile menu gets an extra Contacts item after the sections
  mobileExtra: { href: "#contacts", label: "Контакти" },
};

export const hero = {
  title: ["Смартфони", "та аксесуари"],
  // last line of the heading uses the Tektur accent font
  titleAccent: "без зайвих питань",
  lead: "Офіційна гарантія, перевірена техніка та консультація, яка справді допомагає обрати. Телефонуйте — підкажемо модель і перевіримо наявність у магазині.",
  // own photo: public/images/hero.jpg (1140×960, cropped, no text)
  image: {
    src: "/images/hero.jpg",
    alt: "Роботизована рука тримає білий смартфон із потрійною камерою",
  },
  ctaTopic: "Підбір смартфона",
} as const;

export const catalog = {
  title: "Усе для вашого смартфона — в одному магазині",
  regionLabel: "Категорії товарів",
  roleDescription: "карусель",
  prev: "Попередні товари",
  next: "Наступні товари",
  slideLabel: (n: number, total: number, title: string) => `${n} з ${total}: ${title}`,
};

export type Category = {
  id: string;
  title: string;
  caption: string;
  image: string;
  alt: string;
};

export const categories: Category[] = [
  {
    id: "flagships",
    title: "Вживані iPhone",
    caption: "Перевірені смартфони Apple за вигідною ціною",
    image: unsplash("1742407795182-144225af8ebe"),
    alt: "iPhone кольору графіт на бетонній поверхні",
  },
  {
    id: "smartphones",
    title: "Смартфони на щодень",
    caption: "Ємна батарея та хороша камера за розумну ціну",
    image: unsplash("1722888595094-5599caca7242"),
    alt: "Смартфон Xiaomi з увімкненим екраном на дерев’яному столі",
  },
  {
    id: "headphones",
    title: "Повнорозмірні навушники",
    caption: "Bluetooth-навушники з м’якими амбушурами",
    image: "/images/proove-headphones-black.jpg",
    alt: "Чорні навушники Proove на підставці",
  },
  {
    id: "earbuds",
    title: "Бездротові навушники",
    caption: "TWS для дороги, спорту й дзвінків",
    image: "/images/earbuds-white.jpg",
    alt: "Білі бездротові навушники у відкритому зарядному кейсі",
  },
  {
    id: "watches",
    title: "Смарт-годинники",
    caption: "Пульс, сон, сповіщення — на зап’ясті",
    image: "/images/smartwatch-grey.webp",
    alt: "Смарт-годинник із круглим циферблатом і сірим ремінцем на зап’ясті",
  },
  {
    id: "power",
    title: "Павербанки та зарядки",
    caption: "Швидка зарядка вдома й у дорозі",
    image: "/images/powerbanks-magnetic.webp",
    alt: "Магнітні павербанки різних кольорів на синьому фоні",
  },
  {
    id: "cases",
    title: "Чохли та захисне скло",
    caption: "Захист екрана й камери під вашу модель",
    image: "/images/camera-lens-protector.jpg",
    alt: "Захисне скло на камеру смартфона",
  },
  {
    id: "car-holders",
    title: "Автотримачі",
    caption: "Надійне кріплення смартфона в авто",
    image: "/images/car-holder.webp",
    alt: "Смартфон в автотримачі на дефлекторі автомобіля",
  },
  {
    id: "ring-lights",
    title: "LED-лампи",
    caption: "Кільцеві лампи для селфі, відео та стримів",
    image: "/images/ring-light.jpg",
    alt: "Кільцева LED-лампа на штативі з тримачем для смартфона",
  },
];

export const leadTopics = [
  "Підбір смартфона",
  "Розстрочка",
  "Аксесуари",
  "Сервіс і ремонт",
  "Інше",
] as const;

export type LeadTopic = (typeof leadTopics)[number];

// \n in the text forces a line break (desktop only)
export const services = [
  {
    title: "Підбір смартфона",
    text: "Порівняємо моделі під ваші задачі та бюджет. Чесно, без нав’язування.",
  },
  {
    title: "Тест-драйв",
    text: "Спробуйте камеру, екран і швидкість роботи\nще до покупки.",
  },
  {
    title: "Перенесення даних",
    text: "Контакти, фото й месенджери зі старого телефону — за 20 хвилин.",
  },
  {
    title: "Поклейка скла та плівки",
    text: "Акуратно, без бульбашок, з гарантією\nна роботу.",
  },
  {
    title: "Чистка динаміків",
    text: "Приберемо пил і бруд із решіток, щоб звук\nі мікрофон знову були чіткими.",
  },
  {
    title: "Налаштування",
    text: "Акаунти, резервні копії, банківські застосунки — усе готово до виходу з магазину.",
  },
  {
    title: "Оптимізація системи",
    text: "Звільнимо пам’ять і приберемо зайве —\nтелефон працюватиме швидше.",
  },
  {
    title: "Розстрочка",
    text: "Від банків-партнерів, без прихованих комісій.",
  },
  {
    title: "Гарантійний сервіс",
    text: "Приймаємо техніку на діагностику та гарантійний ремонт.",
  },
];

// Text over the services photo (desktop only): two sentences, two lines
export const servicesAi = [
  "Ми активно використовуємо штучний інтелект у своїй роботі.",
  "Він допомагає нам працювати швидше й робити сервіс ще якіснішим.",
];

export const servicesBlock = {
  title: "Більше, ніж просто покупка",
  // own photo: public/images/services-handshake.jpg (1200×678)
  image: {
    src: "/images/services-handshake.jpg",
    alt: "Рукостискання руки робота й людської руки на світлому тлі",
  },
  // robot cut-out for the services list: public/images/services-robot-assistant.webp (235×300, transparent)
  robot: { src: "/images/services-robot-assistant.webp", width: 235, height: 300 },
  asideText: "Запишіться заздалегідь, і консультант чекатиме саме на вас",
  cta: { label: "Записатися на послугу", topic: "Підбір смартфона", interest: "Запис на послугу" },
} as const;

export const about = {
  title: "Магазини, куди хочеться повернутися",
  text: [
    "Mobile Zona — українська мережа магазинів смартфонів та аксесуарів. Ми віримо, що покупку техніки варто робити наживо: потримати пристрій у руках, поставити питання й отримати чесну відповідь.",
  ],
  values: [
    { title: "Офіційна техніка", text: "Лише сертифіковані пристрої\nз гарантією виробника." },
    { title: "Чесна консультація", text: "Порадимо так, як порадили б другу." },
    { title: "Сервіс після покупки", text: "Не зникаємо після оплати — допоможемо з будь-яким питанням." },
  ],
};

export type Store = {
  id: string;
  city: string;
  name: string;
  address: string;
  postalCode: string;
  region: string;
  hours: string;
  opens: string;
  closes: string;
  phone: string;
};

// REPLACE: real store addresses, hours and phone numbers
export const stores: Store[] = [
  {
    id: "kyiv-khreshchatyk",
    city: "Київ",
    name: "Mobile Zona Хрещатик",
    address: "вул. Хрещатик, 22",
    postalCode: "01001",
    region: "Київ",
    hours: "Щодня 10:00–21:00",
    opens: "10:00",
    closes: "21:00",
    phone: "+380 67 000 00 01",
  },
  {
    id: "kyiv-vasylkivska",
    city: "Київ",
    name: "Mobile Zona Васильківська",
    address: "вул. Велика Васильківська, 72",
    postalCode: "03150",
    region: "Київ",
    hours: "Щодня 10:00–21:00",
    opens: "10:00",
    closes: "21:00",
    phone: "+380 67 000 00 02",
  },
  {
    id: "lviv",
    city: "Львів",
    name: "Mobile Zona Львів",
    address: "просп. Шевченка, 7",
    postalCode: "79005",
    region: "Львівська область",
    hours: "Щодня 10:00–20:00",
    opens: "10:00",
    closes: "20:00",
    phone: "+380 67 000 00 03",
  },
  {
    id: "odesa",
    city: "Одеса",
    name: "Mobile Zona Одеса",
    address: "вул. Дерибасівська, 15",
    postalCode: "65026",
    region: "Одеська область",
    hours: "Щодня 10:00–21:00",
    opens: "10:00",
    closes: "21:00",
    phone: "+380 67 000 00 04",
  },
  {
    id: "dnipro",
    city: "Дніпро",
    name: "Mobile Zona Дніпро",
    address: "просп. Дмитра Яворницького, 50",
    postalCode: "49000",
    region: "Дніпропетровська область",
    hours: "Щодня 10:00–20:00",
    opens: "10:00",
    closes: "20:00",
    phone: "+380 67 000 00 05",
  },
];

export const cities = Array.from(new Set(stores.map((s) => s.city)));

export const storeFinder = {
  title: "Магазин поруч із вами",
  citiesLabel: "Оберіть місто",
  country: "Україна",
  route: "Прокласти маршрут",
  reserveText: "Хочете бути впевнені, що потрібна модель чекатиме на вас?",
  reserveCta: "Зарезервувати товар",
  reserveTopic: "Підбір смартфона",
  reserveInterest: (address: string) => `Резерв у магазині: ${address}`,
  mapTitle: (name: string, address: string) => `Карта: ${name}, ${address}`,
} as const;

// REPLACE: SAMPLE reviews for layout only. Before launch, swap them for
// real customer reviews (e.g. from Google Maps) — fabricated reviews must not be published.
export const reviewsSummary = {
  rating: "4.9",
  count: "1 200+",
  source: "Google Maps",
  href: "https://www.google.com/maps",
};

export const reviewsBlock = {
  title: "Нам довіряють і повертаються",
  summaryText: `Середня оцінка за ${reviewsSummary.count} відгуків на ${reviewsSummary.source}`,
  allLink: "Усі відгуки",
  ratingLabel: (rating: number) => `Оцінка ${rating} з 5`,
};

export const reviews = [
  {
    id: "olena",
    name: "Олена К.",
    store: "Київ, Хрещатик",
    date: "Вересень 2026",
    rating: 5,
    text: "Прийшла по новий телефон для мами. Консультант не поспішав, показав три моделі й пояснив різницю простими словами. Ще й перенесли всі контакти та фото.",
  },
  {
    id: "iryna",
    name: "Ірина Т.",
    store: "Одеса",
    date: "Серпень 2026",
    rating: 5,
    text: "Залишила заявку на сайті ввечері, зранку передзвонили й відклали потрібний колір. Залишилося тільки прийти й забрати.",
  },
  {
    id: "maksym",
    name: "Максим Д.",
    store: "Дніпро",
    date: "Липень 2026",
    rating: 4,
    text: "Хороший вибір аксесуарів, скло наклеїли ідеально. Трохи довелося почекати в суботу, але воно того варте.",
  },
  {
    id: "nataliia",
    name: "Наталія Р.",
    store: "Київ, Васильківська",
    date: "Липень 2026",
    rating: 5,
    text: "Брала в розстрочку — все прозоро, без прихованих платежів. Окреме дякую за налаштування банківських застосунків.",
  },
  {
    id: "oleh",
    name: "Олег С.",
    store: "Київ, Хрещатик",
    date: "Червень 2026",
    rating: 5,
    text: "Не міг обрати між двома моделями — дали потестувати обидві камери прямо в магазині. Рішення прийняв за 5 хвилин.",
  },
  {
    id: "andrii",
    name: "Андрій П.",
    store: "Львів",
    date: "Червень 2026",
    rating: 5,
    text: "Телефон почав гальмувати, а співрозмовника було погано чути. Почистили динаміки й звільнили пам’ять, поки я пив каву поруч. Тепер працює як новий.",
  },
];

export const contacts = {
  title: "Порадимо, перш ніж ви купите",
  lead: "Залиште заявку — консультант підбере кілька моделей під ваш запит, а ми відкладемо їх у зручному магазині. Прийдете, спробуєте й вирішите на місці.",
  hotline: "Гаряча лінія",
  email: "Пошта",
  socials: "Ми в соцмережах",
  formTitle: "Заявка на консультацію",
};

export const leadForm = {
  name: { label: "Ім’я", placeholder: "Як до вас звертатися" },
  phone: { label: "Телефон", placeholder: "+380 __ ___ __ __" },
  topicLegend: "Тема звернення",
  interestLabel: "Цікавить",
  interestRemove: (interest: string) => `Прибрати: ${interest}`,
  store: { label: "Зручний магазин", any: "Будь-який — порадьте мені" },
  contactLegend: "Як зв’язатися",
  comment: {
    label: "Коментар (необов’язково)",
    placeholder: "Наприклад: шукаю смартфон з хорошою камерою до 20 000 ₴",
  },
  honeypot: "Компанія",
  consent: { text: "Погоджуюсь на обробку персональних даних відповідно до", link: "політики конфіденційності" },
  sending: "Надсилаємо…",
  note: "Безкоштовно та без зобов’язань. Передзвонимо протягом 15 хвилин.",
  error: "Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.",
  success: {
    title: (firstName: string) => `Дякуємо, ${firstName}!`,
    // contact method inside the sentence, e.g. "via call" or "via Telegram"
    text: (method: string) =>
      `Заявку отримано. Менеджер зв’яжеться з вами протягом 15 хвилин у робочий час — через ${method === "Дзвінок" ? "дзвінок" : method}.`,
    again: "Надіслати ще одну заявку",
  },
};

export const footer = {
  tagline: "Мережа магазинів смартфонів та аксесуарів з живою консультацією.",
  navLabel: "Навігація у футері",
  sections: "Розділи",
  stores: "Магазини",
  contacts: "Контакти",
  motto: "Смартфони · Аксесуари · Сервіс",
  privacy: "Політика конфіденційності",
};

// REPLACE: layout template — the final text must be approved by a lawyer
export const privacy = {
  title: "Політика конфіденційності",
  description: `Як ${site.name} обробляє персональні дані, залишені у формі заявки на сайті.`,
  intro: `${site.name} обробляє лише ті дані, які ви залишаєте у формі заявки: ім’я, номер телефону, обраний магазин і коментар. Ми використовуємо їх виключно для того, щоб зв’язатися з вами та надати консультацію.`,
  // the paragraph continues with an email link
  storage:
    "Дані не передаються третім особам, окрім сервісів, необхідних для обробки заявки, і зберігаються не довше, ніж потрібно для цієї мети. Ви можете будь-коли попросити видалити ваші дані, написавши на",
  law: "Обробка персональних даних здійснюється відповідно до Закону України «Про захист персональних даних».",
};
