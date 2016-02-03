'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('patchs');
ApplicationConfiguration.registerModule('patchs.groups', ['patchs', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.draggable-rows', 'ui.grid.exporter' , 'ui.grid.importer']);
