export interface Solicitacao {
  id: string;
  tipoAtividade: string;
  horas: number;
  status: 'pendente' | 'aprovado' | 'recusado';
  dataEnvio: string;
}

export const solicitacoesMock: Solicitacao[] = [
  {
    id: "1",
    tipoAtividade: "Palestra Inovação Tecnológica",
    horas: 4,
    status: "aprovado",
    dataEnvio: "15/05/2026",
  },
  {
    id: "2",
    tipoAtividade: "Curso Extensão React Native",
    horas: 20,
    status: "pendente",
    dataEnvio: "22/05/2026",
  },
  {
    id: "3",
    tipoAtividade: "Workshop de UX/UI",
    horas: 8,
    status: "recusado",
    dataEnvio: "10/05/2026",
  },
];