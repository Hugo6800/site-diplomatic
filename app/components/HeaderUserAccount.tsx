'use client'

import { useRouter } from 'next/navigation';
import Image from "next/image";
import { LogoutButton } from "./Auth/LogoutButton";
import { useAuth } from "@/app/hooks/useAuth";

import EditButton from "./EditButton";
import { useUserPreferences } from "../context/UserPreferencesContext";
import TagRole from "./TagRole";

export default function HeaderUserAccount() {
    const router = useRouter();
    const { user } = useAuth();
    const { showEmail, showStatus, showAccountAge } = useUserPreferences();

    return (
        <section className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div
                className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 flex-1 bg-[#F3DEDE] rounded-t-[80px] rounded-b-[20px] lg:rounded-tr-[50px] lg:rounded-br-[50px] lg:rounded-l-[100px]"
            >
                <Image
                    src={user?.photoURL || '/icons/account_circle.svg'}
                    alt="User"
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                />
                {user && (
                    <div className="flex flex-col gap-2">
                        <p className="font-bold font-fractul text-4xl lg:text-5xl">{user?.displayName}</p>
                        {showEmail && <p className="font-bold font-fractul text-xl lg:text-2xl">{user?.email}</p>}
                        <div className="flex items-center gap-2">
                            {showStatus && <TagRole role={user?.role || 'reader'} />}
                            {showAccountAge && (
                                <p className="font-semibold font-neulisalt">
                                    Depuis {new Date(user?.metadata?.creationTime || '').toLocaleDateString('fr-FR')}
                                </p>
                            )}
                        </div>
                    </div>
                )}
                <LogoutButton />
            </div>
            <div className="flex items-stretch h-20 lg:h-40 gap-2">
                <EditButton
                    icon="person_edit"
                    alt="Edit Profile"
                    className="rounded-t-[20px] rounded-br-[20px] rounded-bl-[50px] w-1/2 lg:rounded-full"
                    onClick={() => router.push('/profil?editprofil=true')}
                />
                <EditButton
                    icon="manage_accounts"
                    alt="Account Settings"
                    className="rounded-t-[20px] rounded-br-[50px] rounded-bl-[20px] w-1/2 lg:rounded-full"
                    onClick={() => router.push('/profil?settings=true')}
                />
                {user?.role === 'admin' && (
                    <EditButton
                        icon="admin_panel_settings"
                        alt="Admin Settings"
                        className="rounded-t-[20px] rounded-br-[50px] rounded-bl-[20px] w-1/2 lg:rounded-full"
                        onClick={() => router.push('/admin')}
                    />
                )}
            </div>
        </section>
    )
}