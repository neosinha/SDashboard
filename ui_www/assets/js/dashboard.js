
var bui = new Bootstrap();

var Dashboard  = function () {
    /**
    **/
    this.title = function ( content) {
		var el = document.getElementById('title') ;
		if (content) {
	        el.innerHTML = '';
	        if (typeof content == 'string') {
	            el.innerHTML = content;
			} else {
	            el.appenChild(content);
			}
		}
		return el;
	}


    /**
    **/
    this.sidebar = function( sidebars, idx) {
        var sbar = document.getElementById('sidebar');
        sbar.innerHTML = '';
        //bui.balert('BootObject');
        var lx, ix;
        for (i=0; i < sidebars.length; i++) {
            var sidebar = sidebars[i];
            var icon = null ;
            var content = null ;
            var onclick = null ;

            if (sidebar['icon'] != null) {
               lx = bui.createElement('li', 'sidebar'+i);
                /*Add Icon First*/
                var ix = document.createElement('i');
                ix.setAttribute('class', sidebar['icon']);
                lx.appendChild(ix);
            }
            /*Add onclick actions */
            if (sidebar['onclick'] != null) {
                lx.setAttribute('onclick', sidebar['onclick']);
            }

            /*Add Navigation Elm*/
            if (sidebar['content'] != null) {
                var px = bui.createElement('p', 'sbartext'+i);

                if (typeof sidebar['content'] == 'string') {
                    px.innerHTML = sidebar['content'];
                } else {
                    px.appendChild(sidebar['content']);
                }

                lx.appendChild(px);
            }


            sbar.appendChild(lx);
        }

        return sbar;
    }

	this.clicker = function() {
	    alert('Clicker was called!!');
	}

}