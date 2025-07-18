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
      if (subject.classList.contains('locked')) return;

      // Marca o desmarca como completada
      if (subject.classList.contains('completed')) {
        subject.classList.remove('completed');
      } else {
        subject.classList.add('completed');

        // Desbloquea materias que dependen de esta
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

      // Revisa si se desbloquea alguna por porcentaje
      checkPercentages();
    });
  });
});
