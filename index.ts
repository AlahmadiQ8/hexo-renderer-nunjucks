import * as nunjucks from 'nunjucks';
import * as path from 'path';

declare var hexo: HexoStatic;

var nunjucksDefaults: NunjucksOptions = {
    autoescape: false,
};

if (typeof hexo.config.nunjucks == 'undefined') {
    hexo.config.nunjucks = {};
}
    
for (let key in nunjucksDefaults) {
    
    if ( ! nunjucksDefaults.hasOwnProperty(key)) continue;
    
    if (typeof hexo.config.nunjucks[key] == 'undefined') {
        hexo.config.nunjucks[key] = (<any>nunjucksDefaults)[key]
    }
}

var renderer: HexoSyncRenderer = function (data, locals) {
    
    var templateDir = path.dirname(data.path);
    var env = nunjucks.configure(templateDir, hexo.config.nunjucks);
    
    return env.renderString(data.text, locals);  
}

hexo.extend.renderer.register('nunjucks', 'html', renderer, true);
hexo.extend.renderer.register('j2', 'html', renderer, true);