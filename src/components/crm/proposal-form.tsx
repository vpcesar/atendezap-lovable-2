import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { engineeringServices, type ProposalDraft } from "./proposal-model";

type UpdateDraft = <K extends keyof ProposalDraft>(key: K, value: ProposalDraft[K]) => void;

function InputField({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <div className="space-y-1.5"><Label>{label}</Label><Input type={type} value={value} onChange={(event) => onChange(event.target.value)} /></div>;
}

function TextField({ label, value, onChange, hint }: { label: string; value: string; onChange: (value: string) => void; hint?: string }) {
  return <div className="space-y-1.5"><Label>{label}</Label><Textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} />{hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>;
}

export function ProposalForm({ draft, update }: { draft: ProposalDraft; update: UpdateDraft }) {
  return (
    <div className="space-y-5 p-4 sm:p-5">
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-primary">Identificação</h3>
        <div className="grid grid-cols-2 gap-3">
          <InputField label="Número" value={draft.number} onChange={(value) => update("number", value)} />
          <InputField label="Data de emissão" type="date" value={draft.date} onChange={(value) => update("date", value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Serviço técnico</Label>
          <Select value={draft.service} onValueChange={(value) => update("service", value)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{engineeringServices.map((service) => <SelectItem key={service} value={service}>{service}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </section>

      <section className="space-y-3 border-t pt-4">
        <h3 className="text-sm font-semibold text-primary">Cliente e imóvel</h3>
        <InputField label="Nome do contratante" value={draft.customerName} onChange={(value) => update("customerName", value)} />
        <div className="grid grid-cols-2 gap-3">
          <InputField label="CPF / CNPJ" value={draft.customerCpf} onChange={(value) => update("customerCpf", value)} />
          <InputField label="Telefone / WhatsApp" value={draft.customerPhone} onChange={(value) => update("customerPhone", value)} />
        </div>
        <InputField label="Endereço do imóvel / objeto" value={draft.propertyAddress} onChange={(value) => update("propertyAddress", value)} />
        <TextField label="Observações do imóvel" value={draft.propertyNotes} onChange={(value) => update("propertyNotes", value)} />
      </section>

      <section className="space-y-3 border-t pt-4">
        <h3 className="text-sm font-semibold text-primary">Conteúdo técnico</h3>
        <TextField label="Objetivo" value={draft.objective} onChange={(value) => update("objective", value)} />
        <TextField label="Itens constantes" value={draft.constantItems} onChange={(value) => update("constantItems", value)} hint="Use uma linha para cada item; o texto fica editável e a prévia acompanha as alterações." />
        <TextField label="Metodologia" value={draft.methodology} onChange={(value) => update("methodology", value)} />
        <TextField label="Entregáveis" value={draft.deliverables} onChange={(value) => update("deliverables", value)} />
        <TextField label="Não incluído" value={draft.excluded} onChange={(value) => update("excluded", value)} />
      </section>

      <section className="space-y-3 border-t pt-4">
        <h3 className="text-sm font-semibold text-primary">Valores e fechamento</h3>
        <div className="grid grid-cols-2 gap-3">
          <InputField label="Valor total (R$)" type="number" value={draft.amount} onChange={(value) => update("amount", value)} />
          <InputField label="Prazo de execução" value={draft.deadline} onChange={(value) => update("deadline", value)} />
        </div>
        <InputField label="Condição de pagamento" value={draft.paymentTerms} onChange={(value) => update("paymentTerms", value)} />
        <InputField label="Validade da proposta" value={draft.validityDays} onChange={(value) => update("validityDays", value)} />
      </section>
    </div>
  );
}
