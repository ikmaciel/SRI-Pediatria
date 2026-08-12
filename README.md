# SRI Pediátrica - FRO (Ferramenta de Recomendação e Otimização)

Calculadora móvel de dose e volume baseada na apresentação disponível no serviço.

## Princípios de segurança

- Mostra separadamente dose total, volume retirado da ampola e volume após diluição.
- Exibe a faixa completa quando a prescrição admite mais de uma dose.
- Não recomenda automaticamente um indutor ou bloqueador.
- Usa a idade para alertas clínicos específicos e para contextualizar a frequência respiratória manual.
- Analisa combinações apenas entre medicamentos explicitamente marcados como planejados.
- Sinaliza contraindicações importantes da succinilcolina e cautela hemodinâmica.
- Não armazena peso ou condições do paciente.
- Separa adrenalina para parada cardíaca de outros usos.
- Separa adrenalina EV/IO para PCR/bradicardia da adrenalina IM para anafilaxia.
- Separa doses sequenciais de adenosina e naloxona, evitando interpretar etapas como uma faixa livre.
- Exibe a fonte clínica de cada regra revisada dentro do cartão do medicamento.
- Oferece modo claro e escuro, inicia pela preferência do aparelho e memoriza somente a escolha visual.
- Inclui uma área simples de diluições para ajustar proporções e volumes finais de reconstituição no aparelho em uso.
- Uma alteração só passa a valer depois da confirmação da médica e pode ser restaurada aos valores padrão a qualquer momento.
- Inclui contador respiratório manual de 60 segundos e leitura experimental pelo acelerômetro/giroscópio do celular.
- Classifica somente a contagem manual completa como abaixo, dentro ou acima da faixa respiratória aceitável por idade; peso não altera essa faixa.
- Pode usar o microfone como confirmação secundária: áudio baixo, saturado, ruidoso ou discordante é descartado e nunca gera resultado sozinho.
- Compara a leitura por movimento/áudio com a contagem manual e rejeita coleta curta, ausência de sensor ou sinal matematicamente insuficiente.
- Permite anotar FC, SpO₂, temperatura, pressão arterial, enchimento capilar, consciência e suporte de oxigênio sem armazenar os dados.
- Funciona offline após o primeiro acesso bem-sucedido.

## Fonte institucional

As apresentações foram transcritas da planilha institucional enviada em 07/08/2026. Regras atualizadas podem divergir da planilha — principalmente glicose D10%, rocurônio em SRI e limites sequenciais — e ficam explicitamente marcadas. A interface permanece **em validação clínica** até aprovação formal do serviço.

A matriz completa de evidências, decisões e limitações está em [`REVISAO_CLINICA.md`](REVISAO_CLINICA.md).

## Uso

1. Abra <https://ikmaciel.github.io/SRI-Pediatria/>.
2. Informe o peso e a idade.
3. Abra `Checagem de segurança` quando houver comorbidades relevantes ou mais de um medicamento planejado.
4. Abra `Respiração e sinais vitais` para fazer a contagem manual ou testar o sensor de movimento.
5. Selecione `SRI`, `Reanimação` ou `Outros`.
6. Confira dose total e volume calculado.
7. Quando houver diluição, confira separadamente o volume da ampola, o diluente e o volume final.
8. Confirme no rótulo a concentração e siga o protocolo institucional antes da administração.

## Respiração e sinais vitais

O contador manual usa uma janela padrão de 60 segundos: com a criança em repouso e sem choro, inicie o cronômetro e toque uma vez por ciclo respiratório completo. Uma finalização antes de 15 segundos é rejeitada; medições entre 15 e 59 segundos aparecem explicitamente como estimativa incompleta.

Depois de uma contagem manual completa, o app mostra se o valor está abaixo, dentro ou acima da faixa aceitável por idade publicada pelo Royal Children's Hospital Melbourne. A faixa é apenas contexto para crianças doentes: não diagnostica normalidade, não substitui tendência nem sinais de esforço respiratório. O peso informado aparece na observação, mas não muda o intervalo. Para menores de 5 anos, quando a frequência atinge o corte da OMS, o app exibe uma observação condicional aplicável somente se houver tosse ou dificuldade respiratória. O sensor experimental jamais produz essa classificação.

O modo `Movimento + som — experimental` solicita acesso ao acelerômetro/giroscópio e, opcionalmente, ao microfone; oferece 5 segundos para posicionar o aparelho e coleta até 60 segundos. O algoritmo procura periodicidade entre 8 e 100 irpm nos eixos do sensor. O áudio é analisado localmente como envelope de intensidade e só participa do resultado quando encontra ritmo compatível com o movimento. Som baixo, saturação, falta de periodicidade, discordância ou permissão negada fazem o app usar somente o movimento. Nenhum arquivo de áudio é criado, salvo ou enviado.

O telefone deve permanecer sob supervisão, nunca sobre face ou pescoço, e o resultado não substitui a contagem clínica nem equipamento médico validado.

Os sinais vitais digitados e as duas medições respiratórias permanecem somente na memória da página atual. `Novo paciente` limpa todos esses valores.

## Diluições

O botão `Diluições`, no rodapé, permite editar diretamente a proporção de diluente ou o volume final da reconstituição. Ao tocar em `Salvar e aplicar`, os volumes calculados passam a usar esses valores naquele navegador e aparelho. A opção `Restaurar padrão` retorna às definições publicadas no programa. Essas preferências ficam apenas no dispositivo; dados do paciente não são gravados.

## Fontes clínicas complementares

- [AHA/AAP Pediatric Advanced Life Support 2025](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support)
- [AHA/AAP Neonatal Resuscitation 2025](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/neonatal-resuscitation)
- [European Resuscitation Council — Paediatric Life Support 2025](https://www.erc.edu/media/03xnpjmj/gl2025-09-pls-e.pdf)
- [NEAR4KIDS — Airway Safety Bundle](https://www.research.chop.edu/near4kids/resources)
- [Brain Trauma Foundation — Pediatric Severe TBI](https://braintrauma.org/coma/guidelines/pediatric)
- [DailyMed — succinilcolina](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f55dd1c0-c259-219a-5bca-f139e9515d07)
- [World Allergy Organization Anaphylaxis Guidance 2020](https://www.worldallergyorganizationjournal.org/article/S1939-4551%2820%2930375-6/fulltext)
- [RCH Melbourne — faixas aceitáveis de variáveis fisiológicas](https://www.rch.org.au/clinicalguide/guideline_index/normal_ranges_for_physiological_variables/)
- [OMS — IMCI, avaliação de tosse ou dificuldade respiratória](https://cdn.who.int/media/docs/default-source/mca-documents/child/imci-integrated-management-of-childhood-illness/imci-in-service-training/imci_in-servicetraining_module_01.pdf)

## Tecnologia

HTML, CSS e JavaScript sem dependências externas. O `service worker` usa estratégia de rede primeiro e mantém uma cópia local para indisponibilidade de conexão.

Teste do algoritmo respiratório:

```powershell
node .\tests\respiration.test.js
```
