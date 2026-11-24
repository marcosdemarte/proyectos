import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

//const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.tsx');

const nextConfig: NextConfig = {
  /* config options here */
  // El componente de portafolio se distribuye como fuente TS (no
  // pre-compilado), asi que Next tiene que transpilarlo el mismo. Esto
  // tambien hace que Next procese los imports de imagen del paquete.
  transpilePackages: [
    "@marcosdemarte/cargar-imagenes",
  ],
};

export default withNextIntl(nextConfig);
