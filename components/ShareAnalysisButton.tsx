'use client';

import { useState } from 'react';
import { Share2, Download, Copy, Check } from 'lucide-react';
import { PoissonPrediction } from '@/lib/types';
import {
  downloadShareImage,
  shareImage,
  copyImageToClipboard,
  ShareImageData,
} from '@/lib/image-share';
import { BottomSheet, useBottomSheet } from './BottomSheet';

interface ShareAnalysisButtonProps {
  homeTeam: string;
  awayTeam: string;
  prediction: PoissonPrediction;
  competition: string;
}

export function ShareAnalysisButton({
  homeTeam,
  awayTeam,
  prediction,
  competition,
}: ShareAnalysisButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isOpen, open, close } = useBottomSheet();

  const shareData: ShareImageData = {
    homeTeam,
    awayTeam,
    predictedHomeGoals: prediction.homeGoals,
    predictedAwayGoals: prediction.awayGoals,
    confidence: prediction.confidence,
    competition,
  };

  const handleShare = async () => {
    setIsLoading(true);
    try {
      await shareImage(shareData);
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsLoading(false);
      close();
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      await downloadShareImage(shareData);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsLoading(false);
      close();
    }
  };

  const handleCopy = async () => {
    setIsLoading(true);
    try {
      const success = await copyImageToClipboard(shareData);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Copy failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={open}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-black font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
      >
        <Share2 className="w-4 h-4" />
        Partager
      </button>

      <BottomSheet isOpen={isOpen} onClose={close} title="Partager l'analyse">
        <div className="space-y-3">
          {/* Preview */}
          <div className="mb-4 p-4 bg-background rounded-xl border border-border-dark">
            <p className="text-xs text-gray-400 mb-2">Aperçu (9:16)</p>
            <div className="bg-black rounded-lg aspect-[9/16] flex items-center justify-center">
              <div className="text-center">
                <p className="text-accent font-bold text-lg mb-2">APEX</p>
                <p className="text-white text-2xl font-bold mb-2">
                  {Math.round(prediction.homeGoals)} - {Math.round(prediction.awayGoals)}
                </p>
                <p className="text-sm text-gray-400">{prediction.confidence}% confiance</p>
              </div>
            </div>
          </div>

          {/* Share options */}
          <button
            onClick={handleShare}
            disabled={isLoading}
            className="w-full flex items-center gap-3 p-3 bg-card-bg border border-border-dark rounded-lg hover:border-accent/50 transition-colors disabled:opacity-50"
          >
            <Share2 className="w-5 h-5 text-accent" />
            <div className="text-left">
              <p className="text-sm font-medium text-white">Partager nativement</p>
              <p className="text-xs text-gray-400">WhatsApp, Instagram, etc.</p>
            </div>
          </button>

          <button
            onClick={handleDownload}
            disabled={isLoading}
            className="w-full flex items-center gap-3 p-3 bg-card-bg border border-border-dark rounded-lg hover:border-accent/50 transition-colors disabled:opacity-50"
          >
            <Download className="w-5 h-5 text-accent" />
            <div className="text-left">
              <p className="text-sm font-medium text-white">Télécharger</p>
              <p className="text-xs text-gray-400">Enregistrer sur l'appareil</p>
            </div>
          </button>

          <button
            onClick={handleCopy}
            disabled={isLoading}
            className="w-full flex items-center gap-3 p-3 bg-card-bg border border-border-dark rounded-lg hover:border-accent/50 transition-colors disabled:opacity-50"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="text-sm font-medium text-accent">Copié!</p>
                  <p className="text-xs text-gray-400">Coller dans vos messages</p>
                </div>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Copier dans le presse-papiers</p>
                  <p className="text-xs text-gray-400">Coller sur WhatsApp, Discord...</p>
                </div>
              </>
            )}
          </button>

          {/* Disclaimer */}
          <div className="mt-4 p-3 bg-background rounded-lg border border-border-dark">
            <p className="text-xs text-gray-500 text-center">
              Format optimisé pour Instagram, TikTok et WhatsApp (9:16)
            </p>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
