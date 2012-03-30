#pragma strict

@script ExecuteInEditMode

public var spread = 3.0;
public var intensity = 1.0;
public var threshold = 0.5;

public var shrinkShader : Shader;
private var shrinkMaterial : Material;

public var blurShader : Shader;
private var blurMaterial : Material;

public var blendShader : Shader;
private var blendMaterial : Material;

private function CheckMaterial(shader : Shader, material : Material) : Material {
    if (material == null || material.shader != shader) {
        material = new Material(shader);
        material.hideFlags = HideFlags.DontSave;
    }
    return material;
}

function OnRenderImage(source : RenderTexture, destination : RenderTexture) {
    // Initialize the materials.
    shrinkMaterial = CheckMaterial(shrinkShader, shrinkMaterial);
    blurMaterial = CheckMaterial(blurShader,blurMaterial);
    blendMaterial = CheckMaterial(blendShader, blendMaterial);
    // Create quarter sized blend buffers.
    var quarterBuffer1 = RenderTexture.GetTemporary(source.width / 4, source.height / 4);
    var quarterBuffer2 = RenderTexture.GetTemporary(source.width / 4, source.height / 4);
    // Downsampling and thresholding.
    shrinkMaterial.SetFloat("threshold", threshold);
    shrinkMaterial.SetFloat("pullup", 1.0 / (1.0 - threshold));
    Graphics.Blit(source, quarterBuffer1, shrinkMaterial);
    // Blurring.
    var offset = spread / 100.0;
    blurMaterial.SetVector("offset", Vector4(0.0f, offset, 0.0f, 0.0f));
    Graphics.Blit(quarterBuffer1, quarterBuffer2, blurMaterial);
    blurMaterial.SetVector("offset", Vector4(offset, 0.0f, 0.0f, 0.0f));
    Graphics.Blit(quarterBuffer2, quarterBuffer1, blurMaterial);
    blurMaterial.SetVector("offset", Vector4(0.0f, offset, 0.0f, 0.0f));
    Graphics.Blit(quarterBuffer1, quarterBuffer2, blurMaterial);
    blurMaterial.SetVector("offset", Vector4(offset, 0.0f, 0.0f, 0.0f));
    Graphics.Blit(quarterBuffer2, quarterBuffer1, blurMaterial);
    // Blending.
    blendMaterial.SetFloat("intensity", intensity);
    blendMaterial.SetTexture("_ColorBuffer", source);
    Graphics.Blit(quarterBuffer1, destination, blendMaterial);
    // Cleaning up.
    RenderTexture.ReleaseTemporary(quarterBuffer1);
    RenderTexture.ReleaseTemporary(quarterBuffer2);
}
