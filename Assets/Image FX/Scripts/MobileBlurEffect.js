#pragma strict

@script ExecuteInEditMode
            
public var spread = 3.0;
public var iteration = 2;

public var blurShader : Shader;
private var blurMaterial : Material;

private function CheckMaterial(shader : Shader, material : Material) : Material {
    if (material == null || material.shader != shader) {
        material = new Material(shader);
        material.hideFlags = HideFlags.DontSave;
    }
    return material;
}

function OnRenderImage(source : RenderTexture, destination : RenderTexture) {
    blurMaterial = CheckMaterial(blurShader,blurMaterial);
    // Create quarter sized blend buffers.
    var quarterBuffer1 = RenderTexture.GetTemporary(source.width, source.height);
    var quarterBuffer2 = RenderTexture.GetTemporary(source.width, source.height);
    // Blurring.
    var offset = spread / 100.0;
    blurMaterial.SetVector("offset", Vector4(0.0f, offset, 0.0f, 0.0f));
    Graphics.Blit(source, quarterBuffer1, blurMaterial);
    for (var i = 0; i < iteration - 1; i++) {
        blurMaterial.SetVector("offset", Vector4(offset, 0.0f, 0.0f, 0.0f));
        Graphics.Blit(quarterBuffer1, quarterBuffer2, blurMaterial);
        blurMaterial.SetVector("offset", Vector4(0.0f, offset, 0.0f, 0.0f));
        Graphics.Blit(quarterBuffer2, quarterBuffer1, blurMaterial);
    }
    blurMaterial.SetVector("offset", Vector4(offset, 0.0f, 0.0f, 0.0f));
    Graphics.Blit(quarterBuffer1, destination, blurMaterial);
    // Cleaning up.
    RenderTexture.ReleaseTemporary(quarterBuffer1);
    RenderTexture.ReleaseTemporary(quarterBuffer2);
}
