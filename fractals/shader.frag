#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_offset;
uniform vec2 u_scale;
                          
vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

vec2 squareImaginary(vec2 n) {
    return vec2((n.x * n.x) - (n.y * n.y), 2.0 * n.x * n.y);
}

float map(float value, float inMin, float inMax, float outMin, float outMax) {
    return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

vec2 screenToWorld() {
    vec2 st = gl_FragCoord.xy / 2.0 / u_resolution; // screen coords

    vec2 worldCoords = st / u_scale + u_offset;
    return worldCoords;
}

float iterateMandelbrot() {
    vec2 c = screenToWorld();
    vec2 z = vec2(0.0);

    float threshold = 100.0;
    for (int i = 0; i < 100; i++) {
        z = squareImaginary(z) + c;
        if (length(z) > 2.0) {
            return float(i) / threshold;

        }
    }
    return 1.0;
}

void main () {
    float i = iterateMandelbrot();
    if (i == 1.0) {
        gl_FragColor = vec4(vec3(0.0), 1.0);
    }
    else {
        gl_FragColor = vec4(vec3(i), 1.0);
    }
}