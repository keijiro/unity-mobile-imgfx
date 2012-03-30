Shader "Custom FX/Quarter Shrink And Threshold" {
    Properties {
        _MainTex ("Base (RGB)", 2D) = "" {}
    }

    CGINCLUDE

    #include "UnityCG.cginc"

    struct v2f {
        float4 pos : POSITION;
        half2 uv[4] : TEXCOORD0;
    };

    sampler2D _MainTex;
    half4 _MainTex_TexelSize;
    fixed threshold;
    fixed pullup;

    v2f vert(appdata_img v) {
        v2f o;
        o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
        o.uv[0] = v.texcoord + _MainTex_TexelSize;
		o.uv[1] = v.texcoord - _MainTex_TexelSize;	
		o.uv[2] = v.texcoord - _MainTex_TexelSize * half2(1, -1);	
		o.uv[3] = v.texcoord + _MainTex_TexelSize * half2(1, -1);	
        return o;
    }

    fixed4 frag(v2f i) : COLOR {
        fixed4 outColor;
        outColor  = tex2D(_MainTex, i.uv[0].xy) * 0.25;
        outColor += tex2D(_MainTex, i.uv[1].xy) * 0.25;
        outColor += tex2D(_MainTex, i.uv[2].xy) * 0.25;
        outColor += tex2D(_MainTex, i.uv[3].xy) * 0.25;
        return max(fixed4(0, 0, 0, 0), outColor - threshold) * pullup;
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
