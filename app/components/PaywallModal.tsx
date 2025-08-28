'use client'

import CardPlansUnique from './CardPlansUnique';

export default function PaywallModal() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-1/2">
                    <h2 className="text-2xl font-fractul font-bold mb-4">Soutenez The Diplomatic Post !</h2>
                    <p className="mb-4 font-neulisalt">
                        L&apos;accès de cet article est soumis à un payment de 4 €. Cette méthode nous sert à financer notre entreprise indépendante. Merci à ceux qui nous soutiennent !
                    </p>
                </div>
                <div className="rotate-3">
                    <CardPlansUnique />
                </div>
            </div>
        </div>
    );
}
