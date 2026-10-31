const translations = {
  en: {
    'nav.apps': 'Apps',
    'nav.about': 'About',
    'nav.donate': 'Support',
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
    'meta.description': 'Download SolSIP and SolAgent — open-source Android apps'
  },
  ru: {
    'nav.apps': 'Приложения',
    'nav.about': 'О проекте',
    'nav.donate': 'Поддержать',
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
    'meta.description': 'Скачайте SolSIP и SolAgent — открытые Android-приложения'
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
    el.hidden = only !== lang;
  });

  // 6. Active state on language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = getInitialLanguage();
  setLanguage(lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });
});
