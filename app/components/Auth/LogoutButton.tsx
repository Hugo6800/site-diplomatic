
import { signOut } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

export function LogoutButton() {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  return (
    <button onClick={handleLogout} className="text-sm text-red-500 hover:underline flex justify-start">
      Se déconnecter
    </button>
  );
}