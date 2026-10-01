import { useEffect, useState } from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProposalForm } from "./proposal-form";
import { ProposalPreview } from "./proposal-preview";
import { createProposalDraft, loadProposalDraft, saveProposalDraft, type ProposalDraft, type ProposalLead } from "./proposal-model";

export function ProposalEditor({ open, lead, onClose }: { open: boolean; lead: ProposalLead; onClose: () => void }) {
  const [draft, setDraft] = useState<ProposalDraft>(() => loadProposalDraft(lead.id) ?? createProposalDraft(lead));

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => saveProposalDraft(draft), 250);
    return () => window.clearTimeout(timer);
  }, [draft, open]);

  function update<K extends keyof ProposalDraft>(key: K, value: ProposalDraft[K]) {
    setDraft((current) => current ? { ...current, [key]: value } : current);
  }

  return (
    <>
      <style>{`
        .proposal-paper { box-sizing: border-box; width: 210mm; min-height: 297mm; padding: 15mm; color: #273044; font-family: Arial, sans-serif; font-size: 10pt; line-height: 1.48; }
        .proposal-brand-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; border-bottom: 3px solid #b8860b; padding-bottom: 12px; margin-bottom: 20px; }
        .proposal-wordmark { color: #1a237e; font-family: Arial, sans-serif; font-size: 18pt; font-weight: 800; letter-spacing: .04em; }
        .proposal-wordmark span { font-weight: 500; }
        .proposal-brand-header p { margin: 3px 0 0; color: #6b7280; font-size: 8.5pt; }
        .proposal-number { display: grid; gap: 3px; text-align: right; }
        .proposal-number span { color: #1a237e; font-size: 8pt; font-weight: 700; letter-spacing: .08em; }
        .proposal-number strong { color: #1a237e; font-size: 12pt; }
        .proposal-number small { color: #626b7a; font-size: 8pt; }
        .proposal-block { margin: 0 0 14px; break-inside: avoid; }
        .proposal-section-title { margin: 0 0 7px; color: #1a237e; border-left: 3px solid #b8860b; padding-left: 8px; font-size: 10.5pt; font-weight: 700; }
        .proposal-details-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px 16px; }
        .proposal-detail { min-width: 0; display: grid; gap: 1px; }
        .proposal-detail span { color: #727987; font-size: 7.5pt; }
        .proposal-detail strong { color: #273044; overflow-wrap: anywhere; font-size: 9pt; font-weight: 500; }
        .proposal-notes { margin-top: 8px; }
        .proposal-main-title { margin: 16px 0 10px; color: #1a237e; font-size: 13pt; }
        .proposal-service { margin: 0; color: #273044; font-weight: 700; }
        .proposal-copy { color: #343b49; white-space: pre-wrap; overflow-wrap: anywhere; }
        .proposal-copy p { margin: 0 0 4px; }
        .proposal-footer { display: grid; gap: 3px; border-top: 1px solid #b8860b; padding-top: 8px; margin-top: 20px; color: #596273; font-size: 7.5pt; }
        .proposal-footer small { color: #1a237e; }
        @media print {
          @page { size: A4; margin: 0; }
          html, body, #root { width: auto !important; height: auto !important; min-height: 0 !important; overflow: visible !important; background: #fff !important; }
          body * { visibility: hidden !important; }
          .proposal-dialog { position: static !important; display: contents !important; transform: none !important; border: 0 !important; box-shadow: none !important; }
          .proposal-shell, .proposal-preview-scroll { display: contents !important; overflow: visible !important; height: auto !important; max-height: none !important; }
          #templar-proposal-print, #templar-proposal-print * { visibility: visible !important; }
          #templar-proposal-print { position: absolute !important; left: 0 !important; top: 0 !important; width: 210mm !important; max-width: none !important; min-height: 0 !important; margin: 0 !important; box-shadow: none !important; }
          .proposal-paper { width: 210mm !important; min-height: 0 !important; margin: 0 !important; padding: 15mm !important; box-shadow: none !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        }
      `}</style>
      <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
        <DialogContent className="proposal-dialog flex h-[94vh] w-[98vw] max-w-[1500px] flex-col gap-0 overflow-hidden p-0">
          <DialogHeader className="proposal-shell shrink-0 border-b px-5 py-4 pr-12 text-left">
            <DialogTitle className="text-base">Gerar proposta · Templar Engenharia</DialogTitle>
            <p className="text-xs text-muted-foreground">O rascunho é salvo automaticamente neste navegador.</p>
          </DialogHeader>
          <div className="proposal-shell grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[390px_minmax(0,1fr)]">
            <div className="min-h-0 overflow-y-auto border-r">
              <ProposalForm draft={draft} update={update} />
            </div>
            <div className="proposal-preview-scroll min-h-0 overflow-auto bg-slate-100 p-3 sm:p-6">
              <ProposalPreview draft={draft} />
            </div>
          </div>
          <footer className="proposal-shell flex shrink-0 flex-wrap items-center justify-between gap-3 border-t px-4 py-3">
            <span className="text-xs text-muted-foreground">Prévia A4 · as páginas se ajustam ao conteúdo</span>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>Fechar</Button>
              <Button onClick={() => window.print()}><FileDown className="size-4" />Exportar PDF</Button>
            </div>
          </footer>
        </DialogContent>
      </Dialog>
    </>
  );
}
