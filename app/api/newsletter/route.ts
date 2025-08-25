import { NextRequest, NextResponse } from 'next/server';
import { addContactToBrevoList, removeContactFromBrevoList } from '@/app/services/brevoService';

/**
 * Gère les requêtes POST pour ajouter un contact à la newsletter
 */
export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email requis' },
        { status: 400 }
      );
    }

    const result = await addContactToBrevoList(email, firstName, lastName);

    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout à la newsletter:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * Gère les requêtes DELETE pour supprimer un contact de la newsletter
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email requis' },
        { status: 400 }
      );
    }

    const result = await removeContactFromBrevoList(email);

    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la newsletter:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
