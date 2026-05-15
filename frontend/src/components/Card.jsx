function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

export function Card({
  className,
  children,
  glass = false,
  hover = false,
  ...props
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-zinc-800 bg-zinc-900/90 text-white shadow-lg',
        
        glass && 'backdrop-blur-xl bg-white/5',

        hover && 'hover:bg-zinc-800/80 transition-all duration-300',

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('border-b border-zinc-800 px-6 pb-4 pt-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h2 className={cn('text-lg font-semibold leading-none', className)} {...props}>
      {children}
    </h2>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('mt-2 text-sm text-zinc-400', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  );
}
