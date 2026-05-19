"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {  ArrowUp} from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;

  --footer-bg: #05070b;
  --footer-fg: #f5f7fb;
  --footer-muted: rgba(236, 239, 245, 0.74);
  --footer-primary: #d06af0;
  --footer-secondary: #7ac2ff;
  --footer-danger: #ff7384;

  --pill-bg-1: color-mix(in oklch, var(--footer-fg) 4%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--footer-fg) 1.5%, transparent);
  --pill-shadow: color-mix(in oklch, var(--footer-bg) 55%, transparent);
  --pill-highlight: color-mix(in oklch, var(--footer-fg) 13%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--footer-bg) 84%, transparent);
  --pill-border: color-mix(in oklch, var(--footer-fg) 13%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--footer-fg) 10%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--footer-fg) 3%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--footer-fg) 24%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--footer-bg) 74%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--footer-fg) 23%, transparent);
}

.motion-footer-shell {
  position: relative;
  width: 100%;
  height: 100svh;
  z-index: 0;
  clip-path: polygon(0% 0, 100% 0%, 100% 100%, 0 100%);
}

.motion-footer-panel {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  background: var(--footer-bg);
  color: var(--footer-fg);
  z-index: 2;
  isolation: isolate;
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 4px color-mix(in oklch, var(--footer-danger) 50%, transparent));
  }
  15%, 45% {
    transform: scale(1.2);
    filter: drop-shadow(0 0 10px color-mix(in oklch, var(--footer-danger) 80%, transparent));
  }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

.footer-aurora-orb {
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(82vw, 1200px);
  height: 56svh;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}

.footer-grid-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.footer-bg-grid {
  background-size: 58px 58px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--footer-fg) 6%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--footer-fg) 6%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--footer-primary) 24%, transparent) 0%,
    color-mix(in oklch, var(--footer-secondary) 20%, transparent) 42%,
    transparent 72%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
    0 10px 30px -10px var(--pill-shadow),
    inset 0 1px 1px var(--pill-highlight),
    inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
    0 18px 40px -10px var(--pill-shadow-hover),
    inset 0 1px 1px var(--pill-highlight-hover);
}

.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--footer-fg) 10%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--footer-fg) 16%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, var(--footer-fg) 0%, color-mix(in oklch, var(--footer-fg) 45%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 16px color-mix(in oklch, var(--footer-fg) 20%, transparent));
}

.footer-giant-text {
  position: absolute;
  left: 50%;
  bottom: -5vh;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 0;
  pointer-events: none;
  user-select: none;
}

.footer-marquee {
  position: absolute;
  top: 3rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1rem 0;
  transform: rotate(-2deg) scale(1.1);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  z-index: 10;
}

.footer-marquee-track {
  display: flex;
  width: max-content;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
}

.footer-marquee-item {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0 1.5rem;
}

.footer-marquee-sep-primary {
  color: rgba(232, 121, 249, 0.75);
}

.footer-marquee-sep-secondary {
  color: rgba(125, 211, 252, 0.75);
}

.footer-center {
  position: relative;
  z-index: 10;
  flex: 1;
  width: min(100%, 72rem);
  margin: 6rem auto 0;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer-heading {
  margin: 0 0 2.5rem;
  text-align: center;
  font-size: clamp(2.4rem, 10vw, 6rem);
  line-height: 0.95;
  font-weight: 900;
  letter-spacing: -0.03em;
}

.footer-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
}

.footer-store-links,
.footer-policy-links {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-store-links {
  gap: 0.75rem;
}

.footer-policy-links {
  gap: 0.75rem;
}

.footer-pill-btn {
  border-radius: 9999px;
  text-decoration: none;
  color: var(--footer-fg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
}

.footer-store-btn {
  padding: 0.95rem 1.45rem;
  font-size: 12px;
  font-weight: 700;
}

.footer-policy-btn {
  padding: 0.65rem 1.2rem;
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.74);
}

.footer-policy-btn:hover {
  color: #ffffff;
}

.footer-btn-icon {
  width: 19px;
  height: 19px;
  color: rgba(255, 255, 255, 0.7);
}

.footer-bottom {
  position: relative;
  z-index: 20;
  width: 100%;
  padding: 0 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
}

.footer-copy {
  order: 2;
  color: rgba(255, 255, 255, 0.65);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 600;
  text-align: center;
}

.footer-made {
  order: 1;
  padding: 0.55rem 1rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.footer-made span {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.68);
}

.footer-brand {
  color: #ffffff;
  font-size: 12px;
  letter-spacing: 0;
  margin-left: 2px;
}

.footer-top-btn {
  order: 3;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.65);
}

.footer-top-btn:hover {
  color: #ffffff;
}

.footer-top-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.footer-top-btn:hover .footer-top-icon {
  transform: translateY(-4px);
}

@media (max-width: 1024px) {
  .footer-giant-bg-text {
    font-size: 32vw;
    bottom: -2vh;
  }
}

@media (max-width: 768px) {
  .footer-marquee-track {
    letter-spacing: 0.16em;
  }

  .footer-giant-bg-text {
    font-size: 38vw;
    bottom: 2vh;
  }

  .footer-center {
    margin-top: 5.8rem;
  }

  .footer-store-btn {
    font-size: 13px;
    padding: 1rem 1.7rem;
  }

  .footer-policy-btn {
    font-size: 12px;
  }

  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0 2.5rem 2rem;
  }

  .footer-copy {
    order: 1;
    text-align: left;
  }

  .footer-made {
    order: 2;
    padding: 0.7rem 1.25rem;
  }

  .footer-top-btn {
    order: 3;
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 480px) {
  .footer-marquee {
    top: 1.6rem;
    padding-top: 0.65rem;
    padding-bottom: 0.65rem;
  }

  .footer-giant-bg-text {
    font-size: 46vw;
    bottom: 8vh;
  }

  .footer-center {
    margin-top: 5rem;
  }

  .footer-copy {
    font-size: 9px;
    letter-spacing: 0.16em;
  }
}
`;

const MagneticButton = React.forwardRef(function MagneticButton(
  { className, children, as: Component = "button", ...props },
  forwardedRef
) {
  const localRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const element = localRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const handleMouseMove = (event) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = event.clientX - rect.left - centerX;
        const y = event.clientY - rect.top - centerY;

        gsap.to(element, {
          x: x * 0.4,
          y: y * 0.4,
          rotationX: -y * 0.15,
          rotationY: x * 0.15,
          scale: 1.05,
          ease: "power2.out",
          duration: 0.4,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: "elastic.out(1, 0.3)",
          duration: 1.2,
        });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <Component
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      }}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </Component>
  );
});


export function CinematicFooter() {
  const wrapperRef = useRef(null);
  const giantTextRef = useRef(null);
  const headingRef = useRef(null);
  const linksRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 45%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    const refreshId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, [location.pathname]);

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div ref={wrapperRef} className="motion-footer-shell">
        <footer className="motion-footer-panel cinematic-footer-wrapper">
          <div className="footer-aurora footer-aurora-orb animate-footer-breathe" />
          <div className="footer-bg-grid footer-grid-overlay" />

          <div
            ref={giantTextRef}
            className="footer-giant-bg-text footer-giant-text"
          >
            ACUTE
          </div>

       

          <div className="footer-center">
            <h2
              ref={headingRef}
              className="footer-heading footer-text-glow"
            >
              Ready to transfer securely?
            </h2>

            <div ref={linksRef} className="footer-links">
              <div className="footer-store-links">
              </div>

              <div className="footer-policy-links">
                <MagneticButton
                  as="a"
                  href="#"
                  className="footer-pill-btn footer-policy-btn footer-glass-pill"
                >
                  Privacy Policy
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#"
                  className="footer-pill-btn footer-policy-btn footer-glass-pill"
                >
                  Terms of Service
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#"
                  className="footer-pill-btn footer-policy-btn footer-glass-pill"
                >
                  Support
                </MagneticButton>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">
              Copyright 2026 Acute. All rights reserved.
            </div>

           

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="footer-top-btn footer-glass-pill"
              aria-label="Back to top"
            >
              <ArrowUp className="footer-top-icon" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}
