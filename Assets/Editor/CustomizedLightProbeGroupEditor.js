#pragma strict

@CustomEditor(LightProbeGroup)
class CustomizedLightProbeGroupEditor extends Editor {
	private var xCount : int;
	private var yCount : int;
	private var zCount : int;

	function OnEnable() {
		xCount = 8;
		yCount = 2;
		zCount = 8;
	}

	function OnInspectorGUI() {
		xCount = EditorGUILayout.IntField("Number of probes (X)", xCount);
		yCount = EditorGUILayout.IntField("Number of probes (Y)", yCount);
		zCount = EditorGUILayout.IntField("Number of probes (Z)", zCount);

		if (GUILayout.Button("Recreate Probes")) {
			var positions : Vector3[] = new Vector3[xCount * yCount * zCount];
			var i = 0;
			for (var x = 0; x < xCount; ++x) {
				for (var y = 0; y < yCount; ++y) {
					for (var z = 0; z < zCount; ++z) {
						positions[(z * yCount + y) * xCount + x] = Vector3(1.0 * x / (xCount - 1), 1.0 * y / (yCount - 1), 1.0 * z / (zCount - 1));
					}
				}
			}
			(target as LightProbeGroup).probePositions = positions;
		}
	}

	function OnSceneGUI() {
		var group = target as LightProbeGroup;
		for (var position in group.probePositions) {
			Handles.DotCap(0, group.transform.TransformPoint(position), Quaternion.identity, 0.1);
		}
	}
}
