import { useEffect } from 'react'
import { useUiStore } from '../../store/uiStore'

export function ProjectModal() {
  const selectedProject = useUiStore((s) => s.selectedProject)
  const closeProject = useUiStore((s) => s.closeProject)

  useEffect(() => {
    if (!selectedProject) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProject()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedProject, closeProject])

  if (!selectedProject) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-[#4a3f6b]/55"
        onClick={closeProject}
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 p-6 pb-4">
          <h2 className="text-xl leading-snug font-bold text-gray-900 md:text-2xl">{selectedProject.title}</h2>
          <button
            type="button"
            onClick={closeProject}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="relative mx-6 overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={selectedProject.image}
            alt={selectedProject.title}
            width={960}
            height={540}
            className="aspect-video w-full object-cover"
          />
          {selectedProject.hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7 text-gray-800">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <p className="p-6 text-sm leading-relaxed text-gray-600 md:text-base">{selectedProject.description}</p>

        <div className="flex flex-wrap gap-2 px-6 pb-6">
          {selectedProject.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#5963b2] px-3 py-1.5 text-xs font-medium text-white">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
