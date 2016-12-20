//var THREE : any;

import {Component, Inject, Injectable} from '@angular/core';
import '../../public/lib/three.js';
import '../../public/lib/dat.gui.min.js'
import '../../public/lib/OrbitControls.js'

@Injectable()
export class WebGLService {
    // generate the web gl canvas and set up camera
    public scene : any;
    public renderer : any;
    public camera : any;
    public spinSpeed : any;
    public onDown : boolean;
    public prevFog : boolean;
    public meshes : any[];
	public onDissolve : boolean;
	private lastDissolvePoint : Date;
	private dissolveCounter : number;
	public hasDissolved :  boolean = false;

    constructor(){
            // create canvas
            
        }

    public generateNewScene(){
        if(!this.scene){
			this.onDissolve = false;
			this.hasDissolved = false;
            return this.createScene();
        }else{
            return false;
        }
                
    }

	public checkDissolved(){
		return this.hasDissolved;
	}
    private createScene(){
            // bootstrap the canvas and create a big scene for everyone to see
			this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 100 );
			this.camera.position.z = 30;
			this.renderer = new THREE.WebGLRenderer( { antialias: true } );
			
			this.renderer.setPixelRatio( window.devicePixelRatio );
			this.renderer.setSize( window.innerWidth/1.1, window.innerHeight/1.1);
			this.renderer.setClearColor( 0x111111 );
			//document.body.appendChild( this.renderer.domElement);
			document.getElementById('canvasSpace').appendChild( this.renderer.domElement);
			let orbit = new THREE.OrbitControls( this.camera, this.renderer.domElement );
			orbit.enableZoom = true;

			let ambientLight = new THREE.AmbientLight( 0x111111 );
			this.scene.background = new THREE.Color( 0xffffff );
			this.scene.add( ambientLight );
 
			let lights = [];
			lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
			lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
			lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

			lights[ 0 ].position.set( 0, 200, 0 );
			lights[ 1 ].position.set( 100, 200, 100 );
			lights[ 2 ].position.set( - 100, - 200, - 100 );

			this.scene.add( lights[ 0 ] );
			this.scene.add( lights[ 1 ] );
			this.scene.add( lights[ 2 ] );
            return true;
    } 

	public dissolveObject(){
		if(!this.onDissolve){
			this.onDissolve = true;
			this.dissolveCounter = 0;
		}
	}

    public renderScene(){
        
        let render = () =>  {
            
            requestAnimationFrame( render );
			let time = Date.now() * 0.01;
			// arbitrary number of meshes we're creating here.
			// to do populate this from API call to make it more dynamic
			for(let meshCount=0; meshCount<4; meshCount++){
				// just for sphere geometry
				if(this.meshes[meshCount].name!='TextGeometry'){
				if(this.onDissolve){
			
					//this.meshes[meshCount]
					this.dissolveCounter ++;
					if(this.dissolveCounter > 100){
						this.onDissolve = false;
						var oldcanv = document.getElementById('canvasSpace').innerHTML = '';
						this.hasDissolved = true;
					}
					//
					this.meshes[meshCount].quaternion._w = parseFloat(this.meshes[meshCount].quaternion._w) / 1.2;
					this.meshes[meshCount].quaternion._x = parseFloat(this.meshes[meshCount].quaternion._x) / 1.05;
					this.meshes[meshCount].quaternion._y = parseFloat(this.meshes[meshCount].quaternion._y) / 1.05;
					this.meshes[meshCount].quaternion._z = parseFloat(this.meshes[meshCount].quaternion._z) / 1.05;
				}else{
					 
						this.meshes[meshCount].rotation.x += this.spinSpeed;
						this.meshes[meshCount].rotation.y += this.spinSpeed;
										
						//if(this.spinSpeed >0.048){
					//		this.onDown = true;
				//			}else{
				//				if(this.spinSpeed<0.005){
				//					this.onDown = false;
				//					}
				//				}
				//				if(this.onDown){
				//					this.spinSpeed -= 0.0003;
				//				}else{
				//					this.spinSpeed += 0.0003;
				//				}
					 
				}
				}

					
				
			}
						
			
			this.renderer.render( this.scene, this.camera );
        };
        render();
    }

}
