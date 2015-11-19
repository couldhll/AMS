'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('emojis');
ApplicationConfiguration.registerModule('emojis.groups', ['emojis', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.draggable-rows', 'ui.grid.exporter' , 'ui.grid.importer']);
