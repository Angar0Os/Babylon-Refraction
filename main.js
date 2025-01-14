var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // Our built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    var sphere3 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("/textures/environment.dds", scene);
    var skybox = scene.createDefaultSkybox(hdrTexture, true, 10000);

    var probe = new BABYLON.ReflectionProbe("main", 512, scene);
    probe.renderList.push(sphere2);
    probe.renderList.push(sphere3);
    probe.renderList.push(skybox);

    // Move the sphere upward 1/2 its height

    sphere.material = new BABYLON.PBRMaterial('metal', scene);
    sphere.material.reflectionTexture = probe.cubeTexture;
    sphere.material.roughness = 0.25;
    sphere.material.metallic = 1.0;
    sphere.material.alpha = 0.1;
    sphere.material.realTimeFiltering = true;
    sphere.material.realTimeFilteringQuality = BABYLON.Constants.TEXTURE_FILTERING_QUALITY_HIGH;

    sphere2.position = new BABYLON.Vector3(0, -1, 1)
    sphere2.material = new BABYLON.PBRMaterial('metal', scene);
    sphere2.material.albedoColor = new BABYLON.Color3(0.8, 0.0, 0.3);
    sphere2.material.roughness = 0.1;
    sphere2.material.metallic = 0.0;

    sphere3.setPivotMatrix(BABYLON.Matrix.Translation(6, -2, 0), false);
    sphere3.material = new BABYLON.PBRMaterial('metal', scene);
    sphere3.material.roughness = 0.1;
    sphere3.material.metallic = 0.3;
    sphere3.material.albedoColor = new BABYLON.Color3(0.3, 0.0, 0.8);

    scene.debugLayer.show({ showExplorer: false });
    scene.debugLayer.select(sphere.material, "RENDERING");

    scene.registerBeforeRender(function () {
        sphere2.rotation.y += 0.01;
        sphere3.rotation.y += 0.01;
    });
    return scene;

};