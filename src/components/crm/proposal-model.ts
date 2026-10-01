export const engineeringServices = [
  "Laudo Técnico",
  "Vistoria Técnica",
  "Vistoria de Entrega e Recebimento de Obra",
  "Vistoria de Entrega das Chaves",
  "Vistoria Locativa de Entrada",
  "Vistoria Locativa de Saída",
  "Vistoria de Constatação",
  "Vistoria de Constatação de Obra",
  "Vistoria Cautelar de Vizinhança",
  "Vistoria de Análise de Causalidade",
  "Vistoria de Análise Comparativa de Conformidade",
  "Vistoria de Reforma",
  "Inspeção Predial",
  "Avaliação de Imóveis",
] as const;

export interface ProposalDraft {
  leadId: string;
  number: string;
  date: string;
  service: string;
  customerName: string;
  customerCpf: string;
  customerPhone: string;
  propertyAddress: string;
  propertyNotes: string;
  objective: string;
  constantItems: string;
  methodology: string;
  deliverables: string;
  amount: string;
  paymentTerms: string;
  validityDays: string;
  deadline: string;
  excluded: string;
}

export interface ProposalLead {
  id: string;
  nome: string | null;
  numero: string;
  valor: number | null;
}

const DRAFTS_KEY = "templar-proposal-drafts-v1";
const SEQUENCE_KEY = "templar-proposal-sequence-v1";
const SAMPLE_SEQUENCE = 20;

function readAllDrafts(): Record<string, ProposalDraft> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(DRAFTS_KEY) || "{}") as Record<string, ProposalDraft>;
  } catch {
    return {};
  }
}

export function loadProposalDraft(leadId: string) {
  return readAllDrafts()[leadId] ?? null;
}

export function createProposalDraft(lead: ProposalLead): ProposalDraft {
  const drafts = readAllDrafts();
  const existing = drafts[lead.id];
  if (existing) return existing;

  const previous = Number(window.localStorage.getItem(SEQUENCE_KEY) || SAMPLE_SEQUENCE);
  const next = Number.isFinite(previous) ? previous + 1 : SAMPLE_SEQUENCE + 1;
  window.localStorage.setItem(SEQUENCE_KEY, String(next));
  const today = new Date();
  const date = new Date(today.getTime() - today.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);

  return {
    leadId: lead.id,
    number: `PROP-${String(next).padStart(4, "0")}`,
    date,
    service: engineeringServices[0],
    customerName: lead.nome || "",
    customerCpf: "",
    customerPhone: lead.numero,
    propertyAddress: "",
    propertyNotes: "",
    objective: "",
    constantItems: "",
    methodology: "",
    deliverables: "",
    amount: lead.valor == null ? "" : String(lead.valor),
    paymentTerms: "50% no aceite da proposta e 50% na entrega do laudo.",
    validityDays: "30 dias",
    deadline: "",
    excluded: "",
  };
}

export function saveProposalDraft(draft: ProposalDraft) {
  if (typeof window === "undefined") return;
  const drafts = readAllDrafts();
  drafts[draft.leadId] = draft;
  window.localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function formatProposalDate(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}/${month}/${year}` : value;
}

export function formatProposalCurrency(value: string) {
  const amount = Number(value);
  return Number.isFinite(amount)
    ? amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : "R$ 0,00";
}
