#version 300 es
precision mediump float;

in vec3 VertexPosition;
in vec3 VertexVelocity;
in float VertexStartTime;
in vec3 VertexInitialVelocity;

out vec3 Position;
out vec3 Velocity;
out float StartTime;

uniform float Time;
uniform float H;
uniform vec3 Accel;
uniform float ParticleLifetime;

void main( ) 
{
	// Update position & velocity for next frame
    Position = VertexPosition;
    Velocity = VertexVelocity;
    StartTime = VertexStartTime;

    if( Time >= StartTime )
    {
        float age = Time - StartTime;

        //if( age > ParticleLifetime )
        //{
            // The particle is past it's lifetime, recycle.
            Position = vec3(0.0);
            Velocity = VertexInitialVelocity;
            StartTime = Time;
        /*} else
        {
            // The particle is alive, update.
            Position += Velocity * H;
            Velocity += Accel * H;
        }*/
    }
}