# SRI Pediátrica - FRO (Ferramenta de Recomendação e Otimização)

Calculadora móvel de dose e volume baseada na apresentação disponível no serviço.

## Princípios de segurança

- Mostra separadamente dose total, volume retirado da ampola e volume após diluição.
- Exibe a faixa completa quando a prescrição admite mais de uma dose.
- Não recomenda automaticamente um indutor ou bloqueador.
- Usa a idade para alertas clínicos específicos e para contextualizar a frequência respiratória manual.
- Analisa combinações apenas entre medicamentos explicitamente marcados como planejados.
- Sinaliza contraindicações importantes da succinilcolina e cautela hemodinâmica.
- Não armazena dados do paciente automaticamente; o histórico local só é criado por ação explícita da médica.
- Separa adrenalina para parada cardíaca de outros usos.
- Separa adrenalina EV/IO para PCR/bradicardia da adrenalina IM para anafilaxia.
- Separa doses sequenciais de adenosina e naloxona, evitando interpretar etapas como uma faixa livre.
- Exibe a fonte clínica de cada regra revisada dentro do cartão do medicamento.
- Oferece modo claro e escuro, inicia pela preferência do aparelho e memoriza somente a escolha visual.
- Inclui uma área simples de diluições para ajustar proporções e volumes finais de reconstituição no aparelho em uso.
- Uma alteração só passa a valer depois da confirmação da médica e pode ser restaurada aos valores padrão a qualquer momento.
- Inclui contador respiratório manual de 60 segundos e leitura experimental pelo acelerômetro/giroscópio do celular.
- Mantém um botão grande `Analisar respiração` no topo, independente da navegação de medicamentos.
- Ao abrir, pergunta se a médica deseja contagem manual ou automática; ao terminar, mostra frequência, interpretação disponível e ocorrências registradas antes de oferecer salvamento local para acompanhamento.
- No modo automático, mostra somente sensor, áudio, movimento, qualidade e candidatos técnicos; entradas e classificações manuais ficam ocultas.
- A área principal do automático prioriza contagem, tempo, animação e controles; orientações, estado do áudio e avisos aparecem depois. O microfone não tem chave manual: quando disponível e autorizado, é usado apenas como confirmação secundária.
- Classifica somente a contagem manual completa como abaixo, dentro ou acima da faixa respiratória aceitável por idade; peso não altera essa faixa.
- Pode usar o microfone como confirmação secundária: áudio baixo, saturado, ruidoso ou discordante é descartado e nunca gera resultado sozinho.
- Mostra uma animação ao vivo da amplitude relativa do movimento, sem classificar inspiração ou expiração.
- Permite marcar tosse, espirro e duração de pausa observados pela médica e mantém esses registros separados de candidatos técnicos do celular.
- Procura um padrão acústico repetitivo de baixa frequência compatível com ronco e exige confirmação clínica; não diagnostica obstrução ou apneia.
- Procura apenas picos abruptos simultâneos de som/movimento e pausas técnicas de sinal; não diagnostica tosse, espirro ou apneia.
- Inclui marcação manual de tiragens, batimento de asa nasal, gemência, estridor, sibilância, cianose/palidez, gasping e fadiga respiratória.
- Compara a leitura por movimento/áudio com a contagem manual e rejeita coleta curta, ausência de sensor ou sinal matematicamente insuficiente.
- Permite anotar FC, SpO₂, temperatura, pressão arterial, enchimento capilar, consciência e suporte de oxigênio; só salva quando a médica usa `Histórico / evolução`.
- Oferece histórico local opcional por código não identificável, com exportação e exclusão, sem armazenar áudio bruto.
- Pode ser instalado como aplicativo pelo botão `Instalar aplicativo`.
- Funciona offline após o primeiro acesso bem-sucedido.

## Fonte institucional

As apresentações foram transcritas da planilha institucional enviada em 07/08/2026. Regras atualizadas podem divergir da planilha — principalmente glicose D10%, rocurônio em SRI e limites sequenciais — e ficam explicitamente marcadas. A interface permanece **em validação clínica** até aprovação formal do serviço.

A matriz completa de evidências, decisões e limitações está em [`REVISAO_CLINICA.md`](REVISAO_CLINICA.md).

## Uso

1. Abra <https://ikmaciel.github.io/SRI-Pediatria/>.
2. Informe o peso e a idade.
3. Abra `Checagem de segurança` quando houver comorbidades relevantes ou mais de um medicamento planejado.
4. Toque no botão destacado `Analisar respiração` para abrir diretamente a contagem, a animação e os eventos respiratórios.
5. Selecione `SRI`, `Reanimação` ou `Outros`.
6. Confira dose total e volume calculado.
7. Quando houver diluição, confira separadamente o volume da ampola, o diluente e o volume final.
8. Confirme no rótulo a concentração e siga o protocolo institucional antes da administração.

## Respiração e sinais vitais

O contador manual usa uma janela padrão de 60 segundos: com a criança em repouso e sem choro, inicie o cronômetro e toque uma vez por ciclo respiratório completo. Uma finalização antes de 15 segundos é rejeitada; medições entre 15 e 59 segundos aparecem explicitamente como estimativa incompleta.

Depois de uma contagem manual completa, o app mostra se o valor está abaixo, dentro ou acima da faixa aceitável por idade publicada pelo Royal Children's Hospital Melbourne. A faixa é apenas contexto para crianças doentes: não diagnostica normalidade, não substitui tendência nem sinais de esforço respiratório. O peso informado aparece na observação, mas não muda o intervalo. Para menores de 5 anos, quando a frequência atinge o corte da OMS, o app exibe uma observação condicional aplicável somente se houver tosse ou dificuldade respiratória. O sensor experimental jamais produz essa classificação.

O modo `Movimento + som — experimental` solicita acesso ao acelerômetro/giroscópio e, opcionalmente, ao microfone; oferece 5 segundos para posicionar o aparelho e coleta até 60 segundos. O algoritmo procura periodicidade entre 8 e 90 irpm nos eixos do sensor. Um pico no limite superior ou sem máximo periódico local confiável é rejeitado como sinal insuficiente, em vez de virar um resultado artificial. O áudio é analisado localmente como envelope de intensidade e só participa do resultado quando encontra ritmo compatível com o movimento. Som baixo, saturação, falta de periodicidade, discordância ou permissão negada fazem o app usar somente o movimento. Nenhum arquivo de áudio é criado, salvo ou enviado.

Para ronco, o app procura episódios acústicos repetitivos com predominância de baixa frequência e concordância aproximada com o movimento respiratório. O resultado aparece como `possível ronco` e nunca como diagnóstico. A médica também pode marcar `Ronco observado` ou `Ronco/ruído de via aérea superior` manualmente.

Durante a coleta automática, a animação ocupa uma área ampla da tela: os pulmões animados e uma barra mostram a intensidade relativa do movimento captado (`não detectado`, `baixo`, `moderado` ou `intenso`). Depois de pelo menos 15 segundos e somente se houver periodicidade suficiente, aparecem ciclos estimados e frequência provisória, atualizados aproximadamente uma vez por segundo. A interface não nomeia inspiração ou expiração porque a posição e a orientação do telefone podem inverter o sinal. A animação não mede fluxo de ar, volume corrente ou ventilação.

Ao final dos 60 segundos, o app reproduz dois tons curtos, quando o navegador permite áudio, e mostra um gráfico temporal da frequência respiratória estimada. Faixas e marcadores posicionam pausas técnicas ≥10 segundos, **tosses candidatas** (som abrupto junto com movimento), outros picos acústicos e episódios de baixa frequência candidatos de ronco. Tosse aparece antes de ronco na leitura. O algoritmo não confirma que um evento abrupto seja tosse: choro, fala, toque ou deslocamento podem produzir o mesmo marcador.

Os botões de eventos registram observações da médica. Separadamente, ao final da coleta, o app informa candidatos abruptos quando encontra picos próximos no som e no movimento e pausas técnicas quando o sinal respiratório fica muito reduzido por pelo menos 10 segundos. Tosse, espirro, choro, fala, manipulação, deslocamento do aparelho e ruído podem produzir sinais semelhantes. Uma pausa técnica pode ser falha de contato e **não confirma apneia**.

O telefone deve permanecer sob supervisão, nunca sobre face ou pescoço, e o resultado não substitui a contagem clínica nem equipamento médico validado.

Os sinais vitais digitados e as duas medições respiratórias permanecem somente na memória da página atual, exceto quando a médica escolhe explicitamente `Salvar medição atual` no histórico. `Novo paciente` limpa os campos ativos, mas não apaga o histórico já autorizado.

## Histórico local e evolução

O botão `Histórico / evolução` cria registros somente após a médica informar um código local, confirmar autorização e tocar em `Salvar medição atual`. São salvos resultados estruturados — idade, peso, frequências, eventos, achados, sinais vitais e observação — sem áudio ou amostras brutas dos sensores. Não use nome, CPF, registro hospitalar ou data de nascimento. Os dados ficam no armazenamento do navegador daquele aparelho, podem ser exportados como JSON e apagados integralmente.

## Instalação

O botão `Instalar aplicativo` abre a confirmação nativa quando disponível no Chrome/Android e mostra as instruções para `Adicionar à Tela de Início` no Safari/iPhone. O manifesto inclui ícones de 192 e 512 px, execução independente, atalho respiratório e cache offline. A instalação não altera o caráter experimental dos sensores.

Quando uma nova versão termina de baixar, aparece o botão `Nova versão disponível — atualizar agora`. A atualização só é aplicada depois do toque, para não recarregar a tela durante uma medição. Ao confirmar, o aplicativo ativa a nova versão e recarrega automaticamente. Ele também verifica atualizações ao abrir/focar a página e a cada 30 minutos enquanto estiver aberto e conectado.

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
