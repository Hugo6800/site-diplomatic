import Image from "next/image";

export default function User() {
    return (
        <div className="flex items-center gap-4 bg-gray rounded-3xl p-2">
            <Image
                src="icons/account_circle.svg"
                alt="User"
                width={40}
                height={40}
            />
            {/* <Image
                src="/Logo_user.png"
                alt="User"
                width={40}
                height={40}
            />
            <p className="font-bold">S4W6 Design</p> */}
        </div>
    );
}