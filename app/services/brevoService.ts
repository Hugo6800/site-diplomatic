/**
 * Service pour gérer les interactions avec l'API Brevo (anciennement Sendinblue)
 */

/**
 * Ajoute un contact à la liste de newsletter Brevo
 * @param email - Email du contact à ajouter
 * @param firstName - Prénom du contact
 * @param lastName - Nom du contact
 * @param listId - ID de la liste Brevo (optionnel, utilise la liste par défaut si non spécifié)
 * @returns Promise avec le résultat de l'opération
 */
export async function addContactToBrevoList(
  email: string,
  firstName?: string,
  lastName?: string,
  listId: number = 4 // ID de liste par défaut, à ajuster selon votre configuration Brevo
): Promise<{ success: boolean; message: string }> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;
    
    if (!apiKey) {
      console.error('Clé API Brevo non définie');
      return { success: false, message: 'Configuration API manquante' };
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName || '',
          LASTNAME: lastName || '',
        },
        listIds: [listId],
        updateEnabled: true, // Met à jour le contact s'il existe déjà
      }),
    });

    if (response.ok) {
      return { success: true, message: 'Contact ajouté avec succès à la newsletter' };
    } else {
      const errorData = await response.json();
      console.error('Erreur Brevo:', errorData);
      return { 
        success: false, 
        message: `Erreur lors de l'ajout du contact: ${errorData.message || 'Erreur inconnue'}` 
      };
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du contact à Brevo:', error);
    return { success: false, message: 'Erreur lors de la communication avec le service de newsletter' };
  }
}

/**
 * Supprime un contact de la liste de newsletter Brevo
 * @param email - Email du contact à supprimer
 * @returns Promise avec le résultat de l'opération
 */
export async function removeContactFromBrevoList(
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;
    
    if (!apiKey) {
      console.error('Clé API Brevo non définie');
      return { success: false, message: 'Configuration API manquante' };
    }

    // Encoder l'email pour l'URL
    const encodedEmail = encodeURIComponent(email);
    
    const response = await fetch(`https://api.brevo.com/v3/contacts/${encodedEmail}`, {
      method: 'DELETE',
      headers: {
        'api-key': apiKey,
      },
    });

    if (response.ok) {
      return { success: true, message: 'Contact supprimé avec succès de la newsletter' };
    } else {
      const errorData = await response.json();
      console.error('Erreur Brevo:', errorData);
      return { 
        success: false, 
        message: `Erreur lors de la suppression du contact: ${errorData.message || 'Erreur inconnue'}` 
      };
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du contact de Brevo:', error);
    return { success: false, message: 'Erreur lors de la communication avec le service de newsletter' };
  }
}

/**
 * Met à jour le statut d'abonnement d'un contact dans Brevo
 * @param email - Email du contact
 * @param subscribe - True pour s'abonner, false pour se désabonner
 * @param firstName - Prénom du contact (optionnel)
 * @param lastName - Nom du contact (optionnel)
 * @returns Promise avec le résultat de l'opération
 */
export async function updateBrevoSubscriptionStatus(
  email: string,
  subscribe: boolean,
  firstName?: string,
  lastName?: string
): Promise<{ success: boolean; message: string }> {
  if (subscribe) {
    return addContactToBrevoList(email, firstName, lastName);
  } else {
    return removeContactFromBrevoList(email);
  }
}
