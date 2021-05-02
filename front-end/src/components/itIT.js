const itITGrid = {
    // Root
    rootGridLabel: 'Tabella',
    noRowsLabel: 'Nessuna voce',
    errorOverlayDefaultLabel: 'Si è verificato un errore imprevisto.',
  
    // Density selector toolbar button text
    toolbarDensity: 'Densità riga',
    toolbarDensityLabel: 'Densità riga',
    toolbarDensityCompact: 'Compatta',
    toolbarDensityStandard: 'Standard',
    toolbarDensityComfortable: 'Ampia',
  
    // Columns selector toolbar button text
    toolbarColumns: 'Colonne',
    toolbarColumnsLabel: 'Mostra selezione colonna',
  
    // Filters toolbar button text
    toolbarFilters: 'Filtro',
    toolbarFiltersLabel: 'Mostra filtro',
    toolbarFiltersTooltipHide: 'Verstecke Filter',
    toolbarFiltersTooltipShow: 'Zeige Filter',
    toolbarFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} filtro attivo` : `${count} attiva filtro`,
  
    // Columns panel text
    columnsPanelTextFieldLabel: 'Cerca colonna',
    columnsPanelTextFieldPlaceholder: 'Colonna',
    columnsPanelDragIconLabel: 'Riordina colonna',
    columnsPanelShowAllButton: 'Mostra tutto',
    columnsPanelHideAllButton: 'Nascondi tutto',
  
    // Filter panel text
    filterPanelAddFilter: 'Aggiungi filtro',
    filterPanelDeleteIconLabel: 'Cancella filtro',
    filterPanelOperators: 'Condizione',
    filterPanelOperatorAnd: 'Und',
    filterPanelOperatorOr: 'Oder',
    filterPanelColumns: 'Colonna',
    filterPanelInputLabel: 'Testo',
    filterPanelInputPlaceholder: 'Testo da filtrare',
  
    // Filter operators text
    filterOperatorContains: 'Contiene',
    filterOperatorEquals: 'è uguale a',
    filterOperatorStartsWith: 'inizia con',
    filterOperatorEndsWith: 'finisce con',
    filterOperatorIs: 'è',
    filterOperatorNot: 'non è',
    filterOperatorOnOrAfter: 'ist an oder nach',
    filterOperatorBefore: 'è prima',
    filterOperatorOnOrBefore: 'ist an oder vor',
    filterOperatorAfter: 'è dopo',
  
    // Column menu text
    columnMenuLabel: 'Menu',
    columnMenuShowColumns: 'Gestisci visualizzazione colonne',
    columnMenuFilter: 'Filtro',
    columnMenuHideColumn: 'Nascondi',
    columnMenuUnsort: 'Disabilita ordinamento',
    columnMenuSortAsc: 'Ordina in modo crescente',
    columnMenuSortDesc: 'Ordina in modo decrescente',
  
    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} Filtro attivo` : `${count} Filtro non attivo`,
    columnHeaderFiltersLabel: 'Mostra Filtro',
    columnHeaderSortIconLabel: 'Ordina',
  
    // Rows selected footer text
    footerRowSelected: (count) =>
      count !== 1
        ? `${count.toLocaleString()} Einträge ausgewählt`
        : `${count.toLocaleString()} Eintrag ausgewählt`,
  
    // Total rows footer text
    footerTotalRows: 'Righe:',
  };
  
  export default itITGrid;
  
  