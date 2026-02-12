import { cookies } from 'next/headers';

export async function getServerLang() {
  const cookieStore = await cookies();
  return (await cookieStore).get('i18next')?.value || 'en';
}