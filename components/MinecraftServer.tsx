"use client";

import { useState, useEffect, useCallback } from "react";
import type { MinecraftConfig } from "@/types/config";

interface MinecraftServerProps {
  minecraft: MinecraftConfig;
}

interface ServerStatus {
  online: boolean;
  players?: {
    online: number;
    max: number;
  };
  loading: boolean;
  error: boolean;
}

const CREEPER_SVG = (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-8 h-8" aria-hidden="true">
    <rect width="16" height="16" rx="2" fill="currentColor" opacity="0.1"/>
    <rect x="4" y="2" width="8" height="8" fill="currentColor" rx="1"/>
    <rect x="5" y="3" width="2" height="2" fill="var(--bg)"/>
    <rect x="9" y="3" width="2" height="2" fill="var(--bg)"/>
    <rect x="6" y="6" width="4" height="1" fill="var(--bg)"/>
    <rect x="5" y="7" width="2" height="2" fill="var(--bg)"/>
    <rect x="9" y="7" width="2" height="2" fill="var(--bg)"/>
    <rect x="5" y="10" width="2" height="4" rx="1" fill="currentColor"/>
    <rect x="9" y="10" width="2" height="4" rx="1" fill="currentColor"/>
  </svg>
);

export default function MinecraftServer({ minecraft }: MinecraftServerProps) {
  const [status, setStatus] = useState<ServerStatus>({
    online: false,
    loading: true,
    error: false,
  });
  const [copied, setCopied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.mcsrvstat.us/2/${encodeURIComponent(minecraft.address)}`,
        { signal: AbortSignal.timeout(8000) }
      );
      if (!res.ok) throw new Error("HTTP error");
      const data = await res.json();
      setStatus({
        online: data.online ?? false,
        players: data.players
          ? { online: data.players.online ?? 0, max: data.players.max ?? 0 }
          : undefined,
        loading: false,
        error: false,
      });
    } catch {
      setStatus({ online: false, loading: false, error: true });
    }
  }, [minecraft.address]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(minecraft.address);
      setCopied(true);
      setToastVisible(true);
      setTimeout(() => {
        setCopied(false);
        setToastVisible(false);
      }, 2500);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = minecraft.address;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setToastVisible(true);
      setTimeout(() => {
        setCopied(false);
        setToastVisible(false);
      }, 2500);
    }
  };

  return (
    <>
      <section className="px-4 mb-12" aria-label="Serwer Minecraft">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-xs font-semibold uppercase tracking-widest mb-4 font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            Minecraft
          </h2>

          <div className="card p-5">
            <div className="flex items-start gap-4">
              {/* Creeper icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(34, 197, 94, 0.1)",
                  color: "#22c55e",
                }}
              >
                {CREEPER_SVG}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-base">{minecraft.serverName}</h3>
                  {/* Status badge */}
                  {!status.loading && !status.error && (
                    <span
                      className="flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background: status.online
                          ? "rgba(34, 197, 94, 0.12)"
                          : "rgba(239, 68, 68, 0.12)",
                        color: status.online ? "#22c55e" : "#ef4444",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: status.online ? "#22c55e" : "#ef4444",
                        }}
                        aria-hidden="true"
                      />
                      {status.online ? "Online" : "Offline"}
                    </span>
                  )}
                  {status.loading && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(100,116,139,0.15)",
                        color: "var(--text-muted)",
                      }}
                    >
                      Sprawdzam…
                    </span>
                  )}
                </div>

                {/* Players count */}
                {status.online && status.players && (
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {status.players.online} / {status.players.max} graczy
                  </p>
                )}

                {minecraft.description && (
                  <p
                    className="text-sm mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {minecraft.description}
                  </p>
                )}

                {/* IP + Copy button */}
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  <code
                    className="font-mono text-sm px-3 py-1.5 rounded-lg select-all"
                    style={{
                      background: "rgba(var(--accent-rgb), 0.08)",
                      color: "var(--accent)",
                      border: "1px solid rgba(var(--accent-rgb), 0.15)",
                    }}
                    aria-label={`Adres IP: ${minecraft.address}`}
                  >
                    {minecraft.address}
                  </code>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer"
                    style={{
                      background: copied
                        ? "rgba(34, 197, 94, 0.15)"
                        : "rgba(var(--accent-rgb), 0.12)",
                      color: copied ? "#22c55e" : "var(--accent)",
                      border: copied
                        ? "1px solid rgba(34, 197, 94, 0.3)"
                        : "1px solid rgba(var(--accent-rgb), 0.2)",
                    }}
                    aria-label="Skopiuj adres IP serwera"
                    type="button"
                  >
                    {copied ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Skopiowano
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Skopiuj IP
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast notification */}
      {toastVisible && (
        <div
          className="toast"
          role="status"
          aria-live="polite"
        >
          ✓ IP skopiowane!
        </div>
      )}
    </>
  );
}
