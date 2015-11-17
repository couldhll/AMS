'use strict';

// Packages service for package file
angular.module('packages').service('Packages', function () {
        // template
        this.template = function template(str, data){
            /*jslint evil: true */
            var fn =
                new Function("obj",
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +

                        // Introduce the data as local variables using with(){}
                    "with(obj){p.push('" +

                        // Convert the template into pure JavaScript
                    str
                        .replace(/[\r\t\n]/g, " ")// TODO: str no enter
                        .split("<%").join("\t")
                        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                        .replace(/\t=(.*?)%>/g, "',$1,'")
                        .split("\t").join("');")
                        .split("%>").join("p.push('")
                        .split("\r").join("\\'") +
                    "');}return p.join('');");

            // Provide some basic currying to the user
            return data ? fn( data ) : fn;
        };
    }
);
