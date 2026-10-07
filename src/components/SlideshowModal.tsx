import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Rocket,
  ListChecks,
  GraduationCap,
  FileCheck,
  Search,
  Bot,
  Radio,
  X,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useLanguage } from '../translations';

const AUDIO_SRC = 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1b1a52a0f2.mp3?filename=inspiring-cinematic-ambient-116199.mp3';

interface SlideConfig {
  Icon: React.ComponentType<{ className?: string }>;
  accent: string;
  step?: number;
  kickerKey?: string;
  titleKey: string;
  descKey?: string;
}

const SLIDES: SlideConfig[] = [
  {
    Icon: Sparkles,
    accent: 'from-sky-500/30 to-indigo-500/20',
    kickerKey: 'slideshow.intro.kicker',
    titleKey: 'slideshow.intro.t',
    descKey: 'slideshow.intro.d',
  },
  {
    Icon: Rocket,
    accent: 'from-emerald-500/30 to-teal-500/20',
    titleKey: 'slideshow.tagline.t',
    descKey: 'slideshow.tagline.d',
  },
  {
    Icon: ListChecks,
    accent: 'from-amber-500/30 to-orange-500/20',
    kickerKey: 'slideshow.path.kicker',
    titleKey: 'slideshow.path.t',
    descKey: 'slideshow.path.d',
  },
  {
    Icon: GraduationCap,
    accent: 'from-sky-500/30 to-blue-500/20',
    step: 1,
    titleKey: 'slideshow.step1.t',
    descKey: 'slideshow.step1.d',
  },
  {
    Icon: FileCheck,
    accent: 'from-emerald-500/30 to-green-500/20',
    step: 2,
    titleKey: 'slideshow.step2.t',
    descKey: 'slideshow.step2.d',
  },
  {
    Icon: Search,
    accent: 'from-orange-500/30 to-amber-500/20',
    step: 3,
    titleKey: 'slideshow.step3.t',
    descKey: 'slideshow.step3.d',
  },
  {
    Icon: Bot,
    accent: 'from-fuchsia-500/30 to-purple-500/20',
    step: 4,
    titleKey: 'slideshow.step4.t',
    descKey: 'slideshow.step4.d',
  },
  {
    Icon: Radio,
    accent: 'from-rose-500/30 to-pink-500/20',
    step: 5,
    titleKey: 'slideshow.step5.t',
    descKey: 'slideshow.step5.d',
  },
];

interface SlideshowModalProps {
  onClose: () => void;
}

export const SlideshowModal: React.FC<SlideshowModalProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-advance slides every 4.5s if autoPlaying
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Handle ambient music
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.45;
      audio.play().catch(() => setIsPlayingMusic(false));
    }
    return () => {
      if (audio) audio.pause();
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    } else {
      audio.pause();
      setIsPlayingMusic(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const slide = SLIDES[currentSlide];
  const IconComponent = slide.Icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950/95 p-4 sm:p-6 text-white backdrop-blur-md"
      style={{
        backgroundImage: 'radial-gradient(ellipse at center, #1e293b 0%, #020617 75%)',
      }}
    >
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="auto" />

      {/* Top action controls */}
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6 z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition-colors"
          title={isAutoPlaying ? "Pause défilement" : "Reprendre défilement"}
        >
          {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Slide Card */}
      <div className="relative w-full max-w-4xl px-2 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`relative flex w-full flex-col items-center gap-6 sm:gap-8 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br ${slide.accent} p-6 sm:p-10 text-center shadow-2xl backdrop-blur-xl sm:flex-row sm:text-left`}
          >
            {/* Step badge / Icon */}
            <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 flex-none items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/20 backdrop-blur shadow-inner">
              {slide.step ? (
                <span className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-black text-neutral-900 shadow-lg">
                  {slide.step}
                </span>
              ) : null}
              <IconComponent className="h-14 w-14 sm:h-16 sm:w-16 text-white" />
            </div>

            {/* Slide Text Content */}
            <div className="flex-1">
              {slide.kickerKey ? (
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  {t(slide.kickerKey)}
                </p>
              ) : null}
              <h2 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-4xl">
                {t(slide.titleKey)}
              </h2>
              {slide.descKey ? (
                <p className="mt-3 text-sm text-white/80 sm:text-base leading-relaxed">
                  {t(slide.descKey)}
                </p>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous and Next arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Diapositive précédente"
          className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/25 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Diapositive suivante"
          className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/25 transition-all"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="mt-6 flex items-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Music Audio Toggle Button */}
      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={toggleMusic}
          className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-white/20 transition-colors"
        >
          {isPlayingMusic ? (
            <>
              <Volume2 className="h-4 w-4" />
              <span>{t('slideshow.music.pause')}</span>
            </>
          ) : (
            <>
              <VolumeX className="h-4 w-4" />
              <span>{t('slideshow.music.play')}</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
