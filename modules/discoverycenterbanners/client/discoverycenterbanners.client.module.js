'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('discoverycenterbanners');
ApplicationConfiguration.registerModule('discoverycenterbanners.groups', ['discoverycenterbanners', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.draggable-rows', 'ui.grid.exporter' , 'ui.grid.importer']);
