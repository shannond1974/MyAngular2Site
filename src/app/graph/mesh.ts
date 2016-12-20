// native js three.js libs
//var THREE : any;
//var chooseFromHash : any;

// create and manage the mesh objects
import '../../public/lib/three.js';
import '../../public/lib/dat.gui.min.js'
import '../../public/lib/OrbitControls.js'
import '../../public/lib/geometry.js'

export interface IMesh{
    meshParams: any;
    createMeshObject;
}

export class Mesh implements IMesh{

    meshParams: any;


    createMeshObject(scene:any, meshXPos:number, meshYPos:number, structure:string, params:any, isSpinner : boolean){
        // create a new mesh and add to the scene with x, y coordinates passed in
		let mesh : any; 
        mesh = new THREE.Object3D();
		mesh.name = structure;
		mesh.params = params;
		
        mesh.add( new THREE.LineSegments(
            new THREE.Geometry(),
            new THREE.LineBasicMaterial({
					color: 0xffffff,
					transparent: true,
					opacity: 0.5
				})
        ));

		mesh.add( new THREE.Mesh(
            new THREE.Geometry(),
            new THREE.MeshPhongMaterial({
				color: 0x156289,
				emissive: 0x072534,
				side: THREE.DoubleSide,
				shading: THREE.FlatShading
				})
        ));
	
		// to do refactor from geometry.js		
		let hasCreated = chooseFromHash(mesh, structure, params);
		mesh.position.setX(meshXPos);
        mesh.position.setY(meshYPos);
		 
		if(!isSpinner){
			mesh.fixed = true;
		}else{
			mesh.fixed = false;
		}

		
		//if(hasCreated.fixed) {
		//	mesh.fixed = true;
		//}else{
		//	mesh.fixed = false;
		//}
		scene.add( mesh );
		return mesh;
    }
} 