# [Physics Experiment 1](https://dkallen78.github.io/physics-experiment-1/physics-exp-1.html)

I wanted to make a gravity simulation. I've been reading Neal Stephenson's Baroque
Cycle and the Isaac Newton character talking about celestial mechanics reminded me
of [another project](https://dkallen78.github.io/neo-finder/sentry/sentry.html) I
made that drew existing orbits with SVG ellipses. Ever since then I've had it in
the back of my mind to do a simulation.

This is all based on the equation for gravity based on Newton's work:

## F = G * ((m<sub>1</sub> * m<sub>2</sub>) / r²)

### F is the force exerted on the objects

In this simulation this is expressed as a change in velocity of one object, the
"sun" is fixed and doesn't move

### G is the gravitational constant which is 6.674 * 10<sup>-11</sup>

I changed this to 6.674 * 10<sup>-6</sup> because at the scale of my canvas the
changes in velocity were to minuscule to change even a pixel.

### m<sub>1</sub> and m<sub>2</sub> are the masses of the two objects

m<sub>1</sub> in this simulation is the orbiting body and it has a mass of 1, m<sub>2</sub>
is fixed in place and has a mass of 100,000,000.

### r is the distance between those objects.

## What's going on under the hood

### Temporal Resolution

10ms. Every 10ms it's crunching the same math to figure out where our pixel is headed
next.

### Objects/Celestial Bodies

My points in space have position, mass, and velocity. Basically I'm tracking where
they are and how fast they're going along the x and y axes.

### Action

1. Find the distance between the two objects.

To find the distance we need the Pythagorean Theorem: a<sup>2</sup> + b<sup>2</sup> =
c<sup>2</sup>. With some refactoring to solve for c we can find our distance:
`r = Math.sqrt(((obj1.x - obj2.x) ** 2) + ((obj1.y - obj2.y) ** 2));`

2. Find the attractive force between the objects.

We've got the values we need to find the force of gravity between our two objects,
we just need to plug in our numbers: `grav = G * ((obj1.mass * obj2.mass) / (r ** 2));`

3. Find the angle between the two objects.

I need to do this to calculate the velocity change (a.k.a. force) along the x and
y axes each cycle of the simulation. To do this we need 𝕋𝕣𝕚𝕘𝕠𝕟𝕠𝕞𝕖𝕥𝕣𝕪®. Since we know the relative x and y positions of the two objects we need to use JavaScript's `Math.atan();` function. `Math.atan(opposite/adjacent);` will give us the angle in radians between
our objects. In this case I used the y distance between the two objects for opposite
and the x distance for adjacent: `angle = Math.atan((obj1.y - obj2.y) / (obj1.x - obj2.x));`

4. Calculate the change in velocity along the x and y axes.

Based on step 2 we know the force (change in velocity this cycle) at which our object
is being propelled. Based on step 2 we know in which direction that propulsion should
be. Unfortunately, in a Cartesian system like Canvas we can only manipulate movement
either up and down or left and right. To convert our force at an angle to two forces
along the x and y axes we need more 𝕋𝕣𝕚𝕘𝕠𝕟𝕠𝕞𝕖𝕥𝕣𝕪®.
