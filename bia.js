
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

let text, button, x=0;

function _hideHello() {
    Main.uiGroup.remove_actor(text);
    text = null;
}

function _showHello() {
    if (!text) {
        text = new St.Label({ style_class: 'helloworld-label' });
        Main.uiGroup.add_actor(text);
    }
    //if (x>3){
    //  Main.uiGroup.remove_actor(text);
    //  text = null;
    //  return 0;
    //}

    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(monitor.x,
                      monitor.y);
                      
    Tweener.addTween(text,
                     { x: monitor.width,
                       time: 5,
                       transition: 'linear',
                       onComplete: _showHello });
    x+=1;
}

function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'system-run-symbolic',
                             style_class: 'system-status-icon' });

    button.set_child(icon);
    button.connect('button-press-event', _showHello);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
