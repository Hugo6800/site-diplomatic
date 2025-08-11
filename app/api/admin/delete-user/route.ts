import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/app/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification de l'utilisateur
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Extraire le token
    const token = authHeader.split('Bearer ')[1];
    
    // Vérifier le token
    const decodedToken = await adminAuth.verifyIdToken(token);
    const adminUid = decodedToken.uid;
    
    // Vérifier si l'utilisateur est un administrateur
    const adminDoc = await adminDb.collection('users').doc(adminUid).get();
    if (!adminDoc.exists || adminDoc.data()?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Accès refusé' },
        { status: 403 }
      );
    }
    
    // Récupérer l'ID de l'utilisateur à supprimer
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json(
        { error: 'ID utilisateur requis' },
        { status: 400 }
      );
    }
    
    // Supprimer l'utilisateur de Firebase Authentication
    await adminAuth.deleteUser(userId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'utilisateur' },
      { status: 500 }
    );
  }
}