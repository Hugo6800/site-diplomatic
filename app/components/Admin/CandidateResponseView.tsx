'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'

interface CandidateResponseViewProps {
    candidateId: string
}

interface CandidateData {
    name: string
    email: string
    motivation: string
    cvUrl: string
    jobId: string
    createdAt: string
}

export default function CandidateResponseView({ candidateId }: CandidateResponseViewProps) {
    const [candidate, setCandidate] = useState<CandidateData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchCandidateData() {
            if (!candidateId) return

            setLoading(true)
            try {
                const candidateRef = doc(db, 'candidates', candidateId)
                const candidateSnap = await getDoc(candidateRef)

                if (candidateSnap.exists()) {
                    const data = candidateSnap.data();
                    console.log('Données du candidat récupérées:', data);
                    console.log('URL du CV:', data.cvUrl);
                    setCandidate(data as CandidateData);
                } else {
                    setError('Candidature non trouvée');
                }
            } catch (err) {
                console.error('Erreur lors de la récupération des données du candidat:', err)
                setError('Erreur lors du chargement des données')
            } finally {
                setLoading(false)
            }
        }

        fetchCandidateData()
    }, [candidateId])

    if (loading) {
        return (
            <div className="flex justify-center items-center p-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 dark:border-white"></div>
                <span className="ml-3">Chargement...</span>
            </div>
        )
    }

    if (error || !candidate) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                <strong className="font-bold">Erreur : </strong>
                <span className="block sm:inline">{error || 'Données non disponibles'}</span>
            </div>
        )
    }

    return (
        <div className="bg-[#FDF8F8] dark:bg-gray-800 rounded-lg shadow-md p-6 mt-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-neulisalt text-[#3F3F43] dark:text-white">
                    Réponse de {candidate.name}
                </h2>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="bg-[#F3DEDE] dark:bg-gray-700 rounded-lg p-4 text-sm font-semibold text-[#3F3F43] dark:text-gray-300 mb-2">Nom</h3>
                        <p className="text-lg font-medium">{candidate.name}</p>
                    </div>

                    <div>
                        <h3 className="bg-[#F3DEDE] dark:bg-gray-700 rounded-lg p-4 text-sm font-semibold text-[#3F3F43] dark:text-gray-300 mb-2">Adresse mail</h3>
                        <p className="text-lg font-medium">{candidate.email}</p>
                    </div>
                </div>

                <div>
                    <h3 className="bg-[#F3DEDE] dark:bg-gray-700 rounded-lg p-4 text-sm font-semibold text-[#3F3F43] dark:text-gray-300 mb-2">CV</h3>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <a
                            href={candidate.cvUrl}
                            // download={`CV_${candidate.name.replace(/\s+/g, '_')}.pdf`}
                            className="flex items-center gap-2 bg-[#3F3F43] text-white px-4 py-2 rounded-md hover:bg-opacity-80"
                            onClick={(e) => {
                                e.preventDefault();
                                // Ouvrir l'URL dans un nouvel onglet
                                window.open(candidate.cvUrl, '_blank');
                            }}
                        >
                            <Image src="/icons/arrow_upload_ready.svg" alt="Télécharger" width={20} height={20} className="invert" />
                            <span>Télécharger le CV</span>
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="bg-[#F3DEDE] dark:bg-gray-700 rounded-lg p-4 text-sm font-semibold text-[#3F3F43] dark:text-gray-300 mb-2">
                        Pourquoi voulez vous travailler pour le Diplomatic Post ?
                    </h3>
                    <p className="text-lg font-medium whitespace-pre-wrap">{candidate.motivation}</p>
                </div>
            </div>
        </div>
    )
}
