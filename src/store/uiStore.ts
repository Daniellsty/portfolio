import { create } from 'zustand'
import type { Project } from '../data/portfolio'

type UiState = {
  isLoaded: boolean
  isEnterClicked: boolean
  selectedProject: Project | null
  setLoaded: (value: boolean) => void
  setEnterClicked: (value: boolean) => void
  openProject: (project: Project) => void
  closeProject: () => void
}

export const useUiStore = create<UiState>((set) => ({
  isLoaded: false,
  isEnterClicked: false,
  selectedProject: null,
  setLoaded: (value) => set({ isLoaded: value }),
  setEnterClicked: (value) => set({ isEnterClicked: value }),
  openProject: (project) => set({ selectedProject: project }),
  closeProject: () => set({ selectedProject: null }),
}))
