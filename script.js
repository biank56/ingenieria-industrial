document.addEventListener('DOMContentLoaded', () => {
  const subjects = document.querySelectorAll('.subject');

  // Función que revisa si ya alcanzaste el % requerido para desbloquear materias especiales
  function checkPercentages() {
    const total = subjects.length;
    const completed = document.querySelectorAll('.subject.completed').length;
    const percentage = (completed / total) * 100;

    subjects.forEach(subj => {
      if (subj.classList.contains('locked') && subj.dataset.requiredPercentage) {
        const required = parseFloat(subj.dataset.requiredPercentage);
        if (percentage >= required) {
          subj.classList.remove('locked');
        }
      }
    });
  }

  subjects.forEach(subject => {
    subject.addEventListener('click', () => {
      // Si está bloqueada no hace nada
      if (subject.classList.contains('locked')) return;

      // Si ya está completada, la desmarca
      if (subject.classList.contains('completed')) {
        subject.classList.remove('completed');
      } else {
        // Marca como completada
        subject.classList.add('completed');

        // Desbloquea materias que dependían directamente de esta
        const unlocks = subject.dataset.unlocks;
        if (unlocks) {
          unlocks.split(',').forEach(id => {
            const target = document.querySelector(`.subject[data-id="${id.trim()}"]`);
            if (target) target.classList.remove('locked');
          });
        }
      }

      // Verificamos materias que dependen de % del plan
      checkPercentages();
    });
  });
});
