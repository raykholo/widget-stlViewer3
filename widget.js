/* global requirejs cprequire cpdefine chilipeppr THREE */
// Defining the globals above helps Cloud9 not show warnings for those variables

// ChiliPeppr Widget/Element Javascript

requirejs.config({
    /*
    Dependencies can be defined here. ChiliPeppr uses require.js so
    please refer to http://requirejs.org/docs/api.html for info.
    
    Most widgets will not need to define Javascript dependencies.
    
    Make sure all URLs are https and http accessible. Try to use URLs
    that start with // rather than http:// or https:// so they simply
    use whatever method the main page uses.
    
    Also, please make sure you are not loading dependencies from different
    URLs that other widgets may already load like jquery, bootstrap,
    three.js, etc.
    
    You may slingshot content through ChiliPeppr's proxy URL if you desire
    to enable SSL for non-SSL URL's. ChiliPeppr's SSL URL is
    https://i2dcui.appspot.com which is the SSL equivalent for
    http://chilipeppr.com
    */
   paths: {
       // Don't put .js at end of URL (except when passing thru CP geturl proxy)
        Three: '//i2dcui.appspot.com/geturl?url=http://threejs.org/build/three.min.js',
        ThreeTextGeometry: '//i2dcui.appspot.com/js/three/TextGeometry',
        ThreeFontUtils: '//i2dcui.appspot.com/js/three/FontUtils',
        ThreeHelvetiker: '//i2dcui.appspot.com/js/three/threehelvetiker',
        Clipper: '//i2dcui.appspot.com/js/clipper/clipper_unminified',
        //ThreeSTLLoader: '//i2dcui.appspot.com/geturl?url=http://threejs.org/examples/js/loaders/STLLoader.js'
        ThreeSTLLoader: '//i2dcui.appspot.com/geturl?url=https://raw.githubusercontent.com/raykholo/library/master/stl_parse_load.js'
   },
   shim: {
       ThreeTextGeometry: ['Three'],
       ThreeFontUtils: ['Three', 'ThreeTextGeometry'],
       ThreeHelvetiker: ['Three', 'ThreeTextGeometry', 'ThreeFontUtils'],
       ThreeSTLLoader: ['Three', 'ThreeTextGeometry', 'ThreeFontUtils', 'ThreeHelvetiker'],  //Have tried with and without this
   }
});

// Test this element. This code is auto-removed by the chilipeppr.load()
cprequire_test(["inline:com-chilipeppr-widget-eagle"], function (ew) {

    // Test this element. This code is auto-removed by the chilipeppr.load()
    // when using this widget in production. So use the cpquire_test to do things
    // you only want to have happen during testing, like loading other widgets or
    // doing unit tests. Don't remove end_test at the end or auto-remove will fail.

    console.log("test running of " + ew.id);
    //ew.init();

    $('#com-chilipeppr-widget-eagle').css('position', 'relative');
    $('#com-chilipeppr-widget-eagle').css('background', 'none');
    $('#com-chilipeppr-widget-eagle').css('width', '320px');
    $('body').prepend('<div id="3dviewer"></div>');

    //chilipeppr.load("#3dviewer", "http://fiddle.jshell.net/chilipeppr/y3HRF/195/show/light/", function () {
    chilipeppr.load(
      "#3dviewer",
      "http://raw.githubusercontent.com/chilipeppr/widget-3dviewer/master/auto-generated-widget.html",
      function() {
        cprequire(['inline:com-chilipeppr-widget-3dviewer'], function (threed) {
            threed.init({
                doMyOwnDragDrop: false
            });
            //$('#com-chilipeppr-widget-3dviewer .panel-heading').addClass('hidden');
            //autolevel.addRegionTo3d();
            //autolevel.loadFileFromLocalStorageKey('com-chilipeppr-widget-autolevel-recent8');
            //autolevel.toggleShowMatrix();

            // only init eagle widget once 3d is loaded
            // set doMyOwnDragDrop
            ew.init(true);
        });
    });

    $('body').prepend('<div id="test-drag-drop"></div>');
    chilipeppr.load("#test-drag-drop", "http://fiddle.jshell.net/chilipeppr/Z9F6G/show/light/",

    function () {
        cprequire(
        ["inline:com-chilipeppr-elem-dragdrop"],

        function (dd) {
            dd.init();
            dd.bind("body", null);
        });
    });
    
    $('body').prepend('<div id="com-chilipeppr-flash"></div>');
    chilipeppr.load("#com-chilipeppr-flash",
        "http://fiddle.jshell.net/chilipeppr/90698kax/show/light/",

    function () {
        console.log("mycallback got called after loading flash msg module");
        cprequire(["inline:com-chilipeppr-elem-flashmsg"], function (fm) {
            //console.log("inside require of " + fm.id);
            fm.init();
        });
    });
    
    // test before and after render
    chilipeppr.subscribe("/" + ew.id + '/beforeToolPathRender', this, function(eagleWidget) {
        console.log("publish test. got the /beforeToolPathRender signal. eagleWidget:", eagleWidget);
    });
    chilipeppr.subscribe("/" + ew.id + '/afterToolPathRender', this, function(eagleWidget) {
        console.log("publish test. got the /afterToolPathRender signal. eagleWidget:", eagleWidget);
    });
    // test before and after render
    chilipeppr.subscribe("/" + ew.id + '/beforeLayerGenerate', this, function(eagleWidget) {
        console.log("publish test. got the /beforeLayerGenerate signal. layer:", eagleWidget.activeLayer, "eagleWidget:", eagleWidget);
    });
    chilipeppr.subscribe("/" + ew.id + '/afterLayerGenerate', this, function(eagleWidget) {
        console.log("publish test. got the /afterLayerGenerate signal. layer:", eagleWidget.activeLayer, "eagleWidget:", eagleWidget);
    });


} /*end_test*/ );

// This is the main definition of your widget. Give it a unique name.
cpdefine("inline:com-chilipeppr-widget-eagle", ["chilipeppr_ready", "Clipper", "jqueryuiWidget", "ThreeSTLLoader"], function () {
    return {
        /**
         * The ID of the widget. You must define this and make it unique.
         */
        id: "com-chilipeppr-widget-eagle",
        name: "Widget / Eagle BRD v4",
        desc: "This widget lets you drag in an Eagle PCB \".brd\" file to mill.",
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        /**
         * Define pubsub signals below. These are basically ChiliPeppr's event system.
         * ChiliPeppr uses amplify.js's pubsub system so please refer to docs at
         * http://amplifyjs.com/api/pubsub/
         */
        /**
         * Define the publish signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        publish: {
            // Define a key:value pair here as strings to document what signals you publish.
            '/onAddGcode': `This signal lets a 3rd party add-on inject its own Gcode into the 
            overall final Gcode for the Eagle BRD Widget. Here is an example of how to subscribe. 

<pre>
chilipeppr.subscribe(
    "/com-chilipeppr-widget-eagle/addGcode", 
    this, 
    this.myOnAddGcode
);
</pre>

            Then, your callback would look like this with 4 parameters receiving the variables 
            that the addGcode publish signal sends you. 

<pre>
onAddGcode : function(addGcodeCallback, gcodeParts, eagleWidget, helpDesc){ 
    console.log("Got onAddGcode:", arguments); 
    // this method calls back to the main Eagle widget to inject our Gcode 
    addGcodeCallback(1500, myOwnGcode ); 
} 
</pre>

            The 1500 in the example above is to attach a priority to where our Gcode will get positioned. 
            The base Gcode ends around line 900. The footer starts at line 2000. So putting our Gcode at 
            the end but before the footer means using 1500 should do fine. You can analyze the existing 
            Gcode by looking at parameter 2 gcodeParts to see if an index has already been used so you 
            don't clobber it. If you want to delete Gcode from gcodeParts you could do that as well and 
            the main widget will reflect the deletion. 
            `,
            '/beforeLayerGenerate' : `This widget fires a signal before generating the Three.js objects
                and Clipper paths for a board layer. The Three.js objects are 3D objects representing the
                pads, vias, smds, wires, polygons, and dimensions. Those Three.js objects are used to
                populate the 3D viewer and to calculate 2D Clipper paths from. 
                
                Clipper paths are the 2D XY
                values of all the layer's objects and are generated so that unions and diffs can be
                calculated on those paths in the render step. Clipper paths can be easily inflated and
                deflated by the Clipper.js library which is why they are so important to this widget.
                
                When you get this signal a reference to "this", i.e. the Eagle Widget, is included in
                the payload so you may use it to manipulate this widget as you see fit.`,
            '/afterLayerGenerate' : `Please see the /beforeLayerGenerate description to understand this
                signal better. The /afterLayerGenerate signal is fired after this widget is done
                generating the board layer. The payload is the same as the before signal.`,
            '/beforeToolPathRender' : `This widget fires a signal before the rendering of the tool path 
                for the milling of the Eagle BRD. As the user tests out different inflate values, you 
                will get this signal for each re-render of the tool path the user asks for, i.e. when 
                they click the "render" button.
                
                In the payload is a reference to "this" so you can possibly grab info or do other 
                manipulations of the board before we render the tool path. This is especially useful for add-on 
                widgets to the Eagle BRD widget such as the Solder Paste Dispenser Add-On or the
                Pick and Place Add-On.
                `,
            '/afterToolPathRender' : `This widget fires a signal after the rendering of the tool path 
                for the Eagle BRD. The tool path is the blue line in the 3D viewer.
                Similar to the /beforeToolPathRender signal, in the payload is a reference to "this" so you can possibly grab info or do other 
                manipulations of the board after we render. This is especially useful for add-on 
                widgets to the Eagle BRD widget such as the Solder Paste Dispenser Add-On or the
                Pick and Place Add-On.
                `
        },
        /**
         * Define the subscribe signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        subscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // so other widgets can publish to this widget to have it do something.
            // '/onExampleConsume': 'Example: This widget subscribe to this signal so other widgets can send to us and we'll do something with it.'
        },
        /**
         * Document the foreign publish signals, i.e. signals owned by other widgets
         * or elements, that this widget/element publishes to.
         */
        foreignPublish: {
            // Define a key:value pair here as strings to document what signals you publish to
            // that are owned by foreign/other widgets.
            // '/jsonSend': 'Example: We send Gcode to the serial port widget to do stuff with the CNC controller.'
        },
        /**
         * Document the foreign subscribe signals, i.e. signals owned by other widgets
         * or elements, that this widget/element subscribes to.
         */
        foreignSubscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // that are owned by foreign/other widgets.
            '/com-chilipeppr-elem-dragdrop/ondropped': 'We subscribe to this signal at a higher priority to intercept the signal, double check if it is an Eagle Brd file and if so, we do not let it propagate by returning false. That way the 3D Viewer, Gcode widget, or other widgets will not get Eagle Brd file drag/drop events because they will not know how to interpret them.'
        },
        /**
         * All widgets should have an init method. It should be run by the
         * instantiating code like a workspace or a different widget.
         */
        init: function (doMyOwnDragDrop) {
            // the workspace may want to handle the drag drop
            // but when in dev mode it makes sense for us to do our own
            if (doMyOwnDragDrop) {
                this.setupDragDrop();
            } else {
                // the workspace is doing the drag/drop. this is important
                // because this code base for this widget is huge and thus
                // the workspace should handle dragging in BRD files
                // and once it sees one, it should then load this widget
                // so that users who don't use ChiliPeppr for BRD files
                // don't have to load all this insane code
                
            }
            
            //this.setupUiFromLocalStorage();

            this.btnSetup();

            //this.status("Loaded...");

            this.forkSetup();

            this.lazyLoadTutorial();

            //$('#com-chilipeppr-widget-eagle .btnAnimate').click( this.animateOverlapPath.bind(this) );

            // init 3d for eagle widget
            this.init3d();

            this.setupMouseOver();
            
            //this.setupAdvancedInflateByUI();
            
            this.setupGcodeTab();
            //this.setupFeedsDepths();
            
            // setup clear button
            $('#com-chilipeppr-widget-eagle .btn-clear').click(this.clearEagleBrd.bind(this));
            
            //this.draw3d();

            console.log(this.name + " done loading.");
        },
        /**
         * This method is called from the main workspace telling us the user
         * just activated us as a widget. This is not the same as load. Load
         * happens once. Activate happens many times if user closes then opens
         * us.
         */
        activateWidget: function() {
            console.log("activating Eagle BRD widget");
            this.reactivateMouseMove();
            this.sceneReAddMySceneGroup();
        },
        unactivateWidget: function() {
            console.log("unactivating Eagle BRD widget");
            this.sceneRemoveMySceneGroup();
            this.deactivateMouseMove();
        },
        /**
         * Try to get a reference to the 3D viewer.
         */
        init3d: function () {
            this.get3dObj();
            if (this.obj3d == null) {
                console.log("loading 3d scene failed, try again in 1 second");
                var attempts = 1;
                var that = this;
                setTimeout(function () {
                    that.get3dObj();
                    if (that.obj3d == null) {
                        attempts++;
                        setTimeout(function () {
                            that.get3dObj();
                            if (that.obj3d == null) {
                                console.log("giving up on trying to get 3d");
                            } else {
                                console.log("succeeded on getting 3d after attempts:", attempts);
                                that.onInit3dSuccess();
                            }
                        }, 5000);
                    } else {
                        console.log("succeeded on getting 3d after attempts:", attempts);
                        that.onInit3dSuccess();
                    }
                }, 1000);
            } else {
                this.onInit3dSuccess();
            }

        },
        onInit3dSuccess: function () {
            console.log("onInit3dSuccess. That means we finally got an object back.");
            this.clear3dViewer();
            
            // open the last file
            var that = this;
            //setTimeout(function () {
                that.open();
            //}, 1000);
        },
        obj3d: null, // gets the 3dviewer obj stored in here on callback
        obj3dmeta: null, // gets metadata for 3dviewer
        userCallbackForGet3dObj: null,
        get3dObj: function (callback) {
            this.userCallbackForGet3dObj = callback;
            chilipeppr.subscribe("/com-chilipeppr-widget-3dviewer/recv3dObject", this, this.get3dObjCallback);
            chilipeppr.publish("/com-chilipeppr-widget-3dviewer/request3dObject", "");
            chilipeppr.unsubscribe("/com-chilipeppr-widget-3dviewer/recv3dObject", this.get3dObjCallback);
        },
        get3dObjCallback: function (data, meta) {
            console.log("got 3d obj:", data, meta);
            this.obj3d = data;
            this.obj3dmeta = meta;
            if (this.userCallbackForGet3dObj) {
                //setTimeout(this.userCallbackForGet3dObj.bind(this), 200);
                //console.log("going to call callback after getting back the new 3dobj. this.userCallbackForGet3dObj:", this.userCallbackForGet3dObj);
                this.userCallbackForGet3dObj();
                this.userCallbackForGet3dObj = null;
            }
        },
        is3dViewerReady: false,
        clear3dViewer: function () {
            console.log("clearing 3d viewer");
            chilipeppr.publish("/com-chilipeppr-widget-3dviewer/sceneclear");
            //if (this.obj3d) this.obj3d.children = [];            
            /*
            this.obj3d.children.forEach(function(obj3d) {
                chilipeppr.publish("/com-chilipeppr-widget-3dviewer/sceneremove", obj3d);
            });
            */
            this.is3dViewerReady = true;
        },
        clearEagleBrd: function() {
            this.get3dObj(this.clearEagleBrdStep2.bind(this));
        },
        clearEagleBrdStep2: function() {
            console.log("clearing Eagle BRD. this.obj3d:", this.obj3d, "this.mySceneGroup:", this.mySceneGroup);
            // remove all 3d viewer stuff
            this.sceneRemoveMySceneGroup();
            this.mySceneGroup = null;
            console.log("after clearing Eagle BRD. this.obj3d:", this.obj3d, "this.mySceneGroup:", this.mySceneGroup);
            
            
            //this.sceneRemove(this.threeDimensions);
            
            this.threeDimensions = null;

            // contains the end mill path (blue/gray line)
            /*this.threePathEndMill.forEach(function(threeObj) {
                this.sceneRemove(threeObj);
            }, this);*/
            this.threePathEndMill = [];
            
            // contains the mesh signals (wires/pads/smds/vias)
            /*this.threePathEndMillArr.forEach(function(p) {
                this.sceneRemove(p);
            }, this);
            this.threePathDeflatedActualArr.forEach(function(p) {
                this.sceneRemove(p);
            }, this);
            this.threePathInflatedActualArr.forEach(function(p) {
                this.sceneRemove(p);
            }, this);*/
            
            // now reset arrays since they're useless now that
            // we removed them and will regenerate below
            this.threePathEndMillArr = [];
            this.threePathDeflatedActualArr = [];
            this.threePathInflatedActualArr = [];
            this.pathEndMillArr = [];
            this.pathEndMillHolesArr = [];
            this.pathInflatedActualArr = [];
            this.pathDeflatedActualArr = [];
            
            // reset all main properties
            //this.pathsUnion = null;
            this.clipperBySignalKey = [];
            this.intersectObjects = [];
            this.clipperDimension = [];
            this.clipperSignalWires = [];
            this.clipperElements = [];
            this.clipperPads = [];
            this.clipperSmds = [];
            this.clipperVias = [];
            this.drillPads = {};
            this.drillVias = {};
            this.paths = null; // final paths generated from onRefresh() used to export gcode
            this.pathsUnion = null;
            this.pathsUnionHoles = null;
            
        },
        setupGcodeTab: function() {
            // attach click event to "Send Gcode to workspace" button
            $('#com-chilipeppr-widget-eagle .btn-eagle-sendgcodetows').click(this.sendGcodeToWorkspace.bind(this));
            //$('#com-chilipeppr-widget-eagle .process-list').sortable();
            //$('#com-chilipeppr-widget-eagle .process-list').disableSelection();
        },
        sendGcodeToWorkspace: function() {
            this.exportGcode();
            var info = {
                name: "Eagle BRD: " + this.fileInfo.name.replace(/.brd$/i, ""), 
                lastModified: new Date()
            };
            // grab gcode from textarea
            var gcodetxt = $('.com-chilipeppr-widget-eagle-gcode').val();
            
            if (gcodetxt.length < 10) {
                chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Error Sending Gcode", "It looks like you don't have any Gcode to send to the workspace. Huh?", 5 * 1000);
                return;
            }
            
            // send event off as if the file was drag/dropped
            chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondropped", gcodetxt, info);
            
            // convert the color on the end mill path because it's irrelevant now based
            // on the gcode being shown by the 3d viewer
            this.threePathEndMill.forEach(function(threeObj) {
                console.log("tweaking endmill path now that we're sending gcode. threeObj:", threeObj);
                if (threeObj.children.length > 0) {
                    threeObj.children[0].material.opacity = 0.1;
                    threeObj.children[0].material.color = 0x000000;
                    /*threeObj.children.forEach(function(threeObjChild) {
                        threeObjChild.material.color = 0x000000;
                        threeObjChild.material.opacity = 0.1;
                    });*/
                } else {
                    threeObj.material.color = 0x000000;
                    threeObj.material.opacity = 0.1;
                }
            }, this);
            
            // or use alternate pubsub
            // "/com-chilipeppr-elem-dragdrop/loadGcode"
            var that = this;
            this.get3dObj(function() {
                console.log("got callback after 3dviewer re-sent us the 3dobj and 3dobjmeta. 3dobj:", that.obj3d, "obj3dmeta:", that.obj3dmeta);
                that.sceneReAddMySceneGroup();
            });
        },
        setupDragDrop: function () {
            // subscribe to events
            chilipeppr.subscribe("/com-chilipeppr-elem-dragdrop/ondragover", this, this.onDragOver);
            chilipeppr.subscribe("/com-chilipeppr-elem-dragdrop/ondragleave", this, this.onDragLeave);
            // /com-chilipeppr-elem-dragdrop/ondropped
            chilipeppr.subscribe("/com-chilipeppr-elem-dragdrop/ondropped", this, this.onDropped, 9); // default is 10, we do 9 to be higher priority
        },
        eagle: null, // contains the eagle object
        open: function (data, info) {
            /*
            // if we are passed the file data, then use that, otherwise look to 
            // see if we had one saved from before, i.e. this is a browser reload scenario
            // and we'd like to show them their recent Eagle BRD
            var file;
            if (data) {
                console.log("open. loading from passed in data. data.length:", data.length, "info:", info);
                file = data;
                this.fileInfo = info;
                $('#com-chilipeppr-widget-eagle .eagle-draghere').addClass("hidden");
            } else {
                
                // try to retrieve the most recent board file
                file = localStorage.getItem('com-chilipeppr-widget-eagle-lastDropped');
                if (file && file.length > 0) {
                    this.fileInfo = localStorage.getItem('com-chilipeppr-widget-eagle-lastDropped-info');
                    if (this.fileInfo && this.fileInfo.match(/^{/)) {
                        this.fileInfo = JSON.parse(this.fileInfo);
                    }
                    console.log("open. loading data from localStorage. file.length:", file.length, "info:", this.fileInfo);
                } else {
                    // there's no file, just return
                    return;
                }

            }
            
            if (file) {
                
                // make sure this file is an Eagle board
                if (!(file.match(/<!DOCTYPE eagle SYSTEM "eagle.dtd">/i))) {
                    chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Error Loading Eagle BRD", "It looks like you had a previous Eagle BRD, but it doesn't seem to be the correct format.", 10 * 1000);
                    return;
                               
                }

                chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Opening Eagle BRD", "Parsing Eagle BRD file and generating signal paths.", 3000, true);
                // reset main properties
                this.activeLayer = 'Top';
                this.clearEagleBrd();
                this.clear3dViewer();
                
                // create board
                this.eagle = new EagleCanvas('eagle-canvas');
                this.eagle.loadText(file);
                //this.eagle.setScaleToFit('eagle-main');
                //this.eagle.setScale(this.eagle.getScale() / 2);
                //this.eagle.draw();
                //var that = this;
                this.draw3d(function() {
                    console.log("got callback from draw3d");
                });
                
                
                $('#com-chilipeppr-widget-eagle .btn-eagle-sendgcodetows').prop('disabled', false);
                console.log("eagle:", this.eagle);
            } else {
                console.log("no last file, so not opening");
            }*/
        },
        bigSTLGroup: null,
        testLoadSTL: function () {
            //var scene = new THREE.Scene();
            
            //var tempFile = "";
            
            
            var loader = new THREE.STLLoader();
            var stlScenGroup = new THREE.Group();
            //this.mySTLGroup = null;
            //loader.load( './models/stl/ascii/slotted_disk.stl', function ( geometryR ) {
            loader.load( './models/Z Axis Plate Motor Side v1.stl', function ( geometryR ) {
            // loader.load( './models/aria.stl', function ( geometryR ) {

					var materialR = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
					var mesh = new THREE.Mesh( geometryR, materialR );

					mesh.position.set( 5, 5, 0 );
					//mesh.rotation.set( 0, - Math.PI / 2, 0 );
					//mesh.scale.set( 5, 5, 5 );

					mesh.castShadow = false;
					mesh.receiveShadow = false;

					//scene.add( mesh );
					//this.sceneAdd (mesh);
					//this.mySTLGroup.add (mesh);
					stlScenGroup.add (mesh);
					console.log ("ray mesh:  ", mesh);

				} );
				/*
				loader.load( './models/3DBenchy.stl', function ( geometryR ) {

					var materialR = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
					var mesh = new THREE.Mesh( geometryR, materialR );

					mesh.position.set( 100, 25, 0);
					//mesh.rotation.set( 0, - Math.PI / 2, 0 );
					//mesh.scale.set( 5, 5, 5 );

					mesh.castShadow = false;
					mesh.receiveShadow = false;

					//scene.add( mesh );
					//this.sceneAdd (mesh);
					//this.mySTLGroup.add (mesh);
					stlScenGroup.add (mesh);
					console.log ("ray mesh:  ", mesh);

				} );*/
				
				console.log ("stlScenGroup:  ", JSON.stringify(stlScenGroup, null, 2) );
            this.sceneAdd (stlScenGroup);
        },
        loadStlModel: function (modelData) {
            var loader = new THREE.STLLoader();
            var stlScenGroup = new THREE.Group();
            loader.load( modelData, function ( geometryR ) {

					var materialR = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
					var mesh = new THREE.Mesh( geometryR, materialR );

					mesh.position.set( 100, 25, 0);
					//mesh.rotation.set( 0, - Math.PI / 2, 0 );
					//mesh.scale.set( 5, 5, 5 );

					mesh.castShadow = false;
					mesh.receiveShadow = false;

					//scene.add( mesh );
					//this.sceneAdd (mesh);
					//this.mySTLGroup.add (mesh);
					stlScenGroup.add (mesh);
					//console.log ("ray mesh:  ", mesh);

				} );
				this.sceneAdd (stlScenGroup);
        },/*
        drawAllStlModels: function () {
            if (this.bigSTLGroup == null)
            {
                this.bigSTLGroup = new THREE.Group();
            }
            //this.bigSTLGroup.add ()
            //Placeholder for lots of model arrangement and other rendering things.  
            this.sceneAdd (bigSTLGroup);
        },*/
        
        /**
         * We need the 3D viewer to be ready to go for us to generate our 3D view,
         * so do a little bit of a wait sequence here where we try 3 times to
         * grab the 3D viewer object and then we can render our board.
         * Alternately, we could render our board and then inject into the 3D
         * viewer later. Not sure why I didn't do it that way initially.
         */
        draw3d: function (callback) {
            if (!this.is3dViewerReady) {
                var that = this;
                setTimeout(function () {
                    if (!that.is3dViewerReady) {
                        setTimeout(function () {
                            if (!that.is3dViewerReady) {
                                console.log("giving up on drawing into 3d for Eagle Brd");
                            } else {
                                console.log("ready to draw 3d on 3rd attempt");
                                that.onDraw3dReady();
                                if (callback) callback();
                            }
                        }, 5000);
                    } else {
                        console.log("ready to draw 3d on 2nd attempt");
                        that.onDraw3dReady();
                        if (callback) callback();
                    }
                }, 2000);
            } else {
                console.log("ready to draw 3d on 1st attempt");
                this.onDraw3dReady();
                if (callback) callback();
            }
        },
        colorSignal: 9249571, // match eagle colors. red for top wire
        colorSmd: 9249571, // same color as signal (again top)
        colorSignalBottom: 2302861,  //match eagle colors.  blue for bottom wire
        colorSmdBottom: 2302861,  //same color as signal (again bottom)
        colorVia: 11842560, // yellow
        colorPad: 2329891, // pads are green
        colorMill: 255, // match color ChiliPeppr shows for milling
        colorHole: 9276813, // light gray
        colorsDrop: [2722312, 8817160, 9046024] , // green, yellow, red
        colorDimension: 9276813, // light gray
        opacitySignal: 0.1,
        opacityDimension: 0.3,
        opacityVia: 0.1,
        opacityPad: 0.1,
        endmillSize: 0.0, // size of endmill that user picks
        actualEndmill: 0.2,
        inflateMillPathBy: null,
        paths: null, // final paths generated from onRefresh() used to export gcode
        pathsUnion: null,
        pathsUnionHoles: null,
        threeDimensions: null,
        activeLayer: 'Top',
        clipperDimensions: [], // contains the dimensions of the board as clipper path
        /**
         * This is a key method that will actually start the traversal of the
         * entire Eagle BRD and generate Three.js objects for each pad/smd/via/wire, etc.
         * Then it will generate Clipper Paths which are just 2d xy values in the
         * format that the Clipper library wants so we can do unions and diffs
         * which is important to generate the isolation paths as well as deal with
         * polygons that may be on the board representing signal planes like a 
         * GND plane.
         */
        onDraw3dReady: function () {
            
    		console.group("draw3d");

            // inform any listeners that we're starting parsing, i.e. we're done with
            // all of our draw3dxxx functions which means all our three.js objects
            // and clipper objects are generated.
            chilipeppr.publish("/" + this.id + '/beforeLayerGenerate', this);
            
            console.log("iterating Eagle Brd and drawing into 3d viewer");
            console.log("eagle obj we will draw:", this.eagle);
            this.clear3dViewer();
            
            //var activeLayer = 'Top';
            //var activeLayer = 'Bottom';
            
            // these methods will draw all Eagle objects into several global
            // properties, the most important of which is this.clipperBySignalKey
            // which holds a structured object of each signal, i.e. +3V, GND, etc.
            /*
            this.draw3dSignalWires(this.eagle.eagleLayersByName[this.activeLayer]);
            this.draw3dSignalPolygons(this.eagle.eagleLayersByName[this.activeLayer]);
            this.draw3dElements(this.eagle.eagleLayersByName[this.activeLayer]);
            
            this.draw3dVias('1-16');
            this.threeDimensions = this.draw3dDimension(this.endmillSize);
            */
            //this.testLoadSTL();
            //this.drawAllStlModels();
            //this.obj3d.children = [];
            
            // obj3d is the original THREE.Object3D() for the 3d
            // viewer. the extents x/y/z vals are calculated off of
            // it so we need a fake object to put in there
            console.log("this.obj3d:", this.obj3d);
            
            chilipeppr.publish('/com-chilipeppr-widget-3dviewer/viewextents' );
            
            // inform any listeners that we're done parsing, i.e. we're done with
            // all of our draw3dxxx functions which means all our three.js objects
            // and clipper objects are generated.
            chilipeppr.publish("/" + this.id + '/afterLayerGenerate', this);

            setTimeout(this.onRefresh.bind(this, null, this.onDraw3dReadyAfter), 2000);

            
            console.log("done drawing Eagle PCB Board");
            console.groupEnd();
        },
        onDraw3dReadyAfter: function() {
            console.log("onDraw3dReadyAfter");
            // ask 3d viewer to set things up now
            chilipeppr.publish('/com-chilipeppr-widget-3dviewer/setunits', "mm" );
            chilipeppr.publish('/com-chilipeppr-widget-3dviewer/drawextents' );
            chilipeppr.publish('/com-chilipeppr-widget-3dviewer/viewextents' );
            $(window).trigger('resize');
            if (this.obj3dmeta && this.obj3dmeta.widget)
                this.obj3dmeta.widget.wakeAnimate();
        },

        // Section on exporting Gcode
        
        clearanceHeight: 1.0, // move z to clearance
        // 1 oz = 0.035mm, 2 oz = 0.07mm, 3 oz = 0.105mm
        depthOfSignalMilling: -0.1, // cutting how deep?
        feedRatePlunge: 30, // plunging into FR4 copper
        feedRateSignals: 80, // feedrate for milling signals,pads,smds,vias
        feedRateDimensions: 100,
        drillFeedrate: 100.0, // mm/min
        drillMaxDiameter: 3.00, //mm/min
        drillDepth: -1.7, // std thickness
        depthOfDimensions: -1.7, // std thickness
        millDiameter: 2,
        stepDownDimensions: -0.5,
        stepDownPasses: 3, // use passes or dimension
        generateGcodeHole:function(diameter, x, y){
            var radius = diameter/2;
            var gdiameter = radius-(this.millDiameter/2); // inside milling 
            var passesDeep = this.depthOfDimensions/this.stepDownPasses; // TODO: calculate my own passes
         
            var result = '(generate hole at x:' + x + ' y:' + y + ' with dia:'+ diameter +' in ' + this.stepDownPasses + ' passes)' + "\n";
            result += "F" + this.feedRateDimensions + "\n";
            // Lift off
            result += "G00 Z" + this.clearanceHeight + "\n";
            // Go to outside from circle
            result += "G00 X" + (x - gdiameter) + " Y" + y + "\n";
            // check passes            
            for(var i=0; i<this.stepDownPasses;i++){
               var deep = passesDeep*(i+1);
               // plunge in material
               result += "G00 Z" + deep.toFixed(4) + "\n";
               // mill circle
               result += "G02 I" + gdiameter.toFixed(4) + "\n";
            }

            // Lift off
            result += "G00 Z" + this.clearanceHeight + "\n";
         
            return result;
        },
        exportGcodeHeader:function(){
            var g = '';
            g += "(Gcode generated by ChiliPeppr Eagle PCB Widget " + (new Date()).toLocaleString() + ")\n";
            g += "G21 (mm mode)\n";
            g += "G90 (abs mode)\n";
            g += "M3 (spindle on)\n";
            g += "TO M6 (set tool)\n"
            return g;
        },
        exportGcodeMilling:function(){
            var g = '';
            this.paths.forEach(function(path) {
                // move to clearance
                g += "G0 Z" + this.clearanceHeight + "\n";
                // move to first position of path
                g += "G0 X" + path[0].X + " Y" + path[0].Y + "\n";
                // move down
                g += "G0 Z0\n";
                g += "G1 Z" + this.depthOfSignalMilling + " F" + this.feedRatePlunge + "\n";
                g += "F" + this.feedRateSignals + "\n";
                for (var i = 1; i < path.length; i++) {
                    var pt = path[i];
                    g += "G1 X" + pt.X + " Y" + pt.Y + "\n";
                }
                // move to first point
                g += "G1 X" + path[0].X + " Y" + path[0].Y + "\n";
                // just to be safe, move to 2nd point to ensure all copper milled out
                // but make sure we go at least 2mm, but no more
                var v1 = new THREE.Vector3(path[0].X, path[0].Y);
                var v2 = new THREE.Vector3(path[1].X, path[1].Y);
                var dist = v1.distanceTo(v2);
                if (dist > 2) {
                    // shorten it
                    var direction = new THREE.Vector3(v2.x-v1.x, v2.y-v1.y, 0);
                    direction.normalize();
                    var ray = new THREE.Ray(v1, direction);
                    v2 = ray.at(2);
                    //console.log("had to shorten distance. ray:", ray, " new v2:", v2, "v1:", v1);
                }
                g += "G1 X" + v2.x + " Y" + v2.y + "\n";
                if (dist < 2) {
                    // go to 3rd point as well
                    g += "G1 X" + path[2].X + " Y" + path[2].Y + "\n";
                }
                
                // done with signal, go to z clearance
                
                
            }, this);

            return g;
        },
        exportGcodeMarkVias:function(){
            var g = '';
            var that = this;

            if(! $('#com-chilipeppr-widget-eagle .drill-markholes').is(':checked'))
               return g;

            // Drilling, first sort to drill diameter and change tool to first diameter
            g += "(------ MARK VIAS -------)\n";
            for ( diameter in this.sortObjByKey(this.drillVias) ){
                this.drillVias[diameter].forEach(function(dvector){
                     g += "G0 Z" + that.clearanceHeight + "\n";
                     g += "G0 X" + dvector.X + " Y" + dvector.Y   + "\n";
                     g += "G0 Z0.1\n";
                     g += "G1 Z" + that.depthOfSignalMilling  + "\n";
                });
                g += "G0 Z" + that.clearanceHeight + "\n";
            }
            return g;
        },
        exportGcodeMarkPads:function(){
            var g = '';
            var that = this;

            if(! $('#com-chilipeppr-widget-eagle .drill-markholes').is(':checked'))
               return g;

            // Drilling, first sort to drill diameter and change tool to first diameter
            g += "(------ MARK PADS -------)\n";
            for ( diameter in this.sortObjByKey(this.drillPads) ){
               this.drillPads[diameter].forEach(function(dvector){
                     g += "G0 Z" + that.clearanceHeight + "\n";
                     g += "G0 X" + dvector.X + " Y" + dvector.Y   + "\n";
                     g += "G0 Z0.1\n";
                     g += "G1 Z" + that.depthOfSignalMilling  + "\n";
                });
                g += "G0 Z" + that.clearanceHeight + "\n";
            }
            return g;
        },
        exportGcodeDrillVias:function(){
            var g = '';
            var that = this;

            if(! $('#com-chilipeppr-widget-eagle .use-drilling').is(':checked'))
               return g;

            // Drilling, first sort to drill diameter and change tool to first diameter
            g += "(------ DRILLING VIAS -------)\n";
            for ( diameter in this.sortObjByKey(this.drillVias) ){
               g += "M5 (spindle off)\n";
               g += "T" + this.toolCount++ + " M6 (set tool to drill with diameter " + diameter + ")\n";
               g += "M3 (spindle on)\n";
               g += "F" + this.drillFeedrate + "\n"; 
               this.drillVias[diameter].forEach(function(dvector){
                     g += "G0 Z" + that.clearanceHeight + "\n";
                     g += "G0 X" + dvector.X + " Y" + dvector.Y   + "\n";
                     g += "G0 Z" + that.clearanceHeight/10 + "\n";
                     g += "G1 Z" + that.drillDepth  + "\n";
                });
                g += "G0 Z" + that.clearanceHeight + "\n";
            }
            return g;
        },
        exportGcodeDrillPads:function(){
            var g = '';

            if(! $('#com-chilipeppr-widget-eagle .use-drilling').is(':checked'))
               return g;

            var that = this;
            g += "(------ DRILLING PADS -------)\n";
            for ( diameter in this.sortObjByKey(this.drillPads)){
               // don't drill holes bigger as max diameter
               if(diameter > that.drillMaxDiameter)
                  break;
               g += "M5 (spindle off)\n";
               g += "T" + this.toolCount++ + " M6 (set tool to drill with diameter " + diameter + ")\n";
               g += "M3 (spindle on)\n";
               g += "F" + this.drillFeedrate + "\n"; 
               this.drillPads[diameter].forEach(function(dvector){
                     g += "G0 Z" + that.clearanceHeight + "\n";
                     g += "G0 X" + dvector.X + " Y" + dvector.Y   + "\n";
                     g += "G0 Z" + that.clearanceHeight/10 + "\n";
                     g += "G1 Z" + that.drillDepth  + "\n";
                });
                g += "G0 Z" + that.clearanceHeight + "\n";
            }
            return g;
        },
        exportGcodeDimensions:function(){
            
            var g = '';
            var that = this;
            
            var diaOfEndmill = $('.dimension-mill-diameter').val();
            
            // DIMENSION Milling
            g += "(------ DIMENSION Milling -------)\n";
            g += "M5 (spindle off)\n";
            g += "T" + this.toolCount++ + " M6 (set tool to mill dimension " + diaOfEndmill + ")\n";
            g += "M3 (spindle on)\n";
            g += "F" + this.feedRateDimensions + "\n";


            // generate holes are bigger as this.drillMaxDiameter
            for ( diameter in this.sortObjByKey(this.drillPads)){
                // only holes bigger as max diameter
                if (diameter < that.drillMaxDiameter) continue;
                this.drillPads[diameter].forEach(function(dvector) {
                    g += that.generateGcodeHole(diameter, dvector.X, dvector.Y)
                });
            }

            
            // generate dimensions
            // we need to take into account the diameter of the endmill
            // for milling dimensions
            console.group("Generating Dimension Milling");
            
            // if we have no dimensions, then let's return
            if (!this.clipperDimension || !this.clipperDimension.length > 0) {
                console.warn("for some reason there's no clipperDimension. huh?. returning.");
                return g;
            }
            
            // create new inflated path
            var millDim = this.getInflatePath([this.clipperDimension], diaOfEndmill / 2);
            millDim = millDim[0];
            // save original clipperDimensions to reset at end of method
            console.log("original clipperDimension", this.clipperDimension);
            console.log("inflated dimension:", millDim);
            var origClipperDimensions = this.clipperDimension;
            this.clipperDimension = millDim;
            
            // TODO: please check if exists holes in eagle board
            // move to clearance
            g += "G0 Z" + this.clearanceHeight + "\n";
            g += "(dimensions)\n";
            // move to first position of path
            if (this.clipperDimension[0] !== undefined)
                g += "G0 X" + this.clipperDimension[0].X + " Y" + this.clipperDimension[0].Y + "\n";
            // move down
            g += "G0 Z0\n";
            var newZ = 0;
            
            var didLastPass = false;
            while (!didLastPass) { //newZ > this.depthOfDimensions) {
                newZ += this.stepDownDimensions;
                if (newZ <= this.depthOfDimensions) {
                    // don't let z go that low
                    newZ = this.depthOfDimensions;
                    didLastPass = true;
                }
                g += "(step down " + this.stepDownDimensions + " for new z " + newZ + ")\n";
                g += "G1 Z" + newZ + " F" + this.feedRatePlunge + "\n";
                g += "F" + this.feedRateDimensions + "\n";
                console.log("this.clipperDimension:", this.clipperDimension);
                
                // we have dimensions defined as linePieces so must eliminate duplicates
                var lastPt = {X:null,Y:null};
                this.clipperDimension.forEach(function(pt) {
                    console.log("making final dimension mill. pt:", pt, "lastPt:", lastPt);
                    if (pt.X == lastPt.X && pt.Y == lastPt.Y) {
                        //console.log("dimension mill: skipping pt:", pt);
                    } else {
                        //console.log("dimension mill: adding pt:", pt);
                        g += "G1 X" + pt.X + " Y" + pt.Y + "\n";
                    }
                    lastPt = pt;
                });
                // move to first point
                //g += "G1 X" + this.clipperDimension[0].X + " Y" + this.clipperDimension[0].Y + "\n";
                // just to be safe, move to 2nd point no more than 3mm
                //g += "G1 X" + this.clipperDimension[1].X + " Y" + this.clipperDimension[1].Y + "\n";

                
            }
            this.clipperDimension = origClipperDimensions;
            console.groupEnd();
            return g;
        },
        exportGcodeFooter:function(){
            
            var g = '';
            g += "(------ FOOTER -------)\n";

            // move to clearance
            g += "G0 Z" + this.clearanceHeight + "\n";
            
            // finalize gcode
            g += "M5 (spindle stop)\n";
            g += "M30 (prog stop)\n";
            return g;
        },
        exportGcode: function() {
            // We will walk through our mondo clipperBySignalKey object to generate
            // our gcode.
            // we will start with wires,smds,pads,vias first.
            // then we'll move onto drills.
            // then we'll finish with dimensions because use may want to swap
            // endmills at end.
            // we will also start at lower left and work our way along the end of each
            // path and move to next.
            // we also need to remove redundant moves.
            
            this.toolCount = 0;
            var i = 100;
            this.addGcode(i, this.exportGcodeHeader()     );
            i += 100;
            this.addGcode(i, this.exportGcodeMilling()    );
            i += 100;
            this.addGcode(i, this.exportGcodeMarkVias()   );
            i += 100;
            this.addGcode(i, this.exportGcodeMarkPads()   );
            i += 100;
            this.addGcode(i, this.exportGcodeDrillVias()  );
            i += 100;
            this.addGcode(i, this.exportGcodeDrillPads()  );
            i += 100;
            this.addGcode(i, this.exportGcodeDimensions() );
            i = 2000;
            this.addGcode(i, this.exportGcodeFooter()      ); // let space for additional gcode entrys

            // ask for additional gcode
            // the user should synchronously inject it by calling back to us
            // with eagleWidget.addGcode();
            chilipeppr.publish(
                "/com-chilipeppr-widget-eagle/addGcode", 
                this.addGcode.bind(this), 
                this.gcodeParts, 
                this, 
                'You need to callback the first parameter with a command like firstParameter(1000, "my gcode");. ' + 
                '1000 would put your gcode after all the gcode generated by the base widget, but before the footer ' +
                'which is at index of 2000. You can inspect the base widget gcode by looking at the 2nd parameter ' + 
                'which is an array of the gcode parts and their indexes because you can insert anywhere there is an unused index.'
            );

            // once we get here all 3rd party add-ons that were listening for the publish should have
            // injected their gcode and we can now move on
            var g = this.getGcode();
            
            console.log("done generating gcode. length:", g.length);
            $('.com-chilipeppr-widget-eagle-gcode').text(g);
        },
        gcodeParts: [],
        addGcode : function(count, gcode){
            this.gcodeParts[count] = gcode;
        },
        getGcode : function() {
            console.log('Get gcodeParts: ', this.gcodeParts);
            return this.gcodeParts.join('');
        },
        
        
        // Actual parsing of Eagle object and rendering of Three.js objects
        // and the Clipper paths.
        
        /*setupAdvancedInflateByUI: function() {
            var smdEl = $('#com-chilipeppr-widget-eagle .inflate-smds-by');
            var padEl = $('#com-chilipeppr-widget-eagle .inflate-pads-by');
            var viaEl = $('#com-chilipeppr-widget-eagle .inflate-vias-by');
            smdEl.keyup(function(evt) {
                console.log("smdEl got keyup. evt:", evt);
                $('#com-chilipeppr-widget-eagle .use-inflate-smds-by').prop('checked', true);
                var val = parseFloat(smdEl.val());
                if (isNaN(val)) {
                    smdEl.addClass("alert-danger");
                } else {
                    smdEl.removeClass("alert-danger");
                }
            });
            padEl.keyup(function(evt) {
                console.log("padEl got keyup. evt:", evt);
                $('#com-chilipeppr-widget-eagle .use-inflate-pads-by').prop('checked', true);
                var val = parseFloat(padEl.val());
                if (isNaN(val)) {
                    padEl.addClass("alert-danger");
                } else {
                    padEl.removeClass("alert-danger");
                }
            });
            viaEl.keyup(function(evt) {
                console.log("viaEl got keyup. evt:", evt);
                $('#com-chilipeppr-widget-eagle .use-inflate-vias-by').prop('checked', true);
                var val = parseFloat(viaEl.val());
                if (isNaN(val)) {
                    viaEl.addClass("alert-danger");
                } else {
                    viaEl.removeClass("alert-danger");
                }
            });
                
            // bind ctrl+enter
            var that = this;
            $('#com-chilipeppr-widget-eagle #eagle-main input').keypress(function(evt) {
                console.log("got keypress. evt:", evt);
                if (evt.ctrlKey && evt.charCode == 10) {
                    that.onRefresh(evt);
                }
            });
        },*/
        onRefresh: function(event, callback) {
            /*
            console.log("onRefresh. event:", event);
            
            if (event) {
                // this was from a button click. hide popover
                $('#com-chilipeppr-widget-eagle .btn-refresh').popover('hide');
            }
            
            // fire off the pubsub signal indicating we're rendering
            chilipeppr.publish('/' + this.id + '/beforeToolPathRender', this);
            
            this.inflateMillPathBy = parseFloat($('#com-chilipeppr-widget-eagle .inflate-by').val());
            var isMagicWand = $('#com-chilipeppr-widget-eagle .magic-wand-active').is(':checked');
            var isShow = $('#com-chilipeppr-widget-eagle .show-actual').is(':checked');
            var isSolid = $('#com-chilipeppr-widget-eagle .show-actual-asmesh').is(':checked');
            
            var extraTxt = "";
            if (isShow) extraTxt += "<br/><br/>You are showing the toolpath, so that will be rendered as well.";
            if (isSolid) extraTxt += " You wanted to show the paths as solid, so that may take minutes to generate.";
            if (isMagicWand) extraTxt += "<br/><br/>You asked for the Magic Wand, so we need to generate constrained normals for all toolpaths. This will take a long time. Please be patient.";
            
            chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Rendering Eagle BRD", "Rendering signals, vias, pads, SMD's, polygons, and thermals. " + extraTxt, 3 * 1000);
            // remove old mill path and inflated path
            setTimeout(this.onRefresh2nd.bind(this, event, callback), 200);*/
        },
        threePathEndMill: [],
        onRefresh2nd: function(event, callback) {
            
        },
        getInflatePathWithConstraint: function(paths, inflateBy, constraints) {
            
            // This method will inflate a path, but not allow the inflate to go
            // beyond half the distance to the paths in contraints
            
            console.log("getInflatePathWithConstraint. paths:", paths, "inflateBy", inflateBy, "constraints:", constraints);
            
            var newPaths = ClipperLib.JS.Clone(paths);

            // draw the path we are inflating
            //this.drawClipperPaths(newPaths, 0x0000ff, 0.99, 3);
            
            // draw the constraints
            var threeObj = this.drawClipperPaths(constraints, 0xff0000, 0.99, 3);
            this.threePathEndMillArr.push(threeObj);
            
            // Step 0. Generate normals for the path.
            for (var i = 0; i < newPaths.length; i++) {
                var path = newPaths[i];
                                
                // iterate through points and generate normals
                for (var ptIndex = 0; ptIndex < path.length; ptIndex++) {
                    var pt = path[ptIndex];
                    pt.normals = this.getNormals(ptIndex, path);
                }
            }
            
            // Step 1. Build a Three.js object of the constraints as a per line structure
            // so when we raycast we get the individual line. I do think this could be
            // done as monolithic lines for better efficiency, but it may not help.
            var constraintGroup = new THREE.Group();
            var constraintLines = new THREE.Group();
            var cLineMat = new THREE.LineBasicMaterial({
                color: 0xff0000
            });
            for (var i = 0; i < constraints.length; i++) {
                var cPath = constraints[i];
                var groupOfLines = this.getThreeJsGroupOfLinesForPath(cPath, 0xff0000);
                constraintGroup.add(groupOfLines);
                
                // create a big line group too cuz more efficient to raycast against
                var lineGeo = new THREE.Geometry();
                for (var i2 = 0; i2 < cPath.length; i2++) {
                    var cpt = cPath[i2];
                    lineGeo.vertices.push(new THREE.Vector3(cpt.X, cpt.Y, 0));
                }
                // close it by adding first pt again
                lineGeo.vertices.push(new THREE.Vector3(cPath[0].X, cPath[0].Y, 0));
                var cLine = new THREE.Line(lineGeo, cLineMat);
                constraintLines.add(cLine);
            }
            var group2 = constraintGroup.clone();
            group2.position.setZ(3);
            console.log("group2:", group2);
            //group2.material.color = 0xff0000;
            this.sceneAdd(group2);
            
            // Step 2. Build normals for each constraint line because we have to project
            // those normals onto our paths to see if we need to add extra points to better
            // follow the curvature of our environment
            for (var i = 0; i < constraints.length; i++) {
                var cPath = constraints[i];
                for (var ptIndex = 0; ptIndex < cPath.length; ptIndex++) {
                    var cPt = cPath[ptIndex];
                    cPt.normals = this.getNormals(ptIndex, cPath);
                }
            }
            
            // Step 3. Loop thru paths and look at each line of the path and see
            // if the constraints project onto us, meaning we'll raycast 2 normals
            // for each point on the constraint lines (so this is a ton of CPU 
            // being chewed up here) and if there is an intersection we'll add
            // that intersecting point to our main path so when we inflate
            // outward we have more points at good spots to match curvature
            // of constraint lines (i.e. let the environment around us influence
            // our inflate shape)
            var lineMat = new THREE.LineBasicMaterial({
                color: 0x0000ff,
                transparent: true,
                opacity: 0.9
            });
            var lineMat2 = new THREE.LineBasicMaterial({
                color: 0x00ff99,
                transparent: true,
                opacity: 0.9
            });
            var debugZ = 3;
            for (var i = 0; i < newPaths.length; i++) {
                var path = newPaths[i];
                
                //if (i != 1) continue;
                
                var newPath = [];
                
                // iterate through points (and lines)
                for (var ptIndex = 0; ptIndex < path.length; ptIndex++) {
                    //if (ptIndex > 10) continue;
                    
                    var pt = path[ptIndex];
                    var pt2 = (ptIndex + 1 < path.length) ? path[ptIndex + 1] : path[0];
                    
                    // we will essentially generate a new line here, meaning we'll
                    // rebuild a new path where we will at least get the same
                    // points we started with if there are no intersections from
                    // the contraints raycasted onto us, but if there are new points
                    // raycasted onto us, we'll add them into the array
                    pt.orig = true;
                    pt.origPtIndex = ptIndex;
                    newPath.push(pt);
                    
                    var lineGeo = new THREE.Geometry();
                    var ptVector = new THREE.Vector3(pt.X, pt.Y, 0);
                    lineGeo.vertices.push(ptVector);
                    lineGeo.vertices.push(new THREE.Vector3(pt2.X, pt2.Y, 0));
                    var myLineObj = new THREE.Line(lineGeo, (ptIndex % 2 == 0) ? lineMat : lineMat2);
                    var myLine = new THREE.Group();
                    myLine.add(myLineObj);
                    
                    // DEBUG. Draw it
                    var myLine2 = myLine.clone();
                    myLine2.position.setZ(debugZ)
                    this.threePathEndMillArr.push(myLine2);
                    this.sceneAdd(myLine2);
                    //debugZ += 0.2;
                    
                    // we could get some new points here from the constraints raycasted
                    // onto this line. if so keep an array. then de-dupe and sort by distance.
                    // then add to line
                    var newPts = [];
                    
                    // see if the environment intersects with me
                    for (var ci = 0; ci < constraints.length; ci++) {
                        //if (ci > 0) continue;
                        var cPath = constraints[ci];
                       
                        for (var cptIndex = 0; cptIndex < cPath.length; cptIndex++) {
                            //if (ptIndex != 0 && ptIndex != 34) continue;
                            var cpt = cPath[cptIndex];
                            
                            // project normal to see if it intersects with myLine
                            //console.log("projecting normal to see if it intersects with myLine. cpt:", cpt);
                            //if (i == 1 && ptIndex == 0) this.drawNormal(cpt.normals.n1, cpt, inflateBy * 2, 0xff0000, 0.1, 2.9);
                            //if (i == 1 && ptIndex == 0) this.drawNormal(cpt.normals.n2, cpt, inflateBy * 2, 0xff9900, 0.1, 2.9);
                            //if (ptIndex == 34) {
                            var rc1 = this.getIntersection(cpt, cpt.normals.n1, myLine, inflateBy * 2, 0xff0000);
                            // if we get an intersect, we want to use this ray but
                            // in reverse to create our inflate
                            if (rc1.length > 0) {
                                var iPt = rc1[0];
                                //console.log("found intersection of constraints onto myLine. ptIndex for myLine:", ptIndex, "rc1:", iPt);
                                
                                // reverse direction of the ray
                                var newDir = {X:cpt.normals.n1.X * -1, Y:cpt.normals.n1.Y * -1};
                                var newPt = {
                                    X:iPt.point.x, 
                                    Y:iPt.point.y,
                                    normal: {
                                        dir: newDir,
                                        dist: iPt.distance / 2
                                    }
                                };
                                this.drawNormal(newDir, newPt, iPt.distance / 2, 0x0000ff, 0.7, 3);
                                // push this point onto newPath
                                newPts.push(newPt);
                            }
                            var rc2 = this.getIntersection(cpt, cpt.normals.n2, myLine, inflateBy * 2, 0xff9900);
                            if (rc2.length > 0) {
                                var iPt = rc2[0];
                                //console.log("found intersection of constraints onto myLine. ptIndex for myLine:", ptIndex, "rc2:", iPt);
                                
                                // reverse direction of the ray
                                var newDir = {X:cpt.normals.n2.X * -1, Y:cpt.normals.n2.Y * -1};
                                var newPt = {
                                    X:iPt.point.x, 
                                    Y:iPt.point.y,
                                    normal: {
                                        dir: newDir,
                                        dist: iPt.distance / 2
                                    }
                                };
                                this.drawNormal(newDir, newPt, iPt.distance / 2, 0x0066ff, 0.7, 3);
                                // push this point onto newPath
                                newPts.push(newPt);

                            }   
                            
                        }
                        
                    }
                    // done looking at contraint paths and points
                    
                    // now that we have our newPts for myLine, we must de-dupe, then sort
                    // by distance
                    
                    // de-dupe
                    if (newPts.length > 0) {
                        //console.log("newPts prior to de-dupe:", newPts);
                        newPtsDeDupe = this.uniqBy(newPts, JSON.stringify);
                        //console.log("newPts after de-dupe:", newPtsDeDupe);
                        
                        // sort by distance 
                        // (also toss any newPt that matches the first point of myLine
                        // or the last point of myLine)
                        ptVector = new THREE.Vector3(pt.X, pt.Y, 0);
                        var newPts2 = [];
                        newPts.forEach(function(newPt) {
                            
                            // check if this point matches the start/end of this line
                            // and if so, toss it
                            if (newPt.X == pt.X && newPt.Y == pt.Y) return;
                            if (newPt.X == pt2.X && newPt.Y == pt2.Y) return;
                            
                            var newPtVector = new THREE.Vector3(newPt.X, newPt.Y, 0);
                            newPt.dist = ptVector.distanceTo(newPtVector);
                            newPts2.push(newPt);
                        });
                        newPts2.sort(function (a, b) {
                            if (a.dist > b.dist) {
                                return 1;
                            }
                            if (a.dist < b.dist) {
                                return -1;
                            }
                            // a must be equal to b
                            return 0;
                        });
                        
                        // now push these new points
                        console.log("newPts after removing if start/end pt and sorting by distance. newPts:", newPts2);
                        newPts2.forEach(function(newPt2) {
                            //newPath.push({X:newPt2.X, Y:newPt2.Y});
                            newPath.push(newPt2);
                        });
                    }
                }
                
                // replace this path with our newpath
                console.log("replacing old path with N points:", path.length, " with newPath with N points:", newPath.length, "newPath:", newPath);
                newPaths[i] = newPath;
                
            }
            
            // WARNING. May have to eliminate points/rays from step above that are the
            // opposite direction of outward facing paths. I don't want any inward facing
            // normals/rays. However, they may get eliminated automatically in the union
            // operation at the end of the process
            
            // Step 4. Now that we have all the points we need on our main
            // paths. Let's inflate now, but inflate intelligently, i.e don't
            // inflate beyond half the ray intersection of each normal
            for (var i = 0; i < newPaths.length; i++) {
                var path = newPaths[i];
                
                //if (i != 1) continue;
                
                var inflatedPath = [];
                
                // iterate through points (and lines)
                for (var ptIndex = 0; ptIndex < path.length; ptIndex++) {
                    //if (ptIndex > 10) continue;
                    
                    var pt = path[ptIndex];
                    var pt2 = (ptIndex + 1 < path.length) ? path[ptIndex + 1] : path[0];
                    
                    // draw shape from normal1 to normal2 to any points on our line up to,
                    // but not including pt2's normal1
                    console.log("drawing shape for ptIndex:", ptIndex, "pt:", pt);
                    
                    
                    if (pt.orig) {
                        
                        // this is an original point, render the two normals
                        var n1Ray = new THREE.Ray(pt.normals.origin, pt.normals.n1.dir);
                        var n2Ray = new THREE.Ray(pt.normals.origin, pt.normals.n2.dir);
                        // project the ray outward to see if it intersects with constraints
                        // if it does we nee to shorten it, otherwise use the standard length
                        var rc1 = this.getIntersection(pt, pt.normals.n1, constraintLines, inflateBy * 2, 0xff0000);
                        var arrowHelper = new THREE.ArrowHelper(pt.normals.n1.dir, pt.normals.origin, inflateBy * 2, 0xff0000);
                        this.threePathEndMillArr.push(arrowHelper);
                        this.sceneAdd(arrowHelper);
                        var n1Pt;
                        if (rc1.length > 0) {
                            // we hit a constraint
                            var hitObj = rc1[0]; // use closest point we hit
                            console.log("rc1 hitObj:", hitObj);
                            n1Pt = n1Ray.at(hitObj.distance / 2);
                        } else {
                            // we did not hit constraint, so use normal inflation
                            n1Pt = n1Ray.at(inflateBy);
                        }
                        
                        var rc2 = this.getIntersection(pt, pt.normals.n2, constraintLines, inflateBy * 2, 0xff0000);
                        var arrowHelper = new THREE.ArrowHelper(pt.normals.n2.dir, pt.normals.origin, inflateBy * 2, 0xff9900);
                        this.threePathEndMillArr.push(arrowHelper);
                        this.sceneAdd(arrowHelper);
                        var n2Pt;
                        if (rc2.length > 0) {
                            // we hit a constraint
                            var hitObj = rc2[0]; // use closest point we hit
                            console.log("rc2 hitObj:", hitObj);
                            n2Pt = n2Ray.at(hitObj.distance / 2);
                        } else {
                            // we did not hit constraint, so use normal inflation
                            n2Pt = n2Ray.at(inflateBy);
                        }
                        
                        // order here is important. create winding triangles
                        // like the way Clipper.js does it
                        // normal 1
                        inflatedPath.push({X:n1Pt.x, Y:n1Pt.y, n1: true});
                        // orig pt
                        //inflatedPath.push(pt);
                        // normal 2
                        inflatedPath.push({X:n2Pt.x, Y:n2Pt.y, n2: true});
                        
                    }
                }
                
                // DEBUG. draw clipper path of inflatedPath
                var threeObj = this.drawClipperPaths([inflatedPath], 0x00ff00, 0.99, 3);
                this.threePathEndMillArr.push(threeObj);
            }
            
            
            console.log("killing logging. done running");
            console.log = function() {};
            return newPaths;
            
            // we have to build a three.js object of lines for absolutely every single
            // point in the entire structure of paths. this is a heavy object, but is 
            // needed for three.js's 
            var group = new THREE.Group();
            for (var i = 0; i < path.length; i++) {
                
                // generate a test path of individual three.js lines
                var groupOfLines = this.getThreeJsGroupOfLinesForPath(newPath);
                group.add(mainPath.groupOfLines);
                
                // also generate a normals array for each mainPath
                // create normals for each pt on mainPath
                // each pt gets 2 normals, one on left for incoming line and one
                // on right for outgoing line
                var normalsArr = [];
                for (var ptIndex = 0; ptIndex < mainPath.orig.length; ptIndex++) {
                    var pt = mainPath.orig[ptIndex];
                    var normals = this.getNormals(ptIndex, mainPath.orig);
                    
                    //console.log("normals:", normals);
                    //var ah1 = this.drawNormal(normals.n1, pt, size, 0xff0000, 0.9, 0);
                    //var ah2 = this.drawNormal(normals.n2, pt, size, 0x00ff00, 0.9, 0);
                    //console.log("ah1:", ah1);
                    
                    // figure out inflate point for normal 1
                    var iPt = {};
                    iPt.dir = new THREE.Vector3(normals.n1.X, normals.n1.Y, 0);
                    iPt.origin = new THREE.Vector3(pt.X, pt.Y, 0);
                    iPt.distance = size;
                    // figure out the final inflate position
                    iPt.arrowHelper = new THREE.ArrowHelper( iPt.dir, iPt.origin, iPt.distance, 0xffff00 );
                    //this.sceneAdd(iPt.arrowHelper);
                    iPt.arrowHelper.updateMatrixWorld();
                    var vector = iPt.arrowHelper.line.geometry.vertices[1].clone();
                    vector.applyMatrix4( iPt.arrowHelper.line.matrixWorld );
                    iPt.inflatePt = vector;
                    //console.log("about to create particle for final inflate pt:", iPt.inflatePt);
                    var particle = this.getParticle(iPt.inflatePt.x, iPt.inflatePt.y, iPt.inflatePt.z, 0x0000ff);
                    //this.sceneAdd(particle);
                    normals.n1.iPt = iPt;
                    
                    // figure out inflate point for normal 2
                    var iPt = {};
                    iPt.dir = new THREE.Vector3(normals.n2.X, normals.n2.Y, 0);
                    iPt.origin = new THREE.Vector3(pt.X, pt.Y, 0);
                    iPt.distance = size;
                    // figure out the final inflate position
                    iPt.arrowHelper = new THREE.ArrowHelper( iPt.dir, iPt.origin, iPt.distance, 0xffff00 );
                    //this.sceneAdd(iPt.arrowHelper);
                    iPt.arrowHelper.updateMatrixWorld();
                    var vector = iPt.arrowHelper.line.geometry.vertices[1].clone();
                    vector.applyMatrix4( iPt.arrowHelper.line.matrixWorld );
                    iPt.inflatePt = vector;
                    //console.log("about to create particle for final inflate pt:", iPt.inflatePt);
                    var particle = this.getParticle(iPt.inflatePt.x, iPt.inflatePt.y, iPt.inflatePt.z, 0x0000ff);
                    //this.sceneAdd(particle);
                    normals.n2.iPt = iPt;

                    normalsArr.push(normals);
                }
                mainPath.normals = normalsArr;

            }
        },

        // This section deals with enabling the mouseover on the 3D area
        // to show popups and hilite signals as you move your mouse around. I
        // have found this to be one of the nicest parts of the Eagle BRD Import
        // to visualize the Eagle BRD better than what Eagle lets us do
        
                raycaster: null,
        projector: null, // = new THREE.Projector();
        arrowHelper: null,
        intersectObjects: [], // contains three.js objects that we want to detect on mouse movement in the 3d viewer
        renderArea: null, // cache for renderarea dom element
        infoArea: null, // store dom that shows info
        infoSignalArea: null,
        lastIntersect: null, // last obj we showed info for
        hidePopupsElem: null, // quick access to hide checkbox
        setupMouseOver: function () {
            this.raycaster = new THREE.Raycaster();
            //this.projector = new THREE.Projector();
            $('#com-chilipeppr-widget-3dviewer-renderArea').mousemove(this.onMouseOver.bind(this));
            //$('#com-chilipeppr-widget-3dviewer-renderArea').click(this.onMouseOver.bind(this));
            this.renderArea = $('#com-chilipeppr-widget-3dviewer-renderArea');
            this.infoArea = $('.com-chilipeppr-widget-eagle-info');
            this.infoArea.prependTo(this.renderArea);
            this.infoSignalArea = $('.com-chilipeppr-widget-eagle-info-signal');
            this.infoSignalArea.prependTo(this.renderArea);
            this.hidePopupsElem = $('#com-chilipeppr-widget-eagle .popups-hide');
            var that = this;
            this.hidePopupsElem.change(function(evt) {
                if (that.hidePopupsElem.is(":checked")) {
                    // hide
                    that.deactivateMouseMove();
                } else {
                    // unhide
                    that.reactivateMouseMove();
                }
            });
            
        },
        reactivateMouseMove: function() {
            // add mouseover event
            console.log("reactivateMouseMove");
            $('#com-chilipeppr-widget-3dviewer-renderArea').mousemove(this.onMouseOver.bind(this));
        },
        deactivateMouseMove: function() {
            console.log("deactivateMouseMove");
            // remove mouseover event
            $('#com-chilipeppr-widget-3dviewer-renderArea').unbind("mousemove");
            this.hidePopups();
        },
        hidePopups: function() {
            
            console.log("hiding popups and resetting opacities");
            this.infoSignalArea.addClass('hidden');
            this.infoArea.addClass('hidden');
            
            // reset opacities
            if (this.lastIntersect != null) {
                console.log("lastIntersect:", this.lastIntersect);
                // also reset opacity for other items we hilited
                if (this.lastIntersectOtherMaterials != null) {
                    //console.log("lastIntersectOtherMaterials:", this.lastIntersectOtherMaterials);
                    this.lastIntersectOtherMaterials.forEach(function(material) {
                        material.opacity = material.opacityBackup;
                    });
                    this.lastIntersectOtherMaterials = [];
                }
                this.lastIntersect.object.material.opacity = this.lastIntersect.object.material.opacityBackup;
            }
        },
        lastIntersectOtherMaterials: [], // array to hold materials modified by mouseover so we can reset them later to normal opacity
        onMouseOver: function (event) {

            if(this.hidePopupsElem.is(":checked"))
                return;
            
            //console.log("onMouseOver. evt:", event);
            //return;
            //if (!event.ctrlKey) return;
            //event.preventDefault();

            //this.obj3dmeta.widget.scene.updateMatrixWorld();

            //this.obj3dmeta.widget.renderer.clear();


            // wake animation so we see the results
            this.obj3dmeta.widget.wakeAnimate();
            //camera.aspect = window.innerWidth / window.innerHeight;
            //this.obj3dmeta.camera.updateProjectionMatrix();
            //this.obj3dmeta.scene.updateMatrixWorld();

            var vector = new THREE.Vector3();
            //console.log("x/y coords:", event.clientX, event.clientY, window.innerWidth, window.innerHeight);

            //mouseVector.x = 2 * (e.clientX / containerWidth) - 1;
            //mouseVector.y = 1 - 2 * ( e.clientY / containerHeight );

            var containerWidth = this.renderArea.innerWidth();
            var containerHeight = this.renderArea.innerHeight();
            //var containerWidth = window.innerWidth;
            //var containerHeight = window.innerHeight;

            //console.log("conainer w/h", containerWidth, containerHeight);

            //this.obj3dmeta.widget.renderer.setSize( containerWidth, containerHeight );
            var x = event.clientX;
            var y = event.clientY;
            vector.set((event.clientX / containerWidth) * 2 - 1, -(event.clientY / containerHeight) * 2 + 1, 0.5);
            //console.log("this.renderArea", this.renderArea);
            //vector.set( ( event.clientX / this.renderArea.innerWidth ) * 2 - 1, - ( event.clientY / this.renderArea.innerHeight ) * 2 + 1, 0.5 );
            //console.log("vector after setting", vector);
            //vector.unproject( this.obj3dmeta.camera );
            // manual unproject
            var matrix = new THREE.Matrix4();
            //matrix.identity();
            //console.log("default matrix:", matrix);
            //console.log("camera projectionMatrix:", this.obj3dmeta.camera.projectionMatrix);
            var matrixInverse = matrix.getInverse(this.obj3dmeta.camera.projectionMatrix);
            //console.log("matrixInverse:", matrixInverse);
            matrix.multiplyMatrices(this.obj3dmeta.camera.matrixWorld, matrixInverse);
            //console.log("matrix after multiply:", matrix);
            vector.applyProjection(matrix);
            // Unproject the vector
            //this.projector.unprojectVector(vector, this.obj3dmeta.camera);
            //console.log("vector after unprojecting", vector);
            //console.log("vector:", vector);

            vector.sub(this.obj3dmeta.camera.position);
            //console.log("vector after subtracing camera pos:", vector);
            vector.normalize();
            //console.log("vector after normalize:", vector);
            //this.raycaster.set( this.obj3dmeta.camera.position, vector );
            this.raycaster.ray.set(this.obj3dmeta.camera.position, vector);
            //console.log("raycaster.ray:", this.raycaster.ray);
            //console.log("origin:", this.raycaster.ray.origin);
            //console.log("direction:", this.raycaster.ray.direction);

            // add an arrow to represent click
            /*
            var dir = this.raycaster.ray.direction.clone(); //new THREE.Vector3( 1, 0, 0 );
            var origin = this.raycaster.ray.origin.clone(); //new THREE.Vector3( 0, 0, 0 );
            var length = 10;
            var hex = 0x000000;
            
            this.sceneRemove( this.arrowHelper);
            this.arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
            this.sceneAdd( this.arrowHelper );
            */

            //var intersects = raycaster.intersectObjects( objects );
            //console.log("objects:", this.obj3dmeta.scene.children);
            //var intersects = this.raycaster.intersectObjects( this.obj3dmeta.scene.children, true );
            //console.log("testing intersect on:", this.intersectObjects);
            var intersects = this.raycaster.intersectObjects(this.intersectObjects, true);

            // reset last object
            if (this.lastIntersect != null) {
                // also reset opacity for other items we hilited
                if (this.lastIntersectOtherMaterials != null) {
                    this.lastIntersectOtherMaterials.forEach(function(material) {
                        material.opacity = material.opacityBackup;
                    });
                    this.lastIntersectOtherMaterials = [];
                }
                this.lastIntersect.object.material.opacity = this.lastIntersect.object.material.opacityBackup;
            }

            if (intersects.length > 0) {
                console.log("we got intersection on N objects:", intersects);
                //var that = this;
                //intersects.forEach(function(obj) {
                var obj = intersects[0];
                if (obj != this.lastIntersect) {
                    this.lastIntersect = obj;
                    //if ('elemKey' in obj.object.userData) {
                    console.log("intersect obj:", obj.object.userData);
                    //console.log("conainer w/h", containerWidth, containerHeight);
                    //console.log("onMouseOver. evt:", event);
                    //this.renderArea.prepend('<div style="position:absolute;top:' + y + 'px;left:' + x + 'px;" >' + obj.object.userData.elemKey + '</div>');
                    //console.log("found smd");
                    //obj.object.material.color.setHex( Math.random() * 0xffffff );
                    x += 30;
                    //y += 30;

                    
                    var ud = obj.object.userData;
                    if (!('type' in ud)) {
                        // we found this thru recursion, go to parent
                        // to get userData
                        ud = obj.object.parent.userData;
                    }
                    
                    // figure out signal name for this element that was moused over
                    var signalKey = "";
                    if (ud.type == "smd") {
                        signalKey = ud.elem.padSignals[ud.smd.name];
                    } else if (ud.type == "pad") {
                        signalKey = ud.elem.padSignals[ud.pad.name];
                    } else if (ud.type == "via") {
                        signalKey = ud.name; 
                    } else if (ud.type == "signal") {
                        signalKey = ud.name;
                    } else {
                        console.error("got ud.type that we did not recognize. ud:", ud);
                    }
                    console.log("signalKey:", signalKey);
                    
                    
                    // update opacity for ALL smds/pads/vias/wires for this signal
                    // we use shared materials across all smds/pads/vias/wires
                    // so u only have to change the opacity once on each type
                    // now also find ALL other items in this signal
                    //var signalKey = ud.name;
                    var signal = this.clipperBySignalKey[signalKey];
                    console.log("signal:", signal);
                    
                    var opacity = 0.6;
                    if (!obj.object.material.opacityBackup) 
                        obj.object.material.opacityBackup = obj.object.material.opacity;
                    if (signal.smds && signal.smds.length > 0) {
                        signal.smds.forEach(function(smd) {
                            var material = smd.threeObj.material;
                            if (!material.opacityBackup) material.opacityBackup = material.opacity;
                            material.opacity = opacity;
                            this.lastIntersectOtherMaterials.push(material);
                        }, this);
                    }
                    if (signal.pads && signal.pads.length > 0) {
                        signal.pads.forEach(function(pad) {
                            var material = pad.threeObj.material;
                            if (!material.opacityBackup) material.opacityBackup = material.opacity;
                            material.opacity = opacity;
                            this.lastIntersectOtherMaterials.push(material);
                        }, this);
                    }
                    if (signal.vias && signal.vias.length > 0) {
                        var material = signal.vias[0].threeObj.material;
                        if (!material.opacityBackup) material.opacityBackup = material.opacity;
                        material.opacity = opacity;
                        this.lastIntersectOtherMaterials.push(material);
                    }
                    if (signal.wire && signal.wire.threeObj) {
                       
                        if (signal.wire.threeObj instanceof THREE.Mesh) {
                            var material = signal.wire.threeObj.material;
                            if (!material.opacityBackup) material.opacityBackup = material.opacity;
                            material.opacity = opacity;
                            this.lastIntersectOtherMaterials.push(material);
                        } else {
                            signal.wire.threeObj.children.forEach(function(wire) {
                                var material = wire.material;
                                if (!material.opacityBackup) material.opacityBackup = material.opacity;
                                material.opacity = opacity;
                                this.lastIntersectOtherMaterials.push(material);
                            }, this);
                        }
                    }


                    // now do specific stuff just for this item that was moused
                    // over, including making it's opacity darker than the rest of
                    // the signal items we already hilited
                    // see what type object
                    if (ud.type == "smd" || ud.type == "pad") {
                        
                        this.infoArea.find('.info-package').text(ud.pkg.name);
                        this.infoArea.find('.info-elem-name').text(ud.elem.name);
                        this.infoArea.find('.info-elem-value').text(ud.elem.value);
                        //this.infoArea.find('.row-pad').removeClass("hidden");

                        // Add checkbox if dispenser == on
                        if($('#com-chilipeppr-widget-eagle .dispenser-active').is(':checked')){
                           this.infoArea.find('.info-elem-dispenser').removeClass('hidden');
                           this.infoArea.find('.ignore-in-dispenser').change(function(e){
                              ud['ignoreInDispenser'] = (this.checked ? true : false);
                           });
                        }else{
                           this.infoArea.find('.info-elem-dispenser').addClass('hidden');
                        }
                        
                        
                        this.infoSignalArea.addClass('hidden');
                        this.infoArea.removeClass('hidden');
                        this.infoArea.css('left', x + "px").css('top', y + "px");
                        
                        if (ud.type == "smd") {
                            this.infoArea.find('.info-title').text("SMD Pad");
                            this.infoArea.find('.info-pad').text(ud.smd.name + " (of " + ud.pkg.smds.length + " smds)");
                            var sigName = ud.elem.padSignals[ud.smd.name];
                            if (sigName === undefined || sigName == null) sigName = "undefined";
                            this.infoArea.find('.info-signal').text(sigName);
                            this.infoArea.find('.info-layer').text(ud.smd.layer);
                        } else {
                            this.infoArea.find('.info-title').text("Pad");
                            this.infoArea.find('.info-pad').text(ud.pad.name + " (of " + ud.pkg.pads.length + " pads)");
                            var sigName = ud.elem.padSignals[ud.pad.name];
                            if (sigName === undefined || sigName == null) sigName = "undefined";
                            this.infoArea.find('.info-signal').text(sigName);
                            this.infoArea.find('.info-layer').text("Top Copper");
                        }

                    } else if (ud.type == "signal") {
                        console.log("mo on signal wire:", ud);
                        this.infoSignalArea.find('.info-title').text("Signal");                        
                        this.infoSignalArea.find('.info-signal').text(ud.name);
                        this.infoSignalArea.find('.info-layer').text(ud.layer.name);
                        this.infoSignalArea.find('.info-wirecnt').text(ud.layerWires.length);
                        this.infoSignalArea.find('.info-vias').text("-");
                        this.infoArea.addClass('hidden');
                        this.infoSignalArea.removeClass('hidden');
                        this.infoSignalArea.css('left', x + "px").css('top', y + "px");

                    } else if (ud.type == "via") {
                        console.log("via:", ud);
                        this.infoSignalArea.find('.info-title').text("Via"); 
                        this.infoSignalArea.find('.info-signal').text(ud.name);
                        this.infoSignalArea.find('.info-layer').text(ud.via.layers);
                        this.infoSignalArea.find('.info-wirecnt').text("-");
                        this.infoSignalArea.find('.info-vias').text(ud.layerVias.length);
                        this.infoArea.addClass('hidden');
                        this.infoSignalArea.removeClass('hidden');
                        this.infoSignalArea.css('left', x + "px").css('top', y + "px");
                    }

                    obj.object.material.opacity = 0.8;
                }
            } else {
                // hide info area

                this.infoArea.addClass('hidden');
                this.infoSignalArea.addClass('hidden');
            }

        },

        // THIS SECTION OF CODE IS UTILITY METHODS FOR WORKING WITH CLIPPER.JS
        
        getXorOfClipperPaths: function (subj_paths, clip_paths) {
            //console.log("getXorOfClipperPaths");
            var cpr = new ClipperLib.Clipper();
            var scale = 10000;
            ClipperLib.JS.ScaleUpPaths(subj_paths, scale);
            ClipperLib.JS.ScaleUpPaths(clip_paths, scale);
            cpr.AddPaths(subj_paths, ClipperLib.PolyType.ptSubject, true);
            cpr.AddPaths(clip_paths, ClipperLib.PolyType.ptClip, true);
            var clipType = ClipperLib.ClipType.ctXor;
            var subject_fillType = ClipperLib.PolyFillType.pftNonZero;
            var clip_fillType = ClipperLib.PolyFillType.pftNonZero;
            var solution_paths = new ClipperLib.Paths();
            cpr.Execute(clipType, solution_paths, subject_fillType, clip_fillType);

            ClipperLib.JS.ScaleDownPaths(solution_paths, scale);
            ClipperLib.JS.ScaleDownPaths(clip_paths, scale);
            ClipperLib.JS.ScaleDownPaths(subj_paths, scale);
            return solution_paths;
        },
        getIntersectionOfClipperPaths: function (subj_paths, clip_paths) {
            //console.log("getIntersectionOfClipperPaths");
            var cpr = new ClipperLib.Clipper();
            var scale = 10000;
            ClipperLib.JS.ScaleUpPaths(subj_paths, scale);
            ClipperLib.JS.ScaleUpPaths(clip_paths, scale);
            cpr.AddPaths(subj_paths, ClipperLib.PolyType.ptSubject, true);
            cpr.AddPaths(clip_paths, ClipperLib.PolyType.ptClip, true);
            var clipType = ClipperLib.ClipType.ctIntersection;
            var subject_fillType = ClipperLib.PolyFillType.pftNonZero;
            var clip_fillType = ClipperLib.PolyFillType.pftNonZero;
            var solution_paths = new ClipperLib.Paths();
            cpr.Execute(clipType, solution_paths, subject_fillType, clip_fillType);

            ClipperLib.JS.ScaleDownPaths(solution_paths, scale);
            ClipperLib.JS.ScaleDownPaths(clip_paths, scale);
            ClipperLib.JS.ScaleDownPaths(subj_paths, scale);
            return solution_paths;
        },
        getDiffOfClipperPaths: function (subj_paths, clip_paths) {
            //console.log("getDiffOfClipperPaths");
            var cpr = new ClipperLib.Clipper();
            var scale = 10000;
            ClipperLib.JS.ScaleUpPaths(subj_paths, scale);
            ClipperLib.JS.ScaleUpPaths(clip_paths, scale);
            cpr.AddPaths(subj_paths, ClipperLib.PolyType.ptSubject, true);
            cpr.AddPaths(clip_paths, ClipperLib.PolyType.ptClip, true);
            var clipType = ClipperLib.ClipType.ctDifference;
            var subject_fillType = ClipperLib.PolyFillType.pftNonZero;
            var clip_fillType = ClipperLib.PolyFillType.pftNonZero;
            var solution_paths = new ClipperLib.Paths();
            cpr.Execute(clipType, solution_paths, subject_fillType, clip_fillType);

            ClipperLib.JS.ScaleDownPaths(solution_paths, scale);
            ClipperLib.JS.ScaleDownPaths(clip_paths, scale);
            ClipperLib.JS.ScaleDownPaths(subj_paths, scale);
            return solution_paths;
        },
        getAllPathsAsOuterOrientation: function(subj_paths) {
            var sol_path = [];
            subj_paths.forEach(function(path) {
                if (ClipperLib.Clipper.Orientation(path)) {
                    // we're fine. this is in outer mode
                    sol_path.push(path);
                } else {
                    // we should reverse it
                    sol_path.push(path.reverse());
                }
            });
            return sol_path;
        },
        getUnionOfClipperPaths: function (subj_paths) {
            //console.log("getUnionOfClipperPaths");
            var cpr = new ClipperLib.Clipper();
            var scale = 100000;
            ClipperLib.JS.ScaleUpPaths(subj_paths, scale);
            cpr.AddPaths(subj_paths, ClipperLib.PolyType.ptSubject, true);
            var subject_fillType = ClipperLib.PolyFillType.pftNonZero;
            var clip_fillType = ClipperLib.PolyFillType.pftNonZero;
            var solution_paths = new ClipperLib.Paths();
            cpr.Execute(ClipperLib.ClipType.ctUnion, solution_paths, subject_fillType, clip_fillType);
            //console.log(JSON.stringify(solution_paths));
            //console.log("solution:", solution_paths);
            // scale back down
            for (var i = 0; i < solution_paths.length; i++) {
                for (var j = 0; j < solution_paths[i].length; j++) {
                    solution_paths[i][j].X = solution_paths[i][j].X / scale;
                    solution_paths[i][j].Y = solution_paths[i][j].Y / scale;
                }
            }
            ClipperLib.JS.ScaleDownPaths(subj_paths, scale);
            return solution_paths;
        },
        drawUnionOfClipperPaths: function (subj_paths) {
            var that = this;
            var solution_paths = this.getUnionOfClipperPaths(subj_paths);

            for (var i = 0; i < solution_paths.length; i++) {
                var lineUnionGeo = new THREE.Geometry();
                for (var j = 0; j < solution_paths[i].length; j++) {
                    lineUnionGeo.vertices.push(new THREE.Vector3(solution_paths[i][j].X, solution_paths[i][j].Y, 0));
                }
                // close it by connecting last point to 1st point
                lineUnionGeo.vertices.push(new THREE.Vector3(solution_paths[i][0].X, solution_paths[i][0].Y, 0));

                var lineUnionMat = new THREE.LineBasicMaterial({
                    color: 0x0000ff,
                    transparent: true,
                    opacity: 0.5
                });
                var lineUnion = new THREE.Line(lineUnionGeo, lineUnionMat);
                lineUnion.position.set(0, -20, 0);
                that.sceneAdd(lineUnion);
            }
        },
        drawClipperPaths: function (paths, color, opacity, z, zstep, isClosed, isAddDirHelper) {
            console.log("drawClipperPaths");
            var lineUnionMat = new THREE.LineBasicMaterial({
                color: color,
                transparent: true,
                opacity: opacity
            });

            if (z === undefined || z == null)
                z = 0;

            if (zstep === undefined || zstep == null)
                zstep = 0;

            if (isClosed === undefined || isClosed == null)
                isClosed = true;
            
            var group = new THREE.Object3D();

            for (var i = 0; i < paths.length; i++) {
                var lineUnionGeo = new THREE.Geometry();
                for (var j = 0; j < paths[i].length; j++) {
                    var actualZ = z;
                    if (zstep != 0) actualZ += zstep * j;
                    lineUnionGeo.vertices.push(new THREE.Vector3(paths[i][j].X, paths[i][j].Y, actualZ));
                    
                    // does user want arrow helper to show direction
                    if (isAddDirHelper) {
                        /*
                        var pt = { X: paths[i][j].X, Y: paths[i][j].Y, Z: actualZ };
                        var ptNext;
                        if (j + 1 >= paths[i].length)
                            ptNext = {X: paths[i][0].X, Y: paths[i][0].Y, Z: actualZ };
                        else
                            ptNext = {X: paths[i][j+1].X, Y: paths[i][j+1].Y, Z: actualZ };
                        // x2-x1,y2-y1
                        var dir = new THREE.Vector3( ptNext.X - pt.X, ptNext.Y - pt.Y, ptNext.Z - pt.Z );
                        var origin = new THREE.Vector3( pt.X, pt.Y, pt.Z );
                        var length = 0.1;
                        var hex = 0xff0000;
                        
                        var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
                        group.add( arrowHelper );
                        */
                    }
                }
                // close it by connecting last point to 1st point
                if (isClosed) lineUnionGeo.vertices.push(new THREE.Vector3(paths[i][0].X, paths[i][0].Y, z));


                var lineUnion = new THREE.Line(lineUnionGeo, lineUnionMat);
                //lineUnion.position.set(0,-20,0);
                group.add(lineUnion);
            }
            this.sceneAdd(group);
            return group;
        },
        createClipperPathsAsMesh: function (paths, color, opacity, holePath) {
            //console.log("createClipperPathsAsMesh. paths:", paths, "holePath:", holePath);
            if(color === undefined)
               color = this.colorDimension;
            var mat = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: opacity,
                side: THREE.DoubleSide,
                depthWrite: false
            });

            
            if (paths.length == 1) {
                var shape = new THREE.Shape();
                var i = 0;
                for (var j = 0; j < paths[i].length; j++) {
                    var pt = paths[i][j];
                    if (j == 0) shape.moveTo(pt.X, pt.Y);
                    else shape.lineTo(pt.X, pt.Y);
                }
                
                // see if asked to create hole
                // multiple holes supported now
                if (holePath !== undefined && holePath != null) {
                    if (!(Array.isArray(holePath))) {
                        holePath = [holePath];
                    }
                    
                    for (var hi = 0; hi < holePath.length; hi++) {
                        var hp = holePath[hi];
                        console.log("adding hole:", hp);
                        var hole = new THREE.Path();
                        //var i = 0;
                        for (var j = 0; j < hp.length; j++) {
                            var pt = hp[j];
                            if (j == 0) hole.moveTo(pt.X, pt.Y);
                            else hole.lineTo(pt.X, pt.Y);
                        }
                        shape.holes.push(hole);
                    }
                }

                var geometry = new THREE.ShapeGeometry( shape );
                var shapeMesh = new THREE.Mesh(geometry, mat);
                
                //group.add(shapeMesh);
                return shapeMesh;
            } else {
                var group = new THREE.Object3D();
                
                for (var i = 0; i < paths.length; i++) {
                    var shape = new THREE.Shape();
                    for (var j = 0; j < paths[i].length; j++) {
                        var pt = paths[i][j];
                        if (j == 0) shape.moveTo(pt.X, pt.Y);
                        else shape.lineTo(pt.X, pt.Y);
                    }
                    
                    // see if asked to create hole
                    // multiple holes supported now
                    if (holePath !== undefined && holePath != null) {
                        if (!(Array.isArray(holePath))) {
                            holePath = [holePath];
                        }
                        
                        for (var hi = 0; hi < holePath.length; hi++) {
                            var hp = holePath[hi];
                            console.log("adding hole:", hp);
                            var hole = new THREE.Path();
                            //var i = 0;
                            for (var j = 0; j < hp.length; j++) {
                                var pt = hp[j];
                                if (j == 0) hole.moveTo(pt.X, pt.Y);
                                else hole.lineTo(pt.X, pt.Y);
                            }
                            shape.holes.push(hole);
                        }
                    }  
                    
                    var geometry = new THREE.ShapeGeometry( shape );
                    var shapeMesh = new THREE.Mesh(geometry, mat);
                    
                    group.add(shapeMesh);
                }
                return group;
            }
            //this.sceneAdd(group);
            
        },
        getInflatePath: function (paths, delta, joinType) {
            var scale = 10000;
            ClipperLib.JS.ScaleUpPaths(paths, scale);
            var miterLimit = 2;
            var arcTolerance = 10;
            joinType = joinType ? joinType : ClipperLib.JoinType.jtRound
            var co = new ClipperLib.ClipperOffset(miterLimit, arcTolerance);
            co.AddPaths(paths, joinType, ClipperLib.EndType.etClosedPolygon);
            //var delta = 0.0625; // 1/16 inch endmill
            var offsetted_paths = new ClipperLib.Paths();
            co.Execute(offsetted_paths, delta * scale);

            // scale back down
            for (var i = 0; i < offsetted_paths.length; i++) {
                for (var j = 0; j < offsetted_paths[i].length; j++) {
                    offsetted_paths[i][j].X = offsetted_paths[i][j].X / scale;
                    offsetted_paths[i][j].Y = offsetted_paths[i][j].Y / scale;
                }
            }
            ClipperLib.JS.ScaleDownPaths(paths, scale);
            return offsetted_paths;

        },
        createThermalCutoutsFromSmd: function(smd, poly, myInflateBy) {
            
            console.log("creating thermal cutouts for an smd:", smd);
            var cutoutPath = ClipperLib.JS.Clone([smd.clipper]);
            //return cutoutPath;
            
            // start with inflated smd 
            var inflatedSmd = this.getInflatePath(cutoutPath, myInflateBy);
            
            // since we just want the endmill to go around the outside with a sliver
            // being cut off, deflate by 5% the inflateSmd path and then cutout from
            // inflateSmd
            var smdCutout = this.getInflatePath(inflatedSmd, myInflateBy * -0.05);
            
            // cutout from inflatedSmd
            inflatedSmd = this.getDiffOfClipperPaths(inflatedSmd, smdCutout);
            
            // now add back cross hairs, they should be width
            // of the poly outline stroke
            var width = poly.width;
            console.log("width of cross hairs:", width);
            
            // get center of smd
            console.log("smd:", smd);
            // get bounding box
            var threeInflateSmd = this.createClipperPathsAsMesh(inflatedSmd, 0x00ff00, 0.9);
            var bbox = new THREE.BoundingBoxHelper(threeInflateSmd);
            bbox.update();
            console.log("bbox:", bbox);
            var cx = ((bbox.box.max.x - bbox.box.min.x) / 2) + bbox.box.min.x;
            var cy = ((bbox.box.max.y - bbox.box.min.y) / 2) + bbox.box.min.y;
            var strokeX = this.addStrokeCapsToLine(bbox.box.min.x, cy, bbox.box.max.x, cy, width, "square" );
            var strokeY = this.addStrokeCapsToLine(cx, bbox.box.min.y, cx, bbox.box.max.y, width, "square" );
            //strokeX = this.getAllPathsAsOuterOrientation(strokeX);
            var clipperStroke = this.getUnionOfClipperPaths([strokeX[0], strokeY[0]]);
            //this.drawClipperPaths(clipperStroke, 0x00ff00, 0.99, debugZ);
            // inflate stroke
            clipperStroke = this.getInflatePath(clipperStroke, myInflateBy / 2);
            console.log("clipperStroke:", clipperStroke);
            
            // remove strokes from poly
            var pathWithStrokesRemoved = this.getDiffOfClipperPaths(inflatedSmd, clipperStroke);
            //this.drawClipperPaths(pathWithStrokesRemoved, 0x00ff00, 0.99, 5.0);
            
            // remove non-inflated smd 
            //pathWithStrokesRemoved.push(smd.clipper);
            var pathWithSmdRemoved = this.getDiffOfClipperPaths(pathWithStrokesRemoved, [smd.clipper]);
            //this.drawClipperPaths(pathWithSmdRemoved, 0x0000ff, 0.99, 6.0);
            
            return pathWithSmdRemoved;
        },
        sortObjByKey: function (obj){
          var keys = [];
          var sorted_obj = {};
      
          for(var key in obj){
              if(obj.hasOwnProperty(key)){
                  keys.push(key);
              }
          }
      
          // sort keys
          keys.sort();
      
          // create new array based on Sorted Keys
          jQuery.each(keys, function(i, key){
              sorted_obj[key] = obj[key];
          });
      
          return sorted_obj;
        },



        // THIS SECTION IS FOR WORKING ON THE DIMENSION OF THE BOARD
        
        clipperDimension: [], // holds clipper formatted dimension
        getDimensionWires: function () {
            var layerNumber = this.eagle.eagleLayersByName['Dimension'].number;

            // dimension is wires on layer 20
            var wires = [];
            for (var pkgKey in this.eagle.packagesByName) {

                if ('wires' in this.eagle.packagesByName[pkgKey]) {
                    // yes, there's wires
                    for (var i = 0; i < this.eagle.packagesByName[pkgKey].wires.length; i++) {
                        var wire = this.eagle.packagesByName[pkgKey].wires[i];
                        if (wire.layer == layerNumber) {
                            // we have a dimension
                            //console.log("found a wire:", wire);
                            wires.push(wire);
                        }
                    }
                }
            }
            for (var plainWireKey in this.eagle.plainWires) {
                if (this.eagle.plainWires[plainWireKey].length > 0) {
                    // yes, there's wires in this array
                    for (var i = 0; i < this.eagle.plainWires[plainWireKey].length; i++) {
                        var wire = this.eagle.plainWires[plainWireKey][i];
                        if (wire.layer == layerNumber) {
                            // we have a dimension
                            wires.push(wire);
                        }
                    }
                }
            }

            // build clipper dimension format
            this.clipperDimension = [];
            for (var i = 0; i < wires.length; i++) {
                var wire = wires[i];
                //console.log("clipper appending wire:", wire);
                this.clipperDimension.push({
                    X: wire.x1,
                    Y: wire.y1
                });
                this.clipperDimension.push({
                    X: wire.x2,
                    Y: wire.y2
                });
            }

            //for (var signalKey in this.eagle.signalItems) {
            //}
            return wires;
        },
        draw3dDimension: function (endmillSize) {
            console.log("draw3dDimension", this.eagle);
            var wires = this.getDimensionWires();
            var color = this.colorDimension;

            var lineMat = new THREE.LineBasicMaterial({
                color: color,
                transparent: true,
                opacity: this.opacityDimension
            });

            var lineGeo = new THREE.Geometry();

            for (var i = 0; i < wires.length; i++) {
                var wire = wires[i];
                //console.log("working on wire:", wire);

                lineGeo.vertices.push(new THREE.Vector3(wire.x1, wire.y1, 0));
                lineGeo.vertices.push(new THREE.Vector3(wire.x2, wire.y2, 0));

            }
            // now close the line by pushing first vertices
            if (wires.length > 0) {
                lineGeo.vertices.push(new THREE.Vector3(wires[0].x1, wires[0].y1, 0));
            }

            var line = new THREE.Line(lineGeo, lineMat);
            this.sceneAdd(line);

            // get the inflated milling area
            var dimMillPath = this.getInflatePath([this.clipperDimension], endmillSize);
            //console.log("about to draw clipper inflated path for dimension:", dimMillPath);
            //var threeDim = this.drawClipperPaths(dimMillPath, this.colorMill, 0.8);
            //return threeDim;
            return null;
        },
        
        // UTILITY METHOD TO GENERATE A THREE.JS STROKE FOR A LINE
        // i.e. this takes a line with start/end and creates a stroked line with
        // a round end and returns a three.js object
        
        addStrokeCapsToLine: function (x1, y1, x2, y2, width, capType) {

            var cap = capType != null ? capType : "round";

            // we are given a line with two points. to stroke and cap it
            // we will draw the line in THREE.js and then shift x1/y1 to 0,0
            // for the whole line
            // then we'll rotate it to 3 o'clock
            // then we'll shift it up on x to half width
            // we'll create new vertexes on -x for half width
            // we then have a drawn rectangle that's the stroke
            // we'll add a circle at the start and end point for the cap
            // then we'll unrotate it
            // then we'll unshift it
            var group = new THREE.Object3D();

            var lineGeo = new THREE.Geometry();
            lineGeo.vertices.push(new THREE.Vector3(x1, y1, 0));
            lineGeo.vertices.push(new THREE.Vector3(x2, y2, 0));
            var lineMat = new THREE.LineBasicMaterial({
                color: this.colorSignal,
                transparent: true,
                opacity: this.opacitySignal
            });
            var line = new THREE.Line(lineGeo, lineMat);

            // shift to make x1/y1 zero
            line.position.set(x1 * -1, y1 * -1, 0);
            //line.updateMatrixWorld();
            group.add(line);

            // figure out angle to rotate to 0 degrees
            var x = x2 - x1;
            var y = y2 - y1;
            var theta = Math.atan2(-y, x);
            group.rotateZ(theta);

            // get our new xy coords for start/end of line
            //line.updateMatrixWorld();
            group.updateMatrixWorld();
            var v1 = line.localToWorld(line.geometry.vertices[0].clone());
            var v2 = line.localToWorld(line.geometry.vertices[1].clone());
            //console.log("v1,v2", v1, v2);

            // draw rectangle along line. apply width to y axis.
            var wireGrp = new THREE.Object3D();

            var rectGeo = new THREE.Geometry();
            rectGeo.vertices.push(new THREE.Vector3(v1.x, v1.y - width / 2, 0));
            rectGeo.vertices.push(new THREE.Vector3(v2.x, v1.y - width / 2, 0));
            rectGeo.vertices.push(new THREE.Vector3(v2.x, v1.y + width / 2, 0));
            rectGeo.vertices.push(new THREE.Vector3(v1.x, v1.y + width / 2, 0));
            rectGeo.vertices.push(new THREE.Vector3(v1.x, v1.y - width / 2, 0));
            var rectLines = new THREE.Line(rectGeo, lineMat);
            wireGrp.add(rectLines);
            //rectLines.position.set(x1 * -1, y1 * -1, 0);
            //group.add(rectLines);

            // now add circle caps
            if (cap == "round") {
                var radius = width / 2;
                var segments = 16;
                var circleGeo = new THREE.CircleGeometry(radius, segments);
                // Remove center vertex
                circleGeo.vertices.shift();
                var circle = new THREE.Line(circleGeo, lineMat);
                // clone the circle
                var circle2 = circle.clone();

                // shift left (rotate 0 is left/right)
                var shiftX = 0; //radius * -1;
                var shiftY = 0;
                circle.position.set(shiftX + v1.x, shiftY + v1.y, 0);
                wireGrp.add(circle);

                // shift right
                var shiftX = 0; //radius * 1;
                var shiftY = 0;
                circle2.position.set(shiftX + v2.x, shiftY + v2.y, 0);
                wireGrp.add(circle2);
            }

            // now reverse rotate
            wireGrp.rotateZ(-theta);

            // unshift postion
            wireGrp.position.set(x1 * 1, y1 * 1, 0);

            //this.sceneAdd(wireGrp);

            // now simplify via Clipper
            var subj_paths = [];
            wireGrp.updateMatrixWorld();
            var lineCtr = 0;
            wireGrp.children.forEach(function (line) {
                //console.log("line in group:", line);
                subj_paths.push([]);
                line.geometry.vertices.forEach(function (v) {
                    //line.updateMatrixWorld();
                    //console.log("pushing v onto clipper:", v);
                    var vector = v.clone();
                    var vec = line.localToWorld(vector);
                    subj_paths[lineCtr].push({
                        X: vec.x,
                        Y: vec.y
                    });
                }, this);
                lineCtr++;
            }, this);

            var sol_paths = this.getUnionOfClipperPaths(subj_paths);
            //this.drawClipperPaths(sol_paths, this.colorSignal, 0.8);
            //this.sceneAdd(group);
            return sol_paths;

        },

        // THIS SECTION TURNS THE BRD FILE INTO A USABLE JAVASCRIPT OBJECT
        // THAT IS STRUCTED BY THE SIGNAL NAME AND EACH SIGNAL CONTAINS ALL
        // ELEMENTS FOR THAT SIGNAL
        
        // It also draws the basic Three.js objects for smds,pads,vias,wires.
        
        // the mondo object contains the whole structure of the board
        // with objects for each key item. the main index is the signal name, i.e.
        // GND, +5V, etc.
        clipperBySignalKey: [],
        clipperBySignalKeyItem: {
            wires: [],
            polys: [],
            vias: [],
            smds: [],
            pads: [],
        },
        clipperSignalWires: [], // holds clipper formatted paths
        clipperSignalPolys: [], // holds clipper formatted polygons
        draw3dVias: function (layersName) {
            if (!layersName) return;
            var that = this;
            console.group("draw3dVias");
            //console.log("this.signalItems:", this.eagle.signalItems);
            
            for (var signalKey in this.eagle.signalItems) {
                
                var signalLayers = this.eagle.signalItems[signalKey];
                var layerItems = signalLayers[layersName];
                if (!layerItems) {
                    continue;
                }
                var layerVias = layerItems['vias'] || [];
                //console.log("layerVias:", layerVias);
                
                // create mondo storage
                if (this.clipperBySignalKey[signalKey] === undefined)
                    this.clipperBySignalKey[signalKey] = {};
                this.clipperBySignalKey[signalKey].vias = [];
                
                // create mesh version
                var viaMat = new THREE.MeshBasicMaterial({
                    color: this.colorVia,
                    transparent: true,
                    opacity: this.opacityVia,
                    side: THREE.DoubleSide,
                    depthWrite: false
                });
                var lineMat = new THREE.LineBasicMaterial({
                    color: this.colorVia,
                    transparent: true,
                    opacity: 0.99
                });

                layerVias.forEach(function (via) {
                    //console.log("generating circle for via:", via);

                    // save all drills for vias                  
                    // Most exists only drills with diameter 1.0 0.9 0.8 ...
                    var drill = via.drill.toFixed(1);
                    if(that.drillVias[drill] === undefined)
                        that.drillVias[drill] = [];
                    that.drillVias[drill].push({
                        X: via.x.toFixed(4),
                        Y: via.y.toFixed(4),
                        D: via.drill.toFixed(4)
                    });
                    
                    
                    var viashape = "round";
                    if ('shape' in via) viashape = via.shape;
                    
                    var radius = via.drill; //(via.drill * 2) / 2;
                    var segments = 32;
                    if (viashape == "octagon") segments = 8;
                        
                    viaGeo = new THREE.CircleGeometry(radius, segments);                    
                    // Remove center vertex
                    viaGeo.vertices.shift();
                    //viaGeo.vertices.pop();
                   
                    var line = that.drawCircle(via.x, via.y, via.drill/2, that.colorHole);
                    line.rotateZ(Math.PI / 8);
                    this.sceneAdd(line);
                    
                    // Create shape with hole
                    var shape = new THREE.Shape();
                    
                    // Add outside circle to via
                    var ptCtr = 0;
                    
                    viaGeo.vertices.forEach(function (pt) {
                        //console.log("pt on via:", pt);
                        if (ptCtr == 0) shape.moveTo(pt.x, pt.y);
                        else shape.lineTo(pt.x, pt.y);
                        ptCtr++;
                    }, this);
                    //console.log("shape", shape);
                    //var pt = viaGeo.vertices[0];
                    //shape.lineTo(pt.X, pt.y);
                    
                    // Create hole inside
                    radius = via.drill / 2;
                    segments = 32;
                    
                    holeGeo = new THREE.CircleGeometry(radius, segments);                    
                    // Remove center vertex
                    holeGeo.vertices.shift();

                    var hole = new THREE.Path();
                    
                    var ptCtr = 0;
                    holeGeo.vertices.forEach(function (pt) {
                        if (ptCtr == 0) hole.moveTo(pt.x, pt.y);
                        else hole.lineTo(pt.x, pt.y);
                        ptCtr++;
                    }, this);
                    shape.holes.push(hole);
                    
                    // create mesh for the via
                    var geometry = new THREE.ShapeGeometry( shape );
                    var mesh = new THREE.Mesh(geometry, viaMat );

                    // move shape to correct position
                    mesh.position.set(via.x, via.y, 0);
                    mesh.rotateZ(Math.PI / 8);
                    
                    mesh.userData["type"] = "via";
                    mesh.userData["via"] = via;
                    mesh.userData["name"] = signalKey;
                    mesh.userData["layerVias"] = layerVias;
                    this.sceneAdd(mesh);
                    
                    // add that these get detected during
                    // mouseover
                    this.intersectObjects.push(mesh);

                    // add to via object
                    via["threeObj"] = mesh;
                    
                    // add clipper path
                    var clipperPath = [];
                    line.updateMatrixWorld();
                    line.geometry.vertices.forEach(function(v) {
                        var vector = v.clone();
                        var vec = line.localToWorld(vector);
                        clipperPath.push({X: vec.x, Y: vec.y});
                    }, this);
                    this.clipperVias.push(clipperPath);
                    
                    // add to mondo object
                    this.clipperBySignalKey[signalKey].vias.push({
                        clipper: clipperPath,
                        via: via,
                        threeObj: mesh
                    });
                    
                }, this)
                
            }
            console.log("this.clipperBySignalKey[]:", this.clipperBySignalKey);
            console.groupEnd();
        
        },
        draw3dSignalWires: function (layer) {
            //debugger;
            if (!layer) {
                return;
            }
            
            

            console.group("draw3dSignalWires");
            console.log("layer:", layer);
            
            var layerNumber = layer.number;
            var layerName = layer.name;
            var tempColor = 11403055;
            
            if (layerName == "Top") {
            	//console.log("RAY!!! 3dSignalWireLayerName: T.  ", layerName)
              tempColor = this.colorSignal;
              }
            else if (layerName == "Bottom") {
            	//console.log("RAY!!! 3dSignalWireLayerName: B.  ", layerName)
              tempColor = this.colorSignalBottom;
              console.log("RAY!!! Bottom Color:  ", tempColor)
              }

            var lineCap = 'round';
            // user may override the round cap, so take into account

            // contains all paths for each individual signal
            // so we can join them at the end
            var signalArr = [];

            for (var signalKey in this.eagle.signalItems) {

                var signalLayers = this.eagle.signalItems[signalKey],
                    layerItems = signalLayers[layer.number];
                if (!layerItems) {
                    continue;
                }
                //console.log("layerItems:", layerItems);
                var layerWires = layerItems['wires'] || [];
                
                console.log("layerWires:", layerWires);
                
                // create mondo storage
                if (this.clipperBySignalKey[signalKey] === undefined)
                    this.clipperBySignalKey[signalKey] = {};
                this.clipperBySignalKey[signalKey].layer = layer;
                this.clipperBySignalKey[signalKey].wire = {};
                
                var that = this;

                // per signal wire centipede
                var centipede = [];

                var scale = 10000;
                var that = this;

                layerWires.forEach(function (wire) {
                    //console.log("drawing wires. wire:", wire);

                    // use new util function
                    var sol_paths = that.addStrokeCapsToLine(wire.x1, wire.y1, wire.x2, wire.y2, wire.width);
                    //that.drawClipperPaths(sol_paths, that.colorSignal, 0.2);

                    //console.log("about to add sol_paths to centipede:", sol_paths);
                    centipede.push(sol_paths[0]);
                    wire.clipper = sol_paths[0];

                });

                // merge centipede array of signals into single object
                // do a union with Clipper.js
                var sol_paths = this.getUnionOfClipperPaths(centipede);
                //this.drawClipperPaths(sol_paths, this.colorSignal, 0.2);
                
                // we can get holes in sol_paths. it's rare but if a user created
                // their board in such a way that they created a circle with their
                // wires, we get a hole here. that means we need to separate those
                // out before asking Three.js to draw the shape because it's not smart
                // enough to look at winding order of the paths like Clipper.js is
                var sol_pathsOuter = [];
                var sol_pathsHoles = [];
                sol_paths.forEach(function(path) {
                    if (ClipperLib.Clipper.Orientation(path)) {
                        sol_pathsOuter.push(path);
                    } else {
                        sol_pathsHoles.push(path);
                    }
                }, this);
                // debug draw
                if (sol_pathsHoles.length > 0) {
                    console.log("Found signal wire path with holes:", sol_pathsHoles, "paths:", sol_pathsOuter, "signalKey:", signalKey);
                    //this.drawClipperPaths(sol_pathsOuter, 0x0000ff, 0.99, 0);
                    //this.drawClipperPaths(sol_pathsHoles, 0xff0000, 0.99, 0);
                }
                
                // remove holes from each path even though that's redundant
                // Three.js seems to handle this ok as when it calculates triangles
                // it just sees the hole is nowhere near the triangles and moves on
                var mesh = this.createClipperPathsAsMesh(sol_pathsOuter, tempColor, this.opacitySignal, sol_pathsHoles);
                // slide signal wire down a tinge on z
                // to make rendering prettier
                mesh.position.set(0, 0, -0.00001);

                // on layers other than top, we have to possibly apply a rotation/flip
                //debugger;
                if (layer == "Bottom") {
                    // flip in Y axis
                    var mS = (new THREE.Matrix4()).identity();
                    //set -1 to the corresponding axis
                    mS.elements[0] = -1;
                    //mS.elements[5] = -1;
                    //mS.elements[10] = -1;

                    mesh.applyMatrix(mS);
                }

                // FINALLY. AFTER ALL THAT WORK. LETS ACTUALLY SHOW THE DARN USER THE
                // BEAUTIFUL 3D OBJECTS WE CREATED
                mesh.position.set(0,0,-0.00001);
                this.sceneAdd(mesh);
                
                // add userData for intersect
                mesh.userData.type = "signal";
                mesh.userData.name = signalKey;
                //mesh.userData.wire = wire;
                mesh.userData.signalKey = signalKey;
                mesh.userData.layerWires = layerWires;
                mesh.userData.signalLayers = signalLayers;
                mesh.userData.layerItems = layerItems;
                mesh.userData.layer = layer;
                //mesh.computeFaceNormals();
                //console.log("just added signal mesh to intersectObjects. mesh:", mesh);
                this.intersectObjects.push(mesh);

                // create record of this union'ed signal wire
                var ctr = 0;
                sol_paths.forEach(function (path) {
                    that.clipperSignalWires[signalKey + "-" + ctr] = path;
                    ctr++;
                });

                // add to mondo object
                this.clipperBySignalKey[signalKey].wire = {
                    clipper: sol_paths,
                    wires: layerWires,
                    threeObj: mesh
                };

            }
            console.log("final list of clipper signal wires:", this.clipperSignalWires);
            console.log("this.clipperBySignalKey[]:", this.clipperBySignalKey);
            console.groupEnd();
        },
        draw3dSignalPolygons: function (layer) {

            if (!layer) {
                return;
            }

            console.group("draw3dSignalPolygons");
            console.log("layer:", layer);
            
            var layerNumber = layer.number;

            // contains all paths for each individual polygon
            // so we can join them at the end
            var polyArr = [];

            for (var signalKey in this.eagle.signalItems) {

                var signalLayers = this.eagle.signalItems[signalKey],
                    layerItems = signalLayers[layer.number];
                if (!layerItems) {
                    continue;
                }
                //console.log("layerItems:", layerItems);
                var layerPolys = layerItems['polygons'] || [];
                
                if (layerPolys.length == 0) continue;
                console.log("layerPolys:", layerPolys);
                
                // create mondo storage
                if (this.clipperBySignalKey[signalKey] === undefined)
                    this.clipperBySignalKey[signalKey] = {};
                this.clipperBySignalKey[signalKey].layer = layer;
                //this.clipperBySignalKey[signalKey].polys = [];
                
                var that = this;

                // centipede is not the right reference here, but
                // if the user did multiple polygon pours for this signalKey,
                // i.e. GND, then we want all of these to act like one
                // clipper path with multiple polygons
                var centipede = [];
                
                if (layerPolys.length > 1) {
                    //console.error("have more than one polygon in a signal. need to test this. layerPolys:", layerPolys);
                }
                
                layerPolys.forEach(function (poly) {
                    console.log("drawing polys. poly:", poly);

                    var clipperPoly = [];
                    
                    poly.vertices.forEach(function(v) {
                        clipperPoly.push({X:v.x, Y:v.y});
                    });
                    
                    // store in eagle obj for retrieval from mondo object
                    // later
                    poly.clipper = clipperPoly;    
                    
                    // not sure if merging these will work if multiple
                    // polys in one signal with different ranks,
                    // will have to test
                    centipede.push(clipperPoly);                   

                });
                console.log("poly centipede:", centipede);
                
                // merge centipede array of signals into single object
                // do a union with Clipper.js
                var sol_paths = this.getUnionOfClipperPaths(centipede);
                //this.drawClipperPaths(sol_paths, this.colorSignal, 0.2);
                var mesh = this.createClipperPathsAsMesh(sol_paths, this.colorSignal, this.opacitySignal * 0.6);
                // slide signal wire down a tinge on z
                // to make rendering prettier
                mesh.position.set(0,0,0.00001);
                this.sceneAdd(mesh);
                
                // add userData for intersect
                mesh.userData.type = "poly";
                mesh.userData.name = signalKey;
                //mesh.userData.wire = wire;
                mesh.userData.signalKey = signalKey;
                mesh.userData.layerWires = layerPolys;
                mesh.userData.signalLayers = signalLayers;
                mesh.userData.layerItems = layerItems;
                mesh.userData.layer = layer;
                //mesh.computeFaceNormals();
                //console.log("just added signal mesh to intersectObjects. mesh:", mesh);
                //this.intersectObjects.push(mesh);

                // create record of this union'ed signal wire
                var ctr = 0;
                sol_paths.forEach(function (path) {
                    that.clipperSignalPolys[signalKey + "-" + ctr] = path;
                    ctr++;
                });

                // add to mondo object
                this.clipperBySignalKey[signalKey].poly = {
                    clipper: sol_paths,
                    polys: layerPolys,
                    threeObj: mesh
                };

            }
            console.log("final list of clipper signal polys:", this.clipperSignalPolys);
            console.log("clipperBySignalKey:", this.clipperBySignalKey);
            console.groupEnd();
        },
        clipperElements: [], // holds clipper formatted paths
        clipperPads: [], // subset of elements (pads)
        clipperSmds: [], // subset of elements (smds)
        clipperVias: [], // subset of elements (vias)
        drillPads: {}, // save all pad drill vectors
        drillVias: {}, // save all via drill vectors
        draw3dElements: function (layer) {

            if (!layer) return;

            console.group("draw3dElements");

            var that = this;

            for (var elemKey in this.eagle.elements) {
                var elem = this.eagle.elements[elemKey];
                console.log("working on element:", elem);
                console.log("ray: elemKey:  ", elemKey, "  elem.mirror:  ", elem.mirror);
                console.log("activeLayer:  ", this.activeLayer)
                var renderThisPad;
                if ((elem.mirror == false && this.activeLayer == 'Top') || (elem.mirror == true && this.activeLayer == 'Bottom')  )
                { //|| (pad.drill && pad.drill > 0)
                	renderThisPad = true;
                	console.log ("ray:  this part is on the active layer:", elemKey);
                }
                else
                {
                	renderThisPad = false;
                }
                console.log("pad.drill = ");  //, pad.drill
                //renderThisPad = true;
                
								
                // store clipper formatted points for this element
                //this.clipperElements[elemKey] = [];
								
                var pkg = this.eagle.packagesByName[elem.pkg];
                var rotMat = elem.matrix;
								
                // loop thru smds
                var padCtr = 0;
                var smdgroup = new THREE.Object3D();
								
                // insert smdgroup three.js obj into pkg
                //pkg["threeObj"] = smdgroup;
                elem["threeObj"] = {};
                elem["threeObj"]["smdgroup"] = smdgroup;
                elem["threeObj"]["smds"] = {};

                // CALCULATING SMDS
                if (renderThisPad) {
                pkg.smds.forEach(function (smd) {

                    console.log("drawing smd:", smd);
                    var layerNum = smd.layer;

                    /*
                    if (elem.mirror) {
                        console.log("mirror, since this elem is mirrored, we're getting the mirrorLayer from the eagle object. layerNum prior:", layerNum);
                        layerNum = this.eagle.mirrorLayer(layerNum);
                        console.log("mirror layerNum after:", layerNum);
                    }
                    */
                    /*
                    if (layer.number != layerNum) {
                        return;
                    }*/

                    var lineGeo = new THREE.Geometry();
                    var w2 = smd.dx / 2;
                    var h2 = smd.dy / 2;
                    lineGeo.vertices.push(new THREE.Vector3(w2 * -1, h2 * -1, 0));
                    lineGeo.vertices.push(new THREE.Vector3(w2, h2 * -1, 0));
                    lineGeo.vertices.push(new THREE.Vector3(w2, h2, 0));
                    lineGeo.vertices.push(new THREE.Vector3(w2 * -1, h2, 0));
                    // close it by connecting last point to 1st point
                    lineGeo.vertices.push(new THREE.Vector3(w2 * -1, h2 * -1, 0));

                    var lineMat = new THREE.LineBasicMaterial({
                        color: that.colorSignal,
                        transparent: true,
                        opacity: 0.2
                    });
                    var line = new THREE.Line(lineGeo, lineMat);

                    // do smd as mesh instead
                    lineMat = new THREE.MeshBasicMaterial({
                        color: that.colorSignal,
                        transparent: true,
                        opacity: 0.2,
                        side: THREE.DoubleSide,
                        //overdraw: false,
                        //polygonOffset: true,
                        depthWrite: false
                    });
                    //lineMat.side = THREE.DoubleSided;
                    var holes = [];
                    var triangles = THREE.Shape.Utils.triangulateShape(lineGeo.vertices, holes);

                    for (var i = 0; i < triangles.length; i++) {

                        lineGeo.faces.push(new THREE.Face3(triangles[i][0], triangles[i][1], triangles[i][2]));

                    }
                    //lineGeo.faces.push( new THREE.Face3( 0, 1, 2 ) );
                    lineGeo.computeFaceNormals();
                    line = new THREE.Mesh(lineGeo, lineMat);

                    // add smd mesh to be found on mouse movements
                    this.intersectObjects.push(line);

                    // rotate
                    // now that the smd is drawn, apply its individual
                    // rotation
                    if ('rot' in smd && smd.rot != null) {
                        var rot = parseInt(smd.rot.replace(/R/i, ""));
                        //console.log("will rotate individual smd by deg:", rot);
                        if (rot > 0) {
                            var r = (Math.PI / 180) * rot;
                            //console.log("we are rotating individual smd by radians:", r);
                            var axis = new THREE.Vector3(0, 0, 1);
                            that.rotateAroundObjectAxis(line, axis, r);
                        }
                    }

                    // set smd's x/y
                    line.position.set(smd.x, smd.y, 0);
                    line.userData["smdName"] = smd.name;
                    line.userData["smd"] = smd;
                    //line.userData["elemKey"] = elemKey;
                    line.userData["elem"] = elem;
                    //line.userData['pkgKey'] = elem.pkg;
                    line.userData['pkg'] = pkg;
                    line.userData["type"] = "smd";
                    //console.log("adding smd line with userData:", line);

                    // add this three.js obj to smd
                    //smd["threeObj"] = line;
                    elem["threeObj"]["smds"][smd.name] = line;

                    smdgroup.add(line);
                    //that.sceneAdd(line);
                    //group.add(line);

                    padCtr++;

                }, this);
                

                /*
                if (elem.rot.match(/M/i)) {
                  var axis = new THREE.Vector3(0, 1, 0);
                       var r = (Math.PI / 180) * 180;
                       that.rotateAroundObjectAxis(padgroup, axis, r);
                       console.log ("ray: M matched");

                }*/
                //var t = "M270"; console.log( parseInt(t.replace(/\D+/i,'')) )

                // now rotate and position the smdgroup
                //smdgroup
                if ('rot' in elem && elem.rot != null) {
                    //var rot = parseInt(elem.rot.replace(/R/i, ""));
                    var rot = parseInt(elem.rot.replace(/\D+/i,''));

                    console.log("(r2) will rotate pkg smd by deg:", rot);
                    if (rot > 0) {
                        var r = (Math.PI / 180) * rot;
                        //console.log("we are rotating pkg smd by radians:", r);
                        var axis = new THREE.Vector3(0, 0, 1);
                        that.rotateAroundObjectAxis(smdgroup, axis, r);
                    }
                }
                

                // see if smd group is mirrored
                //console.log("checking if elem is mirrored. elem:", elem);


                /*
                if (elem.rot.match(/M/i)) {
                  var axis = new THREE.Vector3(0, 1, 0);
                       that.rotateAroundObjectAxis(padgroup, axis, 180);
                       console.log ("ray: M matched");

                }
                */

                
                if (elem.mirror) {
                    //console.log("smdgroup elem is mirrored");
                    var mS = (new THREE.Matrix4()).identity();
                    //set -1 to the corresponding axis
                    mS.elements[0] = -1;
                    //mS.elements[5] = -1;
                    //mS.elements[10] = -1;
                    
                    smdgroup.applyMatrix(mS);
                    //mesh.applyMatrix(mS);
                    //object.applyMatrix(mS);
                }
                
                } // (if renderThisPad) ends here
                

                // set position
                smdgroup.position.set(elem.x, elem.y, 0);
                that.sceneAdd(smdgroup);
                

                // store as a clipper path for later union'ing
                var temparr = [];
                // store clipper union'ed smds into elem
                elem["threeObj"]["smdsClipperFmt"] = {};
                smdgroup.updateMatrixWorld();
                var lineCtr = 0;
                smdgroup.children.forEach(function (line) {
                    //console.log("line in group:", line);
                    temparr[lineCtr] = [];
                    line.geometry.vertices.forEach(function (v) {
                        //line.updateMatrixWorld();
                        //console.log("pushing v onto clipper:", v);
                        var vector = v.clone();
                        //vector.applyMatrix( group.matrixWorld );
                        var vec = line.localToWorld(vector);
                        if (!(elemKey + "-" + lineCtr in this.clipperElements)) this.clipperElements[elemKey + "-" + lineCtr] = [];
                        this.clipperElements[elemKey + "-" + lineCtr].push({
                            X: vec.x,
                            Y: vec.y
                        });
                        temparr[lineCtr].push({
                            X: vec.x,
                            Y: vec.y
                        });
                        elem["threeObj"]["smdsClipperFmt"][line.userData.smd.name] = temparr[lineCtr];
                        
                    }, this);
                    
                    // push onto mondo object, which is sorted by signal name
                    // so we're pushing an smd into an alternate hierarchy
                    var ud = line.userData;
                    var signalKey = ud.elem.padSignals[ud.smd.name];
                    // add to mondo object
                    if (this.clipperBySignalKey[signalKey] === undefined)
                        this.clipperBySignalKey[signalKey] = {};
                    if (this.clipperBySignalKey[signalKey].smds === undefined)
                        this.clipperBySignalKey[signalKey].smds = [];
                    var clipperPath = temparr[lineCtr];
                    // remove last point because it closes the object, but on clipper
                    // paths it assumes to close the polygon
                    clipperPath.pop();
                    this.clipperBySignalKey[signalKey].smds.push({
                        clipper: temparr[lineCtr],
                        smd: ud.smd,
                        threeObj: line,
                        threeObjSmdGroup: smdgroup
                    });
                    
                    lineCtr++;
                }, this);
								
                // draw temp union of smd
                temparr.forEach(function (d) {
                    this.clipperSmds.push(d);
                    
                }, this);
                
                //this.clipperSmds.push(temparr);
                //console.log("just stored clipperSmds:", this.clipperSmds);
                /*
                console.log("temparr:", temparr);
                var sol_paths = this.getUnionOfClipperPaths(temparr);
                var infl_path = this.getInflatePath(sol_paths, 0.1);
                this.drawClipperPaths(infl_path, 0x00ffff, 1.0);
                */

                // CALCULATING PADS
                
                // do pads
                
                var padgroup = new THREE.Object3D();
                elem["threeObj"]["padgroup"] = padgroup;
                elem["threeObj"]["pads"] = {};
                elem["threeObj"]["padsAsLines"] = {};
                elem["threeObj"]["padsAsMesh"] = {};
                
                //if (renderThisPad) {
                pkg.pads.forEach(function (pad) {
                    console.log("working on pad for layer. pad:", pad, "layer:", layer);


                    // pads are circles by default, but could be squares or octagons
                    var group = new THREE.Object3D();
                    //var groupMesh = new THREE.Object3D();

                    elem["threeObj"]["padsAsLines"][pad.name] = group;

                    elem["threeObj"]["padsAsMesh"][pad.name] = null;

                    if (pad.shape == "square") {
                        
                        // check if diameter is there. if not create assumption
                        if (pad.diameter == null || isNaN(pad.diameter)) {
                            //console.warn("found pad without diameter. pad:", pad);
                            // base assumption on drill width
                            if (pad.drill && pad.drill > 0) {
                                // we have something to base our size on
                                pad.diameter = pad.drill * 2;
                            } else {
                                console.error("no way to determine pad size for pad:", pad);
                            }
                        }
                        
                        var lineGeo = new THREE.Geometry();
                        var w = pad.diameter / 2;

                        lineGeo.vertices.push(new THREE.Vector3(0 - w, 0 - w, 0));
                        lineGeo.vertices.push(new THREE.Vector3(0 + w, 0 - w, 0));
                        lineGeo.vertices.push(new THREE.Vector3(0 + w, 0 + w, 0));
                        lineGeo.vertices.push(new THREE.Vector3(0 - w, 0 + w, 0));
                        // close it by connecting last point to 1st point
                        lineGeo.vertices.push(new THREE.Vector3(0 - w, 0 - w, 0));

                        var lineMat = new THREE.LineBasicMaterial({
                            color: that.colorPad,
                            transparent: true,
                            opacity: 0.2
                        });
                        var line = new THREE.Line(lineGeo, lineMat);
                        group.add(line);


                    } else if (pad.shape == "octagon") {

                        // use circle geometry shortcut, but create only 8 segments
                        //console.log("generating octagon via circle. pad:", pad);

                        // check if diameter is there. if not create assumption
                        if (pad.diameter == null || isNaN(pad.diameter)) {
                            //console.warn("found pad without diameter. pad:", pad);
                            // base assumption on drill width
                            if (pad.drill && pad.drill > 0) {
                                // we have something to base our size on
                                pad.diameter = pad.drill * 2;
                            } else {
                                console.error("no way to determine pad size for pad:", pad);
                            }
                        }
                        
                        var radius = pad.diameter / 2;
                        var segments = 8; // not 1 extra for center vertex
                        var material = new THREE.LineBasicMaterial({
                            color: that.colorPad,
                            transparent: true,
                            opacity: 0.2
                        });
                        var geometry = new THREE.CircleGeometry(radius, segments, Math.PI / 8, Math.PI * 2);

                        // Remove center vertex
                        geometry.vertices.shift();

                        var lineCircle = new THREE.Line(geometry, material);

                        group.add(lineCircle);


                    } else if (pad.shape == "long") {

                        //debugger;
                        // the long pad height is 3x diameter of drill
                        // the width is 2x diam of drill
                        // unless the user specified the diameter (then use that)
                        //var group = new THREE.Object3D();

                        var lineMat = new THREE.LineBasicMaterial({
                            color: that.colorPad,
                            transparent: true,
                            opacity: 0.2
                        });

                        var dia = pad.diameter;
                        if (!dia > 0) {
                            // no diam. using auto
                            dia = pad.drill * 1.5;
                        }
                        var w = dia; // width of square and circles

                        // could draw circle top, circle bottom, then square, then do union
                        var radius = dia / 2;
                        var segments = 24;
                        var circleGeo = new THREE.CircleGeometry(radius, segments);
                        // Remove center vertex
                        circleGeo.vertices.shift();

                        var circle = new THREE.Line(circleGeo, lineMat);
                        // clone the circle
                        var circle2 = circle.clone();

                        // shift left (rotate 0 is left/right)
                        var shiftX = radius * -1;
                        //shiftX = shiftX + pad.x;
                        var shiftY = 0;
                        //shiftY = shiftY + pad.y;
                        circle.position.set(shiftX, shiftY, 0);
                        group.add(circle);
                        // shift right
                        var shiftX = radius * 1;
                        //shiftX = shiftX + pad.x;
                        var shiftY = 0;
                        //shiftY = shiftY + pad.y;
                        circle2.position.set(shiftX, shiftY, 0);
                        group.add(circle2);

                        // add a square to middle
                        var lineGeo = new THREE.Geometry();
                        w = w / 2;
                        lineGeo.vertices.push(new THREE.Vector3(0 - w, 0 - w, 0));
                        lineGeo.vertices.push(new THREE.Vector3(0 + w, 0 - w, 0));
                        lineGeo.vertices.push(new THREE.Vector3(0 + w, 0 + w, 0));
                        lineGeo.vertices.push(new THREE.Vector3(0 - w, 0 + w, 0));
                        // close it by connecting last point to 1st point
                        lineGeo.vertices.push(new THREE.Vector3(0 - w, 0 - w, 0));
                        var line = new THREE.Line(lineGeo, lineMat);
                        //group.position.set(pad.x, pad.y, 0);
                        group.add(line);

                    } else {
                        //console.log("generating circle. pad:", pad);

                        if (isNaN(pad.diameter)) {
                            //console.log("no diam specified. use auto formula");
                            pad.diameter = pad.drill * 2;
                        }
                        var radius = pad.diameter / 2,
                            segments = 32,
                            material = new THREE.LineBasicMaterial({
                                color: that.colorPad,
                                transparent: true,
                                opacity: 0.2
                            }),
                            geometry = new THREE.CircleGeometry(radius, segments);

                        // Remove center vertex
                        geometry.vertices.shift();

                        // shift to xy pos
                        var lineCircle = new THREE.Line(geometry, material);
                        //lineCircle.position.set(pad.x, pad.y, 0);

                        //lineCircle.rotateX(90);

                        //that.sceneAdd( lineCircle );
                        group.add(lineCircle);
                    }


                    // now draw the drill as dimension (not as standalone)
                    /*
                    var radius = pad.drill / 2;
                    var segments = 24;
                    var circleGeo = new THREE.CircleGeometry(radius, segments);
                    circleGeo.vertices.shift(); // remove center vertex
                    var drillMat = new THREE.LineBasicMaterial({
                        color: that.colorHole,
                    });
                    var drillLine = new THREE.Line(circleGeo, drillMat);
                    drillLine.position.set(elem.x + pad.x, elem.y + pad.y, 0);
                    drillLine.userData["type"] = "drill";

                    group.add(drillLine);
                    //that.sceneAdd(drillLine);
                    */

                    // now that the pad is drawn, apply its individual
                    // rotation
                    if ('rot' in pad && pad.rot != null) {
                        var rot = parseInt(pad.rot.replace(/R/i, ""));
                        //console.log("will rotate individual pad by deg:", rot);
                        if (rot > 0) {
                            var r = (Math.PI / 180) * rot;
                            //console.log("we are rotating individual pad by radians:", r);
                            var axis = new THREE.Vector3(0, 0, 1);
                            that.rotateAroundObjectAxis(group, axis, r);
                        }
                    }

                    // set pad's x/y
                    group.position.set(pad.x, pad.y, 0);

                    // set some userData on group for this pad
                    group.userData["type"] = "pad";
                    group.userData["elem"] = elem;
                    group.userData["pkg"] = pkg;
                    group.userData["pad"] = pad;

                    // ok, finally add to padgroup
                    padgroup.add(group);

                });
                

                // now position the pads for the element's pos, mirror, and rotation
                
                // see if padgroup rotated
                if (elem.rot.match(/R(\d+)/i)) {
                    // there is a rotation
                    var rotTxt = RegExp.$1;
                    var rot = parseInt(rotTxt);
                    console.log("padgroup: will rotate pad by deg:", rot);
                    if (rot > 0) {
                        var r = (Math.PI / 180) * rot;
                        //console.log("we are rotating by radians:", r);
                        var axis = new THREE.Vector3(0, 0, 1);
                        that.rotateAroundObjectAxis(padgroup, axis, r);
                    }
                }
                

                // see if pad group is mirrored
                //console.log("checking if pad elem is mirrored. elem:", elem);
                if (elem.mirror) {
                    //console.log("padgroup:  elem is mirrored. elem:", elem, "pkg:", pkg);
                    var mS = (new THREE.Matrix4()).identity();
                    //set -1 to the corresponding axis
                    mS.elements[0] = -1;
                    //mS.elements[5] = -1;
                    //mS.elements[10] = -1;
                    
                    padgroup.applyMatrix(mS);
                    //mesh.applyMatrix(mS);
                    //object.applyMatrix(mS);
                }
                //} // (if renderThisPad) ends here

                
                // set padgroup's x/y
                padgroup.position.set(elem.x, elem.y, 0);
                //that.sceneAdd(padgroup);
                
                // Now convert the Three.js drawn padgroup to a Clipper path
                // so we can do cool stuff like inflate/deflate and union/intersect
                // it. To convert we need to updateMatrixWorld() for three.js to calculate
                // all the absolute coordinates for us.
                
                // add to Clipper list for later union'ing
                //console.log("group vertices:", padgroup);
                padgroup.updateMatrixWorld();
                var temparr = [];
                var padCtr = 0;
                var lineCtr = 0;
                padgroup.children.forEach(function (group) {
                    group.updateMatrixWorld();

                    // store the vertices into this mesh
                    // array. we'll union them and then
                    // create a mesh. then subtract the drill
                    var meshArr = [];
                    var meshHoleArr = [];
                    var meshCtr = 0;

                    group.children.forEach(function (line) {
                        //console.log("line in group:", line);
                        temparr[lineCtr] = [];
                        var firstMeshPt = null;
                        var firstMeshHolePt = null;
                        meshArr[meshCtr] = [];

                        // Get absolute coordinates from drill hole
                        // in an element
                        if( line.position.x == 0 ){ // only middle point holes
                           var vector = new THREE.Vector3();
                           vector.setFromMatrixPosition( line.matrixWorld  );
                           // Most exists only drills with diameter 1.0 0.9 0.8 ...
                           var drill = line.parent.userData.pad.drill;
                           var shape = line.parent.userData.pad.shape;
                           if(this.drillPads[drill.toFixed(1)] === undefined)
                               this.drillPads[drill.toFixed(1)] = [];
                           this.drillPads[drill.toFixed(1)].push({
                               X: vector.x.toFixed(4),
                               Y: vector.y.toFixed(4),
                               D: drill.toFixed(4)
                           });
                           // New routine to draw a cirlce in threed
                           this.sceneAdd( this.drawCircle(vector.x, vector.y, drill/2, this.colorHole ) );
                           // drill hole --> end
                         }
                        
                        line.geometry.vertices.forEach(function (v) {
                            //console.log("pushing v onto clipper:", v);
                            var vector = v.clone();
                            //vector.applyMatrix( group.matrixWorld );
                            var vec = line.localToWorld(vector);
                            if (!(elemKey + "-" + lineCtr in this.clipperElements)) 
                              this.clipperElements[elemKey + "-" + lineCtr] = [];

                            this.clipperElements[elemKey + "-" + lineCtr].push({
                                X: vec.x,
                                Y: vec.y
                            });
                            temparr[lineCtr].push({
                                X: vec.x,
                                Y: vec.y
                            });
                            //elem["threeObj"]["pads"]
                            var ptxy = {
                                X: vec.x,
                                Y: vec.y
                            };
                            if (line.userData.type == "drill") {

                                meshHoleArr.push(ptxy);
                                if (firstMeshHolePt == null) firstMeshHolePt = ptxy;
                            } else {
                                meshArr[meshCtr].push(ptxy);
                                if (firstMeshPt == null) firstMeshPt = ptxy;
                            }
                        }, this);
                        meshCtr++;
                        // close the mesh and the hole
                        //if (firstMeshPt != null) meshArr.push(firstMeshPt);
                        //if (firstMeshHolePt != null) meshHoleArr.push(firstMeshHolePt);

                        lineCtr++;
                    }, this);

                    //console.log("creating pad mesh for pad:");
                    var shape = new THREE.Shape();
                    
                    // create a mesh for each group
                    //var lineGeo = new THREE.Geometry();
                    // we need to union the mesh first cuz it
                    // could have sub-components like on long pads
                    var sol_paths = this.getUnionOfClipperPaths(meshArr);
                    var clipperOuterPath = sol_paths[0];
                    //console.log("unionized mesh pts for meshArr:", sol_paths);
                    var ptCtr = 0;
                    sol_paths[0].forEach(function (pt) {
                        if (ptCtr == 0) shape.moveTo(pt.X, pt.Y);
                        else shape.lineTo(pt.X, pt.Y);
                        //lineGeo.vertices.push(new THREE.Vector3(pt.X, pt.Y, 0));
                        ptCtr++;
                    }, this);
                    //lineGeo.vertices.pop();
                    // add first pt to close shape
                    //lineGeo.vertices.push(new THREE.Vector3(sol_paths[0][0].X, sol_paths[0][0].Y, 0));

                    /*
                    var lineMat = new THREE.LineBasicMaterial({
                        color: that.colorDimension,
                        transparent: true,
                        opacity: 0.5
                    });
                    var lines = new THREE.Line(lineGeo, lineMat);
                    */
                    //this.sceneAdd(lines);

                    //var holeGeo = new THREE.Geometry();
                    var hole = new THREE.Path();
                    // console.log("about to calc holes. meshHoleArr:", meshHoleArr);

                    if (meshHoleArr.length > 0) {
                        var sol_paths = this.getUnionOfClipperPaths([meshHoleArr]);
                        //console.log("unionized mesh pts for meshHoleArr:", sol_paths);
                        var ptCtr = 0;
                        //var revArr = sol_paths[0].reverse();
                        sol_paths[0].forEach(function (pt) {
                            //holeGeo.vertices.push(new THREE.Vector3(pt.X, pt.Y, 0));
                            if (ptCtr == 0) hole.moveTo(pt.X, pt.Y);
                            else hole.lineTo(pt.X, pt.Y);
                            ptCtr++;
                        }, this);
                        shape.holes.push(hole);
                    }
                    //holeGeo.vertices.pop(); // remove last duplicate
                    // add first pt to close hole
                    //if (meshHoleArr.length > 0)
                    //    holeGeo.vertices.push(new THREE.Vector3(meshHoleArr[0].X, meshHoleArr[0].Y, 0));
                    //var holeLines = new THREE.Line(holeGeo, lineMat);
                    //this.sceneAdd(holeLines);

                    // create mesh version
                    var meshMat = new THREE.MeshBasicMaterial({
                        color: that.colorPad,
                        transparent: true,
                        opacity: 0.2,
                        side: THREE.DoubleSide,
                        depthWrite: false // so don't get rendering artifacts
                    });
                    //lineMat.side = THREE.DoubleSided;
                    //var holes = [];

                    /*
                    console.log("about to triangulate pad mesh - holes. pad:", lineGeo, "holes:", holeGeo);
                    var triangles = THREE.Shape.Utils.triangulateShape(lineGeo.vertices, [holeGeo.vertices]);
                    console.log("triangles after calculating pad and remove holes:", triangles);
                    for (var i = 0; i < triangles.length; i++) {

                        lineGeo.faces.push(new THREE.Face3(triangles[i][0], triangles[i][1], triangles[i][2]));

                    }
                    //lineGeo.faces.push( new THREE.Face3( 0, 1, 2 ) );
                    lineGeo.computeFaceNormals();
                    var mesh = new THREE.Mesh(lineGeo, meshMat);
                    */

                    // using shape instead
                    var geometry = new THREE.ShapeGeometry( shape );
                    //var material = new THREE.MeshBasicMaterial({color:0xffccff, side:2, overdraw:true} );
                    var mesh = new THREE.Mesh(geometry, meshMat );
                    
                    // we now have a mesh representation of this
                    // pad. let's save it for later use.
                    //console.log("done working on pad mesh:", mesh);
                    elem["threeObj"]["padsAsMesh"][group.userData.pad.name] = mesh;
                    mesh.userData["type"] = "pad";
                    mesh.userData["elem"] = group.userData.elem;
                    mesh.userData["pkg"] = group.userData.pkg;
                    mesh.userData["pad"] = group.userData.pad;
                    this.sceneAdd(mesh);
                    
                    // add that these get detected during
                    // mouseover
                    this.intersectObjects.push(mesh);

                    // push onto mondo object, which is sorted by signal name
                    // so we're pushing an smd into an alternate hierarchy
                    var ud = mesh.userData;
                    var signalKey = ud.elem.padSignals[ud.pad.name];
                    // add to mondo object
                    if (this.clipperBySignalKey[signalKey] === undefined)
                        this.clipperBySignalKey[signalKey] = {};
                    if (this.clipperBySignalKey[signalKey].pads === undefined)
                        this.clipperBySignalKey[signalKey].pads = [];
                    this.clipperBySignalKey[signalKey].pads.push({
                        clipper: clipperOuterPath,
                        pad: ud.pad,
                        threeObj: mesh,
                        threeObjPadGroup: padgroup
                    });
                    
                }, this);

                // draw temp union of padgroup
                temparr.forEach(function (d) {
                    this.clipperPads.push(d);
                }, this);
                /*
                console.log("padgroup temparr:", temparr);
                var sol_paths = this.getUnionOfClipperPaths(temparr);
                var infl_path = this.getInflatePath(sol_paths, 0.1);
                this.drawClipperPaths(infl_path, 0x00ffff, 1.0);
                */

                // so far wires in a pkg are for tPlace and tDocu, not
                // for milling, so not an important part to solve
                pkg.wires.forEach(function (wire) {
                    var layerNum = wire.layer;

                    if (elem.mirror) {
                        layerNum = this.eagle.mirrorLayer(layerNum);
                    }
                    if (layer.number != layerNum) {
                        return;
                    }
                    //console.log("pkg wire:", wire);

                    var x1 = elem.x + rotMat[0] * wire.x1 + rotMat[1] * wire.y1,
                        y1 = elem.y + rotMat[2] * wire.x1 + rotMat[3] * wire.y1,
                        x2 = elem.x + rotMat[0] * wire.x2 + rotMat[1] * wire.y2,
                        y2 = elem.y + rotMat[2] * wire.x2 + rotMat[3] * wire.y2;

                    var lineGeo = new THREE.Geometry();
                    lineGeo.vertices.push(new THREE.Vector3(x1, y1, 0));
                    lineGeo.vertices.push(new THREE.Vector3(x2, y2, 0));

                    // close it by connecting last point to 1st point
                    //lineGeo.vertices.push(new THREE.Vector3(x1, y1, 0));
                    if (!color) var color = 0xff0000;
                    var lineMat = new THREE.LineBasicMaterial({
                        color: color,
                        transparent: true,
                        opacity: 0.5
                    });
                    var line = new THREE.Line(lineGeo, lineMat);
                    that.sceneAdd(line);

                }, this);


                /*
                var smashed = elem.smashed,
                    textCollection = smashed ? elem.attributes : pkg.texts; //smashed : use element attributes instead of package texts
                for (var textIdx in textCollection) {
                    var text = textCollection[textIdx];
                    var layerNum = text.layer;
                    if ((!elem.smashed) && (elem.mirror)) { 
                        layerNum = this.mirrorLayer(layerNum); 
                    }
                    if (layer.number != layerNum) { continue; }
                    
                    var content = smashed ? null : text.content,
                        attribNameF = smashed ? text.name : ((text.content.indexOf('>') == 0) ? text.content.substring(1) : null);
                    if (attribName == "NAME")  { content = elem.name;  }
                    if (attribName == "VALUE") { content = elem.value; }
                    if (!content) { continue; }
                    
                    var x = smashed ? text.x : (elem.x + rotMat[0]*text.x + rotMat[1]*text.y),
                        y = smashed ? text.y : (elem.y + rotMat[2]*text.x + rotMat[3]*text.y),
                        rot = smashed ? text.rot : elem.rot,
                        size = text.size;
                    
                    //rotation from 90.1 to 270 causes Eagle to draw labels 180 degrees rotated with top right anchor point
                    var degrees  = parseFloat(rot.substring((rot.indexOf('M')==0) ? 2 : 1)),
                        flipText = ((degrees > 90) && (degrees <=270)),
                        textRot  = this.matrixForRot(rot),
                        fontSize = 10;
                    
                    ctx.save();
                    ctx.fillStyle = color;
                    ctx.font = ''+fontSize+'pt vector'; //Use a regular font size - very small sizes seem to mess up spacing / kerning
                    ctx.translate(x,y);
                    ctx.transform(textRot[0],textRot[2],textRot[1],textRot[3],0,0);
                    var scale = size / fontSize;
                    ctx.scale(scale,-scale);
                    if (flipText) {
                        var metrics = ctx.measureText(content);
                        ctx.translate(metrics.width,-fontSize); //Height is not calculated - we'll use the font's 10pt size and hope it fits
                        ctx.scale(-1,-1);
                    }
                    ctx.fillText(content, 0, 0);
                    ctx.restore();
                }
                */
            }
            console.log("final list of clipper elements:", this.clipperElements);
            console.log("this.eagle.elements with all threeObjs and clipperPaths", this.eagle.elements);
            console.log("this.clipperBySignalKey", this.clipperBySignalKey);

            console.groupEnd();
        },
        // Rotate an object around an arbitrary axis in object space
        rotObjectMatrix: null,
        rotateAroundObjectAxis: function (object, axis, radians) {
            rotObjectMatrix = new THREE.Matrix4();
            rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

            // old code for Three.JS pre r54:
            // object.matrix.multiplySelf(rotObjectMatrix);      // post-multiply
            // new code for Three.JS r55+:
            object.matrix.multiply(rotObjectMatrix);

            // old code for Three.js pre r49:
            // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
            // old code for Three.js r50-r58:
            // object.rotation.setEulerFromRotationMatrix(object.matrix);
            // new code for Three.js r59+:
            object.rotation.setFromRotationMatrix(object.matrix);
        },

        rotWorldMatrix: null,
        // Rotate an object around an arbitrary axis in world space       
        rotateAroundWorldAxis: function (object, axis, radians) {
            rotWorldMatrix = new THREE.Matrix4();
            rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

            // old code for Three.JS pre r54:
            //  rotWorldMatrix.multiply(object.matrix);
            // new code for Three.JS r55+:
            rotWorldMatrix.multiply(object.matrix); // pre-multiply

            object.matrix = rotWorldMatrix;

            // old code for Three.js pre r49:
            // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
            // old code for Three.js pre r59:
            // object.rotation.setEulerFromRotationMatrix(object.matrix);
            // code for r59+:
            object.rotation.setFromRotationMatrix(object.matrix);
        },
        drawCircle: function (x, y, radius, color){
            // draw a hole
            var segments = 32,
                material = new THREE.LineBasicMaterial( { color: color } ),
                geometry = new THREE.CircleGeometry( radius, segments );
            // Remove center vertex
            geometry.vertices.shift();

            var circle = new THREE.Line( geometry, material );
            circle.position.set(x, y, 0);

            return circle;
        },
        drawSphere: function (x, y, radius, color){
            console.log("Sqhere position and color: ", x, y, color);
            var segments = 16;
            var material = new THREE.MeshBasicMaterial( { 
                     color: color,
                     wireframe : false,
                     transparent: true,
                     opacity: 0.5
                  } ),
                geometry = new THREE.SphereGeometry( radius, segments, segments, 0, Math.PI*2, 0, Math.PI/2); // HalfSphere
             
            var mesh = new THREE.Mesh( geometry, material ) ;
            mesh.position.set(x, y, 0);
            mesh.rotateX(Math.PI / 2); // 90 degrees
            return mesh;
        },
        drawSquare: function (x1, y1, x2, y2) {

            var square = new THREE.Geometry();

            //set 4 points
            square.vertices.push(new THREE.Vector3(x1, y2, 0));
            square.vertices.push(new THREE.Vector3(x1, y1, 0));
            square.vertices.push(new THREE.Vector3(x2, y1, 0));
            square.vertices.push(new THREE.Vector3(x2, y2, 0));

            //push 1 triangle
            square.faces.push(new THREE.Face3(0, 1, 2));

            //push another triangle
            square.faces.push(new THREE.Face3(0, 3, 2));

            //return the square object with BOTH faces
            return square;
        },
        mySceneGroup: null,
        sceneReAddMySceneGroup: function() {
            if (this.obj3d && this.mySceneGroup) {
                this.obj3d.add(this.mySceneGroup);
            }
            this.obj3dmeta.widget.wakeAnimate();
        },
        sceneRemoveMySceneGroup: function() {
            if (this.obj3d && this.mySceneGroup) {
                this.obj3d.remove(this.mySceneGroup);
            }
            this.obj3dmeta.widget.wakeAnimate();
        },
        sceneAdd: function (obj) {
            //chilipeppr.publish("/com-chilipeppr-widget-3dviewer/sceneadd", obj);
            
            // this method of adding puts us in the object that contains rendered Gcode
            // that's one option, but when we send gcode to workspace we get overwritten
            // then
            //this.obj3d.add(obj);
            
            // let's add our Eagle BRD content outside the scope of the Gcode content
            // so that we have it stay while the Gcode 3D Viewer still functions
            if (this.mySceneGroup == null) {
                this.mySceneGroup = new THREE.Group();
                this.obj3d.add(this.mySceneGroup);
            }
            this.mySceneGroup.add(obj);
            //this.obj3dmeta.scene.add(obj);
            
            this.obj3dmeta.widget.wakeAnimate();
        },
        sceneRemove: function (obj) {
            //chilipeppr.publish("/com-chilipeppr-widget-3dviewer/sceneremove", obj);
            //this.obj3d.remove(obj);
            //this.obj3dmeta.scene.remove(obj);
            if (this.mySceneGroup != null)
                this.mySceneGroup.remove(obj);
            this.obj3dmeta.widget.wakeAnimate();
        },
        draw: function (e) {
            this.eagle.draw();
        },
        
        
        
        mostRecentSTL: null,
        onDropped: function (data, info) {
            console.log("onDropped. len of file:", data.length, "info:", info);
            // we have the data
            // double check it's a board file, cuz it could be gcode
            /*
            if (data.match(/<!DOCTYPE eagle SYSTEM "eagle.dtd">/i)) {

                // check that there's a board tag
                if (data.match(/<board>/i)) {
                    console.log("we have an eagle board file!");

                    localStorage.setItem('com-chilipeppr-widget-eagle-lastDropped', data);
                    localStorage.setItem('com-chilipeppr-widget-eagle-lastDropped-info', JSON.stringify(info));
                    this.fileInfo = info;
                    console.log("saved brd file to localstorage");
                    this.open(data, info);
                } else {
                    console.log("looks like it is an eagle generated file, but not a board file. sad.");
                    chilipeppr.publish('/com-chilipeppr-elem-flashmsg/flashmsg', "Looks like you dragged in an Eagle CAD file, but it contains no board tag. You may have dragged in a schematic instead. Please retry with a valid board file.");
                }

                // now, we need to return false so no other widgets see this
                // drag/drop event because they won't know how to handle
                // an Eagle Brd file
                return false;
            } else {
                if (info.name.match(/.brd$/i)) {
                    // this looks like an Eagle brd file, but it's binary
                    chilipeppr.publish('/com-chilipeppr-elem-flashmsg/flashmsg', "Error Loading Eagle BRD File", "Looks like you dragged in an Eagle BRD file, but it seems to be in binary. You can open this file in Eagle and then re-save it to a new file to create a text version of your Eagle BRD file.", 15 * 1000);
                    return false;
                } else {
                    console.log("we do not have an eagle board file. sad.");
                }
            }*/
            if (info.name.match(/.stl$/i)) {
                //this.loadStlModel (data);
                if (this.mostRecentSTL == null) {
                    this.mostRecentSTL = new THREE.Group();
                }
                //this.mostRecentSTL = this.parse_3d_file (info, data);
                var vf_data;
                vf_data = this.parse_3d_file (info, data);
                
                var material=new THREE.MeshLambertMaterial({color:0x909090, overdraw: 1, wireframe: false, shading:THREE.FlatShading, vertexColors: THREE.FaceColors});
                
                var geo=new THREE.Geometry;
				geo.vertices=vf_data.vertices;
				geo.faces=vf_data.faces;				
				geo.computeBoundingBox();
					
				geo.computeCentroids();
				geo.computeFaceNormals();
				geo.computeVertexNormals();
				THREE.GeometryUtils.center(geo);
				var mesh = new THREE.Mesh(geo, material);

                
                this.sceneAdd (mesh);
            }
            else {
                return false;
            }
        },
        onDragOver: function () {
            console.log("onDragOver");
            $('#com-chilipeppr-widget-eagle').addClass("panel-primary");
        },
        onDragLeave: function () {
            console.log("onDragLeave");
            $('#com-chilipeppr-widget-eagle').removeClass("panel-primary");
        },
        isVidLoaded: false,
        lazyLoadTutorial: function () {
            // lazy load tutorial tab youtube vid
            //var isVidLoaded = false;
            var that = this;
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                //e.target // activated tab
                console.log("tab activated. e.target:", $(e.target));
                if ($(e.target).text() == 'Tutorial') {
                    // lazy load
                    console.log("we are on tutorial tab");
                    if (!that.isVidLoaded) {
                        console.log("lazy loading vid cuz not loaded");
                        that.isVidLoaded = true;
                        $('#eagle-tutorial').html('<iframe style="width:100%;" class="" src="//www.youtube.com/embed/T2h7hagVfnA" frameborder="0" allowfullscreen></iframe>');
                    }
                }
                //e.relatedTarget // previous tab
            })

        },
        options: null,
        setupUiFromLocalStorage: function () {
            // read vals from cookies
            var options = localStorage.getItem('com-chilipeppr-widget-eagle-options');

            if (options) {
                options = $.parseJSON(options);
                console.log("just evaled options: ", options);
            } else {
                options = {
                    showBody: true,
                    port: null,
                    z: 1.0
                };
            }

            this.options = options;
            console.log("options:", options);

            // show/hide body
            if (options.showBody) {
                this.showBody();
            } else {
                this.hideBody();
            }

        },
        saveOptionsLocalStorage: function () {
            //var options = {
            //    showBody: this.options.showBody
            //};
            var options = this.options;

            var optionsStr = JSON.stringify(options);
            console.log("saving options:", options, "json.stringify:", optionsStr);
            // store cookie
            localStorage.setItem('com-chilipeppr-widget-eagle-options', optionsStr);
        },
        showBody: function (evt) {
            $('#com-chilipeppr-widget-eagle .panel-body').removeClass('hidden');
            //$('#com-chilipeppr-widget-eagle .panel-footer').removeClass('hidden');
            $('#com-chilipeppr-widget-eagle .hidebody span').addClass('glyphicon-chevron-up');
            $('#com-chilipeppr-widget-eagle .hidebody span').removeClass('glyphicon-chevron-down');
            if (!(evt == null)) {
                this.options.showBody = true;
                this.saveOptionsLocalStorage();
            }
            $(window).trigger('resize');
        },
        hideBody: function (evt) {
            $('#com-chilipeppr-widget-eagle .panel-body').addClass('hidden');
            //$('#com-chilipeppr-widget-eagle .panel-footer').addClass('hidden');
            $('#com-chilipeppr-widget-eagle .hidebody span').removeClass('glyphicon-chevron-up');
            $('#com-chilipeppr-widget-eagle .hidebody span').addClass('glyphicon-chevron-down');
            if (!(evt == null)) {
                this.options.showBody = false;
                this.saveOptionsLocalStorage();
            }
            $(window).trigger('resize');
        },
        btnSetup: function () {

            // chevron hide body
            var that = this;
            $('#com-chilipeppr-widget-eagle .hidebody').click(function (evt) {
                console.log("hide/unhide body");
                if ($('#com-chilipeppr-widget-eagle .panel-body').hasClass('hidden')) {
                    // it's hidden, unhide
                    that.showBody(evt);
                } else {
                    // hide
                    that.hideBody(evt);
                }
            });

            $('#com-chilipeppr-widget-eagle .btn-toolbar .btn').popover({
                delay: 500,
                animation: true,
                placement: "auto",
                trigger: "hover",
                container: 'body'
            });

            // refresh btn
            $('#com-chilipeppr-widget-eagle .btn-refresh').click(this.onRefresh.bind(this));
            
        },
        statusEl: null, // cache the status element in DOM
        status: function (txt) {
            console.log("status. txt:", txt);
            if (this.statusEl == null) this.statusEl = $('#com-chilipeppr-widget-eagle-status');
            var len = this.statusEl.val().length;
            if (len > 30000) {
                console.log("truncating status area text");
                this.statusEl.val(this.statusEl.val().substring(len - 5000));
            }
            this.statusEl.val(this.statusEl.val() + txt + "\n");
            this.statusEl.scrollTop(
            this.statusEl[0].scrollHeight - this.statusEl.height());
        },
        forkSetup: function () {
            var topCssSelector = '#com-chilipeppr-widget-eagle';

            $(topCssSelector + ' .panel-title').popover({
                title: this.name,
                content: this.desc,
                html: true,
                delay: 200,
                animation: true,
                trigger: 'hover',
                placement: 'auto'
            });

            var that = this;
            chilipeppr.load("http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/", function () {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function (pubsubviewer) {
                    pubsubviewer.attachTo($('#com-chilipeppr-widget-eagle .panel-heading .dropdown-menu'), that);
                });
            });

        },
    }
});