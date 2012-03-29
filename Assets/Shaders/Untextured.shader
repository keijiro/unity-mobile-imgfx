Shader "Custom/Untextured" {
	Properties {
		_Color("Color (RGBA)", COLOR) = (1, 1, 1, 1)
	}
	SubShader {
		Tags { "RenderType"="Opaque" }
		LOD 200
		
		CGPROGRAM
		#pragma surface surf Lambert

		struct Input {
			float2 uv_MainTex;
		};
		
		fixed4 _Color;

		void surf (Input IN, inout SurfaceOutput o) {
			o.Albedo = _Color.rgb;
			o.Alpha = _Color.a;
		}
		ENDCG
	} 
	FallBack "Diffuse"
}
