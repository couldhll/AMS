'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('keyboardmenus');
ApplicationConfiguration.registerModule('keyboardmenus.groups', ['keyboardmenus', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.draggable-rows', 'ui.grid.exporter' , 'ui.grid.importer']);
