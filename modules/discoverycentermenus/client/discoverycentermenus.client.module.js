'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('discoverycentermenus');
ApplicationConfiguration.registerModule('discoverycentermenus.groups', ['discoverycentermenus', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.draggable-rows', 'ui.grid.exporter' , 'ui.grid.importer']);
