'use client'

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface JobApplicationFormProps {
    jobId?: string;
}

export default function JobApplicationForm({ jobId }: JobApplicationFormProps) {
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        cv: null as File | null,
        motivation: '',
        jobId: jobId || searchParams.get('jobId') || ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                cv: e.target.files![0]
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            setSubmitSuccess(true);
            
            // Reset form after successful submission
            setTimeout(() => {
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    cv: null,
                    motivation: '',
                    jobId: formData.jobId // Keep the job ID
                });
                setSubmitSuccess(false);
            }, 3000);
        }, 1000);
        
        // Later this will be replaced with actual EmailJS integration
    };

    return (
        <div className="bg-[#F9F1F1] dark:bg-[#1E1E1E] rounded-3xl p-6 md:p-8 w-full max-w-3xl mx-auto">
            {submitSuccess ? (
                <div className="text-center py-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-100 dark:bg-green-900 rounded-full p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="font-bold font-fractul text-2xl mb-2 dark:text-white">Candidature envoyée !</h3>
                    <p className="text-gray-600 dark:text-gray-300">Nous vous contacterons prochainement.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input type="hidden" name="jobId" value={formData.jobId} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Nom
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F3DEDE]"
                            />
                        </div>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Prénom
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F3DEDE]"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Adresse mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F3DEDE]"
                        />
                    </div>

                    <div>
                        <label htmlFor="cv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            CV
                        </label>
                        <div className="relative border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 px-4 py-2">
                            <input
                                type="file"
                                id="cv"
                                name="cv"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                required
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 dark:text-gray-400">
                                    {formData.cv ? formData.cv.name : 'Choisir un fichier'}
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Pourquoi voulez vous travailler pour le Diplomatic Post ?
                        </label>
                        <textarea
                            id="motivation"
                            name="motivation"
                            value={formData.motivation}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F3DEDE]"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center justify-center px-6 py-3 bg-[#F3DEDE] dark:bg-[#2D2D2D] text-gray-900 dark:text-white font-bold font-neulisalt rounded-xl hover:bg-[#EAC7C7] dark:hover:bg-[#3D3D3D] transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Envoi en cours...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    Envoyer
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
