'use client'

import Image from "next/image";
import { LogoutButton } from "./Auth/LogoutButton";
import { useAuth } from "@/app/hooks/useAuth";
import TagRole from "./TagRole";
import EditButton from "./EditButton";
import { useRouter } from 'next/navigation';

export default function HeaderUserAccount() {
    const { user } = useAuth();
    const router = useRouter();
    return (
        <section className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div
                className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 lg:w-3/4 bg-[#F3DEDE] rounded-t-[80px] rounded-b-[20px] lg:rounded-tr-[50px] lg:rounded-br-[50px] lg:rounded-l-[100px]"
            >
                <Image
                    src="icons/account_circle.svg"
                    alt="User"
                    width={120}
                    height={120}
                />
                {user && (
                    <div className="flex flex-col gap-2">
                        <span className="font-bold font-fractul text-4xl lg:text-5xl">
                            {user.displayName}
                        </span>
                        <span className="font-bold font-fractul text-xl lg:text-2xl">
                            {user.email}
                        </span>
                        <div className="flex items-center gap-2">
                            <TagRole role={user?.role || 'reader'} />
                            <p className="font-semibold font-neulisalt">Depuis {user?.createdAt?.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')}</p>
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
                    onClick={() => console.log('Edit profile clicked')}
                />
                <EditButton
                    icon="manage_accounts"
                    alt="Account Settings"
                    className="rounded-t-[20px] rounded-br-[50px] rounded-bl-[20px] w-1/2 lg:rounded-full"
                    onClick={() => router.push('/profil?settings=true')}
                />
            </div>
        </section>
    )
}