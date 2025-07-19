'use client';

import { useEffect, useRef, useState } from 'react';
import { initializeReadingSession, updateReadingProgress } from './readings';
import { Timestamp } from 'firebase/firestore';

interface TrackingSession {
    startTime: Date;
    lastUpdate: Date;
}

const calculateProgress = (startTime: Date, scrollPosition: number) => {
    const now = new Date();
    
    const completionPercentage = Math.min(100, Math.round(scrollPosition * 100));

    return {
        startTimestamp: Timestamp.fromDate(startTime),
        lastUpdateTimestamp: Timestamp.fromDate(now),
        totalReadTime: 0, // Sera calculé dans updateReadingProgress
        completionPercentage,
        lastPosition: scrollPosition,
        readAt: Timestamp.fromDate(now)
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
                        startTime: new Date(),
                        lastUpdate: new Date()
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
            const now = new Date();
            if (!sessionRef.current || (now.getTime() - sessionRef.current.lastUpdate.getTime() < 5000)) return;

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

        // Timer pour mettre à jour toutes les 30 secondes
        const updateTimer = setInterval(() => {
            if (!sessionRef.current) return;

            const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            const progress = calculateProgress(startTime, scrollProgress);
            updateReadingProgress(readingDocId, progress);
        }, 30000); // 30 secondes

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            const finalScroll = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            const finalProgress = calculateProgress(startTime, finalScroll);
            updateReadingProgress(readingDocId, finalProgress);
            window.removeEventListener('scroll', handleScroll);
            clearInterval(updateTimer);
        };
    }, [isTracking, readingDocId]);

    return { isTracking };
};
