#pragma strict

var speed : float = 6.0;
var jumpSpeed : float = 8.0;
var gravity : float = 20.0;
var turnSpeed : float = 800.0;

private var moveDirection : Vector3;
private var velocity : Vector3;

function Update() {
	var controller : CharacterController = GetComponent(CharacterController);
    if (controller.isGrounded) {
        moveDirection = Vector3.right * (Input.GetAxis("Horizontal") + GetVirtualAxis());
        velocity = moveDirection * speed;

        if (Input.GetButton("Jump") || GetVirtualButton()) {
            velocity.y = jumpSpeed;
        }
    }

    velocity.y -= gravity * Time.deltaTime;

    controller.Move(velocity * Time.deltaTime);
    
    if (moveDirection.sqrMagnitude > 0.1) {
		var lookRotation = Quaternion.LookRotation(moveDirection);
	    transform.rotation = Quaternion.RotateTowards(transform.rotation, lookRotation, turnSpeed * Time.deltaTime);
    }
}

private function GetVirtualAxis() : float {
	if (Input.GetMouseButton(0)) {
		var x = Input.mousePosition.x;
		if (x < Screen.width * 0.3) return -1.0;
		if (x > Screen.width * 0.7) return 1.0;
	}
	return 0.0;
}

private function GetVirtualButton() : boolean {
	if (Input.GetMouseButton(0)) {
		var y = Input.mousePosition.y;
		if (y > Screen.height * 0.5) return true;
	}
	return false;
}