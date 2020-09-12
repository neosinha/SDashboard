

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
        for (i=0; i < sidebars.length; i++) {
            var lx = document.createElement('li');
            lx.setAttribute('id', 'sidebar'+i);
            lx.innerHTML = 'Sidebar '+ i;

            var ix = document.createElement('i');
            ix.setAttribute('class', 'tim-icons icon-atom');
            lx.appenChild(ix);

            sbar.appenChild(lx);
        }

        return sbar;
    }

	this.clicker = function() {
	    alert('Clicker was called!!');
	}

}