'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserReadHistory } from '@/app/hooks/readings';
import { getColorCircle } from '@/app/utils/category-styles';
import Article from '../ArticleOthers';
import Image from 'next/image';
import { ArticleData } from '../../hooks/readings';
import { useSimplePagination } from '@/app/hooks/useSimplePagination';

export default function HistoryReadSection() {
    const { user } = useAuth();
    const [readArticles, setReadArticles] = useState<ArticleData[]>([]);

    useEffect(() => {
        const fetchReadArticles = async () => {
            if (!user) return;

            try {
                const articles = await getUserReadHistory(user.uid);
                setReadArticles(articles);
            } catch (error) {
                console.error('Error fetching read history:', error);
            }
        };

        fetchReadArticles();
    }, [user]);

    // Utiliser le hook de pagination
    const { 
        currentItems: currentArticles, 
        nextPage, 
        hasMorePages: hasMoreArticles,
        currentPage,
        totalPages
    } = useSimplePagination(readArticles, { itemsPerPage: 6 });
    
    if (!user) {
        return null;
    }

    return (
        <section className="mt-12">
            <div className="flex justify-between items-center gap-2">
                <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#433D3D] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-[#EECECE] w-fit">Histoire de lecture</h2>
                {hasMoreArticles && (
                    <div 
                        className="bg-[#F3DEDE] rounded-full p-2 cursor-pointer hover:bg-[#e6c8c8] transition-colors"
                        onClick={nextPage}
                        title={`Page ${currentPage + 1} sur ${totalPages}`}
                    >
                        <Image
                            src="/icons/chevron-right.svg"
                            alt="Voir plus d'articles"
                            width={24}
                            height={24}
                        />
                    </div>
                )}
            </div>
            {readArticles.length === 0 ? (
                <div className="py-4 text-gray-500 font-neulisalt text-lg dark:text-[#EECECE]">
                    Pas d&apos;articles lus
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentArticles.map((article) => (
                        <Article
                            key={article.id}
                            id={article.id}
                            name={article.category}
                            className={`tag-${article.category.toLowerCase()}`}
                            colorCircle={getColorCircle(article.category)}
                            author={article.author}
                            title={article.title}
                            date={article.date}
                            imageUrl={article.coverImage}
                        />
                    ))}
                </div>
            )}
            {hasMoreArticles && (
                <div className="flex justify-center mt-4">
                    <p className="text-sm text-gray-500 font-neulisalt">
                        Page {currentPage + 1} sur {totalPages}
                    </p>
                </div>
            )}
        </section>
    );
}