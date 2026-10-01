import { formatProposalCurrency, formatProposalDate, type ProposalDraft } from "./proposal-model";

function TextBlock({ title, text }: { title: string; text: string }) {
  if (!text.trim()) return null;
  return (
    <section className="proposal-block">
      <h3 className="proposal-section-title">{title}</h3>
      <div className="proposal-copy">{text.split("\n").filter(Boolean).map((line, index) => <p key={`${title}-${index}`}>{line}</p>)}</div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div className="proposal-detail"><span>{label}</span><strong>{value || "—"}</strong></div>;
}

export function ProposalPreview({ draft }: { draft: ProposalDraft }) {
  const half = Number(draft.amount) / 2;
  const halfText = Number.isFinite(half) ? formatProposalCurrency(String(half)) : "R$ 0,00";

  return (
    <article id="templar-proposal-print" className="proposal-paper bg-white text-slate-800 shadow-xl">
      <header className="proposal-brand-header">
        <div>
          <div className="proposal-wordmark">TEMPLAR <span>ENGENHARIA</span></div>
          <p>Vistorias · Inspeções · Laudos · Perícias</p>
        </div>
        <div className="proposal-number"><span>PROPOSTA COMERCIAL</span><strong>Nº {draft.number || "PROP-____"}</strong><small>Emissão: {formatProposalDate(draft.date) || "—"}</small></div>
      </header>

      <section className="proposal-block">
        <h2 className="proposal-section-title">Responsável Técnico</h2>
        <div className="proposal-details-grid">
          <Detail label="Nome" value="Vinicius Cesar" />
          <Detail label="CREA" value="RJ 2024100977" />
        </div>
      </section>

      <section className="proposal-block">
        <h2 className="proposal-section-title">Dados do Cliente</h2>
        <div className="proposal-details-grid">
          <Detail label="Nome" value={draft.customerName} />
          <Detail label="CPF" value={draft.customerCpf} />
          <Detail label="Telefone / WhatsApp" value={draft.customerPhone} />
        </div>
      </section>

      <section className="proposal-block">
        <h2 className="proposal-section-title">Dados do Imóvel / Objeto</h2>
        <div className="proposal-details-grid"><Detail label="Endereço" value={draft.propertyAddress} /></div>
        {draft.propertyNotes && <p className="proposal-copy proposal-notes">{draft.propertyNotes}</p>}
      </section>

      <section className="proposal-block">
        <h2 className="proposal-section-title">Serviço Contratado</h2>
        <p className="proposal-service">{draft.service}</p>
      </section>

      <h2 className="proposal-main-title">Escopo dos Serviços</h2>
      <TextBlock title="Objetivo" text={draft.objective} />
      <TextBlock title="Itens Constantes" text={draft.constantItems} />
      <TextBlock title="Metodologia" text={draft.methodology} />
      <TextBlock title="Entregáveis" text={draft.deliverables} />

      <section className="proposal-block">
        <h2 className="proposal-section-title">Valores e Condições</h2>
        <div className="proposal-details-grid">
          <Detail label="Valor total" value={formatProposalCurrency(draft.amount)} />
          <Detail label="Pagamento" value={draft.paymentTerms} />
          {draft.amount && <Detail label="Referência de cada parcela (50%)" value={halfText} />}
          <Detail label="Validade" value={draft.validityDays} />
          <Detail label="Prazo de execução" value={draft.deadline} />
        </div>
      </section>

      <TextBlock title="Não Incluído" text={draft.excluded} />

      <footer className="proposal-footer">
        <span>www.templarengenharia.com.br · templarengenharia@hotmail.com</span>
        <span>WhatsApp (21) 98180-8812</span>
        <small>Proposta {draft.number || "PROP-____"}</small>
      </footer>
    </article>
  );
}
