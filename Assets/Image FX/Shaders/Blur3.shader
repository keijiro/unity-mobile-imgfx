Shader "Custom FX/Blur3" {
	Properties {
		_MainTex ("Blur Source", 2D) = "" {}
	}

    CGINCLUDE

    #include "UnityCG.cginc"

	struct v2f {
		float4 pos : POSITION;
		half2 uv0 : TEXCOORD0;
		half4 uv1 : TEXCOORD1;
		half4 uv2 : TEXCOORD2;
		half4 uv3 : TEXCOORD3;
	};

    sampler2D _MainTex;
    half4 offset;

    v2f vert(appdata_img v) {
        v2f o;
        o.pos = mul(UNITY_MATRIX_MVP, v.vertex);

        o.uv0 = v.texcoord;
        o.uv1 = v.texcoord.xyxy + offset.xyxy * half4(1, 1, -1, -1);
        o.uv2 = v.texcoord.xyxy + offset.xyxy * half4(2, 2, -2, -2);
        o.uv3 = v.texcoord.xyxy + offset.xyxy * half4(3, 3, -3, -3);

        return o;
    }

    fixed4 frag(v2f i) : COLOR {
        fixed4 color = 0.310 * tex2D(_MainTex, i.uv0);

        color += 0.206 * tex2D(_MainTex, i.uv1.xy);
        color += 0.206 * tex2D(_MainTex, i.uv1.zw);

        color += 0.103 * tex2D(_MainTex, i.uv2.xy);
        color += 0.103 * tex2D(_MainTex, i.uv2.zw);

        color += 0.034 * tex2D(_MainTex, i.uv3.xy);
        color += 0.034 * tex2D(_MainTex, i.uv3.zw);

        return color;
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
