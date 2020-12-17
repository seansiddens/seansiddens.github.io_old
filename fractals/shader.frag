#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_imagWindow;
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

    float aspectRatio = u_resolution.x / u_resolution.y;
    // screen coords mapped to imaginary plane
    vec2 imagCoords = vec2(map(st.x, 0.0, 1.0, -2.5, 1.0),
                           map(st.y, 0.0, 1.0, -(3.5 / aspectRatio / 2.0), 3.5 / aspectRatio / 2.0)); 

    // Imaginary coords transformed by scale and offset
    vec2 worldCoords = imagCoords / u_scale + vec2(map(u_offset.x, 0.0, u_resolution.x, -2.5, 1.0),
                                                   map(u_offset.y, 0.0, u_resolution.y, -(3.5 / aspectRatio / 2.0), 3.5 / aspectRatio / 2.0));

    return worldCoords;
}

float iterateMandelbrot() {
    vec2 c = screenToWorld();
    vec2 z = vec2(0.0);

    float threshold = 100.0;
    for (int i = 0; i < 100; i++) {
        z = squareImaginary(z) + c;
        if (length(z) > 2.0) return float(i) / threshold;
    }
    return 1.0;
}

void main () {
    float i = iterateMandelbrot();

    gl_FragColor = vec4(i, i, 1.0, 1.0);
}