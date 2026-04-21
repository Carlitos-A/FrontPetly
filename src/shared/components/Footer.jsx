import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black/30 backdrop-blur border-t border-white/10 px-1">
      <div className="max-w-7xl mx-auto pt-0 pb-1 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-white/60">

        {/* Izquierda */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <p>© 2026 Petly. All rights reserved.</p>

          <a
            href="#"
            className="hover:text-white transition-colors sm:border-l sm:border-white/20 sm:pl-4"
          >
            Trademark Policy
          </a>
        </div>

        {/* Derecha (iconos) */}
        <div className="flex items-center gap-6 text-white/50">
          
          {/* GitHub */}
          <a
            href="https://github.com/Carlitos-A"
            className="hover:text-white transition-colors"
          >
            <span className="sr-only">GitHub</span>
            <svg width="24" height="24" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577
                0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756
                -1.09-.745.082-.729.082-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998
                .108-.776.418-1.305.76-1.605-2.665-.305-5.466-1.334-5.466-5.93
                0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23
                .96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.28-1.552 3.285-1.23 3.285-1.23
                .645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22
                0 4.61-2.805 5.62-5.475 5.92.435.375.825 1.11.825 2.24
                0 1.62-.015 2.925-.015 3.32 0 .315.21.69.825.57C20.565 21.795 24 17.297 24 12
                24 5.373 18.627 0 12 0Z"
              />
            </svg>
          </a>

          {/* Discord */}
          <a
            href="#"
            className="hover:text-white transition-colors"
          >
            <span className="sr-only">Discord</span>
            <svg width="24" height="24" fill="currentColor">
              <path d="M9.5 10.5c-.7 0-1.3.6-1.3 1.3 0 .7.6 1.3 1.3 1.3.7 0 1.3-.6 1.3-1.3 0-.7-.6-1.3-1.3-1.3Z" />
              <path d="M14.5 10.5c-.7 0-1.3.6-1.3 1.3 0 .7.6 1.3 1.3 1.3.7 0 1.3-.6 1.3-1.3 0-.7-.6-1.3-1.3-1.3Z" />
              <path d="M20 0H4C1.8 0 0 1.8 0 4v14c0 2.2 1.8 4 4 4h13l-1-3 2 1.5 2 1.5V4c0-2.2-1.8-4-4-4Z" />
            </svg>
          </a>

        </div>
      </div>
    </footer>
  );
}