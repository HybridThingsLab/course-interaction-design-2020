var browserSync = require('browser-sync');
const { watch } = require('gulp');
var gulp = require('gulp');


let config = {
    pubdir: "../"
}


function tconnect(){
    
    browserSync.init({
        server: {
            directory: true,
            baseDir: "./.."

        },        
                   
    });
    
};

function treload(cb){
    browserSync.reload();    
    cb();
};

exports.serve = function(){  
    tconnect();
    console.log(config.scss+'**/*.scss');    
    watch( [config.pubdir+'**/*.js', config.pubdir+'**/*.html'], treload);
};