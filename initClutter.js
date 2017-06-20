//Import the clutter class form the gi repository (the object introspection repository)
    const Clutter = imports.gi.Clutter;
    // Initialize clutter
    Clutter.init(null);
    /*
   6  * Create a stage. This function returns a new default stage, with its own
   7  * window. ClutterStage is derived from the ClutterActor object so many of that
   8  * object's functions are useful for the stage. For instance, call
   9  * Clutter.Stage.get_default().show() to make the stage visible.
  10  */
   let stage = new Clutter.Stage();

   // We connect the destroy event to quit from the mainloop when we close the
   // window.
   stage.connect("destroy", Clutter.main_quit);
   // Put some title
   stage.title = "Test";
   // Set a color to the stage to show that it is working
   stage.set_background_color(new Clutter.Color({
       red : 150,
       blue : 0,
       green : 0,
    alpha : 255
 }));
 // As we say, the stage is also an actor, so we show it to make visible
stage.show();
 // Start a main loop so that the stage can animate its contents and respond to
 // user interaction.
Clutter.main();
