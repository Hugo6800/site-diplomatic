'use client'

import Image from 'next/image';
import { useUserPreferences } from '../context/UserPreferencesContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { useProfilePicture } from '../hooks/useProfilePicture';

export default function EditProfil() {
    const router = useRouter();
    const { user } = useAuth();
    const { showEmail, showStatus, showAccountAge, toggleEmail, toggleStatus, toggleAccountAge } = useUserPreferences();
    const { uploading, fileInputRef, handleProfilePictureUpload } = useProfilePicture(user);

    return (
        <section className="flex flex-col gap-8 p-8 max-w-4xl mx-auto font-neulisalt">
            <button
                onClick={() => router.push('/profil')}
                className="flex justify-center items-center gap-2 w-1/4 px-2 py-4 bg-[#F3DEDE] rounded-full font-semibold font-neulisalt cursor-pointer"
            >
                <Image
                    src="/icons/arrow-left.svg"
                    alt="Retour"
                    width={24}
                    height={24}
                />
                Retour au compte
            </button>

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between py-2">
                    <p>Photo de profil</p>
                    <div className="relative w-16 h-16">
                        <Image
                            src={user?.photoURL || '/icons/account_circle.svg'}
                            alt="User"
                            width={60}
                            height={60}
                            className="rounded-full object-cover"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleProfilePictureUpload(file);
                            }}
                        />
                        <button
                            className={`absolute bottom-0 -right-2 bg-white rounded-full p-1 shadow ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                        >
                            <Image
                                src="/icons/pencil.svg"
                                alt="Modifier la photo"
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between py-2">
                    <span className="text-gray-700">Afficher l&apos;adresse email</span>
                    <button
                        onClick={toggleEmail}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showEmail ? 'bg-gray border-0' : 'bg-white border-2 border-black'}`}
                    >
                        <span className="sr-only">Afficher l&apos;adresse email</span>
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${showEmail ? 'translate-x-5' : 'translate-x-1'}`}
                        />
                    </button>
                </div>

                <div className="flex items-center justify-between py-2">
                    <span className="text-gray-700">Afficher le statut</span>
                    <button
                        onClick={toggleStatus}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showStatus ? 'bg-gray border-0' : 'bg-white border-2 border-black'}`}
                    >
                        <span className="sr-only">Afficher le statut</span>
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${showStatus ? 'translate-x-5' : 'translate-x-1'}`}
                        />
                    </button>
                </div>

                <div className="flex items-center justify-between py-2">
                    <span className="text-gray-700">Afficher l&apos;âge du compte</span>
                    <button
                        onClick={toggleAccountAge}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showAccountAge ? 'bg-gray border-0' : 'bg-white border-2 border-black'}`}
                    >
                        <span className="sr-only">Afficher l&apos;âge du compte</span>
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${showAccountAge ? 'translate-x-5' : 'translate-x-1'}`}
                        />
                    </button>
                </div>
            </div>
        </section>
    )
}