module.exports = function() {
    var client = 'client',
        clientApp = './client/app'
        dist = 'dist',
        tmp = '.tmp',
        docs = 'documentation',
        landing = 'landing';
    var config = {
        client: client,
        dist: dist,
        tmp: tmp,
        index: client + '/index.html',
        alljs: [
            client + '/app/**/*.js',
            './*.js'
        ],
        assets: [
            client + '/app/**/*.html',
            client + '/bower_components/font-awesome/css/*', 
            client + '/bower_components/font-awesome/fonts/*', 
            client + '/bower_components/material-design-iconic-font/dist/**/*',
            client + '/assets/**/*',
            client + '/styles/loader.css', 
            client + '/styles/ui/images/*', 
            client + '/favicon.ico'
        ],
        assetsLazyLoad: [
            // fonts load async
            client + '/bower_components/webfontloader/webfontloader.js',
            // 
            client + '/bower_components/ngmap/build/scripts/ng-map.min.js',
            //
            client + '/bower_components/moment/min/moment.min.js',
            client + '/bower_components/fullcalendar/dist/fullcalendar.min.js',
            client + '/bower_components/angular-ui-calendar/src/calendar.js',
            // 
            client + '/app/app/calendar/calendar.module.js',
            client + '/app/app/calendar/calendar.controller.js',
            // 
            client + '/bower_components/textAngular/dist/textAngular-sanitize.min.js',
            client + '/bower_components/rangy/rangy-core.min.js',
            client + '/bower_components/rangy/rangy-selectionsaverestore.min.js',
            client + '/bower_components/textAngular/dist/textAngular.js', 
            client + '/bower_components/textAngular/dist/textAngularSetup.js'
        ],
        less: [],
        sass: [
            client + '/styles/**/*.scss'
        ],
        js: [
            clientApp + '/**/*.module.js',
            clientApp + '/**/*.js',
            '!' + clientApp + '/**/*.spec.js'
        ],
        docs: docs, 
        docsJade: [
            docs + '/jade/index.jade',
            docs + '/jade/faqs.jade',
            docs + '/jade/layout.jade'
        ],
        allToClean: [
            tmp, 
            '.DS_Store',
            '.sass-cache',
            'node_modules',
            '.git',
            client + '/bower_components',
            docs + '/jade',
            docs + '/layout.html',
            landing + '/jade',
            landing + '/bower_components',
            'readme.md'
        ]
    };

    return config;
};