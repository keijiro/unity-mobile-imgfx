Shader "Custom/UnlitUntextured" {
	Properties {
		_Color ("Color (RGB)", Color) = (1, 1, 1, 1)
	}

	CGINCLUDE
    
    #include "UnityCG.cginc"

	struct appdata {
		float4 vertex : POSITION;
	};

    struct v2f {
    	float4 pos : POSITION;
    };

    fixed4 _Color;

    v2f vert(appdata v) {
    	v2f o;
    	o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
    	return o;
    }

    fixed4 frag(v2f i) : COLOR {
    	return _Color;
    }
    
    ENDCG
    
    SubShader {
    	ZTest LEqual
    	ZWrite on
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
