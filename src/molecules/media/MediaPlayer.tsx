import { useRef, useState, type ReactNode, type SyntheticEvent } from 'react';
import { IconButton, Slider } from '../../atoms';
import { PauseIcon, PlayIcon, VolumeIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './MediaPlayer.css';

export interface MediaPlayerProps {
  /** Media address. Without it the controls render disabled. */
  src?: string;
  kind?: 'audio' | 'video';
  /** Picture shown before a video plays. */
  poster?: string;
  /** Title shown in the control bar and used as the accessible name. */
  title: string;
  /** Extra content on the right of the control bar. */
  actions?: ReactNode;
  className?: string;
}

const clock = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

/** Audio or video with ruled controls: play, seek, time and mute, on the native media element. */
export function MediaPlayer({ src, kind = 'audio', poster, title, actions, className }: MediaPlayerProps) {
  const media = useRef<HTMLMediaElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const disabled = !src;

  const toggle = () => {
    const el = media.current;
    if (!el) return;
    if (el.paused) void el.play().catch(() => setPlaying(false));
    else el.pause();
  };
  const sync = (event: SyntheticEvent<HTMLMediaElement>) => {
    setTime(event.currentTarget.currentTime);
    if (Number.isFinite(event.currentTarget.duration)) setDuration(event.currentTarget.duration);
  };
  const seek = (next: number) => {
    setTime(next);
    if (media.current) media.current.currentTime = next;
  };

  return (
    <figure className={cx('gl-media-player', `gl-media-player--${kind}`, disabled && 'gl-media-player--empty', className)} aria-label={title}>
      {kind === 'video' && (
        <div className="gl-media-player__screen gl-hatch">
          <video ref={(el) => { media.current = el; }} src={src} poster={poster} playsInline preload="metadata" className="gl-media-player__video" aria-label={title} onClick={toggle} onTimeUpdate={sync} onLoadedMetadata={sync} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />
        </div>
      )}
      {kind === 'audio' && (
        <audio ref={(el) => { media.current = el; }} src={src} preload="metadata" onTimeUpdate={sync} onLoadedMetadata={sync} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />
      )}
      <div className="gl-media-player__bar">
        <IconButton label={playing ? 'Pause' : 'Play'} icon={playing ? <PauseIcon /> : <PlayIcon />} onClick={toggle} disabled={disabled} />
        <span className="gl-media-player__title">{title}</span>
        <span className="gl-media-player__time">{clock(time)} / {clock(duration)}</span>
        <Slider className="gl-media-player__seek" thumbLabels={['Seek']} value={[Math.min(time, duration || 0)]} min={0} max={duration || 1} step={0.1} disabled={disabled || !duration} onValueChange={([next]) => seek(next)} />
        <IconButton label={muted ? 'Unmute' : 'Mute'} icon={<VolumeIcon />} variant={muted ? 'solid' : 'ruled'} aria-pressed={muted} disabled={disabled} onClick={() => { setMuted(!muted); if (media.current) media.current.muted = !muted; }} />
        {actions}
      </div>
    </figure>
  );
}
