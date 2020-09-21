

var d = new Dashboard();

function init() {
    //alert('App Init');
    d.title('New App');

    var sbars = new Array();
    sbars.push( {'icon' : 'tim-icons icon-app', 'content' : 'Info1', 'onclick' : 'renderView1();' } );
    sbars.push( {'icon' : 'glyphicon glyphicon-cog', 'content' : 'Info2', 'onclick' : 'renderView2();' } );
    sbars.push( {'icon' : 'tim-icons icon-app', 'content' : 'Info3', 'onclick' : 'renderView3();' } );
    d.sidebar(sbars, 'sidebar');


}







