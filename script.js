const translations = {
  en: {
    'nav.apps': 'Apps',
    'nav.about': 'About',
    'nav.stats': 'Stats',
    'nav.donate': 'Support',
    'nav.home': 'Home',
    'nav.hash-calc': 'Hash Calculator',
    'nav.strategy': 'Strategy',
    'nav.architecture': 'Architecture',
    'hero.title': 'Open-source apps<br>for real tasks',
    'hero.subtitle': 'SolSIP and SolAgent — fully open source.<br>Download APKs directly from GitHub.',
    'hero.download': 'Download apps',
    'hero.support': 'Support the project',
    'apps.title': 'Apps',
    'apps.subtitle': 'Two independent open-source projects',
    'apps.solsips.desc': 'VoIP and video softphone based on the SIP protocol. Clean and lightweight client.',
    'apps.solagent.desc': 'Smart agent with a RAG server. Automatically deploys a Flexisip server for the SolSIP app.',
    'apps.feature.opensource': 'Open source',
    'apps.solsips.lang': 'Written in Kotlin',
    'apps.solagent.lang': 'Written in Flutter',
    'apps.feature.apk': 'Direct APK download',
    'apps.download': 'Download APK',
    'apps.source': 'Source code',
    'about.title': 'Why GitHub?',
    'about.1.title': 'Fully open',
    'about.1.desc': 'You can see all the code. No hidden trackers or black boxes.',
    'about.2.title': 'Direct updates',
    'about.2.desc': 'If installed from GitHub, the app will offer updates from here.',
    'about.3.title': 'No stores required',
    'about.3.desc': 'Independent of Google Play and RuStore. Get the app directly.',
    'donate.title': 'Support the project',
    'donate.subtitle': 'Voluntary donation for the development of SolSIP and SolAgent.<br>Thank you for any support!',
    'donate.sbp.title': 'SBP (Alfa-Bank)',
    'donate.sbp.desc': 'Scan the QR code in any banking app',
    'donate.sbp.btn': 'Open SBP link',
    'donate.da.desc': 'Cards, YuMoney and other methods',
    'donate.da.btn': 'Support via DA',
    'meta.title': 'SolPlatform — Open Source Apps',
    'meta.description': 'Download SolSIP and SolAgent — open-source Android apps',
    'advertisers.title': 'For Advertisers',
    'advertisers.subtitle': 'Tools for managing advertising campaigns<br>in SolSIP and SolAgent apps',
    'hash-calc.title': 'Promo Image Hash Calculator',
    'hash-calc.desc': 'Enter the promo image URL — get SHA256 hash for promo.json<br>The app compares the hash of the local image with the hash in promo.json.<br>If the hashes match — it shows the cached image.<br>If they don\'t match — it downloads a new image.',
    'hash-calc.label': 'Image URL',
    'hash-calc.calc': 'Calculate Hash',
    'hash-calc.sha256': 'SHA256:',
    'hash-calc.copy': 'Copy',
    'hash-calc.how-to-use': 'How to use:',
    'hash-calc.step1': 'Upload a new image to the server',
    'hash-calc.step2': 'Copy the image URL',
    'hash-calc.step3': 'Paste the URL in the field above and click "Calculate Hash"',
    'hash-calc.step4': 'Copy the SHA256 hash',
    'hash-calc.step5': 'Paste the hash into the <code>portrait_sha256</code> or <code>landscape_sha256</code> field in promo.json',
    'hash-calc.step6': 'Push changes to the repository',
    'strategy.title': 'Advertising Campaign Strategy',
    'strategy.geo.title': 'Geo-targeting',
    'strategy.geo.desc': 'Ads are shown depending on the user\'s region, country, and city. Cascade system: /promo/{CC}/{REG}/{City}.json → /promo/{CC}/{REG}.json → /promo/{CC}.json → /promo/WORLD.json',
    'strategy.theme.title': 'Thematic targeting',
    'strategy.theme.desc': 'Different images for light and dark themes. Different images for portrait and landscape screen orientations.',
    'strategy.control.title': 'Show control',
    'strategy.control.desc': 'The advertiser sets the end date of the show (valid_until). The user can hide the ad for 24 hours. Ad button display settings (size, position, text) are available in settings.',
    'strategy.cache.title': 'Cache and update',
    'strategy.cache.desc': 'The app caches images locally. When the hash changes in promo.json — it downloads a new image. This reduces traffic and speeds up loading.',
    'architecture.title': 'Advertising System Architecture',
    'architecture.banner.desc': 'Loads promo.json for the current geolocation, selects an image by theme and orientation, caches in ImageView using Coil3. Cache-busting by SHA256 hash.',
    'architecture.fragment.desc': 'Ad display settings: alpha, canvas color, emoji button size and position. Saves settings to SharedPreferences (promo_prefs).',
    'architecture.dialog.desc': 'Shows an ad banner when clicking the emoji button. Contains an image, description, and link. The user can follow the link or hide the ad for 24 hours.',
    'architecture.viewmodel.desc': 'Manages ad settings state. LiveData for emoji text, size, position, mirror. Saves settings to SharedPreferences.',
    'stats.title': 'Download Statistics',
    'stats.impressions': 'Ad impressions',
    'stats.clicks': 'Ad clicks',
    'stats.countries': 'Countries',
    'stats.regions': 'Regions',
    'stats.how-it-works': 'How the counter works:',
    'stats.how-it-works.desc': 'The app sends anonymous metrics to a free counter (Counter.dev).<br>Data includes: country, region, city, theme (light/dark), screen orientation.<br>No personal data is collected.',
    'stats.counter.dev': 'Open Counter.dev'
  },
  ru: {
    'nav.apps': 'Приложения',
    'nav.about': 'О проекте',
    'nav.stats': 'Статистика',
    'nav.donate': 'Поддержать',
    'nav.home': 'Главная',
    'nav.hash-calc': 'Калькулятор хэшей',
    'nav.strategy': 'Стратегия',
    'nav.architecture': 'Архитектура',
    'hero.title': 'Открытые приложения<br>для реальных задач',
    'hero.subtitle': 'SolSIP и SolAgent — полностью открытый исходный код.<br>Скачивайте APK напрямую с GitHub.',
    'hero.download': 'Скачать приложения',
    'hero.support': 'Поддержать проект',
    'apps.title': 'Приложения',
    'apps.subtitle': 'Два независимых проекта с открытым кодом',
    'apps.solsips.desc': 'VoIP и видео softphone на базе SIP-протокола. Чистый и лёгкий клиент.',
    'apps.solagent.desc': 'Умный агент с RAG-сервером. Автоматически поднимает Flexisip-сервер для работы с приложением SolSIP.',
    'apps.feature.opensource': 'Открытый исходный код',
    'apps.solsips.lang': 'Написано на Kotlin',
    'apps.solagent.lang': 'Написано на Flutter',
    'apps.feature.apk': 'Прямая загрузка APK',
    'apps.download': 'Скачать APK',
    'apps.source': 'Исходники',
    'about.title': 'Почему с GitHub?',
    'about.1.title': 'Полностью открыто',
    'about.1.desc': 'Вы видите весь код. Никаких скрытых трекеров и чёрных ящиков.',
    'about.2.title': 'Прямые обновления',
    'about.2.desc': 'Если установили с GitHub — приложение само предложит обновиться отсюда.',
    'about.3.title': 'Без магазинов',
    'about.3.desc': 'Не зависим от Google Play и RuStore. Вы получаете приложение напрямую.',
    'donate.title': 'Поддержать проект',
    'donate.subtitle': 'Добровольное пожертвование на развитие SolSIP и SolAgent.<br>Спасибо за любую поддержку!',
    'donate.sbp.title': 'СБП (Альфа-Банк)',
    'donate.sbp.desc': 'Отсканируйте QR-код в приложении любого банка',
    'donate.sbp.btn': 'Открыть ссылку СБП',
    'donate.da.desc': 'Карты, ЮMoney и другие способы',
    'donate.da.btn': 'Поддержать через DA',
    'meta.title': 'SolPlatform — Open Source Apps',
    'meta.description': 'Скачайте SolSIP и SolAgent — открытые Android-приложения',
    'advertisers.title': 'Для рекламодателей',
    'advertisers.subtitle': 'Инструменты для управления рекламными кампаниями<br>в приложениях SolSIP и SolAgent',
    'hash-calc.title': 'Калькулятор хэшей промо-изображений',
    'hash-calc.desc': 'Введите URL промо-изображения — получите SHA256 хэш для promo.json<br>Приложение сверяет хэш локального изображения с хэшем в promo.json.<br>Если хэши совпадают — показывает кэшированное изображение.<br>Если не совпадает — скачивает новое изображение.',
    'hash-calc.label': 'URL изображения',
    'hash-calc.calc': 'Рассчитать хэш',
    'hash-calc.sha256': 'SHA256:',
    'hash-calc.copy': 'Копировать',
    'hash-calc.how-to-use': 'Как использовать:',
    'hash-calc.step1': 'Загрузите новое изображение на сервер',
    'hash-calc.step2': 'Скопируйте URL изображения',
    'hash-calc.step3': 'Вставьте URL в поле выше и нажмите "Рассчитать хэш"',
    'hash-calc.step4': 'Скопируйте SHA256 хэш',
    'hash-calc.step5': 'Вставьте хэш в поле <code>portrait_sha256</code> или <code>landscape_sha256</code> в promo.json',
    'hash-calc.step6': 'Запуште изменения в репозиторий',
    'strategy.title': 'Стратегия рекламной кампании',
    'strategy.geo.title': 'Гео-таргетинг',
    'strategy.geo.desc': 'Реклама показывается в зависимости от региона, страны и города пользователя. Каскадная система: /promo/{CC}/{REG}/{City}.json → /promo/{CC}/{REG}.json → /promo/{CC}.json → /promo/WORLD.json',
    'strategy.theme.title': 'Тематическое таргетирование',
    'strategy.theme.desc': 'Разные изображения для светлой и тёмной темы. Разные изображения для портретной и ландшафтной ориентации экрана.',
    'strategy.control.title': 'Контроль показа',
    'strategy.control.desc': 'Рекламодатель задаёт дату окончания показа (valid_until). Пользователь может скрыть рекламу на 24 часа. Настройки отображения кнопки рекламы (размер, позиция, текст) доступны в настройках.',
    'strategy.cache.title': 'Кэш и обновление',
    'strategy.cache.desc': 'Приложение кэширует изображения локально. При изменении хэша в promo.json — скачивает новое изображение. Это снижает трафик и ускоряет загрузку.',
    'architecture.title': 'Архитектура рекламной системы',
    'architecture.banner.desc': 'Загружает promo.json для текущей геолокации, выбирает изображение по теме и ориентации, кэширует в ImageView с помощью Coil3. Cache-busting по SHA256 хэшу.',
    'architecture.fragment.desc': 'Настройки отображения рекламы: alpha, цвет канваса, размер и позиция кнопки эмодзи. Сохраняет настройки в SharedPreferences (promo_prefs).',
    'architecture.dialog.desc': 'Показывает рекламный баннер при нажатии на кнопку эмодзи. Содержит изображение, описание и ссылку. Пользователь может перейти по ссылке или скрыть рекламу на 24 часа.',
    'architecture.viewmodel.desc': 'Управляет состоянием настроек рекламы. LiveData для emoji-текста, размера, позиции, зеркала. Сохраняет настройки в SharedPreferences.',
    'stats.title': 'Статистика загрузок',
    'stats.impressions': 'Показов рекламы',
    'stats.clicks': 'Кликов по рекламе',
    'stats.countries': 'Стран',
    'stats.regions': 'Регионов',
    'stats.how-it-works': 'Как работает счётчик:',
    'stats.how-it-works.desc': 'Приложение отправляет анонимные метрики на бесплатный счётчик (Counter.dev).<br>Данные включают: страну, регион, город, тему (light/dark), ориентацию экрана.<br>Никаких персональных данных не собирается.',
    'stats.counter.dev': 'Открыть Counter.dev'
  }
};

function getSystemLanguage() {
  // System UI language (not browser UI language preference list order tricks)
  // navigator.language reflects the OS / system locale in modern browsers
  const lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  if (lang.startsWith('ru')) return 'ru';
  return 'en';
}

function getInitialLanguage() {
  const saved = localStorage.getItem('solplatform-lang');
  if (saved === 'ru' || saved === 'en') return saved;
  return getSystemLanguage();
}

function setLanguage(lang) {
  if (!translations[lang]) lang = 'en';

  // 1. Update <html lang="..."> — important for browser translators
  document.documentElement.lang = lang;

  // 2. Persist choice
  localStorage.setItem('solplatform-lang', lang);

  // 3. Apply text translations
  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // 4. Meta tags
  document.title = t['meta.title'] || document.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && t['meta.description']) {
    metaDesc.setAttribute('content', t['meta.description']);
  }

  // 5. Show/hide language-specific blocks (e.g. SBP QR only for Russian)
  document.querySelectorAll('[data-lang-only]').forEach(el => {
    const only = el.getAttribute('data-lang-only');
    el.classList.toggle('lang-hidden', only !== lang);
  });

  // 6. Active state on language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // On advertisers.html, default to Russian
  let lang = getInitialLanguage();
  if (document.querySelector('.lang-switch')) {
    // This is advertisers.html (has language switcher)
    lang = 'ru';
  }
  
  setLanguage(lang);

  // Handle language buttons (works on both index.html and advertisers.html)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });
});
