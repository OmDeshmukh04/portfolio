"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

const photos = [
  { src: "/photos/trek-18.webp", alt: "Clouds spilling over a green Sahyadri ridge at first light", caption: "Monsoon cloud pouring over the ridgeline." },
  { src: "/photos/trek-19.webp", alt: "A crowded Sahyadri summit with a saffron flag, ringed by cloud", caption: "The summit, once the cloud finally opened." },
  { src: "/photos/trek-08.webp", alt: "A hillside covered in pink wildflowers fading into mist", caption: "A slope of wildflowers on the way up." },
  { src: "/photos/trek-16.webp", alt: "Aerial view of a lake and farmland framed by yellow flowers", caption: "Valley, lake, and a long view down." },
  { src: "/photos/trek-13.webp", alt: "A steep fort cliff with a stone stairway cut into the rock", caption: "Stone steps cut straight into the cliff." },
  { src: "/photos/trek-05.webp", alt: "Low clouds drifting across green hills below the trail", caption: "Above the clouds, somewhere past the treeline." },
  { src: "/photos/trek-12.webp", alt: "A bare tree beside old fort ramparts under a blue sky", caption: "An old tree keeping the ramparts company." },
];

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (notify: () => void) => { const mq = matchMedia(query); mq.addEventListener("change", notify); return () => mq.removeEventListener("change", notify); };

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => false);
  const playing = !paused && !reducedMotion;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => { if (!document.hidden) setIndex(i => (i + 1) % photos.length); }, 5000);
    return () => clearInterval(timer);
  }, [playing]);

  return <figure className="home-landscape">
    <div className="hero-frame">
      {photos.map((photo, i) => <img key={photo.src} src={photo.src} alt={photo.alt} className={i === index ? "is-active" : undefined} aria-hidden={i === index ? undefined : true} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "low"} />)}
      <div className="hero-controls">
        <button onClick={() => setPaused(!paused)} aria-label={playing ? "Pause the photo slideshow" : "Play the photo slideshow"}>{playing ? <Pause /> : <Play />}</button>
        <div className="hero-dots">{photos.map((photo, i) => <button key={photo.src} aria-label={`Show photograph ${i + 1} of ${photos.length}`} aria-current={i === index ? "true" : undefined} onClick={() => { setPaused(true); setIndex(i); }} />)}</div>
      </div>
    </div>
    <figcaption><span aria-live={playing ? "off" : "polite"}>{photos[index].caption} Photographs by me.</span> <Link href="/about/trekking">See my trail journal →</Link></figcaption>
  </figure>;
}
