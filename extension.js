const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Lang = imports.lang;
const PanelMenu = imports.ui.panelMenu;
const Clutter = imports.gi.Clutter;
const Mainloop = imports.mainloop;
const Gdk = imports.gi.Gdk;


let coord;
let text, hor, button, x=0, y=0;

function _hideHello() {
  if (text){
    Main.uiGroup.remove_actor(text);
    text = null;
  }
    if (!text) {
      text = new St.Label({ style_class: 'hor-label'});
      Main.uiGroup.add_actor(text);
  }
    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(monitor.x,
                      monitor.y);

    hGoing = function() { text.text = String(text.get_position()[1]); };


    Tweener.addTween(text,
                     { y: monitor.height,
                       time: 5,
                       transition: 'linear',
                       onUpdate: hGoing,
                       onComplete: _hideHello });
    y+=1;
}

function _showHello() {

    if (!text) {
        text = new St.Label({ style_class: 'helloworld-label'});
        Main.uiGroup.add_actor(text);
    }
    if (x>1){
      Main.uiGroup.remove_actor(text);
      _hideHello();
      return 0;
    }

    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(monitor.x,
                      monitor.y);

    fGoing = function() { text.text = String(text.get_position()[0]); };


    Tweener.addTween(text,
                     { x: monitor.width,
                       time: 5,
                       transition: 'linear',
                       onUpdate: fGoing,
                       onComplete: _showHello });
    x+=1;
    //global.stage.connect('space-press-event', _hideHello())

}

const CoordManager = new Lang.Class({
    Name: 'CoordManager',
    Extends: PanelMenu.Button,

    _init: function() {
        this.parent(0.0, "Coordinates");

        this.label = new St.Label({
            text: "XY",
            y_expand: true,
            y_align: Clutter.ActorAlign.CENTER
        });

        this.actor.add_actor(this.label);

        Mainloop.timeout_add(100, Lang.bind(this, this.update_label));
    },

    update_label: function() {
      if(!text){
        let [mouse_x, mouse_y, mask] = global.get_pointer();
        let newLabel = "X: " + mouse_x + " Y: " + mouse_y;
        this.label.set_text(newLabel);
      }
      else{
        let [mouse_x, mouse_y] = text.get_position();
        let newLabel = "X: " + String(mouse_x) + " Y: " + String(mouse_y);
        this.label.set_text(newLabel);
      }
        return true;
    },

    destroy: function() {
        this.parent();
    },
});

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
    coord = new CoordManager();
    Main.panel._rightBox.insert_child_at_index(button, 0);
    Main.panel.addToStatusArea('coord-menu', coord, 1, 'right');
}

function disable() {
    coord.destroy();
    Main.panel._rightBox.remove_child(button);
}
