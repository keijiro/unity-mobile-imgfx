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
        moveDirection = Vector3.right * Input.GetAxis("Horizontal");
        velocity = moveDirection * speed;

        if (Input.GetButton ("Jump")) {
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
