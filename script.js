// Позже можно добавить автоматическое получение
// последней версии из GitHub API.

document.querySelectorAll('.btn-download').forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('Download clicked:', btn.id);
  });
});
