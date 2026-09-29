"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { ArrowLeft, ArrowRight, Maximize2, Pause, Play, X } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const captions = ["Clouds, green ridges, and flowers along the trail.","A few perspectives from above the Sahyadris.","Monsoon skies over a winding mountain path.","The shape of the hills from above.","Blue skies and layers of green.","Looking back over the ridgelines.","A mountain day, collected in frames.","A flower-lined trail disappearing into the mist.","Another look at one of my favourite trail views.","Clouds rolling across the valley.","A wide-open view after the climb.","A quiet stop beside the water.","Stone steps worn by many journeys.","A fort gateway and a saffron flag.","Old stone, open skies.","Wildflowers with a valley beyond.","The camera comes along for the climb.","Monsoon cloud pouring over the ridgeline.","The summit, once the cloud finally opened."];
const photo = (index: number) => `/photos/trek-${String(index + 1).padStart(2, "0")}.webp`;

export function TrekGallery() {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const openedIndex = useRef(0);
  const thumbnails = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!reduced.matches);
    const update = () => { if (reduced.matches) setPlaying(false); };
    reduced.addEventListener("change", update);
    return () => reduced.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!api) return;
    const update = () => setIndex(api.selectedScrollSnap());
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);
  useEffect(() => {
    if (!api || !playing || viewerOpen) return;
    const timer = window.setInterval(() => { if (!document.hidden) api.scrollNext(); }, 5500);
    return () => clearInterval(timer);
  }, [api, playing, viewerOpen]);

  function select(next: number, instant = false) {
    const selected = (next + captions.length) % captions.length;
    setPlaying(false);
    setIndex(selected);
    api?.scrollTo(selected, instant);
  }
  function openPhoto(selected: number, trigger: HTMLButtonElement) {
    opener.current = trigger;
    openedIndex.current = selected;
    select(selected, true);
    setViewerOpen(true);
  }
  function viewerKey(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    select(event.key === "Home" ? 0 : event.key === "End" ? captions.length - 1 : index + (event.key === "ArrowRight" ? 1 : -1), true);
  }
  function endSwipe(event: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || event.touches.length || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) select(index + (dx < 0 ? 1 : -1), true);
  }

  return <div className="trek-carousel">
    <Carousel opts={{ loop: true }} setApi={setApi} aria-label="Om’s trekking photographs" onFocusCapture={() => setPlaying(false)}>
      <CarouselContent>{captions.map((caption, i) => <CarouselItem key={i} aria-label={`${i + 1} of ${captions.length}`}>
        <figure><button className="trek-frame photo-open" aria-label={`Open photograph ${i + 1} full screen`} tabIndex={index === i ? 0 : -1} onClick={event => openPhoto(i, event.currentTarget)}>
          <img src={photo(i)} alt={caption} loading={i === 0 ? "eager" : "lazy"} />
          <span className="photo-expand" aria-hidden="true"><Maximize2 /> Full screen</span>
        </button><figcaption>{caption}</figcaption></figure>
      </CarouselItem>)}</CarouselContent>
    </Carousel>
    <div className="carousel-controls"><span aria-live={playing ? "off" : "polite"}>{String(index + 1).padStart(2, "0")} / {captions.length} · Photographs by me</span>
      <div><button onClick={() => select(index - 1)} aria-label="Previous photograph"><ArrowLeft /> Previous</button><button onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause slideshow" : "Play slideshow"}>{playing ? <Pause /> : <Play />}{playing ? "Pause" : "Play"}</button><button onClick={() => select(index + 1)} aria-label="Next photograph">Next <ArrowRight /></button></div>
    </div>
    <div className="trail-thumbs" aria-label="Choose a photograph">{captions.map((_, i) => <button key={i} ref={node => { thumbnails.current[i] = node; }} aria-label={`Show photograph ${i + 1}`} aria-pressed={index === i} onClick={() => select(i)}><img src={`/photos/thumbs/trek-${String(i + 1).padStart(2, "0")}.webp`} alt="" width="62" height="62" loading="lazy" /></button>)}</div>

    <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
      <DialogContent className="photo-viewer" showCloseButton={false} onKeyDown={viewerKey}
        onOpenAutoFocus={event => { event.preventDefault(); closeButton.current?.focus(); }}
        onCloseAutoFocus={event => { event.preventDefault(); (index === openedIndex.current ? opener.current : thumbnails.current[index])?.focus({ preventScroll: true }); }}>
        <header className="photo-viewer-header"><div><DialogTitle>On the trail</DialogTitle><span>Photographs by Om Deshmukh</span></div><DialogClose asChild><button ref={closeButton} className="viewer-close" aria-label="Close full-screen viewer"><X /></button></DialogClose></header>
        <DialogDescription className="sr-only">Browse all {captions.length} photographs. Use the arrow buttons, left and right arrow keys, or swipe. Press Escape to close.</DialogDescription>
        <div className="photo-viewer-stage" onClick={event => { if (event.target === event.currentTarget) setViewerOpen(false); }} onTouchStart={event => { touchStart.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null; }} onTouchEnd={endSwipe} onTouchCancel={() => { touchStart.current = null; }}>
          <img key={index} src={photo(index)} alt={captions[index]} draggable={false} />
        </div>
        <footer className="photo-viewer-footer"><div className="viewer-caption" aria-live="polite" aria-atomic="true"><span>{String(index + 1).padStart(2, "0")} / {captions.length}</span><p>{captions[index]}</p></div><div className="viewer-controls"><button onClick={() => select(index - 1, true)} aria-label="Previous full-screen photograph"><ArrowLeft /><span>Previous</span></button><button onClick={() => select(index + 1, true)} aria-label="Next full-screen photograph"><span>Next</span><ArrowRight /></button></div></footer>
      </DialogContent>
    </Dialog>
  </div>;
}
