Shader "Custom FX/MulAdd" {
	Properties {
		_MainTex ("Blend Buffer", 2D) = "" {}
	}

    CGINCLUDE

    #include "UnityCG.cginc"

	struct v2f {
		float4 pos : POSITION;
		half2 uv[2] : TEXCOORD0;
	};

    sampler2D _MainTex;
    sampler2D _ColorBuffer;
    fixed intensity;

    v2f vert(appdata_img v) {
        v2f o;
        o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
        o.uv[0] = v.texcoord;
		o.uv[1] = v.texcoord;
        return o;
    }

    fixed4 frag(v2f i) : COLOR {
        return tex2D(_MainTex, i.uv[0]) * intensity + tex2D(_ColorBuffer, i.uv[1]);
    }

    ENDCG

    SubShader {
        ZTest Always
        Cull Off
        ZWrite Off
        Fog { Mode off }  

        Pass {
            CGPROGRAM
            #pragma fragmentoption ARB_precision_hint_fastest
            #pragma vertex vert
            #pragma fragment frag
            ENDCG
        }
    } 
    FallBack off
}
