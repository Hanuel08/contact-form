import { IconMoonStars, IconSunHigh, IconArrowDown, IconListCheck } from "@tabler/icons-react"

export function Header({ theme, onToggleTheme, onGoToForm, onGoToContacts }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 dark:border-white/10 bg-white/70 dark:bg-slate-950/60 backdrop-blur supports-backdrop-filter:bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-600/20 ring-1 ring-white/30">
              <span className="text-white font-extrabold text-lg">C</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-slate-50 truncate">
                Contacts CRUD
              </h1>
              <p className="hidden sm:block text-xs text-slate-600 dark:text-slate-400 truncate">
                Gestión rápida de contactos, responsive y con modo dark
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onGoToForm}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 ring-1 ring-slate-200/70 dark:ring-white/10"
              aria-label="Ir al formulario"
            >
              <IconArrowDown size={18} />
              Formulario
            </button>

            <button
              type="button"
              onClick={onGoToContacts}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 ring-1 ring-slate-200/70 dark:ring-white/10"
              aria-label="Ir a contactos"
            >
              <IconListCheck size={18} />
              Contactos
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 ring-1 ring-slate-200/70 dark:ring-white/10 text-slate-800 dark:text-slate-100"
              aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
            >
              {theme === "dark" ? <IconSunHigh size={18} /> : <IconMoonStars size={18} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}