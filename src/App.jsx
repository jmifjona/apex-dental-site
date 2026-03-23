<header className="sticky top-0 z-50 border-b border-white/10 bg-[#2b2b2b]/90 backdrop-blur-xl">
  <div className="mx-auto max-w-7xl px-4 py-3 md:px-6 lg:px-8">
    <div className="flex items-center justify-between">
      <Link to="/" className="flex min-w-0 items-center gap-3 text-left">
        <img
          src={branding.logo}
          alt="Apex Dental logo"
          className="h-10 w-auto shrink-0 object-contain md:h-12"
        />
        <div className="min-w-0">
          <p className="truncate text-base font-semibold tracking-[0.04em] text-white md:text-xl">
            Apex Dental
          </p>
          <p className="hidden text-[10px] uppercase tracking-[0.28em] text-cyan-300/90 sm:block md:text-[11px] md:tracking-[0.38em]">
            Digital Dentistry · Malta
          </p>
        </div>
      </Link>

      <a
        href="https://wa.me/35679854037"
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] md:px-5 md:py-2.5"
      >
        <Phone className="h-4 w-4" />
        <span className="hidden sm:inline">Book Appointment</span>
        <span className="sm:hidden">Book</span>
      </a>
    </div>

    <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
      {[
        ['/', 'Home'],
        ['/dental-implants-malta', 'Implants'],
        ['/clear-aligners-malta', 'Aligners'],
        ['/cosmetic-dentistry-malta', 'Cosmetic'],
        ['/emergency-dentist-malta', 'Emergency'],
        ['/price-list', 'Prices'],
        ['/about', 'About'],
        ['/contact', 'Contact'],
      ].map(([path, label]) => (
        <Link
          key={path}
          to={path}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
            location.pathname === path
              ? 'bg-cyan-300 text-slate-950'
              : 'border border-white/10 bg-white/5 text-white/80 hover:text-white'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>

    <nav className="hidden items-center gap-5 pt-3 text-sm lg:flex">
      {[
        ['/', 'Home'],
        ['/dental-implants-malta', 'Implants'],
        ['/clear-aligners-malta', 'Aligners'],
        ['/cosmetic-dentistry-malta', 'Cosmetic'],
        ['/emergency-dentist-malta', 'Emergency'],
        ['/price-list', 'Price List'],
        ['/about', 'About'],
        ['/contact', 'Contact'],
      ].map(([path, label]) => (
        <Link
          key={path}
          to={path}
          className={`transition ${
            location.pathname === path
              ? 'text-white'
              : 'text-white/70 hover:text-white'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  </div>
</header>
