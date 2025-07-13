import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { timestamp, folder } = body;

        // Créer la chaîne à signer
        const str_to_sign = `folder=${folder}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`;

        // Générer la signature SHA-1
        const signature = crypto
            .createHash('sha1')
            .update(str_to_sign)
            .digest('hex');

        return NextResponse.json({ signature });
    } catch (error) {
        console.error('Erreur lors de la génération de la signature:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la génération de la signature' },
            { status: 500 }
        );
    }
}
