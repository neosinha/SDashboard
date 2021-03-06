
var Utils = function () {
	

	this.guid = function() {
		  function s4() {
		    return Math.floor((1 + Math.random()) * 0x10000)
		      .toString(16)
		      .substring(1);
		  }
		  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		    s4() + '-' + s4() + s4() + s4();
	}; 


	this.epoch = function() {
		var dt = new Date();
		ep = dt.getTime();
		return ep; 
	}; 


	



	
}; 

var Bootstrap  = function () {
	
	this.balert = function(msg) {
		console.log('BS: '+ msg);
		alert(msg);
	}; 
		
	this.createElement = function (tag, id) {
		//creates and returns a document element 
		// sets the tag with that id
		el = document.createElement(tag);
		//alert('Element Created: '+ tag);
		if (id) {
			el.setAttribute('id', id);
		}
		return el; 
	}; 

	this.well = function (id, content) {
		el = this.createElement('div', id);
		el.setAttribute('class', 'well');
		
		if (content) {
			for (i=0; i < content.length; i++) {
				ctx = content[i];
				el.appendChild(ctx);
			}
		}
		return el; 
	}
	
	
	this.jumbotron = function (id, content) {
		el = this.createElement('div', id);
		el.setAttribute('class', 'jumbotron');
		el.appendChild(content);
		console.log('Jumbo: '+ JSON.stringify(el));
		return el
	}; 
	
	
	this.modal = function (id, content) {
		/*
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal">&times;</button>
	          <h4 class="modal-title">Modal Header</h4>
	        </div>
	        <div class="modal-body">
	          <p>Some text in the modal.</p>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        </div>
	      </div>*/
		var modalel = this.createElement('div', id); 
		modalel.setAttribute('class', 'modal-content');
		if (content['header']) {
		}
		
		
		if (content['body']) {
			var mbody = this.createElement('div', id+'body');
			mbody.setAttribute('class', 'modal-body');
			if (typeof content['body'] == 'string') {
				mbody.innerHTML = content['body']; 
			} else {
				mbody.appendChild(content['body']);
			}
		}
		
		modalel.appendChild(mbody);
		
		return modalel;
	}
	
	this.button = function (id, name, onclick) {
		var el = this.createElement('button', id);
		el.setAttribute('onclick', onclick);
		
		if (typeof name == "string") {
			el.innerHTML = name; 
		} else {
			el.appendChild(name);
		}
		return el;
	};

	/***
	***/
	this.buttonGroup = function (id, buttonArray) {
         var divg = this.createElement('div', id);
         divg.setAttribute('class', 'btn-group');
         divg.setAttribute('role', 'group');
         divg.setAttribute('aria-label', '...');

         for (i=0; i < buttonArray.length; i++) {
            var btnd = buttonArray[i];
            //console.log("ButtonGroup: "+ JSON.stringify(btnd) );
            var btnobj = this.button(id+i, btnd['name'],
                                    btnd['onclick']);
            btnobj.setAttribute('class',  'btn btn-default');
            divg.appendChild(btnobj);

         }

         return divg;

	}

	/***
	***/
	this.buttonGroupJustified = function (id, buttonArray) {
         var divg = this.createElement('div', id);
         divg.setAttribute('class', 'btn-group btn-group-justified');
         divg.setAttribute('role', 'group');
         divg.setAttribute('aria-label', '...');

         for (i=0; i < buttonArray.length; i++) {
            var btnd = buttonArray[i];
            //console.log("ButtonGroup: "+ JSON.stringify(btnd) );
            var btnobj = this.button(id+i, btnd['name'],
                                    btnd['onclick']);
            btnobj.setAttribute('class',  'btn btn-default');
            divg.appendChild(btnobj);

         }

         return divg;

	}


	this.vbuttonGroup = function (id,  buttonArray) {
         var divg = this.createElement('div', id);
         divg.setAttribute('class', 'btn-group-vertical');
         divg.setAttribute('role', 'group');
         divg.setAttribute('aria-label', '...');

         for (i=0; i < buttonArray.length; i++) {
            var btnd = buttonArray[i];
            console.log("ButtonGroup: "+ JSON.stringify(btnd) );
            var btnobj = this.button(id+i, btnd['name'],
                                    btnd['onclick']);

            btnobj.setAttribute('class',  'btn btn-default');
            if ('class' in btnd) {
                btnobj.setAttribute('class', 'btn btn-'+btnd['class']);
            }
            divg.appendChild(btnobj);

         }

         return divg;

	}

	this.progress = function (id, stype, percent, message) {
	    var prog = this.createElement('div', id);
	    prog.setAttribute('class', 'progress');

	    var pbar = this.createElement('div', 'prog-'+id);
	    if (stype) {
	        pbar.setAttribute('class', 'progress-bar progress-bar-'+stype);
	    } else {
	       pbar.setAttribute('class', 'progress-bar progress-bar-success');
	    }
	    pbar.innerHTML = message;

        pbar.setAttribute('style', 'width:'+percent+'%');
        pbar.setAttribute('role', 'progressbar');
	   // <div class="progress">
       //     <div class="progress-bar progress-bar-success" role="progressbar" style="width:40%">
       //     Free Space
       //  <
        prog.appendChild(pbar);

	    return prog;
	}

	
	this.createPanels = function (id, panelArr) {
		
		var pgroup = this.createElement('div', id);
		pgroup.setAttribute('class', 'panel-group');
		
		for (i=0; i < panelArr.length; i++) {
			var panel = this.createElement('div', id+i);
			var panelEl = panelArr[i];
			if (panelEl['type']) {
				panel.setAttribute('class', 'panel panel-'+panelEl['type']);
			} else {
				panel.setAttribute('class', 'panel panel-default');
			}
			if (panelEl['heading']) {
				var paneh = this.createElement('div', null);
				var panelh = this.createElement('div', null);
				panelh.setAttribute('class', 'panel-heading');
				if (typeof panelEl['heading'] == 'string') {
					panelh.innerHTML = panelEl['heading']; 
				} else {
					panelh.appendChild(panelEl['heading']); 
				}
				panel.appendChild(panelh);
			}
			
			var panelcontent = this.createElement('div', null);
			panelcontent.setAttribute('class', 'panel-body');
			if (typeof panelEl['content'] == 'string') {
				panelcontent.innerHTML = panelEl['content']; 
			} else {
				panelcontent.appendChild(panelEl['content']); 
			}
			panel.appendChild(panelcontent);
			pgroup.appendChild(panel);
		}
		
		return pgroup; 
	}
	
	this.navtabs = function (id, style, tabs) {
		navtabview = document.createElement('div');
		navtabview.setAttribute('id', id);
		navdiv = document.createElement('div');
		navdiv.setAttribute('class', 'nav-tabs-navigation');
	
			nav = document.createElement('ul');
			nav.setAttribute('class', 'nav nav-tabs nav-'+style);
		
			for (i=0; i < tabs.length; i++) {
				tab = tabs[i]; 
				li = document.createElement('li');
				if ( i == 0) {
					li.setAttribute('class', 'active');
				}
				a = document.createElement('a');
				a.innerHTML = tab['name'];
				a.setAttribute('data-toggle', 'tab');
				a.setAttribute('href', '#tab'+id+i.toString());
				li.appendChild(a);
				nav.appendChild(li); 
			}
			
			navdiv.appendChild(nav);
			navtabview.appendChild(navdiv);
		
			tabview = document.createElement('div');
			tabview.setAttribute('class', 'tab-content text-center');
			tabview.setAttribute('id', 'tabview-'+id);
		
			for (i=0; i < tabs.length; i++) {
				tabpane = document.createElement('div');
				tabpane.setAttribute('id', 'tab'+id+i.toString());
				tab = tabs[i];
				if (i ==0 ) {
					tabpane.setAttribute('class', 'tab-pane active');
				} else {
					tabpane.setAttribute('class', 'tab-pane');
				}
			
				tabpane.appendChild(tab['content']); 
				tabview.appendChild(tabpane);
			}
			navtabview.appendChild(tabview);
		
		 return navtabview; 
	};

	this.vtabs = function (id, style, tabs) {
		navtabview = document.createElement('div');
		navtabview.setAttribute('id', id);
		navdiv = document.createElement('div');
		navdiv.setAttribute('class', 'v-tabs-navigation');

			nav = document.createElement('ul');
			nav.setAttribute('class', 'nav nav-pills nav-stacked '+style);

			for (i=0; i < tabs.length; i++) {
				tab = tabs[i];
				li = document.createElement('li');
				if ( i == 0) {
					li.setAttribute('class', 'active');
				}
				a = document.createElement('a');
				a.innerHTML = tab['name'];
				a.setAttribute('data-toggle', 'tab');
				a.setAttribute('href', '#tab'+id+i.toString());
				li.appendChild(a);
				nav.appendChild(li);
			}

			navdiv.appendChild(nav);
			navtabview.appendChild(navdiv);

			tabview = document.createElement('div');
			tabview.setAttribute('class', 'tab-content text-center');
			tabview.setAttribute('id', 'tabview-'+id);

			for (i=0; i < tabs.length; i++) {
				tabpane = document.createElement('div');
				tabpane.setAttribute('id', 'tab'+id+i.toString());
				tab = tabs[i];
				if (i ==0 ) {
					tabpane.setAttribute('class', 'tab-pane active');
				} else {
					tabpane.setAttribute('class', 'tab-pane');
				}

				tabpane.appendChild(tab['content']);
				tabview.appendChild(tabpane);
			}
			navtabview.appendChild(tabview);

		 return navtabview;
	};


	this.table = function (id, classname, header, tabledata) {
		var tbl = document.createElement('table');
		tbl.setAttribute('class', 'table '+classname);
		tbl.setAttribute('id', id);
		
		//header section
		var thead = document.createElement('thead');
		var tr = document.createElement('tr');

		for (idx = 0; idx < header.length; idx++) {
			th = document.createElement('th');
			th.innerHTML = header[idx]; 
			tr.appendChild(th);
		}
		thead.setAttribute('class', 'tablehead-'+id);
		thead.appendChild(tr);
		tbl.appendChild(thead);
		
		//body section
		var tbody = document.createElement('tbody');
		for (idx = 0 ; idx < tabledata.length; idx++) {
			var rdata = tabledata[idx]; 
			tr = document.createElement('tr');
			for (ridx= 0; ridx < rdata.length; ridx++) {
				var td = document.createElement('td');
				td.setAttribute('class', 'text-left');
				if (typeof rdata[ridx] == 'string') {
	    			td.innerHTML = rdata[ridx];
			    } else {
				    td.appendChild(rdata[ridx]);
			    }

                tr.setAttribute('id', id+'-row'+idx);
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
            //summary row
			var str = document.createElement('tr');
			str.setAttribute('id', idx+'-srow-'+idx);
			//tbody.appendChild(str);
		}
		tbl.appendChild(tbody);
		
		return tbl; 
	}; 
	


	this.h1 = function(id, text, attributes) {
		el = document.createElement('h1'); 
		if (id)
			el.setAttribute('id', id);
		el.innerHTML = text; 
		if (attributes) {
			for (i=0; i < attributes.length; i++) {
				attr = attributes[i]; 
				el.setAttribute(attr['name'], attr['value']);
			}
		}
		
		return el;
	}; 
	
	this.h2 = function(id, text, attributes) {
		el = document.createElement('h2'); 
		if (id)
			el.setAttribute('id', id);
		el.innerHTML = text; 
		if (attributes) {
			for (i=0; i < attributes.length; i++) {
				attr = attributes[i]; 
				el.setAttribute(attr['name'], attr['value']);
			}
		}
		
		return el;
	}; 
	
	this.h3 = function(id, text, attributes) {
		el = document.createElement('h3'); 
		if (id)
			el.setAttribute('id', id);
		el.innerHTML = text; 
		if (attributes) {
			for (i=0; i < attributes.length; i++) {
				attr = attributes[i]; 
				el.setAttribute(attr['name'], attr['value']);
			}
		}
		
		return el;
	}; 
	
	this.p = function(id, text, attributes) {
		el = document.createElement('p'); 
		if (id)
			el.setAttribute('id', id);
		el.innerHTML = text; 
		if (attributes) {
			for (i=0; i < attributes.length; i++) {
				attr = attributes[i]; 
				el.setAttribute(attr['name'], attr['value']);
			}
		}
		
		return el;
	}; 
	
	
	
	
	this.br = function () {
		el = this.createElement('br', null);
		return el;
	};  


	this.hr = function () {
		el = this.createElement('hr', null);
		return el;
	}; 
	
	
	this.navbar = function(id, banner) {
		nav = this.createElement('nav', null);
		nav.setAttribute('class', 'navbar navbar-default');
			cont = this.createElement('div', null);
			cont.setAttribute('class', 'container');
			
				nheader = this.createElement('div', null);
				nheader.setAttribute('class', 'navbar-header');
					an = this.createElement('a');
					an.setAttribute('class','brand navbar-brand');
					an.innerHTML = banner; 
					nheader.appendChild(an); 
				cont.appendChild(nheader);
		nav.appendChild(cont);
		
		return nav;
	}
	
	
	this.navigationbar = function(id, left, center, right) {
		nav = this.createElement('nav', null);
		nav.setAttribute('class', 'navbar navbar-default');
			cont = this.createElement('div', null);
			cont.setAttribute('class', 'container');
			
				nheader = this.createElement('div', null);
				nheader.setAttribute('class', 'navbar-header');
					an = this.createElement('a');
					an.setAttribute('class','brand navbar-brand');
					an.innerHTML = left.banner; 
				
					nheader.appendChild(an); 
				cont.appendChild(nheader);
		nav.appendChild(cont);
		
		return nav;
	}
	
	
	
	
	
	this.createFormElement = function(id, inputdef) {
		//label, inputtype, placeholder, value) {
		p = this.createElement('div');
		if (inputdef['type'] == "checkbox" ) {
			p.setAttribute('class', 'checkbox');
		} else {
			p.setAttribute('class', 'form-group');
		}
		 if (inputdef['label']) {
			 lbl = document.createElement('label');
			 if (inputdef['type'] == "checkbox" ) {
				 lbl.setAttribute('class', 'checkbox inline');
			 } else {
				 lbl.setAttribute('class', 'pull-left');
			 }
			 lbl.innerHTML = inputdef['label'];
			p.appendChild(lbl);
		 }
			
		inp = document.createElement('input');
		inp.setAttribute('type', inputdef['type']);
		
		if (inputdef['class']) {
			inp.setAttribute('class',
							 'form-control border-input '+ inputdef['class']);
		} else {
			inp.setAttribute('class', 'form-control border-input');
		}
		
		if (inputdef['name']) {
			inp.setAttribute('name', inputdef['name']); 
		}
		
		if (inputdef['onclick']) {
			inp.setAttribute('onclick', inputdef['onclick']); 
		}
		
		if (inputdef['placeholder']) {
			inp.setAttribute('placeholder', inputdef['placeholder']);
		}
		
		if (inputdef['id']) {
			inp.setAttribute('id', id);
		} else {
			inp.setAttribute('id', 'input'+id);
		}
		
		if (inputdef['value']) {
			inp.setAttribute('value', inputdef['value']);
		}
		
		if (inputdef['type'] == "checkbox" ) {
			 inp.setAttribute('class', 'checkbox inline');
			 lbl.appendChild(inp);
		} else {
			p.appendChild(inp);
		}
		return p; 
	}; 
	
	
	this.createForm = function (id, inputarray) {
		form = document.createElement('form');
		form.setAttribute('id', id);
		form.setAttribute('action', 'javascript:null');
		
		//txtformgroup = document.createElement('div');
		//txtformgroup.setAttribute('id', id+'div');
		//txtformgroup.setAttribute('class', 'form-group');
		
		form.appendChild(this.br());
		for (i=0; i < inputarray.length; i++) {
			inputdef = inputarray[i]; 
			idlx = id.toLowerCase()+i.toString();
			if (inputdef['id']) {
				idlx = inputdef['id'];
			}
			inpformel = this.createFormElement(idlx, inputdef);
			form.appendChild(inpformel);
		}
		
		//form.appendChild(txtformgroup);
		
		return form; 
	}; 
	
	

	this.createCheckBoxes = function (id, checkboxes) {
		/*<div class="checkbox">
	    <label>
	      <input type="checkbox"> Check me out
	    </label>*/
		chboxgrp = document.createElement('div');
		tbl = document.createElement('table');
		tbl.setAttribute('class', 'table-striped');
		tbody = document.createElement('tdboy');
		//chboxgrp.setAttribute('class', 'form-group');
		for (i=0; i < checkboxes.length; i++) {
			checkbox = checkboxes[i]; 
			
			ipdx = id.toLowerCase()+i.toString(); 
			
			trow = document.createElement('tr');
			chkbox = document.createElement('td');
				lbl = document.createElement('label');
				lbl.setAttribute('class', 'custom-control custom-checkbox');
				//lbl.setAttribute('for', ipdx);
			
				inp = document.createElement('input');
				inp.setAttribute('type', 'checkbox');
				inp.setAttribute('placeholder', checkbox);
				inp.setAttribute('class', 'custom-control-input');
				inp.setAttribute('id', ipdx);
			
				//inp.setAttribute('data-toggle', 'checkbox');
				lbl.appendChild(inp);
				span = document.createElement('span');
				span.setAttribute('class', 'custom-control-indicator');
				lbl.appendChild(span);
			
				chkbox.appendChild(lbl);
			trow.appendChild(chkbox);
			namex = document.createElement('td');
			namex.innerHTML = checkbox; 
			trow.appendChild(namex);
			
			tbody.appendChild(trow);
		}
		tbl.appendChild(tbody);
		chboxgrp.appendChild(tbl);
		return chboxgrp; 
	}


	this.createRadioBoxes = function (id, inline,radios) {
		chboxgrp = this.createElement(id+'radios', 'div');
		for (i=0; i < radios.length; i++) {
			radio = radios[i];
			id = radios['id']; 
			inp = this.createElement(null, 'input');
			inp.setAttribute('type', 'radio');
			inp.setAttribute('name', id+'lradios');
			lbl = this.createElement(null, 'label');
			lbl.innerHTML = radio['label'];
			
			if (inline) {
				lbl.setAttribute('class', 'radio-inline');
			} else {
				lbl.setAttribute('class', 'radio');
			}
			lbl.appendChild(inp);
			chboxgrp.appendChild(lbl);
		}	    
		return chboxgrp; 
	};

	

	this.createListGroupWithButtons = function(id, listFunction, listArr) {
		lgroup = this.createElement('ul', id);
		lgroup.setAttribute('class', 'list-group');
		
		for (i=0; i < listArr.length; i++) {
			listEl = listArr[i]; 
			
			li = this.createElement('li','litem'+i);
			li.setAttribute('class', 'list-group-item');
			
			button = this.createElement('button', id+'_el'+i);
			
			if (listEl['type']) {
				button.setAttribute('class', 'btn btn-lg btn-block btn-'+type); 
			} else {
				button.setAttribute('class', 'btn btn-lg btn-block btn-basic'); 
			}
			
			
			
			
			if (typeof listEl['content'] == 'string') {
				htm = listEl['content'];
				span = this.createElement('span', id+'-span'+i);
				span.setAttribute('class', 'pull-right');
				span.innerHTML = htm; 
				
				icon = '';
				if (listEl['icon']) {
					icon = this.createElement('i', id+'icon'+i);
					icon.setAttribute('class', listEl['icon']);
					button.appendChild(icon);
				}
				button.appendChild(span);
			}
			
			if (listFunction) {
				button.setAttribute('onclick', listFunction+'(\''+i+'\');');
			}
			
				li.appendChild(button);
			lgroup.appendChild(li);
			
		}
		
		
		return lgroup; 
	};
	
	this.createListGroup = function(id, listFunction, listArr) {
		var lgroup = this.createElement('div', id);
		lgroup.setAttribute('class', 'list-group');
		
		for (i=0; i < listArr.length; i++) {
			var listEl = listArr[i];
			var ach = this.createElement('a', id+'_el'+i);
			
			if (typeof listEl['content'] == 'string') {
				ach.innerHTML = listEl['content']; 
			} else {
				ach.appendChild(listEl['content']); 
			}
			
			
			ach.innerHTML = listEl['content'];
			ach.setAttribute('href', 'javascript:null');
			if (listEl['type']) {
				ach.setAttribute('class', 'list-group-item list-group-item-'+ listEl['type'] );
			} else {
				ach.setAttribute('class', 'list-group-item');
			}
			
			if (listFunction) {
				ach.setAttribute('onclick', listFunction+'(\''+i+'\');');
			}
			lgroup.appendChild(ach);
		}
		
		
		return lgroup; 
	}; 
	
	
	this.createList = function(id, listFunction, listArr) {
		lgroup = this.createElement(id, 'div');
		lgroup.setAttribute('class', 'list-group');
		
		for (i=0; i < listArr.length; i++) {
			listEl = listArr[i]; 
			var ach = this.createElement(id+'_el'+i, 'a');
			
			if (typeof listEl['content'] == 'string') {
				ach.innerHTML = listEl['content']; 
			} else {
				ach.appendChild(listEl['content']); 
			}
			
			
			ach.innerHTML = listEl['content'];
			ach.setAttribute('href', 'javascript:null');
			if (ach['type']) {
				ach.setAttribute('class', 'list-group-item '+ type);
			} else {
				ach.setAttribute('class', 'list-group-item');
			}
			
			if (listFunction) {
				ach.setAttribute('onclick', listFunction+'(\''+i+'\');');
			}
			lgroup.appendChild(ach);
		}
		
		
		return lgroup; 
	}; 
	
	
	
	this.createNotification = function(alerttype, msg) {
		div = this.createElement('div', null);
		div.setAttribute('class', 'alert alert-dismissible alert-'+alerttype);
		
		a = this.createElement('a', null);
		a.setAttribute('href', 'javacript:null');
		a.setAttribute('class', 'close');
		a.setAttribute('data-dismiss', 'alert' );
		a.setAttribute('aria-label', 'close');
		a.innerHTML = '&times;';
		
		div.innerText = msg; 
		
		div.appendChild(a);
		
		return div;
	}
	
	
	this.addSubViewById = function(parentViewid, elems) {
		pview = document.getElementById(parentViewid);
		view = this.addSubView(pview, elems);
		return view;
	}; 

	this.addSubView = function(parentView, elems) {
		if (parentView) {
			for (i=0; i < elems.length; i++) {
				el = elems[i];
				parentView.appendChild(el);
			}
		}
		console.log("==>"+JSON.stringify(parentView));
		return parentView;  
	};
	
	this.addSubViewToMain = function(elems) {
		parentView = document.getElementById('mcontent');
		if (parentView) {
			for (i=0; i < elems.length; i++) {
				el = elems[i];
				parentView.appendChild(el);
			}
		}
		console.log("==>"+JSON.stringify(parentView));
		return parentView;  
	};
	
	this.clearViewById = function(viewid) {
		var myNode = document.getElementById(viewid);
		while (myNode.firstChild) {
		    myNode.removeChild(myNode.firstChild);
		}
	};
	
	this.clearView = function() {
		var myNode = document.getElementById('mcontent');
		while (myNode.firstChild) {
		    myNode.removeChild(myNode.firstChild);
		}
	};
	
	
	
	
	/**
	 * 
	 * 
	 */
	this.buttonInputBar = function(inputdef) {
		var divx = document.createElement('div');
		divx.setAttribute('class', 'input-group');
		
		
		var inp = document.createElement('input');
		inp.setAttribute('type', inputdef['type']);
		inp.setAttribute('class', 'form-control form-inline');
		inp.setAttribute('aria-label', inputdef['label']);
		//inp.setAttribute('aria-describedby', 'button-addon2');
		inp.setAttribute('placeholder', inputdef['placeholder']);
		inp.setAttribute('id', inputdef['id']);
		divx.appendChild(inp);
		
		var divgrp = document.createElement('div'); 
		divgrp.setAttribute('class', 'input-group-btn');
		var btn = document.createElement('button');
		btn.setAttribute('class', 'btn btn-outline-secondary');
		btn.setAttribute('type', 'button');
		btn.innerHTML = inputdef['button'];
		btn.setAttribute('onclick', inputdef['onclick']);
		
		divgrp.appendChild(btn);
		divx.appendChild(divgrp);
		
		//console.log("==> ButtonGrp" + divx.getAttribute('class'));
		return divx;
	}; 

	
	this.carousel = function(inputdef) {
		var divx = document.createElement('div');
		//class="carousel slide" data-ride="carousel"
		divx.setAttribute('class', 'carousel slide');
		divx.setAttribute('data-ride', 'carousel');
		
		var divx_inner = document.createElement('div');
		divx_inner.setAttribute('class', 'carousel-inner');
		
		divx.appendChild(divx_inner);
		
		//<div class="carousel-item active">
	    //  <img src="..." class="d-block w-100" alt="...">
	    //</div>
		var imgs = inputdef['images']; 
		for (i=0; i < imgs.length; i++) {
			
			var crx = document.createElement('div');
			crx.setAttribute('class', 'carousel-item');
			var imgf = imgs[i]; 
			var img = document.createElement('img');
			img.setAttribute('src', imgf);
			img.setAttribute('class', 'd-block w-100');
			
			crx.appendChild(img);
			divx_inner.appendChild(crx);
			
		}
	    	
		
		return divx; 
	}; 
	
	/**
	 * @method
	 * @parameter id : 
	 * @columdef : Array of column definitions
	**/
	this.row = function(rowid, columndef) {
		var divx = document.createElement('div');
		divx.setAttribute('id', rowid);
		divx.setAttribute('class', 'row');
		
		for (i=0; i < columndef.length; i++) {
			var col = columndef[i]; 
			var divcol = document.createElement('div');
			divcol.setAttribute('class', col);
			divcol.setAttribute('id', rowid+'-'+'col'+i);
			divx.appendChild(divcol);
		}
		//class="carousel slide" data-ride="carousel"
		return divx;
	}; 


	/**
	* @method
	*
	**/
	//<div class="panel-group" id="accordion">
	this.accordian = function (id, panelArr) {
	    var pgroup = document.createElement('div');
	    pgroup.setAttribute('id', id);
	    pgroup.setAttribute('class', 'panel-group');

        for (idx= 0; idx < panelArr.length; idx++) {
            var pobj = panelArr[idx];
            var phdr  = pobj['heading'];
            var pbdy  = pobj['body'];

            var ahdr = document.createElement('div');
            ahdr.setAttribute('class', 'panel panel-default');

                var aahdr = document.createElement('div');
                aahdr.setAttribute('class', 'panel-heading');

                var hdrx = document.createElement('h4');
                hdrx.setAttribute('class', 'panel-title');
                var ahdrx = document.createElement('a');
                    ahdrx.setAttribute('data-toggle', 'collapse');
                    ahdrx.setAttribute('data-parent', id);
                    ahdrx.setAttribute('href', '#cheader-'+id+'-'+idx);

                    if (typeof phdr == 'string') {
                           ahdrx.innerHTML = phdr;
			        } else {
                           ahdrx.appendChild(phdr);
			        }
                hdrx.appendChild(ahdrx);
               ahdr.appendChild(hdrx);

            pgroup.appendChild(ahdr);

            var pbody = document.createElement('div') ;
            pbody.setAttribute('id', 'collapse-'+id+'-'+idx);
            pbody.setAttribute('class', 'panel-collapse collapse in');

            var ppbody = document.createElement('div');
            ppbody.setAttribute('class', 'panel-body');
            ppbody.setAttribute('href', '#cbody-'+id+'-'+idx);
            if (typeof pbdy == 'string') {
                  ppbody.innerHTML = pbdy;
			} else {
                   ppbody.appendChild(pbdy);
			 }
			 pbody.appendChild(ppbody);

            pgroup.appendChild(pbody);
        }


        return pgroup;
	};


    //Searchable List
	this.searchList = function(id, listFunction, listArr) {
       var slist = document.createElement('form');
	    slist.setAttribute('id', id);
	    var inpd = this.createElement('div', 'inp-'+id);
	    inpd.setAttribute('class', 'form-group');
	        var inpx = this.createElement('input', 'inptag-'+id);
	        inpx.setAttribute('class', 'form-control');
	        inpx.setAttribute('type', 'search');
	        inpx.setAttribute('placeholder', 'Search..');
        inpd.appendChild(inpx);

        var srchlist = this.createElement('div', 'searchlist-'+id);
        srchlist.setAttribute('class', 'listgroup');

        //<a class="list-group-item" href="#"><span>aquamarine</span>
        //<i style="background:aquamarine" class="badge">&nbsp;</i></a>
        for (i=0; i < listArr.length; i++) {
            var srobj = listArr[i];
            var a = ui.createElement('a', 'snitem'+i);
            if (srobj['class']) {
                   a.setAttribute('class', 'list-group-item searchlist-item list-group-item-'+ srobj['class']);
            } else {
                   a.setAttribute('class', 'list-group-item searchlist-item');
            }
            if (listFunction) {
                a.setAttribute('onclick', listFunction+'('+i+');');
            }
            var span = ui.createElement('span', 'snitem-text'+i);
            span.innerHTML = srobj['content'];
            a.appendChild(span);
            srchlist.appendChild(a);
        }

	    slist.setAttribute('class', 'panel-group');
	    slist.appendChild(inpd);
        slist.appendChild(srchlist);


        return slist;

	}

	
	
}; 


