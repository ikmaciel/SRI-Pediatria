# Validação e governança clínica

## Estado do produto

O FRO é material de apoio em validação. A existência de testes automatizados, referências ou avisos na interface não equivale a validação clínica, homologação institucional ou regularização sanitária.

## Indicação de uso proposta

Auxiliar profissionais habilitados a conferir cálculos pediátricos de dose e volume a partir de uma dose prescrita e da apresentação disponível, mostrando separadamente dose total, volume aspirado, diluente e volume final. O sistema não escolhe o medicamento, não substitui prescrição e não recomenda conduta autônoma.

## Barreiras ativas nesta versão

- Idade obrigatória antes de exibir cálculos na interface.
- Em menores de 28 dias, protocolo explicitamente selecionado; catálogo neonatal permanece bloqueado.
- Peso marcado como medido, estimado ou não informado.
- Aviso para volume aspirado abaixo de 0,1 mL, sem propor diluição improvisada.
- Medicamentos planejados selecionados no cartão da indicação correta.
- Checklist de SRI com confirmações reais, reiniciado em `Novo paciente`.
- Preparos e reconstituições locais em modo somente leitura.
- Novos registros de evolução limitados à sessão atual.
- Sensor respiratório automático disponível somente como função experimental, sem classificação clínica e sem substituir a contagem manual.

## Gates antes de uso assistencial

Nenhuma versão deve ser declarada pronta enquanto todos os itens abaixo não estiverem documentados.

1. Indicação de uso e população-alvo aprovadas pela instituição.
2. Enquadramento regulatório analisado formalmente.
3. Cada medicamento, apresentação, via, dose, limite e preparo aprovado por médico e farmacêutico responsáveis.
4. Regra institucional para microvolumes, seringas e arredondamento aprovada.
5. Rastreabilidade entre requisito, fonte clínica, implementação e teste.
6. Testes unitários, de integração, interface, acessibilidade, offline e recuperação aprovados.
7. Análise de riscos/FMEA e testes de usabilidade em simulações realistas concluídos.
8. Política de privacidade, base legal, retenção, controle de acesso e resposta a incidente definidas.
9. Plano de treinamento, contingência e retirada de versão publicado.
10. Homologação final registrada no changelog clínico.

## Matriz de responsabilidades

| Área | Responsabilidade mínima |
|---|---|
| Pediatria/intensiva/anestesia | Indicação, dose, limites, alertas e fluxo de SRI |
| Farmácia clínica | Apresentações, estabilidade, compatibilidade, diluição, reconstituição e mensurabilidade |
| Enfermagem | Preparo, seringa, rotulagem, dupla checagem e usabilidade à beira-leito |
| Engenharia | Implementação, testes, segurança, atualização e rastreabilidade |
| Privacidade/segurança | LGPD, controle de acesso, retenção, exportação e incidentes |
| Regulatório | Enquadramento, documentação e comunicação com Anvisa |
| Responsável institucional | Aceite final, vigência e retirada de versões |

## Evidência mínima por regra clínica

Cada regra deve ter identificador estável, indicação, população, dose, unidade, via, concentração, limites, preparo, fonte primária, data de revisão, aprovadores e casos de teste. Divergências entre protocolo local e fonte externa devem ser resolvidas formalmente; um aviso visual não substitui a decisão institucional.

## Sensor respiratório

O sensor permanece disponível como protótipo técnico experimental e não deve orientar, adiar ou modificar conduta. Validação para finalidade clínica exige protocolo de pesquisa, aprovação ética quando aplicável, comparação simultânea com referência validada, amostra representativa por idade/doença/aparelho/posição e análise de falhas, concordância e impacto clínico.

## Critério de release

Um release clínico precisa registrar versão do catálogo, hash/commit, resultados de testes, mudanças clínicas, aprovadores, data de vigência e plano de rollback. Alterações exclusivamente visuais também exigem teste de usabilidade quando modificarem hierarquia, alertas ou sequência de preparo.
