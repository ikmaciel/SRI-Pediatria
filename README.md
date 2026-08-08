# SRI Pediátrica - FRO (Ferramenta de Recomendação e Otimização)

Calculadora móvel de dose e volume baseada na apresentação disponível no serviço.

## Princípios de segurança

- Mostra separadamente dose total, volume retirado da ampola e volume após diluição.
- Exibe a faixa completa quando a prescrição admite mais de uma dose.
- Não recomenda automaticamente um indutor ou bloqueador.
- Usa a idade somente para alertas que realmente mudam segurança, como contexto neonatal e succinilcolina.
- Analisa combinações apenas entre medicamentos explicitamente marcados como planejados.
- Sinaliza contraindicações importantes da succinilcolina e cautela hemodinâmica.
- Não armazena peso ou condições do paciente.
- Separa adrenalina para parada cardíaca de outros usos.
- Separa adrenalina EV/IO para PCR/bradicardia da adrenalina IM para anafilaxia.
- Separa doses sequenciais de adenosina e naloxona, evitando interpretar etapas como uma faixa livre.
- Exibe a fonte clínica de cada regra revisada dentro do cartão do medicamento.
- Oferece modo claro e escuro, inicia pela preferência do aparelho e memoriza somente a escolha visual.
- Inclui uma área de configurações institucionais para revisar, salvar e exportar rascunhos de diluições e reconstituições.
- Rascunhos locais nunca alteram silenciosamente os cálculos ativos; uma mudança exige validação médica/farmacêutica e nova publicação.
- Funciona offline após o primeiro acesso bem-sucedido.

## Fonte institucional

As apresentações foram transcritas da planilha institucional enviada em 07/08/2026. Regras atualizadas podem divergir da planilha — principalmente glicose D10%, rocurônio em SRI e limites sequenciais — e ficam explicitamente marcadas. A interface permanece **em validação clínica** até aprovação formal do serviço.

A matriz completa de evidências, decisões e limitações está em [`REVISAO_CLINICA.md`](REVISAO_CLINICA.md).

## Uso

1. Abra <https://ikmaciel.github.io/SRI-Pediatria/>.
2. Informe o peso e a idade.
3. Abra `Checagem de segurança` quando houver comorbidades relevantes ou mais de um medicamento planejado.
4. Selecione `SRI`, `Reanimação` ou `Outros`.
5. Confira dose total e volume calculado.
6. Quando houver diluição, confira separadamente o volume da ampola, o diluente e o volume final.
7. Confirme no rótulo a concentração e siga o protocolo institucional antes da administração.

## Configurações institucionais

O botão `Configurações institucionais`, no rodapé, exibe o perfil de preparo embutido e permite criar um rascunho local estruturado. Esse rascunho pode ser salvo no aparelho e exportado como JSON para revisão, mas não altera doses, volumes ou diluições da tela de emergência. Somente uma nova versão validada e publicada pode modificar o perfil ativo.

## Fontes clínicas complementares

- [AHA/AAP Pediatric Advanced Life Support 2025](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support)
- [AHA/AAP Neonatal Resuscitation 2025](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/neonatal-resuscitation)
- [European Resuscitation Council — Paediatric Life Support 2025](https://www.erc.edu/media/03xnpjmj/gl2025-09-pls-e.pdf)
- [NEAR4KIDS — Airway Safety Bundle](https://www.research.chop.edu/near4kids/resources)
- [Brain Trauma Foundation — Pediatric Severe TBI](https://braintrauma.org/coma/guidelines/pediatric)
- [DailyMed — succinilcolina](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f55dd1c0-c259-219a-5bca-f139e9515d07)
- [World Allergy Organization Anaphylaxis Guidance 2020](https://www.worldallergyorganizationjournal.org/article/S1939-4551%2820%2930375-6/fulltext)

## Tecnologia

HTML, CSS e JavaScript sem dependências externas. O `service worker` usa estratégia de rede primeiro e mantém uma cópia local para indisponibilidade de conexão.
