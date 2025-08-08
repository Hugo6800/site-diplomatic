import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { public_id, timestamp } = body;

        if (!public_id) {
            return NextResponse.json(
                { error: 'public_id est requis' },
                { status: 400 }
            );
        }

        // Créer la chaîne à signer pour la suppression
        const str_to_sign = `public_id=${public_id}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`;

        // Générer la signature SHA-1
        const signature = crypto
            .createHash('sha1')
            .update(str_to_sign)
            .digest('hex');

        return NextResponse.json({ signature });
    } catch (error) {
        console.error('Erreur lors de la génération de la signature de suppression:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la génération de la signature de suppression' },
            { status: 500 }
        );
    }
}
