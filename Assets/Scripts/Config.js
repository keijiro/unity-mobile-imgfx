#pragma strict

private var timeStart : float;
private var fps : int;
private var count : int;

function Awake() {
    Application.targetFrameRate = 60.0;
}

function Update() {
    if (++count == 10) {
        fps = 10.0 / (Time.realtimeSinceStartup - timeStart);
        timeStart = Time.realtimeSinceStartup;
        count = 0;
    }
}

function OnGUI() {
    GUI.color = Color.black;
    GUILayout.Label(fps.ToString());
}
