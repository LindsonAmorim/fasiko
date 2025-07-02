"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import { RefreshCw, Expand, Shrink } from "lucide-react";
import { Button } from "@/components/ui/button";

const FOCUS_DURATION = 52 * 60;
const BREAK_DURATION = 17 * 60;

function Colon() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 md:gap-y-4 h-full pb-4 mx-1 md:mx-2">
      <div className="h-3 w-3 md:h-4 md:w-4 bg-foreground"></div>
      <div className="h-3 w-3 md:h-4 md:w-4 bg-foreground"></div>
    </div>
  );
}

export function Timer() {
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [timeRemaining, setTimeRemaining] = useState(FOCUS_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const synth = useRef<Tone.Synth | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synth.current = new Tone.Synth().toDestination();
    }
  }, []);

  const playSound = useCallback((note: string) => {
    Tone.start();
    if (synth.current) {
        synth.current.triggerAttackRelease(note, "0.5s");
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      const newMode = mode === "focus" ? "break" : "focus";
      playSound(newMode === 'focus' ? "G4" : "C5"); // Sound for session end
      setMode(newMode);
      setTimeRemaining(newMode === "focus" ? FOCUS_DURATION : BREAK_DURATION);
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining, mode, playSound]);

  const toggleTimer = () => {
    if (Tone.context.state !== "running") {
        Tone.start();
    }
    if (!isActive) {
      playSound("A5"); // Sound for start
    }
    setIsActive(!isActive);
  };

  const switchMode = (newMode: "focus" | "break") => {
    if (mode === newMode) return;
    setIsActive(false);
    setMode(newMode);
    setTimeRemaining(newMode === "focus" ? FOCUS_DURATION : BREAK_DURATION);
  }

  const resetTimer = () => {
    setIsActive(false);
    setMode("focus");
    setTimeRemaining(FOCUS_DURATION);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const [minutes, secondsValue] = formatTime(timeRemaining).split(':');

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
      <div className="flex items-center justify-center gap-2">
          <Button
              onClick={() => switchMode("focus")}
              variant={mode === 'focus' ? 'default' : 'outline'}
              className="px-6"
          >
              Focus
          </Button>
          <Button
              onClick={() => switchMode("break")}
              variant={mode === 'break' ? 'default' : 'outline'}
              className="px-6"
          >
              Break
          </Button>
      </div>

      <div className="flex items-center justify-center font-mono font-bold text-[10rem] sm:text-[12rem] md:text-[15rem] leading-none">
        <span>{minutes}</span>
        <Colon />
        <span>{secondsValue}</span>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={toggleTimer} variant="default" className="w-28 text-lg">
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer} variant="ghost" size="icon">
          <RefreshCw className="h-6 w-6" />
        </Button>
        <Button onClick={toggleFullscreen} variant="ghost" size="icon">
          {isFullscreen ? <Shrink className="h-6 w-6" /> : <Expand className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  );
}
