'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('spotlights');
ApplicationConfiguration.registerModule('spotlights.groups', ['spotlights', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.draggable-rows', 'ui.grid.exporter' , 'ui.grid.importer']);
