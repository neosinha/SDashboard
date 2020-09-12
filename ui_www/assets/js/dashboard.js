
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

	this.

    /**
    **/
    this.sidebar = function( sidebars, idx) {
        var sbar = document.getElementById('sidebar');
        sbar.innerHTML = '';
        bui.balert('BootObject');
        for (i=0; i < sidebars.length-1; i++) {
            var lx = bui.createElement('li', 'sidebar'+i);
                /*Add Icon First*/
                var ix = document.createElement('i');
                ix.setAttribute('class', 'tim-icons icon-atom');
            lx.appendChild(ix);

                /*Add Navigation Elm*/
                var px = bui.createElement('p', 'sbartext'+i);
                px.innerHTML = 'Sidebar '+ i;

            lx.appendChild(px);


            sbar.appendChild(lx);
        }

        return sbar;
    }

	this.clicker = function() {
	    alert('Clicker was called!!');
	}

}