#pragma strict

@CustomEditor(LightProbeGroup)
class CustomizedLightProbeGroupEditor extends Editor {
	private var dims : int[] = [8, 2, 8];

	function OnEnable() {
	}

	function OnInspectorGUI() {
		EditorGUILayout.LabelField("Grid dimensions:");
		dims[0] = EditorGUILayout.IntField("X", dims[0]);
		dims[1] = EditorGUILayout.IntField("Y", dims[1]);
		dims[2] = EditorGUILayout.IntField("Z", dims[2]);

		if (GUILayout.Button("Replace probes")) {
			var positions : Vector3[] = new Vector3[dims[0] * dims[1] * dims[2]];
			var i = 0;
			for (var xc = 0; xc < dims[0]; ++xc) {
				var x = 1.0 * xc / (dims[0] - 1);
				for (var yc = 0; yc < dims[1]; ++yc) {
					var y = 1.0 * yc / (dims[1] - 1);
					for (var zc = 0; zc < dims[2]; ++zc) {
						var z = 1.0 * zc / (dims[2] - 1);
						positions[i++] = Vector3(x, y, z);
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
