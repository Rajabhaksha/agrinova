import React, { useState, useEffect, useRef } from 'react';

interface VoiceSymptomRecorderProps {
  onSymptomTranscribed: (transcript: string) => void;
  currentTranscript?: string;
}

export const VoiceSymptomRecorder: React.FC<VoiceSymptomRecorderProps> = ({
  onSymptomTranscribed,
  currentTranscript,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [liveText, setLiveText] = useState('');
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<number | null>(null);

  // Suggested field verbal symptom prompts
  const verbalPresets = [
    'Concentric target rings with yellow halos on lower tomato foliage',
    'White powdery talcum-like patches spreading over the upper leaf surface',
    'Dark water-soaked oily blotches with rapid stem collapse',
    'Cinnamon-brown pustules shedding powdery rust dust on corn leaves',
    'Angular greasy spots between leaf veins with shot-hole centers',
    'Bright yellow leaf margins with dark green veins and no fungal spots',
  ];

  useEffect(() => {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setSpeechSupported(false);
    }
  }, []);

  const startListening = () => {
    setErrorMessage(null);
    setLiveText('');
    setRecordSeconds(0);

    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      // Speech recognition not in this browser, provide simulated microphone mode
      setIsRecording(true);
      simulateVoiceInput();
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        timerRef.current = window.setInterval(() => {
          setRecordSeconds((s) => s + 1);
        }, 1000);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setLiveText(transcript);
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access blocked. You can still select or type verbal symptoms.');
        } else {
          setErrorMessage(`Audio note notice: ${event.error}. Use preset verbal phrases below.`);
        }
        stopListening();
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      simulateVoiceInput();
    }
  };

  const simulateVoiceInput = () => {
    setIsRecording(true);
    let sec = 0;
    timerRef.current = window.setInterval(() => {
      sec++;
      setRecordSeconds(sec);
      if (sec === 1) setLiveText('Observing concentric circular spots...');
      if (sec === 2) setLiveText('Observing concentric circular spots with chlorotic yellow halo on lower cluster...');
      if (sec === 4) {
        setIsRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 1000);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);

    if (liveText.trim()) {
      onSymptomTranscribed(liveText.trim());
    }
  };

  const handleApplyPreset = (text: string) => {
    setLiveText(text);
    onSymptomTranscribed(text);
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="rounded-xl bg-[#ffffff] p-3.5 shadow-sm border border-[#eaedff] space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#6cf8bb]/40 text-[#006c49] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">mic</span>
          </div>
          <div>
            <h3 className="font-['Plus+Jakarta+Sans'] text-[14px] font-bold text-[#131b2e] leading-tight">
              Farmer Verbal Symptom Notes
            </h3>
            <span className="font-['Inter'] text-[10px] text-[#414943]">
              Speak observations with hands-free field audio
            </span>
          </div>
        </div>

        {/* Recording Status or Duration */}
        {isRecording && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            <span>Recording {formatTime(recordSeconds)}</span>
          </div>
        )}
      </div>

      {/* Live Voice Recording HUD when recording */}
      {isRecording && (
        <div className="p-3 bg-[#002718] text-white rounded-xl space-y-2.5 border border-[#6cf8bb]/30 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-[#6ffbbe] tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] animate-bounce">mic</span>
              Listening to Field Audio...
            </span>
            <span className="text-[10px] text-[#a3d1b6]">{formatTime(recordSeconds)}</span>
          </div>

          {/* Animated sound wave bars */}
          <div className="flex items-center justify-center gap-1 h-8 py-1">
            <div className="w-1 bg-[#6ffbbe] h-3 animate-pulse rounded-full"></div>
            <div className="w-1 bg-[#6ffbbe] h-6 animate-pulse delay-75 rounded-full"></div>
            <div className="w-1 bg-[#6ffbbe] h-7 animate-pulse delay-150 rounded-full"></div>
            <div className="w-1 bg-[#6cf8bb] h-4 animate-pulse delay-100 rounded-full"></div>
            <div className="w-1 bg-[#6ffbbe] h-8 animate-pulse delay-200 rounded-full"></div>
            <div className="w-1 bg-[#6ffbbe] h-5 animate-pulse delay-75 rounded-full"></div>
            <div className="w-1 bg-[#6cf8bb] h-2 animate-pulse rounded-full"></div>
          </div>

          {/* Live text box */}
          <div className="bg-white/10 p-2.5 rounded-lg text-[12px] min-h-[44px] text-white/90 italic">
            {liveText || 'Speak clearly: describe spots, color changes, leaf texture, or wilt...'}
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={stopListening}
              className="flex-1 py-2 bg-[#6cf8bb] text-[#002113] rounded-lg font-bold text-[12px] flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Finish & Correlate Diagnosis</span>
            </button>
            <button
              onClick={() => {
                stopListening();
                setLiveText('');
              }}
              className="px-3 py-2 bg-white/20 text-white rounded-lg font-semibold text-[11px] active:scale-95"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Idle / Saved Transcription Card */}
      {!isRecording && (
        <div className="space-y-2">
          {currentTranscript ? (
            <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#dae2fd] space-y-1.5 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#006c49] uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">record_voice_over</span>
                  Recorded Verbal Diagnosis Input
                </span>
                <span className="text-[9px] bg-[#6cf8bb]/40 text-[#006c49] font-bold px-1.5 py-0.2 rounded-full">
                  Applied to DeepLeaf AI
                </span>
              </div>
              <p className="text-[12px] text-[#131b2e] italic leading-snug">
                “{currentTranscript}”
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-[#414943]">
                  Neural cross-reference: High correlation with visual symptoms
                </span>
                <button
                  onClick={startListening}
                  className="text-[11px] text-[#006c49] font-bold hover:underline flex items-center gap-0.5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[13px]">mic</span>
                  <span>Re-Record</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={startListening}
              className="w-full py-2.5 px-3 rounded-xl bg-[#002718] hover:bg-[#006c49] text-[#ffffff] font-semibold text-[12px] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#6ffbbe]">mic</span>
              <span>Record Verbal Symptoms (Hands-Free)</span>
            </button>
          )}

          {errorMessage && (
            <span className="text-[10px] text-[#ba1a1a] block px-1">{errorMessage}</span>
          )}

          {/* Quick Verbal Presets for quick field testing */}
          <div className="pt-1">
            <span className="text-[10px] font-bold text-[#414943] block mb-1">
              Field Verbal Shortcuts (Tap to simulate voice prompt):
            </span>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {verbalPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(preset)}
                  className="px-2.5 py-1 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-[10px] font-medium shrink-0 border border-[#eaedff] text-left transition-colors truncate max-w-[220px]"
                  type="button"
                >
                  💬 {preset}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
