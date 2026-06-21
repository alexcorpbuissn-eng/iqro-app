import Link from 'next/link';

export function IqroLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'text-xl px-3 py-1',
    md: 'text-2xl px-4 py-1.5',
    lg: 'text-5xl px-8 py-3',
  };

  return (
    <Link href="/" className="inline-block">
      <span
        className={`font-cormorant font-semibold text-white bg-[#C0181B] rounded-md tracking-widest ${sizeClasses[size]}`}
        style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.15em' }}
      >
        IQRO
      </span>
    </Link>
  );
}
