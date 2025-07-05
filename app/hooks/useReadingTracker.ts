'use client';

import { useEffect, useRef, useState } from 'react';
import { initializeReadingSession, updateReadingProgress } from './readings';

interface TrackingSession {
    startTime: number;
    lastUpdate: number;
}

const calculateProgress = (startTime: number, scrollPosition: number) => {
    const now = Date.now();
    const timeSpentMs = now - startTime;
    
    // Si moins de 30 secondes se sont écoulées, on compte 1 minute
    // Si plus de 30 secondes mais moins de 5 minutes, on compte 5 minutes
    // Sinon on compte le temps réel arrondi à la minute supérieure
    let actualReadTime: number;
    if (timeSpentMs < 30000) { // moins de 30 secondes
        actualReadTime = 1;
    } else if (timeSpentMs < 300000) { // moins de 5 minutes
        actualReadTime = 5;
    } else {
        actualReadTime = Math.ceil(timeSpentMs / 1000 / 60);
    }

    const completionPercentage = Math.min(100, Math.round(scrollPosition * 100));

    return {
        actualReadTime,
        completionPercentage,
        lastPosition: scrollPosition,
        readAt: new Date()
    };
};

export const useReadingTracker = (articleId: string, userId: string | undefined) => {
    const [readingDocId, setReadingDocId] = useState<string | null>(null);
    const sessionRef = useRef<TrackingSession | null>(null);
    const [isTracking, setIsTracking] = useState(false);

    useEffect(() => {
        if (!userId || !articleId) return;

        const initSession = async () => {
            try {
                const docId = await initializeReadingSession(userId, articleId);
                if (docId) {
                    setReadingDocId(docId);
                    sessionRef.current = {
                        startTime: Date.now(),
                        lastUpdate: Date.now()
                    };
                    setIsTracking(true);
                }
            } catch (error) {
                console.error('Error initializing reading session:', error);
            }
        };

        initSession();
    }, [userId, articleId]);

    useEffect(() => {
        if (!isTracking || !readingDocId || !sessionRef.current) return;

        const startTime = sessionRef.current.startTime;

        const handleScroll = () => {
            const now = Date.now();
            if (!sessionRef.current || (now - sessionRef.current.lastUpdate < 5000)) return;

            const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            const progress = calculateProgress(startTime, scrollProgress);
            
            updateReadingProgress(readingDocId, progress);
            if (sessionRef.current) {
                sessionRef.current.lastUpdate = now;
            }
        };

        // Initial progress update
        const initialProgress = calculateProgress(startTime, 0);
        updateReadingProgress(readingDocId, initialProgress);

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            const finalScroll = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            const finalProgress = calculateProgress(startTime, finalScroll);
            updateReadingProgress(readingDocId, finalProgress);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isTracking, readingDocId]);

    return { isTracking };
};
