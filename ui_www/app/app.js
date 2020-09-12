

var d = new Dashboard();

function init() {
    alert('App Init');
    d.title('New App');

    var sbars = new Array();
    sbars.push( {'icon' : '', 'content' : 'Info', } );
    sbars.push( {'icon' : '', 'content' : 'Info2'} );
    sbars.push( {'icon' : '', 'content' : 'Info3'} );
    d.sidebar(sbars, 'sidebar')
}