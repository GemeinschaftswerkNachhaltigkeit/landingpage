export const useTrackMenu = (attribute = 'data-track-menu') => {
  const currentSection = ref('');
  let observer = null;

  function isActive(id) {
    return id === currentSection.value;
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentSection.value = entry.target.getAttribute('id');
          }
        });
      },
      {
        rootMargin: '-100px 0px -100px 0px',
      }
    );
    document
      .querySelectorAll(`[${attribute}]`)
      .forEach((el) => observer.observe(el));
  });

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    currentSection: currentSection,
    isActive: isActive,
  };
};
