//ROUND TO ZERO: fromAngle, rotate2D
//issues if magnitude is less than 1: normalize, limit, setMag
//Some static are also implemented as instance unnecessarily

class Vector {

    //CONSTRUCTORS
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static fromAngle(angle, mag=1) {
        let vec = new Vector();
        vec.x = Math.cos(angle);
        vec.y = Math.sin(angle);
        vec.setMag(mag);
        return vec;
    }
    static random2D(mag=1) {
        return Vector.fromAngle(Math.random() * (Math.PI*2), mag);
    }
    static random3D = function (mag=1) {
        var angle = Math.random() * 365;
        var vz = Math.random() * 2 - 1;
        var mult = Math.sqrt(mag*mag - vz * vz);
        var vx = mult * Math.cos(angle);
        var vy = mult * Math.sin(angle);
        v = new Vector(vx, vy, vz);
        return v;
    }
    
    // INSTANCE METHODS
    copy() {
        return new Vector(this.x, this.y, this.z);
    }
    // ARITHMETIC
    add(x, y , z = 0) {
        if (arguments.length === 1&&typeof x === "object") {
            this.x += x.x;
            this.y += x.y;
            this.z += x.z;
        } else if (arguments.length > 1) {
            this.x += x;
            this.y += y;
            this.z += z;
        }else{
            console.error(`Vector Error\n1. Pass in a vector\n2. Pass in (x,y,z=0)`);
        }
    }
    sub(x, y, z = 0) {
        if (arguments.length === 1&&typeof x === "object") {
            this.x -= x.x;
            this.y -= x.y;
            this.z -= x.z;
        } else if (arguments.length > 1) {
            this.x -= x;
            this.y -= y;
            this.z -= z;
        }else{
            console.error(`Vector Error\n1. Pass in a vector\n2. Pass in (x,y,z=0)`);
        }
    }
    mult(n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
    }
    div(n) {
        this.x /= n;
        this.y /= n;
        this.z /= n;
    }

    dot(x, y, z=0) {
        if (arguments.length === 1) {
            return this.x * x.x + this.y * x.y + this.z * x.z;
        }
        return this.x * x + this.y * y + this.z * z;
    }
    cross(v) {
        return new Vector(this.y * v.z - v.y * this.z, this.z * v.x - v.z * this.x, this.x * v.y - v.x * this.y);
    }

    //SET PROPERTIES
    normalize() {
        var m = this.mag();
        if (m !== 0) {//m>0
            this.div(m);
        }
    }
    limit(max) {
        if (this.mag() > max) {
            this.normalize();
            this.mult(max);
        }
        if(max<1){
            console.warn(`Your maximum value is less than one, so normalizing and then multiplying to max won't work`)
        }
    }
    set(x, y, z=0) {
        switch (typeof x) {
            case "object":
                this.x = x.x;
                this.y = x.y;
                this.z = x.z;
            break;
            case "number":
                this.x = x;
                this.y = y;
                this.z = z;
            break;
        }
    }

    setMag(mag) {
        this.normalize();
        this.mult(mag);
        if(mag<1){//might be able to fix with normalizing, then div with x
            console.warn("Trying to set to magnitude less than one");
        }
    }
    rotate2D(theta) {
        let angle = Math.atan2(this.y, this.x);
        this.x = Math.cos(theta*this.x) - Math.sin(theta*this.y);
        this.y = Math.sin(theta*this.x) + Math.cos(theta*this.y);
    }
    lerp(vec, amt) {
        let lerp = function (start, stop, amt) {
            return start + (stop - start) * amt;
        }
        this.x = lerp(this.x, vec.x, amt);
        this.y = lerp(this.y, vec.y, amt);
        this.z = lerp(this.z, vec.z, amt);
    }

    //GET PROPERTIES
    dist(x, y, z = 0) {
        let dx,dy,dz;
        if (arguments.length === 1) {
            dx = this.x - x.x;
            dy = this.y - x.y;
            dz = this.z - x.z;
        } else if (arguments.length > 1) {
            dx = this.x - x;
            dy = this.y - y;
            dz = this.z - z;
        }
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    heading() {
        return -Math.atan2(-this.y, this.x);
    }
    angleBetween(vec) {
        return Math.abs(Math.atan2(this.y, this.x) - Math.atan2(vec.y, vec.x));
    }
    magSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    mag() {
        return Math.sqrt(this.magSq());
    }
    array() {
        return [this.x, this.y, this.z];
    }
    
    //STATIC METHODS
    static add(v1, v2) {
        let vec = v1.copy();
        vec.add(v2);
        return vec;
    }
    static sub(v1, v2) {
        let vec = v1.copy();
        vec.sub(v2);
        return vec;
    }
    static mult(v1, n) {
        let vec = v1.copy();
        vec.mult(n);
        return vec;
    }
    static div(v1, n) {
        let vec = v1.copy();
        vec.mult(n);
        return vec;
    }
    static cross(v1, v2) {
        let vec = v1.copy();
        vec.cross(v2);
        return vec;
    }
    static lerp(v1, v2, amt) {
        let vec = v1.copy();
        vec.lerp(v2, amt);
        return vec;
    }
    static rotate2D(v1, theta) {
        let vec = v1.copy();
        vec.rotate(theta);
        return vec;
    }
    static normalize(v1) {
        let vec = v1.copy();
        return v1.normalize();
    }
    static setMag(v1, mag) {
        let vec = v1.copy();
        vec.setMag(mag);
        return vec;
    }

    //the following should only be used statically, only written this way for consistency
    static dist(v1, v2) {
        return v1.dist(v2);
    }
    static angleBetween(v1, v2) {
        return v1.angleBetween(v2);
    }
    static dot(v1, v2) {
        return v1.dot(v2)
    }
}
