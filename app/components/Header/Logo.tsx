'use client';

import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';
import LogoDark from '../../../public/Logo_blanc.png';
import LogoLight from '../../../public/Logo_diplomatic.png';

export default function Logo() {
  const { isDark } = useTheme();
  
  return (
    <Image
      src={isDark ? LogoDark : LogoLight}
      alt="Logo The Diplomatic Post"
      width={200}
      height={100}
      priority
      className="object-cover"
    />
  );
}
