// Пока просто заглушка.
// Позже сюда можно добавить автоматическое получение
// последней версии из GitHub API.

document.querySelectorAll('.btn-download').forEach(btn => {
  btn.addEventListener('click', () => {
    // Можно добавить аналитику или проверку
    console.log('Download clicked:', btn.id);
  });
});