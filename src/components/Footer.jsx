import { IconArrowUp, IconFileDownload, IconListCheck, IconPencil } from "@tabler/icons-react"

export function Footer({ onGoToTop, onGoToForm, onGoToContacts }) {
  const exportPlaceholder = () => {
    // Funcionalidad útil sin acoplarse al estado: exporta un "snapshot" del DOM.
    // Si luego quieres exportar contactos reales, lo conectamos con `data` desde Main/App.
    const payload = {
      exportedAt: new Date().toISOString(),
      app: "contact-form",
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "contact-form-export.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <footer className="mt-12 border-t border-slate-200/70 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Contacts CRUD
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              React + Tailwind, responsive y con modo dark.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onGoToForm}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 ring-1 ring-slate-200/70 dark:ring-white/10"
            >
              <IconPencil size={18} />
              Formulario
            </button>
            <button
              type="button"
              onClick={onGoToContacts}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 ring-1 ring-slate-200/70 dark:ring-white/10"
            >
              <IconListCheck size={18} />
              Contactos
            </button>
            <button
              type="button"
              onClick={exportPlaceholder}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 ring-1 ring-slate-200/70 dark:ring-white/10"
              title="Descargar un export (placeholder)"
            >
              <IconFileDownload size={18} />
              Exportar
            </button>
            <button
              type="button"
              onClick={onGoToTop}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 ring-1 ring-slate-200/70 dark:ring-white/10"
            >
              <IconArrowUp size={18} />
              Arriba
            </button>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-500 dark:text-slate-500">
          © {new Date().getFullYear()} — Hecho para gestionar contactos.
        </div>
      </div>
    </footer>
  )
}

