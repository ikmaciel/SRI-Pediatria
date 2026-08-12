# Changelog clínico

Este arquivo registra mudanças que podem alterar interpretação, cálculo, preparo, seleção ou segurança clínica. Aprovação pendente nunca deve ser interpretada como homologação.

## 2026-08-12 — correção v27 — contagem automática restaurada

- Contagem respiratória automática novamente habilitada na interface.
- Fluxo completo preservado: posicionamento, leitura de movimento, confirmação secundária opcional por microfone, animação, contagem provisória e resultado experimental.
- Rótulo experimental, ausência de classificação clínica automática e recomendação de confirmação manual mantidos.
- Cache do aplicativo atualizado para entregar a correção também às instalações PWA existentes.

## 2026-08-12 — perfil v26 — aprovação institucional pendente

### Identidade e escopo

- FRO passa a significar `Ferramenta de Redução de Riscos e Otimização`.
- Cálculo de dose/volume volta a ser o fluxo principal.
- Sensor respiratório automático continua disponível como função experimental; contagem manual permanece a referência.

### Barreiras de segurança

- Idade passa a ser obrigatória para liberar cálculos na interface.
- Em menores de 28 dias, seleção explícita de protocolo; catálogo neonatal bloqueado.
- Origem do peso pode ser marcada como medida ou estimada.
- Volumes aspirados abaixo de 0,1 mL recebem alerta de mensurabilidade.
- Preparos locais passam a ser somente leitura.
- Checklist de SRI passa a exigir confirmações reais.
- Seleção de medicamentos passa a ocorrer no cartão da indicação, evitando ambiguidade entre lidocaína para SRI e arritmia.

### Privacidade e plataforma

- Novos registros de evolução ficam apenas na sessão atual.
- Histórico persistente legado pode ser removido com `Apagar tudo`.
- Verificação de conectividade passa a testar o servidor, sem depender apenas de `navigator.onLine`.
- Service worker deixa de apagar caches não pertencentes ao FRO e não devolve HTML como fallback de recursos estáticos ausentes.
- Política de segurança de conteúdo adicionada à página.

### Verificação necessária

- [ ] Aprovação médica.
- [ ] Aprovação farmacêutica.
- [ ] Aprovação de enfermagem/usabilidade.
- [ ] Avaliação de privacidade e segurança.
- [ ] Avaliação regulatória.
- [ ] Teste institucional de microvolumes e seringas.
- [ ] Homologação para uso assistencial.

## Regra para próximas versões

Toda mudança em medicamento, dose, concentração, limite, indicação, via, preparo ou alerta deve incluir fonte, justificativa, casos de teste e dois aprovadores clínicos definidos pela instituição.
