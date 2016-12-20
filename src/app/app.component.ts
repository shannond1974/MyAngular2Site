import { Component, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ApiService } from './shared/api.service'
import { WebGLService } from './shared/webGL';
import { Mesh } from './graph/mesh';
import '../public/lib/three.js';
import '../public/lib/dat.gui.min.js'
import '../public/lib/OrbitControls.js'

@Component({
    selector: 'my-app',
    template: `
	 <div class="well">
		<div class="row text-center">
			<h2>{{title}}</h2>
		</div>
		<div class="row text-center" [hidden]="showIntroPage">
			<p>Some more text about front-end software development....</p>
			<h2><button (click)="enter()" class="btn btn-primary">Enter</button></h2>
		</div>
	  </div>
	  <div class="row text-center" [hidden]="!showIntroPage">
			<h3>Some text about being pragmatic...</h3>
			<img width="900" height="600" src="../img/maxresdefault.jpg"/>
		</div>
	  
    `,
	styles : [ ' .btn {radius:50%}']
})

// core app component
// you've been shannon'd
export class AppComponent {
    

	public WebGL : WebGLService;
	public api : ApiService;
	public returnObject;
	public contentObject;
	public handleError;
    public title = '';
	public pageContent: any;
	private last: MouseEvent;
	public showIntroPage : boolean = false;

    constructor(webgl: WebGLService , Api : ApiService){
        this.WebGL = webgl;
		this.api = Api;
		this.loadSiteContent();
		this.intialiaseScene();
    }

	loadSiteContent(){
		// load the content of the site and the immediate page
		this.api.getData('content.json').subscribe((res:Response) => {
            this.contentObject = res.json();
			this.title = this.contentObject.Site.Title;
			this.pageContent = this.contentObject.Site.Pages.Home;
        });
	}

	intialiaseScene(){
		try{
			if(this.WebGL.generateNewScene()){
					this.generateGraphObjects();
				}
		}catch(e){
			// webgl not enabled so move to regular site design

		}
		
	}

	generateGraphObjects(){
//      //  { "Structure" : "TextGeometry" , "xPos" : "-20", "yPos" : "20", "isSpinner" : "false", "spinSpeed": "", "size": "large" ,"params" :{} }

		let scene = this.WebGL.scene;
        let renderer = this.WebGL.renderer;
		let camera = this.WebGL.camera;
		let meshes = [];

		this.api.getData('stubby.json').subscribe((res:Response) => {
            this.returnObject = res.json();
			for(let webShape of this.returnObject.Structures){
				let meshObject = new Mesh();
				let mesh = meshObject.createMeshObject(scene, webShape.xPos, webShape.yPos, webShape.Structure, webShape.params, webShape.isSpinner);//
				
				mesh.fixed = !webShape.isSpinner;
				meshes.push(mesh);
				
			}
			console.log(meshes.length);
			this.completeRendering(camera, meshes, renderer);
			//this.WebGL.dissolveObject();
        });

		
	}

	enter(){
		
		this.WebGL.dissolveObject();
		while(!this.WebGL.checkDissolved){
			// wait
		}
		this.showIntroPage = true;

	}
	

	completeRendering(camera, meshes, renderer){
		// set up the renderer
		this.WebGL.meshes = meshes;	
		this.WebGL.prevFog = false;
		this.WebGL.spinSpeed  = 0.02;
		this.WebGL.onDown = false;
		
		// add the event listener
		window.addEventListener( 'resize', function () {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
			}, false 
		);
		
		

		// finally render the scene
		this.WebGL.renderScene();
	}

	extractData(res: Response) {
    	let body = res.json();
    	return body.data || { };
  	}


      
 }

