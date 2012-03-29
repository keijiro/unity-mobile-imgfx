#pragma strict

var smoothTime : float = 0.3;

private var target : GameObject;
private var velocity : Vector3;

function Start() {
	target = GameObject.FindWithTag("Player");
}

function Update() {
	transform.position = Vector3.SmoothDamp(transform.position, target.transform.position, velocity, smoothTime);
}