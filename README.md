# Weyl Trees
Drawings of Weyl Trees using [paper.js](http://paperjs.org/about/)

## Definition
A Weyl sequence is based on an irrational number α (such as π) and consists of the sequence of non-integral parts of the integer multiples of α. For instance, the 10 first members of a Weyl sequence based on π would
```
 3.1415926... -> 0.1415926...
 6.2831853... -> 0.2831853...
 9.4247779... -> 0.4247779...
12.5663706... -> 0.5663706...
15.7079633... -> 0.7079633...
18.8495559... -> 0.8495559...
21.9911486... -> 0.9911486...
25.1327412... -> 0.1327412...
28.2743339... -> 0.2743339...
31.4159265... -> 0.4159265...
```
A theorem by Weyl states that these numbers are equidistributed in the interval [0,1].

To generate a Weyl Tree, insert the members of such a sequence into a binary search tree and embed the latter onto the plane by putting the root in the middle of the canvas and drawing branches rectilinearly, switching between horizontal and vertical directions at each level and reducing the length of a branch by a factor of sqrt(2) at each level.

## Demo
Here's a [demo](https://nmutsanas.github.io/weyl-trees/)

## Credits
[Prof. Michel Dekking](http://dutiosc.twi.tudelft.nl/~dekking/) kindly provided information about his work on the subject.
