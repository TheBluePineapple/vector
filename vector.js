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
        // if (typeof v !== "object") {
        //     v = new Vector();
        // }
        // v.x = Math.cos(angle);
        // v.y = Math.sin(angle);
        // return v;
    }//ROUND TO ZERO
    static random2D(mag=1) {
        return Vector.fromAngle(Math.random() * (Math.PI*2), mag);
    }
    static random3D = function (mag=1) {
        //random angle
        var angle = Math.random() * 365;
        //random z value(I think lol)
        var vz = Math.random() * 2 - 1;
        //mag is radius(C), vz is z componentm pythag, so mag stays same with z value and x/y values
        var mult = Math.sqrt(mag*mag - vz * vz);
        //find x and y for angle
        var vx = mult * Math.cos(angle);
        var vy = mult * Math.sin(angle);
        // if (v === undefined || v === null) {
            v = new Vector(vx, vy, vz);
        // } else {
        //     v.set(vx, vy, vz);
        // }
        return v;
    }

    // IMPLEMENT
    toMat(){}
    fromMat(){}


    // INSTANCE METHODS
    copy() {
        return new Vector(this.x, this.y, this.z);
    }
    // ARITHMETIC
    add(x, y , z = 0) {
        //if only a vector is passed in, get its parts
        if (arguments.length === 1&&typeof x === "object") {
            this.x += x.x;
            this.y += x.y;
            this.z += x.z;
        } else if (arguments.length > 1) {//if numbers are passed in, add them
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
    }//target

    //SET PROPERTIES
    normalize() {
        var m = this.mag();
        if (m !== 0) {//m>0
            this.div(m);
        }
    }//target
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
            // case "array":
            //     this.x = x[0];
            //     this.y = x[1];
            //     this.z = x[2];
            // break;
            case "object":
                this.x = x.x;
                this.y = x.y;
                this.z = x.z;
            break;
            case "number":
                this.x = x;
                this.y = y;
                this.z = z;
                // If no z specified, go to zero
                // this.z = z|this.z;
            break;
        }

        //option 2
        // this.x=x;
        // this.y=y;
        // if(arguments.length>2){
        //     this.z=z;
        // }
    }

    setMag(mag) {
        this.normalize();
        this.mult(mag);
        if(mag<1){//might be able to fix with normalizing, then div with x
            console.warn("Trying to set to magnitude less than one");
        }
    }//target
    rotate2D(theta) {
        let angle = Math.atan2(this.y, this.x);
        this.x = Math.cos(theta*this.x) - Math.sin(theta*this.y);
        this.y = Math.sin(theta*this.x) + Math.cos(theta*this.y);
    }//FIX ROUNDING, 0 not huge neg exponent
    lerp(vec, amt) {
        let lerp = function (start, stop, amt) {
            return start + (stop - start) * amt;
        }
        this.x = lerp(this.x, vec.x, amt);
        this.y = lerp(this.y, vec.y, amt);
        this.z = lerp(this.z, vec.z, amt);
    }//static

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
    }//only static, idk why this is here
    magSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    mag() {
        return Math.sqrt(this.magSq());
    }
    array() {
        return [this.x, this.y, this.z];
    }
    //Static methods
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
