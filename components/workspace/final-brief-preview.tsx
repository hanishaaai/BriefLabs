"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Monitor,
  Printer,
  Share2
} from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeader } from "@/components/workspace/section-header";
import type { FeaturedBrief } from "@/lib/types";
import { cn } from "@/lib/utils";

type FinalBriefPreviewProps = {
  brief: FeaturedBrief;
};

type ActionStatus = {
  tone: "success" | "error" | "info";
  message: string;
} | null;

const GENERATED_STORAGE_KEY = "lumia-brief-generated";

export function FinalBriefPreview({ brief }: FinalBriefPreviewProps) {
  const [currentBrief, setCurrentBrief] = useState(brief);
  const [actionStatus, setActionStatus] = useState<ActionStatus>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const previewRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const sharedBrief = url.searchParams.get("brief");

    if (sharedBrief) {
      const parsedBrief = decodeSharedBrief(sharedBrief);

      if (parsedBrief) {
        setCurrentBrief(parsedBrief);
        return;
      }

      setActionStatus({
        tone: "error",
        message:
          "This shared link could not be parsed, so the default preview was loaded instead."
      });
    }

    const stored = window.localStorage.getItem(GENERATED_STORAGE_KEY);

    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as { finalBrief?: FeaturedBrief };

      if (isFeaturedBrief(parsed.finalBrief)) {
        setCurrentBrief(parsed.finalBrief);
      }
    } catch {
      window.localStorage.removeItem(GENERATED_STORAGE_KEY);
    }
  }, [brief]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsPresentationMode(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!actionStatus) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActionStatus(null);
    }, 4200);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [actionStatus]);

  async function handleShareBrief() {
    const shareUrl = buildShareUrl(currentBrief);

    setIsSharing(true);

    try {
      if (navigator.share) {
        await navigator.share({
          title: currentBrief.title,
          text: `${currentBrief.brand} creator brief`,
          url: shareUrl
        });

        setActionStatus({
          tone: "success",
          message: "Share sheet opened for this brief."
        });
      } else {
        await copyTextToClipboard(shareUrl);
        setActionStatus({
          tone: "success",
          message: "Share link copied to clipboard."
        });
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setActionStatus({
          tone: "info",
          message: "Sharing was canceled."
        });
      } else {
        setActionStatus({
          tone: "error",
          message: "Unable to share this brief right now."
        });
      }
    } finally {
      setIsSharing(false);
    }
  }

  async function handleCopyShareLink() {
    try {
      await copyTextToClipboard(buildShareUrl(currentBrief));
      setActionStatus({
        tone: "success",
        message: "Share link copied. It includes the current brief snapshot."
      });
    } catch {
      setActionStatus({
        tone: "error",
        message: "Unable to copy the share link right now."
      });
    }
  }

  async function handlePresentationMode() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setActionStatus({
          tone: "info",
          message: "Presentation mode closed."
        });
        return;
      }

      const previewElement = previewRef.current;

      if (!previewElement?.requestFullscreen) {
        throw new Error("Fullscreen is not supported in this browser.");
      }

      await previewElement.requestFullscreen();
      setActionStatus({
        tone: "success",
        message: "Presentation mode is open. Press Esc to exit."
      });
    } catch {
      setActionStatus({
        tone: "error",
        message: "Unable to open presentation mode in this browser."
      });
    }
  }

  function handlePrintExport() {
    setActionStatus({
      tone: "info",
      message: "Print dialog opened. Choose Save as PDF for a clean export."
    });
    window.print();
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            background: #ffffff !important;
          }

          header,
          .preview-controls,
          .preview-status {
            display: none !important;
          }

          .preview-page-shell {
            max-width: none !important;
            padding: 0 !important;
          }

          .preview-surface {
            border: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background: #ffffff !important;
            padding: 2rem 0 !important;
          }

          .preview-surface > div,
          .preview-surface section,
          .preview-panel {
            break-inside: avoid;
            background: #ffffff !important;
          }
        }
      `}</style>

      <div className="preview-page-shell mx-auto max-w-6xl space-y-10 px-6 py-12 lg:px-10">
        <div className="preview-controls flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Final brief"
            title="A polished output that feels ready to send."
            description="The final view is intentionally presentation-like: clean, airy, and easy for creators, agencies, and stakeholders to understand at a glance."
          />
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/builder" variant="secondary">
              Edit brief
            </ButtonLink>
            <button
              type="button"
              onClick={handleShareBrief}
              disabled={isSharing}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-accent/95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Share2 className="h-4 w-4" />
              {isSharing ? "Sharing..." : "Share brief"}
            </button>
          </div>
        </div>

        {actionStatus ? <ActionStatusBanner status={actionStatus} /> : null}

        <section
          ref={previewRef}
          className="preview-surface rounded-[2.4rem] border border-line bg-panel p-8 shadow-card lg:p-12"
        >
          <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-xs tracking-[0.22em] text-ink/40 uppercase">{`${currentBrief.brand} x Creator Campaign`}</div>
              <h2 className="mt-3 font-display text-5xl leading-tight text-ink">
                {currentBrief.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-ink/62">
                {currentBrief.summary}
              </p>
            </div>
            <div className="preview-panel rounded-[1.4rem] border border-line bg-white/85 p-5">
              <div className="text-sm text-ink/46">Readiness</div>
              <div className="mt-1 font-display text-4xl text-ink">{currentBrief.readiness}</div>
              <div className="mt-2 text-sm text-ink/58">Clear, strategic, and nearly ready</div>
            </div>
          </div>

          <div className="grid gap-6 pt-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              {currentBrief.finalSections.map((section) => (
                <div
                  key={section.title}
                  className="preview-panel rounded-[1.6rem] border border-line bg-white/82 p-6"
                >
                  <div className="text-sm tracking-[0.16em] text-ink/40 uppercase">
                    {section.title}
                  </div>
                  <p className="mt-3 text-base leading-8 text-ink/72">{section.content}</p>
                </div>
              ))}
            </div>

            <div className="space-y-5">
              <div className="preview-panel rounded-[1.6rem] border border-line bg-mist p-6">
                <div className="text-sm tracking-[0.16em] text-ink/40 uppercase">
                  Deliverables
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/72">
                  {currentBrief.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </div>

              <div className="preview-panel rounded-[1.6rem] border border-line bg-white/85 p-6">
                <div className="text-sm tracking-[0.16em] text-ink/40 uppercase">
                  Usage rights
                </div>
                <p className="mt-4 text-sm leading-7 text-ink/68">{currentBrief.usageRights}</p>
              </div>

              {!isPresentationMode ? (
                <div className="preview-panel rounded-[1.6rem] border border-line bg-accent/95 p-6 text-white">
                  <div className="text-sm tracking-[0.16em] text-white/60 uppercase">
                    Export actions
                  </div>
                  <div className="mt-4 space-y-3">
                    <PreviewActionButton
                      icon={Copy}
                      label="Generate share link"
                      description="Copies a URL that includes this current brief snapshot."
                      onClick={handleCopyShareLink}
                    />
                    <PreviewActionButton
                      icon={Monitor}
                      label={
                        isPresentationMode
                          ? "Exit presentation mode"
                          : "Open presentation mode"
                      }
                      description="Shows only the brief in fullscreen for live walkthroughs."
                      onClick={handlePresentationMode}
                    />
                    <PreviewActionButton
                      icon={Printer}
                      label="Prepare print export"
                      description="Opens the print dialog so you can print or save as PDF."
                      onClick={handlePrintExport}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function PreviewActionButton({
  icon: Icon,
  label,
  description,
  onClick
}: {
  icon: LucideIcon;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start gap-3 rounded-[1.2rem] border border-white/14 bg-white/10 px-4 py-3 text-left text-white transition hover:bg-white/16"
    >
      <Icon className="mt-0.5 h-4 w-4 flex-none text-white/82" />
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="mt-1 text-sm leading-6 text-white/70">{description}</div>
      </div>
    </button>
  );
}

function ActionStatusBanner({ status }: { status: NonNullable<ActionStatus> }) {
  return (
    <div
      className={cn(
        "preview-status flex items-start gap-3 rounded-[1.4rem] border px-4 py-3 text-sm leading-7",
        status.tone === "success" &&
          "border-emerald-200 bg-emerald-50 text-emerald-800",
        status.tone === "error" && "border-red-200 bg-red-50 text-red-700",
        status.tone === "info" && "border-line bg-white/82 text-ink/68"
      )}
    >
      {status.tone === "success" ? (
        <CheckCircle2 className="mt-1 h-4 w-4 flex-none" />
      ) : (
        <AlertCircle className="mt-1 h-4 w-4 flex-none" />
      )}
      <div>{status.message}</div>
    </div>
  );
}

function buildShareUrl(brief: FeaturedBrief) {
  const url = new URL(window.location.href);
  url.searchParams.set("brief", encodeSharedBrief(brief));
  return url.toString();
}

function encodeSharedBrief(brief: FeaturedBrief) {
  return encodeURIComponent(JSON.stringify(brief));
}

function decodeSharedBrief(value: string) {
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as unknown;

    return isFeaturedBrief(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function copyTextToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";

  document.body.appendChild(textarea);
  textarea.select();

  const didCopy = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!didCopy) {
    throw new Error("Copy failed.");
  }
}

function isFeaturedBrief(value: unknown): value is FeaturedBrief {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as FeaturedBrief;

  return (
    typeof candidate.title === "string" &&
    typeof candidate.brand === "string" &&
    typeof candidate.readiness === "number" &&
    typeof candidate.summary === "string" &&
    Array.isArray(candidate.deliverables) &&
    Array.isArray(candidate.finalSections) &&
    typeof candidate.usageRights === "string"
  );
}
