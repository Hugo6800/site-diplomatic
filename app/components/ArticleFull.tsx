'use client'

import Image from 'next/image';
import TagArticle from './TagArticle';
import { ArticleFullProps } from '../types/articleFullProps';
import TagAddFavoriteArticle from './TagAddFavoriteArticle';
import TagShareArticle from './TagShareArticle';
import TagEditorArticle from './TagEditorArticle';
import Advertising from "./Advertising";
import { useAuth } from '../hooks/useAuth';
import { useReadingTracker } from '../hooks/useReadingTracker';
import { Fragment } from 'react';

function splitContentIntoSections(content: string): string[] {
    // Créer un élément div temporaire pour parser le HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    const sections: string[] = [];
    let currentSection = '';

    // Parcourir tous les éléments de premier niveau
    tempDiv.childNodes.forEach((node) => {
        if (node.nodeName === 'H2') {
            // Si on trouve un H2 et qu'on a déjà du contenu, on sauvegarde la section actuelle
            if (currentSection) {
                sections.push(currentSection);
                currentSection = '';
            }
        }
        // Ajouter le nœud à la section courante
        if (node instanceof Element) {
            currentSection += node.outerHTML;
        } else if (node instanceof Text) {
            currentSection += node.textContent;
        }
    });

    // Ajouter la dernière section
    if (currentSection) {
        sections.push(currentSection);
    }

    return sections;
}

export default function ArticleFull({ id, category, title, authorName, date, imageUrl, content }: ArticleFullProps) {
    const { user } = useAuth();

    useReadingTracker(id, user?.uid);
    return (
        <article className="">
            <header className="mb-8">
                <div className="relative w-full aspect-[16/9] mb-8">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover rounded-4xl"
                        priority
                    />
                </div>
            </header>
            <div className="flex gap-2 mb-4">
                <TagAddFavoriteArticle articleId={id} />
                <TagShareArticle />
                {user?.role === 'journalist' || user?.role === 'admin' && user?.displayName === authorName && <TagEditorArticle articleId={id} />}
            </div>
            <div className="flex items-center gap-4">
                <TagArticle
                    name={category || 'default'}
                    className={`text-tag-${category ? category.toLowerCase() : 'default'} border-2 border-tag-${category ? category.toLowerCase() : 'default'} transition-colors`}
                />
                <div className="flex items-center gap-4 text-black font-semibold dark:text-[#EECECE]">
                    <span>{authorName}</span>
                    <span>-</span>
                    <time>{date}</time>
                </div>
            </div>
            <h1 className="font-bold font-fractul text-2xl md:text-4xl mt-6 mb-11 tracking-[0.03em] leading-[110%] dark:text-[#F4DFDF]">
                {title}
            </h1>

            <div className="flex flex-col gap-8">
                {splitContentIntoSections(content).map((section, index) => (
                    <Fragment key={index}>
                        <div
                            className="dark:text-[#F4DFDF] prose prose-lg max-w-none prose-headings:font-fractul prose-headings:font-bold prose-p:font-neulisalt prose-h2:text-lg lg:prose-h2:text-2xl xl:prose-h2:text-3xl prose-p:text-lg prose-p:leading-relaxed dark:prose-h2:text-[#F4DFDF]"
                            dangerouslySetInnerHTML={{ __html: section }}
                        />
                        {(index === Math.floor(splitContentIntoSections(content).length * 0.25) || 
                          index === Math.floor(splitContentIntoSections(content).length * 0.6)) && (
                            <Advertising />
                        )}
                    </Fragment>
                ))}
            </div>
        </article>
    );
}
