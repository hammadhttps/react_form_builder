 import { create } from 'zustand';

interface FormField {
  id: string;
  type: 'text' | 'number' | 'password' | 'date' | 'file' | 'textarea' | 'select' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  value?: string | number | boolean | string[];
}

interface FormStore {
  formfields: FormField[];
  addField: (field: FormField) => void;
  removeField: (id: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  resetFromFields: () => void;
}

const useFormStore = create<FormStore>((set) => ({
  formfields: [],
  addField: (field) => set((state) => ({ formfields: [...state.formfields, field] })),
  removeField: (id) => set((state) => ({ formfields: state.formfields.filter(f => f.id !== id) })),
  updateField: (id, updates) => set((state) => ({
    formfields: state.formfields.map(f => f.id === id ? { ...f, ...updates } : f)
  })),
  resetFromFields: () => set({ formfields: [] })
}));

export default useFormStore;