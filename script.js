document.addEventListener('DOMContentLoaded', () => {
  const subjects = document.querySelectorAll('.subject');

  function checkPercentages() {
    const total = subjects.length;
    const completed = document.querySelectorAll('.subject.completed').length;
    const percentage = (completed / total) * 100;

    subjects.forEach(subject => {
      if (subject.classList.contains('locked') && subject.dataset.requiredPercentage) {
        const required = parseFloat(subject.dataset.requiredPercentage);
        if (percentage >= required) {
          subject.classList.remove('locked');
        }
      }
    });
  }

  subjects.forEach(subject => {
    subject.addEventListener('click', () => {
      // No hace nada si está bloqueada
      if (subject.classList.contains('locked')) return;

      // Alterna completado
      if (subject.classList.contains('completed')) {
        subject.classList.remove('completed');
      } else {
        subject.classList.add('completed');

        // Desbloquea materias ligadas directamente
        const unlocks = subject.dataset.unlocks;
        if (unlocks) {
          unlocks.split(',').forEach(id => {
            const target = document.querySelector(`.subject[data-id="${id.trim()}"]`);
            if (target) {
              target.classList.remove('locked');
            }
          });
        }
      }

      // Chequea materias que dependen de % completado
      checkPercentages();
    });
  });
});
