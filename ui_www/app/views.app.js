
/**
Assume BUI (Bootstrap UI object exists)
**/


function renderView1() {
        if (bui != null) {
            bui.clearView();
            var mc = document.getElementById('mcontent');
            var row = bui.row('row1', ['col-sm-6', 'col-sm-6']);
            mc.appendChild(row);

            var h2 = bui.h2('', 'Good View');
            var col1 = document.getElementById('row1-col0');
            col1.appendChild(h2);

            var canv = bui.createElement('canvas', 'bchart1');
            var col2 = document.getElementById('row1-col1');
            col2.appendChild(canv);
            var bchart =  BarChart('bchart1' , [], []);
        }
  }

function renderView2() {
    alert('RenderView2 was called');
}

function renderView3() {
}
