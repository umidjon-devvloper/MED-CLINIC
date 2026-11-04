"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { clinics } from "@/lib/data/clinics";

declare global {
  interface Window {
    google?: typeof google;
    __gmapsPromise?: Promise<void>;
  }
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("ssr"));
  if (window.google?.maps) return Promise.resolve();
  if (window.__gmapsPromise) return window.__gmapsPromise;
  window.__gmapsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-gmaps]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("maps-load-failed")));
      return;
    }
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=weekly&libraries=marker`;
    s.async = true;
    s.defer = true;
    s.dataset.gmaps = "1";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("maps-load-failed"));
    document.head.appendChild(s);
  });
  return window.__gmapsPromise;
}

// Clean, light map style — subtle colors, roads visible, POIs trimmed so our price-tag markers stand out
const mapStyles: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#f5f7fb" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#4a6684" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
  { featureType: "poi.business", stylers: [{ visibility: "off" }] },
  { featureType: "poi.medical", stylers: [{ visibility: "off" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#dceeda" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#e7eef5" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#e3eeff" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#b5d4f2" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#bfdaf6" }] },
];

export function ClinicsMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!API_KEY) { setError("API key topilmadi"); return; }
    let mapObj: google.maps.Map | null = null;

    loadGoogleMaps()
      .then(() => {
        if (!containerRef.current || !window.google) return;
        const bounds = new window.google.maps.LatLngBounds();
        clinics.forEach((c) => bounds.extend(c.coords));

        mapObj = new window.google.maps.Map(containerRef.current, {
          center: { lat: 41.3111, lng: 69.2797 },
          zoom: 11,
          mapId: "MED_CLINIC_MAP",
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          clickableIcons: false,
          gestureHandling: "cooperative",
        });

        // OLX / Zillow-style price-tag markers
        const AdvancedMarkerElement = (window.google as unknown as { maps: { marker?: { AdvancedMarkerElement?: new (opts: Record<string, unknown>) => google.maps.marker.AdvancedMarkerElement } } }).maps.marker?.AdvancedMarkerElement;

        clinics.forEach((c) => {
          const pill = document.createElement("div");
          pill.className = "med-pin";
          pill.innerHTML = `
            <div class="med-pin__inner">
              <span class="med-pin__num">${c.number.replace(/^0/, "")}</span>
              <span class="med-pin__name">${c.name}</span>
              <span class="med-pin__rating">★ ${c.rating}</span>
            </div>
            <div class="med-pin__tail"></div>
          `;

          let marker: google.maps.marker.AdvancedMarkerElement | google.maps.Marker;
          if (AdvancedMarkerElement) {
            marker = new AdvancedMarkerElement({
              position: c.coords,
              map: mapObj!,
              content: pill,
              title: c.name,
            });
          } else {
            // Fallback: plain marker with number label
            marker = new window.google!.maps.Marker({
              position: c.coords,
              map: mapObj!,
              title: c.name,
              label: { text: c.number.replace(/^0/, ""), color: "#ffffff", fontSize: "13px", fontWeight: "700" },
              icon: {
                path: window.google!.maps.SymbolPath.CIRCLE,
                scale: 16,
                fillColor: "#1E6DD8",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 3,
              },
            });
          }

          const info = new window.google!.maps.InfoWindow({
            headerDisabled: true,
            content: `
              <div style="font-family: inherit; max-width: 260px; padding: 4px 2px; line-height: 1.4">
                <div style="display: inline-flex; align-items: center; gap: 6px; background: #E3EEFF; color: #1E6DD8; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 3px 8px; border-radius: 999px; margin-bottom: 6px">${c.district} tumani</div>
                <div style="font-weight: 700; color: #0A1F3A; font-size: 15px; margin-bottom: 4px">${c.name}</div>
                <div style="font-size: 12.5px; color: #4A6684; margin-bottom: 8px">${c.address}</div>
                <div style="display: flex; gap: 10px; font-size: 11.5px; color: #4A6684; margin-bottom: 8px">
                  <span style="color: #E89C32; font-weight: 700">★ ${c.rating}</span>
                  <span>${c.reviews} sharh</span>
                  <span style="color: #22C58B; font-weight: 600">${c.statusDetail}</span>
                </div>
                <a href="tel:${c.phone.replace(/\s+/g, "")}" style="display: inline-block; margin-right: 8px; color: #1E6DD8; font-weight: 600; font-size: 12.5px; text-decoration: none">☎ ${c.phone}</a>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${c.coords.lat},${c.coords.lng}" target="_blank" rel="noopener" style="display: inline-block; color: #1E6DD8; font-weight: 600; font-size: 12.5px; text-decoration: none">Yo'nalish →</a>
              </div>
            `,
          });

          marker.addListener?.("click", () => info.open({ anchor: marker as google.maps.MVCObject, map: mapObj! }));
          (marker as google.maps.marker.AdvancedMarkerElement).addEventListener?.("click", () => info.open({ anchor: marker as google.maps.MVCObject, map: mapObj! }));
          pill.addEventListener("click", () => info.open({ anchor: marker as google.maps.MVCObject, map: mapObj! }));
        });

        mapObj.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });
      })
      .catch((e) => setError(e?.message || "Xarita yuklanmadi"));

    return () => { mapObj = null; };
  }, []);

  const onDirections = () => {
    const first = clinics[0];
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${first.coords.lat},${first.coords.lng}`, "_blank");
  };

  return (
    <div className="bg-surface border border-line rounded-2xl overflow-hidden shadow-sm lg:sticky lg:top-4">
      <div className="px-4 py-3 border-b border-line flex items-center justify-between text-sm">
        <span className="font-semibold text-ink flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand" />
          Toshkent · {clinics.length} ta filial
        </span>
        <Link href="/clinics" className="text-xs text-brand font-semibold inline-flex items-center gap-1">
          Barchasi <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="relative w-full aspect-[4/3] lg:aspect-[16/14] bg-gradient-to-br from-[#EEF4FD] to-[#DCEBFF]">
        {error ? (
          <div className="absolute inset-0 grid place-items-center text-center p-6">
            <div>
              <MapPin className="w-10 h-10 text-muted mx-auto mb-2" />
              <div className="text-sm text-ink-soft">Xarita yuklanmadi</div>
              <div className="text-xs text-muted mt-1">{error}</div>
            </div>
          </div>
        ) : (
          <div ref={containerRef} className="absolute inset-0" />
        )}
      </div>
      <div className="px-4 py-3 border-t border-line flex items-center justify-between text-xs text-muted">
        <span>Manzilni bosib batafsil ko&apos;ring</span>
        <button onClick={onDirections} className="text-brand font-semibold inline-flex items-center gap-1 hover:underline">
          Yo&apos;nalish olish <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
