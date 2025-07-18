document.addEventListener('DOMContentLoaded', () => {
  const subjects = document.querySelectorAll('.subject');

  subjects.forEach(subject => {
    subject.addEventListener('click', () => {
      // Si está bloqueada, no hace nada
      if (subject.classList.contains('locked')) return;

      // Si ya está completada, la desmarca
      if (subject.classList.contains('completed')) {
        subject.classList.remove('completed');
        return;
      }

      // Marca como completada
      subject.classList.add('completed');

      // Desbloquea las materias que dependían de esta
      const unlocks = subject.dataset.unlocks;
      if (unlocks) {
        const idsToUnlock = unlocks.split(',');
        idsToUnlock.forEach(id => {
          const target = document.querySelector(`.subject[data-id="${id.trim()}"]`);
          if (target) {
            target.classList.remove('locked');
          }
        });
      }
    });
  });
});
